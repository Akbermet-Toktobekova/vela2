import type {BetaPdfIssue as RevolutIssue, BetaPdfOperation as RevolutOperation} from '../../../shared/contracts/betaPdf';

export type PdfLine = { page: number; line: number; items: {x: number; text: string}[] };

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function dateValue(text: string) {
  const match = /^([A-Za-z]+) (\d{1,2}), (\d{4})$/.exec(text);
  if (!match) return null;
  const month = months.findIndex(value => match[1] === value || match[1] === value.slice(0, 3)) + 1;
  if (!month) return null;
  const iso = [match[3], String(month).padStart(2,'0'), match[2].padStart(2,'0')].join('-');
  const date = new Date(iso);
  return !Number.isNaN(date.valueOf()) && date.toISOString().startsWith(iso) ? iso : null;
}

function moneyValue(text: string, currency: string) {
  const match = /^(€|\$|£)?\s*(-?(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?)\s*([A-Z]{3})?$/.exec(text.trim());
  if (!match) return null;
  const symbolCurrency = match[1] === '€' ? 'EUR' : match[1] === '£' ? 'GBP' : null;
  if ((symbolCurrency && symbolCurrency !== currency) || (match[3] && match[3] !== currency)) return null;
  if (match[1] === '$' && !['USD','CAD','AUD','NZD','SGD','HKD'].includes(currency) && match[3] !== currency) return null;
  const amount = Number(match[2].replaceAll(',',''));
  return Number.isFinite(amount) ? amount : null;
}

export function parseRevolutLines(lines: PdfLine[]) {
  const join = (row: PdfLine) => row.items.map(item => item.text).join(' ');
  if (!lines.some(row => /\bRevolut Bank\b/i.test(join(row)))) return null;

  let currency = '';
  let section: 'posted' | 'pending' | 'summary' | null = null;
  let columns: number[] | null = null;
  let previous: RevolutOperation | null = null;
  let recognized = false;
  let page = 0;
  const operations: RevolutOperation[] = [];
  const issues: RevolutIssue[] = [];
  const excluded: Record<string, {pending: number; summary: number}> = {};
  const counters = () => excluded[currency] ??= {pending: 0, summary: 0};

  for (const row of lines) {
    if (row.page !== page) { page = row.page; section = null; columns = null; previous = null; }
    const text = join(row);
    const title = /^([A-Z]{3}) Statement$/.exec(text);
    if (title) { currency = title[1]; continue; }
    if (!currency) continue;
    if (/^Pending\b/i.test(text)) { section = 'pending'; columns = null; previous = null; continue; }
    if (/^(Balance summary|Product\b)/i.test(text)) { section = 'summary'; columns = null; previous = null; continue; }
    if (/^Account transactions\b/i.test(text)) { section = 'posted'; columns = null; previous = null; continue; }
    if (/^(?:©|Report lost|Get help)/i.test(text)) { section = null; columns = null; previous = null; continue; }

    const header = ['Description','Money out','Money in','Balance'].map(label => row.items.find(item => item.text === label)?.x);
    if (header.slice(0,3).every(x => x !== undefined)) {
      if (section !== 'pending' && header[3] !== undefined && row.items.some(item => item.text === 'Date')) {
        section = 'posted';
        recognized = true;
      }
      if (section === 'posted' || section === 'pending') {
        // Header positions define column starts. Allow for right-aligned signed values.
        columns = [header[0]! - 4, header[1]! - 8, header[2]! - 8, (header[3] ?? Infinity) - 30];
      }
      previous = null;
      continue;
    }

    if (section === 'summary' && row.items.length >= 4 && row.items.slice(1).some(item => /\d/.test(item.text))) {
      counters().summary++;
    }
    if (!columns || (section !== 'posted' && section !== 'pending')) continue;
    const cells = ['', '', '', '', ''];
    for (const item of row.items) {
      const index = columns.filter(x => item.x >= x).length;
      cells[index] += (cells[index] ? ' ' : '') + item.text;
    }
    const [dateText, description, out, incoming, balanceText] = cells;
    const date = dateValue(dateText);
    if (!dateText && description && !out && !incoming && !balanceText && previous) {
      previous.description += ' ' + description;
      continue;
    }
    if (!date && !(dateText && (out || incoming))) { previous = null; continue; }
    previous = null;
    if (section === 'pending') { counters().pending++; continue; }
    const source = {page, line: row.line, text};
    const value = moneyValue(out || incoming, currency);
    const reason = !date ? 'Invalid transaction date'
      : !description ? 'Missing description'
      : !!out === !!incoming ? 'Expected exactly one money column'
      : value === null || value < 0 ? 'Invalid amount or currency mismatch'
      : null;
    if (reason || !date || value === null) {
      issues.push({...source, id: page + ':' + row.line, currency, reason: reason ?? 'Invalid transaction'});
      continue;
    }
    previous = {...source, date, description, amount: out ? -value : value, currency, balance: moneyValue(balanceText, currency)};
    operations.push(previous);
  }

  return recognized ? {operations, issues, excluded} : null;
}

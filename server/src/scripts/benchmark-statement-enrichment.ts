import { LLMClient } from '../ai/llmClient';
import { TransactionClassifier } from '../analyzer/transactionClassifier';
import { BetaStore } from '../beta/store';
import { BetaFinancial } from '../beta/financial';
import { BetaImports } from '../beta/imports';
import { BetaUploads } from '../beta/uploads';

async function run() {
  const store = new BetaStore({filename: ':memory:'});
  try {
    const user = {id: 'benchmark', name: 'Fixture Owner', email: 'benchmark@example.test'};
    const financial = new BetaFinancial(store);
    const imports = new BetaImports(store, financial);
    const uploads = new BetaUploads(store, financial, imports);
    const initial = financial.get(user);
    initial.state.preferences.statementReviewMode = 'automatic';
    initial.state.accounts.push({
      id: 'main', userId: user.id, name: 'Test', institution: 'Fixture', currency: 'EUR',
      purposes: ['daily_spending'], fundsOwnership: 'personal', personalAvailableAmount: null,
      isPrimary: true, notes: '', createdAt: '2026-11-01', updatedAt: '2026-11-01',
    });
    financial.persist(user.id, initial);
    const rows = [
      {description: 'SPAR BUDAPEST 0832', amount: -30, name: 'SPAR', category: 'groceries_food', type: 'expense'},
      {description: 'POS 8392 NETFLIX.COM AMSTERDAM NL', amount: -15, name: 'Netflix', category: 'subscriptions', type: 'expense'},
      {description: 'Amazon', amount: -40, name: 'Amazon', category: 'other', type: 'expense'},
      {description: 'Transfer to Fixture Owner', amount: -200, name: 'Transfer to Fixture Owner', category: 'transfer', type: 'unknown'},
      {description: 'Transfer to Sample Recipient', amount: -100, name: 'Transfer to Sample Recipient', category: 'transfer', type: 'external_transfer'},
      {description: 'Card refund', amount: 5, name: 'Card refund', category: 'other', type: 'refund'},
    ];
    const csv = 'Date,Description,Amount,Currency\n' + rows.map(row => '2026-11-01,' + row.description + ',' + row.amount + ',EUR').join('\n');
    uploads.stage(user, {accountId: 'main', fileName: 'benchmark.csv', contentBase64: Buffer.from(csv).toString('base64')});
    await uploads.process(user);
    const snapshot = financial.snapshot(user);
    const score = (labels: {name?: string; category?: string; type?: string}[]) => ({
      rows: labels.length,
      names: labels.filter((row, index) => row.name?.toLowerCase() === rows[index].name.toLowerCase()).length,
      categories: labels.filter((row, index) => row.category === rows[index].category).length,
      types: labels.filter((row, index) => row.type === rows[index].type).length,
    });
    // Reproduce the previous D-025 offline rule: sign-based type and Other for every row.
    const baseline = score(rows.map(row => ({name: row.description, category: 'other', type: row.amount < 0 ? 'expense' : 'income'})));
    const compare = (labels: typeof snapshot.classifications) => score(rows.map(row => {
      const source = snapshot.transactions.find(tx => tx.description === row.description);
      const label = source && labels[source.id];
      return {name: label?.displayName, category: label?.category, type: label?.economicType};
    }));
    const offline = await TransactionClassifier.classify({snapshot, llmClient: new LLMClient({mockMode: true})});
    console.log(JSON.stringify({baseline: 'D-025 offline rule', expectedRows: rows.length, before: baseline,
      after: compare(offline.updatedClassifications), subscription: financial.get(user).state.subscriptions?.[0]?.name,
      pendingTransferQuestions: Object.values(offline.updatedClassifications).filter(row => row.isInternalTransferCandidate).length}));
    if (process.argv.includes('--live')) {
      const client = new LLMClient({mockMode: false});
      const live = await TransactionClassifier.classify({snapshot, llmClient: client});
      console.log(JSON.stringify({live: compare(live.updatedClassifications), models: live.models}));
    }
  } finally {
    store.close();
  }
}

void run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

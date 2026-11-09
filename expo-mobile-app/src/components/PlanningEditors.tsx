import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spendingCategories, type SpendingCategory, type ExpenseCommitment, type EssentialGroup } from '../../../shared/pi/types';
import type { ConfirmedSubscription, PIDatabaseSeed } from '../../../shared/profile/seed';
import { GlassButton as Button, Field, GlassCard } from './SoftGlass';
import { CurrencyField } from './CurrencyField';
import { DateField } from './DateField';
import { SharedFinancialCalculator } from '../../../shared/calculator';

const actions = {flexDirection: 'row' as const, flexWrap: 'wrap' as const, gap: 8, alignItems: 'center' as const};
const number = (value: string) => Number(value.replace(',', '.'));
function useErrorAction() {
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const run = async (fn: () => Promise<void>) => {setError(''); setBusy(true); try {await fn();} catch(e) {setError(e instanceof Error ? e.message : 'Could not save.');} finally {setBusy(false);}};
  return {error, busy, run};
}

const groups: [EssentialGroup, string][] = [
  ['housing', 'Housing'], ['food', 'Food & groceries'], ['utilities', 'Utilities & communication'],
  ['transport', 'Transport'], ['other', 'Other essentials'],
];
type CostDetail = NonNullable<ExpenseCommitment['details']>[number] & {amountDraft?: string};
const round = (value: number) => Math.round(value * 100) / 100;
const sum = (rows: CostDetail[]) => round(rows.reduce((total, row) => total + row.monthlyAmount, 0));
const loose = (expense: ExpenseCommitment | null) => expense?.estimatedMonthlyAmount == null ? '' :
  String(Math.max(0, round(expense.estimatedMonthlyAmount - sum(expense.details || []))));

export function EssentialCosts({expense, currency, userId, version, save, refresh}: {
  expense: ExpenseCommitment | null; currency: string; userId: string; version: number;
  refresh: () => Promise<void>; save: (value: ExpenseCommitment, expectedVersion: number) => Promise<void>;
}) {
  const [details, setDetails] = useState<CostDetail[]>(expense?.details || []);
  const [other, setOther] = useState(loose(expense));
  const [unit, setUnit] = useState(expense?.currency || currency);
  const [open, setOpen] = useState<EssentialGroup>();
  const [manual, setManual] = useState<string>();
  const [dirty, setDirty] = useState(false);
  const [editVersion, setVersion] = useState(version);
  const {error, busy, run} = useErrorAction();
  useEffect(() => {
    if (dirty) return;
    setDetails(expense?.details || []);
    setOther(loose(expense));
    setUnit(expense?.currency || currency);
    setVersion(version);
  }, [expense?.updatedAt, currency, version, dirty]);
  const itemized = sum(details);
  const total = round(itemized + (number(other) || 0));
  const populated = other !== '' || details.length > 0;
  const recommendation = SharedFinancialCalculator.essentialReserveTarget(populated ? total : null);
  const edit = (next: CostDetail[]) => {setDirty(true); setDetails(next);};
  const applyTotal = () => {
    if (manual === undefined) return total;
    const value = number(manual);
    if (!manual.trim() || !Number.isFinite(value) || value < itemized)
      throw new Error('The total must cover all itemized expenses.');
    setOther(String(round(value - itemized)));
    setManual(undefined);
    return round(value);
  };
  return <View style={{gap: 12}}>
    <CurrencyField label="Currency" value={unit} onChange={value => {setDirty(true); setUnit(value);}}/>
    {groups.map(([id, label]) => {
      const rows = details.filter(row => (row.group || 'other') === id);
      const subtotal = round(sum(rows) + (id === 'other' ? number(other) || 0 : 0));
      const main = rows.find(row => row.id === 'essential-group:' + id);
      return <GlassCard key={id}>
        {id === 'other' ? <Field label={label} value={other} onChange={value => {setDirty(true); setOther(value);}}/> :
          <Field label={label} value={main?.amountDraft ?? (main ? String(main.monthlyAmount) : '')} onChange={value => {
            const rest = details.filter(row => row !== main);
            edit(value === '' ? rest : [...rest, {id: 'essential-group:' + id, name: label,
              group: id, monthlyAmount: number(value), amountDraft: value}]);
          }}/>}
        <Button secondary title={open === id ? 'Hide details' : 'Show ' + label + ' details'}
          onPress={() => setOpen(open === id ? undefined : id)}/>
        {!!subtotal && <Text>{unit} {subtotal.toFixed(2)} monthly</Text>}
        {open === id && <>
          {rows.filter(row => row !== main).map(row => {
            const update = (changes: Partial<CostDetail>) => edit(details.map(detail => detail.id === row.id ? {...row, ...changes} : detail));
            return <View key={row.id} style={{gap: 8}}>
              <Field label="Expense name" value={row.name} onChange={name => update({name})}/>
              <Field label="Monthly amount" value={row.amountDraft ?? String(row.monthlyAmount)} onChange={value => update({monthlyAmount: number(value), amountDraft: value})}/>
              <DateField label="Optional payment date" value={row.dueDate || ''} onChange={dueDate => update({dueDate: dueDate || undefined})}/>
              <Button secondary title="Remove detail" onPress={() => edit(details.filter(detail => detail.id !== row.id))}/>
            </View>;
          })}
          <Button secondary title="+ Add expense" onPress={() => edit([...details,
            {id: Date.now() + ':' + details.length, group: id, name: '', monthlyAmount: 0, amountDraft: ''}])}/>
        </>}
      </GlassCard>;
    })}
    <Field label="Essential monthly total" value={manual ?? (populated ? total.toFixed(2) : '')}
      onChange={value => {setDirty(true); setManual(value);}}/>
    {manual !== undefined && <Button secondary title="Apply total to Other essentials" onPress={() => void run(async () => {applyTotal();})}/>}
    <Text>Recommended Safety Cushion: {recommendation == null ? 'Enter monthly expenses' : unit + ' ' + recommendation.toFixed(2)} (three months of essential spending).</Text>
    <Text>Blank categories count as zero when you save.</Text>
    {!!error && <Text accessibilityRole="alert">{error}</Text>}
    {dirty && editVersion !== version && <>
      <Text>Latest saved total: {expense?.estimatedMonthlyAmount ?? 'Unknown'}. Review it before replacing it with this draft.</Text>
      <Button secondary title="Reload latest records" onPress={() => void run(refresh)}/>
      <Button secondary title="I reviewed the latest records · Keep my draft" onPress={() => setVersion(version)}/>
    </>}
    <Button title="Save essential costs" disabled={busy || !populated && manual === undefined} onPress={() => void run(async () => {
      if (!Number.isFinite(number(other)) || number(other) < 0 ||
        details.some(row => !row.name.trim() || !Number.isFinite(row.monthlyAmount) || row.monthlyAmount < 0 || row.amountDraft === ''))
        throw new Error('Enter a name and a valid amount for each expense.');
      const confirmed = applyTotal();
      await save({...expense, id: expense?.id || 'essentials', userId, estimatedMonthlyAmount: confirmed,
        currency: unit, notes: expense?.notes || '', updatedAt: new Date().toISOString(),
        details: details.map(({id, name, monthlyAmount, dueDate, group}) => ({id, name, monthlyAmount, dueDate, group: group || 'other'}))}, editVersion);
      setDirty(false);
    })}/>
  </View>;
}

export function ReserveTargetEditor({state, version, save, close}: {
  state: PIDatabaseSeed; version: number; save: (body: unknown) => Promise<void>; close: () => void;
}) {
  const goal = state.goals.find(item => item.goalType === 'emergency_cushion');
  const expense = state.expenseCommitment;
  const recommendation = SharedFinancialCalculator.essentialReserveTarget(expense?.estimatedMonthlyAmount);
  const [amount, setAmount] = useState(String(goal?.targetAmount ?? recommendation ?? ''));
  const [editVersion] = useState(version);
  const {error, busy, run} = useErrorAction();
  return <Modal animationType="slide" onRequestClose={close}><SafeAreaView style={{flex: 1, backgroundColor: '#e3e6df'}}>
    <ScrollView contentContainerStyle={{padding: 20, gap: 16}} keyboardShouldPersistTaps="handled">
      <Text>Edit Safety Cushion target</Text>
      <Text>{recommendation == null ? 'Save essential costs to see a recommendation.' :
        'Recommended: ' + expense?.currency + ' ' + recommendation.toFixed(2) + ' (three months of essential spending).'}</Text>
      <Field label={'Target amount (' + (goal?.currency || state.profile.baseCurrency) + ')'} value={amount} onChange={setAmount}/>
      {!!error && <Text accessibilityRole="alert">{error}</Text>}
      <Button title="Save target" disabled={busy || !goal} onPress={() => void run(async () => {
        if (!Number.isFinite(number(amount)) || number(amount) <= 0) throw new Error('Enter a positive target amount.');
        await save({expectedVersion: editVersion, amount: number(amount)});
        close();
      })}/>
      <Button secondary title="Cancel" onPress={close}/>
    </ScrollView>
  </SafeAreaView></Modal>;
}

export type SubscriptionValues = {name:string;amount:number;currency:string;frequency:'monthly'|'yearly'|'weekly';nextDueDate?:string;monthlyAmount?:number;includedInEssentials:boolean;detailId?:string};
export function SubscriptionForm({initial, includedKnown=false, submit, title='Approve subscription'}: {initial:Partial<SubscriptionValues>;includedKnown?:boolean;submit:(value:SubscriptionValues)=>Promise<void>;title?:string}) {
  const [name,setName]=useState(initial.name || ''); const [amount,setAmount]=useState(String(initial.amount ?? ''));
  const [frequency,setFrequency]=useState(initial.frequency || ''); const [due,setDue]=useState(initial.nextDueDate || '');
  const [monthly,setMonthly]=useState(String(initial.monthlyAmount || '')); const [included,setIncluded]=useState<boolean|undefined>(includedKnown ? true : initial.includedInEssentials);
  const {error,busy,run}=useErrorAction();
  return <View style={{gap:10}}><Field label="Subscription name" value={name} onChange={setName}/>
    <Field label={`Payment amount (${initial.currency || 'EUR'})`} value={amount} onChange={setAmount}/>
    <Text>Billing frequency</Text><View style={actions}>{(['monthly','yearly','weekly'] as const).map(f=><Button key={f} secondary title={`${f===frequency?'✓ ':''}${f}`} onPress={()=>setFrequency(f)}/>)}</View>
    {frequency==='weekly'&&<Field label="Confirmed monthly amount" value={monthly} onChange={setMonthly}/>}
    <DateField label="Next payment date (optional)" value={due} onChange={setDue}/>
    {!includedKnown&&<><Text>Already included in your essential monthly spending?</Text><View style={actions}><Button secondary title={included===true?'✓ Yes':'Yes'} onPress={()=>setIncluded(true)}/><Button secondary title={included===false?'✓ No':'No'} onPress={()=>setIncluded(false)}/></View></>}
    <Text>{due?'A confirmed payment schedule will be added.':'Without a payment date, this is saved without predicting a future debit.'} Usage and cancellation terms are separate.</Text>
    {!!error&&<Text accessibilityRole="alert">{error}</Text>}
    <Button title={title} disabled={busy} onPress={()=>void run(async()=>{
      if(!name.trim()||!(number(amount)>0)||!['monthly','yearly','weekly'].includes(frequency)||included===undefined||(frequency==='weekly'&&!(number(monthly)>0)))throw new Error('Confirm name, amount, frequency and whether the cost is included.');
      await submit({name:name.trim(),amount:number(amount),currency:initial.currency || 'EUR',frequency:frequency as SubscriptionValues['frequency'],nextDueDate:due || undefined,includedInEssentials:included,detailId:initial.detailId,...(frequency==='weekly'?{monthlyAmount:number(monthly)}:{})});
    })}/></View>;
}

export function SubscriptionList({rows,version,save,refresh}: {rows:ConfirmedSubscription[];version:number;save:(id:string,body:unknown)=>Promise<void>;refresh:()=>Promise<void>}) {
  const [editing,setEditing]=useState<string|null>(null); const [editVersion,setVersion]=useState(version);
  const {error,run}=useErrorAction();
  return <View style={{gap:12}}>{!rows.length&&<Text>No subscriptions detected yet.</Text>}{rows.map(s=><GlassCard key={s.id}>
    <Text>{s.name} · {s.currency} {s.amount}{s.frequency ? ' / ' + s.frequency : ''} · {s.detected ? 'Detected' : s.status}</Text>
    <Text>{s.nextDueDate?`Next date: ${s.nextDueDate}`:'Payment date unknown'}</Text>
    <View style={actions}><Button secondary title={editing===s.id?'Close':'Edit'} onPress={()=>{setEditing(editing===s.id?null:s.id);setVersion(version);}}/>
    {s.status==='active'&&<Button secondary title="Mark as ended" onPress={()=>Alert.alert('End subscription schedule?','Future payments stop; recorded charges and your essential estimate remain. Adjust your estimate separately if needed.',[{text:'Cancel'},{text:'Mark as ended',onPress:()=>void run(async()=>{await save(s.id,{name:s.name,amount:s.amount,currency:s.currency,frequency:s.frequency,nextDueDate:s.nextDueDate,monthlyAmount:s.monthlyAmount,includedInEssentials:true,detailId:s.detailId,status:'ended',expectedVersion:version});})}])}/>}</View>
    {editing===s.id&&<><Button secondary title="Reload latest records" onPress={()=>void run(refresh)}/>{editVersion!==version&&<><Text>Latest saved: {s.name} · {s.currency} {s.amount}. Review before replacing these details.</Text><Button secondary title="I reviewed the latest records · Keep my edits" onPress={()=>setVersion(version)}/></>}<SubscriptionForm initial={s} includedKnown title="Save subscription" submit={async value=>{await save(s.id,{...value,status:s.status,expectedVersion:editVersion});setEditing(null);}}/></>}
  </GlassCard>)}{!!error&&<Text accessibilityRole="alert">{error}</Text>}</View>;
}

export function ReserveBalanceEditor({state,version,save,close}:{state:PIDatabaseSeed;version:number;save:(body:unknown)=>Promise<void>;close:()=>void}) {
  const goal=state.goals.find(g=>g.goalType==='emergency_cushion');
  const accounts=state.accounts.filter(a=>a.currency===goal?.currency);
  const [accountId,setAccount]=useState(accounts[0]?.id || '');
  const current=(id:string)=>state.goalAllocations.filter(a=>a.accountId===id&&a.goalId===goal?.id).reduce((n,a)=>n+a.amount,0);
  const [amount,setAmount]=useState(String(current(accountId)));const [editVersion]=useState(version);
  const {error,busy,run}=useErrorAction();
  return <Modal animationType="slide" onRequestClose={close}><KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS==='ios'?'padding':'height'}><SafeAreaView style={{flex:1,backgroundColor:'#e3e6df'}}><ScrollView contentContainerStyle={{padding:20,gap:16,paddingBottom:60}} keyboardShouldPersistTaps="handled">
    <Text>Update Safety Cushion balance</Text><Text>Record funds already set aside in this account. This does not move money or change the bank balance. Other accounts' earmarks remain unchanged.</Text>
    <View style={actions}>{accounts.map(a=><Button key={a.id} secondary title={`${accountId===a.id?'✓ ':''}${a.name}`} onPress={()=>{setAccount(a.id);setAmount(String(current(a.id)));}}/>)}</View>
    {!accounts.length&&<Text>Add or update an account in {goal?.currency || 'the planning currency'} first.</Text>}
    <Field label={`Earmarked amount (${goal?.currency || ''})`} value={amount} onChange={setAmount}/>
    {!!error&&<Text accessibilityRole="alert">{error}</Text>}
    <Button title="Save recorded balance" disabled={busy||!accounts.length} onPress={()=>void run(async()=>{if(!amount.trim()||!Number.isFinite(number(amount))||number(amount)<0)throw new Error('Enter a valid amount.');await save({accountId,amount:number(amount),expectedVersion:editVersion});close();})}/>
    <Button secondary title="Cancel" onPress={close}/>
  </ScrollView></SafeAreaView></KeyboardAvoidingView></Modal>;
}

const categoryLabels: Record<SpendingCategory, string> = {
  rent_housing: 'Housing', utilities_energy: 'Utilities', internet_telecom: 'Telecom', groceries_food: 'Groceries',
  dining_coffee: 'Restaurants', transport: 'Transport', subscriptions: 'Subscriptions', shopping: 'Shopping',
  health: 'Health', education: 'Education', entertainment: 'Entertainment', fees: 'Fees', work_expense: 'Work expenses',
  income: 'Income', transfer: 'Transfers', other: 'Other',
};

export type UnresolvedOperation = {id: string; row: number; page?: number; original: string; reason: string; currency?: string};
type Operation = PIDatabaseSeed['transactions'][number];
type Draft = {
  id: string; issue?: UnresolvedOperation; original: string; displayName: string; category: SpendingCategory;
  merchantKey?: string; description: string; amount: string; date: string; currency: string;
  accountId: string; applyToMerchant?: boolean; pickCategory?: boolean;
};

export function OperationList({state, version, statementIds, save, focus, onFocusConsumed, refresh, issues = [], correctIssue, accountId}: {
  state: PIDatabaseSeed; version: number; statementIds: string[]; save: (id: string, body: unknown) => Promise<void>;
  focus?: {id: string; key: string} | null; onFocusConsumed?: () => void; refresh?: () => Promise<void>;
  issues?: UnresolvedOperation[]; correctIssue?: (id: string, body: unknown) => Promise<void>; accountId?: string;
}) {
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<Draft>();
  const [editVersion, setVersion] = useState(version);
  const {error, busy, run} = useErrorAction();
  const rows = state.transactions.filter(row => (row.sourceStatementIds || [row.statementId]).some(id => statementIds.includes(id)));
  const classifications = new Map(state.classifications.map(label => [label.transactionId, label]));
  const display = (row: Operation) => classifications.get(row.id)?.displayName || row.counterparty || row.description;
  const edit = (row: Operation) => {
    const label = classifications.get(row.id);
    setEditing({...row, amount: String(row.amount), original: row.rawRow?.__original_values || row.originalValues?.description || row.description,
      displayName: display(row), category: label?.category || 'other', merchantKey: label?.merchantKey});
    setVersion(version);
  };
  useEffect(() => {
    if (!focus) return;
    const row = rows.find(row => row.id === focus.id);
    if (row) {setShow(true); edit(row); onFocusConsumed?.();}
  }, [focus?.key]);
  const update = (values: Partial<Draft>) => setEditing(previous => previous && {...previous, ...values});
  return <View style={{gap: 12}}>
    <Button secondary title={(show ? 'Hide details' : 'Show details') + ' (' + (rows.length + issues.length) + ')'} onPress={() => setShow(!show)}/>
    {show && issues.map(issue => <GlassCard key={issue.id}>
      <Text>Row {issue.row} · {issue.reason}</Text><Text selectable>{issue.original}</Text>
      <Button secondary title="Edit" onPress={() => {
        const currency = issue.currency || state.accounts.find(account => account.id === accountId)?.currency || state.profile.baseCurrency;
        setVersion(version);
        setEditing({id: issue.id, issue, original: issue.original, description: '', displayName: '', category: 'other',
          date: '', amount: '', currency, accountId: (issue.currency ? state.accounts.find(account => account.currency === currency)?.id : accountId) || ''});
      }}/>
    </GlassCard>)}
    {show && rows.map(row => {
      const label = classifications.get(row.id);
      return <GlassCard key={row.id}>
        <Text>{display(row)}</Text>
        <Text>{label?.isInternalTransferCandidate ? 'Transfers · Possible own-account transfer' : categoryLabels[label?.category || 'other']}
          {' · '}{row.currency} {row.amount}{row.excluded ? ' · Excluded' : ''}</Text>
        <Text>{row.date} · {state.accounts.find(account => account.id === row.accountId)?.name}</Text>
        {state.subscriptions?.filter(sub => sub.transactionIds.includes(row.id)).map(sub => <Text key={sub.id}>
          Subscription: {sub.name}{sub.frequency ? ' · ' + sub.frequency : ''}
        </Text>)}
        <View style={actions}>
          <Button secondary title="Edit" onPress={() => edit(row)}/>
          <Button secondary destructive={!row.excluded} disabled={busy} title={row.excluded ? 'Restore' : 'Delete'}
            onPress={() => void run(() => save(row.id, {expectedVersion: version, excluded: !row.excluded}))}/>
        </View>
      </GlassCard>;
    })}
    {!!error && <Text accessibilityRole="alert">{error}</Text>}
    {editing && <Modal animationType="slide" onRequestClose={() => setEditing(undefined)}><KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView style={{flex: 1, backgroundColor: '#e3e6df'}}>
        <ScrollView contentContainerStyle={{padding: 20, gap: 14, paddingBottom: 60}} keyboardShouldPersistTaps="handled">
          <Text>Edit operation</Text><Text selectable>{editing.original}</Text>
          {editing.issue ? <>
            <Field label="Description" value={editing.description} onChange={description => update({description})}/>
            <Field label="Signed amount" value={editing.amount} onChange={amount => update({amount})}/>
            <DateField label="Date" value={editing.date} onChange={date => update({date})}/>
            <View style={actions}>{state.accounts.filter(account => account.currency === editing.currency).map(account =>
              <Button secondary key={account.id} title={(editing.accountId === account.id ? '✓ ' : '') + account.name}
                onPress={() => update({accountId: account.id})}/>)}</View>
          </> : <>
            <Field label="Display name" value={editing.displayName} onChange={displayName => update({displayName})}/>
            <Button secondary title={categoryLabels[editing.category]} onPress={() => update({pickCategory: !editing.pickCategory})}/>
            {editing.pickCategory && <View style={actions}>{spendingCategories.map(category => <Button key={category} secondary
              title={categoryLabels[category]} onPress={() => update({category, pickCategory: false})}/>)}</View>}
            {editing.merchantKey && <View style={actions}>
              <Switch accessibilityLabel="Apply to all operations from this merchant" value={!!editing.applyToMerchant}
                onValueChange={applyToMerchant => update({applyToMerchant})}/>
              <Text>Apply to all operations from this merchant</Text>
            </View>}
          </>}
          {!!error && <Text accessibilityRole="alert">{error}</Text>}
          {editVersion !== version && <>
            {refresh && <Button secondary title="Reload latest records" onPress={() => void run(refresh)}/>}
            <Button secondary title="Keep my edits using the latest version" onPress={() => setVersion(version)}/>
          </>}
          <Button title="Save operation" disabled={busy} onPress={() => void run(async () => {
            if (editing.issue) {
              if (!editing.amount.trim() || !Number.isFinite(number(editing.amount))) throw new Error('Enter a valid amount.');
              if (!editing.accountId) throw new Error('Choose an account for this operation.');
              await correctIssue?.(editing.issue.id, {expectedVersion: editVersion, description: editing.description,
                date: editing.date, amount: number(editing.amount), accountId: editing.accountId});
            } else {
              const row = rows.find(item => item.id === editing.id);
              if (!row) throw new Error('This operation is no longer available.');
              const category = classifications.get(row.id)?.category || 'other';
              await save(editing.id, {expectedVersion: editVersion,
                ...(editing.applyToMerchant || editing.displayName !== display(row) ? {displayName: editing.displayName} : {}),
                ...(editing.applyToMerchant || editing.category !== category ? {category: editing.category} : {}),
                ...(editing.applyToMerchant ? {applyToMerchant: true} : {})});
            }
            setEditing(undefined);
          })}/>
          <Button secondary title="Cancel" onPress={() => setEditing(undefined)}/>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView></Modal>}
  </View>;
}

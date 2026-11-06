import { useState } from 'react';
import { StyleSheet,Text,TextInput,TouchableOpacity,View } from 'react-native';
import Svg,{ Circle } from 'react-native-svg';
import type { FinancialGoal,FinancialSnapshot } from '../../../shared/pi/types';
import { GlassButton,GlassCard,colors } from '../components/SoftGlass';
import { deriveObservedPlan,goalAllocated,goalTimeline } from './planMath';

export type PlanInsightsProps = {
  snapshot?: FinancialSnapshot;
  onReviewTransactions: (category?: string, currency?: string, month?: string) => void;
  onEditGoal: (goal: FinancialGoal) => void;
  onEssentials: () => void;
};
const money = (value: number | null | undefined, currency: string) => value == null || !Number.isFinite(value) ? 'Unknown' : new Intl.NumberFormat('en-IE', {style: 'currency', currency}).format(value);
const label = (value: string) => value.replaceAll('_', ' ').replace(/^./, c => c.toUpperCase());
const chartColors = ['#386641', '#6a994e', '#a7c957', '#bcaa8c', '#737c66', '#adc0a0', '#7d9275', '#d6c7aa'];
function Row({name, value}: {name: string; value: string}) {
  return <View style={s.row}><Text style={s.body}>{name}</Text><Text style={s.value}>{value}</Text></View>;
}
function Chips({items, value, onChange}: {items: {id: string; name: string}[]; value: string; onChange: (id: string) => void}) {
  return <View style={s.chips}>{items.map(item => <TouchableOpacity key={item.id} accessibilityRole="button" accessibilityState={{selected: value === item.id}} onPress={() => onChange(item.id)} style={[s.chip, value === item.id && s.selected]}><Text style={s.body}>{item.name}</Text></TouchableOpacity>)}</View>;
}

export function PlanInsights({snapshot, onReviewTransactions, onEditGoal, onEssentials}: PlanInsightsProps) {
  const [period, setPeriod] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [contribution, setContribution] = useState('80');
  const [trackWidth, setTrackWidth] = useState(1);
  if (!snapshot) return <GlassCard><Text style={s.heading}>Your financial picture</Text><Text style={s.note}>Refresh your profile to load saved totals.</Text></GlassCard>;
  const currencies = Array.from(new Set([snapshot.baseCurrency, ...snapshot.transactions.map(t => t.currency), ...snapshot.incomeSources.map(i => i.currency), ...snapshot.currencySummaries.map(c => c.currency), ...snapshot.accountSummaries.map(a => a.account.currency), ...snapshot.debts.map(d => d.currency), ...snapshot.obligations.map(o => o.currency), ...snapshot.goals.map(g => g.currency), ...(snapshot.essentialCommitment ? [snapshot.essentialCommitment.currency] : [])]));
  const currency = currencies.includes(selectedCurrency) ? selectedCurrency : snapshot.baseCurrency;
  const months = Array.from(new Set(snapshot.transactions.filter(t => t.currency === currency).map(t => t.date.slice(0, 7)))).sort().reverse();
  const activePeriod = period === 'planned' || period === 'all' || months.includes(period) ? period : 'all';
  const observed = deriveObservedPlan(snapshot, currency, activePeriod === 'all' || activePeriod === 'planned' ? undefined : activePeriod);
  const goal = snapshot.goals.find(g => g.id === selectedGoal) || snapshot.safetyCushionGoal || snapshot.goals[0];
  const cushion = snapshot.safetyCushionGoal;
  const cushionAmount = cushion ? goalAllocated(snapshot, cushion) : null;
  const allocated = goal ? goalAllocated(snapshot, goal) : 0;
  const amount = Number(contribution.replace(',', '.'));
  const timeline = goal ? goalTimeline(goal.targetAmount, allocated, amount) : null;
  const maximum = Math.max(400, Number.isFinite(amount) ? amount : 0);
  const categoryEntries = Object.entries(observed.categories).filter(([,v]) => v > 0).sort((a,b) => b[1] - a[1]);
  const totalCategories = categoryEntries.reduce((sum, [,v]) => sum + v, 0);
  const range = snapshot.transactions.filter(t => t.currency === currency && (activePeriod === 'all' || activePeriod === 'planned' || t.date.startsWith(activePeriod))).map(t => t.date).sort();
  const plannedIncome = snapshot.declaredMonthlyIncomeByCurrency[currency];
  const essentials = snapshot.essentialCommitment?.currency === currency ? snapshot.essentialCommitment.estimatedMonthlyAmount : null;
  const updateSlider = (x: number) => setContribution(String(Math.round(Math.max(0, Math.min(1, x / trackWidth)) * maximum)));
  let offset = 0;
  return <>
    <GlassCard>
      <Text style={s.eyebrow}>SAFETY CUSHION</Text>
      <Text style={s.heading}>{cushion?.name || 'Create your safety cushion'}</Text>
      {cushion ? <>
        <Row name="Allocated / target" value={`${money(cushionAmount, cushion.currency)} / ${money(cushion.targetAmount, cushion.currency)}`} />
        <View accessible accessibilityLabel={`Safety cushion ${cushion.targetAmount && cushionAmount != null ? Math.round(Math.min(1, cushionAmount / cushion.targetAmount) * 100) : 0} percent funded`} style={s.track}><View style={[s.fill, {width: `${cushion.targetAmount && cushionAmount != null ? Math.min(100, cushionAmount / cushion.targetAmount * 100) : 0}%`}]} /></View>
        <GlassButton secondary title="Edit target" onPress={() => onEditGoal(cushion)} />
      </> : <Text style={s.note}>Add a goal below to start tracking your cushion.</Text>}
      <Text style={s.note}>{snapshot.emergencyCoverageMonths == null || !cushion || snapshot.essentialCommitment?.currency !== cushion.currency ? 'Emergency coverage needs a recorded cushion and essential monthly costs in the same currency.' : `Recorded emergency coverage: ${snapshot.emergencyCoverageMonths.toFixed(2)} months`}</Text>
      <GlassButton secondary title="Review essential monthly costs" onPress={onEssentials} />
    </GlassCard>
    <GlassCard>
      <Text style={s.eyebrow}>CASH FLOW BREAKDOWN</Text>
      <Text style={s.heading}>{activePeriod === 'planned' ? 'Your monthly estimates' : 'Your imported history'}</Text>
      <Chips items={currencies.map(id => ({id, name:id}))} value={currency} onChange={setSelectedCurrency} />
      <Chips items={[{id:'all',name:'All imported'},{id:'planned',name:'Planned'},...months.map(id=>({id,name:id}))]} value={activePeriod} onChange={setPeriod} />
      {activePeriod === 'planned' ? <>
        <Row name="Declared monthly income" value={money(plannedIncome, currency)} />
        <Row name="Essential monthly estimate" value={money(essentials, currency)} />
        <Text style={s.note}>These are your estimates, not observed statement totals. Bills are included in the essential estimate rather than added again.</Text>
        <Row name="Upcoming unpaid bills (due-date total)" value={money(snapshot.currencySummaries.find(c => c.currency === currency)?.upcomingUnpaidObligations, currency)} />
        {snapshot.debts.filter(d => d.currency === currency).map(debt => <Row key={debt.id} name={`${debt.name} minimum · ${debt.paymentFrequency || 'frequency unknown'}`} value={money(debt.minimumPayment,currency)} />)}
        <Text style={s.note}>Bill totals follow recorded due dates, not monthly averages. Debt minimums retain their own frequencies; they are not added to essential costs here.</Text>
      </> : <>
        <Text style={s.note}>{range.length ? `${range[0]} – ${range[range.length-1]} · ${observed.count} transactions` : 'No imported transactions for this currency.'}</Text>
        <Row name="Identified income" value={money(observed.income,currency)} />
        <Row name="Spending before refunds" value={money(observed.grossSpending,currency)} />
        <Row name="Refunds" value={money(observed.refunds,currency)} />
        <Row name="Spending after refunds" value={money(observed.netSpending,currency)} />
        <Row name="Debt payments" value={money(observed.debtPayments,currency)} />
        <Row name="Internal movements (excluded)" value={money(observed.transfers,currency)} />
        <Row name="Work movements (excluded)" value={money(observed.workMovements,currency)} />
        <Text style={s.note}>Currencies are never converted or combined. Internal movements show recorded entries, not new income. {observed.unknownCount} operations need economic review and are excluded from these totals.</Text>
        <Text style={s.note}>Coverage: {snapshot.dataQuality.accountsWithStatements} of {snapshot.dataQuality.totalAccounts} accounts have statements. Imported history is not a permanent monthly average. A negative after-refund total means refunds exceed recorded spending.</Text>
      </>}
    </GlassCard>
    {activePeriod !== 'planned' && <GlassCard>
      <Text style={s.eyebrow}>CLASSIFIED SPENDING CATEGORIES</Text>
      <Text style={s.heading}>Where your money went</Text>
      <Text style={s.note}>Classified spending before refunds · {currency}. Tap a segment or category to review its matching transactions.</Text>
      {totalCategories > 0 ? <>
        <View style={s.chart}>
          <Svg width={190} height={190} viewBox="0 0 190 190" accessibilityLabel="Spending category chart">
            <Circle cx={95} cy={95} r={65} fill="none" stroke="#e3e5df" strokeWidth={25} />
            {categoryEntries.map(([category,value],i) => {
              const circumference = 2*Math.PI*65; const segment = value/totalCategories*circumference; const start = offset; offset+=segment;
              return <Circle key={category} cx={95} cy={95} r={65} fill="none" stroke={chartColors[i%chartColors.length]} strokeWidth={25} strokeDasharray={[segment,circumference-segment]} strokeDashoffset={-start} rotation={-90} origin="95,95" onPress={()=>onReviewTransactions(category, currency, activePeriod === 'all' ? undefined : activePeriod)} accessibilityLabel={`${label(category)} ${money(value,currency)}`} />;
            })}
          </Svg>
          <Text pointerEvents="none" style={s.chartValue}>{money(totalCategories,currency)}</Text>
        </View>
        {categoryEntries.map(([category,value],i)=><TouchableOpacity key={category} accessibilityRole="button" onPress={()=>onReviewTransactions(category, currency, activePeriod === 'all' ? undefined : activePeriod)} style={s.row}><View style={s.legend}><View style={[s.dot,{backgroundColor:chartColors[i%chartColors.length]}]} /><Text style={s.body}>{label(category)}</Text></View><Text style={s.value}>{money(value,currency)} · {Math.round(value/totalCategories*100)}%</Text></TouchableOpacity>)}
      </> : <Text style={s.note}>No classified spending in this period. Review operations to confirm their meaning.</Text>}
      <GlassButton secondary title="Review all transactions" onPress={()=>onReviewTransactions(undefined, currency, activePeriod === 'all' ? undefined : activePeriod)} />
    </GlassCard>}
    <GlassCard>
      <Text style={s.eyebrow}>INTERACTIVE SIMULATOR</Text>
      <Text style={s.heading}>Goal timeline calculator</Text>
      {!goal ? <Text style={s.note}>Create a goal below to explore a savings timeline.</Text> : <>
        <Chips items={snapshot.goals.map(g=>({id:g.id,name:g.name}))} value={goal.id} onChange={setSelectedGoal} />
        <Row name="Allocated / target" value={`${money(allocated,goal.currency)} / ${money(goal.targetAmount,goal.currency)}`} />
        <Text style={s.body}>Hypothetical monthly contribution ({goal.currency})</Text>
        <TextInput accessibilityLabel={`Monthly contribution in ${goal.currency}`} keyboardType="decimal-pad" value={contribution} onChangeText={setContribution} style={s.input} />
        <View accessibilityRole="adjustable" accessibilityLabel="Monthly contribution slider" accessibilityValue={{min:0,max:maximum,now:Number.isFinite(amount)?amount:0,text:money(amount,goal.currency)}} accessibilityActions={[{name:'increment'},{name:'decrement'}]} onAccessibilityAction={event=>setContribution(String(Math.max(0,(Number.isFinite(amount)?amount:0)+(event.nativeEvent.actionName==='increment'?10:-10))))} onLayout={e=>setTrackWidth(e.nativeEvent.layout.width)} onStartShouldSetResponder={()=>true} onMoveShouldSetResponder={()=>true} onResponderGrant={e=>updateSlider(e.nativeEvent.locationX)} onResponderMove={e=>updateSlider(e.nativeEvent.locationX)} style={s.slider}>
          <View pointerEvents="none" style={[s.fill,{width:`${Number.isFinite(amount)?Math.min(100,Math.max(0,amount)/maximum*100):0}%`}]} />
        </View>
        <View style={s.row}><GlassButton secondary title="−10" onPress={()=>setContribution(String(Math.max(0,(Number.isFinite(amount)?amount:0)-10)))} /><GlassButton secondary title="+10" onPress={()=>setContribution(String((Number.isFinite(amount)?amount:0)+10))} /></View>
        <Text style={s.heading}>{goal.targetAmount == null ? 'Set a target amount first' : timeline?.months===0?'Target already reached':timeline?.months==null?'Choose a positive monthly amount':`${timeline.months} months to target`}</Text>
        {timeline?.date && timeline.months !== 0 && <Text style={s.body}>Estimated completion: {timeline.date.toLocaleDateString(undefined,{month:'long',year:'numeric'})}</Text>}
        <Text style={s.note}>Hypothetical only: no interest, investment return, transfers, or affordability guarantee. Contributions stay in the goal currency. This does not save an allocation or alter your plan.</Text>
        <GlassButton secondary title="Edit selected goal" onPress={()=>onEditGoal(goal)} />
      </>}
    </GlassCard>
  </>;
}

const s=StyleSheet.create({
  eyebrow:{fontSize:10,fontWeight:'700',letterSpacing:1,color:colors.green},heading:{fontSize:18,fontWeight:'700',color:colors.ink},body:{fontSize:13,color:colors.ink,flexShrink:1},value:{fontSize:12,fontWeight:'600',color:colors.ink,flexShrink:1,textAlign:'right'},note:{fontSize:12,lineHeight:18,color:colors.muted},row:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',gap:12,paddingVertical:6},chips:{flexDirection:'row',flexWrap:'wrap',gap:6},chip:{minHeight:40,paddingHorizontal:12,paddingVertical:10,borderRadius:14,backgroundColor:'rgba(255,255,255,.4)'},selected:{backgroundColor:'rgba(255,255,255,.9)',borderWidth:1,borderColor:colors.green},track:{height:10,borderRadius:8,backgroundColor:'#e3e5df',overflow:'hidden'},fill:{height:'100%',backgroundColor:colors.green,borderRadius:8},chart:{alignItems:'center',justifyContent:'center',height:190},chartValue:{position:'absolute',fontSize:16,fontWeight:'700',color:colors.ink},legend:{flexDirection:'row',alignItems:'center',gap:8,flexShrink:1},dot:{width:9,height:9,borderRadius:5},input:{borderRadius:14,backgroundColor:'rgba(255,255,255,.72)',padding:14,fontSize:16,color:colors.ink},slider:{height:32,borderRadius:16,backgroundColor:'#e3e5df',overflow:'hidden'},
});

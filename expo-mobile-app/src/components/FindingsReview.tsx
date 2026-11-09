import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Finding, FindingResponse, FindingsPacket } from '../../../shared/contracts/findingsTypes';
import type { ExpenseCommitment, FinancialObligation } from '../../../shared/pi/types';
import { GlassButton as Button, GlassCard } from './SoftGlass';
import { SubscriptionForm } from './PlanningEditors';
const key = (value:string) => value.trim().toLowerCase().replace(/\s+/g,' ');
function FindingCard({finding,transactions,busy,respond,essential,obligations,onEdit}: {
  finding:Finding;transactions:any[];busy:boolean;respond:(f:Finding,body:Omit<FindingResponse,'expectedVersion'|'evidenceVersion'>)=>Promise<void>;
  essential?:ExpenseCommitment|null;obligations?:FinancialObligation[];onEdit?:(finding:Finding)=>void;
}) {
  const [edit,setEdit]=useState(false); const [error,setError]=useState('');const [saving,setSaving]=useState(false);
  const send=async(body:Omit<FindingResponse,'expectedVersion'|'evidenceVersion'>)=>{setSaving(true);setError('');try{await respond(finding,body);}catch(e){setError(e instanceof Error?e.message:'Could not save.');throw e;}finally{setSaving(false);}};
  const transaction=transactions.filter(t=>finding.evidenceIds.includes(t.id)).sort((a,b)=>b.date.localeCompare(a.date))[0];
  const detail=essential?.details?.find(d=>key(d.name)===key(finding.merchant || finding.title));
  const bill=obligations?.find(b=>key(b.name)===key(finding.merchant || finding.title)&&b.currency===finding.currency);
  return <View style={s.item}>
    <Text style={s.meta}>{finding.kind==='recurrence'?'SUBSCRIPTION':'TRANSFER'} · {finding.currency} {Math.abs(transaction?.amount ?? finding.totalAmount).toFixed(2)}</Text>
    <Text style={s.title}>{finding.question}</Text><Text>{finding.observation}</Text><Text style={s.meta}>{finding.whyItMatters}</Text>
    <View style={s.row}>
      <Button title="Approve" disabled={busy||saving} onPress={()=>finding.kind==='recurrence'?setEdit(true):void send({response:'internal_transfer'}).catch(()=>{})}/>
      <Button secondary title="Edit" disabled={busy||saving} onPress={()=>finding.kind==='recurrence'?setEdit(!edit):onEdit?.(finding)}/>
      <Button secondary destructive title="Reject" disabled={busy||saving} onPress={()=>void send({response:finding.kind==='transfer'?'external_transfer':'dismiss'}).catch(()=>{})}/>
    </View>
    {edit&&finding.kind==='recurrence'&&<SubscriptionForm includedKnown={!!detail} initial={{
      name:finding.merchant || finding.title,currency:finding.currency,amount:bill?.amount ?? (detail?.monthlyAmount ?? Math.abs(transaction?.amount ?? finding.totalAmount)),
      frequency:bill?.recurrence==='yearly'?'yearly':bill?.recurrence==='weekly'?'weekly':bill?.recurrence==='monthly'||detail?'monthly':finding.cadence==='annual'?'yearly':finding.cadence,
      nextDueDate:bill?.dueDate || detail?.dueDate, detailId:detail?.id,
    }} submit={async subscription=>{await send({response:'confirm_subscription',subscription});setEdit(false);}}/>}
    {!!error&&<Text accessibilityRole="alert">{error}</Text>}
  </View>;
}
export function FindingsReview({packet,busy,transactions,respond,embedded=false,essential,obligations,onEdit}: {
  packet?:FindingsPacket;busy:boolean;transactions:any[];respond:(f:Finding,body:Omit<FindingResponse,'expectedVersion'|'evidenceVersion'>)=>Promise<void>;embedded?:boolean;
  essential?:ExpenseCommitment|null;obligations?:FinancialObligation[];onEdit?:(finding:Finding)=>void;
}) {
  const Container=embedded?View:GlassCard;
  const rows=packet?.findings.filter(f=>f.kind==='transfer') || [];
  return <Container style={{gap:12}}>
    {!embedded&&<Text style={s.title}>Confirm own-account transfers</Text>}
    {!rows.length&&<Text>No own-account transfers need confirmation.</Text>}
    {rows.map(f=><FindingCard key={`${f.id}:${f.evidenceVersion}`} finding={f} transactions={transactions} busy={busy} respond={respond} essential={essential} obligations={obligations} onEdit={onEdit}/>)}
  </Container>;
}
const s=StyleSheet.create({title:{fontWeight:'600',fontSize:16,flexShrink:1},meta:{fontSize:13,color:'#74766d',flexShrink:1},item:{gap:10,padding:14,backgroundColor:'#dce1d6',borderWidth:1,borderColor:'rgba(39,46,35,.12)',borderRadius:18},row:{flexDirection:'row',flexWrap:'wrap',gap:8}});

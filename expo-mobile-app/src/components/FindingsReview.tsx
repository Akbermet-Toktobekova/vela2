import { useEffect,useRef,useState } from 'react';
import { StyleSheet,Text,View } from 'react-native';
import type { Finding,FindingResponse,FindingsPacket } from '../../../shared/contracts/findingsTypes';
import { GlassButton,GlassCard } from './SoftGlass';
const labels:Record<FindingResponse['response'],string>={dismiss:'Dismiss',still_used:'Still used',no_longer_used:'No longer used',unsure:'Unsure',internal_transfer:'Between my accounts',external_transfer:'External transfer',confirm_classification:'Save classification'};
const categories=['rent_housing','utilities_energy','internet_telecom','groceries_food','dining_coffee','transport','subscriptions','shopping','health','education','work_expense','income','transfer','other'] as const;
const types=['income','expense','internal_transfer','external_transfer','debt_payment','interest_fee','refund','cash_withdrawal','savings_allocation','work_business_movement','unknown'] as const;
function FindingCard({finding,busy,transactions,respond,initiallyExpanded}:{finding:Finding;initiallyExpanded:boolean;busy:boolean;transactions:any[];respond:(f:Finding,body:Omit<FindingResponse,'expectedVersion'|'evidenceVersion'>)=>Promise<void>}) {
 const [expanded,setExpanded]=useState(initiallyExpanded);
 useEffect(()=>{if(initiallyExpanded)setExpanded(true);},[initiallyExpanded]);
 const [saving,setSaving]=useState(false);const [error,setError]=useState('');
 async function answer(body:Omit<FindingResponse,'expectedVersion'|'evidenceVersion'>){setSaving(true);setError('');try{await respond(finding,body);}catch(e){setError(e instanceof Error?e.message:'Could not save. Please retry.');}finally{setSaving(false);}}
 const [category,setCategory]=useState<FindingResponse['category']>();
 const [economicType,setType]=useState<FindingResponse['economicType']>();
 const [preference,setPreference]=useState(false);
 return <View style={s.item}>
  <GlassButton secondary title={`${expanded?'▾':'▸'} ${finding.title}${finding.reviewStatus==='Deferred'?' · Deferred':''}`} onPress={()=>setExpanded(!expanded)}/>
  {finding.reopened&&<Text>New evidence changed this case. Please review it again.</Text>}
  {expanded&&<><Text>{finding.observation}</Text>
  <Text style={s.meta}>{finding.dateRange.start} – {finding.dateRange.end} · {finding.currency} {finding.totalAmount.toFixed(2)} observed · {finding.confidence} confidence</Text>
  <Text>{finding.whyItMatters}</Text><Text style={s.title}>{finding.question}</Text>
  {finding.kind==='recurrence'&&<Text style={s.meta}>This records your answer only. Cancellation eligibility is a separate check; no service is cancelled and no money moves.</Text>}
  <Text>Supporting transactions</Text>
  {expanded&&finding.evidenceIds.map(id=>{const t=transactions.find(t=>t.id===id);return <Text selectable key={id}>{t?`${t.date} · ${t.description} · ${t.currency} ${t.amount}`:id}</Text>;})}
  {finding.responses.includes('confirm_classification')&&<>
   <Text>Economic type</Text><View style={s.row}>{types.map(v=><GlassButton key={v} secondary title={`${economicType===v?'✓ ':''}${v.replaceAll('_',' ')}`} disabled={busy||saving} onPress={()=>setType(v)}/>)}</View>
   <Text>Category</Text><View style={s.row}>{categories.map(v=><GlassButton key={v} secondary title={`${category===v?'✓ ':''}${v.replaceAll('_',' ')}`} disabled={busy||saving} onPress={()=>setCategory(v)}/>)}</View>
   {!!finding.merchant&&<GlassButton secondary title={preference?'✓ Remember for this merchant and account':'Remember for future imports in this account'} disabled={busy||saving} onPress={()=>setPreference(!preference)}/>}
  </>}
  <View style={s.row}>{finding.responses.map(response=><GlassButton key={response} secondary title={labels[response]} disabled={busy||saving||(response==='confirm_classification'&&(!category||!economicType))} onPress={()=>void answer({response,...(response==='confirm_classification'?{category,economicType,applyMerchantPreference:preference}:{})})}/>)}</View>
  {saving&&<Text accessibilityLiveRegion="polite">Saving…</Text>}{!!error&&<Text accessibilityRole="alert">{error}</Text>}</>}
 </View>;
}
export function FindingsReview({packet,busy,transactions,respond,embedded=false}:{embedded?:boolean;packet?:FindingsPacket;busy:boolean;transactions:any[];respond:(f:Finding,body:Omit<FindingResponse,'expectedVersion'|'evidenceVersion'>)=>Promise<void>}) {
 const [showReviewed,setShowReviewed]=useState(false);const [showInfo,setShowInfo]=useState(false);
 const reviewedCount=useRef(packet?.reviewed.length||0);
 useEffect(()=>{const count=packet?.reviewed.length||0;if(count>reviewedCount.current)setShowReviewed(true);reviewedCount.current=count;},[packet?.reviewed.length]);
 const progress=packet?.progress;
 const Container=embedded?View:GlassCard;
 return <Container>{!embedded&&<Text style={s.heading}>Needs your review</Text>}
 {progress&&<><Text accessibilityLiveRegion="polite">{progress.resolved} of {progress.total} reviewed · {progress.remaining} still need a decision</Text><View accessibilityRole="progressbar" accessibilityValue={{min:0,max:progress.total,now:progress.resolved}} style={{height:8,borderRadius:4,backgroundColor:'#e3e7df',overflow:'hidden'}}><View style={{height:8,backgroundColor:'#386641',width:`${progress.total?progress.resolved/progress.total*100:0}%`}}/></View>{progress.remaining===0&&<Text>Review complete—all {progress.total} cases resolved.</Text>}{progress.deferred>0&&<Text>{progress.deferred} deferred for later review.</Text>}</>}
 {!packet?<Text>Refresh to load findings.</Text>:!packet.unresolvedCount?<Text>No unclear cases need your attention.</Text>:<Text>{packet.unresolvedCount} cases remaining{packet.unresolvedCount>5?' · showing five at a time':''}</Text>}
 {packet?.findings.slice(0,5).map((f,i)=><FindingCard key={`${f.id}:${f.evidenceVersion}`} initiallyExpanded={i===0} finding={f} busy={busy} transactions={transactions} respond={respond}/>)}
 {!!packet?.reviewed.length&&<><GlassButton secondary title={`${showReviewed?'Hide':'Show'} reviewed (${packet.reviewed.length})`} onPress={()=>setShowReviewed(!showReviewed)}/>{showReviewed&&packet.reviewed.map(f=><View key={`${f.id}:${f.evidenceVersion}`} style={s.item}><Text style={s.title}>{f.reviewStatus==='Deferred'?'◷':'✓'} {f.reviewStatus} · {f.title}</Text><Text>{f.dateRange.start} – {f.dateRange.end} · {f.currency}</Text></View>)}</>}
 {!!packet?.informational.length&&<><GlassButton secondary title={showInfo?'Hide observations':'View informational observations'} onPress={()=>setShowInfo(!showInfo)}/>{showInfo&&packet.informational.map(f=><View key={f.id} style={s.item}><Text style={s.title}>{f.title}</Text><Text>{f.observation}</Text><Text>{f.currency} {f.totalAmount.toFixed(2)} · {f.dateRange.start} – {f.dateRange.end}</Text></View>)}</>}
 </Container>;
}
const s=StyleSheet.create({heading:{fontSize:20,fontWeight:'700'},title:{fontWeight:'600',fontSize:16},meta:{fontSize:13,color:'#74766d'},item:{gap:8,padding:14,backgroundColor:'#dce1d6',borderWidth:1,borderColor:'rgba(39,46,35,.12)',borderRadius:18},row:{flexDirection:'row',flexWrap:'wrap',gap:8}});

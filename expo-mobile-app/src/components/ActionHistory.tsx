import { useRef,useState } from 'react';
import { Text,View } from 'react-native';
import type { ActionHistoryItem,ActionOutcomeInput } from '../../../shared/contracts/actionHistoryTypes';
import { Field,GlassButton,GlassCard } from './SoftGlass';
const labels={awaiting_update:'Awaiting your update',done:'Done · reported by you',changed:'Changed · reported by you',not_done:'Not done',not_now:'Not now'};
function HistoryCard({item,save,refresh}:{item:ActionHistoryItem;save:(id:string,body:ActionOutcomeInput)=>Promise<void>;refresh:()=>Promise<void>}){
 const [outcome,setOutcome]=useState<ActionOutcomeInput['outcome']>(item.outcome==='awaiting_update'?'not_now':item.outcome);
 const [note,setNote]=useState(item.note);const [editing,setEditing]=useState(false);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [saved,setSaved]=useState(false);
 const pending=useRef<{key:string;requestId:string}|null>(null);
 async function submit(){setBusy(true);setError('');setSaved(false);const key=JSON.stringify({revision:item.revision,outcome,note});if(pending.current?.key!==key)pending.current={key,requestId:`history-${Date.now()}-${Math.random().toString(36).slice(2)}`};try{await save(item.id,{expectedRevision:item.revision,requestId:pending.current.requestId,outcome,note});setSaved(true);setEditing(false);pending.current=null;}catch(e){setError(e instanceof Error?e.message:'Could not save. Your answer is still here.');}finally{setBusy(false);}}
 return <GlassCard><Text style={{fontWeight:'700',fontSize:18}}>{item.suggestion.title}</Text><Text>{item.suggestion.description}</Text>
 <Text>Proposed {item.proposedAt.slice(0,10)} · Last reviewed {item.lastReviewedAt.slice(0,10)}</Text>
 {item.suggestion.amount!==null&&<Text>{new Intl.NumberFormat('en-IE',{style:'currency',currency:item.suggestion.currency}).format(item.suggestion.amount)}</Text>}
 <Text accessibilityLiveRegion="polite" style={{fontWeight:'700'}}>{item.outcome==='awaiting_update'?'◷':'✓'} {labels[item.outcome]}</Text>
 {!!item.note&&!editing&&<Text>{item.note}</Text>}{saved&&<Text accessibilityLiveRegion="polite">Saved</Text>}
 <GlassButton secondary title={editing?'Close update':'Update what happened'} disabled={busy} onPress={()=>setEditing(!editing)}/>
 {editing&&<><Text>This records your update only. Financial records are updated separately.</Text><View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>{(['done','changed','not_done','not_now'] as const).map(v=><GlassButton key={v} secondary title={`${outcome===v?'✓ ':''}${v==='done'?'Done':v==='changed'?'Changed':v==='not_done'?'Not done':'Not now'}`} disabled={busy} onPress={()=>{setOutcome(v);setSaved(false);}}/>)}</View>
 <Field label={outcome==='changed'?'What did you do differently?':'Note (optional)'} value={note} onChange={setNote}/>
 {!!error&&<><Text accessibilityRole="alert">{error}</Text><GlassButton secondary title="Refresh history (keep my input)" disabled={busy} onPress={()=>{setBusy(true);void refresh().catch(e=>setError(e.message)).finally(()=>setBusy(false));}}/></>}
 <GlassButton title={busy?'Saving…':'Save update'} disabled={busy||(outcome==='changed'&&!note.trim())} onPress={()=>void submit()}/></>}
 </GlassCard>;
}
export function ActionHistory({items,save,refresh}:{items:ActionHistoryItem[];save:(id:string,body:ActionOutcomeInput)=>Promise<void>;refresh:()=>Promise<void>}){return <View style={{gap:12}}><Text style={{fontSize:20,fontWeight:'700'}}>Action history</Text>{!items.length&&<Text>Useful suggestions you request with “Review my finances” will appear here.</Text>}{items.map(item=><HistoryCard key={item.id} item={item} save={save} refresh={refresh}/>)}</View>;}

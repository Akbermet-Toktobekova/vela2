import { Alert, Switch, Text, View } from 'react-native';
import type { PIDatabaseSeed } from '../../../shared/profile/seed';
import { GlassButton as Button, GlassCard } from './SoftGlass';
import { OperationList } from './PlanningEditors';

export interface UploadedFile {id:string;accountId:string;fileName:string;status:string;uploadedAt:string;importId?:string;message?:string;}
export function StatementLibrary({state,version,uploads=[],history=[],onboarding=false,retain=true,upload,remove,retry,correctRow,retention,editOperation,focus,onFocusConsumed,refresh}: {
  state:PIDatabaseSeed;version:number;uploads?:UploadedFile[];history?:any[];onboarding?:boolean;retain?:boolean;
  upload:(accountId:string)=>void;remove:(id:string,staged:boolean)=>Promise<void>;retry:(id:string)=>Promise<void>;
  correctRow:(importId:string,rowId:string,body:unknown)=>Promise<void>;retention:(retain:boolean)=>Promise<void>;editOperation:(id:string,body:unknown)=>Promise<void>;
  focus?:{id:string;key:string}|null;onFocusConsumed?:()=>void;
  refresh?:()=>Promise<void>;
}) {
  const rows = [...uploads.map(u=>({...u,staged:true})),...history.filter(h=>!uploads.some(u=>u.importId===h.id)).map(h=>({id:h.id,accountId:h.accountId,fileName:h.fileName,status:h.status,uploadedAt:'',importId:h.id,message:h.message,staged:false}))];
  const perform=async(action:()=>Promise<void>)=>{try{await action();}catch(e){Alert.alert('Could not update',e instanceof Error?e.message:'Please retry.');}};
  return <View style={{gap:14}}>
    {!onboarding&&<><View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:8}}><Switch value={retain} onValueChange={value=>void perform(()=>retention(value))}/><Text style={{flex:1}}>Keep original statements after processing</Text></View><Text>Existing saved originals remain until you delete their statement. This setting controls future imports.</Text></>}
    {!state.accounts.length&&<Text>Add an account in the Accounts step before uploading statements.</Text>}
    {state.accounts.map(account=><GlassCard key={account.id}>
      <View style={{flexDirection:'row',flexWrap:'wrap',alignItems:'center',gap:10}}><View style={{flex:1,minWidth:120}}><Text>{account.name} ({account.currency})</Text><Text>{account.institution}</Text></View><Button title="+ Upload" onPress={()=>upload(account.id)}/></View>
      {rows.filter(row=>row.accountId===account.id).map(row=>{
        const original=history.find(h=>h.id===row.importId);
        const ids=original?.statements?.map((s:any)=>s.id)||[original?.statement?.id].filter(Boolean);
        return <View key={row.id} style={{gap:8,padding:12,borderRadius:16,backgroundColor:'#dce1d6'}}>
          <Text selectable style={{flexShrink:1}}>{row.fileName}</Text>
          <Text>{row.status==='uploaded'?'Uploaded · ready to process':row.status==='complete'?'Processed':row.status.replaceAll('_',' ')}</Text>
          {!onboarding&&<><Text>{original?.statement?.periodStart || ''}{original?.statement?.periodEnd?' – '+original.statement.periodEnd:''}</Text>{!!row.message&&<Text>{row.message}</Text>}</>}
          <View style={{flexDirection:'row',flexWrap:'wrap',gap:8}}>
            <Button secondary title={onboarding?'Remove':'Delete'} onPress={()=>Alert.alert('Delete statement?',onboarding?'Remove this upload?':'Delete the original and records unique to this statement? Shared operations remain. Vela will reevaluate affected results.',[{text:'Cancel'},{text:'Delete',style:'destructive',onPress:()=>void perform(()=>remove(row.id,row.staged))}])}/>
            {!onboarding&&row.status==='needs_attention'&&!row.importId&&<Button secondary title="Retry" onPress={()=>void perform(()=>retry(row.id))}/>}
          </View>
          {!onboarding && (ids.length > 0 || original?.unresolvedRows?.length > 0) &&
            <OperationList state={state} version={version} statementIds={ids} save={editOperation} refresh={refresh}
              accountId={row.accountId} issues={original?.unresolvedRows}
              correctIssue={original ? (issueId, body) => correctRow(original.id, issueId, body) : undefined}
              focus={focus} onFocusConsumed={onFocusConsumed}/>}
        </View>;
      })}
      {!rows.some(row=>row.accountId===account.id)&&<Text>No statements uploaded yet.</Text>}
    </GlassCard>)}
    {onboarding&&<Text>Upload all your files. Processing starts in the background when you enter Today.</Text>}
  </View>;
}

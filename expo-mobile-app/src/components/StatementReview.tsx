import { useState } from 'react';
import { StyleSheet,Text,TextInput,View } from 'react-native';
import { GlassButton,colors } from './SoftGlass';

const fields = ['date','description','amount','debit','credit','currency','balance','reference'];
export function StatementReview({preview,busy,revise}:{preview:any;busy:boolean;revise:(body:any)=>void}) {
 const p=preview.parsing;
 const [options,setOptions]=useState<any>(p?.options || {});
 const [excluded,setExcluded]=useState<string[]>(p?.issues?.filter((i:any)=>i.excluded).map((i:any)=>i.id)||[]);
 const [header,setHeader]=useState(p?.options?.headerRow ? String(p.options.headerRow) : '');
 const [mapping,setMapping]=useState<Record<string,string>>(Object.fromEntries(Object.entries(p?.options?.mapping||{}).map(([k,v])=>[k,String(Number(v)+1)])));
 const [coordinates,setCoordinates]=useState<Record<string,string>>({});
 const [corrected,setCorrected]=useState('');
 const [details,setDetails]=useState(false);
 const [ack,setAck]=useState(p?.options?.acknowledgeReconciliation || false);
 const [error,setError]=useState('');
 const option=(field:string,value:string)=>setOptions({...options,[field]:value||undefined});
 function apply(extra:any={}) {
  setError('');
  if(header.trim()&&(!/^\d+$/.test(header)||Number(header)<1)){setError('Enter a positive header row number.');return;}
  const map:Record<string,number>={};
  for(const [field,value] of Object.entries(mapping)) {if(!value.trim())continue;if(!/^\d+$/.test(value)||Number(value)<1){setError('Column numbers start at 1.');return;}map[field]=Number(value)-1;}
  const pdfColumns=[];
  for(const [field,value] of Object.entries(coordinates)) {if(!value.trim())continue;const parts=value.split(',').map(Number);if(parts.length!==2||parts.some(n=>!Number.isFinite(n))||parts[0]>=parts[1]){setError('Use a left,right coordinate pair, with left less than right.');return;}pdfColumns.push({field,xMin:parts[0],xMax:parts[1]});}
  revise({options:{...options,...(header.trim()?{headerRow:Number(header)}:{}),...(Object.keys(map).length?{mapping:map}:{}),...(pdfColumns.length?{pdfColumns}:{})},excludedRows:excluded,acknowledgeReconciliation:ack,...extra});
 }
 return <View style={s.box}>
  <Text style={s.title}>Check how your statement is read</Text>
  <Text>{p?.format || preview.fileName?.split('.').pop()} · {preview.sheetName || 'Original document'}</Text>
  {!!preview.message&&<Text>{preview.message}</Text>}
  {preview.sheetNames?.map((name:string)=><GlassButton key={name} secondary title={`Worksheet: ${name}`} disabled={busy} onPress={()=>apply({sheetName:name})}/>)}
  <Text style={s.title}>Date convention</Text>
  <Text>{p?.requiresDateConvention?'Choose the convention used throughout this file.':'ISO dates keep the calendar day written in the file.'}</Text>
  <View style={s.row}>{['DMY','MDY','YMD'].map(v=><GlassButton key={v} secondary title={`${options.dateConvention===v?'✓ ':''}${v}`} disabled={busy} onPress={()=>option('dateConvention',v)}/>)}</View>
  <Text style={s.title}>Number convention</Text>
  <View style={s.row}>{[['decimal-point','1,234.56'],['decimal-comma','1.234,56']].map(([v,label])=><GlassButton key={v} secondary title={`${options.numberConvention===v?'✓ ':''}${label}`} disabled={busy} onPress={()=>option('numberConvention',v)}/>)}</View>
  <Text>Header row (starting at 1; blank keeps automatic detection)</Text><TextInput accessibilityLabel="Header row" value={header} onChangeText={setHeader} keyboardType="number-pad" style={s.input}/>
  <GlassButton secondary title={details?'Hide column mapping and source':'Show column mapping and source'} onPress={()=>setDetails(!details)}/>
  {details&&<>
   <Text>{(p?.headers||[]).map((h:string,i:number)=>`${i+1}: ${h}`).join(' · ')}</Text>
   <Text>Map columns by number. Leave optional fields empty. Use either signed amount or debit and credit.</Text>
   {fields.map(field=><View key={field}><Text>{field}</Text><TextInput accessibilityLabel={`${field} column number`} value={mapping[field]||''} onChangeText={v=>setMapping({...mapping,[field]:v})} keyboardType="number-pad" style={s.input}/></View>)}
   {!!preview.sourceLines?.length&&<><Text>PDF source coordinates: map each field using left,right x coordinates.</Text>{fields.map(field=><View key={field}><Text>{field} left,right</Text><TextInput accessibilityLabel={`${field} PDF coordinates`} value={coordinates[field]||''} onChangeText={v=>setCoordinates({...coordinates,[field]:v})} style={s.input}/></View>)}<Text selectable>{preview.sourceLines.map((r:any)=>`Page ${r.page}, row ${r.line}: ${r.text}${r.items?' '+JSON.stringify(r.items):''}`).join('\n')}</Text></>}
   <Text>Corrected CSV (optional). Enter only values verified against the original.</Text><TextInput accessibilityLabel="Corrected statement CSV" multiline value={corrected} onChangeText={setCorrected} style={[s.input,{minHeight:120}]}/>
  </>}
  {p?.issues?.map((issue:any)=><View key={issue.id} style={s.issue}><Text>Row {issue.source?.row}{issue.source?.page?` · page ${issue.source.page}`:''}: {issue.message}</Text><Text selectable>{issue.original?.join(' | ')}</Text><GlassButton secondary title={excluded.includes(issue.id)?'Restore this row':'Explicitly exclude this row'} disabled={busy} onPress={()=>setExcluded(excluded.includes(issue.id)?excluded.filter(id=>id!==issue.id):[...excluded,issue.id])}/></View>)}
  {!!p?.reconciliation?.length&&<><Text>Balance discrepancies</Text>{p.reconciliation.map((r:any,i:number)=><Text key={i}>{r.currency} · row {r.sourceRow}: calculated {r.expected}, recorded {r.actual}, difference {r.difference}</Text>)}<GlassButton secondary title={ack?'✓ Discrepancies acknowledged':'Acknowledge and retain discrepancies for review'} disabled={busy} onPress={()=>setAck(!ack)}/></>}
  {!!error&&<Text accessibilityRole="alert">{error}</Text>}
  <GlassButton title="Apply corrections and preview" disabled={busy} onPress={()=>apply(corrected.trim()?{correctedCsv:corrected}:{})}/>
 </View>;
}
const s=StyleSheet.create({box:{gap:10,paddingVertical:12},title:{fontWeight:'700',fontSize:16},row:{flexDirection:'row',flexWrap:'wrap',gap:8},input:{borderWidth:1,borderColor:colors.line,borderRadius:12,padding:12,minHeight:48},issue:{gap:8,paddingVertical:10}});

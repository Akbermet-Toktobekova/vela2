import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createBlankUserSeedData } from '../../../shared/profile/seed';
import { buildFinancialSnapshot } from '../../../shared/processing/snapshotBuilder';
import { TransactionClassifier } from '../analyzer/transactionClassifier';
import { LLMClient } from '../ai/llmClient';
import { prompts } from '../ai/prompts';

// Explicit synthetic data only. This capture never mutates a registered profile.
const state = createBlankUserSeedData();
state.preferences.statementReviewMode = 'automatic';
const now = new Date().toISOString(); const date = now.slice(0,10);
state.accounts = ['checking','savings'].map((id,index)=>({id,userId:state.user.id,name:id,institution:'Synthetic bank',currency:'EUR',
  purposes:['daily_spending'],fundsOwnership:'personal',personalAvailableAmount:null,isPrimary:index===0,notes:'',createdAt:now,updatedAt:now}));
state.transactions = [
  {id:'subscription-example',accountId:'checking',amount:-15,description:'Netflix monthly subscription'},
  {id:'own-transfer-out',accountId:'checking',amount:-100,description:'Transfer to my own savings account REF-SYNTHETIC'},
  {id:'own-transfer-in',accountId:'savings',amount:100,description:'Transfer from my own checking account REF-SYNTHETIC'},
].map(row=>({...row,userId:state.user.id,statementId:'synthetic-statement',date,currency:'EUR',counterparty:'',reference:'',rawRow:{},createdAt:now}));
state.transferMatches=[{id:'synthetic-match',userId:state.user.id,outgoingTransactionId:'own-transfer-out',incomingTransactionId:'own-transfer-in',outgoingAccountId:'checking',incomingAccountId:'savings',amount:100,currency:'EUR',date,description:'Synthetic matched evidence',status:'matched'}];
const provider=new LLMClient({provider:'gemini',mockMode:false,geminiPrimaryModel:'gemini-3.5-flash-lite',pinGeminiModel:true});
const output=await TransactionClassifier.classify({snapshot:buildFinancialSnapshot(state),llmClient:provider});
const capture={synthetic:true,executedAt:now,financialReferenceDate:date,promptVersion:prompts.classification.version,
  input:{transactions:state.transactions,matchedTransfers:state.transferMatches},output,
  storage:'Report file only; no user PI changed.',limitations:'AI labels remain candidates. No subscription or internal transfer is user-confirmed in this capture.'};
const directory=resolve('../docs/coordination/evidence/STATEMENT-AUTO');await mkdir(directory,{recursive:true});
await writeFile(resolve(directory,'gemini-labels.json'),JSON.stringify(capture,null,2));
console.log(JSON.stringify({models:output.models,labels:Object.values(output.updatedClassifications).map(c=>({id:c.transactionId,category:c.category,type:c.economicType,transferCandidate:c.isInternalTransferCandidate,status:c.status}))}));
if(!output.models.length||output.models.some(m=>!m.liveCallUsed))process.exitCode=1;

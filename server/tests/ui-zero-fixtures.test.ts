import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { createBlankUserSeedData } from '../../react-app/src/database/seed';
import { parseStatementCSVContent } from '../../react-app/src/services/statementParser';
import type { FinancialAccount } from '../../react-app/src/types/pi';
const dir=path.resolve('../user-inputs/synthetic/ui-zero');
const account: FinancialAccount={id:'ui_zero',userId:'ui_zero',name:'Test Main',institution:'Test Bank',currency:'EUR',purposes:['daily_spending'],fundsOwnership:'personal',personalAvailableAmount:null,isPrimary:true,notes:'',createdAt:'',updatedAt:''};
function parse(fileName:string, prior?:ReturnType<typeof parseStatementCSVContent>) {
 return parseStatementCSVContent({userId:account.userId,account,allAccounts:[account],fileName,content:fs.readFileSync(path.join(dir,fileName),'utf8'),existingStatements:prior?[prior.statement]:[],existingTransactions:prior?.transactions||[]});
}
describe('New-user manual UI fixtures',()=>{
 it('starts blank without demo financial data',()=>{const blank=createBlankUserSeedData(); for(const key of ['accounts','balances','incomes','obligations','debts','goals','goalAllocations','statements','transactions','recommendations'] as const) expect(blank[key]).toEqual([]); expect(blank.onboarding.currentStep).toBe(1); expect(blank.user.isDemoMode).toBe(false);});
 it('imports 8 main transactions and reported balance 1800',()=>{const r=parse('01-main.csv');expect(r.transactions).toHaveLength(8);expect(r.statement.closingBalance).toBe(1800);expect(r.transactions.reduce((sum,t)=>sum+t.amount,0)).toBe(800);});
 it('provides a matching opposite transfer leg',()=>{const main=parse('01-main.csv');const savings=parse('02-savings.csv');expect(savings.transactions).toHaveLength(1);expect(savings.statement.closingBalance).toBe(700);expect(main.transactions.find(t=>t.reference==='OWN-1015')!.amount+savings.transactions[0].amount).toBe(0);});
 it('skips repeated files',()=>{const first=parse('01-main.csv');const r=parse('01-main.csv',first);expect(r.transactions).toHaveLength(0);expect(r.statement.duplicateCountSkipped).toBe(8);});
 it('imports only the new transaction from overlapping history',()=>{const r=parse('03-overlap.csv',parse('01-main.csv'));expect(r.transactions.map(t=>t.amount)).toEqual([-5]);expect(r.statement.duplicateCountSkipped).toBe(1);expect(r.statement.closingBalance).toBe(1795);});
 it('reports two rejected rows and reads decimal comma',()=>{const r=parse('04-invalid.csv');expect(r.transactions.map(t=>t.amount)).toEqual([-12.5]);expect(r.rejectedRows).toHaveLength(2);expect(r.statement.status).toBe('needs_review');});
 it('does not invent transactions for unsupported text',()=>{const r=parse('05-unsupported.txt');expect(r.transactions).toHaveLength(0);expect(['failed','unsupported_format']).toContain(r.statement.status);});
});

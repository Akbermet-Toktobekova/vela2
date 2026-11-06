import { describe,expect,it } from 'vitest';
import { deriveObservedPlan,goalAllocated,goalTimeline } from '../../expo-mobile-app/src/screens/planMath';
import { buildFinancialSnapshot } from '../../shared/processing/snapshotBuilder';
import { createDemoSeedData } from './fixtures/profile';

describe('Mobile planning display math',()=>{
 it('keeps currencies and calendar periods separate and does not infer unknown operations',()=>{
  const snapshot=buildFinancialSnapshot(createDemoSeedData());
  const base=snapshot.transactions[0];
  snapshot.transactions=[
   {...base,id:'eur',currency:'EUR',date:'2026-10-12',amount:-20},
   {...base,id:'usd',currency:'USD',date:'2026-10-12',amount:-900},
   {...base,id:'later',currency:'EUR',date:'2026-11-01',amount:-100},
   {...base,id:'unknown',currency:'EUR',date:'2026-10-12',amount:400},
  ];
  const classification=Object.values(snapshot.classifications)[0];
  snapshot.classifications={eur:{...classification,economicType:'expense',category:'groceries_food'},usd:{...classification,economicType:'expense',category:'groceries_food'},later:{...classification,economicType:'expense',category:'groceries_food'}};
  const result=deriveObservedPlan(snapshot,'EUR','2026-10');
  expect(result.grossSpending).toBe(20);expect(result.income).toBe(0);expect(result.unknownCount).toBe(1);expect(result.count).toBe(2);
 });
 it('separates transfers, debt payments, work movements and refunds from spending categories',()=>{
  const snapshot=buildFinancialSnapshot(createDemoSeedData());const base=snapshot.transactions[0];const classification=Object.values(snapshot.classifications)[0];
  const types=['expense','refund','internal_transfer','debt_payment','work_business_movement'] as const;
  snapshot.transactions=types.map((type,i)=>({...base,id:type,currency:'EUR',date:'2026-10-12',amount:[-100,20,-300,-40,-50][i]}));
  snapshot.classifications=Object.fromEntries(types.map(type=>[type,{...classification,economicType:type,category:'other'}]));
  const result=deriveObservedPlan(snapshot,'EUR');
  expect(result.netSpending).toBe(80);expect(result.categories.other).toBe(100);expect(result.transfers).toBe(300);expect(result.debtPayments).toBe(40);expect(result.workMovements).toBe(50);
 });
 it('flags contradictory classified signs and preserves a net credit after refunds',()=>{
  const snapshot=buildFinancialSnapshot(createDemoSeedData());const base=snapshot.transactions[0];const classification=Object.values(snapshot.classifications)[0];
  const rows=[['expense',-10],['refund',50],['income',-200],['refundBad',-40],['expenseBad',90]] as const;
  snapshot.transactions=rows.map(([id,amount])=>({...base,id,currency:'EUR',date:'2026-10-12',amount}));
  snapshot.classifications=Object.fromEntries(rows.map(([id])=>[id,{...classification,economicType:id==='refundBad'?'refund':id==='expenseBad'?'expense':id,category:'other'}]));
  const result=deriveObservedPlan(snapshot,'EUR');expect(result.netSpending).toBe(-40);expect(result.income).toBe(0);expect(result.refunds).toBe(50);expect(result.unknownCount).toBe(3);
 });
 it('uses only selected-goal matching-currency allocations',()=>{
  const snapshot=buildFinancialSnapshot(createDemoSeedData());const goal=snapshot.goals[0];const allocation=snapshot.goalAllocations[0];
  snapshot.goalAllocations=[{...allocation,goalId:goal.id,currency:goal.currency,amount:40},{...allocation,goalId:'other',currency:goal.currency,amount:500},{...allocation,goalId:goal.id,currency:goal.currency==='EUR'?'USD':'EUR',amount:900}];
  expect(goalAllocated(snapshot,goal)).toBe(40);
 });
 it('handles zero contributions, missing targets and reached goals without inventing dates',()=>{
  expect(goalTimeline(500,100,0).months).toBeNull();expect(goalTimeline(null,100,80).remaining).toBeNull();expect(goalTimeline(100,100,0).months).toBe(0);expect(goalTimeline(500,100,NaN).date).toBeNull();expect(goalTimeline(500,0,Number.MIN_VALUE).months).toBeNull();expect(goalTimeline(1e15,0,1).months).toBeNull();
 });
 it('clamps month-end dates instead of skipping a month',()=>{
  const result=goalTimeline(100,0,100,new Date(2026,0,31,12));
  expect(result.months).toBe(1);expect(result.date?.getMonth()).toBe(1);expect(result.date?.getDate()).toBe(28);
 });
});

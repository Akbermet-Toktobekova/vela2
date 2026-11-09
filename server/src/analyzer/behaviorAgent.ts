import { TransactionClassifier } from './transactionClassifier';
export type { BehaviorAnalysisResult } from './transactionClassifier';

export class BehaviorAgent {
  public static get lastCallTelemetry() { return TransactionClassifier.lastCallTelemetry; }

  static async analyzeTransactions(params: Parameters<typeof TransactionClassifier.classify>[0]) {
    const output = await TransactionClassifier.classify(params);
    Object.assign(params.snapshot.classifications, output.updatedClassifications);
    return output;
  }
}

export type StatementField = 'date'|'description'|'amount'|'debit'|'credit'|'currency'|'balance'|'reference';
export type ParsingOptions = {
 dateConvention?:'DMY'|'MDY'|'YMD'; numberConvention?:'decimal-point'|'decimal-comma';
 headerRow?:number; delimiter?:','|';'|'\t'; mapping?:Partial<Record<StatementField,number>>;
 pdfColumns?:Array<{field:StatementField;xMin:number;xMax:number}>;
 acknowledgeReconciliation?:boolean;
};
export type SourceLocation={row:number;page?:number;sheet?:string};
export type RowIssue={id:string;source:SourceLocation;code:string;message:string;original:string[];excluded:boolean};
export type SourceCell={value:string|number;display:string;dateSerial?:boolean;formula?:boolean};
export type SourceRecord={cells:SourceCell[];source:SourceLocation;malformed?:boolean};
export type NormalizedTransaction={date:string;description:string;amount:number;currency:string;balance?:number;reference?:string;original:string[];source:SourceLocation};
export type ParsingReview={format:string;options:ParsingOptions;headers:string[];issues:RowIssue[];mappingRequired:boolean;requiresDateConvention:boolean;requiresNumberConvention:boolean;reconciliation:Array<{currency:string;sourceRow:number;expected:number;actual:number;difference:number}>;encoding?:string;excelDateSystem?:'1900'|'1904'};
export type NormalizedResult={rows:NormalizedTransaction[];review:ParsingReview};

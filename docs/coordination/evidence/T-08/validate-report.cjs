const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'../../../..');
const ts = require(path.join(root,'server/node_modules/typescript'));
const file = 'C:/Users/sanat/.codex/visualizations/2026/11/03/01a1a38b-0ccc-7043-8f0d-956c8c02b778/current-development-state.canvas.tsx';
const program=ts.createProgram([file],{
  noEmit:true,skipLibCheck:true,strict:true,target:ts.ScriptTarget.ES2022,
  module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,
  jsx:ts.JsxEmit.ReactJSX,types:[],baseUrl:root,
  paths:{'cursor/canvas':['C:/Users/sanat/.cursor/skills-cursor/canvas/sdk/index.d.ts'],
    'react':['react-app/node_modules/@types/react/index.d.ts'],
    'react/jsx-runtime':['react-app/node_modules/@types/react/jsx-runtime.d.ts']}
});
const errors=ts.getPreEmitDiagnostics(program);
for(const d of errors)console.log(ts.flattenDiagnosticMessageText(d.messageText,'\n'));
const data=JSON.parse(fs.readFileSync(path.join(root,'docs/coordination/current-development-state.json'),'utf8'));
const missing=data.features.filter(f=>!f.title||!f.stage||!f.developed||!f.verification||!f.remaining||!f.source||f.confidence<0||f.confidence>100);
const formulas=data.features.filter(f=>f.category==='Canonical formulas');
const actions=data.features.filter(f=>f.category==='Canonical action coverage');
console.log(JSON.stringify({canvasTypeErrors:errors.length,featureAssessments:data.features.length,incompleteAssessments:missing.length,formulaAssessments:formulas.length,actionAssessments:actions.length,endpointAssessments:data.features.filter(f=>f.category==='HTTP endpoint inventory').length}));
if(errors.length||missing.length||formulas.length!==20||actions.length!==26)process.exitCode=1;

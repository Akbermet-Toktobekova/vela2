const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../../../..');
const ts = require(path.join(root, 'server/node_modules/typescript'));
const manifest = JSON.parse(fs.readFileSync(path.join(__dirname,'source-manifest.json'),'utf8'));
const symbols = [], tests = [];
for (const item of manifest) {
  if (!/\.tsx?$/.test(item.path)) continue;
  const raw = fs.readFileSync(path.join(root,item.path),'utf8');
  const source = ts.createSourceFile(item.path,raw,ts.ScriptTarget.Latest,true,item.path.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  function line(node) { return source.getLineAndCharacterOfPosition(node.getStart(source)).line+1; }
  function visit(node, scope='') {
    let next=scope;
    if ((ts.isClassDeclaration(node)||ts.isInterfaceDeclaration(node)) && node.name) next=node.name.text;
    if ((ts.isFunctionDeclaration(node)||ts.isClassDeclaration(node)||ts.isMethodDeclaration(node)||ts.isInterfaceDeclaration(node)||ts.isTypeAliasDeclaration(node)) && node.name) {
      symbols.push({file:item.path,line:line(node),kind:ts.SyntaxKind[node.kind],name:(scope?scope+'.':'')+node.name.getText(source)});
    }
    if (ts.isVariableDeclaration(node) && node.initializer && (ts.isArrowFunction(node.initializer)||ts.isFunctionExpression(node.initializer))) {
      symbols.push({file:item.path,line:line(node),kind:'FunctionVariable',name:node.name.getText(source)});
    }
    if(ts.isCallExpression(node)&&/server\/tests\/.*\.test\.ts$/.test(item.path)) {
      const expr=node.expression.getText(source);
      const arg=node.arguments[0];
      if(arg&&ts.isStringLiteralLike(arg)&&(expr==='it'||expr==='test'||expr.startsWith('it.skipIf('))) {
        tests.push({file:item.path,line:line(node),name:arg.text,evidenceClass:item.path.includes('live-ai')?'Real Gemini, direct services; conditional on key':item.path.includes('http-workflow')?(arg.text.startsWith('3.')?'Direct helper':'Actual HTTP with mock AI'):item.path.includes('14-scenarios')?'Synthetic real modules; orchestrator AI mocked; no browser':'Real unit/contract/numerical modules; no HTTP/AI/browser'});
      }
    }
    ts.forEachChild(node,n=>visit(n,next));
  }
  visit(source);
}
fs.writeFileSync(path.join(__dirname,'code-symbol-inventory.json'),JSON.stringify(symbols,null,2));
fs.writeFileSync(path.join(__dirname,'test-inventory.json'),JSON.stringify(tests,null,2));
const report=JSON.parse(fs.readFileSync(path.join(root,'docs/coordination/current-development-state.json'),'utf8'));
const invalid=[];
for(const f of report.features) for(const ref of f.source.split(';')) {
  const m=ref.trim().match(/^(.*):(\d+)$/); if(!m) {invalid.push(ref);continue;}
  const p=path.join(root,m[1]);
  if(!fs.existsSync(p))invalid.push(ref); else if(+m[2]>fs.readFileSync(p,'utf8').split(/\r?\n/).length)invalid.push(ref);
}
console.log(JSON.stringify({namedSymbols:symbols.length,testDeclarations:tests.length,featureAssessments:report.features.length,sourceReferenceErrors:invalid},null,2));
if(tests.length!==36||invalid.length)process.exitCode=1;

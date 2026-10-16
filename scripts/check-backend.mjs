import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import { generateKeyPairSync, sign } from 'node:crypto';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const projectRequire=createRequire(path.join(root,'package.json'));
const ts=projectRequire('typescript');
function load(file,{env={},mocks={},fetchImpl=()=>{throw Error('Unexpected external request');}}={}) {
 const exports={};
 const source=ts.transpileModule(readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(source,{exports,require:(id)=>id==='server-only'?{}:mocks[id]||projectRequire(id),process:{env},fetch:fetchImpl,Request,Response,URL,URLSearchParams,Buffer,AbortSignal,crypto,console,setTimeout,clearTimeout});
 return exports;
}
const platform=load('src/lib/platform.ts');let checks=0;
function rejectsDraft(changes,age=17){assert.throws(()=>platform.validateClassDraft({...draft,...changes},age,now));checks++;}
const now=Date.now();const draft={title:'Toán cộng đồng',category:'toan',programType:'basic_science',objectives:'Hiểu đạo hàm',mainTopics:'Đạo hàm',materialsUrl:'https://example.com/slides',interactiveActivities:'Thảo luận',practiceExercises:'',referenceSources:'SGK',platform:'web',meetUrl:'',scheduledTime:new Date(now+4*86400000).toISOString(),demoDate:new Date(now+86400000).toISOString(),maxSeats:6};
assert.equal(platform.validateClassDraft(draft,16,now).maxSeats,6);checks++;
rejectsDraft({},15);rejectsDraft({programType:'toString'});rejectsDraft({maxSeats:7});rejectsDraft({demoDate:new Date(now+3*86400000).toISOString()});rejectsDraft({objectives:''});rejectsDraft({materialsUrl:'javascript:alert(1)'});rejectsDraft({platform:'meet',meetUrl:'https://meet.google.com.evil.test/a'});
assert.equal(platform.validateClassDraft({...draft,programType:'study_buddy'},12,now).programType,'study_buddy');checks++;
for(const value of [null,[],42]){assert.throws(()=>platform.asObject(value));checks++;}
const backend=load('src/lib/server/backend.ts',{mocks:{'@/lib/platform':platform}});
await assert.rejects(()=>backend.authenticate(new Request('https://example.com')),error=>error.status===401);checks++;
await assert.rejects(()=>backend.body(new Request('https://example.com',{method:'POST',body:'{broken'})),error=>error.status===400);checks++;
await assert.rejects(()=>backend.body(new Request('https://example.com',{method:'POST',body:'x'.repeat(33000)})),error=>error.status===413);checks++;
assert.throws(()=>backend.requireReviewer({role:'learner'}),error=>error.status===403);checks++;
const missingAI=load('src/lib/server/ai.ts',{mocks:{'@/lib/platform':platform}});
await assert.rejects(()=>missingAI.askPencily('hello'),error=>error.status===503);checks++;
let sent;const ai=load('src/lib/server/ai.ts',{env:{GEMINI_API_KEY:'test-only-secret',GEMINI_MODEL:'test-model'},mocks:{'@/lib/platform':platform},fetchImpl:async(url,options)=>{sent={url,options};return Response.json({candidates:[{content:{parts:[{text:'Trả lời thử'}]}}]});}});
assert.equal(await ai.askPencily('Quy trình tutor?'),'Trả lời thử');assert(!sent.url.includes('test-only-secret'));assert.equal(sent.options.headers['x-goog-api-key'],'test-only-secret');assert(JSON.parse(sent.options.body).systemInstruction.parts[0].text.includes('pending_demo'));checks+=4;
const {NextRequest}=projectRequire('next/server');
for(const ready of [false,true]){const route=load('src/app/api/auth/discord/route.ts',{env:ready?{NEXT_PUBLIC_SUPABASE_URL:'https://example.supabase.co',NEXT_PUBLIC_SUPABASE_ANON_KEY:'test',NEXT_PUBLIC_DISCORD_ENABLED:'true'}:{}});const response=await route.GET(new NextRequest('http://localhost:3000/api/auth/discord'));assert.equal(response.status,307);assert(response.headers.get('location').includes(ready?'provider=discord':'auth_error=discord_not_configured'));checks++;}
const {publicKey,privateKey}=generateKeyPairSync('ed25519');const publicHex=publicKey.export({type:'spki',format:'der'}).subarray(-32).toString('hex');
let deferred;const discord=load('src/app/api/discord/interactions/route.ts',{env:{DISCORD_PUBLIC_KEY:publicHex,DISCORD_GUILD_ID:'guild',DISCORD_APPLICATION_ID:'app'},mocks:{'next/server':{after:(callback)=>{deferred=callback;}},'@/lib/server/ai':{askPencily:async()=> 'ok'},'@/lib/server/backend':{rateLimit:async()=>{}}}});
function signed(event,timestamp=String(Math.floor(Date.now()/1000)),tamper=false){const raw=JSON.stringify(event);const signature=sign(null,Buffer.from(timestamp+raw),privateKey).toString('hex');return new Request('https://example.com/api/discord/interactions',{method:'POST',headers:{'x-signature-ed25519':signature,'x-signature-timestamp':timestamp},body:tamper?raw+' ':raw});}
assert.equal((await discord.POST(signed({type:1}))).status,200);checks++;
assert.equal((await discord.POST(signed({type:1},undefined,true))).status,401);checks++;
assert.equal((await discord.POST(signed({type:1},'1'))).status,401);checks++;
const unauthorized=await discord.POST(signed({type:2,application_id:'app',guild_id:'wrong',data:{name:'ask',options:[{name:'question',value:'hello'}]}}));assert.equal((await unauthorized.json()).type,4);assert.equal(deferred,undefined);checks++;
const allowed=await discord.POST(signed({type:2,application_id:'app',guild_id:'guild',token:'test',member:{user:{id:'test'}},data:{name:'ask',options:[{name:'question',value:'hello'}]}}));assert.equal((await allowed.json()).type,5);assert.equal(typeof deferred,'function');checks++;
console.log(`PASS ${checks} backend checks: input validation, age/syllabus/48-hour rules, auth guards, quotas payload limits, AI configuration, PKCE entry and signed Discord requests. No external services called.`);

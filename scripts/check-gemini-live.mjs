// Calls the real Gemini API using the same AI function/prompt as the website.
// Run from the project: node scripts/check-gemini-live.mjs
// To see models available to your key: node scripts/check-gemini-live.mjs --list-models
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(path.join(root,'package.json'));
require('@next/env').loadEnvConfig(root);
async function main(){
 const key=process.env.GEMINI_API_KEY;
 if(!key?.trim())throw Error('Chưa có GEMINI_API_KEY. Điền khóa vào .env.local; không gửi khóa vào chat.');
 if(process.argv.includes('--list-models')){
  let next='';do{
   const url=new URL('https://generativelanguage.googleapis.com/v1beta/models');url.searchParams.set('pageSize','100');if(next)url.searchParams.set('pageToken',next);
   const response=await fetch(url,{headers:{'x-goog-api-key':key},signal:AbortSignal.timeout(25000)});
   if(!response.ok)throw Error(`Không đọc được danh sách model: HTTP ${response.status}. Kiểm tra khóa/quyền truy cập.`);
   const data=await response.json();for(const model of data.models||[])if(model.supportedGenerationMethods?.includes('generateContent'))console.log(model.name.replace(/^models\//,''));next=data.nextPageToken||'';
  }while(next);return;
 }
 if(!process.env.GEMINI_MODEL?.trim())throw Error('Chưa có GEMINI_MODEL. Chạy --list-models rồi điền một model hỗ trợ generateContent vào .env.local.');
 const ts=require('typescript');
 function load(relative,mocks={}){
  const exports={};const compiled=ts.transpileModule(readFileSync(path.join(root,relative),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(compiled,{exports,require:(id)=>id==='server-only'?{}:mocks[id]||require(id),process,fetch,Response,URL,AbortSignal,console});return exports;
 }
 const platform=load('src/lib/platform.ts');
 const {askPencily}=load('src/lib/server/ai.ts',{'@/lib/platform':platform});
 const question=process.argv.slice(2).filter(arg=>!arg.startsWith('--')).join(' ')||'Tutor 15 tuổi có được dạy Toán & KHTN không? Demo cần trước buổi học bao lâu? Nếu ngồi một mình trong phòng có được cộng PP không?';
 if(question.length>2000)throw Error('Câu hỏi tối đa 2.000 ký tự.');
 console.log('Đang gọi Gemini thật bằng hàm AI dùng chung của website…');
 const started=Date.now();const answer=await askPencily(question);
 console.log(JSON.stringify({live:true,model:process.env.GEMINI_MODEL,elapsedMs:Date.now()-started,question,answer},null,2));
 console.log('API đã phản hồi thật. Cần đọc và đánh giá nội dung trả lời; thành công HTTP không chứng minh mọi câu trả lời đều đúng.');
}
main().catch(error=>{console.error(error instanceof Error?error.message:'Kiểm tra Gemini chưa thành công.');process.exitCode=1;});

// Read-only connection/schema check. Does not create tables or change permissions.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(path.join(root,'package.json'));require('@next/env').loadEnvConfig(root);
const {createClient}=require('@supabase/supabase-js');
async function main(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,clientKey=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,serverKey=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!clientKey||!serverKey)throw Error('Điền đủ NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY và SUPABASE_SERVICE_ROLE_KEY trong .env.local.');
 const options={auth:{persistSession:false,autoRefreshToken:false}};
 const admin=createClient(url,serverKey,options),client=createClient(url,clientKey,options);
 let failed=false;
 for(const table of ['users','tutor_applications','classes','enrollments','class_reviews','notification_outbox','room_members','room_signals','attendance_records','attendance_challenges','points_ledger','reward_redemptions','api_quotas']){
  const {error}=await admin.from(table).select('*',{head:true,count:'exact'}).limit(1);
  if(error){failed=true;console.error(`${table}: HTTP/database error ${error.code||'unknown'} — kiểm tra khóa và chạy migration.`);}else console.log(`${table}: OK`);
 }
 const {error}=await client.from('classes').select('id',{head:true}).limit(1);
 if(error){failed=true;console.error(`Public catalog: error ${error.code||'unknown'} — kiểm tra public key/RLS.`);}else console.log('Public catalog: OK');
 if(failed)throw Error('Kết nối/schema chưa hoàn chỉnh. Script chỉ đọc, không tự thay database.');
 console.log('PASS: đã đọc schema từ Supabase thật. Chưa kiểm thử email, Realtime, cuộc gọi hoặc mọi policy RLS.');
}
main().catch(error=>{console.error(error instanceof Error?error.message:'Chưa kết nối được Supabase.');process.exitCode=1;});

import assert from 'node:assert/strict';
const origin=process.argv[2]||'http://localhost:3000';let checks=0;
for(const route of ['/','/dashboard?tab=classes','/dashboard?tab=become-tutor','/dashboard?tab=assistant','/signin','/auth/callback','/room/test']){
 const response=await fetch(origin+route);assert.equal(response.status,200,route);const html=await response.text();assert(!html.includes('Module not found'),route);checks++;
}
for(const route of ['/api/profile','/api/tutors','/api/enrollments','/api/academic','/api/rewards','/api/rooms/test']){
 const response=await fetch(origin+route);assert.equal(response.status,401,route);checks++;
}
for(const route of ['/api/classes','/api/ai/ask','/api/attendance/heartbeat','/api/rewards','/api/enrollments','/api/rooms/test/signal']){
 const response=await fetch(origin+route,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});assert.equal(response.status,401,route);checks++;
}
assert.equal((await fetch(origin+'/api/discord/interactions',{method:'POST',body:'{}'})).status,401);checks++;
const catalog=await fetch(origin+'/api/classes');assert([200,503].includes(catalog.status));checks++;
console.log(`PASS ${checks} HTTP checks against ${origin}: public pages render, anonymous privileged actions are denied, unsigned Discord requests rejected, catalog handles missing configuration.`);

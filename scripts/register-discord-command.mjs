// Explicit maintenance command: registers /ask in the configured test/community guild.
// Node 20+: node --env-file=.env.local scripts/register-discord-command.mjs
for (const key of ['DISCORD_APPLICATION_ID','DISCORD_GUILD_ID','DISCORD_BOT_TOKEN']) {
 if (!process.env[key]) throw new Error(`Missing ${key}`);
}
const response=await fetch(`https://discord.com/api/v10/applications/${process.env.DISCORD_APPLICATION_ID}/guilds/${process.env.DISCORD_GUILD_ID}/commands`,{
 method:'POST',headers:{Authorization:`Bot ${process.env.DISCORD_BOT_TOKEN}`,'Content-Type':'application/json'},
 body:JSON.stringify({name:'ask',description:'Hỏi Cú Pencily về cộng đồng và việc học',type:1,options:[{type:3,name:'question',description:'Câu hỏi của bạn',required:true,max_length:2000}]})
});
if(!response.ok)throw Error(`Discord registration failed: HTTP ${response.status}`);
console.log('Registered /ask in the configured guild.');

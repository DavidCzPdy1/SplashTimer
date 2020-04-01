// Show time to next splash - discord.gg/potions

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)));
    // hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return (hours * 60 + minutes) > 30 ? hours + "h " + minutes + "m " : "SOON" ;
}

function RemaningTime(now) {
	let closestSplash = new Date(now)
	if (now.getHours() < splashDates[days[now.getDay()]]) {
		closestSplash.setHours(splashDates[days[now.getDay()]], 0, 0)
	}
	else {
		closestSplash.setHours(splashDates[days[(now.getDay() + 1) % 7]], 0, 0)
		closestSplash.setDate(closestSplash.getDate() + 1)
	}
	const remaning = new Date(closestSplash - now)
	return remaning
}


const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


const splashDates = {
'Sun': 12,
'Mon': 19,
'Tue': 19,
'Wed': 18,
'Thu': 19,
'Fri': 18,
'Sat': 12,
}

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

client.setInterval(function() {
	let statsChannel = client.channels.get("684500101267325108"); //honza

	statsChannel.setName(`Next Splash: ${msToTime(RemaningTime(new Date()))}`)
}, 10000);

//trades
client.on("message", (message) => {
	if (message.channel.name == 'trades' && ! message.content.match(
		/IGN:.*\nWant:.*\nHave:.*/i
		)) {
		message.author.send(`__You had mistake in your message in__ <#693391520862175323>. Your previous message was:\n**${message.content} **\nPlease correct it this way:\nIGN: *[nickname]*		*[shift+enter]*\nWant: *[What you want]*	*[shift+enter]*\nHave: Coins\nVisit me/Dm me`)
		message.delete();
	}
})


//auction

client.on("message", (message) => {
	if (message.channel.name == 'auction' && ! message.content.match(
		/Ah.*/i
		)) {
		message.author.send(`__You had mistake in your message in__ <#692733839830679602>. You previous message was:\n**${message.content} **\nPlease correct it this way:\n/ah *[nickname]* *[AOTD]* *[10hours]* *[500coins]*`)
		message.delete();
	
	}
})


//rental

client.on("message", (message) => {
	if (message.channel.name == 'rental' && ! message.content.match(
		/IGN:.*\nNeed:.*/i
		)) {
		message.author.send(`__You had mistake in your message in__ <#693108296843919452>. Your previous message was:\n**${message.content} **\nPlease correct it this way:\nIGN: *[nickname]*		*[shift+enter]*\nNeed: *[What you need]*		*[shift+enter]*\nBonus: (not required)		*[shift+enter]*\nDM me (not required)`)
		message.delete();
	
	}
})


//reaction role

var emojiname = ["yes","potion"];
var rolename=["Member","Notice"];


client.on('message', msg => {
	if(msg.member.hasPermission('MANAGE_ROLES')) {
		if(msg.content.startsWith("!reaction")){
			if(!msg.channel.guild) return;
				for(let n in emojiname){
					var emoji =[msg.guild.emojis.find(r => r.name == emojiname[n])];
					for(let i in emoji){
						//console.log(emoji[i])
						msg.react(emoji[i]);
				}
			}
		}	
	}
});

client.on("messageReactionAdd",(reaction,user)=>{
	if(!user) return;
	if(user.bot)return;
	if(!reaction.message.channel.guild) return;
	for(let n in emojiname){
		if(reaction.emoji.name == emojiname[n]){
			let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);          
		reaction.message.guild.member(user).addRole(role).catch(console.error);
		}
	}
});

client.on("messageReactionRemove",(reaction,user)=>{
	if(!user) return;
	if(user.bot)return;
	if(!reaction.message.channel.guild) return;
	for(let n in emojiname){
		if(reaction.emoji.name == emojiname[n]){
			let role = reaction.message.guild.roles.find(r => r.name == rolename[n]);   
		reaction.message.guild.member(user).removeRole(role).catch(console.error);
		}
	}
});




client.login(process.env.BOT_TOKEN);

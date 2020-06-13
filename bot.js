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

  return hours + "h " + minutes + "m " ;
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
client.on("ready", () =>{
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

	statsChannel.setName(`Planned Splash in: ${msToTime(RemaningTime(new Date()))}`)
}, 10000);

//trades
client.on("message", (message) => {
	if (message.channel.name == '🤝trades' && ! message.content.match(
		/IGN:.*\nWant:.*\nHave:.*/i
		)) {
		message.author.send(`__You had mistake in your message in__ <#693391520862175323>. Your previous message was:\n**${message.content} **\nPlease correct it this way:\nIGN: *[nickname]*		*[shift+enter]*\nWant: *[What you want]*	*[shift+enter]*\nHave: Coins\nVisit me/Dm me`)
		message.delete();
	}
})


//auction

client.on("message", (message) => {
	if (message.channel.name == 'auctions' && ! message.content.match(
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





client.login(process.env.BOT_TOKEN);

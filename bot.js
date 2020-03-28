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
'Sun': 13,
'Mon': 20,
'Tue': 20,
'Wed': 19,
'Thu': 20,
'Fri': 19,
'Sat': 13,
}

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

client.setInterval(function() {
	let statsChannel = client.channels.get("684500101267325108"); //honza

	statsChannel.setName(`Next Splash: ${msToTime(RemaningTime(new Date()))}`)
}, 10000);

client.on("message", (message) => {
	if (message.channel.name == 'nevsimejte-si' && ! message.content.match(
		/IGN:.*\nWant:.*\nHave:.*/i
		)) {
		message.author.send(`__You had mistake in your message in__ <#692371503127461948>. Your previous message was:\n**${message.content} **\nPlease correct it this way:\nIGN: DavidCzPdy     *[shift+enter]*\nWant: AOTD      *[shift+enter]*\nHave: Coins\nVisit me/Dm me`)
		message.delete();
	}
})


//auction

client.on("message", (message) => {
	if (message.channel.name == 'auction' && ! message.content.match(
		/Ah.*/i
		)) {
		message.author.send(`f`)
		message.delete();
	
	}
})


//rental

client.on("message", (message) => {
	if (message.channel.name == 'rental' && ! message.content.match(
		/IGN:.*\nNeed:.*/i
		)) {
		message.author.send(`__You had mistake in your message in__ <#693108296843919452>. Your previous message was:\n**${message.content} **\nPlease correct it this way:\nIGN: [*nickname*]\nNeed: [*What you need*]		*[shift+enter]*\nBonus: (not required)		*[shift+enter]*\nDM me (not required)`)
		message.delete();
	
	}
})

client.login(process.env.BOT_TOKEN);

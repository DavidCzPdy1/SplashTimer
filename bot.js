// Show time to next splash
// Todo - NOW 5 minutes afer splash, Add option 2x splash per day, 

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return (hours * 60 + minutes) > 5 ? hours + "h " + minutes + "m " : "NOW" ;
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
	//let statsChannel = client.channels.get("684474064412082226"); //ja
	let statsChannel = client.channels.get("684500101267325108"); //honza

	statsChannel.setName(`Next Splash: ${msToTime(RemaningTime(new Date()))}`)
}, 10000);

client.login(process.env.BOT_TOKEN);

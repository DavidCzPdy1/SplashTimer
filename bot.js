// show time to next splash


function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return (hours + minutes) != 0 ? hours + "h " + minutes + "m " : "NOW" ;
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
'Sun': 14, 
'Mon': 21, 
'Tue': 21, 
'Wed': 20, 
'Thu': 21, 
'Fri': 20, 
'Sat': 14, 
}

const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

// let now = new Date(Date.parse('07 Mar 2020 15:05:00'))
// console.log(`Time: ${msToTime(RemaningTime(now))}`)
// return



client.setInterval(function() {
	//let statsChannel = client.channels.get("684474064412082226"); //ja
	let statsChannel = client.channels.get("684500101267325108"); //honza

	statsChannel.setName(`Next Splash: ${msToTime(RemaningTime(new Date()))}`)
}, 30000);

client.login(process.env.BOT_TOKEN);

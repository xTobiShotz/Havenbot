//Requiring Discord.js & Moment.js
const Discord = require("discord.js");
const moment = require('moment');
//Setting moment locale to English
moment.locale('en');

var bot = new Discord.Client();
bot.config = require('./config.json');
bot.log = require('./functions/log.js');
bot.caps = require('./functions/capitalize.js');

//Ready & Activity Handler
bot.on('ready', () => require('./events/ready.js')(bot));
//Server Join Handler
bot.on('guildMemberAdd', member => require('./events/guildmemberadd.js')(bot, member, moment));
//Server Leave Handler
bot.on('guildMemberRemove', member => require('./events/guildmemberremove.js')(bot, member, moment));
//Message Event Handler
bot.on('message', message => require('./events/message.js')(bot, message, Discord, moment));
//Hopefully Error Logging
bot.on("error", error => require('./events/error.js')(bot, error));

//Commands
bot.commands = new Discord.Collection();
bot.commands.set('8ball', require('./commands/8ball.js'));
bot.commands.set('checkmember', require('./commands/checkmember.js'));
bot.commands.set('checkrole', require('./commands/checkrole.js'));
bot.commands.set('checkself', require('./commands/checkself.js'));
bot.commands.set('d6', require('./commands/d6.js'));
bot.commands.set('d20', require('./commands/d20.js'));
bot.commands.set('del', require('./commands/del.js'));
bot.commands.set('fcinfo', require('./commands/fcinfo.js'));
bot.commands.set('help', require('./commands/help.js'));
bot.commands.set('iam', require('./commands/iam.js'));
bot.commands.set('fa', require('./commands/iamforce.js'));
bot.commands.set('ping', require('./commands/ping.js'));
bot.commands.set('poll', require('./commands/poll.js'));
bot.commands.set('rate', require('./commands/rate.js'));
bot.commands.set('say', require('./commands/say.js'));
bot.commands.set('lookup', require('./commands/lookup.js'));
bot.commands.set('mute', require('./commands/mute.js'));
bot.commands.set('updatedata', require('./commands/updatedata.js'));
bot.commands.set('test', require('./commands/test.js'));
bot.commands.set('ship', require('./commands/ship.js'));
bot.commands.set('antibully', require('./commands/antibully.js'));
bot.commands.set('antiantibully', require('./commands/antiantibully.js'));
bot.commands.set('delchar', require('./commands/delchar.js'));
bot.commands.set('updateme', require('./commands/updateme.js'));

//Login with the Token
bot.login(bot.config.token);

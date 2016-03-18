var c = require('child_process');

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('./lib/Botkit.js');
var os = require('os');

var controller = Botkit.slackbot({
    debug: false,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();

function getUID(user, callback) {
    c.exec('id ' + user, function (err, response, stderr) {
        if (response.includes('no such user')) { // Half assed way to check if there's a user, someone, again, please fix this if you can spare the time
            callback(false); // Basically
        }
        else {
            callback(parseInt(response.replace('uid=', '').split('(')[0])); // half-assed way to pull user id, only tested on ubuntu 14.04, someone please confirm and/or fix this :D
        }
    });
}

controller.hears([''],'direct_message,direct_mention',function(bot, message) {

    bot.api.reactions.add({ // Add a heart cause why the hell not
        timestamp: message.ts,
        channel: message.channel,
        name: 'heart',
    },function(err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(',err);
        }
    });

    getUID(message.user, function (uid) {
        if (!uid) {
            // Add user
            c.exec('useradd -g users -s /bin/bash -p $(echo ' + parseInt(Math.random()*999999999999999).toString(36) + ' | openssl passwd -1 -stdin) ' + message.user, function (err, stdout, stderr) {
                if (err) {
                    bot.reply(message, err);
                }
                else {
                    console.log('shell user created:', message.user);
                    getUID(message.user, function (uid) {
                        c.exec(message.text, {uid:uid}, function (err, stdout, stderr) {
                            if (err) bot.reply(message, err);
                            else bot.reply(message, stdout);
                        });
                    });
                }
            });
        }
        else {
            c.exec(message.text, {uid:uid}, function (err, stdout, stderr) {
                if (err) bot.reply(message, err);
                else bot.reply(message, stdout);
            });
        }
    });
});

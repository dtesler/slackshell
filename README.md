## Slackshell
BASH terminal for your slack team


### Getting started

Clone the repository on to your desired server (Ubuntu 14.04 Recommended)

``` shell
git clone https://github.com/dtesler/slackshell.git
```

next, create a bot for your team at https://my.slack.com/services/new/bot

![Creating a bot](http://i.imgur.com/M7XqlcT.gif)

Once you have created the bot, copy your token

![Bot Token](http://i.imgur.com/cBmDAuV.png)

and then execute the following in your project directory

``` shell
token={token} node bot.js
```

where *{token}* is your token that you previously copied

You can now execute terminal commands (each slack user is a separate linux user) by either sending a direct message to the bot or mentioning it in a channel where it is present.

![Slackshell test](http://i.imgur.com/oqeX8KF.gif)

###### please contribute to my crap code

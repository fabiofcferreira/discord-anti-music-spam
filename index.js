'use strict';

require('dotenv').config();

import Discord from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN;
if (token !== 'string' || !token.length) {
  console.error(new Error("Invalid authentication token"))
  process.exit(1);
}

const message = process.env.DISCORD_BOT_MESSAGE || 'Play music using #music only.';

// Create an instance of a Discord client
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Bot online and ready!');
});

client.on('message', message => {
  const includesPlayCommannd = message.content.includes('-p') ||
    message.content.includes('.p') ||
    message.content.includes('-play') ||
    message.content.includes('-pause') ||
    message.content.includes('-skip') ||
    message.content.includes('-shuffle') ||
    message.content.includes('-stop');

  const includesStreamWebsites = message.content.includse('youtube.com') ||
    message.content.includse('spotify.com') ||
    message.content.includse('deezer.com') ||
    message.content.includse('vimeo.com');

  const usingNonMusicChannel = message.channel.name !== 'music';

  if (includesPlayCommannd && includesStreamWebsites || usingNonMusicChannel) {
    message.channel.send(message);
    message.delete();
  }
});

// Login
client.login(token);
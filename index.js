const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./jsoon/config.json');
const { id } = require('./jsoon/config.json');
const schedule = require('node-schedule');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
	console.log(`QGM запущен, не забудьте поставить звёздочку! https://github.com/ZizaRDev/QG`);
  client.user.setPresence({ activities: [{ name: 'ZizaRDev made QGM 🩸' }], status: 'dnd' });
  const job = schedule.scheduleJob('0 8/8 * * * *', function(){
  fs.readFile('./jsoon/quotes.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return;
    } try {
      const wordsData = JSON.parse(data);
      const wordsArray = wordsData.quotes;
      const randomIndex = Math.floor(Math.random() * wordsArray.length);
      const randomWord = wordsArray[randomIndex];
      client.users.send(`${id}`, `${randomWord}`);
    } catch (error) {
      console.error('Ошибка обработки JSON:', error);
    }
});
});
});
client.login(token)

'use strict';

const Telegraf = require('telegraf');
const fs = require('fs');
const req = require('request');
const Telegram = require('telegraf/telegram');

const flickr = require('./flickr');
const inclds = require('./includes');
const bot = new Telegraf('947236111:AAHvvf4MmoHcGrn77A9o_E6kZRIZ090D2rQ');
const telegram = new Telegram('947236111:AAHvvf4MmoHcGrn77A9o_E6kZRIZ090D2rQ');
const names = JSON.parse(fs.readFileSync('names.json'));

bot.use((ctx, next) => {
    const start = new Date()
    return next(ctx).then(() => {
        const ms = new Date() - start
        console.log('Response time %sms', ms)
    })
})

bot.command('romagay', (cmd) => {
    cmd.reply('Да я гей і шо')
})

bot.on('sticker', ctx => {
    console.log(ctx.message.sticker);
    const sticker = ctx.message.sticker

    if (sticker.file_id === "CAADAgADAlcAAp7OCwABS7hfCLsVXC0WBA") {
        telegram.sendSticker(msg.chat.id, "CAADAgADAlcAAp7OCwABS7hfCLsVXC0WBA");
    }
})

bot.on('text', (ctx) => {
    console.log(ctx.message)
    console.log('Message: ' + ctx.message.text);
    const msg = ctx.message;
    const text = msg.text;

    if (inclds.botName(text) && inclds.whatRUDoin(text)) {
        ctx.reply('Братва я ніхачу стрелять, я наблюдаю');
    }
    if (inclds.newName(text)) {
        let newName = msg.text.split(inclds.newName(text))[1];
        newName = newName ? newName.trim() : false;
        if (!newName) return false;
        names['' + msg.from.id] = { name: newName };

        fs.writeFile('names.json', JSON.stringify(names), (err) => {
            if (err) throw err;
            console.log('New name added');
        });

        ctx.reply(`Ок, ${newName}. Понял принял обработал`);
    }

    if (inclds.botName(text) && inclds.greeting(text)) {
        ctx.reply(`Вечер в хату, ${names['' + msg.from.id].name ? names['' + msg.from.id].name : msg.from.first_namegit}`)
    }

    if (inclds.botName(text) && inclds.whatDoULike(text)) {
        flickr.loadRandom('rozen+maiden', ctx, 'like');
    }

    if(inclds.botName(text) && inclds.showYourself(text)) {
        telegram.sendSticker(msg.chat.id, "CAADAgADGAADpC-ZHEO4a5lES82jFgQ")
    }

    if(inclds.catGirl(text)) {
        telegram.sendSticker(msg.chat.id, "CAADAgADAlcAAp7OCwABS7hfCLsVXC0WBA");
        ctx.reply('Хоть ти лопні хоть ти тресні некодевочки на первом месте')
    }


})

bot.launch()

console.log(names)
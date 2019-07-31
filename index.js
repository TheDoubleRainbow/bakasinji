'use strict';

var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(__dirname + '/'));
app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, './src/index.html'));
});
app.listen(process.env.PORT || 8080);

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
        telegram.sendSticker(ctx.message.chat.id, "CAADAgADAlcAAp7OCwABS7hfCLsVXC0WBA");
    }

    if (sticker.file_id === "CAADAgADCFgAAp7OCwAB0rRJHu579_kWBA") {
        telegram.sendSticker(ctx.message.chat.id, "CAADAgADCFgAAp7OCwAB0rRJHu579_kWBA");
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
        ctx.reply(`Вечер в хату, ${names['' + msg.from.id] ? names['' + msg.from.id].name : msg.from.first_namegit}`)
    }

    if (inclds.botName(text) && inclds.whatDoULike(text)) {
        flickr.loadRandom('rozen+maiden', ctx, 'like');
    }

    if(inclds.botName(text) && inclds.showYourself(text)) {
        telegram.sendSticker(msg.chat.id, "CAADBAADaAEAAptH1gABZRf_PvLISs0WBA")
    }

    if(inclds.catGirl(text)) {
        telegram.sendSticker(msg.chat.id, "CAADAgADAlcAAp7OCwABS7hfCLsVXC0WBA");
        ctx.reply('Хоть ти лопні хоть ти тресні некодевочки на первом месте')
    }

    if(inclds.football(text)) {
        ctx.reply('Футбольчік так то топ');
        telegram.sendSticker(msg.chat.id, "CAADAgADRAEAAvmEHxwzgKCb2ndnXxYE");
    }

    if(inclds.boomer(text)) {
        telegram.sendSticker(msg.chat.id, "CAADAgADCFgAAp7OCwAB0rRJHu579_kWBA");
    }

    if(inclds.botName(text) && inclds.topWaifu(text)) {
        ctx.reply('Авторітетно заявляю шо Аска Лэнгли Сорью[2] (яп. 惣流・アスカ・ラングレー ; рус. Сорю Асука Рангурэ) є самой топовой вайфу в цьом міре, Хіната кусає локті прям, та і вобще Наруто переоценьонне аніме, я сам с детсва за єву, колись порізав вени після 25й серіі, мене тоді ще в ялту забрали, вот а потом ми поєбалися, ну як ми, там історія сложна. Короче смисл то в чом, шо треба уважать інших, а то будеш як золотий гусь якого розпотрошили з той басні');
        telegram.sendSticker(msg.chat.id, "CAADBAADfAEAAptH1gAB7StjPTo6d4IWBA");
    }

    if(inclds.y2007(text)) {
        telegram.sendSticker(msg.chat.id, "CAADAgADMAAD1RIaCwfc2P78oMQkFgQ");
    }

})

bot.launch()

console.log(names)
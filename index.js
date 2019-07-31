'use strict';

const Telegraf = require('telegraf');
const fs = require('fs');
const req = require('request');

const files = require('./lib/files');
const mal = require('./api/mal');
const flickr = require('./api/flickr');
const inclds = require('./lib/includes');
const stickers = require('./stickers');
const images = require('./lib/images');
const music = require('./lib/music');
const bot = new Telegraf('947236111:AAHvvf4MmoHcGrn77A9o_E6kZRIZ090D2rQ');
const names = JSON.parse(fs.readFileSync('namesList.json'));

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
    try {
        console.log(ctx.message.sticker);
        const sticker = ctx.message.sticker;
        const msg = ctx.message;
        const replyName = names['' + msg.from.id] ? names['' + msg.from.id].name : msg.from.first_name;
    
        if (sticker.file_id === "CAADAgADAlcAAp7OCwABS7hfCLsVXC0WBA") {
            stickers.send(ctx, 'neko');
        }
    
        if (sticker.file_id === "CAADAgADCFgAAp7OCwAB0rRJHu579_kWBA") {
            stickers.send(ctx, 'boomer');
        }
    
        if (sticker.file_id === "CAADAgADVVAAAp7OCwABEh58loKKDpkWBA") {
            ctx.reply(`Хорошо шо ти спитав, ${replyName}. Нормально, ошейніки робим, по тіхотьку по маленьку`);
        }
    }
    catch(e) {
        console.log(e);
    }
})

bot.on('text', (ctx) => {
    try {
        console.log(ctx.message)
        console.log('Message: ' + ctx.message.text);
        const msg = ctx.message;
        const text = msg.text;
        const replyName = names['' + msg.from.id] ? names['' + msg.from.id].name : msg.from.first_name;
    
        if (inclds.botName(text) && inclds.whatRUDoin(text)) {
            ctx.reply('Братва я ніхачу стрелять, я наблюдаю');
        }
        if (inclds.newName(text)) {
            let newName = msg.text.split(inclds.newName(text))[1];
            newName = newName ? newName.trim() : false;
            if (!newName) return false;
            names['' + msg.from.id] = { name: newName };
    
            fs.writeFile('namesList.json', JSON.stringify(names), (err) => {
                if (err) throw err;
                console.log('New name added');
            });
    
            ctx.reply(`Ок, ${newName}. Понял принял обработал`);
        }
    
        if(inclds.botName(text) && inclds.whatsMyName(text)) {
            if (names['' + msg.from.id]) {
                ctx.reply(`Тебе звати ${replyName}`);
            }
        }
    
        if (inclds.botName(text) && inclds.greeting(text)) {
            ctx.reply(`Вечер в хату, ${replyName}`)
        }
    
        if (inclds.botName(text) && inclds.whatDoULike(text)) {
            flickr.loadRandom('rozen+maiden', ctx, 'like');
        }
    
        if(inclds.botName(text) && inclds.showYourself(text)) {
            stickers.send(ctx, 'bot');
        }
    
        if(inclds.catGirl(text)) {
            stickers.send(ctx, 'neko');
            ctx.reply('Хоть ти лопні хоть ти тресні некодевочки на первом месте')
        }
    
        if(inclds.football(text)) {
            ctx.reply('Футбольчік так то топ');
            stickers.send(ctx, 'gay');
        }
    
        if(inclds.boomer(text)) {
            stickers.send(ctx, 'boomer');
        }
    
        if(inclds.botName(text) && inclds.topWaifu(text)) {
            ctx.reply('Авторітетно заявляю шо Аска Лэнгли Сорью[2] (яп. 惣流・アスカ・ラングレー ; рус. Сорю Асука Рангурэ) є самой топовой вайфу в цьом міре, Хіната кусає локті прям, та і вобще Наруто переоценьонне аніме, я сам с детсва за єву, колись порізав вени після 25й серіі, мене тоді ще в ялту забрали, вот а потом ми поєбалися, ну як ми, там історія сложна. Короче смисл то в чом, шо треба уважать інших, а то будеш як золотий гусь якого розпотрошили з той басні');
            stickers.send(ctx, 'aska');
        }
    
        if(inclds.y2007(text)) {
            stickers.send(ctx, 'y2007');
        }
    
        if(inclds.roma(text) && inclds.insult(text)) {
            ctx.reply("Ну він парень інтересний, тут не поспориш");
        }
        if(inclds.schoolMan(text) && inclds.insult(text)) {
            ctx.reply("Лучше про Сашку і не скажеш");
        }
    
        if(inclds.botName(text) && inclds.whereDoULive(text)) {
            ctx.reply("Тут \n http://www.voe.com.ua/sites/default/files/img_5641_1.jpg");
        }
    
        if(inclds.botName(text) && inclds.gooseVyebons(text)) {
            ctx.reply("Веталь, успокойся а то я привстану і пизда, я воєвал на домбасе так то")
        }
    
    
        if(inclds.botName(text) && inclds.appreciation(text)) {
            ctx.reply("Спасіба, ти тож нічо вроді");
        }
    
        if(inclds.agree(text)) {
            ctx.reply("Согли кста");
        }
    
        if(inclds.send(text) && inclds.photo(text) && inclds.ukraine(text)) {
            flickr.loadRandom('japan+akihabara', ctx, 'ukraine');
        }
    
        if(inclds.send(text) && inclds.photo(text) && inclds.europe(text)) {
            flickr.loadRandom('ukraine+city', ctx, 'europe');
        }
    
        if(inclds.botName(text) && inclds.send(text) && inclds.waifu(text)) {
            mal.randomWaifu(ctx, replyName);
        }
    
        if(inclds.botName(text) && inclds.send(text) && inclds.anime(text)) {
            mal.randomTitle(ctx, replyName);
        }
    
        if(inclds.trista(text)) {
            let tractors = ['tractor1', 'tractor2', 'tractor3'];
            stickers.send(ctx, tractors[Math.floor(Math.random() * tractors.length)]);
            ctx.reply("А от і трактористи под\'єхалі");
        }

        if(inclds.tell(text) && inclds.batya(text)) {
            images.sendImage(ctx, `/img/batya.jpg`)
        }

        if(inclds.fuckYouLeatherMan(text)) {
            ctx.reply(`А ннахуй тебе шкіряний чоловіче. \n${replyName} давай з\'ясуємо це на ринзі`)
        }

        if(inclds.download(text) && inclds.youtube(text)) {
            music.download(ctx);
        }
    }
    catch(e) {
        console.log(e);
    }

})

bot.launch()

console.log(names)
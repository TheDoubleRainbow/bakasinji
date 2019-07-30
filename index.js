'use strict';

const Telegraf = require('telegraf');
const fs = require('fs');
const bot = new Telegraf('947236111:AAHvvf4MmoHcGrn77A9o_E6kZRIZ090D2rQ');

const names = JSON.parse(fs.readFileSync('names.json'));

const inclds = {

    newName: function(text) { return check(text, "називай мене", "Називай мене", "отнине я", "мене звать", "Мене звать") },
    botName: function(text) { return check(text, "Сінзі", "Сіндзі", "Бака", "бака", "сінзі", "сіндзі") },
    greeting: function(text) { return check(text, "хай", "Хай", "хааай", "хаай", "Прівет", "прівет", "привет", "прівет", "Ку", "ку", "Шо как", "шо как", "як сам") },

    
}

function check(text) {
    for(let i = 1; i < arguments.length; i++ ) {
        if(text.includes(arguments[i])) return arguments[i];
    }

    return false;
}

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

bot.on('text', (ctx) => {
    console.log('Message: ' + ctx.message.text);
    const msg = ctx.message;
    const text = msg.text;

    if(msg.text.includes('шо ти робиш')){
        ctx.reply('Братва я ніхачу стрелять, я наблюдаю');
    }
    if(inclds.newName(text)) {
        let newName = msg.text.split(inclds.newName(text))[1];
        newName = newName ? newName.trim() : false;
        if (!newName) return false;
        names['' + msg.from.id] = {name: newName};

        fs.writeFile('names.json', JSON.stringify(names), (err) => {
            if (err) throw err;
            console.log('New name added');
        });

        ctx.reply(`Ок, ${newName}. Понял принял обработал`);
    }

    if(inclds.botName(text) && inclds.greeting(text)) {
        ctx.reply(`Вечер в хату, ${names['' + msg.from.id].name ? names['' + msg.from.id].name : msg.from.first_namegit }, я інертне говно кста`)
    }
})

bot.launch()

console.log(names)
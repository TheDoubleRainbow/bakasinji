const Telegram = require('telegraf/telegram');
const telegram = new Telegram('947236111:AAHvvf4MmoHcGrn77A9o_E6kZRIZ090D2rQ');
const fs = require('fs');
const url = 'https://bakasinji.herokuapp.com'

module.exports = {
    sendImage: (ctx, imageUrl) => {
        console.log(url + imageUrl)
        fs.readFile(url + imageUrl, (e, data) => {
                if (e) {
                    ctx.reply('Дядя, шото проблеми с картінкой сорі' + e);
                    return false;
                }
                telegram.sendPhoto(ctx.message.chat.id, data)
        });
    }
}
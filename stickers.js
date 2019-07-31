const Telegram = require('telegraf/telegram');
const telegram = new Telegram('947236111:AAHvvf4MmoHcGrn77A9o_E6kZRIZ090D2rQ');

const stickers = {
    zavod: 'CAADAgADVVAAAp7OCwABEh58loKKDpkWBA',
    neko: 'CAADAgADAlcAAp7OCwABS7hfCLsVXC0WBA',
    boomer: 'CAADAgADCFgAAp7OCwAB0rRJHu579_kWBA',
    gay: 'CAADAgADRAEAAvmEHxwzgKCb2ndnXxYE',
    aska: 'CAADBAADfAEAAptH1gAB7StjPTo6d4IWBA',
    y2007: 'CAADAgADMAAD1RIaCwfc2P78oMQkFgQ',
    bot: 'CAADBAADaAEAAptH1gABZRf_PvLISs0WBA',
    tractor1: 'CAADBAADLwADUYzPARrQtT3rhRFHFgQ',
    tractor2: 'CAADBAADbgYAAlGMzwG3c7fnndwFqBYE',
    tractor3: 'CAADBAADLQADUYzPAUMQtKJ0YQJpFgQ',
}

module.exports = {
    send: (ctx, name) => {
        console.log(stickers[name])
        telegram.sendSticker(ctx.message.chat.id, stickers[name]);
    }
}
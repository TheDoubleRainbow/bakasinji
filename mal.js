const Jikan = require('jikan-node');
const mal = new Jikan();

module.exports = {
    randomWaifu: (ctx, name) => {
        const page = Math.floor(Math.random() * 10);
        mal.findTop('characters', page).then(result => {
            const items = result.top;
            const rnd = Math.floor(Math.random() * items.length);
            const waifu = items[rnd];
            ctx.reply(`${name}, не знаю як тобі, но мені лічно нрав ${waifu.title} \n ${waifu.url}`);
        })
    },

    randomTitle: (ctx, name) => {
        const page = Math.floor(Math.random() * 10);
        mal.findTop('anime', page).then(result => {
            const items = result.top;
            const rnd = Math.floor(Math.random() * items.length);
            const anime = items[rnd];
            ctx.reply(`${name}, сам дивився, от тупо душа отвічаю - ${anime.title} \n ${anime.url}`);
        })
    }
}
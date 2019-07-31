const horizon = require('horizon-youtube-mp3');
const path = require('path');


module.exports = {
    download: (ctx) => {
        const text = ctx.message.text;
        let link = text.split('watch?v=')[1];
        console.log(link)
        horizon.getInfo('https://youtube.com/watch?v=NEA0BLnpOtg', function(err, data){
            if(data.videoTimeSec > 1000) {
                ctx.reply('Сорі відос дуже довгий(');
                return false; 
            }
            else {
                ctx.reply(`Скачую ${data.videoName}...`);
                horizon.downloadToLocal(
                    'https://youtube.com/watch?v=NEA0BLnpOtg',
                    './public/music/',
                    data.videoName,
                    null,
                    null,
                    onConvertVideoComplete
                );
                function onConvertVideoComplete(err, result) {
                    console.log(err, result);
                }
            }
        });
    }
}
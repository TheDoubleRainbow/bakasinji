var YoutubeMp3Downloader = require("youtube-mp3-downloader");
const Telegram = require('telegraf/telegram');
const telegram = new Telegram('947236111:AAHvvf4MmoHcGrn77A9o_E6kZRIZ090D2rQ');
const url = 'https://bakasinji.herokuapp.com';

module.exports = {
    download: (ctx) => {
        const YD = new YoutubeMp3Downloader({
            //"ffmpegPath": "./ffmpeg/bin/ffmpeg.exe", 
            "ffmpegPath": "./vendor/ffmpeg/ffmpeg",
            "outputPath": "./public/music/mp3",    // Where should the downloaded and encoded files be stored?
            "youtubeVideoQuality": "highest",       // What video quality should be used?
            "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
            "progressTimeout": 2000                 // How long should be the interval of the progress reports
        });
        let link = ctx.message.text.split('watch?v=')[1];

        try {
            YD.download(link);
            telegram.sendMessage(ctx.message.chat.id, "Пошла жара, качаю кароче")
        }
        catch(e) {
            ctx.reply(e);
        }
        
        YD.on("finished", function(err, data) {
            console.log(JSON.stringify(data));

            telegram.sendAudio(ctx.message.chat.id, url + data.file.split('public')[1])
        });
        
        YD.on("error", function(error) {
            console.log(error);
            ctx.reply(error);
        });
        
        YD.on("progress", function(progress) {
            if(progress.eta> 120) {throw('File too big')}
            console.log(JSON.stringify(progress));
        });
    }
}
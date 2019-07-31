var YoutubeMp3Downloader = require("youtube-mp3-downloader");

module.exports = {
    download: (ctx) => {
        const YD = new YoutubeMp3Downloader({
            //"ffmpegPath": "./ffmpeg/bin/ffmpeg.exe", 
            "ffmpegPath": "./vendor/ffmpeg",
            "outputPath": "./public/music/mp3/",    // Where should the downloaded and encoded files be stored?
            "youtubeVideoQuality": "highest",       // What video quality should be used?
            "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
            "progressTimeout": 2000                 // How long should be the interval of the progress reports
        });
        let link = ctx.message.text.split('watch?v=')[1];

        try {
            YD.download(link);
        }
        catch(e) {
            ctx.reply(e);
        }
        
        YD.on("finished", function(err, data) {
            console.log(JSON.stringify(data));
            if(data.progress.eta> 120) {throw('File too big')}
        });
        
        YD.on("error", function(error) {
            console.log(error);
        });
        
        YD.on("progress", function(progress) {
            console.log(JSON.stringify(progress));
        });
    }
}
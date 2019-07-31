'use strict';

const Flickr = require('flickrapi');

let loadRandom;

Flickr.tokenOnly({ api_key: "9bb8bfb805debb1a33c1ec06ed6ad4ca" }, function (error, flickr) {
    loadRandom = (req, ctx, type) => {
        flickr.photos.search({
            text: req,
            sort: 'interestingness-desc'
        }, function (err, result) {
            if (err) {
                console.log(err);
                return false;
            }

            const items = result.photos.photo;
            const rnd = Math.floor(Math.random() * items.length);

            if(type === 'like' ) ctx.reply(`Такоє - https://www.flickr.com/photos/${items[rnd].owner}/${items[rnd].id})`);
            if(type === 'ukraine' ) ctx.reply(`Ось вона рідна ненька - https://www.flickr.com/photos/${items[rnd].owner}/${items[rnd].id})`);
            if(type === 'europe' ) ctx.reply(`Європа у всій своїй красі - https://www.flickr.com/photos/${items[rnd].owner}/${items[rnd].id})`);


        });
    }
});

module.exports = {
    loadRandom: function(req, ctx, type) {loadRandom(req, ctx, type)}
}

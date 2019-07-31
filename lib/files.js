var express = require('express');
var files = express();
var path = require('path');


files.use(express.static('./public'));
files.get('/', (req, res) =>{
    res.sendFile(path.resolve('./src/index.html'));
});

files.listen(process.env.PORT || 8080);

module.exports = files
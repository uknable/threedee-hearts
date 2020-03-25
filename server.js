const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function () {
    console.log('Your node js server is running');
});
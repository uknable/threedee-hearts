const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
const StoryblokClient = require('storyblok-js-client');
// import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
    accessToken: 'cxBOVdDowPMBH7h41jTGuQtt',
    cache: {
        clear: 'auto',
        type: 'memory'
    }
});

Storyblok.get('cdn/stories', {
    "token": "wANpEQEsMYGOwLxwXQ76Ggtt"
  })
  .then(response => {
    console.log(response)
  }).catch(error => { 
    console.log(error)
  })

console.log("hello require");

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function () {
    console.log(`Your node js server is running at port ${port}`);
});
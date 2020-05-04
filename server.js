const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();

const StoryblokClient = require('storyblok-js-client');
// import StoryblokClient from 'storyblok-js-client';

const Storyblok = new StoryblokClient({
    accessToken: 'cxBOVdDowPMBH7h41jTGuQtt',
});

var interestPts = new Array();

Storyblok.get('cdn/stories', {
    version: 'published'
  })
  .then(response => {
    response.data.stories.forEach((story) => {
      interestPts.push([story.name, story.content.content])
    });
    console.log(interestPts)
  }).catch(error => { 
    console.log(error)
  });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index', {
    rightAtrium: interestPts[0],
    posteriorAspect: interestPts[1]
  })
})

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: 'views/components'
}));

app.set('view engine', '.hbs');
app.set('views', 'views')

app.listen(port, function () {
    console.log(`Your node js server is running at port ${port}`);
});
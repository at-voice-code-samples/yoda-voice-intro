const express    = require('express');
const xmlbuilder = require('xmlbuilder');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// we want to serve media files from our app
app.use(express.static(__dirname + '/media'));

const appPort = 3050;
const serverFQDN = process.env.DOMAIN;

let callAction = "";

// Say action 
/**
 * Say
 * attributes:
 *             voice    : The voice to use man or woman. Default woman
 *             playBeep : Whether to play a beep at the end of the text-to-speech parsing. Default false 
 * <Say voice="woman" playBeep="true"> Welcome to Africa's Talking text-to-speech service </Say>
 */
const sayAction = xmlbuilder.create('Response')
        .ele('Say', {'voice': 'man', 'playBeep' : 'true' }, 'Welcome to Africa\'s Talking text-to-speech service')
        .end({pretty: true});

 // Play
 /**
  * Play
  * attribute:
  *            url: A valid url pointing to your media file. Accepted format is MP3
  * <Play url='https://example.com/file.mp3
  */       
const playAction = xmlbuilder.create('Response')
        .ele('Play', {'url' : `${serverFQDN}`+":"+`${appPort}/media/file.mp3`})
        .end({pretty: true});        



// This is the root url
app.get('/', (req, res) =>{
    res.send('It lives!');
});

// Accept inbound traffic for <Say> 
app.post('/voice/say', (req, res) =>{
    callAction = sayAction;
    res.send(callAction);
});

// Accept inbound traffic for <Play>
app.post('/voice/play', (req, res) =>{
    callAction = playAction;
    res.send(callAction);
});

app.listen(process.env.PORT || appPort, () => {
    console.info('We are up!');
});
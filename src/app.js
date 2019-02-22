const express    = require('express');
const xmlbuilder = require('xmlbuilder');
const bodyParser = require('body-parser');

const mediaFolder = __dirname + '/media';


const app = express();

app.use(bodyParser.json());

// we want to serve media files from our app
app.use(express.static(mediaFolder));

const appPort = 3050;

// If you chose to host the file on your own machine OR vm 
// Make sure to pass the host name when startin the application
// example DOMAIN=https://www.mydomain.com/file.mp3
// or DOMAIN=https://www.mydomain.com:3050/file.mp3
// DOMAIN=http://1.2.3.4:3050/file.mp3
// and pass that as the fileUrl
const serverFQDN = process.env.DOMAIN;

const fileUrl = "";

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
        .ele('Play', {'url' : `${fileUrl}`})
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
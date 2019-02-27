const express    = require('express');
const xmlbuilder = require('xmlbuilder');
const bodyParser = require('body-parser');

//const mediaFolder = __dirname + '/media';


const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// we want to serve media files from our app
//app.use(express.static(mediaFolder));

const appPort = 3050;

// If you chose to host the file on your own machine OR vm 
// Make sure to pass the host name when startin the application
// example DOMAIN=https://www.mydomain.com/file.mp3
// or DOMAIN=https://www.mydomain.com:3050/file.mp3
// DOMAIN=http://1.2.3.4:3050/file.mp3
// and pass that as the fileUrl
//const serverFQDN = process.env.DOMAIN;

const fileUrl = "https://s3.eu-west-2.amazonaws.com/at-voice-sample/play.mp3";

let callAction = "";

// Say and Play actions 
/**
 * Say
 * 
 * attributes:
 * 
 *             voice    : The voice to use man or woman. Default 
 * 
 *             playBeep : Whether to play a beep at the end of the text-to-speech parsing. Default false 
 * 
 * <Say voice="woman" playBeep="true"> Welcome to Africa's Talking text-to-speech service </Say>
 * 
 * Play
 * 
 * attributes:
 * 
 *            url: A valid url pointing to your media file. Accepted format is MP3
 * 
 * <Play url='https://example.com/file.mp3"/>
 */
const sayPlayAction = xmlbuilder.create('Response', {encoding : 'utf-8'})
        .ele('Say', {'voice': 'man', 'playBeep' : 'true' }, 'Playing your audio file')
        .up()
        .root()
        .ele('Play', {'url' : `${fileUrl}`})
        .end({pretty: true});

// This is the root url
app.get('/', (req, res) =>{
    res.send('It lives!');
});

app.post('/voice/sayplay', (req, res) =>{
    callAction = sayPlayAction;
    res.send(callAction);
});

app.listen(process.env.PORT || appPort, () => {
    console.info('We are up!');
});
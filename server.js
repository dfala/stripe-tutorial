var express     = require('express'),
    bodyParser  = require('body-parser'),
    cors        = require('cors');


// Create app
var app = express();
app.use(cors());

// Expanding server capacity
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routing
app.use(express.static(__dirname + '/app'));

// API
var MainController = require('./controllers/MainController.js');
app.post('/api/charge-card', MainController.chargeCard);

// Turn on server
var portNum = 3000;
app.listen(portNum, function () {
    console.log('Listening on port: ' + portNum);
});

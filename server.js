var express = require('express');
var exphb = require('express-handlebars');
var peopleData = require('./userTemplate');
/*
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" +
    mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
    "/" + mongoDBName;

var mongoDB = null;
*/
var app = express();
var PORT = process.env.PORT || 3001;

app.engine('handlebars', exphb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res, next) {
    res.status(200).render('homePage', {
        users: peopleData
    });
});

app.get('/user/:user', function(req, res, next) {
    let person = req.params.user;
    if (peopleData[person]) {
        res.status(200).render('userPage', peopleData[person]);
    } else {
        next();
    }
});

app.use('*', function(req, res, next) {
    res.status(404).render('404Page');
});

app.listen(PORT, function () {
    console.log("oo  Server listening on port", PORT);
});
/*
MongoClient.connect(mongoURL, function (err, client) {
    if (err) {
      throw err;
    }
    mongoDB = client.db(mongoDBName);
    app.listen(PORT, function () {
      console.log("oo  Server listening on port", PORT);
    });
});
*/
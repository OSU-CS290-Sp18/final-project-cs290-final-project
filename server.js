var express = require('express');
var exphb = require('express-handlebars');
var peopleData = require('./userTemplate');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" +
    mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
    "/" + mongoDBName;
console.log("mongoURL: ", mongoURL);


var mongoDB = null;

var app = express();
var PORT = process.env.PORT || 3001;

app.engine('handlebars', exphb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res, next) {
    let userCollection = mongoDB.collection('users').find().toArray(function(err, users) {
        if (err) {
            res.status(500).send("Error fetching users from our database.");
        } else {
            res.status(200).render('homePage', {
                users: users
            });
        }
    });
});

app.get('/user/:user', function(req, res, next) {
    let person = req.params.user;
    let userCollection = mongoDB.collection('users').find({ userName: person }).toArray(function(err, data) {
        if (err) {
            res.status(500).send("Error fetching users from our database.");
        } else if (data.length > 0) {
            res.status(200).render('userPage', data[0]);
        } else {
            next();
        }
    });
});

app.post('user/:user/newMedia', function (req, res, next) {
    let person = req.params.user;

    if (req.body && req.body.itemName && req.body.itemScore && req.body.itemReview) {
        let newItem = {
            itemName: req.body.itemName,
            itemScore: req.body.itemScore,
            itemReview: req.body.itemReview
        };

        let userCollection = mongoDB.collection('users').updateOne(
            { userName: person },
            { $push: {reviews: newItem } },
            function (err, result) {
                if (err) {
                    res.status(500).send("Error inserting the media item into our database.")
                } else {
                    if (result.matchedCount > 0) {
                        res.status(200).end();
                    } else {
                        next();
                    }
                }
            }
        );
    }
});

app.use('*', function(req, res, next) {
    res.status(404).render('404Page');
});
/*
app.listen(PORT, function () {
    console.log("oo  Server listening on port", PORT);
});
*/
MongoClient.connect(mongoURL, function (err, client) {
    if (err) {
      throw err;
    }
    mongoDB = client.db(mongoDBName);
    app.listen(PORT, function () {
      console.log("oo  Server listening on port", PORT);
    });
});
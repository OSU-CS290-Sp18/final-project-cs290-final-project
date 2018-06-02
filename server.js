var express = require('express');
var exphb = require('express-handlebars');
var path = require('path');
var app = express();
var PORT = 3001;

app.engine('handlebars', exphb());
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/test', function(req, res, next) {
    res.status(200).render('userPage', {
        userName: 'testUser', 
        mediaItem: [
            {
                itemName: 'osu!',
                itemReview: 'Game\'s shit',
                itemScore: 0
            },
            {
                itemName: 'Garfield Cart',
                itemReview: 'Glorious...',
                itemScore: 100
            }
        ]
    });
});

app.get('*', function(req, res, next) {
    res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(PORT, function() {
    console.log('oo  The server\'s listening on port ', PORT);
});
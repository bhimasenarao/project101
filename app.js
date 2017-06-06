var express = require('express'),
    app = express(),
    engines = require('consolidate'),
    bodyParser = require('body-parser'),
    MongoClient = require('MongoDB').MongoClient,
    assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));
//Start MongoDB and connect to Video database
MongoClient.connect('mongodb://localhost:27017/video', function(err, db){
  assert.equal(null, err);
    console.log("Connected to MongoDB successfully!");
  var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log("Listening on port %s.", port);
  });

//In the localhost 'moviedetails.html' web page enter the data details
app.get('/', function(req, res){
  res.render('moviedetails', {'title': '{title}', 'year':'{year}', 'imdb':'{imdb}'});
});

//Retrieve the data entered in the webpage
app.post('/favoriteMovie', function(req, res){
  var titledata = req.body.title;
  var yeardata = req.body.year;
  var imdbdata = req.body.imdb;

//insert the retrieved body of the /favoriteMovie to the movies db.
 db.collection('movies').insert(req.body, function(err, res){
    if(err) throw err;
    console.log("1 record inserted");
    db.close;
    });
    res.send("Movie: " +  titledata  + " made in " + yeardata + " with imdb No.:" + imdbdata + " added to record");
  });
});

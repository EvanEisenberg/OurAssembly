var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require('./quotes-data-util')
var _ = require("underscore");

var quotesDataUtil = require("./quotes-data-util");

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

quotesDataUtil.restoreOriginalData();

// Load contents of quotes.json into global variable. 
var _DATA = quotesDataUtil.loadData().quotes;

app.get('/',function(req,res){
  res.render('home',{data: _DATA});
});

app.get('/science',function(req,res){
  var new_quotes = [];
    _DATA.forEach(function(quo) {
        if (quo.categories.includes("Science")) {
            new_quotes.push(quo);
        }
    });
    res.render('home', {data: new_quotes});
});

app.get('/truth',function(req,res){
  var new_quotes = [];
    _DATA.forEach(function(quo) {
        if (quo.categories.includes("Truth")) {
            new_quotes.push(quo);
        }
    });
    res.render('home', {data: new_quotes});
});

app.get('/jefferson',function(req,res){
  var new_quotes = [];
    _DATA.forEach(function(quo) {
        if (quo.author == "Thomas Jefferson") {
            new_quotes.push(quo);
        }
    });
    res.render('home', {data: new_quotes});
});

app.get('/short',function(req,res){
  var new_quotes = [];
    _DATA.forEach(function(quo) {
        if (quo.quote.length < 5) {
            new_quotes.push(quo);
        }
    });
    res.render('home', {data: new_quotes});
});

app.get('/long',function(req,res){
  var new_quotes = [];
    _DATA.forEach(function(quo) {
        if (quo.quote.length >= 10) {
            new_quotes.push(quo);
        }
    });
    res.render('home', {data: new_quotes});
});

app.get('/api/getAll',function(req,res){
  return res.json(_DATA);
});

app.post('/create', function(req, res) {
    var body = req.body;
    // Transform categories
    body.categories = body.categories.split(" ");

    // Save new blog post
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});

app.post("/api/create", function(req, res) {
  var body = req.body;
  console.log("req");
  console.log(req);
  _DATA.push(req.body);
  dataUtil.saveData(_DATA);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log('Listening!');
});

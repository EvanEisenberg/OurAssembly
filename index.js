var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require("underscore");
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var faker = require('faker');
var validator = require('validator');
var CongressMember = require('./models/CongressMember');
var Bill = require('./models/Bill');
var Law = require('./models/Law');
var save = require("./modules/save");
var create = require("./modules/create");
var app = require("./modules/app");

dotenv.config(); // load environment vars

// connect to mongodb
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});



// these two lines are necessary for sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log('NEW connection.');
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 /* API endpoints here */

 app.get('/api/getAllBills',function(req,res){
   Bill.find({},function(err, bills){
         if(err) throw err
         res.send(bills);
   })
 });

 app.get('/api/getAllLaws',function(req,res){
   Law.find({},function(err, laws){
         if(err) throw err
         res.send(laws);
   })
 });

 app.get('/api/getAllCongressMembers',function(req,res){
   CongressMember.find({},function(err, congressMembers){
         if(err) throw err
         res.send(congressMembers);
   })
 });

 app.get('/api/getAllBillsAndLaws',function(req,res){
   // calls need to be nested because of scope of the variables
   Bill.find({},function(err, bills){
         if(err) throw err
         Law.find({},function(err, laws){
               if(err) throw err
               res.send({"bills": bills, "laws": laws});
         });
   });
 });

 // test this with testing_add_bill.js
 app.post("/api/addBill", function(req, res) {
    var body = req.body;
    var bill = create.bill(body.text, body.authors, body.date_introduced,
       body.committee, body.name);

   save.saveApi(bill, "Bill", res);
 });

 // test this with testing_add_law.js
 app.post("/api/addLaw", function(req, res) {
   var body = req.body;
   var law = create.law(body.text, body.authors, body.date_passed,
      body.committee, body.name);

   save.saveApi(law, "Law", res);
 });

 // test this with testing_add_congress_member.js
 app.post("/api/addCongressMember", function(req, res) {
  if(!validator.isNumeric(req.body.year_inaugurated)) {
    res.send('Error: year_inaugurated must be a number only');
  };
    var body = req.body;
    var congressMember = create.congressMember(body.name, body.party,
      body.year_inaugurated);

   save.saveApi(congressMember, "Congress Member", res);
 });

 // test this with testing_delete_bill.js
 app.delete("/api/deleteBill", function(req, res) {
   Bill.deleteOne({name: req.body.name},function(err, bill){
     console.log(req.body.name);
         if(err) throw err
         return res.send("If present, bill with name " + req.body.name + " deleted");
   });
 });

 app.delete("/api/deleteLaw", function(req, res) {
   Law.deleteOne({name: req.body.name},function(err, law){
         if(err) throw err
         return res.send("If present, law with name " + req.body.name + " deleted");
   });
 });

 app.delete("/api/deleteCongressMember", function(req, res) {
  CongressMember.deleteOne({name: req.body.name},function(err, law){
        if(err) throw err
        return res.send("If present, Congrss Member with name " + req.body.name + " deleted");
  });
});


 /* Non-API endpoints here */
app.get('/',function(req,res){
  Bill.find({}, null, {sort: '-date_introduced'}, function(err, bill){
    if(err) throw err
    res.render('home', {bills: bill})
  });
});

app.get('/bills',function(req,res){
  Bill.find({}, null, {sort: '-date_introduced'}, function(err, bill){
    if(err) throw err
    res.render('home', {bills: bill})
  });
});

app.get('/laws',function(req,res){
  Law.find({}, null, {sort: '-date_passed'}, function(err, law){
    if(err) throw err
    res.render('laws', {laws: law})
  });
});

app.get('/congressmembers',function(req,res){
  CongressMember.find({}, null, {sort: 'name'}, function(err, con){
    if(err) throw err
    res.render('congressmembers', {congressmembers: con})
  });
});

app.get('/bill/:name', function(req, res) {
  var name = req.params.name;
  Bill.find({ 'name': name }, function (err, rets) {
    if(err) throw err
    res.render('billpost', {bills: rets})
  });
});

app.get('/law/:name', function(req, res) {
  var name = req.params.name;
  Law.find({ 'name': name }, function (err, rets) {
    if(err) throw err
    res.render('lawpost', {laws: rets})
  });
});

app.get('/create/bill',function(req,res){
  res.render('createbill')
});

app.get('/create/law',function(req,res){
  res.render('createlaw')
});

app.get('/add/congressMember', function(req,res) {
  res.render('createCongressMember');
});

app.get('/about',function(req,res){
  res.render('about')
});

app.get('/getAllCongressMembers',function(req,res){
  CongressMember.find({},function(err, congressMember){
    if(err) throw err
    res.render('congressMembers', {congressMembers: congressMember})
  });
});


 // test this with testing_add_bill.js
 app.post('/addBill', function(req, res) {
   var body = req.body;
  var bill = create.bill(body.text, body.authors, body.date_introduced,
    body.committee, body.name);
    io.emit('new bill', bill);

  save.save(bill, "bill", "/bills", res);
});

app.post("/addLaw", function(req, res) {
  var body = req.body;
  var law = create.law(body.text, body.authors, body.date_passed,
    body.committee, body.name);
    io.emit('new law', law);

  save.save(law, "law", "/laws", res);
});

app.post("/addCongressMember", function(req, res) {
  if(!validator.isNumeric(req.body.year_inaugurated)) {
    res.redirect('/congressmembers');
  };
  var body = req.body;
  var congressMember = create.congressMember(body.name, body.party,
    body.year_inaugurated);

 save.save(congressMember, "Congress Member", "/congressmembers", res);
});


// necessary for sockets to use "http" here
http.listen(process.env.PORT || 3000, function() {
  console.log('Listening!');
});

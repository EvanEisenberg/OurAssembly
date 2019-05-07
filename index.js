var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var _ = require("underscore");
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var CongressMember = require('./models/CongressMember');
var Bill = require('./models/Bill');
var Law = require('./models/Law');

dotenv.config(); // load environment vars

// connect to mongodb
console.log(process.env.MONGODB)
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function() {
    console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

var app = express();

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
   var bill = new Bill({
      text: req.body.text,
      authors: req.body.authors,
      date_introduced: req.body.date_introduced,
      committee: req.body.committee,
      bill_id: req.body.bill_id
   });

   bill.save(function(err) {
         if(err) throw err
         return res.send("Bill saved!")
   });
 });

 // test this with testing_add_law.js
 app.post("/api/addLaw", function(req, res) {
   var law = new Law({
      text: req.body.text,
      authors: req.body.authors,
      date_passed: req.body.date_passed,
      committee: req.body.committee,
      bill_id: req.body.bill_id
   });

   law.save(function(err) {
         if(err) throw err
         return res.send("Law saved!")
   });
 });

 // test this with testing_add_congress_member.js
 app.post("/api/addCongressMember", function(req, res) {
   var congressMember = new CongressMember({
      name: req.body.name,
      party: req.body.party,
      year_inaugurated: req.body.year_inaugurated
   });

   congressMember.save(function(err) {
         if(err) throw err
         return res.send("Congress Member saved!")
   });
 });

 // test this with testing_delete_bill.js
 app.delete("/api/deleteBill", function(req, res) {
   Bill.deleteOne({bill_id: req.body.bill_id},function(err, bill){
         if(err) throw err
         return res.send("If present, bill with id " + req.body.bill_id + " deleted");
   });
 });

 app.delete("/api/deleteLaw", function(req, res) {
   Law.deleteOne({bill_id: req.body.bill_id},function(err, law){
         if(err) throw err
         return res.send("If present, law with id " + req.body.bill_id + " deleted");
   });
 });


 /* Non-API endpoints here */
app.get('/',function(req,res){
  Bill.find({},function(err, bill){
    if(err) throw err
    Law.find({},function(err, law){
          if(err) throw err
          res.render('home', {bills: bill, laws: law})
    });
  });
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

app.post('/create', function(req, res) {
    var body = req.body;
    // Transform categories
    body.categories = body.categories.split(" ");

    // Save new blog post
    _DATA.push(req.body);
    dataUtil.saveData(_DATA);
    res.redirect("/");
});

app.listen(3000, function() {
  console.log('Listening on 3000!');
});


const express = require('express');
const fs = require('fs');
const path = require("path");
const app1 = express();
const port = 4200;
const bodyParser = require('body-parser');
const contact = fs.readFileSync('contact.html');
const mongoose = require('mongoose');
const { find } = require('moongose/models/user_model');
mongoose.connect('mongodb://localhost/foodorder', {useNewUrlParser : true});
// const User = require('./user');
var Mongoclient = require('mongodb').MongoClient;
var url = "mongodb://localhost/foodorder";

app1.use("/static", express.static("static"));
//syntax meaning of above line
//app.use("/urlname", express.static("folder_name"));
app1.use(express.urlencoded()); 
// above line helps in extracting the data from website to app1.js



// Set the template engine as pug
app1.set('view engine', 'pug');
// Set the views directory
app1.set('views', path.join(__dirname, 'views'));

var dataStore;
// Our pug demo endpoint
app1.get('/', (req, res)=>{
    const con = "This the content section and we are using pug as our template so watch harry bhai video for deep drive in backend !! \n";
    const params = {"title"     : "Eat Sleep Burp Repeat",
                    "content"   : con}
                   
    res.status(200).render('index.pug', params);
});

const orderSchema = mongoose.Schema({
    name : String,
    age : String,
    gender : String,
    address : String,
    ordering : String
});

const order = mongoose.model('order', orderSchema);

app1.post('/', (req, res)=>{
    var data = new order(req.body);
    data.save().then(()=>{
        res.send("Your Food is successfully ordered")
        }).catch(()=>{
        res.status(400).send("Please fill correct detail")
        
        //  User.find({},function(err, users){
        //   if(err) console.warn(err);
        //  console.warn(users);
        // })    
    //old 
    console.log(req.body);
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const more = req.body.more;

    let outputToWrite = `The name of the client is ${name}, \n 
    ${age} years old, \n ${gender}, residing at ${address}. \n More about him/her: ${more}`
    fs.writeFileSync('output.txt', outputToWrite);

    const params = {"message"   :   "Your Order is on the way !! Enjoy Your Meal with burp"}

    res.status(200).render('index.pug', params);
});

});

// User.find({},function(err, users){
//   if(err) console.warn(err);
//   console.warn(users);
// })
// var inputer = prompt("What do you need to ask about the order details")
// var inputer_val = prompt("value of that particular details")
Mongoclient.connect(url, function(err, db) {
  if (err) console.log(err);
  var dbo = db.db("foodorder");
  dbo.collection("orders").findOne({name : 'Mohit Kumar Patel'},function(err, result) {
    if (err) console.log(err);
      console.log(result)
    db.close();
  });
});

// console.log(dataStore);
// Listening area
app1.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})


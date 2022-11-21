const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/bankDB', {useNewUrlParser : true});
  }

const bankSchema = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  balance: Number
});

const User = new mongoose.model("User", bankSchema);
const user1 = new User({
  id: 1,
  name: "Ravi",
  email: "ravi@email.com",
  balance: 8500
});
const user2 = new User({
  id: 2,
  name: "Amit",
  email: "amit@email.com",
  balance: 10500
});
const user3 = new User({
  id: 3,
  name: "Prakash",
  email: "prakash@email.com",
  balance: 5500
});
const user4 = new User({
  id: 4,
  name: "Ankit",
  email: "ankit@email.com",
  balance: 9500
});
const user5 = new User({
  id: 5,
  name: "Chirag",
  email: "chirag@email.com",
  balance: 16000
});
const user6 = new User({
  id: 6,
  name: "Ritu",
  email: "ritu@email.com",
  balance: 5000
});
const user7 = new User({
  id: 7,
  name: "Deepak",
  email: "deepak@email.com",
  balance: 7000
});
const user8 = new User({
  id: 8,
  name: "Amruta",
  email: "amruta@email.com",
  balance: 11000
});
const user9 = new User({
  id: 9,
  name: "Manohar",
  email: "manohar@email.com",
  balance: 4000
});
const user10 = new User({
  id: 10,
  name: "Santosh",
  email: "santosh@email.com",
  balance: 13000
});

//Admin account details
let adminName = "";
let adminBal = 0;
app.get("/", function(req, res){
  res.render("home");
})

app.get("/transfer", function(req, res){
  User.find({name: "Akshat Kumar"}, function(err, admin){
    if (!err){
      adminName = admin[0].name;
      adminBal = admin[0].balance;
      res.render("transfer", {adminName : admin[0].name, adminBal: admin[0].balance});
    }
  })

});

app.get("/customers", function(req, res){
  User.find({}, function(err, allUsers){
    if (!err)
      res.render("customers", {users : allUsers});
  })
});
app.get("/Success", function(req, res){
  res.render("Success");
});

app.get("/about", function(req, res){
  res.render("about");
})
app.post("/", function(req, res){
  let rName = req.body.recipentName;
  let amount = Number(req.body.Amount);

  User.findOneAndUpdate({name: rName}, {$inc:{balance: amount}}, function(err){
    if (err)
      console.log(err);

  });

  User.findOneAndUpdate({name: adminName}, {$inc:{balance: -1*amount}}, function(err){
    if (err)
      console.log(err);
  });
  res.redirect("/Success");
})
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

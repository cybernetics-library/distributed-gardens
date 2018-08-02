var http = require('http');
var request = require('request');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
var cors = require('cors')
var express = require("express");

var db = new Datastore({ filename: './data/db', autoload: true });

var app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

var DEFAULTNONCE = 33333;

app.get("/getEvents", function(req, res) {
  var nonce = DEFAULTNONCE;
  if("nonce" in req.query) { nonce = req.query.nonce; }
  var query = { "nonce": parseInt(nonce) };

  //console.log("got a query");
  //console.log(query)
  db.find(query, function (err, docs) {
    //console.log(docs)
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(docs))
  });
});

app.post("/addEvent", function(req, res) {
  if(req.body != undefined) {
    var msg = req.body;
    if(("nonce" in msg) == false) { msg.nonce = DEFAULTNONCE; }
    msg.nonce = parseInt(msg.nonce)
    //console.log("got an event req");
    //console.log(msg);
////    var jsonmsg = JSON.stringify(msg)
    db.insert(msg, function (err, newDocs) {
      res.status(200).send("success")
    })
  }
});

var httpServer = http.createServer(app);
httpServer.listen(8090);


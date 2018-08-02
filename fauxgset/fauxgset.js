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
 
  db.find({ nonce: nonce.toString() }, function (err, docs) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(docs))
  });
});

app.post("/addEvent", function(req, res) {
  if(req.body != undefined) {
    var msg = req.body;
    if(("nonce" in msg) == false) { msg.nonce = DEFAULTNONCE.toString(); }
    var jsonmsg = JSON.stringify(msg)
    db.insert(jsonmsg, function (err, newDocs) {
      res.status(200).send("success")
    })
  }
});

var httpServer = http.createServer(app);
httpServer.listen(8090);


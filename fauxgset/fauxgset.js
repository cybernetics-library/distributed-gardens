var http = require('http');
var request = require('request');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
var cors = require('cors')
var express = require("express");
var fetch = require('node-fetch');

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

app.post("/addEvent", async function(req, res) {
  if(req.body != undefined) {
    var msg = req.body;
    if(("nonce" in msg) == false) { msg.nonce = DEFAULTNONCE; }
    msg.nonce = parseInt(msg.nonce)
    //console.log("got an event req");
    //console.log(msg);
////    var jsonmsg = JSON.stringify(msg)
    if(msg.type !== undefined && msg.type == 'seed'){
        msg.ipfs = []
        for(id of media){
            try {
                var url = 'https://gateway.dweb.me/arc/archive.org/leaf/' + id
                var res = fetch(url) 
                var json = await response.json()
                var ipfsPaths = JSON.parse(json[id]).urls.filter((s) => s.startsWith('ipfs:')).map((s) => s.replace(/^ipfs:/,''))
                msg.ipfs = msg.ipfs.concat(ipfsPaths)
            } catch(err) {
                console.log(err)
            }
        }
    }
    db.insert(msg, function (err, newDocs) {
      res.status(200).send("success")
    })
  }
});

var httpServer = http.createServer(app);
httpServer.listen(8090);


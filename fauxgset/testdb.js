var Datastore = require('nedb');
var db = new Datastore({ filename: './data/db', autoload: true });

db.find({ "nonce": 55555 }, function( err, docs) {
  console.log(docs);
});

db.find({ "nonce": "55555" }, function( err, docs) {
  console.log(docs);
});

db.find({ nonce: 55555 }, function( err, docs) {
  console.log(docs);
});

db.find({ nonce: "55555" }, function( err, docs) {
  console.log(docs);
});


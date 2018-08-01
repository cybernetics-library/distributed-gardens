const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class Biome {

  constructor() {
    var self = this;
    this.dbuser = "kiosk"
    this.dbpw = "hKJgbc5Z8mzCGEfYefCNJRx9dgt5cZ" // yes,  it is indeed stupid to commit this
    this.dburl = "mongodb://" + dbuser + ":" + dbpw + "@candidate.14.mongolayer.com:10871,candidate.13.mongolayer.com:11016/distributed-gardens?replicaSet=set-5568fa83e27794fa9c001d87"
    this.dbname = "distributed-gardens"
    this.dbcollection = "events"
    this.connected = false;
    // Use connect method to connect to the server
    MongoClient.connect(self.dburl, function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");

      self.db = client.db(self.dbname);
      self.collection = self.db.collection(self.dbcollection);
      this.connected = true;
    });
  }

  getEvents() {
    var self = this;
    if(this.connected) {
      self.collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
      });
    }  // if this isn't connected.. uh uh. we need to be synchrnous to be compliant with biome
  }

  async addEvent(msg) {
    await self.collection.insertMany([msg])
  }

});


module.exports = Biome;


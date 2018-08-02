const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

class plasticBiome {

  constructor() {
    var self = this;
    this.dbuser = "kiosk"
    this.dbpw = "hKJgbc5Z8mzCGEfYefCNJRx9dgt5cZ" // yes,  it is indeed stupid to commit this
    this.dburl = "mongodb://" + this.dbuser + ":" + this.dbpw + "@candidate.14.mongolayer.com:10871,candidate.13.mongolayer.com:11016/distributed-gardens?replicaSet=set-5568fa83e27794fa9c001d87"
    this.dbname = "distributed-gardens"
    this.dbcollection = "events"
    this.connected = false;
  }

  async start() {
    var self = this;
    // Use connect method to connect to the server
    var  mcconnect = function() { 
      return new Promise(function(resolve, reject) {
        MongoClient.connect(self.dburl, function(err, client) {
//          assert.equal(null, err);
          console.log("Connected successfully to server");

          self.db = client.db(self.dbname);
          self.collection = self.db.collection(self.dbcollection);
          self.connected = true;
          resolve();
        });
      });
    }
    await mcconnect();
  }

  async getEvents() {
    var self = this;
    var ge = function() {
      return new Promise(function(resolve, reject) {
          if(self.connected) {
            self.collection.find({}).toArray(function(err, docs) {
              resolve(docs)
            });
          }  // if this isn't connected.. uh uh. we need to be synchrnous to be compliant with biome
      });
    }
    var docs = await ge();
    return docs;
  }

  async addEvent(msg) {
    await self.collection.insertMany([msg])
  }

}


module.exports = plasticBiome;


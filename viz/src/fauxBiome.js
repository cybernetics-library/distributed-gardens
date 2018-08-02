const request = require('request');


const defaults = {
  nonce: 33333
}

class fauxBiome {

  constructor(options) {
    this.url = "http://library.cybernetics.social:8090"
    this.getEventsEndpoint = "/getEvents"
    this.addEventEndpoint = "/addEvent"
    this._config = Object.assign({}, defaults, options)
  }


  async addEvent(msg) {
    var self = this
    var thisuri = self.url + self.addEventEndpoint
    msg.nonce = self._config.nonce
    return new Promise(function(resolve, reject) {
      request.post({ 
          url: thisuri,
          json: msg
        },
        function(err, httpResponse, body) {
          resolve();
        });
    });

    setTimeout(() => {
      self.getAndStoreEvents();
    }, 500); // checks every 10 secs
 
  }

  async start() {
    this.interv = setInterval(() => {
      this.getAndStoreEvents();
    }, 60*1000); // checks every 10 secs
    await this.getAndStoreEvents();
  }

  async getAndStoreEvents() {
    var self = this;
    var thisuri = self.url + self.getEventsEndpoint + "?nonce=" + self._config.nonce
    return new Promise(function(resolve, reject) {
        request.get(thisuri, function (error, response, body) {
            var data = JSON.parse(body);
            self.cachedEvents =  data
            resolve(data);
        });
    });
  }

  getEvents() {
    var self = this
    this.getAndStoreEvents();
    return self.cachedEvents;
  }

}


module.exports = fauxBiome;


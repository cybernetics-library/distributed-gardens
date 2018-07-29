var Biome = require('biome')
var _ = require('lodash');


class Irrigation {
  constructor() {
  }

  async init() {
    var self = this;
    self.biome = Biome()
    await self.biome.start()
  }

  async addEventNow(msg) {
    var self = this;
    msg.ver = 1;
    msg.ts = new Date().getTime() / 1000;
    await self.biome.addEvent(msg)
  }

   async addEvent(msg) {
    await self.biome.addEvent(msg)
  }

  async addSampleEvent() {
    var self = this;
    var msg = {
      'ver': 1,
      'ts': new Date().getTime() / 1000,
      'from': { name: 'sample_maker' },
      'type': 'scan',
      'msg': { 'gid': '11111' }
    }
    await self.biome.addEvent(msg);
  }

  getHistory(config) {
    var self = this;

    if(typeof(config) != "undefined" &&
        "force" in config &&
         config.force == true) {
      this.last_getEvents = new Date().getTime()
      this.cachedEvents = _.sortBy(self.biome.getEvents(), "ts");
    }


    if(typeof(this.cachedEvents) == "undefined" ||
        typeof(this.last_getEvents) == "undefined" ||
        this.last_getEvents - new Date().getTime() > 5 * 1000) {

      this.last_getEvents = new Date().getTime()
      this.cachedEvents = _.sortBy(self.biome.getEvents(), "ts");
    } 

    return this.cachedEvents
  } 

  getStats() {
    // CALCULATE world-wide stats here
    var stats = {};
    stats.participantNames = this._getParticipantNames();
    stats.participantNum = stats.participantNames.length
    return stats
  }

  _getParticipantNames() {
    var self = this;
    return _.map(
      _.uniqBy(self.getHistory(), function(o) { return o.from.name; }),
      function(d) { return d.from.name; })
  }

  getAdjacencyList() {
    var self = this;
    _.filter(self.getHistory(), { type: "link" })
  }

}

module.exports = Irrigation;

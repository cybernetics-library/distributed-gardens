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


  // force: true to force clearing cache
  getHistory(config) {
    var self = this;

    if(typeof(config) != "undefined" &&
        "force" in config &&
         config.force == true) {
      this.last_getEvents = new Date().getTime()
      this.cachedEvents = _.sortBy(self.biome.getEvents(), "ts");
    }


    // cache is just based on time right now.. TODO: use biome's event listener
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
    stats.numEvents = this.getHistory().length;
    return stats
  }

  _getParticipantNames() {
    var self = this;
    return  _.chain(self.getHistory())
        .map((d) => { return d.from.name })
        .uniq()
        .value()
  }

  getAdjacencyList() {
    var self = this;
    var adjs =
      _.chain(self.getHistory())
        .filter({type: "link" })
        .map((d) => { return [d.msg.link_from, d.msg.link_to].sort().join("-") })
        .uniq()
        .map((d) => { return d.split("-"); })
        .value();
    return adjs;
  }

  getGraphData() {
    var self = this;
    var graphdata = {}
    graphdata.nodes = _.chain(self.getHistory())
     .filter({type: "link" })
     .map((d) => { return [d.msg.link_from, d.msg.link_to] })
     .flatten()
     .uniq()
     .map((d) => { return { "id": d } })
     .value()
    graphdata.links =  _.chain(self.getHistory())
     .filter({type: "link" })
     .map((d) => { return [d.msg.link_from, d.msg.link_to].sort().join("-") })
     .countBy()
     .map((v, k) => { var links = k.split("-"); return { "source": links[0], "target": links[1], "value": v} })
     .value()
    return graphdata
  }


}

module.exports = Irrigation;

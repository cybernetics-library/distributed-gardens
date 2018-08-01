var plasticBiome = require('./plasticbiome')
//var Biome = require('biome')
var _ = require('lodash');


class Irrigation {
  constructor(config) {
    this.config = config
  }

  async init() {
    var self = this;
    //self.biome = Biome(this.config)
    self.biome = new plasticBiome(this.config)
    await self.biome.start()
  }

  async addEvent(msg) { // INTERFACE WITH BIOME
    var self = this;
    await self.biome.addEvent(msg)
  }

  async getEvents() { // INTERFACE WITH BIOME
    var self = this;
    return await self.biome.getEvents()
  }

  async addEventNow(msg) {
    var self = this;
    msg.ver = 1;
    msg.ts = new Date().getTime() / 1000;
    await self.biome.addEvent(msg)
  }


  listen(event_name, cb) { // register listener
    console.log(event_name);
    console.log(cb);
    self.biome.on(event_name, cb)
  }

  // force: true to force clearing cache
  getHistory(config) {
    var self = this;

    if(typeof(config) != "undefined" &&
        "force" in config &&
         config.force == true) {
      this.last_getEvents = new Date().getTime()
      this.cachedEvents = _.sortBy(self.getEvents(), "ts");
    }


    // cache is just based on time right now.. TODO: use biome's event listener
    if(typeof(this.cachedEvents) == "undefined" ||
        typeof(this.last_getEvents) == "undefined" ||
        this.last_getEvents - new Date().getTime() > 5 * 1000) {

      this.last_getEvents = new Date().getTime()
      this.cachedEvents = _.sortBy(self.getEvents(), "ts");
    } 

    return this.cachedEvents
  } 

  getStats() {
    // CALCULATE world-wide stats here
    var stats = {};
    stats.participantNames = this.getParticipantNames();
    stats.participantBadges = this.getParticipantBadges();
    stats.participantNum = stats.participantNames.length
    stats.numEvents = this.getHistory().length;
    return stats
  }

  getParticipantNames() {
    var self = this;
    return  _.chain(self.getHistory())
        .map((d) => { return d.from.name })
        .uniq()
        .value()
  }

   getParticipantBadges() {
    var self = this;
    return  _.chain(self.getHistory())
        .map((d) => {
          if (d.type == "seed") { return d.msg.seed_to }
          if (d.type == "link") { return [d.msg.link_from, d.msg.link_to] }
          // there are no scans
          if (d.type == "setinfo") { return d.msg.badge_id; }

        })
        .flatten()
        .compact()
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
    .compact()
     .value()
    graphdata.links =  _.chain(self.getHistory())
     .filter({type: "link" })
     .map((d) => { return [d.msg.link_from, d.msg.link_to].sort().join("-") })
     .countBy()
     .map((v, k) => { var links = k.split("-"); return { "source": links[0], "target": links[1], "value": v} })
     .compact()
     .value()

    console.log(graphdata, "graph data")
    return graphdata
  }

  getLinks(myid) {
    var self = this;
    return _.chain(self.getHistory())
      .filter({type: "link" })
      .compact()
      .map(function(d) {
        if(d.msg.link_from === myid) { return d.msg.link_to; }
        if(d.msg.link_to === myid) { return d.msg.link_from; }
      })
      .uniq()
      .compact()
      .value()
  }

  getWorldFiles() {
    var self = this;
    return  _.chain(self.getHistory())
      .filter({type: "seed" })
      .map((d) => { return d.msg.media; })
      .flatten()
      .uniq()
      .compact()
      .value()
  }


  getFiles(myid) {
    var self = this;
    return _.chain(self.getHistory())
      .filter({type: "seed" })
      .filter((d) => { return d.msg.seed_to == myid })
      .map((d) => { return d.msg.media; })
      .flatten()
      .uniq()
      .compact()
      .value()
  }


  getGardenData(myid) {
    var self = this;
    var gardendata = {};
    gardendata.myfiles = self.getFiles(myid)
    gardendata.mylinks = self.getLinks(myid)
    gardendata.links = self.getLinksOfLinks(myid)
		gardendata.files = self.getFilesOfLinksOfLinks(myid)
    return gardendata
  }

  getLinksOfLinks(myid) {
		var self = this;
		return _.chain(self.getLinks(myid))
			.map((thisid) => { 
				return self.getLinks(thisid)
			})
			.flatten()
			.concat(self.getLinks(myid))
			.pull(myid)
			.uniq()
			.value()

  }

	getFilesOfLinksOfLinks(myid) {
		var self = this;
		return _.chain(self.getLinksOfLinks(myid))
				.map((l) => { return self.getFiles(l) })
				.flatten()
				.compact().uniq()
				.value()
	}


}

module.exports = Irrigation;

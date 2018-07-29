import Biome from 'biome'
import * as _ from 'lodash'; 


class Irrigation {
  constructor() {
  }

  async init() {
    var self = this;
    self.biome = Biome()
    await self.biome.start()
  }

  async addEvent() {
    var self = this;
    var current_time = new Date().getTime();
    await self.biome.addEvent({ from: { "name": "dan" }, type: "seed", msg: "wow here's the current timestamp: " + current_time })
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

  getHistory() {
    // TODO: Cache this
    return this.biome.getEvents();
  } 

  getStats() {
    // CALCULATE world-wide stats here
    var thisHistory = this.getHistory(); 
    var stats = {};
    stats.participantNames = this._getParticipantNames(thisHistory);
    stats.participantNum = stats.participantNames.length
    return stats
  }

  _getParticipantNames(hist) {
    return _.map(
      _.uniqBy(hist, function(o) { return o.from.name; }),
      function(d) { return d.from.name; })
  }

}

module.exports = Irrigation;

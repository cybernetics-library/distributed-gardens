var Biome = require('biome')

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

  getEvents() {
    console.log("xXy");
    return this.biome.getEvents();
  } 
}

module.exports = Irrigation;

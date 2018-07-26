var Biome = require('biome')

class gardenBiome {
  constructor(cb) {
    this._init(cb)
  }

  async _init(cb) {
    var self = this;
    self.biome = Biome()
    await self.biome.start()
    var current_time = new Date().getTime();
    await self.biome.addEvent({ from: { "name": "dan" }, type: "seed", msg: "wow here's the current timestamp: " + current_time })
    await cb();
  }

  getEvents() {
    return this.biome.getEvents()
  } 
}

var gb = new gardenBiome(() => {
  console.log("woo finished");
  console.log(gb.getEvents());
});


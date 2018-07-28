var Biome = require('biome')

class gardenBiome {
  constructor() {
  }

  async init() {
    var self = this;
    self.biome = Biome()
    await self.biome.start()
    self.biome.on('state changed', () => {
      console.log("state changeed!");
    });
  }

  async addEvent() {
    var self = this;
    var current_time = new Date().getTime();
    await self.biome.addEvent({ from: { "name": "dan" }, type: "seed", msg: "wow here's the current timestamp: " + current_time })
  }

  getEvents() {
    return this.biome.getEvents()
  } 
}

var gb = new gardenBiome();

gb.init()
  .then(() => {
    gb.addEvent()
  })
  .then(() => {
    console.log(gb.getEvents());
  });


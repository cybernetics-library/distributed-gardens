var Biome = require('biome')

class gardenBiome {
  constructor() {
    this._init()
  }

  async _init() {
    var self = this;
    self.biome = Biome()
    await self.biome.start()
    await self.biome.addEvent({ from: { "name": "arkadiy" }, type: "seed", msg: "zb2rhZp3WapJaG6DQizqEP3SruMVScn35vixhgGMAyarNYoae" })
    console.log(self.biome.getEvents())
    console.log("yo");
  }
}

var gb = new gardenBiome();

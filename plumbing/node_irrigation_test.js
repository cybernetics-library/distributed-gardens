var Irrigation  = require('./Irrigation');
var irrigation = new Irrigation();
irrigation.init()
//  .then(() => { console.log(irrigation.addSampleEvent()); })
  .then(() => { console.log(irrigation.getEvents()); })

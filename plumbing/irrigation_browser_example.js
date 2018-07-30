var Irrigation  = require('./Irrigation');

window.onload = () => {
  var irrigation = new Irrigation();
  irrigation.init()

/*  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'link', 'msg': { 'link_from': '11111', 'link_to': '22222' } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'link', 'msg': { 'link_from': '11111', 'link_to': '33333' } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'link', 'msg': { 'link_from': '22222', 'link_to': '33333' } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'link', 'msg': { 'link_from': '33333', 'link_to': '44444' } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'link', 'msg': { 'link_from': '44444', 'link_to': '55555' } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'link', 'msg': { 'link_from': '22222', 'link_to': '66666' } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '11111',  media:[ 'ERIC_ED105298'] } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '22222',  media:[ 'AnApproachToCybernetics'] } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '33333',  media:[ 'nasa_techdoc_19750005481'] } })); }) */

  .then(() => { console.log(irrigation.getHistory()); })
  .then(() => { console.log(irrigation.getAdjacencyList()); })
  .then(() => { console.log(irrigation.getStats()); })
  .then(() => { console.log(irrigation.biome._psa.peerCountGuess()); })
}


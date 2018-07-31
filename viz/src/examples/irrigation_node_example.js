var Irrigation  = require('../Irrigation');
var irrigation = new Irrigation();
irrigation.init()
/* 
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '44444',  media:[ 'electricsheep-flock-244-32500-1'] } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '55555',  media:[ 'cd_from-psychodelics-to-cybernetics-featuring_system-01'] } })); })
  .then(() => { console.log(irrigation.addEventNow({ 'from': { 'name': 'tester' }, 'type': 'seed',
    'msg': { 'seed_by': '11111', 'seed_to': '66666',  media:[ 'NorbertWienerCybernetics'] } })); })
*/
  .then(() => { console.log(irrigation.getHistory()); })
  .then(() => { console.log(irrigation.getAdjacencyList()); })
  .then(() => { console.log(irrigation.getStats()); })
  .then(() => { console.log(irrigation.getGraphData()); })
  .then(() => { console.log(irrigation.biome._psa.peerCountGuess()); })

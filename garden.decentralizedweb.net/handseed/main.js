var $ = require('jquery');
var _ = require('lodash');
var Irrigation  = require('./Irrigation');
window._ = _;




$(function() {
   $("input").prop('disabled', true);


    $("#submitbutton").click(function(event) {
      console.log($(event.target).parent());
      var seeder_name = $("#seeder_name").val();
      var seeder_id = $("#seeder_id").val();
      var garden_id = $("#garden_id").val();
      var ia_id = $("#ia_id").val();


      var msg = {
        'from':
          { 'name': seeder_name },
        'type': 'seed',
        'msg': {
          'seed_by': seeder_id,
          'seed_to': garden_id,
           'media' : [ ia_id ]
        }
      }
        

      console.log(msg);

      console.log(window.irrigation.addEventNow(msg) );
      alert ("SEEDED")

      //clear
      $("#ia_id").val("");
    });


   var opts = {}
    if(getUrlValue("nonce") != undefined) {
      opts.nonce = getUrlValue("nonce")
    }

    var irrigation = new Irrigation(opts);
    window.irrigation = irrigation;
    irrigation.init()
      .then(() => { console.log("WE ARE USING NONCE: " + irrigation.biome._config.nonce)})
      .then(() => { console.log(irrigation.getHistory()); })
      .then(() => { console.log(irrigation.getAdjacencyList()); })
      .then(() => { console.log(irrigation.getStats()); })
      .then(() => { console.log(irrigation.getGraphData()); })
      .then(() => { console.log(irrigation.biome._psa.peerCountGuess()); })
      .then(() => { console.log("IRRIGATION READY"); })
      .then(() => { $("input").prop('disabled', false); });
});


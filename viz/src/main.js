import Vue from 'vue/dist/vue.esm.js'
import _ from 'lodash';

import Irrigation from './Irrigation'
import PaperCup from './PaperCup'
import fakeData from './fakeData'
import Helpers from './Helpers'

import Meadow from './Meadow/Meadow.vue'
// import Garden from './Garden/Garden.vue'

var mizdata = require('./Meadow/simple.json')
var badgedata = require('./data/badge_data.json')

var vueapp = new Vue({
  el: '#app',
  components: {
    Meadow,
    // Garden
  },
  data: {
    irrigation: null,
    history: [],
    stats: {},
    // graphdata: mizdata,
    graphdata: null,
    gardendata: {}, //fakeData.gardenstats(),
    badgedata: badgedata,
    currentbadge: '',
  },
  methods: {
    init: function() {
      var self = this;

      var opts = {}
      if(Helpers.getUrlValue("nonce") != undefined) {
        opts.nonce = Helpers.getUrlValue("nonce")
      }
      self.opts = opts;

      self.startIrrigation()
        .then(function () {
          console.log("started!");
          console.log("WE ARE USING NONCE " + self.irrigation.biome._config.nonce)
          self.getData();
          console.log(self.irrigation);
          console.log(self.graphdata);
          self.graphdata = self.irrigation.getGraphData();
        });
      self.createPaperCupHandler();
    },
    startIrrigation: async function() {
      var self = this;
      self.irrigation = new Irrigation(self.opts);
      await self.irrigation.init()
    },
    getData: function() {
      var self = this;
      self.graphdata = self.irrigation.getGraphData();
      self.irrigation = self.irrigation;
      self.history = self.irrigation.getHistory();
      self.stats = self.irrigation.getStats()
    },
    createPaperCupHandler: function() {
      var self = this;
      this.paperCupParent = new PaperCup.PaperCupParent();

      this.paperCupParent.addRequestHandler("scanner", function(reqname, data) {
        if(reqname == "getBadgeTitle") {
          var badgeurl = data;
          var badgeId = Helpers.getBadgeIdFromUrl(badgeurl);
          self.currentbadge = badgeId
          self.gardendata = self.irrigation.getGardenData(self.currentbadge);
          console.log(":::parent:: we got a scan from badge id: " + badgeId);
          console.log(":::parent:: we were asked for badge title: " + self.badgedata[badgeId].title);
          return self.badgedata[badgeId].title;
        } 

        if(reqname == "submitScan") {
          console.log(":::parent:: we got a SCAN " + data);
        } 

        if(reqname == "submitLink") {
          console.log(":::parent:: we got a scan from badge id: " + badgeId);
          console.log(":::parent:: we got a LINK ")
          var msg = {
            'from': {'name': 'kiosk'}, // TODO CHANGE NAME PROGRAMMATICALLY
            'type': 'link',
            'msg': {
              'link_from': Helpers.getBadgeIdFromUrl(data.link_from),
              'link_to': Helpers.getBadgeIdFromUrl(data.link_to)
            }
          }
          self.irrigation.addEventNow(msg).then(function() {
            console.log("SUBMITTED LINK");
            console.log(msg);
          });
        } 
      });
    }
  },
  mounted() {
		var self = this;
    this.init();
  },
  updated() {
  }
})



window.vueapp = vueapp;
window.PaperCup = PaperCup;
window._ = _;
window.Helpers = Helpers;




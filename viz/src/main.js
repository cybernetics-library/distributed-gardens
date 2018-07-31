import Vue from 'vue/dist/vue.esm.js'
import _ from 'lodash';

import Irrigation from './Irrigation'
import PaperCup from './PaperCup'
import fakeData from './fakeData'

import Meadow from './Meadow/Meadow.vue'
import Garden from './Garden/Garden.vue'

var mizdata = require('./Meadow/miserables.json')

var vueapp = new Vue({
  el: '#app',
  components: {
    Meadow,
    Garden
  },
  data: {
    irrigation: null,
    history: [],
    stats: {},
    graphdata: {},
    gardendata: fakeData.gardenstats()
  },
  methods: {
    startIrrigation: async function() {
      var self = this;
      self.irrigation = new Irrigation();
      await self.irrigation.init()
    },
    getData: function() {
      var self = this;
//      self.graphdata = self.irrigation.getGraphData();
      self.irrigation = self.irrigation;
      self.history = self.irrigation.getHistory();
      self.stats = self.irrigation.getStats()
    }
  },
  mounted() {
		var self = this;
    this.startIrrigation()
      .then(function () {
        console.log("started!");
        self.getData();
        console.log(self.irrigation);
        console.log(self.graphdata);
        self.graphdata = self.irrigation.getGraphData();
      });
  },
  updated() {
  }
})



window.vueapp = vueapp;
window.PaperCup = PaperCup;
window._ = _;


PaperCup.listenToChild(function(name, msg) {
  console.log("heard from " + name + " ::: " + msg);
});



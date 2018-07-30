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
    graphdata: mizdata,
    gardendata: fakeData.gardenstats()
  },
  methods: {
    startIrrigation() {
      var self = this;
      var thisirrigation = new Irrigation();
      thisirrigation.init()
        .then(() => {
          self.irrigation = thisirrigation;
          self.getHistory();
        })
    },
    getHistory() {
      var self = this;
      self.history = self.irrigation.getHistory();
      self.stats = self.irrigation.getStats()
    }
  },
  mounted() {
		var self = this;
    this.startIrrigation();
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



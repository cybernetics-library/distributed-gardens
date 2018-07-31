import Vue from 'vue/dist/vue.esm.js'
import Meadow from './Meadow.vue'
import Garden from '../Garden/Garden.vue'

var mizdata = require('./miserables.json');

var vueapp = new Vue({
  el: '#app',
  data: {
    graphdata: mizdata,
    currentbadge: currentbadge,
    gardendata: gardendata
  },
  components: {
    Meadow,
    Garden
  },
  updated () { console.log('updated') }
})

window.vueapp = vueapp;

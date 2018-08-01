import Vue from 'vue/dist/vue.esm.js'
import Meadow from './Meadow.vue'

var mizdata = require('./simple.json');

var vueapp = new Vue({
  el: '#app',
  data: {
    graphdata: mizdata,
    currentbadge: currentbadge,
    gardendata: gardendata
  },
  components: {
    Meadow,
  },
  updated () { console.log('updated') }
})

window.vueapp = vueapp;

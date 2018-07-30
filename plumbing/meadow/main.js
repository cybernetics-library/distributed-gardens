import Vue from 'vue/dist/vue.esm.js'
import Meadow from './Meadow.vue'

var mizdata = require('./miserables.json');

var vueapp = new Vue({
  el: '#app',
  data: {
    graphdata: mizdata,
  },
  components: {
    Meadow
  }
})

window.vueapp = vueapp;

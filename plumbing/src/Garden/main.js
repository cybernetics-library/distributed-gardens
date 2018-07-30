import Vue from 'vue/dist/vue.esm.js'
import Garden from './Garden.vue'

var testdata = {
}
var mizdata = require('./miserables.json');

var vueapp = new Vue({
  el: '#app',
  data: {
    graphdata: mizdata,
  },
  components: {
    Garden
  }
})

window.vueapp = vueapp;

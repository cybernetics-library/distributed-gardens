// this ia development JS file to host/simulate test data being sent to the Garden component

import Vue from 'vue/dist/vue.esm.js'
import Garden from './Garden.vue'
import fakeData from '../fakeData'

///////// TESTDATA
//


var fakegardenstats = fakeData.gardenstats();

console.log(fakeData.file());
console.log(fakeData.stats());
console.log(fakegardenstats);



var mizdata = require('./miserables.json');

var vueapp = new Vue({
  el: '#app',
  data: {
    graphdata: mizdata,
    gardendata: fakegardenstats
  },
  components: {
    Garden
  }
})

window.vueapp = vueapp;

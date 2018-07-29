import $ from 'jquery';
import _ from 'lodash'
import * as THREE from 'three';
import Vue from 'vue'


import Irrigation from './Irrigation';



/*
class Garden {
  constructor(config) {
    this.irrigation = new Irrigation();
    this.irrigation.init()
      .then(() => { })

    });
  }

}



var garden = new Garden({})
*/

var irrigation = new Irrigation();
irrigation.init()
  .then(() => { console.log(irrigation.addSampleEvent()); })
  .then(() => { console.log(irrigation.getEvents()); })










// for console debugging

//window.$ = $;
//window.garden = garden;


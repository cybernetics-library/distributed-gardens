import $ from 'jquery';
import _ from 'lodash'
import * as THREE from 'three';
import Vue from 'vue'
import ForceGraph3D from '3d-force-graph';
import Biome from 'biome'


window.$ = $;



function randomColor() {
  var cssHSL = "hsl(" + Math.round(360 * Math.random()) + ',' +
                    Math.round(25 + 70 * Math.random()) + '%,' +
                     Math.round(45 + 10 * Math.random()) + '%)';
//  return new THREE.Color("hsl(0, 100%, 50%)");
  return new THREE.Color(cssHSL);
}


class Rhizome {
  constructor(config) {
    this._setupGraph(config.domid);
    this._setupGraphRotation();
		this._setupGraphStyling();
  }

  _setupGraph(domid) {
    const elem = document.getElementById(domid);
    this.Graph = ForceGraph3D()(elem)
      .jsonUrl('blocks.json')
      .nodeAutoColorBy('user')
      .nodeLabel(node => `${node.user}: ${node.description}`)
      .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
      .onNodeClick(node => window.open(`https://bl.ocks.org/${node.user}/${node.id}`, '_blank'));
  }

  _setupGraphRotation() {
		var self = this;
    self.distance = 1000;
    self.angle = 0;
    setInterval(() => {
      self.Graph.cameraPosition({
        x: self.distance * Math.sin(self.angle),
        z: self.distance * Math.cos(self.angle)
      });
      self.angle += Math.PI / 3000;
    }, 10);
  }

	_setupGraphStyling() {
		var self = this;
//		self.Graph.linkDirectionalParticles("value")
//		self.Graph.linkDirectionalParticleSpeed(d => d.value * 0.001);
	}


}


class gardenBiome {
  constructor(cb) {
    this._init(cb)
  }

  _init(cb) {
    var self = this;
    self.biome = Biome()
    self.biome.start().then(() => {
      var current_time = new Date().getTime();
      self.biome.addEvent({ from: { "name": "dan" }, type: "seed", msg: "wow here's the current timestamp: " + current_time }).then(() => {
        cb();
      });
    });
  }

  getEvents() {
    return this.biome.getEvents()
  } 
}



///////////////////
////////////////////
//
var rhizome = new Rhizome({ 'domid': '3d-graph' });
window.rhizome = rhizome;


var gb = new gardenBiome(() => {
  console.log("woo finished");
  console.log(gb.getEvents());
});


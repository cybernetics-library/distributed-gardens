import Vue from 'vue/dist/vue.esm.js'
import Irrigation from './Irrigation'
import _ from 'lodash';

var vueapp = new Vue({
  el: '#app',
  data: {
    irrigation: null,
    history: [],
    stats: {},
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
window._ = _;


var cs = Vue.component('poem-graph', {
props: ["graphdata"],
data: function() {
	return {
    graphdata: {
    },
		settings: {
			svgWidth: 960,
			svgHeight: 600
		}
	}
},
methods: {
},
mounted: function() {
  this.color = d3.scaleOrdinal(d3.schemeCategory20);

  this.simulation = d3.forceSimulation(this.graphdata.nodes)
                        .force("link", d3.forceLink(this.graphdata.links).distance(100).strength(0.1))
                        .force("charge", d3.forceManyBody())
                        .force("center", d3.forceCenter(this.settings.svgWidth / 2, this.settings.svgHeight / 2));

},
computed: {
  nodes: function() {
		var that = this;
			if (that.graphdata.nodes) {
				return d3.select("svg").append("g")
					.attr("class", "nodes")
					.selectAll("circle")
					.data(that.graphdata.nodes)
					.enter().append("circle")
					.attr("r", 20)
					.attr("fill", function (d ,i) {
							return that.color(i);
					})
					.call(d3.drag()
							.on("start", function dragstarted(d) {
									if (!d3.event.active) that.simulation.alphaTarget(0.3).restart();
									d.fx = d.x;
									d.fy = d.y;
							})
							.on("drag", function dragged(d) {
									d.fx = d3.event.x;
									d.fy = d3.event.y;
							})
							.on("end", function dragended(d) {
									if (!d3.event.active) that.simulation.alphaTarget(0);
									d.fx = null;
									d.fy = null;
							}));
		}

  },
  links: function () {
      var that = this;
      if (that.graphdata.links) {
          return d3.select("svg").append("g")
              .attr("class", "linksv2")
              .selectAll("line")
              .data(that.graphdata.links)
              .enter().append("line")
              .attr("stroke-width", function (d) { return Math.sqrt(d.value); });
      }
  }
}
})












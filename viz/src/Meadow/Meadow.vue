<template>
  <div id="meadow">
    <div id="graph"></div>
  </div>
</template>

<style scoped>
# graph {
  border: 2px solid pink;
}
</style>

<script>
import ForceGraph from 'force-graph'

export default {
  props: {
    "graphdata": {
      default: {},
    }
  },
  data: () => {
    return {
      current_time: null,
      Graph: null
    }
  },
  mounted() {
    console.log("I was mounted");
    this.initGraph();
    window.self = this;
  },
  methods: {
    initGraph() {
    },
    createGraph() {
      var self = this;
      var elem = document.getElementById('graph');
      self.Graph = ForceGraph()(elem)
        .graphData(self.graphdata)
        // .nodeLabel(`id`)
        .nodeAutoColorBy('group')
        .linkDirectionalParticles(2)
        .linkDirectionalParticleWidth(1.4)
        .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
        .onNodeClick(node => {
          // Center/zoom on node
          self.Graph.centerAt(node.x, node.y, 1000);
          self.Graph.zoom(60, 2000);
        })
        .nodeCanvasObject(({ id, x, y }, ctx) => {
            ctx.fillStyle = self.getColor(id);
            ctx.beginPath(); ctx.moveTo(x, y - 5); ctx.lineTo(x - 5, y + 5); ctx.lineTo(x + 5, y + 5); ctx.fill();
        })
        console.log(self.Graph.graphData())


    },
    getColor(n) {
      return '#419771';
    }
  }
}

// TODO : SEND DATA BACK TO INDEX SO THAT GARDEN CAN DO TRANSFORMS
 

/*function inputChange(e) {
		e.preventDefault()
		var val = document.getElementById("name").value
		var node = Graph.graphData().nodes[val]
		console.log(document.getElementById("name").value);
		console.log(Graph.graphData().nodes[val])
		Graph.centerAt(node.x, node.y, 1000);
		Graph.zoom(60, 2000);
}*/


</script>


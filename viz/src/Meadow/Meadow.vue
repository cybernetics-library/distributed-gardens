<template>
  <div id="meadow">
    <h1>{{currentbadge}}</h1>
    <div id="info">

      <form class="pure-form" onsubmit="makeNode(event)">
        <button type="submit">makeNode</button>
      </form>
    </div>

    <div id="garden-overlay" class="dim"></div>
    <!-- <div id="garden"></div> -->

    <garden :gardendata=gardendata></garden>

    <div id="graph"></div>
  </div>
</template>

<style scoped>
    body{ margin: 0; }
    #info{
      width: 100%;
      position: fixed;
      top: 0;
      color: black;
      display: flex;
      justify-content: space-between;
      z-index: 1;
      padding: 1rem;
      box-sizing: border-box;
      font-family: sans-serif;
    }
    h1{
      position: fixed;
    }
    #garden{
        position: fixed;
        width: 640px; height: 480px;
        /* width: 10px; height: 10px; */
        /* margin-left: -5px; margin-top: -5px; */
        background-color:'none';
        /* border-radius: 1000px; */
        transform: translate(50%, 50%);
        z-index: 2;
    }

     #garden-overlay{
        position: absolute;
        width: 300px; height: 300px;
        border-radius: 1000px;
        position: absolute;
        top: 50%; right: 50%;
        transform: translate(50%,-50%);
        background: green;
        color: white;
        z-index: 2;
        transition: opacity 5s ease;
        opacity: 1;

    }
    #garden-overlay.dim{
      opacity: 0;
    }

    .dot{
        position: absolute;
        width: 10px; height: 10px;
        background-color: red;
        /* border-radius: 1000px; */
        /* top: 50%; right: 50%; */
        /* transform: translate(50%,-50%); */
        z-index: 2;
    }
</style>

<script>
import Garden from '../Garden/Garden.vue'
import ForceGraph from 'force-graph'

export default {
  props: {
    "graphdata": {
      default: {},
    },
    "gardendata": {
      default: {},
    },
    "currentbadge":{
      default: {},
    }
  },
  components: {
    Garden
  },
  data: () => {
    console.log('new data')
    return {
      current_time: null,
      Graph: null,
      badgeId: null,
      state: null,
      nextNode: null,
    }
  },
  updated() {
    if(this.currentbadge != this.badgeId){
      console.log('new badge')
      this.badgeId = this.currentbadge
          this.makeNode(this.Graph, this.currentbadge)
    }
  },
  mounted() {
    // console.log(this.currentbadge)
    this.initGraph();
    window.self = this;
  },
  methods: {
    initGraph() {
      var Graph = null
      const elem = document.getElementById('graph');
      const garden_overlay = document.getElementById('garden-overlay');
      var selectedNode = 0
      // var nextNode = 3
      var previousNode = null
      var divNodes = []
      var gotBadge = false

      var renderTimer
      var focusTimer
      this.state = "ready"

      var self = this;
      self.Graph = ForceGraph()(elem)
        .graphData(this.graphdata)
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        .linkDirectionalParticles(2)
        .linkDirectionalParticleWidth(1.4)
        .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
        .onEngineTick(() => {
          this.nextNode = self.Graph.graphData().nodes[0]
          manageNodes(self.Graph.graphData().nodes, this.nextNode, garden)
        })
        .enableZoomPanInteraction(false)
        .onNodeClick(node => {
          zoomTo(self.Graph, node)
        });
        console.log(self.Graph.graphData  ())
        
        this.nextNode = self.Graph.graphData().nodes[0]

    },
    getColor(n) {
      return '#419771';
    },
    zoomTo(Graph, node){
      Graph.centerAt(node.x, node.y, 1000);
      Graph.zoom(20, 2000);
    },
    makeNode(Graph, currentbadge) {
      // console.log(Graph, "I'm a graph")
      // console.log(currentbadge , "I'm a badgeNum")
      var { nodes, links } = Graph.graphData();
      nodes.push({id: "new", group: 1 })
      Graph.graphData({ nodes, links });
      this.nextNode = Graph.graphData().nodes[Graph.graphData().nodes.length-1]

      this.zoomTo(Graph, this.nextNode)
    }
  }
}

// TODO : SEND DATA BACK TO INDEX SO THAT GARDEN CAN DO TRANSFORMS
  // function makeNode(Graph, currentbadge) {
  //   console.log(Graph)
  //   console.log(currentbadge)
    // var { nodes, links } = self.Graph.graphData();
    // nodes.push({id: "new", group: 1 })
    // Graph.graphData({ nodes, links });
    // state = "ready"

    // var dot = document.createElement('div');
    // dot.id = Graph.graphData().nodes.length-1
    // dot.className = 'dot'
    // // elem.appendChild(dot);
    // elem.insertAdjacentElement('afterbegin', dot)

    // divNodes.push({el: dot})

    // initCycle()
  // }


  // function zoomTo(Graph, node){
  //   console.log('hello')
  //   Graph.centerAt(node.x, node.y, 1000);
  //   Graph.zoom(20, 2000);
  // }

 function manageNodes(nodes, nextNode){
      var garden = document.getElementById("garden")
      var graph = document.getElementById( 'graph' )

      var canvas = document.getElementById('graph').getElementsByTagName( 'canvas' )[0];
      var ctx = canvas.getContext('2d')
      var canvasZoom = ctx.canvas.__zoom;

      var correctedX = ((nextNode.x * canvasZoom.k) + (canvasZoom.x)) - 10*canvasZoom.k/2
      var correctedY = ((nextNode.y * canvasZoom.k) + (canvasZoom.y)) - 10*canvasZoom.k/2

      // nodes.forEach((node, i) => {
      //   var el = document.getElementById(i)
      //   var correctedX = ((node.x * canvasZoom.k) + (canvasZoom.x))
      //   var correctedY = ((node.y * canvasZoom.k) + (canvasZoom.y))
      //   // console.log(el)
      //   el.style = "transform: translate(" + correctedX + "px ," + correctedY + "px);"
      // })

      // garden.style = "transform: translate(" + correctedX + "px ," + correctedY + "px); width:" + 10*canvasZoom.k + "px; height:" + 10*canvasZoom.k + "px; "
    }

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


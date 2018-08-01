<template>
  <div id="meadow">
    <h1>{{currentbadge}}</h1>
    <div id="garden-overlay" class="dim"></div>

    <garden 
      :gardendata=gardendata
      :currentbadge=currentbadge
    ></garden>

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
        /* width: 640px; height: 480px; */
        /* width: 10px; height: 10px; */
        /* margin-left: -5px; margin-top: -5px; */
        background-color:'none';
        /* border-radius: 1000px; */
        transform: translate(50%, 50%);
        z-index: 2;
    }

     #garden-overlay{
        position: absolute;
        /* width: 300px; height: 300px; */
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
    return {
      current_time: null,
      // graphdata: null,
      Graph: null,
      badgeId: null,
      state: null,
      nextNode: null,
      previousNode: null,
      divNodes: [],
      renderTimer: null,
      focusTimer: null,
      elem: null
    }
  },
  updated() {
    if(this.currentbadge != this.badgeId){
      this.badgeId = this.currentbadge
      this.makeNode(this.Graph, this.currentbadge)
    }
  },
  mounted() {
    // console.log(this)
    this.initGraph();
    window.self = this;
  },
  methods: {
    initGraph() {
      this.elem = document.getElementById('graph');
      const garden_overlay = document.getElementById('garden-overlay');
      var selectedNode = 0
      var gotBadge = false

      this.state = "ready"

      var self = this;
      self.Graph = ForceGraph()(this.elem)
        .graphData(this.graphdata)
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        .linkDirectionalParticles(2)
        .linkDirectionalParticleWidth(1.4)
        .onNodeHover(node => elem.style.cursor = node ? 'pointer' : null)
        .onEngineTick(() => {
          // this.nextNode = this.Graph.graphData().nodes[0]
          this.manageNodes(this.Graph.graphData().nodes, this.nextNode)
        })
        // .enableZoomPanInteraction(false)
        .onNodeClick(node => {
          this.zoomTo(this.Graph, node)
        });
        
        this.nextNode = self.Graph.graphData().nodes[0]
        // this.previousNode = this.nextNode

      self.Graph.graphData().nodes.forEach((node,i) => {
        var dot = document.createElement('div');
        dot.id = i
        dot.className = 'dot'
        // elem.appendChild(dot);
        this.elem.insertAdjacentElement('afterbegin', dot)

        this.divNodes.push({el: dot})
      })

    },
    getColor(n) {
      return '#419771';
    },
    zoomTo(Graph, node){
      Graph.centerAt(node.x, node.y, 1000);
      Graph.zoom(20, 2000);
    },
    makeNode(Graph, currentbadge) {
      var { nodes, links } = this.Graph.graphData();
      nodes.push({id: "new", group: 100 })
      this.Graph.graphData({ nodes, links });
      this.state = "ready"

      var dot = document.createElement('div');
      dot.id = this.Graph.graphData().nodes.length-1
      dot.className = 'dot'
      this.elem.appendChild(dot);
      this.elem.insertAdjacentElement('afterbegin', dot)

      this.divNodes.push({el: dot})

      this.initCycle()
    },
    manageNodes(nodes, nextNode){
      var garden = document.getElementById("garden")
      var graph = document.getElementById( 'graph' )

      var canvas = document.getElementById('graph').getElementsByTagName( 'canvas' )[0];
      var ctx = canvas.getContext('2d')
      var canvasZoom = ctx.canvas.__zoom;

      var correctedX = ((nextNode.x * canvasZoom.k) + (canvasZoom.x)) - 10*canvasZoom.k/2
      var correctedY = ((nextNode.y * canvasZoom.k) + (canvasZoom.y)) - 10*canvasZoom.k/2

      nodes.forEach((node, i) => {
        var el = document.getElementById(i)
        var correctedX = ((node.x * canvasZoom.k) + (canvasZoom.x)) - 10*canvasZoom.k/2
        var correctedY = ((node.y * canvasZoom.k) + (canvasZoom.y)) - 10*canvasZoom.k/2

        // console.log(el)
        el.style = "transform: translate(" + correctedX + "px ," + correctedY + "px);"
      })

      garden.style = "transform: translate(" + correctedX + "px ," + correctedY + "px); width:" + 10*canvasZoom.k + "px; height:" + 10*canvasZoom.k + "px; "
    },
    focusGarden() {
      console.log(this.nextNode)
      this.zoomTo(this.Graph, this.nextNode)
      clearTimeout(this.focusTimer);
      this.state = "focused"
      console.log(this.state)
      // garden_overlay.className = 'none'
      this.initCycle()
    },
    focusGraph() {
      // Graph.centerAt(0, 0, 1000);
      this.Graph.zoom(4, 2000);
      clearTimeout(this.focusTimer);
      this.state = "waiting"
      // garden_overlay.className = 'dim'
      this.initCycle()
    },
    renderGarden() {
      var { nodes, links } = this.Graph.graphData();
      if(this.previousNode){
        links.push({source: this.previousNode, target: this.nextNode, val: 1000 })
        this.Graph.graphData({ nodes, links });
      }
      clearTimeout(this.renderTimer);
      this.focusTimer = setTimeout(this.focusGarden, 3000);
    },
    initCycle() {
      if (this.state === "waiting"){
        // renderTimer = setTimeout(focusGraph, 10000);
      } else if(this.state === 'ready'){
        this.previousNode = this.nextNode
        this.nextNode = this.Graph.graphData().nodes[this.Graph.graphData().nodes.length-1]
        this.Graph.centerAt(this.nextNode.x, this.nextNode.y, 1000);
        this.renderTimer = setTimeout(this.renderGarden, 3000);
      } else if (this.state === "focused"){
        this.renderTimer = setTimeout(this.focusGraph, 10000);
      }
    }
  }
}

// TODO : SEND DATA BACK TO INDEX SO THAT GARDEN CAN DO TRANSFORMS

</script>


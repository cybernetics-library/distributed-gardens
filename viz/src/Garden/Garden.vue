<template>
  <div id="garden">
    <!--<div id="stats"> {{ gardendata }} </div>-->
    <FilePlants :gardendata="gardendata"></FilePlants>
    <Grass :gardendata="gardendata"></Grass>
  </div>
</template>

<style scoped>
#garden {
  height: 400px;
  width: 600px;
  position: relative;
}

#garden * {
  position: absolute;
}
</style>

<script>

import FilePlants from './FilePlants.vue'
import Grass from './Grass.vue'

export default {
  props: {
    "gardendata": {
      default: {},
    }
  },
  data: () => {
    return {
      current_time: null,
    }
  },
  components: {
    FilePlants,
    Grass
  },
  mounted() {
    console.log("gardenn  I was mounted");
    this.initGarden();
    window.self = this;
  },
  methods: {
    initGarden() {
      var self = this;
      var elem = document.getElementById('graph');
    }
  }
}


 

</script>


<template>
  <div id="garden">
    <div id="stats"> {{ currentbadge }} </div>
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
    },
    "currentbadge": {
      default: {},
    }
  },
  data: () => {
    return {
      current_time: null,
      badgeID: null,
    }
  },
  updated() {
    if(this.currentbadge != this.badgeId){
      this.badgeId = this.currentbadge
    }
  },
  components: {
    FilePlants,
    Grass
  },
  mounted() {
    console.log("garden I was mounted");
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


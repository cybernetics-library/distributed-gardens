<template>
  <div id="garden">
    <div id="stats"> {{ currentbadge }} </div>
    <FilePlants :gardendata="gardendata" :currentbadge=currentbadge></FilePlants>
    <Grass :gardendata="gardendata" :currentbadge=currentbadge></Grass>
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
      console.log('yo this bit is running')
      this.badgeId = this.currentbadge
      this.initGarden();
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


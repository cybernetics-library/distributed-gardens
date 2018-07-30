<template>
  <div id="Grass">
    {{gardendata}}
  </div>
</template>

<style scoped>
#Grass {
  border: 2px solid green;
  height: 100%;
  width: 100%;
}
</style>

<script>

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
  mounted() {
    console.log("I was mounted");
    this.init();
    window.self = this;
  },
  methods: {
    init() {
      var self = this;
      self.elem = document.getElementById('Grass');

    }
  }
}


 

</script>


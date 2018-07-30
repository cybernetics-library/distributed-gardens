<template>
  <div id="Grass">
  </div>
</template>

<style>
#Grass {
  height: 100%;
  width: 100%;
}
.grass {
  position: absolute;
  color: #364B5E;
  font-weight: bold;
  font-family: Helvetica, Arial;
  font-size: 0.8em;
}
</style>

<script>
import $ from 'jquery'

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
      self.gardendata.links.forEach((d, i) => {
        console.log(d);
        var pleft = hashStringToRange(d, 0, 500, 2341);
        var ptop = hashStringToRange(d, 300, 400, 998);
        $("<div class='grass'>")
          .html("\\/\\/\\/" + d + "\\/\\/\\/")
          .css({ "left": pleft, "top": ptop })
          .appendTo(self.elem);
      });
    }

  }
}


// given a string and a seed, returns a deterministic number between n1 and n2
function hashStringToRange(s, n1, n2, seed) {
    var h = 1;
    s.split("").forEach((d, i) => {
        h = h * d.charCodeAt();
        h %= (100000 + seed)
    });
	return n1 + ( (h / (100000 + seed)) * (n2 - n1) )
} 

 

</script>


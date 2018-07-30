<template>
  <div id="FilePlants">
  </div>
</template>

<style>
#FilePlants {
  height: 100%;
  width: 100%;
  position: relative;
  font-family: Helvetica, Arial;
  font-size: 0.8em;
  color: green;
}
.flower {
  position: absolute;
  text-align: center;
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
      self.elem = document.getElementById('FilePlants');
      self.gardendata.files.forEach((d, i) => {
        var posx = hashStringToRange(d, 0, 500, 2341);
        var posy = hashStringToRange(d, 0, 350, 998);
        var thiscolor = greens[Math.floor(hashStringToRange(d, 0, greens.length, 43434))];
        $("<div class='flower'>")
          .html(d)
          .css({ "left": posx, "top": posy })
          .css({ "color": thiscolor })
          .appendTo(self.elem);
      });
    }
  }
}


var greens = ["#32DB67", "#7DB392", "#96AA86", "#367669", "#21783E", "#277971", "#239F62"]

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


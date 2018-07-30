<template>
  <div id="FilePlants">
  </div>
</template>

<style>
#FilePlants {
  border: 2px solid green;
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
      var elem = document.getElementById('FilePlants');
      self.gardendata.files.forEach((d, i) => {
        var posx = hashStringToRange(d, 0, 500, 2341);
        var posy = hashStringToRange(d, 0, 400, 998);
        $("<div class='flower'>").html(d).css({ "left": posx, "top": posy }).appendTo($("#FilePlants"));
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


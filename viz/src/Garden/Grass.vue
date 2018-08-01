<template>
    <canvas id="grass">  
      <span class="hide">{{currentbadge}}</span>
    </canvas>
</template>

<style>
.hide {
  opacity: 0;
}
#grass {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
import seedrandom from 'seedrandom'
const grass1 = require('./grassImages/grass1.png')
const grass2 = require('./grassImages/grass2.png')
const grass3 = require('./grassImages/grass3.png')
const grass4 = require('./grassImages/grass4.png')
const grassArray = [
  grass1,
  grass2,
  grass3,
  grass4
]

export default {
  props: ['gardendata', 'currentbadge'],
  data: () => {
    return {
      badgeId: null,
    }
  },
  mounted() {
    //console.log("grass was mounted");
    //this.init();
    window.self = this;
  },
  updated() {
    if(this.currentbadge != this.badgeId){
      this.badgeId = this.currentbadge
      console.log('updataed!! gonna render grass')
      this.init();
    }
  },
  methods: {
    init() {
      var self = this;

      const
        canvas = document.getElementById('grass'),
        ctx = canvas.getContext('2d'),
        canvasWidth = window.innerWidth,
        canvasHeight = window.innerHeight;

      canvas.width = canvasWidth,
      canvas.height = canvasHeight;

      //ellipse consts
      const
        xRad = ((canvasWidth/2)- 20),
        yRad = 70,
        xC = xRad + 20,
        yC = 500;

      ctx.beginPath();
      ctx.ellipse(xC, yC, xRad, yRad, 0, 0, Math.PI*2);
      ctx.stroke();

      const linksNumber = this.gardendata.links.length;
      for (var i = 0; i < (linksNumber*3); i++) {
        const grassCoords = this.generateCoordsInGarden(this.currentbadge, this.currentbadge * i, xC, yC, xRad, yRad);
        const random = new seedrandom(this.currentbadge * i)
        const chosenOne = grassArray[Math.floor(random()*grassArray.length)] 

        this.drawGrass(ctx, grassCoords, chosenOne, canvasHeight)
      }

    },
    drawGrass(ctx, coords, imagePath, canvasHeight) {
      const of10Scale = ((canvasHeight - coords.y) / canvasHeight) * 2;

      this.placeImage(ctx, coords, imagePath, of10Scale);
    },
    placeImage(ctx, coords, imagePath, of10Scale) {
      const image = new Image();
      image.src = imagePath;
      image.onload = () => {
        const 
          aspectRatio = image.height / image.width,
          height = (ctx.canvas.height * 0.7) * (of10Scale * 0.1),
          width = height/aspectRatio,
          plantCenterBottomCoords = {
            x: coords.x - (width/2),
            y: coords.y - (height * 0.98)
          };
        ctx.globalAlpha = 0.8;
        ctx.drawImage(image, plantCenterBottomCoords.x, plantCenterBottomCoords.y, width, height);
      }
    },
    generateCoordsInGarden(badgeId, fileName, gardenCenterX, gardenCenterY, gardenRadX, gardenRadY) {
      const
        badgeIdRandGen = new seedrandom(badgeId),
        fileNameRandGen = new seedrandom(fileName),
        newRadX = Math.floor(gardenRadX * badgeIdRandGen()) * 2,
        newRadY = Math.floor(gardenRadY * fileNameRandGen()),
        degAngle = fileNameRandGen() > 0.5 ? Math.floor(180 * fileNameRandGen()) : Math.floor(-180 * fileNameRandGen());

      return this.getPointOnEllipse(gardenCenterX, gardenCenterY, newRadX, newRadY, degAngle)
    },
    getPointOnEllipse(xC, yC, xRad, yRad, degAngle) {
      return {
        x: (xC + xRad * Math.cos(degAngle * Math.PI/180)),
        y: (yC + yRad * Math.sin(degAngle * Math.PI/180))
      }
    }
  }
}

</script>


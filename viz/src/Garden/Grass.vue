<template>
  <canvas id="grass">

  </canvas>
</template>

<style>
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

export default {
  props: {
    "gardendata": {
      default: {},
    },
    "currentbadge": {
      default: '',
    }
  },
  data: () => {
    return {
    }
  },
  updated() {
    if(this.currentbadge != this.badgeId){
      this.badgeId = this.currentbadge
      //this.init();
    }
  },
  mounted() {
    console.log("grass was mounted");
    //this.init();
    window.self = this;
  },
  updated() {
    
    this.init();
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

      const
        newCoord1 = this.generateCoordsInGarden(11123, 12314123123124, xC, yC, xRad, yRad),
        newCoord2 = this.generateCoordsInGarden(11123, 12323123124, xC, yC, xRad, yRad),
        newCoord3 = this.generateCoordsInGarden(11123, 1231413124, xC, yC, xRad, yRad),
        newCoord4 = this.generateCoordsInGarden(11123, 12314123123124, xC, yC, xRad, yRad),
        newCoord5 = this.generateCoordsInGarden(11123, 45454545, xC, yC, xRad, yRad),
        newCoord6 = this.generateCoordsInGarden(11123, 12314123123124, xC, yC, xRad, yRad),
        newCoord7 = this.generateCoordsInGarden(11123, 12314128724, xC, yC, xRad, yRad),
        newCoord8 = this.generateCoordsInGarden(11123, 565, xC, yC, xRad, yRad),
        newCoord9 = this.generateCoordsInGarden(11123, 87665, xC, yC, xRad, yRad);

      this.drawGrass(ctx, newCoord1, grass1, canvasHeight);
      this.drawGrass(ctx, newCoord2, grass2, canvasHeight);
      this.drawGrass(ctx, newCoord3, grass3, canvasHeight);
      this.drawGrass(ctx, newCoord4, grass4, canvasHeight);
      this.drawGrass(ctx, newCoord5, grass1, canvasHeight);
      this.drawGrass(ctx, newCoord6, grass2, canvasHeight);
      this.drawGrass(ctx, newCoord7, grass3, canvasHeight);
      this.drawGrass(ctx, newCoord8, grass4, canvasHeight);
      this.drawGrass(ctx, newCoord9, grass1, canvasHeight);

    },
    drawGrass(ctx, coords, imagePath, canvasHeight) {
      const of10Scale = ((canvasHeight - coords.y) / canvasHeight) * 7;
      console.log(of10Scale)

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
        newRadX = Math.floor(gardenRadX * badgeIdRandGen()),
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


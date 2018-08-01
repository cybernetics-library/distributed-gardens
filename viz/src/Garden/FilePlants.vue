<template>
  <canvas id="FilePlants">
    <span class="hide">{{currentbadge}}</span>
  </canvas>
</template>

<style>
.hide {
  opacity: 0;
}
#FilePlants {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
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
import seedrandom from 'seedrandom'
const a1 = require('./plantImages/a1.png')
const a2 = require('./plantImages/a2.png')
const a3 = require('./plantImages/a3.png')
const b1 = require('./plantImages/b1.png')
const b2 = require('./plantImages/b2.png')
const b3 = require('./plantImages/b3.png')
const c1 = require('./plantImages/c1.png')
const c2 = require('./plantImages/c2.png')
const c3 = require('./plantImages/c3.png')
const d1 = require('./plantImages/d1.png')
const d2 = require('./plantImages/d2.png')
const d3 = require('./plantImages/d3.png')
const d4 = require('./plantImages/d4.png')
const d5 = require('./plantImages/d5.png')
const d6 = require('./plantImages/d6.png')
const d7 = require('./plantImages/d7.png')
const d8 = require('./plantImages/d8.png')
const d9 = require('./plantImages/d9.png')
const d10 = require('./plantImages/d10.png')
const d11 = require('./plantImages/d11.png')
const d12 = require('./plantImages/d12.png')
const d13 = require('./plantImages/d13.png')
const plantfiles = [
        a1,
        a2,
        a3,
        b1,
        b2,
        b3,
        c1,
        c2,
        c3,
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7,
        d8,
        d9,
        d10,
        d11,
        d12,
        d13
      ];

export default {
  props: ['gardendata', 'currentbadge'],
  data: () => {
    return {
      badgeId: null,
    }
  },
  mounted() {
    //console.log("palants I was mounted");
    
    window.self = this;
  },
  updated() {
    if(this.currentbadge != this.badgeId){
      this.badgeId = this.currentbadge
      console.log('updataed!! gonna render plants',this.gardendata)
      this.init();
    }
  },
  methods: {
    init() {
      var self = this;

      const
        canvas = document.getElementById('FilePlants'),
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

        // Create gradient
      const
        grd = ctx.createRadialGradient(xC, yC, xRad - (xRad * 0.9), xC, yC, xRad);
      
      // Add colors
      grd.addColorStop(0.000, 'rgba(152, 251, 152, 1.000)');
      grd.addColorStop(0.9, 'rgba(152, 251, 152, 0.1)');
      grd.addColorStop(1.000, 'rgba(255, 255, 255, 0.000)');

      ctx.setTransform(1, 0, 0, 0.10, 0, yC - 50);
      ctx.beginPath();
      ctx.ellipse(xC, yC, xRad, xRad, 0, 0, Math.PI*2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.beginPath();
      ctx.ellipse(xC, yC, xRad, yRad, 0, 0, Math.PI*2);
      ctx.stroke();

      for (var i = this.gardendata.files.length - 1; i >= 0; i--) {
        const fileName = this.gardendata.files[i];

        //draw plant for file
        //get plant by filename
        const plantRandom = new seedrandom(fileName);

        const chosenOne = plantfiles[Math.floor(plantRandom()*plantfiles.length)];

        const fileCoords = this.generateCoordsInGarden(this.badgedata, fileName, xC, yC, xRad, yRad);
        this.placeImage(ctx, fileCoords, chosenOne, (plantRandom() * 8))
      }
    }, 
    placeImage(ctx, coords, imagePath,  of10Scale) {
      const image = new Image();
      image.src = imagePath;
      image.onload = () => {
        const 
          aspectRatio = image.height / image.width,
          height = (ctx.canvas.height * 0.8) * (of10Scale * 0.1),
          width = height/aspectRatio,
          plantCenterBottomCoords = {
            x: coords.x - (width/2),
            y: coords.y - (height * 0.98)
          };

        ctx.drawImage(image, plantCenterBottomCoords.x, plantCenterBottomCoords.y, width, height);

        this.generateLabel(ctx, width, height, plantCenterBottomCoords, imagePath);
      }
    },
    generateLabel(ctx, imgWidth, imgHeight, coords, imagePath) {
      ctx.font = '20px sans-serif';
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      const
        textMeasures = ctx.measureText(imagePath),
        pathCoords0 = {
          x: coords.x,
          y: coords.y + (imgHeight * 0.25)
        },
        pathCoords1 = {
          x: pathCoords0.x - 50,
          y: pathCoords0.y - 30
        },
        pathCoords2 = {
          x: pathCoords1.x - 60,
          y: pathCoords1.y
        };

      ctx.beginPath();
      ctx.moveTo(pathCoords0.x, pathCoords0.y);
      ctx.lineTo(pathCoords1.x, pathCoords1.y);
      ctx.lineTo(pathCoords2.x, pathCoords2.y);
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.stroke();

      ctx.fillText(imagePath, pathCoords2.x - textMeasures.width - 10, pathCoords2.y);
    },
    drawPoint(ctx, coords, color) {
      ctx.beginPath();
      ctx.arc(coords.x, coords.y, 5, 0, Math.PI*2);
      ctx.fillStyle = color;
      ctx.fill(); 
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


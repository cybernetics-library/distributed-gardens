<template>
  <canvas id="FilePlants">

  </canvas>
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
import seedrandom from 'seedrandom'

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
    console.log("palants I was mounted");
    this.init();
    window.self = this;
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

      const newCoord = generateCoordsInGarden(64172, 'testname.gif', xC, yC, xRad, yRad);
      const newCoord2 = generateCoordsInGarden(64172, 'antoher.gif', xC, yC, xRad, yRad);
      const newCoord3 = generateCoordsInGarden(64172, 'anasdfasdafstoasdher.gif', xC, yC, xRad, yRad);
      const newCoord4 = generateCoordsInGarden(64172, 'anas2379846jadftoher.gif', xC, yC, xRad, yRad);
      const newCoord5 = generateCoordsInGarden(64172, 'antoasdfas/asdfasdf/asdfher.gif', xC, yC, xRad, yRad);
      const newCoord6 = generateCoordsInGarden(64172, 'anasdjah/23/42/3dfsdf/toher.gif', xC, yC, xRad, yRad);

      drawPoint(ctx, newCoord, 'red');
      drawPoint(ctx, newCoord2, 'red');
      drawPoint(ctx, newCoord3, 'red');
      drawPoint(ctx, newCoord4, 'red');
      drawPoint(ctx, newCoord5, 'red');
      drawPoint(ctx, newCoord6, 'red');

      placeImage(ctx, newCoord, 'plantImages/a1.png', 1);
      placeImage(ctx, newCoord2, 'plantImages/a2.png', 5);
      placeImage(ctx, newCoord3, 'plantImages/a3.png', 7);
      placeImage(ctx, newCoord4, 'plantImages/b1.png', 3);
      placeImage(ctx, newCoord5, 'plantImages/b2.png', 6);
      placeImage(ctx, newCoord6, 'plantImages/b3.png', 8);
    }
  }
}


function placeImage(ctx, coords, imagePath,  of10Scale) {
  const image = new Image();
  image.src = imagePath;
  image.onload = function(){
    const 
      aspectRatio = image.height / image.width,
      height = (ctx.canvas.height * 0.7) * (of10Scale * 0.1),
      width = height/aspectRatio,
      plantCenterBottomCoords = {
        x: coords.x - (width/2),
        y: coords.y - (height * 0.98)
      };

    ctx.drawImage(image, plantCenterBottomCoords.x, plantCenterBottomCoords.y, width, height);

    generateLabel(ctx, width, height, plantCenterBottomCoords, imagePath);
  }
}

function generateLabel(ctx, imgWidth, imgHeight, coords, imagePath) {
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
}

function drawPoint (ctx, coords, color) {
  ctx.beginPath();
  ctx.arc(coords.x, coords.y, 5, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill(); 
}

function generateCoordsInGarden (badgeId, fileName, gardenCenterX, gardenCenterY, gardenRadX, gardenRadY) {
  const
    badgeIdRandGen = new seedrandom(badgeId),
    fileNameRandGen = new seedrandom(fileName),
    newRadX = Math.floor(gardenRadX * badgeIdRandGen()),
    newRadY = Math.floor(gardenRadY * fileNameRandGen()),
    degAngle = fileNameRandGen() > 0.5 ? Math.floor(180 * fileNameRandGen()) : Math.floor(-180 * fileNameRandGen());

  return getPointOnEllipse(gardenCenterX, gardenCenterY, newRadX, newRadY, degAngle)
}

function getPointOnEllipse (xC, yC, xRad, yRad, degAngle) {
  return {
    x: (xC + xRad * Math.cos(degAngle * Math.PI/180)),
    y: (yC + yRad * Math.sin(degAngle * Math.PI/180))
  }
}
</script>


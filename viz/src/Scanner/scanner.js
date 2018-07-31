import $ from 'jquery'
import _ from 'lodash'
import CircleType from 'circletype';
import Webcam from 'webcamjs';
import Instascan from 'instascan'

import PaperCup from '../Papercup'

var globalQR;
var theme;
var isLink = false;


var paperCupChild = new PaperCup.PaperCupChild();


window.prevlink = {};

function hashCode(str) {
  var hash = 0;
  if (str.length == 0) return hash;
  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}


function isBook(s) {
  if (s.includes('checkout') || s.includes('object')) {
    //      console.log("BOOK");
    return true;
  } else {
    //console.log("PLOT");
    return false;
  }
}

window.isBook = isBook;

function isName(s) {
  return !isBook(s);
}

function urlToId(s) {
  // show qr url
  // $("#qrurl").html(s);




  return s.split("/")[s.split("/").length - 1];

}
window.urlToId = urlToId;

function parseQR(content) {


  var res = {};
  res.books = {};
  res.names = {};
  res.type = {};


  content.forEach(function(d, i) {
    if (isBook(d)) {
      res.books[urlToId(d)] = d;
      res.type = "book";
      //        console.log(res.type);
    }
    if (isName(d)) {
      res.names[urlToId(d)] = d;
      res.type = "name";
      //            console.log(res.type);
    }
  });
  // console.log(res);
  return res;
}

function resetQR() {
  window.prevlink = {};
};

function handleScans(content) {

  // setTimeout(resetQR, 12000);


  // new CircleType(document.getElementById('garden_title'))
  // .radius(188);

  var res = parseQR(content);
  if (!(_.isEqual(window.prevlink, res))) {
    window.prevlink = res;
    console.log(res);
    console.log("new QR!!!!");
    isLink = true;
        console.log(isLink);
    globalQR = content;

    var firstQRURL = content[0]
    paperCupChild.requestBadgeTitle(firstQRURL, function(garden_name) {
      console.log("badge url to garden name");
      console.log("badge url: " + firstQRURL);
      console.log("garden name: " + garden_name);
      $('#garden_title').html(garden_name);
      $('#garden_title').show();
    });

    firstScan();
  }else{
    isLink = false;
    console.log(isLink);
  };
};



function firstScan() {

  $("#cam1").hide();
  newGarden();
  $("#freeze1").addClass("grayscale blur");

};


function refresh() {
  console.log("refreshhhhhhhh");
  $('#prompt').fadeIn("slow");
  $("#freeze1").fadeOut("slow");
  $('#cam1').fadeIn("slow");
  $('#garden_title').html("");
  // $('#garden_title').css("color", "#9fd6a7");
  // resetQR();
}



function newGarden() {
  $("#freeze1").hide();
  //freeze cam
  Webcam.snap(function(data_uri) {
    document.getElementById('freeze1').innerHTML = '<img src="' + data_uri + '"/>';
  });

  $("#freeze1").fadeIn("slow");


  // change garden_title
  console.log("hiii");
  $('#garden_title').css("color","#214f32");
  $('body').css("background", "linear-gradient(rgba(79, 140, 96,0), #569051)");
  $('html').css("background", "linear-gradient(rgba(79, 140, 96,0), #569051)");

  $('#prompt').hide();
  setTimeout(function() {
    refresh();
  }, 9000);
}




$(document).ready(function() {


  $('#prompt').css("top", "-218px");
  $('#cam1').css("left", "calc(50% - 137px)");



  // new CircleType(document.getElementById('garden_title'))
  // .radius(245);



  Webcam.attach('#cam1');

  let scanner = new Instascan.Scanner({
    video: document.getElementById('cam1')
  });

  scanner.addListener('scan', function(content) {
    handleScans(content)
  });


  Instascan.Camera.getCameras().then(function(cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error('No cameras found.');
    }
  }).catch(function(e) {
    console.error(e);
  });


});

import $ from 'jquery'
import _ from 'lodash'
import CircleType from 'circletype';
import Webcam from 'webcamjs';
import Instascan from 'instascan'


  var globalQR;
  var theme;
  var waiting = false;





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

  function sameBookTimer() {
      window.prevlink = {};
  };

  function handleScans(content) {

    setTimeout(sameBookTimer, 12000);


    $("#prompt").hide();
    $("#garden_title").html("The Garden of Sleeping Dogs");
    new CircleType(document.getElementById('garden_title'))
    .radius(188);

    var res = parseQR(content);
    if(!(_.isEqual(window.prevlink, res))) {
        window.prevlink = res;
        console.log(res);
        console.log("new book");
        globalQR = content;
           firstScan();
      };
  };



  function firstScan() {

    $("#cam1").hide();
    // $("#qr_still").show();
    freeze_scan_1();
    $( "#freeze1" ).addClass( "grayscale blur" );

    setTimeout(function(){ waitForLink(); }, 3000);


};


function waitForLink() {
  //TODO
  waiting = true;
  $('#freeze1 img').css("left", "158px");
  $('#garden_title').css("left", "300px");

  $('#prompt').html("Exchange data seeds with another Gardener")
  $('#prompt').css("font-size", "3em");
  $('#prompt').show();

  $('#cam1').show();
  $('#cam1').css("width", "286px");
    $('#cam1').css("height", "286px");
        $('#cam1').css("margin", "0");
      $('#cam1').css("left", "");
      $('#cam1').css("right", "158px");
}


function linkGardens() {
$('#prompt').hide();
$('#garden_title_2').html("The Garden of Ravenous Contemplation")
new CircleType(document.getElementById('garden_title_2')).radius(188);
setTimeout(function(){ refresh(); }, 10000);
};


function refresh(){
  $('#prompt').css("top", "-218px");
  $('#cam1').css("left", "calc(50% - 192px)");
  $('#cam1').css("width", "385px");
    $('#cam1').css("height", "385px");
  $('#freeze1').hide();
  $('#garden_title').hide();
  $('#prompt').html("Scan here to grow your garden (refresh)");
}



function freeze_scan_1() {
    Webcam.snap( function(data_uri) {
        document.getElementById('freeze1').innerHTML = '<img src="'+data_uri+'"/>';
    } );
}


$(document).ready(function() {

  $('#prompt').css("top", "-218px");
  $('#cam1').css("left", "calc(50% - 192px)");



  // new CircleType(document.getElementById('garden_title'))
  // .radius(245);



Webcam.attach( '#cam1');

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

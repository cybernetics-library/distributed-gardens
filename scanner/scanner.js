

  window.thisbook = "";
  var globalQR;
  var memArray;
  var theme;

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
//    console.log(s);
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
$("iframe").fadeIn(300);

    var res = parseQR(content);
    if(!(_.isEqual(window.prevlink, res))) {
        window.prevlink = res;
        console.log(res);
        console.log("new book");
        globalQR = content;
           displayModal();
      };
  };

  function submitLinkToApi(content) {
    var res = parseQR(content);
    window.restest = res;
    var bookid = urlToId(res.books[Object.keys(res.books)[0]]);

    $.post("https://library.cybernetics.social/connect_book_to_memory",
    {
    "book_id": bookid,
    "station_id": "computer1",
    "timestamp": new Date().getTime() / 1000,
    "memory_from": $( "#mem-id" ).html(),
    "memory_to": document.getElementById("mem-to-id").value,
    "theme": theme
  },
    function (response) {
        console.dir(response);
      });
  };


  function displayModal() {
    $("#prompt-1").fadeOut(300).delay(2000);
    $("video").addClass( "blur grayscale" );
    $("#prompt-2").fadeIn(400).delay(2000);

    var apiurl = "https://library.cybernetics.social/memories/unique";
    $.ajax({
      type: "GET",
      url: apiurl,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(res) {
        console.log(res.memories_all);
        console.log("successfully submitted!")
        memArray = res.memories_all;
      }
    });


  }


$(document).ready(function() {


  let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
  });

  scanner.addListener('scan', function(content) {
    handleScans(content)
    updateIframe(content);
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


function sendMem() {
 submitLinkToApi(globalQR);

  setTimeout(showPrompt, 3400);


};

function showPrompt(){
  $("video").removeClass( "blur grayscale" );
  $("#prompt-1").fadeIn(300);
  $("#prompt-2").fadeOut(300).delay(2000);
}

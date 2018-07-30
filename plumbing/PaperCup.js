// wrapper around iframe comms ;P

var PaperCup = {};

PaperCup.sendToParent = (message) => {
  var msg = {
    "papercup": true,
    "message": message
  }
  window.parent.postMessage(msg, '*');
}

PaperCup.sendToChild = (id, message) => {
  var msg = {
    "papercup": true,
    "message": message
  }
  var iframeEl = document.getElementById(id)
  iframeEl.contentWindow.postMessage(msg, '*');
}

PaperCup.listenToChild = (cb) => {
  window.addEventListener('message', function(msg) {
    if(typeof(msg.data) == "object" && 'papercup' in msg.data && msg.data.papercup == true) {
      cb(msg.source.name, msg.data.message);
    }
  });
}

PaperCup.listenToParent = (cb) => {
  window.addEventListener('message', function(msg) {
    if(typeof(msg.data) == "object" && 'papercup' in msg.data && msg.data.papercup == true) {
      cb(msg.data);
    }
  });
}

export default PaperCup;


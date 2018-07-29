// stupid wrapper around awesomely stupid iframe comms ;P

var PaperCup = {};

PaperCup.sendToParent = (msg) => {
  window.parent.postMessage("hey, there was a boop", '*');
}

PaperCup.sendToChild = (id, msg) => {
    var iframeEl = document.getElementById(id)
    iframeEl.contentWindow.postMessage(msg, '*');
}

PaperCup.listenToChild = (cb) => {
  window.addEventListener('message', function(msg) {
    cb(msg.source.name, msg.data);
  });
}

PaperCup.listenToParent = (cb) => {
  window.addEventListener('message', function(msg) {
    cb(msg.data);
  });
}

export default PaperCup;


import Helpers from './Helpers'

class PaperCupChild {
  constructor() {
    this.callbacks = {}
    this.createListener();
  }

  // STEP 1: child requests badge title and sends it, storing the callback in a list of callbacks needed to process
  requestBadgeTitle(url, cb) {
    var self = this;
    var badgeId = Helpers.getBadgeIdFromUrl(url);
    var callback_name = badgeId
    self.callbacks[callback_name] = cb
    var msg = {
      "papercup": "requestBadgeTitle",
      "badgeId": badgeId,
      "callback_name" : callback_name
    }
    window.parent.postMessage(msg, '*');
  }

  // STEP 5: child listens and hears a response, then finds that callback, executes it, and then delets it
  createListener() {
    var self = this;
    window.addEventListener('message', function(msg) {
      if(typeof(msg.data) == "object" && 'papercup' in msg.data && msg.data.papercup == "respondBadgeTitle") {
        console.log("oh I'm a child I think I received response");
        console.log(msg.data)
        console.log(self.callbacks);
        if(msg.data.callback_name in self.callbacks) {
          console.log("okay callingback!!! -- " + msg.data.callback_name);
          console.log(self.callbacks[msg.data.callback_name]);
          self.callbacks[msg.data.callback_name](msg.data.badgeTitle);
          delete self.callbacks[msg.data.callback_name];
        }
      }
    });
  }

}

class PaperCupParent {

  constructor() {
  }

  // STEP 2: parent is ready to receive request
  addBadgeTitleRequestHandler(childId, cb) {

    window.addEventListener('message', function(msg) {
      if(typeof(msg.data) == "object" && 'papercup' in msg.data && msg.data.papercup == "requestBadgeTitle") {

        console.log("this is parent.. get title from " + msg.data.badgeId);
        console.log(msg);
        // STEP 3: parent gets title
        var badgeTitle = cb(msg.data.badgeId);
        console.log("this is parent.. title is " + badgeTitle)

        // STEP 4: parent sends message back to child
        var sendingmsg = {
          "papercup": "respondBadgeTitle",
          "badgeTitle": badgeTitle,
          "callback_name": msg.data.callback_name
        }
        var iframeChild = document.getElementById(childId)
        iframeChild.contentWindow.postMessage(sendingmsg, '*');

      }
    });
  }

}

module.exports = {
  PaperCupParent : PaperCupParent,
  PaperCupChild : PaperCupChild
}


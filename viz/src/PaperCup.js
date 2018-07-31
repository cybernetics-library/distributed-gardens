import Helpers from './Helpers'

class PaperCupChild {
  constructor() {
    this.callbacks = {}
    this.createListener();
  }

 // STEP 1: child requests something and sends it, storing the callback in a list of callbacks needed to process
  sendRequest(reqname, url, cb) {
    var self = this;
    var badgeId = Helpers.getBadgeIdFromUrl(url);
    var callback_name = badgeId
    self.callbacks[callback_name] = cb
    var msg = {
      "papercup": true,
      "reqname": reqname, // for example "requestBadgeTitle",
      "badgeId": badgeId,
      "callback_name" : callback_name
    }
    window.parent.postMessage(msg, '*');
  }

  // STEP 5: child listens and hears a response, then finds that callback, executes it, and then delets it
  createListener() {
    var self = this;
    window.addEventListener('message', function(msg) {
      if(typeof(msg.data) == "object" && 'papercup' in msg.data) {


        var reqname = msg.data.reqname
        var callback_name = msg.data.callback_name
        var response = msg.data.response

        console.log("child: I heard a reponse " + reqname + callback_name + response);

        if(callback_name in self.callbacks) {
          self.callbacks[callback_name](response);
          delete self.callbacks[callback_name];
        }
      }
    });
  }

}

class PaperCupParent {

  constructor() {
  }

  // STEP 2: parent is ready to receive request
  addRequestHandler(childId, handler) {

    window.addEventListener('message', function(msg) {
      if(typeof(msg.data) == "object" && 'papercup' in msg.data) {

        var reqname = msg.data.reqname
        var badgeId = msg.data.badgeId
        var callback_name = msg.data.callbackname

        var response = handler(reqname, badgeId);

        // STEP 3: parent gets response 

        // STEP 4: parent sends message back to child
        var sendingmsg = {
          "papercup": true,
          "reqname": reqname,
          "callback_name": msg.data.callback_name,
          "response": response
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


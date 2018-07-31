import Helpers from './Helpers'

class PaperCupChild {
  constructor() {
    this.callbacks = {}
    this.createListener();
  }

 // STEP 1: child requests something and sends it, storing the callback in a list of callbacks needed to process
  sendRequest(reqname, data, cb) {
    var self = this;
    var callback_name = new Date().getTime()
    self.callbacks[callback_name] = cb
    var msg = {
      "papercup": true,
      "reqname": reqname, // for example "requestBadgeTitle",
      "data": data,
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
        var data = msg.data.data
        var callback_name = msg.data.callbackname

        var response = handler(reqname, data);

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


const PeerStar = require('peer-star-app')
const Keys = require('peer-star-app').keys

class Kiosk {


  constructor() {
  
  }

  async init() { 
    var app_options = {};
    var self = this;

    self._app = PeerStar('seedinggardens', app_options)

    self._app.on('error', (err) => {
        console.error('error in app:', err)
    })

    var collab_options = {
    };
    const collaboration = self._app.collaborate("seedinggardens_test_v0", "gset", collab_options)

    Keys.generate().then((keys) => {
      console.log(keys);
      console.log(Keys.uriEncodeReadOnly(keys))
    });




    self._app.start()
      .then(() => {
        console.log('app started')

        setInterval(() => {
          console.log(self._app.peerCountEstimate())
          self._app.ipfs.id().then((d) => {
            console.log(d);
          }); 
        }, 2000)
      })
  }







}


var kiosk = new Kiosk();




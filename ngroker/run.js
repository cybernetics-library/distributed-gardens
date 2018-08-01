var SlackWebhook = require('slack-webhook')
 
var slack = new SlackWebhook('https://hooks.slack.com/services/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', {
 defaults: {
    username: 'KioskBot',
    icon_emoji: ':robot_face:'
  }
})

var token = "6g2FnmNKMqN52GMuTJUX5_3yEmpdoatP2nkHtBvT1SJ";
const ngrok = require('ngrok');
ngrok.authtoken(token).then(function() {

  ngrok.connect({proto: 'tcp', addr: 22})
   .then(function(d) {
    slack.send(d)
    try {
      var resplit = d.split(/\/\/|:/);
      console.log(d);
      slack.send("`ssh pi@" + resplit[2] + " -p " + resplit[3] + "`")
    } catch (err) {
    }
   });

});




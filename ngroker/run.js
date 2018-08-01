var SlackWebhook = require('slack-webhook')
 
var slack = new SlackWebhook('https://hooks.slack.com/services/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', {
 defaults: {
    username: 'KioskBot',
    icon_emoji: ':robot_face:'
  }
})

const ngrok = require('ngrok');
(async function() {
  const url = await ngrok.connect(22);
  slack.send(url)
})();



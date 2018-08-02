## Relay setup (on OSX High Sierra)

- install [ipfs](https://ipfs.io/docs/install/)
- `brew install nginx`
- `pm2 start bash nginx --name dwebrelay`
- replace `/usr/local/etc/nginx/nginx.conf` with relay.distributedweb.net nginx 

## Relay setup (on OSX High Sierra)

- install [ipfs](https://ipfs.io/docs/install/)
- `brew install nginx`
- `pm2 start bash nginx --name dwebrelay`
- replace `/usr/local/etc/nginx/nginx.conf` with `relay.distributedweb.net` nginx config
- install rendezvous
  - `npm install --global libp2p-websocket-star-rendezvous`
- `rendezvous --port=9090 --host=127.0.0.1`
- ipfs stuff
  - `ipfs init`
  - change `~/.ipfs/config` to read:
    - `"DisableRelay": false`
    - `"EnableRelayHop": true`
  - `ipfs daemon`

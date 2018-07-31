## Setup


#### 1. Setup this repo

Use Node verson 8.4.0 (use NVM if necessary)

NVM install process:
- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
- Restart your bash shell
- `nvm install 8.4.0`
- `nvm use 8.4.0`

Install Parcel: `npm install -g parcel-bundler`

Install requirements: `npm install -d`

#### 2. Setup rendezvous server 

Clone [peer-star-app](https://github.com/ipfs-shipyard/peer-star-app) repo into a different folder (outside of this repo).

And then: 

```bash
$ cd peer-star-app
$ cd examples/react-app
$ npm install
```
and then

```bash
$ npm run start:rv
```

Leave this running while you develop. Everything else below is back in this repo.

## Development

#### 3. Test that IPFS / Biome / Irrigation is all peachy keen

##### in browser
- `npm run examples`
- go to `http://localhost:1234/` and check console

##### in Node
- `cd viz/src/examples`
- `node irrigation_node_example.js`


#### 4. To build just the scanner/meadow/garden for development:

Run one of:
- `npm run scanner`
- `npm run meadow`
- `npm run garden`

Then sites are at `http://localhost:1234/`


#### 5. To build everything for development (to see everything working)

`npm start`

(this may take up to 60 seconds)

Then sites are at:
- `http://localhost:1234/index.html` 
- `http://localhost:1234/scanner/index.html`
- `http://localhost:1234/meadow/index.html`
- `http://localhost:1234/garden/index.html` 

(You have to specify the specific URLs, including the `index.html`)


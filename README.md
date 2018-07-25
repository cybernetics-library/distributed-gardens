# distributed-gardens

### /kiosk (this is not working rn)

Requires Node version `8.4.0` (not a later version, but this specific version)

(Use [NVM](https://github.com/creationix/nvm) to switch between Node versions.)

```
npm install -d
npm start
```

## Events



### Event message format

Events/transactions are stored as a single entry with timestamp & data

- required fields:
  - `version`: `1`
  - `timestamp`: unix timestamp (in seconds). Can be a float.
  - `from`: 
    - `name`: This is a display name of who sent the message. 
  - `messages`: a list of messages. Each message can be of any type. Right now we'll try to have one message per entry.
    - Message types:
      - `link`: Defines a link between a person and a kiosk (this is undirected, but we still store from/to because there's a sequence in which who scanned which badge first)
        - `link_from`: Who the person initially linking is 
        - `link_to`: Who the person linking to is
      - `seed`: Adds media to a Garden: text, URL, etc.
        - `seed_to`: gardenID of garden seeting to
        - `media`: list of metadata -- follows [IA metadata format](https://internetarchive.readthedocs.io/en/latest/metadata.html) **TODO/examine this**
      - `order`: Orders, requesting things above the level of data -- say, restarting kiosks or reloading the database, etc. 
        - This **does not** get incorporated into the state.
        - each kiosk/website can choose, node-side, to listen to the order or not.
      


Examples:

Linking between gardens (badges) `11111` and `22222`
```
{
  'version': 1,
  'timestamp': 1531764520.1234,
  'from': { name: 'kiosk_1_hallway' },
  'messages': [{ 'type': 'link', 'link_from': '11111', 'link_to': '22222' }]
}
```

Seeding - adding data to a garden via a kiosk
```
{
  'version': 1,
  'timestamp': 1531764520.1234,
  'from': { name: 'kiosk_2_hallway' },
  'messages': [{ 'type': 'seed', 'seed_to': '33333', media: [{ .. IA metadata format here}] }]
}
```
Order to restart kiosks
```
{
  'version': 1,
  'timestamp': 1531764520.1234,
  'from': { name: 'dans_computer' },
  'messages': [{ 'type': 'order', 'order': 'restart_kiosk'}]
}
```

Multiple messages in one event
```
{
  'version': 1,
  'timestamp': 1531764520.1234,
  'from': { name: 'dans_computer' },
  'messages': [
    { 'type': 'link', 'link_from': '11111', 'link_to': '22222' },
    { 'type': 'seed', 'seed_to': '33333', media: [{ .. IA metadata format here}, {.. IA metadata}] },
    { 'type': 'order', 'order': 'restart_kiosk'}
  ]
}
```


### Scanner

If you are running the scanner on a raspberry pi, you'll need to enable the camera in preferences and then add the following lines of code.

In terminal `sudo nano /etc/modules` and add the line `bcm2835-v4l2`. This makes a reference to a video stream from the native camera module at /dev/video0. This should allow chromium to request the video stream.

[Reference](https://www.raspberrypi.org/forums/viewtopic.php?t=194311)

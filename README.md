# distributed-gardens

### /api

Requires Node version `8.4.0` (not a later version, but this specific version)

(Use [NVM](https://github.com/creationix/nvm) to switch between Node versions.)

```
npm install -d
npm start
```

## Events



### Event message format

Each event/transaction is stored as a single event with timestamp & data

- required fields:
  - `version`: `1`
  - `timestamp`: unix timestamp (in seconds). Can be a float.
  - `from`: 
    - `name`: This is a display name of who sent the message. 
  - `type`: Either of type 'data' or 'order'
    - `data` is what almost everyone will use. 
        - this **does** get incorporated into the state
    - `order` is meant to request things above the level of data -- say, restarting kiosks or reloading the database, etc. 
          - This **does not** get incorporated into the state.
          - each kiosk/website can choose, node-side, to listen to the order or not.
  - `body`: 
    - If message is of type 'order':
      - `order`: contains a string parsed by kiosk.
    - if message is of type ‘data':  
      - `link`: Defines a link between a person and a kiosk
        - defined as a tuple (in list form) of two badge IDs 
      - `media`: Defines a media: text, URL, etc. 
    


example:
```
{
  'version': 1,
  'timestamp': 1531764520.1234,
  'from': { name: 'dans_computer' },
  'type': 'order',
  'body': { 'order': 'restart_kiosk' }
}
```

```
{
  'version': 1,
  'timestamp': 1531764520.1234,
  'from': { name: 'kiosk_2' },
  'type': 'data',
  'body': { 'link': ['11111', '22222'] }
}
```

### Scanner

If you are running the scanner on a raspberry pi, you'll need to enable the camera in preferences and then add the following lines of code.

In terminal `sudo nano /etc/modules` and add the line `bcm2835-v4l2`. This makes a reference to a video stream from the native camera module at /dev/video0. This should allow chromium to request the video stream.

[Reference](https://www.raspberrypi.org/forums/viewtopic.php?t=194311)

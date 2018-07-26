# distributed-gardens



### V1 Event message format

Events/transactions are stored as a single entry with timestamp & data

- required fields:
  - `ver`: `1`
  - `ts`: unix timestamp (in seconds). Can be a float.
  - `from`: 
    - `name`: This is a display name of who sent the message. 
  - `type`: This is a type of message. Currently either only `link` or `seed`
  - `msgs`: a list of messages. All messages must be of the same type. Right now we'll try to have one message per entry.
    - Message types:
      - `link`: Defines a link between a person and a kiosk (this is undirected, but we still store from/to because there's a sequence in which who scanned which badge first)
        - `link_from`: Who the person initially linking is 
        - `link_to`: Who the person linking to is
      - `seed`: Adds media to a Garden: text, URL, etc.
        - `seeder_name`: name of person submitting
        - `seed_to`: gardenID of garden seeding to
        - `media`: list of metadata -- follows [IA metadata format](https://internetarchive.readthedocs.io/en/latest/metadata.html) **TODO/examine this**
      - `order`: Orders, requesting things above the level of data -- say, restarting kiosks or reloading the database, etc. 
        - This **does not** get incorporated into the state.
        - each kiosk/website can choose, node-side, to listen to the order or not.
      

Examples:

Linking between gardens (badges) `11111` and `22222`
```
{
  'ver': 1,
  'ts': 1531764520.1234,
  'from': { name: 'kiosk_1_hallway' },
  'type': 'link',
  'msgs': [{ 'link_from': '11111', 'link_to': '22222' }]
}
```

Seeding - badge 12345 adding data (seeding to) '33333' via a kiosk
```
{
  'ver': 1,
  'ts': 1531764520.1234,
  'from': { name: 'kiosk_2_hallway' },
  'type': 'seed', 
  'msgs': [{ 'submitter_name': 'Alice', 'seed_to': '33333', media: [{ .. IA metadata format here}] }]
}
```


### Gardens

Eventually, a garden will have this info:
- Badge ID 
- Badge name
- Record of events, which includes / could incorporate
  - Timestamps of checkins
  - number of total checkins
  - recent time till last check in
- Files 
  - file types
  - file size
  - file names
- Peer gardens
  - number of peers
  - Names of peers
  
### Scanner

If you are running the scanner on a raspberry pi, you'll need to enable the camera in preferences and then add the following lines of code.

In terminal `sudo nano /etc/modules` and add the line `bcm2835-v4l2`. This makes a reference to a video stream from the native camera module at /dev/video0. This should allow chromium to request the video stream.

[Reference](https://www.raspberrypi.org/forums/viewtopic.php?t=194311)

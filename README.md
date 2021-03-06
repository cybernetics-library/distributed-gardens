# distributed-gardens


### Viz

[Look in the `viz/` folder for more instructions.](https://github.com/cybernetics-conference/distributed-gardens/tree/master/viz)


### Scanner

If you are running the scanner on a raspberry pi, you'll need to enable the camera in preferences and then add the following lines of code.

In terminal `sudo nano /etc/modules` and add the line `bcm2835-v4l2`. This makes a reference to a video stream from the native camera module at /dev/video0. This should allow chromium to request the video stream.

[Reference](https://www.raspberrypi.org/forums/viewtopic.php?t=194311)



### V1 Event message format

Events/transactions are stored as a single entry with timestamp & data

- required fields:
  - `ver`: `1`
  - `ts`: unix timestamp (in seconds). Can be a float.
  - `from`: 
    - `name`: This is a display name of who sent the message. 
  - `type`: This is a type of message. Currently either only `link` or `seed`
  - `msg`: a message. there is one message per entry.
    - Message types:
      - `scan`: Records a person scanning their badge at a kiosk
      - `link`: Defines a link between a person and a kiosk (this is undirected, but we still store from/to because there's a sequence in which who scanned which badge first)
        - `link_from`: Who the person initially linking is 
        - `link_to`: Who the person linking to is
      - `seed`: Adds media to a Garden: text, URL, etc.
        - `seeder_id`: badgeID of gardener submitting
        - `seed_to`: gardenID of garden seeding to
        - `media`: list of metadata -- follows [IA metadata format](https://internetarchive.readthedocs.io/en/latest/metadata.html) **TODO/examine this**
      - `setinfo`: Adds/edits info to a Gardener's profile. This is Last Writer Wins -- the most recent info key overwrites whatever was before.
        - `gid`: badgeID of gardener submitting
        - `name`
        - `email`
        - `website`
        - `twitter_id`
        - `instagram_id`
        - and more.

Examples:

Scan - badge 23456 scanning into a kiosk
```
{
  'ver': 1,
  'ts': 1531764520.1234,
  'from': { name: 'kiosk_2_hallway' },
  'type': 'scan', 
  'msg': { 'gid': 23456' } 
}
```
Linking between gardens (badges) `11111` and `22222`
```
{
  'ver': 1,
  'ts': 1531764520.1234,
  'from': { name: 'kiosk_1_hallway' },
  'type': 'link',
  'msg': { 'link_from': '11111', 'link_to': '22222' }
}
```

Seeding - badge 12345 adding data (seeding to) '33333' via a kiosk
```
{
  'ver': 1,
  'ts': 1531764520.1234,
  'from': { name: 'web_microsite' },
  'type': 'seed', 
  'msg': { 'seed_by': '12345', 'seed_to': '33333', media: [{ .. IA metadata format here}] }
}
```

Set info - badge 56789 adding info to their own garden
```
{
  'ver': 1,
  'ts': 1531764520.1234,
  'from': { name: 'kiosk_2_hallway' },
  'type': 'setinfo', 
  'msg': { 'badge_id': 56789', 'name': 'Alice Abbasi', 'email': 'aliceabbasi@example.com' } 
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
- Linked gardens
  - Number of links
  - Names of linked gardens
  

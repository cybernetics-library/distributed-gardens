# Kiosk

This a repo to coordinate running on the RPis

## Setup

### 1. On the Pi: SSH Keys & hostname setup

(This happens on each Pi)
- change password
- set country and timezone
- login to wifi
- `mkdir ~/github && cd ~/github`
- Clone this repo
  - `git clone git://github.com/cybernetics-conference/distributed-gardens.git`
- Run setup script, with an ID:
  - `pi_keys_and_hostname_setup.sh plantkiosk1` 
  - (this changes `kiosk_ids.txt`)
- git commit and push to repo 

### 2. Fanout test

`./fanoutkiosks.sh uptime` w

#!/bin/bash

cmmd="$1"
if [[ -z $cmmd ]] ; then
  echo "Missing command to run with fanout!"
  exit 1
fi

filename="kiosk_ids.txt"

kioskhostnames=""
for line in $(cat $filename); do kioskhostnames="$kioskhostnames pi@$line.local "; done
kioskhostnames=`echo "$kioskhostnames" | xargs`

echo "EXECUTING ./fanout-0.6.1/fanout \"$kioskhostnames\" \"cd ~/github/distributed-gardens/kiosk && $cmmd\""
./fanout-0.6.1/fanout "$kioskhostnames" "cd ~/github/distributed-gardens/kiosk && $cmmd"

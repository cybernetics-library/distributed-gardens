#!/bin/bash

cmmd="$1"
if [[ -z $cmmd ]] ; then
  echo "Missing command to run with fanout!"
  exit 1
fi

filename="kiosk_ids.txt"

kioskhostnames=""
for line in $(cat $filename); do kioskhostnames="pi@$kioskhostnames$line.local "; done
kioskhostnames=`echo "$kioskhostnames" | xargs`

echo "EXECUTING ./fanout-0.6.1/fanout \"$kioskhostnames\" \"$cmmd\""
#`./fanout-0.6.1/fanout $kioskhostnames uptime`
./fanout-0.6.1/fanout "$kioskhostnames" "$cmmd"

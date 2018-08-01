#!/bin/bash

filename="kiosk_ids.txt"

kioskhostnames=""
for line in $(cat $filename);
  do
    res=`ping -t 1 -c 1 $line.local`
    if [[ $res = *"received"* ]]; then
      echo "$line is UP"
    else
      echo "$line is DOWN"
    fi

done

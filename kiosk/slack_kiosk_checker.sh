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
      curl -X POST -H 'Content-type: application/json' --data "{'text':'*$line* is DOWN / not responding to pings'}" https://hooks.slack.com/services/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
    fi

done

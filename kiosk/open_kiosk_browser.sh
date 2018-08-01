#!/bin/bash

url="$1"
if [[ -z $url ]] ; then
  echo "Missing url to open!"
  exit 1
fi

DISPLAY=:0 chromium-browser --noerrdialogs --incognito --kiosk --use-fake-ui-for-media-stream --test-type $url

#!/bin/bash

#this is idempotent, so run any number of times

echo "=== killing chromium browser"

killall chromium-browser
killall python

cd ~/github/distributed-gardens/viz
npm run production&
DISPLAY=:0 chromium-browser --noerrdialogs --incognito --kiosk --use-fake-ui-for-media-stream --test-type http://localhost:8000

export DISPLAY=:0
xset s noblank
xset s reset

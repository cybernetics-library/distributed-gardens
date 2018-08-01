#!/bin/bash

#this is idempotent, so run any number of times

echo "=== killing chromium browser"

killall chromium-browser

DISPLAY=:0 chromium-browser --noerrdialogs --incognito --kiosk --use-fake-ui-for-media-stream --test-type https://garden.decentralizedweb.net/splash/

export DISPLAY=:0
xset s noblank
xset s activate
xset s reset

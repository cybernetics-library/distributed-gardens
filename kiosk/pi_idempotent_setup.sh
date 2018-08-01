#!/bin/bash


#this is idempotent, so run any number of times

echo "=== enabling pi camera"

LINE='bcm2835-v4l2'
FILE=/etc/modules
sudo grep -qF "$LINE" "$FILE" || echo "$LINE" | sudo tee -a "$FILE"

LINE='start_x=1'
FILE=/boot/config.txt
sudo grep -qF "$LINE" "$FILE" || echo "$LINE" | sudo tee -a "$FILE"

echo "=== disabling screen sleep"

LINE='setterm -blank 0 -powerdown 0'
FILE=~/.bashrc
grep -qF -- "$LINE" "$FILE" || echo "$LINE" >> "$FILE"

LINE='@xset s noblank'
FILE=/etc/xdg/lxsession/LXDE-pi/autostart
sudo grep -qF "$LINE" "$FILE" || echo "$LINE" | sudo tee -a "$FILE"

LINE='@xset s off'
FILE=/etc/xdg/lxsession/LXDE-pi/autostart
sudo grep -qF "$LINE" "$FILE" || echo "$LINE" | sudo tee -a "$FILE"

LINE='@xset -dpms'
FILE=/etc/xdg/lxsession/LXDE-pi/autostart
sudo grep -qF "$LINE" "$FILE" || echo "$LINE" | sudo tee -a "$FILE"

echo "=== setting git names"
git config --global user.email "info@cybernetics.social"
git config --global user.name "plantkiosk"

echo "=== hiding mouse pointer when not moving "
sudo apt-get install unclutter
LINE='@unclutter -idle 0.1'
FILE=~/.config/lxsession/LXDE-pi/autostart
grep -qF -- "$LINE" "$FILE" || echo "$LINE" >> "$FILE"

export DISPLAY=:0
xset s noblank
xset s activate




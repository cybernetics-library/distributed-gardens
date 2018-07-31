#!/bin/bash

kioskid="$1"
if [ -z $kioskid ] ; then
  echo "Missing ID/name of kiosk"
  exit 1
fi


echo "=== Adding $1 !"
echo "=== Enabling/Starting SSH...."
#sudo systemctl enable ssh
#sudo systemctl start ssh

echo "=== creating $1.local hostname & installing avahi-daemon...."
#sudo echo $1 > /etc/hostname
#sudo apt-get update
#sudo apt-get upgrade
#sudo apt-get install avahi-daemon
#sudo echo "127.0.0.1 localhost localhost.localdomain $1" >> /etc/hosts


echo "$1" >> kiosk_ids.txt
echo "=== Success! $1 added to kiosk_ids. Please git commit -am 'kiosk registration' and push to master!"


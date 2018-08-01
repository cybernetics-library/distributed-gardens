#!/bin/bash

if [ ! -d /usr/share/doc/realvnc-vnc-server ] ; then
  sudo apt-get --assume-yes install realvnc-vnc-server
fi
sudo systemctl enable vncserver-x11-serviced.service
sudo systemctl start vncserver-x11-serviced.service 

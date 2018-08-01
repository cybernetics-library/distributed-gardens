#!/bin/bash

if [ ! -d /usr/share/doc/realvnc-vnc-server ] ; then
    apt-get --assume-yes install realvnc-vnc-server
fi
systemctl enable vncserver-x11-serviced.service
systemctl start vncserver-x11-serviced.service 

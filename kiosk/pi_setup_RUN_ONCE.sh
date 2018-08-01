#!/bin/bash

kioskid="$1"
if [ -z $kioskid ] ; then
  echo "Missing ID/name of kiosk"
  exit 1
fi

while true; do
    read -p "This will register the kiosk, enable ssh, add hostname, etc. ONLY RUN ONCE. Do you wish to install this program?" yn
    case $yn in
        [Yy]* )  break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

echo "=== STARTING TO SETUP $kioskid !"

echo "=== Creating authorized_keys if it doesn't exist ...."
mkdir ~/.ssh
chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys
chmod 644 ~/.ssh/authorized_keys

echo "=== Appending authorized_keys ..."
cat ssh_pub_keys.txt >> ~/.ssh/authorized_keys

echo "=== Enabling/Starting SSH...."
sudo systemctl enable ssh
sudo systemctl start ssh

echo "=== setting locale to EN_US ..."
sudo sed -i "s/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/g" -i /etc/locale.gen
sudo locale-gen en_US.UTF-8
sudo update-locale en_US.UTF-8

export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

echo "=== removing Wolfram (and cutting out 300mb from our download needs)"
sudo apt-get --assume-yes purge wolfram-engine

echo "=== creating $kioskid.local hostname & installing avahi-daemon...."
sudo bash -c "echo $kioskid > /etc/hostname"
sudo apt-get --assume-yes update
sudo apt-get --assume-yes upgrade
sudo apt-get --assume-yes install avahi-daemon
sudo bash -c "sudo echo '127.0.0.1 localhost localhost.localdomain $kioskid' >> /etc/hosts"


echo "=== install nvm...."
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.9/install.sh | bash
source ~/.bashrc

echo "=== install vim...."
sudo apt-get --assume-yes install vim

echo "=== install vimrc & Vundle...."
cat vimrc.txt >  ~/.vimrc
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
vim -c 'PluginInstall' -c 'qa!'



echo "=== install pm2..."
npm install pm2@latest -g

echo "=== install pm2 startup script ..."
`pm2 startup | grep "sudo"`

echo "=== enabling pi camera"
sudo bash -c "echo bcm2835-v4l2 >> /etc/modules"

echo "=== disabling screen sleep"
echo setterm -blank 0 -powerdown 0 >> ~/.bashrc 


echo "$kioskid" >> kiosk_ids.txt
echo "=== Success! $kioskid added to kiosk_ids."
echo "Please git commit -am 'kiosk registration' and push to master so that we can register kiosk_ids!"
echo "OR add manually on another computer"
echo "THEN REBOOOOT"

reboot


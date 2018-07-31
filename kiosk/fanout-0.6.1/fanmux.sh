#!/bin/bash
#Copyright 2002 William Stearns <wstearns@pobox.com>
#Released under the GPL.
#V0.5

LastPipeNum=2

SendCommand () {
	for OnePipeNum in `seq 3 $LastPipeNum` ; do
		echo "$*" >&$OnePipeNum
	done
}

for OnePipe in "$@" ; do
	if [ -p "$OnePipe" ]; then
		LastPipeNum=$[ $LastPipeNum +1 ]
		eval exec $LastPipeNum\>"\"$OnePipe\""	#Without the eval, exec sees "3" as a command
		RealPipes="$RealPipes $OnePipe"
	fi
	if [ "$LastPipeNum" = 253 ]; then
		echo "Too many remote systems, exiting."
		exit 1
	fi
done
if [ "$LastPipeNum" = "2" ]; then
	echo "No pipes to feed to, exiting." >&2
	exit 1
fi

SendCommand "echo Ready to accept commands"
#SendCommand "set -x"
#SendCommand "echo hi"
#SendCommand "ls /tmp"
SendCommand 'echo -n "[$USER@$HOSTNAME $PWD]$ "'
while read OneCommand ; do
	if [ "$OneCommand" = "quit" ] || [ "$OneCommand" = "exit" ] || [ "$OneCommand" = "logout" ]; then
		break
	fi
	SendCommand "echo \"$OneCommand\" "
	#echo "Local: $OneCommand"
	SendCommand "$OneCommand"
	SendCommand 'echo -n "[$USER@$HOSTNAME $PWD]$ "'
done


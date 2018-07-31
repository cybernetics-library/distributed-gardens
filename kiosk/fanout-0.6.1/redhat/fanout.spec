%define version 0.6.1

Summary:	fanout lets you run commands on multiple remote machines simultaneously
Name:		fanout
Version:	%{version}
Release:	0
Copyright:	GPL
Group:		Applications/Internet
Source:		http://www.stearns.org/fanout/fanout-%{version}.tar.gz
URL:		http://www.stearns.org/fanout/
Vendor:		William Stearns
Packager:	William Stearns <wstearns@pobox.com>
BuildRoot:	/var/tmp/fanout-root
Buildarch:	noarch
Prereq:		/bin/bash /bin/cat /bin/date /bin/mknod /bin/mktemp /bin/ping /bin/rm /bin/sed /bin/sort /bin/stty /usr/bin/X11/xterm /usr/bin/perl /usr/bin/tr /usr/bin/uniq
#Prereq:		/usr/bin/nc /usr/bin/head /bin/mkdir /bin/chmod /bin/cat /bin/grep



%description
Fanout allows you to run non-interactive commands on remote
machines simultaneously, collecting the output in an organized fashion.
	

%prep
%setup


#%build


%install
if [ "$RPM_BUILD_ROOT" = "/var/tmp/fanout-root" ]; then
	rm -rf $RPM_BUILD_ROOT
	mkdir -p $RPM_BUILD_ROOT/usr/bin
	mkdir -p $RPM_BUILD_ROOT/usr/share/doc/fanout-%{version}
	make DESTDIR=$RPM_BUILD_ROOT install
else
	echo Invalid Buildroot
	exit 1
fi
	

%clean
if [ "$RPM_BUILD_ROOT" = "/var/tmp/fanout-root" ]; then
	rm -rf $RPM_BUILD_ROOT
else
	echo Invalid Buildroot
	exit 1
fi


%files
%doc AUTHORS COPYING CREDITS ChangeLog INSTALL Makefile NEWS README TODO
%attr(755,root,root)			/usr/bin/fanmux
%attr(755,root,root)			/usr/bin/fanout
%attr(755,root,root)			/usr/bin/fanterm



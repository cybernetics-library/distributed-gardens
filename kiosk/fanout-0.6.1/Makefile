#
# Makefile for the fanout ssh utility.
#
#Copyleft:
#    fanout lets you run commands on multiple remote machines simultaneously
#    Copyright (C) 1998-2001 William Stearns <wstearns@pobox.com>
#
#    This program is free software; you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation; either version 2 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program; if not, write to the Free Software
#    Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
#
#    The author can also be reached at:
#        William Stearns
#email:  wstearns@pobox.com              (preferred)
#web:    http://www.pobox.com/~wstearns
#snail:  544 Winchester Place
#        Colchester VT, 05446, USA
#

# Modified for Debian GNU/Linux.
DESTDIR =

##Make sure fanout has FANOUTVER updated when this changes
FANOUTVER = 0.6.1

#No quotes around multi file specs.
BINDIR=$(DESTDIR)/usr/bin/
BINFILES=fanout fanterm fanmux
DOCDIR=$(DESTDIR)/usr/share/doc/fanout-${FANOUTVER}/
DOCFILES=AUTHORS COPYING CREDITS ChangeLog INSTALL Makefile NEWS README TODO

install:
	@echo -n "Installing files... "
	@echo -n "bin directory... "
	@install -o root -g root -m 0755 -d ${BINDIR}
	@echo -n "${BINFILES}... "
	@install -o root -g root -m 0644 ${BINFILES} ${BINDIR}
	@echo -n "doc directory... "
	@install -o root -g root -m 0755 -d ${DOCDIR}
	@echo -n "${DOCFILES}... "
	@install -o root -g root -m 0644 ${DOCFILES} ${DOCDIR}
	@echo done!

#regress:
#	@if ./samlib regression-test ; then \
#	echo Regression test succeeded. ; \
#	else \
#	echo Regression test failed, exiting. ; \
#	exit 1 ; \
#	fi

distribs: #regress
	@echo This should only need to be used by the author in 
	@echo packing up the fanout package.
	cd .. \
	&& tar cf - fanout-${FANOUTVER}/ | \
	gzip -9 > fanout-${FANOUTVER}.tar.gz \
	&& rm -f fanout-current \
	&& ln -sf fanout-${FANOUTVER} fanout-current \
	&& tar cf - fanout-current/* | \
	gzip -9 > fanout-current.tar.gz \
	&& cp fanout-${FANOUTVER}.tar.gz /usr/src/redhat/SOURCES/ \
	&& cd fanout-${FANOUTVER} \
	&& cp -f redhat/fanout.spec /usr/src/redhat/SPECS/ \
	&& rpm --sign -ba /usr/src/redhat/SPECS/fanout.spec \
	&& mv -f /usr/src/fanout-*.tar.gz /usr/src/mysource/ \
	&& mv -f /usr/src/redhat/RPMS/noarch/fanout-*.noarch.rpm /usr/src/mysource/ \
	&& mv -f /usr/src/redhat/SRPMS/fanout-*.src.rpm /usr/src/mysource/

mini-install:
	@if [ ! -f ${BINDIR} ]; then \
	mkdir -p ${BINDIR} ; \
	fi
	cp -pf fanout fanterm fanmux /usr/bin








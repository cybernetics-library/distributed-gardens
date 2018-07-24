from math import gcd
import sys
import qrcode
import os

BADGE_NUM = 400
BADGE_URL_PREFIX = "HTTPS://DECENTRALIZEDWEB.NET/QR/2018.HTML?BADGE="
BADGE_DIR = "qrcodes/badges/"
PREFIX_DIR_FOR_INDESIGN = "Macintosh HD:Users:provolot:github:seeding-gardens:badge:qrcodes:badges:"

def gen_qr_code(url, fname):
    """
    qr = qrcode.QRCode(
	version=None,
	box_size=10,
	border=0,
    )
    qr.add_data(url)
    qr.make(fit=True)
    """
    img = qrcode.make(url, border=0)
    img.save(fname)


with open('nouns.txt', 'r') as fnouns, open('adjectives.txt', 'r') as fadj, open('badge_data.csv', 'w') as fbadgelines:

    nouns = fnouns.read().splitlines()
    adjs = fadj.read().splitlines()

    if(gcd(len(nouns), len(adjs)) != 1):
        print("ERROR: Length of adjectives and nouns must be coprime! Currently GCD is " + str(gcd(len(nouns), len(adjs))) + ". Fix and rerun.")
        sys.exit(0)


    if(BADGE_NUM > len(nouns) * len(adjs)):
        print("ERROR: Can only generate {} badges! Not enough nouns / adjectives to generate {} badges!".format(len(nouns) * len(adjs), BADGE_NUM))
        sys.exit(0)

    adj_index = 0
    noun_index = 0

    badgeline = "id,garden_name,full_garden_name,qr_url,@qrcode_filename"
    fbadgelines.write(badgeline + "\n")
    for i in range(BADGE_NUM):
        thisadj = adjs[adj_index].capitalize()
        thisnoun = nouns[noun_index].capitalize()

        adj_index = (adj_index + 1) % len(adjs)
        noun_index = (noun_index + 1) % len(nouns)

        badgeid = ('{:>05d}'.format(i))
        badgeurl = BADGE_URL_PREFIX + badgeid
        badgefile = BADGE_DIR + badgeid + ".png"
        gen_qr_code(badgeurl, badgefile)
        indesign_badge_dir = PREFIX_DIR_FOR_INDESIGN + badgeid + ".png"

        badgeline = "{},{} {},The Garden of {} {},{},{}".format(badgeid, thisadj, thisnoun, thisadj, thisnoun, badgeurl, indesign_badge_dir)
        print(badgeline)
        fbadgelines.write(badgeline + "\n")

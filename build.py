#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build.py — lokale bouwstap, exact hetzelfde resultaat als build.js.

Node.js staat op deze machine niet geinstalleerd; Python wel. Netlify blijft
build.js draaien bij elke deploy. Dit script bestaat zodat je lokaal kunt
zien wat er straks live komt te staan:

    python build.py

Doet hetzelfde als build.js:
  /merken/     -> index.html      (merkenmuur, object-fit:contain)
  /kettingen/  -> kettingen.html  (galerij + lightbox)
  /oorbellen/  -> oorbellen.html
  /tassen/     -> tassen.html
  <span class="build-year"> -> huidig jaar
"""
import io, os, re, sys
from datetime import date

DIR  = os.path.dirname(os.path.abspath(__file__))
EXT  = {'.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'}
YEAR = str(date.today().year)


def read_file(name):
    """Leest het bestand en onthoudt de regeleindes, zodat de diff schoon blijft."""
    with io.open(os.path.join(DIR, name), encoding='utf-8-sig', newline='') as fh:
        raw = fh.read()
    eol = '\r\n' if raw.count('\r\n') > raw.count('\n') - raw.count('\r\n') else '\n'
    return raw.replace('\r\n', '\n'), eol


def write_file(name, content, eol):
    with io.open(os.path.join(DIR, name), 'w', encoding='utf-8', newline='') as fh:
        fh.write(content.replace('\n', eol))


def get_images(folder):
    # .sort() in JS sorteert op tekencode: hoofdletters eerst. Python doet hetzelfde.
    return sorted(f for f in os.listdir(os.path.join(DIR, folder))
                  if os.path.splitext(f)[1].lower() in EXT)


def to_label(stem):
    """barong-barong -> Barong Barong, BACS -> BACS (zelfde als toLabel in build.js)."""
    return re.sub(r'\b\w', lambda m: m.group().upper(), re.sub(r'[-_]+', ' ', stem))


def inject(html, marker, content):
    pattern = r'<!--BUILD:%s-->[\s\S]*?<!--/BUILD:%s-->' % (marker, marker)
    if not re.search(pattern, html):
        sys.exit('Marker BUILD:%s niet gevonden in de HTML' % marker)
    return re.sub(pattern,
                  lambda _: '<!--BUILD:%s-->\n%s\n<!--/BUILD:%s-->' % (marker, content, marker),
                  html)


def set_year(html):
    return re.sub(r'(<span class="build-year">)\d*(</span>)', r'\g<1>' + YEAR + r'\2', html)


# 1. Merkenmuur
merken = get_images('merken')
merken_html = '\n'.join(
    '  <div class="merk-tile">\n'
    '    <img src="merken/%s" alt="%s" loading="lazy">\n'
    '  </div>' % (f, to_label(os.path.splitext(f)[0]))
    for f in merken)

html, eol = read_file('index.html')
html = set_year(inject(html, 'MERKEN', merken_html))
write_file('index.html', html, eol)
print('index.html  -- %d merken' % len(merken))

# 2. Galerijen
for folder, page, label in (('kettingen', 'kettingen.html', 'Ketting'),
                            ('oorbellen', 'oorbellen.html', 'Oorbel'),
                            ('tassen',    'tassen.html',    'Tas')):
    fotos = get_images(folder)
    tiles = '\n'.join(
        '  <div class="foto-tile" tabindex="0" role="button" aria-label="Open foto %d">\n'
        '    <img src="%s/%s" alt="%s %d" loading="lazy">\n'
        '  </div>' % (i, folder, f, label, i)
        for i, f in enumerate(fotos, 1))

    html, eol = read_file(page)
    html = set_year(inject(html, 'GALERIJ', tiles))
    write_file(page, html, eol)
    print("%-14s -- %d foto's" % (page, len(fotos)))

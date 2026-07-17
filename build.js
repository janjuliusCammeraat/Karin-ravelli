#!/usr/bin/env node
/**
 * build.js - Ravelli statische site builder
 *
 * Scant de foto-mappen en schrijft de <img>-tags rechtstreeks in de HTML-bestanden.
 * Gebruik: node build.js
 *
 * Foto/logo toevoegen:  bestand in de juiste map zetten > node build.js > deployen
 * Foto/logo weghalen:   bestand uit de map verwijderen  > node build.js > deployen
 *
 * Mappen -> HTML-bestanden:
 *   /merken/     -> index.html      (#merken, object-fit:contain op witte tegel)
 *   /kettingen/  -> kettingen.html  (galerij met lightbox)
 *   /oorbellen/  -> oorbellen.html  (galerij met lightbox)
 *   /tassen/     -> tassen.html     (galerij met lightbox)
 */

const fs   = require('fs');
const path = require('path');

const DIR  = __dirname;
const YEAR = new Date().getFullYear().toString();
const EXT  = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

function readFile(name)           { return fs.readFileSync(path.join(DIR, name), 'utf8'); }
function writeFile(name, content) { fs.writeFileSync(path.join(DIR, name), content, 'utf8'); }

function getImages(folder) {
  return fs.readdirSync(path.join(DIR, folder))
    .filter(f => EXT.has(path.extname(f).toLowerCase()))
    .sort();
}

function inject(html, marker, content) {
  const re = new RegExp('<!--BUILD:' + marker + '-->[\\s\\S]*?<!--/BUILD:' + marker + '-->', 'g');
  if (!re.test(html)) throw new Error('Marker BUILD:' + marker + ' niet gevonden in HTML');
  return html.replace(
    new RegExp('<!--BUILD:' + marker + '-->[\\s\\S]*?<!--/BUILD:' + marker + '-->', 'g'),
    '<!--BUILD:' + marker + '-->\n' + content + '\n<!--/BUILD:' + marker + '-->'
  );
}

function setYear(html) {
  return html.replace(/(<span class="build-year">)\d*(<\/span>)/g, '$1' + YEAR + '$2');
}

function toLabel(stem) {
  return stem.replace(/[-_]+/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
}

// 1. Merkenmuur
const merken = getImages('merken');
const merkenHtml = merken.map(function(f) {
  const name = toLabel(path.basename(f, path.extname(f)));
  return '  <div class="merk-tile">\n    <img src="merken/' + f + '" alt="' + name + '" loading="lazy">\n  </div>';
}).join('\n');

let indexHtml = readFile('index.html');
indexHtml = inject(indexHtml, 'MERKEN', merkenHtml);
indexHtml = setYear(indexHtml);
writeFile('index.html', indexHtml);
console.log('index.html  -- ' + merken.length + ' merken');

// 2. Galerijen
const galleries = [
  { folder: 'kettingen', file: 'kettingen.html', label: 'Ketting' },
  { folder: 'oorbellen', file: 'oorbellen.html', label: 'Oorbel'  },
  { folder: 'tassen',    file: 'tassen.html',    label: 'Tas'     },
];

galleries.forEach(function(g) {
  const photos = getImages(g.folder);
  const tilesHtml = photos.map(function(f, i) {
    return (
      '  <div class="foto-tile" tabindex="0" role="button" aria-label="Open foto ' + (i + 1) + '">\n' +
      '    <img src="' + g.folder + '/' + f + '" alt="' + g.label + ' ' + (i + 1) + '" loading="lazy">\n' +
      '  </div>'
    );
  }).join('\n');

  let html = readFile(g.file);
  html = inject(html, 'GALERIJ', tilesHtml);
  html = setYear(html);
  writeFile(g.file, html);
  console.log(g.file.padEnd(16) + ' -- ' + photos.length + " foto's");
});

console.log('\nBuild klaar. Bekijk lokaal via:  python -m http.server 8000');
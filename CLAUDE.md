# CLAUDE.md — Ravelli website (karin-ravelli.nl)

## Wat is dit project?

Statische one-page boutique-site voor **Ravelli**, Langstraat 50, 2242 KN Wassenaar.
Eigenaar: Karin Ravelli (niet technisch). Beheerder: Jan Julius Cammeraat.
Vervangt een betaalde WordPress.com-site (karinravelli.online).
Hosting: **Cloudflare Pages** (gratis), domein: **karin-ravelli.nl** (nog niet live).

---

## Huidige projectstatus (sessie 2026-06-02)

De site is volledig gebouwd en lokaal klaar. **Nog niet gedeployed.**
Volgende stap: git init → GitHub → Cloudflare Pages (zie README.md).

---

## Bestandsstructuur

```
/
├── index.html            ← homepage (hero, Over Karin, collectie, merken, contact)
├── kettingen.html        ← galerijpagina met lightbox (6 foto's)
├── oorbellen.html        ← galerijpagina met lightbox (12 foto's)
├── tassen.html           ← galerijpagina met lightbox (3 foto's)
├── build.js              ← Node.js builder — schrijft <img>-tags in HTML
├── CLAUDE.md             ← dit bestand
├── README.md             ← Nederlandstalige handleiding voor Karin/beheerder
├── CLAUDE-CODE-PROMPT.md ← de oorspronkelijke opdrachtprompt (bewaar dit)
│
├── assets/img/           ← vaste foto's (nooit automatisch overschreven)
│   ├── hero.jpg          ← hero sectie (68 KB)
│   ├── karin-portret.jpg ← Over Karin sectie, 900×850px (139 KB)
│   ├── kettingen.jpg     ← teaser op homepage (79 KB)
│   ├── oorbellen.jpg     ← teaser op homepage (126 KB)
│   ├── tassen.jpg        ← teaser op homepage (122 KB)
│   └── over-ons.jpg      ← oud (niet meer gebruikt, mag weg)
│
├── merken/               ← 17 merklogo's (PNG/JPG/WebP) — DOOR KARIN BEWERKT
├── kettingen/            ← 6 foto's (01.jpg t/m 06.jpg) — DOOR KARIN BEWERKT
├── oorbellen/            ← 12 foto's (01.jpg t/m 12.jpg) — DOOR KARIN BEWERKT
├── tassen/               ← 3 foto's (01.jpg t/m 03.jpg) — DOOR KARIN BEWERKT
│
└── backup/               ← lokale backups (niet deployen, staat in .gitignore)
```

---

## Hoe build.js werkt

`node build.js` doet vier dingen:

1. Scant `/merken/` → injecteert `<div class="merk-tile"><img ...></div>` in `index.html`
   tussen `<!--BUILD:MERKEN-->` en `<!--/BUILD:MERKEN-->`

2. Scant `/kettingen/` → injecteert `<div class="foto-tile"><img ...></div>` in `kettingen.html`
   tussen `<!--BUILD:GALERIJ-->` en `<!--/BUILD:GALERIJ-->`

3. Idem voor `/oorbellen/` → `oorbellen.html` en `/tassen/` → `tassen.html`

4. Vervangt `<span class="build-year">XXXX</span>` met het huidige jaar in alle bestanden.

**Galerijen: `object-fit: cover`** (bijgesneden, gelijke verhouding 4:3)
**Merkenmuur: `object-fit: contain` op witte tegel** (logo nooit bijsnijden!)

Op Cloudflare Pages draait `node build.js` automatisch als build-command.
Lokaal (Node.js niet geïnstalleerd): gebruik het PowerShell-equivalent onderaan dit bestand.

---

## Lokale preview

```bash
python -m http.server 8000
# Ga naar http://localhost:8000
```

---

## Design systeem

```css
--ivory:    #FAF6EF  /* achtergrond */
--sand:     #F1E8D9  /* secties Over Karin, Contact */
--espresso: #2A2420  /* dark: header, merken-sectie, footer */
--muted:    #6E645A  /* bodytekst, subteksten */
--brass:    #A8854E  /* accenten */
--brass-dark:#8A6C3B /* hover states */
--line:     #DDD1BD  /* borders */
```

Fonts: **Fraunces** (display/koppen) + **Jost** (body), geladen via Google Fonts.
Reveal-animaties: IntersectionObserver met `.reveal` / `.reveal.in` classes.
Lightbox: vanilla JS, progressive enhancement (werkt ook zonder JS: foto's zijn statisch).

---

## Contactgegevens (correct, overal hetzelfde)

- E-mail:     karin@karinravelli.nl   ← LET OP: karinravelli.nl, NIET karin-ravelli.nl
- Tel:        +31 (0)70 737 13 16
- Mobiel:     +31 (0)6 15 21 15 05
- WhatsApp:   https://wa.me/31615211505
- Instagram:  https://www.instagram.com/karinravelli/
- Adres:      Langstraat 50, 2242 KN Wassenaar
- Openingstijden: ma 13:00–17:30 · di–vr 10:00–17:30 · za 10:00–17:00 · zo gesloten

---

## Hoe Karin foto's beheert (workflow)

1. Foto in de juiste map zetten (`/merken/`, `/kettingen/`, `/oorbellen/` of `/tassen/`)
2. `git add . && git commit -m "foto toegevoegd" && git push`
3. Cloudflare Pages draait `node build.js` automatisch en deployt

Karin hoeft Node.js NIET lokaal te installeren.

---

## Wat gedaan in sessie 2026-06-02

### Sessie 1 — Basissite
- index.html gebouwd (hero, Over Karin, collectie-teasers, merkenmuur, contact)
- Alle foto's gedownload van karinravelli.online naar lokale mappen
- kettingen.png (833 KB) gecomprimeerd → kettingen.jpg (79 KB)
- karin-portret.jpg herschaald naar 900×850px (139 KB)
- 17 merklogo's gedownload naar /merken/
- build.js geschreven (Node.js)
- README.md geschreven (NL)

### Sessie 1 — Uitbreiding (CLAUDE-CODE-PROMPT.md)
- kettingen.html, oorbellen.html, tassen.html aangemaakt (galeriij + lightbox)
- 6 kettingen-, 12 oorbellen-, 3 tassen-foto's gedownload
- Over Karin-sectie: echte tekst van Karin, portretfoto, verplaatst naar positie 2
- WhatsApp-knop toegevoegd aan contactsectie
- OG-tags en favicon (SVG, R in brass)
- Homepage-volgorde: Hero → Over Karin → Collectie → Merken → Contact
- E-mail gecorrigeerd: karin@karinravelli.nl (was karin@karin-ravelli.nl)

### Sessie 1 — Statische HTML (laatste opdracht)
- Galerijen en merkenmuur omgezet van client-side JS naar statische HTML
- build.js injecteert nu <img>-tags direct in HTML via <!--BUILD:X--> markers
- Lightbox is nu "progressive enhancement": koppelt handlers aan bestaande statische tiles
- Footer-jaar is statisch (<span class="build-year">2026</span>)
- Losse *-data.js bestanden zijn overbodig (niet meer ingeladen)

---

## Openstaande punten / te doen

- [ ] `.gitignore` aanmaken (backup/ en .claude/ uitsluiten)
- [ ] Git-repo initialiseren en pushen naar GitHub
- [ ] Koppelen aan Cloudflare Pages (build command: `node build.js`, output: `/`)
- [ ] Custom domein karin-ravelli.nl instellen
- [ ] DNS-records bij registrar instellen (CNAME @ → karin-ravelli.pages.dev)
- [ ] over-ons.jpg verwijderen uit /assets/img/ (niet meer gebruikt)
- [ ] Betere foto's plaatsen als Karin die aanlevert (WhatsApp-kwaliteit nu)
- [ ] E-mailadres karin@karinravelli.nl: controleren of dit ook het nieuwe domein wordt
- [ ] Node.js installeren als lokaal builden gewenst is

---

## PowerShell-build (als Node.js niet beschikbaar is)

Kopieer dit blok in een PowerShell-terminal in de projectmap:

```powershell
$base = "C:\Users\jan-j\Documents\Karin"
$EXT  = @('.jpg','.jpeg','.png','.webp','.avif','.gif')
$YEAR = (Get-Date).Year.ToString()

function Get-Images($folder) {
  Get-ChildItem (Join-Path $base $folder) |
    Where-Object { $EXT -contains $_.Extension.ToLower() } |
    Sort-Object Name | Select-Object -ExpandProperty Name
}
function To-Label($stem) {
  $words = $stem -split '[-_]+'
  ($words | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1).ToLower() }) -join ' '
}
function Inject-Marker($html, $marker, $content) {
  $pattern = "(?s)<!--BUILD:$marker-->.*?<!--/BUILD:$marker-->"
  $replacement = "<!--BUILD:$marker-->`n$content`n<!--/BUILD:$marker-->"
  [regex]::Replace($html, $pattern, $replacement)
}
function Set-Year($html) { $html -replace '(<span class="build-year">)\d*(</span>)', "`${1}${YEAR}`$2" }

$merken = Get-Images 'merken'
$merkenTiles = ($merken | ForEach-Object {
  $name = To-Label ([System.IO.Path]::GetFileNameWithoutExtension($_))
  "  <div class=`"merk-tile`">`n    <img src=`"merken/$_`" alt=`"$name`" loading=`"lazy`">`n  </div>"
}) -join "`n"
$html = [System.IO.File]::ReadAllText("$base\index.html", [System.Text.Encoding]::UTF8)
$html = Inject-Marker $html 'MERKEN' $merkenTiles
$html = Set-Year $html
[System.IO.File]::WriteAllText("$base\index.html", $html, [System.Text.Encoding]::UTF8)
Write-Output "index.html -- $($merken.Count) merken"

$galleries = @(
  @{folder='kettingen'; file='kettingen.html'; label='Ketting'},
  @{folder='oorbellen'; file='oorbellen.html'; label='Oorbel'},
  @{folder='tassen';    file='tassen.html';    label='Tas'}
)
foreach ($g in $galleries) {
  $photos = Get-Images $g.folder; $i = 1
  $tiles = ($photos | ForEach-Object {
    $n = $i++
    "  <div class=`"foto-tile`" tabindex=`"0`" role=`"button`" aria-label=`"Open foto $n`">`n    <img src=`"$($g.folder)/$_`" alt=`"$($g.label) $n`" loading=`"lazy`">`n  </div>"
  }) -join "`n"
  $html = [System.IO.File]::ReadAllText("$base\$($g.file)", [System.Text.Encoding]::UTF8)
  $html = Inject-Marker $html 'GALERIJ' $tiles
  $html = Set-Year $html
  [System.IO.File]::WriteAllText("$base\$($g.file)", $html, [System.Text.Encoding]::UTF8)
  Write-Output "$($g.file) -- $($photos.Count) foto's"
}
```
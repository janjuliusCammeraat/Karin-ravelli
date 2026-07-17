# Ravelli — karin-ravelli.nl

Statische boutique-site voor Ravelli, Wassenaar. Geen CMS of server nodig.

---

## Projectstructuur

```
/
├── index.html            ← homepage (één pagina: hero, Over Karin, collectie, merken, contact)
├── kettingen.html        ← galerijpagina kettingen (met lightbox)
├── oorbellen.html        ← galerijpagina oorbellen (met lightbox)
├── tassen.html           ← galerijtpagina tassen (met lightbox)
├── build.js              ← script om alle data-bestanden te genereren (Node.js vereist)
├── merken-data.js        ← gegenereerd door build.js
├── kettingen-data.js     ← gegenereerd door build.js
├── oorbellen-data.js     ← gegenereerd door build.js
├── tassen-data.js        ← gegenereerd door build.js
├── assets/
│   └── img/              ← vaste foto's (hero, portret Karin, categorieteasers)
├── merken/               ← merklogo's (17 stuks) — hier voeg je merken toe of verwijder je ze
├── kettingen/            ← kettingenfoto's — hier voeg je foto's toe of verwijder je ze
├── oorbellen/            ← oorbellenfoto's
└── tassen/               ← tassenfoto's
```

---

## Een foto toevoegen of weghalen

### Merklogo toevoegen
1. Zet de logoafbeelding in de map `merken/`
   - Gebruik een beschrijvende naam: `my-jewellery.png` → bijschrift wordt "My Jewellery"
   - Toegestane formaten: jpg, jpeg, png, webp, gif
2. Ga naar **Deployen** hieronder — Cloudflare Pages draait `node build.js` automatisch.

### Merklogo weghalen
1. Verwijder het bestand uit `merken/`
2. Ga naar **Deployen** hieronder.

### Galerij­foto toevoegen (kettingen / oorbellen / tassen)
1. Zet de foto in de juiste map: `kettingen/`, `oorbellen/` of `tassen/`
   - Bestandsnaam maakt niet uit; foto's worden op alfabetische volgorde getoond.
2. Ga naar **Deployen** hieronder.

### Galerij­foto weghalen
1. Verwijder het bestand uit de juiste map.
2. Ga naar **Deployen** hieronder.

> **Let op:** Cloudflare Pages draait `node build.js` automatisch bij elke deploy.
> Je hoeft zelf nooit `node build.js` te draaien.

---

## Lokale preview

Vereiste: Python 3 (staat al op je computer).

```bash
# Open een terminal in de projectmap en typ:
python -m http.server 8000
```

Ga daarna naar **http://localhost:8000** in je browser.
Stoppen: `Ctrl+C` in de terminal.

Als je ook `node build.js` lokaal wilt draaien, installeer dan [Node.js](https://nodejs.org)
(eenmalig). Na installatie:

```bash
node build.js
```

---

## Deployen naar Cloudflare Pages

### Stap 1 — Git-repository aanmaken

Open een terminal in de projectmap (`C:\Users\...\Karin`) en typ:

```bash
git init
git add .
git commit -m "eerste versie"
```

### Stap 2 — Naar GitHub pushen

Maak op [github.com](https://github.com) een nieuw leeg repository aan (bijv. `karin-ravelli`).
Vervang `JOUWGEBRUIKERSNAAM` door je GitHub-naam:

```bash
git remote add origin https://github.com/JOUWGEBRUIKERSNAAM/karin-ravelli.git
git branch -M main
git push -u origin main
```

### Stap 3 — Koppelen aan Cloudflare Pages

1. Ga naar [dash.cloudflare.com](https://dash.cloudflare.com) → **Pages** → **Create a project**
2. Klik op **Connect to Git** en kies je GitHub-account
3. Selecteer het repository `karin-ravelli`
4. Vul de build-instellingen in:

   | Instelling              | Waarde          |
   |-------------------------|-----------------|
   | Framework preset        | None            |
   | Build command           | `node build.js` |
   | Build output directory  | `/`             |

5. Klik op **Save and Deploy**

Je krijgt een gratis preview-URL zoals `karin-ravelli.pages.dev`. Test de site daar eerst.

### Stap 4 — Custom domein karin-ravelli.nl toevoegen

1. Ga in Cloudflare Pages naar je project → **Custom domains** → **Set up a custom domain**
2. Vul in: `karin-ravelli.nl`
3. Cloudflare toont de DNS-records die je moet instellen (zie hieronder)

### Stap 5 — DNS-records bij je registrar

Stel de volgende records in bij de partij waar `karin-ravelli.nl` is geregistreerd:

| Type  | Naam              | Waarde                         |
|-------|-------------------|--------------------------------|
| CNAME | `@` (rootdomein)  | `karin-ravelli.pages.dev`      |
| CNAME | `www`             | `karin-ravelli.pages.dev`      |

> Sommige registrars ondersteunen geen CNAME op `@`. Gebruik dan een **ALIAS** of **ANAME**
> record als dat beschikbaar is. De allermakkelijkste optie: wijs de nameservers over aan
> Cloudflare — dan regelt Cloudflare de DNS zelf.

Na maximaal 24 uur (meestal veel sneller) is `https://karin-ravelli.nl` live met gratis HTTPS.

---

## Foto deployen — korte samenvatting

```bash
# 1. Foto in de juiste map zetten
# 2. Wijzigingen naar GitHub pushen:
git add .
git commit -m "foto toegevoegd: omschrijving"
git push
# 3. Klaar — Cloudflare Pages deployt automatisch (duurt ~1 minuut)
```

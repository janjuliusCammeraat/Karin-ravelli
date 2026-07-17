# Claude Code prompt — nieuwe website Ravelli

> Plaats het bestaande `index.html` (het basisontwerp) in een lege map, open Claude Code in
> die map en plak onderstaande prompt.

---

Ik bouw een statische one-page etalagesite (plus een paar galerijpagina's) voor "Ravelli",
een boutique in Wassenaar (sieraden, oorbellen, tassen, accessoires). Het is GEEN webshop —
puur een mooie etalage die mensen naar de fysieke winkel trekt. De eigenaresse (Karin) is
niet technisch; ík beheer de site. Het enige terugkerende onderhoud is af en toe een foto
toevoegen of weghalen. De site komt gratis op Cloudflare Pages, op een nieuw domein
**karin-ravelli.nl**, ter vervanging van een betaalde WordPress.com-site.

In deze map staat `index.html` met het basisontwerp: verfijnde crème/brass-boutiquestijl,
fonts Fraunces + Jost, met reveal-animaties. **Behoud die look-and-feel.**

## 1. Projectstructuur
```
index.html
kettingen.html
oorbellen.html
tassen.html
/assets/img/      (vaste foto's: hero + portret Karin)
/merken/          (17 merklogo's — map die ik later bewerk)
/kettingen/       (categoriefoto's)
/oorbellen/
/tassen/
build.js          (bouwscript, zie punt 5)
README.md         (zie punt 8)
```

## 2. Foto's downloaden (zodat de site werkt zonder WordPress)
De huidige site host de foto's nog. Haal ze op uit de oude pagina's en zet ze lokaal.
Pak per pagina alléén de inhoudsfoto's (`/wp-content/uploads/2024/...`); negeer het
WordPress-logo en `pixel.wp.com`-trackers.

- Hero + portret → `/assets/img/`
  - Hero: `https://karinravelli.online/wp-content/uploads/2024/07/home3.jpeg`
    (alternatieven: `home2.jpg`, `home.jpg`)
  - Portret Karin (beste foto, bijna vierkant 1600×1512):
    `https://karinravelli.online/wp-content/uploads/2024/07/afbeelding-van-whatsapp-op-2024-02-28-om-12.02.51_38b1fbd2.jpg`
- `https://karinravelli.online/kettingen/`     → alle foto's naar `/kettingen/`  (zijn er 6)
- `https://karinravelli.online/oorbellen-2/`   → alle foto's naar `/oorbellen/`  (zijn er 12)
- `https://karinravelli.online/tassen-2/`      → alle foto's naar `/tassen/`     (zijn er 3)
- `https://karinravelli.online/merken-2/`      → alle logo's naar `/merken/`     (zijn er 17)

Dit zijn voorlopige foto's (WhatsApp-kwaliteit); ik vervang ze later door betere. Verklein
foto's die onnodig groot zijn naar web-formaat, maar bewaar de originelen niet nodig.

## 3. Echte tekst — Over Karin (het hart van de site)
Gebruik Karins eigen verhaal, licht ingekort voor ritme en warmte, maar behoud haar woorden
en feiten — schrijf het NIET om naar marketingtaal. Brontekst:

> Karin Ravelli is in 2003 als ondernemer gestart met haar eigen label. Daarvoor ontwierp zij
> diverse mode-accessoires zoals sieraden, tassen en ceinturen, die aan winkels over de hele
> wereld werden verkocht. Haar grootste wens was altijd een eigen winkel. In 2015 ging die
> droom in vervulling: de Ravelli-winkel opende aan de Wassenaarse Langstraat.
>
> De winkel groeide in korte tijd uit tot 'the place to be' voor mooie en bijzondere sieraden
> en accessoires. Karin heeft jarenlange ervaring en een grote kennis van kwaliteit en
> schoonheid. Het assortiment is exclusief en uniek, met steeds wisselende collecties.
>
> Klanten krijgen persoonlijke aandacht van Karin en haar medewerkers, met excellente service
> en een vriendelijke, hulpvaardige werkwijze.

Plaats dit als sectie "Over Karin" op de homepage, met haar portret ernaast (groot). Er hoeft
geen aparte Over-ons-pagina te komen.

## 4. Merken — logo-muur (let op: andere regel dan foto's!)
- Bouw de merkenmuur uit de bestanden in `/merken/`.
- Tegels: `object-fit: contain` op een **witte** tegel, logo gecentreerd, met wat padding.
  NIET `cover` — logos mag je nooit bijsnijden. Zo trek je de 17 verschillende formaten
  (png/jpg/webp) netjes gelijk zonder iets te vervormen.
- Geen zichtbaar bijschrift nodig (de logo's spreken voor zich); zet wel een nette `alt`-tekst
  afgeleid van de bestandsnaam.
- Merken blijft een SECTIE op de homepage (geen aparte pagina).

## 5. Categorieën — galerijpagina's
- Maak per categorie een eigen pagina (`kettingen.html`, `oorbellen.html`, `tassen.html`) met
  een fotogalerij, opgebouwd door `build.js` uit de bijbehorende map.
- Tegels hier: `object-fit: cover`, gelijke verhouding — bijgesneden productfoto's in een
  rustig raster. Ongelijke aantallen (12 vs 3) zijn prima; een kleine categorie wordt gewoon
  een kleiner raster.
- Lightbox: klik op een foto → groot; ESC of klik buiten → sluiten. Vanilla JS, geen externe
  libraries.
- De categorietegels op de homepage linken naar deze pagina's (nu linken ze naar #contact).
- Behoud op elke pagina dezelfde header/footer en stijl als index.html.

## 6. `build.js`
Eén Node-script dat in één keer alle mappen verwerkt: `/merken/`, `/kettingen/`, `/oorbellen/`,
`/tassen/`. Het scant elke map op afbeeldingen en genereert de bijbehorende muur/galerij
(schrijf de bestandslijsten naar een `data.js` die de pagina's inladen, of injecteer direct —
houd het simpel en gedocumenteerd). Doel: **foto toevoegen = bestand in de juiste map zetten,
`node build.js` draaien, deployen.**

## 7. Homepage-volgorde, contact & meta
Homepage-secties in deze volgorde:
1. Hero
2. Over Karin (verhaal + portret)
3. Drie categorie-teasers (→ galerijpagina's)
4. Merkenmuur
5. Contact + openingstijden

Contactgegevens (overal correct, geen WordPress-branding):
- E-mail: karin@karinravelli.nl
- Tel: +31 (0)70 737 13 16
- Mobiel: +31 (0)6 15 21 15 05
- Instagram: https://www.instagram.com/karinravelli/
- Adres: Langstraat 50, 2242 KN Wassenaar
- Openingstijden: ma 13:00–17:30 · di–vr 10:00–17:30 · za 10:00–17:00 · zo gesloten

Voeg toe in de contactsectie:
- Een **WhatsApp-knop** → `https://wa.me/31615211505`
- Klik-om-te-bellen-links (`tel:`) en een mailto-link
- Een **Google-kaartje/route** → `https://maps.google.com/?q=Langstraat+50+2242+KN+Wassenaar`

Verder:
- Titel, meta-description, canonical en OG-tags richten op `https://karin-ravelli.nl`,
  met "sieraden en accessoires Wassenaar" in de teksten (lokale SEO).
- OG-image = het portret van Karin.
- Een favicon (mag simpel: de "R" / wordmerk).
- Goed leesbaar voor een wat ouder publiek: ruime letters, hoog contrast, grote tap-targets.
- Controleer dat alles responsive is op mobiel en dat de reveal-animaties blijven werken.

## 8. README.md (in het Nederlands)
Met:
- Hoe `build.js` te draaien.
- Hoe een foto toevoegen/weghalen (in welke map, dan rebuilden).
- Stap-voor-stap deploy naar Cloudflare Pages: git-repo initialiseren, naar GitHub pushen,
  in Cloudflare Pages de repo koppelen, build-command `node build.js` instellen, custom domain
  `karin-ravelli.nl` toevoegen, en precies welke DNS-records ik bij mijn registrar moet zetten.

## Werkwijze
Begin met de projectstructuur opzetten en alle foto's downloaden. Bouw daarna de pagina's en
`build.js`. Geef me een commando om de site lokaal te bekijken (simpele local server) en laat
het resultaat zien. **Vraag het me even vóór je deployt of iets onomkeerbaars doet.**

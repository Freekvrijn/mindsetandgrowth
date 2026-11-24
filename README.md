# Mindset en Growth

Het portfolio van Freek van Rijn voor de minor AI Marketing- en Salesadviseur.

Website: https://freekvanrijn.nl/mindsetandgrowth/

## Indeling

- **Overzicht:** kies periode 1 of periode 2.
- **Periode 1:** 21 opdrachten in zes uitklapbare weken. De 34 oorspronkelijke inleverbestanden blijven beschikbaar. Reflecties, ontwikkeling en het AI-manifest staan bij deze periode.
- **Periode 2:** opdrachten rond ICT, e-commerce en persoonlijke ontwikkeling. De vier huidige Word-bestanden zijn op de site leesbaar en downloadbaar. De reflectie op Alexandra staat als invulversie vermeld.

De overzichten gebruiken korte titels en eenvoudige lijsten. Volledige uitwerkingen staan achter een klik. De presentatiemodus hoort bij periode 1.

## Openen

Open `index.html` in een browser, of start `python3 scripts/serve.py`. Voor de website zijn geen accounts, API-sleutels, externe lettertypen of buildstappen nodig.

De bestaande directe links zoals `#week-3` en `#opdracht-3-1` blijven werken. De nieuwe periodes staan op `#periode-1` en `#periode-2`.

## Periode 2 bijwerken

Maak of wijzig eerst de DOCX-bestanden in de map `Uitwerkingen` van periode 2. Importeer ze daarna:

```bash
python3 scripts/sync_periode2.py '/pad/naar/Periode 2/Mindset & Growth'
```

Zonder argument gebruikt het script Freeks bestaande schoolmap. Het kopieert de Word-bestanden en presentaties naar `portfolio/periode-2/` en maakt de leesbare inhoud in `data/periode2.js` en `data/periode2.json` opnieuw aan. Bestaande bestanden in de bronmap blijven ongewijzigd. Nieuwe Word-bestanden worden automatisch meegenomen. Geef een concept of invulversie ook zo'n herkenbare bestandsnaam. Voor een eigen week, titel of toelichting kun je de gegevens in `KNOWN` aanvullen.

Het script heeft alleen Python 3 nodig. De versies van de gewijzigde scripts en stijlen in `index.html` worden bijgewerkt, zodat bezoekers de nieuwe inhoud krijgen.

Controleer de gewijzigde pagina's en downloads. Commit daarna alleen de bijbehorende bestanden en push naar `origin/main`. Dit is de vaste werkwijze die Freek op 24 november 2026 heeft gevraagd. De afspraken staan ook in `AGENTS.md`.

## Periode 1

`data/content.js` bevat de opdrachtinformatie en de presentatieroute. `data/portfolio.js` en `data/portfolio.json` bevatten de leesbare documenten en scorekaartgegevens. De oorspronkelijke bestanden staan in `portfolio/definitief/`; ouder werk staat in `portfolio/opdrachten/`.

De importer voor periode 1 blijft beschikbaar:

```bash
python3 scripts/build_content.py '/pad/naar/Periode 1/Mindset & Growth'
```

Die importer heeft `openpyxl`, `ffmpeg` en `ffprobe` nodig. Deze pakketten zijn niet nodig om de website te bekijken of periode 2 bij te werken.

## Publicatie

De bestaande GitHub Pages-configuratie publiceert vanuit `main`. De persoonlijke reflecties en originele bestanden staan op verzoek van Freek in dit portfolio. Concepten en invulversies worden niet als afgerond werk gepresenteerd.

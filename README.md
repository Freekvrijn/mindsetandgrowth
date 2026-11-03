# Growth Map — Freek van Rijn

Interactief portfolio voor Mindset & Growth: 6 hoofdstukken, 21 opdrachten en alle 34 definitieve inleverbestanden. Het portfolio gebruikt alleen lokale HTML, CSS, JavaScript, lettertypen en media. Er zijn geen accounts, API-sleutels of buildstappen nodig.

## Presenteren

Open `index.html` in Chrome of dubbelklik op `Start-presentatie.command` op de Mac. Vanaf een terminal kan het ook met `python3 scripts/serve.py`. De lokale server luistert alleen op `127.0.0.1`.

- **P**: start of hervat de presentatie met negen stappen.
- **← / →**: vorige of volgende stap; werkt ook met Page Up / Page Down.
- **N**: spreeknotities tonen of verbergen. De notities zijn op hetzelfde scherm zichtbaar.
- **F**: volledig scherm.
- **Esc**: sluit eerst de geopende uitwerking, daarna de presentatie.
- **/**: zet de cursor in de zoekbalk op de portfoliopagina.

Video en audio starten alleen op verzoek. Bij afsluiten stopt het afspelen. De presentatie onthoudt lokaal de laatste stap; klik op het eerste bolletje om opnieuw te beginnen. Open het kwartet vanuit de uitwerking eventueel in een apart tabblad voor meer ruimte.

## Inhoud

- `data/content.js`: hoofdstukken, opdrachtinformatie en de presentatieroute.
- `data/portfolio.js`: de leesbare documenten, bestandsinformatie en scorekaartgegevens; werkt ook zonder server.
- `data/portfolio.json`: dezelfde geïmporteerde brondata voor controle.
- `portfolio/definitief/`: ongewijzigde kopieën van de 34 bestanden uit de definitieve Inlevermap.
- `portfolio/opdrachten/`: het eerdere werkarchief; de nieuwe site verwijst voor uitwerkingen naar de definitieve bestanden.
- `portfolio/presentaties/`: het oorspronkelijke lesmateriaal, inclusief week 6.
- `assets/opdracht-slides/`: de oorspronkelijke opdrachtdia’s voor week 1–5.
- `assets/media/`: lokale videoposters, posterweergave en magazijnillustratie.
- `assets/fonts/`: lokaal opgeslagen lettertypen, zodat de site geen fontdienst nodig heeft.

Word-documenten worden als tekst, koppen, lijsten, tabellen en bronlinks op de site weergegeven. De originele opmaak blijft in de downloadbare Word-bestanden behouden. De interactieve webweergave van TravelHelp volgt de drie vaste routes uit het PowerPoint-prototype; dit is geen live AI-chatbot. De twee checklists zijn met een schuifregelaar te vergelijken. LeadFocus heeft een klikbaar systeemoverzicht. De groeiweergave is afgeleid van de twaalf beoordelingen uit de twee originele Excel-bestanden; er zijn geen fictieve scores toegevoegd.

## Inhoud bijwerken

`python3 scripts/build_content.py '/pad/naar/Mindset & Growth'`

Voor import zijn Python met `openpyxl`, `ffmpeg` en `ffprobe` nodig. Voor het openen en presenteren niet. De importer wijzigt de oorspronkelijke bestanden niet.

## Publicatie

De volledige website wordt vanuit `main` via de bestaande GitHub Pages-configuratie gepubliceerd op https://freekvanrijn.nl/mindsetandgrowth/. Alle persoonlijke reflecties en originele inleverbestanden zijn op uitdrukkelijk verzoek opgenomen. Op de pagina Reflecties staan de 19 aanwezige persoonlijke reflecties rechtstreeks leesbaar; ze zijn ook bij de bijbehorende opdrachten beschikbaar. Het oorspronkelijke bestand blijft altijd downloadbaar.

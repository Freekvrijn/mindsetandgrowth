# Briefing voor de engineer: TravelHelp-chatbot

## Aanname

Omdat de opdrachtgever niet in de map staat, gebruik ik CheapTickets als voorbeeld. Pas de bedrijfsnaam en interne bronnen aan als de echte opdrachtgever anders is.

## Doel

TravelHelp helpt klanten vóór en na een boeking met veelgestelde vragen. De chatbot geeft snel een antwoord, vraagt door als informatie ontbreekt en stuurt de klant op tijd door naar een medewerker. De chatbot verkoopt geen vlucht en neemt geen definitieve beslissing over terugbetaling, verzekering of klacht.

## Drie functies

1. Veelgestelde vragen beantwoorden over bagage, inchecken, wijzigingen en reisverzekeringen.
2. De juiste vervolgstap kiezen: zelfservicepagina, extra vraag stellen of medewerker inschakelen.
3. Een korte samenvatting voor de medewerker maken wanneer het gesprek wordt doorgestuurd.

## Wat voorspelt of beslist de AI?

De AI herkent het onderwerp en de bedoeling van de vraag. Daarna zoekt het systeem informatie in goedgekeurde bedrijfsbronnen. Het systeem schat ook of het antwoord zeker genoeg is. Bij lage zekerheid, emotionele klachten, geldbedragen of uitzonderingen schakelt het een medewerker in.

## Technieken

- Taalherkenning om het onderwerp van de vraag te bepalen.
- Een taalmodel om een duidelijk antwoord te formuleren.
- Retrieval augmented generation om informatie uit goedgekeurde bronnen op te halen.
- Classificatie om te kiezen tussen antwoorden, doorvragen of doorsturen.
- Samenvatting om een medewerker snel context te geven.

## Systeemstappen

1. Klant stelt een vraag.
2. Systeem verwijdert onnodige persoonsgegevens uit de invoer.
3. Classificatie bepaalt onderwerp en risico.
4. Zoekfunctie haalt passende informatie uit de kennisbank.
5. Taalmodel maakt een kort antwoord met bronlink.
6. Zekerheidscontrole beoordeelt of het antwoord veilig genoeg is.
7. Chatbot antwoordt of schakelt een medewerker in.
8. Klant geeft aan of het antwoord hielp.
9. Medewerkers bekijken fouten en verbeteren de kennisbank.

## Menselijke controle

Een medewerker blijft nodig bij klachten, terugbetalingen, juridische vragen, medische situaties en onduidelijke antwoorden. De chatbot mag nooit zelf geld toezeggen of een klant definitief afwijzen. Medewerkers moeten antwoorden kunnen corrigeren. De klant ziet altijd dat die met een chatbot praat.

## Data en privacy

Gebruik alleen gegevens die nodig zijn voor het gesprek. Vraag geen paspoortnummer, volledige betaalgegevens of medische informatie. Sla gesprekken niet langer op dan nodig. Gebruik echte klantgesprekken alleen voor verbetering na toestemming en verwijder herkenbare gegevens.

## Testgevallen

| Vraag | Verwachte actie |
|---|---|
| Hoeveel handbagage mag ik meenemen? | Bron zoeken en kort antwoord geven |
| Ik wil mijn vlucht van morgen annuleren | Doorvragen en medewerker inschakelen |
| Mijn kind heeft medische hulp nodig tijdens de vlucht | Geen medisch advies; direct doorsturen |
| Waar vind ik mijn boekingsnummer? | Stappen uitleggen met bronlink |
| Jullie hebben twee keer afgeschreven | Klacht herkennen en medewerker inschakelen |

## Bouwadvies zonder code

Gebruik Copilot Studio of een vergelijkbare no-code-tool. Maak drie onderwerpen: boeking en bagage, wijzigen en annuleren, en klachten. Koppel alleen goedgekeurde webpagina's of documenten. Voeg per onderwerp een doorstuurregel toe. Test minimaal de vijf situaties uit de tabel.

## Wat nog handmatig moet gebeuren

De werkende no-code-chatbot kan pas worden gebouwd zodra bekend is welk platform en welk account beschikbaar zijn. Hiervoor is toegang tot de gekozen tool nodig.

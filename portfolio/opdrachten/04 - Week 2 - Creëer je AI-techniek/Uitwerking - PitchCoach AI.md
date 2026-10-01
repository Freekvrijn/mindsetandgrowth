# PitchCoach AI

## Inleiding

Veel studenten leren tijdens hun opleiding hoe ze een presentatie of verkooppitch moeten geven. Ze krijgen theorie over opbouw, stemgebruik en overtuigen. Toch blijft oefenen lastig. Een docent kan niet iedere week naar iedere student luisteren. Medestudenten geven soms alleen algemene feedback, zoals "het ging goed" of "je praatte wat snel". Daardoor weet een student niet altijd wat die bij de volgende poging concreet moet veranderen.

Mijn voorstel is PitchCoach AI. Dit is een toepassing waarmee studenten een korte pitch kunnen opnemen en direct gerichte feedback krijgen. De toepassing beoordeelt niet of iemand een goed of slecht persoon is. Het systeem kijkt alleen naar onderdelen van de opname die bij presenteren horen. Voorbeelden zijn spreektempo, stiltes, herhaling, structuur en het gebruik van moeilijke woorden. De student kiest vooraf het doel en de doelgroep van de pitch. Daarna vergelijkt het systeem de opname met duidelijke criteria.

PitchCoach AI geeft geen cijfer en neemt de rol van een docent niet over. Het systeem helpt vooral tussen lessen door. Een student kan meerdere versies opnemen en zien of een gekozen verbeterpunt vooruitgaat. De uiteindelijke beoordeling blijft bij de docent of opdrachtgever.

## 1. Welke AI-technieken zijn nodig?

### Spraakherkenning

De eerste techniek is spraakherkenning. Deze techniek zet de gesproken pitch om in tekst. Het systeem heeft de tekst nodig om de opbouw, woordkeuze en herhaling te onderzoeken. Spraakherkenning werkt door patronen in geluid te koppelen aan woorden. Het model is vooraf getraind met veel voorbeelden van gesproken taal en de juiste uitgeschreven tekst.

De techniek moet verschillende Nederlandse accenten aankunnen. Een accent mag niet worden gezien als een fout. Het systeem kijkt alleen of woorden goed genoeg worden herkend om bruikbare feedback te geven. Als de opname veel fouten bevat, moet PitchCoach aangeven dat de geluidskwaliteit onvoldoende is. Het systeem mag dan geen harde conclusie trekken.

### Taalanalyse

Daarna gebruikt PitchCoach technieken voor natuurlijke taalverwerking. Deze technieken onderzoeken de uitgeschreven tekst. Het systeem zoekt bijvoorbeeld naar een opening, een probleem, een oplossing, bewijs en een afsluiting. Het kijkt ook naar lange zinnen, vaktaal en woorden die vaak terugkomen.

De gebruiker kiest vooraf welk soort pitch wordt opgenomen. Een verkooppitch heeft andere onderdelen dan een persoonlijke introductie of projectpresentatie. Daarom gebruikt PitchCoach niet één vaste controle voor alle situaties. De criteria passen bij het gekozen doel.

### Classificatie

Classificatie wordt gebruikt om delen van de pitch in categorieën te plaatsen. Een zin kan bijvoorbeeld worden herkend als probleem, voordeel, bewijs, oproep of afsluiting. Hierdoor kan het systeem laten zien welke onderdelen ontbreken of erg kort zijn.

De classificatie hoeft niet altijd zeker te zijn. Bij twijfel toont het systeem bijvoorbeeld: "Deze zin lijkt een voordeel te beschrijven. Klopt dat?" De student kan de categorie aanpassen. Deze correctie helpt om het systeem later te verbeteren.

### Audioanalyse

PitchCoach onderzoekt ook kenmerken van het geluid. Het meet het aantal woorden per minuut, de lengte van stiltes en grote verschillen in volume. Het systeem geeft geen oordeel over een mooie of lelijke stem. Het kijkt alleen naar meetbare onderdelen die verstaanbaarheid kunnen beïnvloeden.

Snel spreken is niet automatisch slecht. Bij een korte, energieke pitch kan een hoger tempo passen. Daarom vergelijkt het systeem het tempo met het gekozen type pitch en laat het de student zelf luisteren naar opvallende momenten.

### Generatieve AI

Een taalmodel zet de meetresultaten om in begrijpelijke feedback. Het model krijgt niet de vrije opdracht om de student te beoordelen. Het ontvangt vaste gegevens, zoals: de pitch duurt 86 seconden, het tempo is 178 woorden per minuut, de oplossing verschijnt na 52 seconden en het woord "eigenlijk" komt negen keer voor.

Op basis daarvan maakt het model maximaal drie verbeterpunten. Ieder verbeterpunt bevat een voorbeeld uit de eigen pitch en een kleine oefening. Een voorbeeld is: "Je oplossing komt pas na 52 seconden. Probeer het probleem in twee zinnen te beschrijven en noem daarna direct je oplossing."

## 2. Hoofddoel en doelgroep

Het hoofddoel is studenten vaker en gerichter te laten oefenen met pitchen. De eerste doelgroep bestaat uit hbo-studenten die presentaties geven binnen marketing, sales, ondernemerschap en projectonderwijs. Deze studenten moeten vaak een idee, advies of product duidelijk overbrengen.

De toepassing lost drie problemen op. Ten eerste krijgen studenten snel feedback zonder dat een docent iedere opname moet bekijken. Ten tweede wordt feedback concreter. In plaats van "praat rustiger" ziet de student op welke momenten het tempo hoog was. Ten derde kan de student groei volgen. PitchCoach vergelijkt niet vooral studenten met elkaar, maar laat zien of dezelfde student vooruitgaat op een gekozen punt.

Een voorbeeld: een student wil een verkooppitch van twee minuten oefenen. Die kiest de criteria probleem, oplossing, voordeel en afsluitende vraag. Na de eerste opname ziet de student dat de pitch 2 minuten en 35 seconden duurt. De oplossing wordt duidelijk uitgelegd, maar een afsluitende vraag ontbreekt. Het systeem stelt één oefening voor: neem alleen de laatste twintig seconden opnieuw op en eindig met een duidelijke vervolgstap.

PitchCoach moet laagdrempelig zijn. De student opent de toepassing, kiest het soort pitch en neemt audio op. Video is niet verplicht, omdat gezichts- en lichaamstaalanalyse extra privacyrisico's geeft. Een latere versie kan video aanbieden als vrijwillige keuze, maar de eerste versie blijft bij audio en tekst.

## 3. Mogelijke bias en testen

### Accentbias

Spraakherkenning kan minder goed werken bij accenten, dialecten of een andere uitspraak. Als het systeem meer transcriptiefouten maakt bij een bepaalde groep, krijgt die groep ook slechtere feedback. Dat is oneerlijk. Daarom moet de testgroep bestaan uit studenten met verschillende accenten en taalachtergronden.

PitchCoach toont altijd de uitgeschreven tekst. De student kan verkeerde woorden verbeteren voordat de analyse start. Ook wordt de herkenningszekerheid gemeten. Bij een lage zekerheid geeft het systeem geen advies over woordkeuze of structuur op basis van de foutieve tekst.

### Stijlbias

Een model kan één presentatiestijl als ideaal zien. Een rustige spreker kan dan onterecht minder goed worden beoordeeld dan een energieke spreker. Dat past niet bij iedere persoon of doelgroep. PitchCoach gebruikt daarom geen algemene score voor enthousiasme of zelfvertrouwen. Het systeem meet alleen onderdelen die de student vooraf kiest.

De feedback moet ruimte laten voor een eigen stijl. In plaats van "je moet sneller praten" schrijft het systeem: "Je tempo is gemiddeld 105 woorden per minuut. Luister naar het gemarkeerde deel en bepaal of dit past bij jouw doelgroep."

### Taalbias

Studenten die Nederlands als tweede taal spreken kunnen kortere zinnen of andere woorden gebruiken. Dat hoeft geen slechte communicatie te zijn. De toepassing moet daarom niet belonen dat iemand moeilijke woorden gebruikt. Duidelijke taal is juist belangrijk. De feedback kijkt naar begrijpelijkheid en structuur, niet naar hoe ingewikkeld de woorden zijn.

### Testplan

De eerste test bestaat uit vijftig vrijwillige studenten. Zij nemen twee pitches op: één zonder feedback en één na gebruik van PitchCoach. Twee docenten bekijken een deel van de opnames met dezelfde beoordelingscriteria. Daarna wordt gekeken of de feedback van PitchCoach past bij de observaties van de docenten.

Er worden geen gezichten, namen of studieresultaten gebruikt voor de analyse. De resultaten worden apart bekeken voor verschillende accenten en taalachtergronden. Het doel is niet om verschillen tussen groepen te rangschikken. Het doel is om te controleren of de techniek bij iedere groep ongeveer even bruikbaar is.

Daarnaast beantwoorden studenten korte vragen. Begrijpen zij de feedback? Kunnen zij er direct mee oefenen? Voelen zij zich eerlijk behandeld? Hebben zij het gevoel dat de toepassing hun eigen stijl respecteert? Alleen een hoge technische nauwkeurigheid is niet genoeg. De feedback moet ook bruikbaar en veilig voelen.

## 4. Veiligheid en eerlijkheid

### Zo weinig mogelijk gegevens

Een spraakopname bevat persoonlijke informatie. PitchCoach verwerkt daarom alleen wat nodig is. De student kan kiezen om de originele audio na de analyse direct te verwijderen. De tekst en meetresultaten worden alleen bewaard als de student groei wil volgen. De standaardinstelling is verwijderen, niet bewaren.

De toepassing vraagt niet om leeftijd, afkomst, geslacht of medische informatie. Een student gebruikt een willekeurige gebruikerscode bij een onderzoek. Docenten krijgen alleen toegang tot een opname als de student deze bewust deelt.

### Geen automatische beoordeling

PitchCoach geeft geen cijfer en bepaalt niet of een student slaagt. Het systeem kent de volledige context niet. Een docent kan rekening houden met inhoud, creativiteit, zenuwen en de eisen van een opdracht. Het AI-systeem kan dat niet volledig overzien.

De toepassing gebruikt daarom woorden als "opvallend", "mogelijk verbeterpunt" en "controleer zelf". Het vermijdt harde uitspraken zoals "jij bent niet overtuigend". Feedback gaat over de opname en niet over de persoon.

### Uitleg bij feedback

Ieder advies moet terug te vinden zijn in de opname. Als PitchCoach zegt dat een woord vaak voorkomt, toont het systeem het aantal en de zinnen. Als het tempo hoog is, worden de seconden gemarkeerd. De student kan zo controleren waarop de feedback is gebaseerd.

Ook toont het systeem wat het niet weet. Het kan niet zeker bepalen of humor passend is, of de inhoud feitelijk klopt en hoe een echt publiek zal reageren. Die punten blijven bij de student, docent of opdrachtgever.

### Meldingen en correcties

De student kan ieder advies beoordelen als nuttig, niet nuttig of onjuist. Bij een onjuist advies kan een korte reden worden gekozen. Een team bekijkt terugkerende fouten. Een update wordt eerst getest voordat deze voor iedereen wordt gebruikt.

Er komt ook een duidelijke meldknop voor kwetsende of oneerlijke feedback. Zulke meldingen krijgen voorrang. Als een bepaald soort advies vaak problemen geeft, wordt dat onderdeel tijdelijk uitgezet.

## Werking van de toepassing

De gebruiker kiest eerst een pitchsoort en maximaal drie aandachtspunten. Daarna neemt de gebruiker een pitch op. De spraakherkenning maakt een concepttekst. De gebruiker controleert deze tekst en verbetert eventuele fouten.

Vervolgens analyseert het systeem de tekst en audio. De resultaten worden niet als één eindscore getoond. De student ziet een overzicht met duur, tempo, stiltes en de opbouw van de pitch. Daarna verschijnen maximaal drie verbeterpunten.

Bij ieder punt staat een korte oefening. De student kan bijvoorbeeld alleen de opening opnieuw opnemen. Daarna vergelijkt PitchCoach de nieuwe versie met de vorige versie. De toepassing laat alleen groei zien op het gekozen onderdeel. Zo voorkomt het systeem dat een student tegelijk tien dingen probeert te veranderen.

Een docent kan een oefenprofiel maken. Daarin staan de verplichte onderdelen van een opdracht. De docent ziet niet automatisch alle opnames. De student kiest zelf welke versie wordt gedeeld. Hierdoor blijft de toepassing een oefenmiddel en wordt het geen verborgen controlesysteem.

## Waarde voor opleiding en student

PitchCoach kan tijd besparen bij herhaalbare basisfeedback. Een docent hoeft niet in iedere opname het spreektempo of ontbrekende afsluiting te zoeken. Daardoor blijft meer tijd over voor inhoudelijke feedback en een gesprek met de student.

Voor de student verlaagt de toepassing de drempel om opnieuw te oefenen. Feedback komt direct en bevat een kleine vervolgstap. De student kan in een veilige omgeving fouten maken voordat een echte presentatie plaatsvindt.

De toepassing kan ook helpen bij stages en sollicitaties. Een student kan een korte introductie oefenen en letten op duidelijkheid en tijd. PitchCoach mag hierbij geen selectieadvies geven aan werkgevers. Het blijft een hulpmiddel van de gebruiker.

## Grenzen

PitchCoach kan niet bepalen of een idee goed is of een bron betrouwbaar is. Het systeem weet ook niet precies hoe een publiek zich voelt. Oogcontact, houding en de sfeer in een ruimte ontbreken in de eerste versie. De feedback is daarom beperkt tot de opname, gekozen criteria en meetbare patronen.

Ook kan generatieve feedback fouten maken. Daarom krijgt het taalmodel alleen gecontroleerde meetgegevens en vaste regels. De toepassing moet geen nieuwe feiten over de student verzinnen. Adviezen worden regelmatig door docenten en studenten getest.

## Conclusie

PitchCoach AI helpt studenten om vaker en gerichter te oefenen met pitchen. De toepassing combineert spraakherkenning, taalanalyse, classificatie, audioanalyse en generatieve AI. De kracht zit niet in een automatisch cijfer, maar in concrete feedback die de student kan controleren.

Het systeem bewaakt eerlijkheid door verschillende accenten en taalachtergronden te testen. Het gebruikt zo weinig mogelijk persoonsgegevens en laat de gebruiker beslissen wat wordt bewaard of gedeeld. Docenten blijven verantwoordelijk voor de beoordeling. PitchCoach ondersteunt het leerproces, maar neemt het menselijke oordeel niet over.

## Individuele reflectie - concept

Bij deze opdracht heb ik geleerd dat een idee voor AI snel groter wordt dan alleen een slim model. Voor PitchCoach zijn ook privacy, uitleg, testen en menselijke controle nodig. Spraakherkenning kan bijvoorbeeld goed lijken te werken, maar toch meer fouten maken bij bepaalde accenten. Als ik dat niet test, krijgt niet iedere student dezelfde kwaliteit feedback.

Ik heb AI gebruikt om mogelijke technieken te vergelijken en om het voorstel stap voor stap uit te werken. Ik heb de output niet direct gevolgd. In een eerste idee wilde ik ook gezichtsuitdrukking en lichaamstaal meten. Dat heb ik uit de eerste versie gehaald, omdat video meer privacyrisico's geeft en zulke signalen snel verkeerd kunnen worden uitgelegd.

Ik neem mee dat een AI-toepassing niet zoveel mogelijk moet meten. Het systeem moet alleen gegevens gebruiken die nodig zijn voor het doel. Ook vind ik het belangrijk dat PitchCoach geen cijfer geeft. Feedback kan studenten helpen, maar een docent en de student zelf moeten de betekenis bepalen. Een volgende stap is een kleine test met verschillende studenten om te controleren of de feedback duidelijk, eerlijk en bruikbaar is.

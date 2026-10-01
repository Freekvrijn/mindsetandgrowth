# AI-systemen creëren: LeadFocus

## Probleem (circa 150 woorden)

Een klein marketingbureau krijgt iedere week veel aanvragen via formulieren, e-mail en social media. Medewerkers behandelen de aanvragen op volgorde van binnenkomst. Daardoor wachten kansrijke leads soms te lang op een reactie, terwijl veel tijd gaat naar aanvragen die niet bij het bureau passen. Het commerciële probleem is dus niet een tekort aan leads, maar een slechte verdeling van aandacht.

LeadFocus is een eenvoudig AI-systeem dat nieuwe leads ondersteunt bij de eerste beoordeling. Het systeem voorspelt niet of iemand zeker klant wordt. Het schat alleen welke leads snel door een medewerker bekeken moeten worden. Hiervoor gebruikt het gegevens die de lead zelf heeft ingevuld, zoals bedrijfsgrootte, vraag, budgetcategorie en gewenste startdatum. Ook kijkt het naar gedrag zoals een afspraak aanvragen of een belangrijke pagina bezoeken. Een medewerker ziet de score met een korte uitleg en neemt de echte beslissing. Zo kan het bureau sneller reageren zonder de controle volledig aan AI over te dragen.

## Stroomschema

Zie [Stroomschema - LeadFocus.svg](<Stroomschema - LeadFocus.svg>).

## Uitleg per systeemonderdeel

- Probleem en doel: kansrijke leads sneller door een medewerker laten beoordelen.
- Data: formuliergegevens, bedrijfskenmerken en relevante acties op de website.
- Controle van data: lege velden, dubbele contacten en onlogische waarden worden gemarkeerd.
- AI-techniek: een classificatiemodel deelt leads in als lage, normale of hoge prioriteit.
- Uitleg: het systeem toont de belangrijkste redenen voor de score.
- Menselijke beslissing: een medewerker controleert de lead en kiest de vervolgstap.
- Actie: taak in het CRM, persoonlijke reactie of vraag om extra informatie.
- Feedback: de medewerker noteert later of de prioriteit klopte.
- Evaluatie: iedere maand worden resultaten, fouten en verschillen tussen groepen bekeken.

## AI-techniek tegenover AI-systeem

Het classificatiemodel is de AI-techniek. Dit model zoekt patronen in eerdere voorbeelden en geeft een prioriteitscategorie. LeadFocus is het hele AI-systeem. Daar horen ook de invoerformulieren, gegevenscontrole, CRM-koppeling, uitleg, medewerkers, feedback en afspraken over privacy bij. Zonder deze onderdelen is er alleen een voorspelling en nog geen bruikbaar systeem.

## KPI en meting

De belangrijkste KPI is de gemiddelde reactietijd bij leads met hoge prioriteit. Daarnaast meet het bureau hoeveel hoge-prioriteitsleads een afspraak maken. Er komt ook een kwaliteitsmeting: hoe vaak zet een medewerker de voorgestelde prioriteit hoger of lager? Veel aanpassingen betekenen dat het model opnieuw moet worden onderzocht.

## Risico's en menselijke controle

Het systeem kan bestaande fouten uit historische data overnemen. Als grote bedrijven vroeger sneller werden geholpen, kan het model kleine bedrijven onterecht lager zetten. Ook kunnen onvolledige gegevens leiden tot een verkeerde score. Daarom mag LeadFocus nooit automatisch een lead afwijzen. Een medewerker blijft verantwoordelijk voor de reactie. Gevoelige kenmerken, zoals afkomst of gezondheid, worden niet gebruikt. Leads moeten bovendien kunnen vragen hoe hun aanvraag is behandeld.

## Reflectie op mens en ethiek - concept

Bij deze opdracht heb ik geleerd dat een AI-systeem uit meer bestaat dan een model. Het model geeft alleen een voorspelling. De waarde ontstaat pas door goede data, een duidelijke uitleg, menselijke controle en een manier om fouten terug te melden. Vooral de feedback van medewerkers is belangrijk. Zonder die feedback weet de organisatie niet of de prioriteiten in de praktijk kloppen.

Ik heb AI gebruikt om het commerciële probleem af te bakenen en om het stroomschema op te bouwen. Ik heb bewust gekozen voor een ondersteunend systeem. LeadFocus mag geen leads automatisch afwijzen, omdat een verkeerde score direct invloed heeft op een mogelijke klant. Ik heb ook gelet op bias. Historische verkoopdata kunnen bestaande voorkeuren van medewerkers bevatten. Daarom moet het bureau resultaten per groep controleren en alleen gegevens gebruiken die echt nodig zijn.

Ik neem mee dat snelheid niet de enige KPI mag zijn. Het systeem moet ook eerlijk en uitlegbaar blijven. Als medewerkers vaak van de score afwijken, moet het model worden aangepast. Menselijke controle is dus geen laatste noodoplossing, maar een vast onderdeel van het ontwerp.

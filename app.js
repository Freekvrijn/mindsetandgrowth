'use strict';
(() => {
  const { weeks, assignments, tour } = window.GROWTH_CONTENT;
  const { files, scorecards } = window.PORTFOLIO_DATA;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const url = s => s.split('/').map(encodeURIComponent).join('/');
  const paths = {
    grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
    folder:'M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z',
    chart:'M4 4v16h17 M8 15l4-4 4 2 5-7',
    fingerprint:'M8 16v-5a4 4 0 0 1 8 0v3 M5 15v-4a7 7 0 0 1 14 0v5 M11 21c2-3 2-7 2-10 M3 11a9 9 0 0 1 18-1 M7 19c1-1 1-3 1-4 M17 19l1-3',
    compass:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M16 8l-3 5-5 3 3-5Z',
    sparkles:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z M20 2v4 M18 4h4',
    workflow:'M9 3H3v6h6z M21 15h-6v6h6z M6 9v8a1 1 0 0 0 1 1h8 M9 6h8a1 1 0 0 1 1 1v8',
    scan:'M8 3H3v5 M16 3h5v5 M3 16v5h5 M21 16v5h-5 M8 12l3 3 5-6',
    layers:'m12 3 10 5-10 5L2 8Z M2 12l10 5 10-5 M2 16l10 5 10-5',
    headphones:'M3 14v-3a9 9 0 0 1 18 0v3 M3 13h4v8H5a2 2 0 0 1-2-2z M21 13h-4v8h2a2 2 0 0 0 2-2z',
    cards:'M7 7h13v14H7z M4 17H2V3h13v2 M11 11h5 M11 15h5',
    mic:'M9 5a3 3 0 0 1 6 0v7a3 3 0 0 1-6 0z M5 10v2a7 7 0 0 0 14 0v-2 M12 19v3 M8 22h8',
    play:'m9 5 11 7-11 7Z',
    plane:'m22 2-7 20-4-9L2 9Z M22 2 11 13',
    users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M17 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.9',
    message:'M21 11a9 9 0 0 1-9 9H3l1-5a9 9 0 1 1 17-4 M8 10h8 M8 14h5',
    check:'m5 12 4 4L20 5 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10',
    image:'M3 3h18v18H3z M3 16l5-5 6 6 3-3 4 4 M15 7h.01',
    orbit:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M3 7c1 5 11 13 17 12 M4 18c5 0 14-9 16-14',
    list:'m3 6 1 1 2-2 M10 6h11 M3 12l1 1 2-2 M10 12h11 M3 18l1 1 2-2 M10 18h11',
    bot:'M4 8h16v12H4z M12 8V3 M9 3h6 M1 12v4 M23 12v4 M8 12h.01 M16 12h.01 M9 16h6',
    scale:'M12 3v18 M5 21h14 M3 7h18 M5 7l-4 8h8Z M19 7l-4 8h8Z',
    'arrow-right':'M5 12h14 m-6-6 6 6-6 6',
    'arrow-left':'M19 12H5 m6-6-6 6 6 6',
    'arrow-up-right':'M7 17 17 7 M7 7h10v10',
    'chevron-right':'m9 5 7 7-7 7',
    'chevron-down':'m6 9 6 6 6-6',
    search:'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0 m-1 5 6 6',
    download:'M12 3v12 m-5-5 5 5 5-5 M4 16v5h16v-5',
    x:'m6 6 12 12 M6 18 18 6',
    expand:'M8 3H3v5 M16 3h5v5 M3 16v5h5 M16 21h5v-5',
    help:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4 M12 17h.01',
    file:'M14 2H5v20h14V7z M14 2v6h5 M8 13h8 M8 17h6',
    lock:'M6 10h12v11H6z M8 10V6a4 4 0 0 1 8 0v4',
    volume:'m11 4-6 5H2v6h3l6 5Z M15 8a6 6 0 0 1 0 8 M18 5a10 10 0 0 1 0 14',
    clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M12 6v6l4 2',
    note:'M4 3h16v18H4z M8 7h8 M8 11h8 M8 15h5',
    refresh:'M20 7V2l-3 3a8 8 0 1 0 3 12 M20 2h-5',
    eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12 M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
    target:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0 M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0 M12 12h.01',
    monitor:'M2 3h20v14H2z M12 17v5 M7 22h10'
  };
  const icon = (name, cls='') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.file}"/></svg>`;
  const hydrateIcons = (root=document) => $$('[data-icon]',root).forEach(el => el.innerHTML = icon(el.dataset.icon));
  const getAssignment = id => assignments.find(a => a.id === id);
  const assignmentFiles = a => files.filter(f => a.files.some(prefix => f.name.startsWith(prefix))).sort((a,b) => (['mp4','mp3','html','pdf','png','svg','pptx','xlsx','docx'].indexOf(a.type)-['mp4','mp3','html','pdf','png','svg','pptx','xlsx','docx'].indexOf(b.type)) || a.name.localeCompare(b.name,'nl'));
  const fileLabel = f => /eindmeting/.test(f.name) ? 'Scorekaart · eindmeting' : f.type==='xlsx' ? 'Scorekaart · start' : f.type==='mp3' ? 'Podcast' : f.type==='html' ? 'Kwartetspel' : f.type==='pptx' ? 'PowerPoint-prototype' : /versie 1/.test(f.name) ? 'Checklist · versie 1' : /versie 2/.test(f.name) ? 'Checklist · versie 2' : /handleiding/.test(f.name) ? 'Handleiding' : /reflectie/.test(f.name) && !/uitwerking|voorstel/.test(f.name) ? 'Reflectie' : f.type==='pdf' ? 'Poster · PDF' : f.type==='svg' ? 'Stroomschema' : f.type==='mp4' ? 'Video' : /briefing/.test(f.name) ? 'Ontwerpbriefing' : 'Uitwerking & reflectie';
  const filesize = n => n >= 1e6 ? (n/1e6).toFixed(1).replace('.',',')+' MB' : Math.ceil(n/1000)+' kB';
  let lastView = 'overzicht', activeWeek = 1, filterWeek = 'all', filterKind = 'all', query = '', selectedDomain = 'all';
  let dialogAssignment = null, dialogFile = 'special', detailTab = 'work', previousFocus = null;
  let presenting = false, tourIndex = 0, showNotes = false, tourFocus = null;
  try { tourIndex = Math.max(0,Math.min(tour.length-1,Number(localStorage.getItem('growth-tour-step')) || 0)); } catch (_) {}
  const main = $('#main'), dialog = $('#assignment-dialog');
  let toastTimer;
  const toast = message => { $('#toast').textContent=message; $('#toast').classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500); };

  function orbitMarkup(big=false) {
    return `<div class="orbit-art quiet-orbit ${big?'orbit-large':''}" aria-label="AI met een menselijke blik"><svg class="orbit-lines" viewBox="0 0 480 390" fill="none" aria-hidden="true"><circle cx="240" cy="195" r="145" stroke="#e0e1d7"/><ellipse cx="240" cy="195" rx="183" ry="76" stroke="#d7dace" transform="rotate(-31 240 195)"/><circle cx="110" cy="195" r="5" fill="#b9c5aa"/><circle cx="335" cy="86" r="5" fill="#e8bb93"/><circle cx="309" cy="323" r="6" fill="#e97551"/><circle cx="84" cy="279" r="3" fill="#c4c8b8"/></svg><div class="orbit-core"><span class="orbit-core-small">MINDSET & GROWTH</span><strong>AI<span>✳</span></strong><span class="orbit-core-small">MET EEN MENSELIJKE BLIK</span></div></div>`;
  }
  function weekButtons() {
    return weeks.map(w=>`<a href="#week-${w.id}" class="chapter-link" data-week-nav="${w.id}"><span class="week-pip" style="--week-color:${w.color}">${w.id.toString().padStart(2,'0')}</span><span>${w.theme}</span>${icon('chevron-right')}</a>`).join('');
  }
  function pageIntro(kicker,title,description,extra='') {
    return `<div class="page-heading"><div><span class="eyebrow">${kicker}</span><h1>${title}</h1><p>${description}</p></div>${extra}</div>`;
  }
  function card(a,featured=false) {
    const w=weeks[a.week-1], media=assignmentFiles(a).find(f=>f.durationLabel);
    let art='';
    if(featured) {
      art = a.id==='2.2' ? `<div class="feature-art quartet-art"><span class="mini-playing-card back-card">AI</span><span class="mini-playing-card front-card">${icon('sparkles')}<strong>24</strong><small>AI-TECHNIEKEN</small></span><span class="feature-art-caption">Leren mag ook spelen zijn.</span></div>` : a.id==='6.3' ? `<div class="feature-art warehouse-art"><img src="assets/media/smart-warehouse.png" alt="Magazijnrobot met menselijke controle" loading="lazy"><span class="art-play">${icon('play')}</span><span class="duration">${media?.durationLabel||'1:53'}</span></div>` : `<div class="feature-art podcast-art"><span class="podcast-symbol">${icon('headphones')}</span><div class="waveform" aria-hidden="true">${Array.from({length:28},(_,i)=>`<i style="--h:${14+Math.abs(Math.sin(i*1.34))*58}px"></i>`).join('')}</div><span class="duration">${media?.durationLabel||'15:21'}</span></div>`;
    }
    return `<button class="assignment-card ${featured?'featured-card':''}" data-open="${a.id}" style="--week-color:${w.color}">${art}<div class="card-body"><div class="card-meta"><span>WEEK ${a.week.toString().padStart(2,'0')} <i>·</i> ${esc(a.format)}</span><span class="card-id">${a.id}</span></div>${!featured?`<span class="card-icon">${icon(a.icon)}</span>`:''}<h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p><div class="card-bottom"><span>${featured?'Ontdek de uitwerking':esc(a.kind)}</span><span class="card-arrow">${icon('arrow-up-right')}</span></div></div></button>`;
  }
  function renderHome() {
    main.innerHTML=`<div class="home-content quiet-home"><section class="hero"><div class="hero-copy"><div class="hero-overline">MINDSET & GROWTH · FREEK VAN RIJN</div><h1>Van nieuwsgierig<br>naar <span>bewust.</span></h1><p>Mijn leerreis door AI, kritisch denken en ethiek.<br>Alle opdrachten, uitwerkingen en reflecties op één plek.</p><div class="hero-actions"><button class="button button-orange" data-tour>${icon('play')} Start de presentatie</button><a class="text-link" href="#portfolio">Bekijk mijn portfolio ${icon('arrow-right')}</a></div></div>${orbitMarkup()}</section><section class="journey-section"><div class="section-heading"><div><h2>De zes hoofdstukken</h2></div><span class="section-caption">21 opdrachten · 34 definitieve bestanden</span></div><div class="journey-track">${weeks.map(w=>`<button data-select-week="${w.id}" class="journey-step ${activeWeek===w.id?'selected':''}" style="--week-color:${w.color}" aria-pressed="${activeWeek===w.id}"><span class="journey-dot">${icon(w.icon)}</span><small>WEEK 0${w.id}</small><strong>${w.word}</strong><span>${w.theme}</span></button>`).join('')}</div><div id="week-spotlight">${spotlight(activeWeek)}</div></section><div class="home-reading-links"><a href="#reflecties">${icon('note')} Lees mijn reflecties ${icon('arrow-up-right')}</a><a href="#groei">${icon('chart')} Bekijk mijn ontwikkeling ${icon('arrow-up-right')}</a><a href="#manifest">${icon('fingerprint')} Mijn persoonlijke AI-manifest ${icon('arrow-up-right')}</a></div></div>`;
  }
  function spotlight(id) {
    const w=weeks[id-1];
    return `<div class="week-spotlight quiet-spotlight" style="--week-color:${w.color}"><span class="quiet-week-number">0${w.id}</span><div class="spotlight-copy"><span class="eyebrow">${w.ids.length} ${w.ids.length===1?'OPDRACHT':'OPDRACHTEN'}</span><h3>${w.title}</h3><p>${w.description}</p></div><a href="#week-${w.id}" class="button button-outline">Open hoofdstuk ${icon('arrow-right')}</a></div>`;
  }
  function renderWeek(id) {
    const w=weeks[id-1];
    main.innerHTML=`<div class="page-content week-page" style="--week-color:${w.color}"><a href="#overzicht" class="back-link">${icon('arrow-left')} Terug naar mijn leerreis</a><section class="chapter-hero"><div class="chapter-hero-copy"><span class="eyebrow">HOOFDSTUK 0${w.id} / 06</span><h1>${esc(w.title)}<span class="orange-dot">.</span></h1><p>${esc(w.description)}</p><div class="chapter-tags"><span>${icon(w.icon)} ${esc(w.theme)}</span><span>${w.ids.length} ${w.ids.length===1?'opdracht':'opdrachten'}</span><span>${icon('check')} Afgerond</span></div></div><div class="chapter-number" aria-hidden="true">0${w.id}<span>${icon(w.icon)}</span></div></section><div class="chapter-thought"><span>${icon('sparkles')} WAT IK MEENEEM</span><p>${esc(w.takeaway)}</p></div><section><div class="section-heading"><h2>De uitwerkingen</h2><span class="section-caption">Klik op een opdracht om alles te bekijken</span></div><div class="assignments-grid ${w.ids.length===1?'single-card-grid':''}">${w.ids.map(id=>card(getAssignment(id))).join('')}</div></section><div class="chapter-question"><span class="eyebrow">OM OVER DOOR TE PRATEN</span><h2>${esc(w.question)}</h2></div><div class="chapter-pagination">${id>1?`<a href="#week-${id-1}" class="button button-outline">${icon('arrow-left')} Vorig hoofdstuk</a>`:'<span></span>'}${id<6?`<a href="#week-${id+1}" class="button button-dark">Volgend hoofdstuk ${icon('arrow-right')}</a>`:`<a href="#groei" class="button button-orange">Bekijk mijn ontwikkeling ${icon('arrow-right')}</a>`}</div></div>`;
  }
  function renderPortfolio() {
    main.innerHTML=`<div class="page-content">${pageIntro('ALLES KOMT HIER SAMEN','Mijn portfolio<span class="orange-dot">.</span>','Alle 21 opdrachten, van mijn eerste scorekaart tot mijn persoonlijke AI-manifest.',`<span class="completed-badge">${icon('check')} 21 van 21 uitgewerkt</span>`)}<div class="portfolio-toolbar"><label class="search-field">${icon('search')}<input id="portfolio-search" type="search" placeholder="Zoek op onderwerp, opdracht of techniek…" value="${esc(query)}" aria-label="Zoek in alle opdrachten"><kbd>/</kbd></label><label class="select-field"><span class="sr-only">Filter op week</span><select id="week-filter"><option value="all">Alle weken</option>${weeks.map(w=>`<option value="${w.id}" ${filterWeek===String(w.id)?'selected':''}>Week ${w.id} · ${w.theme}</option>`).join('')}</select>${icon('chevron-down')}</label></div><div class="portfolio-subtoolbar"><div class="filter-chips" role="group" aria-label="Type opdracht">${['all','Begrijpen','Toepassen','Creëren','Verdiepen','Reflecteren'].map(k=>`<button class="filter-chip ${filterKind===k?'active':''}" data-kind="${k}" aria-pressed="${filterKind===k}">${k==='all'?'Alles':k}</button>`).join('')}</div><span id="result-count" class="result-count" role="status"></span></div><div id="portfolio-results"></div><div class="portfolio-footnote">${icon('folder')} 34 definitieve bestanden · Originele bestanden en leesbare webversies bij iedere opdracht</div></div>`;
    renderResults();
  }
  function renderResults() {
    const q=query.toLowerCase().trim();
    const found=assignments.filter(a=>(filterWeek==='all'||String(a.week)===filterWeek)&&(filterKind==='all'||a.kind===filterKind)&&(!q||`${a.id} ${a.title} ${a.summary} ${a.insight} ${a.tags.join(' ')} ${assignmentFiles(a).map(f=>f.name+' '+(f.html||'').replace(/<[^>]*>/g,' ')).join(' ')}`.toLowerCase().includes(q)));
    $('#result-count').textContent=`${found.length} ${found.length===1?'opdracht':'opdrachten'}`;
    $('#portfolio-results').innerHTML=found.length?`<div class="assignments-grid">${found.map(a=>card(a)).join('')}</div>`:`<div class="empty-state">${icon('search')}<h2>Even een andere zoekrichting?</h2><p>Geen opdrachten gevonden bij deze combinatie.</p><button class="button button-dark" data-reset-filters>Wis alle filters ${icon('refresh')}</button></div>`;
  }
  const statusClass=s=>s==='Groen'?'green':s==='Oranje'?'amber':'red';
  const countStatus = (groups,status) => groups.flatMap(g=>g.items).filter(i=>i.status===status).length;
  function scoreGraphic(compact=false) {
    return `<div class="score-graphic ${compact?'compact':''}"><div class="score-legend"><span><i class="status-pip green"></i> Sterk</span><span><i class="status-pip amber"></i> In ontwikkeling</span><span><i class="status-pip red"></i> Start</span></div>${scorecards.map((s,i)=>`<div class="measurement"><div class="measurement-label"><span>${i?'Eindmeting':'Startmeting'}</span><strong>${countStatus(s.groups,'Groen')} <small>/ 12 sterk</small></strong></div><div class="score-segments" aria-label="${esc(s.name)}: ${countStatus(s.groups,'Groen')} groen, ${countStatus(s.groups,'Oranje')} oranje, ${countStatus(s.groups,'Rood')} rood">${s.groups.flatMap(g=>g.items).sort((a,b)=>['Groen','Oranje','Rood'].indexOf(a.status)-['Groen','Oranje','Rood'].indexOf(b.status)).map(item=>`<span class="${statusClass(item.status)}" title="${esc(item.text)} · ${esc(item.status)}"></span>`).join('')}</div></div>`).join('')}<div class="score-graphic-note">Twaalf zelfbeoordelingen, onderbouwd met portfolio-opdrachten.</div></div>`;
  }
  function renderGrowth() {
    main.innerHTML=`<div class="page-content growth-page">${pageIntro('DE GROEI ACHTER HET WERK','Meer dan technisch sterker<span class="orange-dot">.</span>','Mijn begin- en eindmeting naast elkaar. Met bewijs voor mijn groei én ruimte voor de volgende stap.')}<section class="growth-overview"><div class="growth-overview-copy"><span class="eyebrow">MIJN AI-COMPETENTIES</span><h2>Van 6 naar 10<br><span>sterke onderdelen.</span></h2><p>Vooral bij ethiek is mijn blik veranderd. De eindstatus blijft bewust <strong>oranje</strong>: testen met echte gebruikers en praktijkimpact meten zijn mijn volgende stappen.</p><button class="text-link" data-open="1.1">Bekijk de originele scorekaarten ${icon('arrow-up-right')}</button></div>${scoreGraphic()}</section><section><div class="section-heading"><div><span class="eyebrow">BEWIJS BOVEN BEWERINGEN</span><h2>Vier domeinen. Mijn ontwikkeling.</h2></div></div><div class="domain-grid">${scorecards[1].groups.map((g,i)=>`<button class="domain-card ${selectedDomain===String(i)?'selected':''}" data-domain="${i}" aria-pressed="${selectedDomain===String(i)}"><span class="domain-icon">${icon(['users','workflow','scale','sparkles'][i])}</span><h3>${esc(g.name)}</h3><div class="domain-status"><span class="status-tag ${statusClass(scorecards[0].groups[i].status)}">${esc(scorecards[0].groups[i].status)}</span>${icon('arrow-right')}<span class="status-tag ${statusClass(g.status)}">${esc(g.status)}</span></div><span class="text-link">Bekijk het bewijs ${icon('arrow-up-right')}</span></button>`).join('')}</div><div class="competency-heading"><h2 id="competency-heading">${selectedDomain==='all'?'Alle twaalf competenties':esc(scorecards[1].groups[Number(selectedDomain)].name)}</h2>${selectedDomain!=='all'?'<button class="text-link" data-domain="all">Toon alle domeinen</button>':''}</div><div class="competency-list">${scorecards[1].groups.map((g,gi)=>(selectedDomain==='all'||selectedDomain===String(gi))?g.items.map((item,ii)=>{const before=scorecards[0].groups[gi].items[ii];return `<details class="competency"><summary><span class="competency-index">${gi+1}.${ii+1}</span><span class="competency-text">${esc(item.text)}</span><span class="competency-status"><span class="status-pip ${statusClass(before.status)}" aria-label="Start: ${before.status}"></span>${icon('arrow-right')}<span class="status-pip ${statusClass(item.status)}" aria-label="Eind: ${item.status}"></span></span>${icon('chevron-down')}</summary><div class="competency-body"><div><span class="eyebrow">BIJ MIJN START</span><p>${esc(before.evidence)}</p></div><div><span class="eyebrow">BEWIJS VAN NU</span><p>${esc(item.evidence)}</p><div class="evidence-links">${evidenceIds(item.evidence).map(id=>`<button class="mini-link" data-open="${id}">Opdracht ${id} ${icon('arrow-up-right')}</button>`).join('')}</div></div><div class="next-step"><span class="eyebrow">MIJN VOLGENDE STAP</span><p>${esc(item.next)}</p></div></div></details>`}).join(''):'').join('')}</div></section><section class="honest-note">${icon('target')}<div><h3>Wat nog niet bewezen is, blijft zichtbaar.</h3><p>Mijn checklist is verbeterd aan de hand van een voorbeeldantwoord. De magazijnoplossing is een ontwerp. Echte gebruikerstests en gemeten praktijkresultaten zijn de stap die hierna komt.</p></div></section></div>`;
  }
  function evidenceIds(text) { return [...new Set((text.match(/\b[2-6]\.[1-4]\b/g)||[]))].filter(id=>getAssignment(id)); }
  function renderManifest() {
    const f=files.find(f=>f.name.startsWith('6.4'));
    main.innerHTML=`<div class="page-content manifest-page"><section class="manifest-hero"><span class="eyebrow">MIJN PERSOONLIJKE AI-MANIFEST</span><div class="manifest-star" aria-hidden="true">✳</div><h1>AI ondersteunt.<br>De mens <span>beslist.</span></h1><p>Mijn belangrijkste waarde is menselijke verantwoordelijkheid.<br>Technologie mag ondersteunen. Mensen moeten kunnen begrijpen, corrigeren en ingrijpen.</p><span class="manifest-author"><span class="tiny-avatar">F</span> Freek van Rijn · Mindset & Growth</span></section><div class="manifest-principles">${[{n:'01',t:'Controle die echt werkt',p:'Een medewerker kan de uitkomst aanpassen, afwijzen en uitleggen.',id:'3.3',label:'LeadFocus'},{n:'02',t:'Bewijs vóór overtuiging',p:'Bronnen, context en gevolgen controleren voordat ik een advies gebruik.',id:'5.3',label:'Mijn kritische checklist'},{n:'03',t:'Eerlijke grenzen',p:'Privacy, transparantie en bezwaar horen bij het ontwerp.',id:'6.2',label:'Persoonlijke prijzen'}].map(p=>`<div><span class="principle-number">${p.n}</span><h3>${p.t}</h3><p>${p.p}</p><button class="text-link" data-open="${p.id}">${p.label} ${icon('arrow-up-right')}</button></div>`).join('')}</div><section class="manifest-document"><div class="section-heading"><div><span class="eyebrow">MIJN VISIE, VOLLEDIG</span><h2>Het manifest & de reflectie</h2></div><a class="button button-outline button-small" href="${url(f.url)}" download>${icon('download')} Download origineel</a></div><article class="document-content">${f.html}</article></section><section class="manifest-next"><span class="eyebrow">VAN INZICHT NAAR ACTIE</span><h2>Mijn volgende ontwerp begint bij de mens.</h2><p>Verschillende gebruikers betrekken, de risico’s vooraf bespreken en de impact in de praktijk testen.</p><a href="#groei" class="button button-dark">Bekijk mijn ontwikkeling ${icon('arrow-right')}</a></section></div>`;
  }
  function reflectionFor(a) {
    const docs=assignmentFiles(a).filter(f=>f.type==='docx'&&!/handleiding|briefing/.test(f.name));
    for(const f of docs) {
      if(/ - reflectie - /.test(f.name))return {file:f,html:f.html};
      const parsed=new DOMParser().parseFromString(f.html,'text/html');
      const elements=[...parsed.body.children];
      const start=elements.findIndex((el,i)=>i>0&&/^H[2-4]$/.test(el.tagName)&&/reflectie/i.test(el.textContent));
      if(start<0)continue;
      const level=Number(elements[start].tagName[1]);
      let end=start+1;
      while(end<elements.length&&(!/^H[2-4]$/.test(elements[end].tagName)||Number(elements[end].tagName[1])>level))end++;
      return {file:f,html:elements.slice(start,end).map(el=>el.outerHTML).join('')};
    }
    return null;
  }
  function renderReflections() {
    main.innerHTML=`<div class="page-content reflections-page">${pageIntro('TERUGKIJKEN & VOORUITDENKEN','Mijn reflecties<span class="orange-dot">.</span>','Alle persoonlijke reflecties uit mijn definitieve uitwerkingen. Open een opdracht om de volledige reflectie te lezen.')}<div class="reflection-weeks">${weeks.filter(w=>w.id>1).map(w=>`<section class="reflection-week"><div class="reflection-week-heading"><span>WEEK 0${w.id}</span><h2>${w.theme}</h2></div>${w.ids.map(id=>{const a=getAssignment(id),r=reflectionFor(a);return r?`<details class="reflection-entry"><summary><span class="reflection-id">${a.id}</span><span><strong>${esc(a.title)}</strong><small>${esc(a.insight)}</small></span>${icon('chevron-down')}</summary><div class="reflection-entry-body"><article class="document-content">${r.html}</article><div class="reflection-entry-actions"><button class="text-link" data-open="${a.id}">Bekijk de volledige opdracht ${icon('arrow-up-right')}</button><a class="text-link" href="${url(r.file.url)}" download>${icon('download')} Download origineel</a></div></div></details>`:''}).join('')}</section>`).join('')}</div><div class="reflection-score-note"><span>${icon('chart')} Mijn zelfbeoordeling en volgende stappen staan in de scorekaarten.</span><a href="#groei" class="text-link">Bekijk mijn ontwikkeling ${icon('arrow-right')}</a></div></div>`;
  }
  function updateNav(route) {
    const isWeek=route.startsWith('week-'), isAssignment=route.startsWith('opdracht-');
    $$('[data-nav]').forEach(el=>{const active=el.dataset.nav===(isAssignment?'portfolio':isWeek?'':route);el.classList.toggle('active',active); if(active)el.setAttribute('aria-current','page'); else el.removeAttribute('aria-current');});
    $$('[data-week-nav]').forEach(el=>{const active=isWeek&&el.dataset.weekNav===route.replace('week-','');el.classList.toggle('active',active);if(active)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
    $('#breadcrumb').textContent=isWeek?`Week ${route.replace('week-','')}`:isAssignment?'Mijn portfolio':({'overzicht':'Overzicht','portfolio':'Mijn portfolio','groei':'Mijn ontwikkeling','manifest':'Mijn AI-manifest','reflecties':'Mijn reflecties'}[route]||'Overzicht');
  }
  function renderRoute() {
    const route=location.hash.slice(1)||'overzicht';
    if(route.startsWith('opdracht-')) {
      const a=getAssignment(route.replace('opdracht-','').replace('-','.'));
      if(a){if(!main.children.length){renderPortfolio();lastView='portfolio';}updateNav(route);document.title=a.title+' — Freek van Rijn';openAssignment(a.id,false);return;}
    }
    if(dialog.open) { pauseMedia(dialog); dialog.close(); dialogAssignment=null; }
    updateNav(route);
    if(route==='portfolio')renderPortfolio();
    else if(route==='groei')renderGrowth();
    else if(route==='manifest')renderManifest();
    else if(route==='reflecties')renderReflections();
    else if(/^week-[1-6]$/.test(route))renderWeek(Number(route.slice(-1)));
    else renderHome();
    lastView=/^(overzicht|portfolio|groei|manifest|reflecties|week-[1-6])$/.test(route)?route:'overzicht';
    document.title=($('#breadcrumb').textContent==='Overzicht'?'Growth Map':$('#breadcrumb').textContent)+' — Freek van Rijn';
    window.scrollTo({top:0,behavior:'instant'});
  }

  function openAssignment(id,changeHash=true) {
    const a=getAssignment(id);if(!a)return;
    if(changeHash&&!presenting){location.hash=`opdracht-${id.replace('.','-')}`;return;}
    previousFocus=document.activeElement;
    dialogAssignment=a;dialogFile=a.special?'special':assignmentFiles(a)[0].url;detailTab='work';
    renderDetail();
    if(!dialog.open)dialog.showModal();
  }
  function closeAssignment() {
    pauseMedia(dialog);dialog.close();dialogAssignment=null;
    if(location.hash.startsWith('#opdracht-')){history.replaceState(null,'','#'+lastView);updateNav(lastView);document.title=($('#breadcrumb').textContent==='Overzicht'?'Growth Map':$('#breadcrumb').textContent)+' — Freek van Rijn';}
    if(previousFocus?.isConnected)previousFocus.focus({preventScroll:true});
  }
  function pauseMedia(root) { $$('video,audio',root).forEach(el=>el.pause()); $$('iframe',root).forEach(el=>el.src='about:blank'); }
  function renderDetail() {
    const a=dialogAssignment,w=weeks[a.week-1],af=assignmentFiles(a);
    const current=files.find(f=>f.url===dialogFile);
    dialog.innerHTML=`<div class="detail-header"><span class="detail-breadcrumb">WEEK 0${a.week} ${icon('chevron-right')} OPDRACHT ${a.id}</span><div class="detail-header-actions">${current?`<a class="button button-outline button-small" href="${url(current.url)}" download>${icon('download')} <span>Origineel</span></a>`:''}<button class="icon-button" data-close-detail aria-label="Sluit uitwerking">${icon('x')}</button></div></div><div class="detail-title-area" style="--week-color:${w.color}"><span class="detail-icon">${icon(a.icon)}</span><div><span class="eyebrow">${a.kind.toUpperCase()} <i>·</i> ${a.format.toUpperCase()}</span><h2 id="detail-title">${esc(a.title)}</h2><p>${esc(a.summary)}</p></div></div><div class="detail-tabs" role="tablist" aria-label="Onderdeel van de opdracht">${[['work','De uitwerking'],...(reflectionFor(a)?[['reflection','Reflectie']]:[]),['files',`Alle bestanden (${af.length})`],['source','De opdracht']].map(([key,label])=>`<button role="tab" id="tab-${key}" aria-selected="${detailTab===key}" aria-controls="detail-panel" tabindex="${detailTab===key?0:-1}" data-detail-tab="${key}">${label}</button>`).join('')}</div><div id="detail-panel" class="detail-panel" role="tabpanel" aria-labelledby="tab-${detailTab}">${detailTab==='files'?renderFileList(af):detailTab==='source'?renderSource(a):detailTab==='reflection'?`<article class="document-content reflection-detail">${reflectionFor(a)?.html||''}</article>`:`<div class="detail-insight">${icon('sparkles')}<p><strong>Mijn inzicht</strong> ${esc(a.insight)}</p></div><div class="file-switcher" role="group" aria-label="Kies een uitwerking">${a.special?`<button class="file-chip ${dialogFile==='special'?'active':''}" data-file="special">${icon(a.special==='score'?'chart':a.special==='travel'?'message':a.special==='compare'?'layers':'workflow')}${{score:'Vergelijk mijn metingen',travel:'Probeer het prototype',compare:'Vergelijk de versies',flow:'Ontdek het systeem'}[a.special]}</button>`:''}${af.map(f=>`<button class="file-chip ${dialogFile===f.url?'active':''}" data-file="${esc(f.url)}">${icon(f.type==='mp4'?'play':f.type==='mp3'?'headphones':'file')}${fileLabel(f)}${f.durationLabel?`<small>${f.durationLabel}</small>`:''}</button>`).join('')}</div><div class="file-preview" id="file-preview">${renderPreview(a,current)}</div>`}</div><div class="detail-footer"><span>${a.id} <i>·</i> ${esc(w.theme)}</span><button class="text-link" data-next-assignment>Volgende opdracht ${icon('arrow-right')}</button></div>`;
  }
  function renderFileList(af) {
    return `<div class="files-intro"><h3>De definitieve bestanden</h3><p>Bekijk ze hier of download het oorspronkelijke bestand.</p></div><div class="file-list">${af.map(f=>`<div class="file-row"><span class="file-type">${f.type.toUpperCase()}</span><div><strong>${esc(f.name)}</strong><span>${filesize(f.size)}${f.durationLabel?' · '+f.durationLabel:''}</span></div><button class="icon-button" data-file="${esc(f.url)}" aria-label="Bekijk ${esc(f.name)}">${icon('eye')}</button><a class="icon-button" href="${url(f.url)}" download aria-label="Download ${esc(f.name)}">${icon('download')}</a></div>`).join('')}</div>`;
  }
  function renderSource(a) {
    const w=weeks[a.week-1];
    return `<div class="source-content"><span class="eyebrow">DE OORSPRONKELIJKE OPDRACHT</span><h3>${esc(w.theme)} · ${esc(a.kind)}</h3>${a.slide?`<img class="source-image" src="assets/opdracht-slides/opdracht-${a.slide.toString().padStart(2,'0')}.png" alt="Originele opdrachtdia bij opdracht ${a.id}">`:`<p>De oorspronkelijke opdracht voor week 6 staat in het lesmateriaal Ethiek. De uitwerking en reflectie vind je onder ‘De uitwerking’.</p>`}<a class="button button-outline" href="${url('portfolio/presentaties/'+w.source)}" target="_blank" rel="noopener">${icon('file')} Open het volledige lesmateriaal ${icon('arrow-up-right')}</a></div>`;
  }
  function renderPreview(a,f) {
    if(dialogFile==='special') {
      if(a.special==='score')return `<div class="inline-score"><div><span class="eyebrow">ZELFDE COMPETENTIES. EEN BREDERE BLIK.</span><h3>Mijn begin- en eindmeting</h3><p>Van 6 naar 10 groene beoordelingen. De eindstatus is oranje: echte gebruikerstests en praktijkimpact blijven ontwikkelpunten.</p></div>${scoreGraphic(true)}<a class="button button-dark" href="#groei" data-close-for-route>Bekijk alle competenties ${icon('arrow-right')}</a></div>`;
      if(a.special==='travel')return renderTravel();
      if(a.special==='compare')return renderCompare();
      if(a.special==='flow')return renderFlow();
    }
    if(!f)return '<p>Kies een bestand om de uitwerking te bekijken.</p>';
    if(f.type==='docx')return `<div class="document-toolbar"><span>${icon('file')} Leesweergave van het definitieve Word-document</span><a href="${url(f.url)}" download class="text-link">Download ${icon('download')}</a></div><article class="document-content">${f.html}</article>`;
    if(f.type==='mp4')return `<div class="video-viewer"><video controls playsinline preload="metadata" poster="${f.poster}"><source src="${url(f.url)}" type="video/mp4">Je browser ondersteunt deze video niet. <a href="${url(f.url)}">Download de video</a>.</video><div class="media-caption"><span>${icon('clock')} ${f.durationLabel} <i>·</i> ${esc(f.name.split(' - ').slice(1,-1).join(' · '))}</span><a href="${url(f.url)}" download>${icon('download')} Video downloaden</a></div></div>`;
    if(f.type==='mp3')return `<div class="audio-viewer"><span class="eyebrow">DE PODCAST · ${f.durationLabel}</span><div class="audio-cover">${icon('headphones')}<h3>AI & online<br>betaalfraude<span>.</span></h3><div class="waveform" aria-hidden="true">${Array.from({length:40},(_,i)=>`<i style="--h:${12+Math.abs(Math.sin(i*.85))*62}px"></i>`).join('')}</div><span>FREEK VAN RIJN · MINDSET & GROWTH</span></div><audio controls preload="metadata"><source src="${url(f.url)}" type="audio/mpeg">Je browser ondersteunt deze audio niet.</audio><p class="audio-note">Deze podcast is met AI gemaakt. De bijbehorende reflectie beschrijft de inhoudelijke keuzes en controles.</p></div>`;
    if(f.type==='html')return `<div class="embed-toolbar"><span>${icon('cards')} Het originele speelbare kwartet · 24 technieken</span><a href="${url(f.url)}" target="_blank" rel="noopener" class="text-link">Open in eigen tab ${icon('arrow-up-right')}</a></div><iframe class="game-frame" src="${url(f.url)}" title="AI-kwartetspel met 24 AI-technieken" sandbox="allow-scripts allow-same-origin" loading="lazy"></iframe>`;
    if(f.type==='png'||f.type==='svg')return `<figure class="image-viewer"><a href="${url(f.url)}" target="_blank" rel="noopener"><img src="${url(f.url)}" alt="${esc(f.name.replace(/ - Freek van Rijn\.(png|svg)$/,''))}"></a><figcaption>Klik op de afbeelding om deze groot te openen.</figcaption></figure>`;
    if(f.type==='pdf')return `<figure class="poster-viewer"><a href="${url(f.url)}" target="_blank" rel="noopener"><img src="assets/media/poster.png" alt="Poster: Denk eerst. Gebruik AI daarna. Valkuilen en controles voor kritisch AI-gebruik."></a><figcaption><a class="text-link" href="${url(f.url)}" target="_blank" rel="noopener">Open de originele PDF ${icon('arrow-up-right')}</a></figcaption></figure>`;
    if(f.type==='xlsx') { const s=scorecards[/eindmeting/.test(f.name)?1:0]; return `<div class="workbook-view"><div class="document-toolbar"><span>${icon('chart')} ${s.name} · Rechtstreeks uit de originele scorekaart</span><a href="${url(f.url)}" download class="text-link">Download Excel ${icon('download')}</a></div>${s.groups.map(g=>`<h3>${esc(g.name)}</h3><div class="table-scroll" tabindex="0"><table><thead><tr><th>Competentie</th><th>Beoordeling</th><th>Bewijs</th><th>Volgende stap</th></tr></thead><tbody>${g.items.map(i=>`<tr><td>${esc(i.text)}</td><td><span class="status-tag ${statusClass(i.status)}">${i.status}</span></td><td>${esc(i.evidence)}</td><td>${esc(i.next)}</td></tr>`).join('')}</tbody></table></div>`).join('')}<p>Totaalstatus: <span class="status-tag ${statusClass(s.overall)}">${s.overall}</span></p></div>`; }
    if(f.type==='pptx')return `<div class="ppt-preview"><span class="eyebrow">HET ORIGINELE NO-CODE PROTOTYPE</span><h3>TravelHelp in PowerPoint</h3><p>Het definitieve bestand heeft acht dia’s met drie klikbare routes, systeemstappen, veiligheidsregels en een testoverzicht. Je kunt de drie voorbeeldroutes ook direct op deze site doorlopen.</p><div class="ppt-actions"><button class="button button-dark" data-file="special">Probeer de webweergave ${icon('arrow-right')}</button><a class="button button-outline" href="${url(f.url)}" download>${icon('download')} Download PowerPoint</a></div><div class="ppt-outline">${['Start · kies een route','Bagage en check-in','Wijzigen of annuleren','Dubbele afschrijving','Samenvatting voor de medewerker','Van vraag naar antwoord','Wanneer stopt de AI?','Testoverzicht'].map((t,i)=>`<div><span>0${i+1}</span>${t}</div>`).join('')}</div></div>`;
    return `<a class="button button-dark" href="${url(f.url)}" download>${icon('download')} Download ${esc(f.name)}</a>`;
  }
  function renderCompare() {
    const v=version=>url(files.find(f=>f.type==='png'&&f.name.startsWith('5.3')&&f.name.includes('versie '+version)).url);
    return `<div class="compare-intro"><span class="eyebrow">EEN ZICHTBARE ITERATIE</span><h3>Van controleren naar beslissen</h3><p>Sleep de lijn of gebruik de pijltjestoetsen op de schuifregelaar om de twee versies te vergelijken.</p></div><div class="compare-labels"><span>VERSIE 1 · DE BASIS</span><span>VERSIE 2 · DE VERBETERING</span></div><div class="comparison" style="--split:50%"><img class="compare-base" src="${v(2)}" alt="Checklist versie 2, met doel, ontbrekende informatie, risico en een eindbeslissing"><div class="compare-overlay"><img src="${v(1)}" alt="Checklist versie 1, gericht op stelling, bewijs, bron en aannames"></div><div class="compare-line" aria-hidden="true"><span>↔</span></div><input type="range" min="0" max="100" value="50" id="compare-range" aria-label="Vergelijk checklistversies: percentage van versie 1"></div><div class="comparison-controls"><button class="file-chip" data-compare="100">Alleen versie 1</button><button class="file-chip" data-compare="50">Naast elkaar schuiven</button><button class="file-chip" data-compare="0">Alleen versie 2</button></div><div class="improvement-list">${['Doel en situatie','Bewijs los van conclusie','Ontbrekende gegevens','Taken versus beroep','Risico van een fout','Een menselijke eindbeslissing'].map((s,i)=>`<span><b>0${i+1}</b>${s}</span>`).join('')}</div><p class="prototype-note">De iteratie is gebaseerd op mijn controle van een voorbeeldantwoord. Een test met echte gebruikers is een volgende stap.</p>`;
  }
  function renderTravel() {
    return `<div class="travel-demo"><div class="travel-top"><span class="travel-logo">${icon('plane')} TravelHelp</span><span><i class="live-dot"></i> Klikbaar prototype</span></div><div class="travel-body" id="travel-body"><div class="travel-welcome"><span class="chatbot-avatar">${icon('message')}</span><h3>Waarmee kan ik je helpen?</h3><p>Drie vragen. Drie routes. De mens houdt de controle.</p></div><div class="travel-routes">${[{id:'baggage',icon:'plane',title:'Bagage & check-in',text:'Een vraag beantwoorden'},{id:'cancel',icon:'clock',title:'Wijzigen of annuleren',text:'De juiste vervolgstap kiezen'},{id:'payment',icon:'lock',title:'Dubbele afschrijving',text:'Veilig overdragen aan een mens'}].map(r=>`<button data-travel="${r.id}"><span>${icon(r.icon)}</span><strong>${r.title}</strong><small>${r.text}</small>${icon('arrow-up-right')}</button>`).join('')}</div></div><div class="travel-bottom">${icon('lock')} Vaste voorbeeldroutes uit mijn PowerPoint-prototype · Er wordt geen echte AI of klantenservice aangeroepen.</div></div>`;
  }
  const travelRoutes={
    baggage:{question:'Hoeveel handbagage mag ik meenemen?',answer:'Dat verschilt per luchtvaartmaatschappij en tickettype. Controleer daarom de bagageregels in je boekingsbevestiging of bij de airline. Ik kan je helpen zoeken als je de airline en het tarief noemt.',action:'Welke luchtvaartmaatschappij en welk tickettype staan in je boeking?',label:'DOORVRAGEN',explanation:'Geen vaste kilo’s verzinnen. De bron en de boekingssituatie bepalen het antwoord.'},
    cancel:{question:'Ik wil mijn vlucht van morgen annuleren.',answer:'Omdat je vlucht binnen 48 uur vertrekt, laat ik een medewerker de voorwaarden en eventuele kosten controleren. Ik beloof geen restitutie voordat dit is nagekeken.',action:'Maak overdracht naar een medewerker',label:'MENSELIJKE CONTROLE',explanation:'Intentie: annuleren. Risico: vertrek binnen 48 uur. Besluit: menselijke controle.'},
    payment:{question:'Mijn vlucht lijkt twee keer afgeschreven. Kunnen jullie dat terugstorten?',answer:'Vervelend. Ik kan geen terugbetaling toezeggen, maar ik maak direct een overdracht. Deel géén volledige betaalkaartgegevens. Alleen boekingsnummer, datum en bedragen zijn nodig.',action:'Bekijk de overdracht',label:'DIRECT NAAR EEN MENS',explanation:'Een geldkwestie vraagt om beoordeling. Volledig kaartnummer, CVC en wachtwoord worden niet gevraagd of opgeslagen.'}
  };
  function runTravel(route) {
    const r=travelRoutes[route];if(!r)return;
    $('#travel-body').innerHTML=`<button class="back-link" data-reset-travel>${icon('arrow-left')} Kies een andere route</button><div class="chat-message chat-human"><small>REIZIGER</small><p>${r.question}</p></div><div class="chat-message chat-assistant"><small>${icon('message')} TRAVELHELP</small><p>${r.answer}</p></div><div class="travel-decision"><span class="eyebrow">${r.label}</span><p>${r.explanation}</p>${route==='baggage'?`<strong>${r.action}</strong>`:`<button class="button button-dark" data-handoff="${route}">${r.action} ${icon('arrow-right')}</button>`}</div>`;
  }
  function renderHandoff(route) {
    const payment=route==='payment';
    $('#travel-body').innerHTML=`<button class="back-link" data-reset-travel>${icon('arrow-left')} Terug naar de routes</button><div class="handoff-title">${icon('users')}<span class="eyebrow">CONCEPT · ALTIJD CONTROLEREN</span><h3>Overdracht aan de medewerker</h3></div><dl class="handoff-list"><div><dt>Intentie</dt><dd>${payment?'Dubbele afschrijving':'Vlucht van morgen annuleren'}</dd></div><div><dt>Klant geeft aan</dt><dd>${payment?'Twee transacties voor dezelfde boeking':'De vlucht te willen annuleren, vertrek binnen 48 uur'}</dd></div><div><dt>Benodigde gegevens</dt><dd>${payment?'Boekingsnummer, betaaldatum en twee bedragen':'Boekingsnummer en vertrekdatum'}</dd></div><div><dt>Niet opslaan</dt><dd>Volledig kaartnummer, CVC, wachtwoord</dd></div><div><dt>Gevraagde actie</dt><dd>${payment?'Controleer transacties en neem contact op':'Controleer voorwaarden en eventuele kosten'}</dd></div></dl><div class="handoff-note">${icon('check')} De medewerker neemt de beslissing. Dit prototype verstuurt geen gegevens.</div>`;
  }
  const flowSteps=[['Invoer','Formuliergegevens, bedrijfskenmerken en relevante acties. Alleen gegevens die nodig zijn.','folder'],['Datacontrole','Lege velden, dubbele contacten en onlogische waarden worden gemarkeerd.','scan'],['Prioriteit','Een classificatiemodel geeft lage, normale of hoge prioriteit. Dit is een voorspelling.','sparkles'],['Uitleg','De medewerker ziet de belangrijkste redenen voor de voorgestelde prioriteit.','message'],['Menselijke keuze','Een medewerker controleert, kan de prioriteit aanpassen en kiest de vervolgstap. Nooit automatisch afwijzen.','users'],['CRM & feedback','Een taak, reactie of extra vraag. Later volgt feedback op de prioriteit en evaluatie van fouten en verschillen.','refresh']];
  function renderFlow() {
    return `<div class="flow-demo"><span class="eyebrow">LEADFOCUS · VAN AANVRAAG NAAR AANDACHT</span><h3>Een model is maar één onderdeel.</h3><p>Klik op een stap. Ontdek waar data, techniek en de mens samenkomen.</p><div class="flow-steps">${flowSteps.map((s,i)=>`<button data-flow="${i}" class="${i===4?'human-step':''} ${i===0?'active':''}" aria-pressed="${i===0}"><span>${icon(s[2])}</span><small>0${i+1}</small><strong>${s[0]}</strong></button>`).join('')}</div><div id="flow-explanation" class="flow-explanation" role="status"><span>01</span><div><h4>${flowSteps[0][0]}</h4><p>${flowSteps[0][1]}</p></div></div><div class="flow-guardrail">${icon('users')} Een lead wordt nooit automatisch afgewezen. De medewerker blijft verantwoordelijk.</div></div>`;
  }

  function setFullscreen() {
    if(document.fullscreenElement)document.exitFullscreen?.().catch(()=>toast('Gebruik de volledig-schermknop van je browser.'));
    else if(document.documentElement.requestFullscreen)document.documentElement.requestFullscreen().catch(()=>toast('Gebruik de volledig-schermknop van je browser.'));
    else toast('Volledig scherm: gebruik de volledig-schermknop van je browser.');
  }
  function startPresentation() {
    if(dialog.open)closeAssignment();if($('#help-dialog').open)$('#help-dialog').close();
    tourFocus=document.activeElement;presenting=true;document.body.classList.add('is-presenting');
    $('.sidebar').inert=true;$('.app-shell').inert=true;$('.skip-link').inert=true;
    const el=$('#presentation');el.hidden=false;el.setAttribute('aria-hidden','false');renderPresentation();
    $('#tour-title').focus({preventScroll:true});
  }
  function endPresentation() {
    if(dialog.open)closeAssignment();presenting=false;pauseMedia($('#presentation'));
    $('#presentation').hidden=true;$('#presentation').setAttribute('aria-hidden','true');$('#presentation').innerHTML='';
    document.body.classList.remove('is-presenting');$('.sidebar').inert=false;$('.app-shell').inert=false;$('.skip-link').inert=false;
    if(tourFocus?.isConnected)tourFocus.focus({preventScroll:true});
  }
  function renderPresentation() {
    const s=tour[tourIndex],a=s.id?getAssignment(s.id):null;
    try{localStorage.setItem('growth-tour-step',tourIndex);}catch(_){}
    let visual='';
    if(s.type==='intro')visual=orbitMarkup(true);
    else if(s.type==='score')visual=`<div class="tour-score">${scoreGraphic(true)}<button class="button button-outline" data-open="1.1">Bekijk de scorekaarten ${icon('arrow-up-right')}</button></div>`;
    else if(s.type==='assignment') {
      if(a.id==='2.2')visual=`<div class="tour-art tour-quartet"><span class="tour-art-number">24</span><span>technieken · zes kwartetten</span><div class="tour-art-icons">${['sparkles','layers','eye','message','chart','workflow'].map(n=>icon(n)).join('')}</div><button class="button button-dark" data-open="${a.id}">${icon('cards')} Open het kwartet</button></div>`;
      if(a.id==='3.4')visual=`<div class="tour-art tour-travel"><span class="chatbot-avatar">${icon('message')}</span><h3>TravelHelp</h3><p>Antwoorden. Doorvragen. Overdragen.</p><div class="tour-route-preview"><span>${icon('plane')} Bagage</span><span>${icon('clock')} Annuleren</span><span>${icon('lock')} Betalen</span></div><button class="button button-dark" data-open="${a.id}">Probeer de drie routes ${icon('arrow-right')}</button></div>`;
      if(a.id==='4.2')visual=`<div class="tour-art tour-claim"><span class="eyebrow">DE CLAIM</span><strong>+14<span>%</span></strong><p>“Iedere marketingmedewerker productiever”</p><div class="claim-verdict">${icon('scan')} Onderzoek ging over klantenservice.<br>Een echte bron, te breed toegepast.</div><button class="button button-dark" data-open="${a.id}">Bekijk de vijf controles ${icon('arrow-up-right')}</button></div>`;
      if(a.id==='5.3')visual=`<div class="tour-art tour-checklist"><div class="checklist-versions"><span>v1</span>${icon('arrow-right')}<span>v2</span></div><h3>6 verbeteringen.<br>Een betere beslissing.</h3><p>Doel · bewijs · context · ontbrekende gegevens · risico · menselijke controle</p><button class="button button-dark" data-open="${a.id}">Schuif tussen de versies ${icon('layers')}</button></div>`;
      if(a.id==='6.3'){const f=assignmentFiles(a).find(f=>f.type==='mp4');visual=`<div class="tour-video"><video controls playsinline preload="metadata" poster="${f.poster}"><source src="${url(f.url)}" type="video/mp4"></video><button class="text-link" data-open="${a.id}">Open het ontwerp & AI-kompas ${icon('arrow-up-right')}</button></div>`;}
    }
    else if(s.type==='manifest')visual=`<div class="tour-art tour-manifest"><span class="manifest-large-star">✳</span><blockquote>“Snelheid en gemak zijn nuttig, maar niet belangrijker dan mensen eerlijk behandelen.”</blockquote><span>UIT MIJN PERSOONLIJKE AI-MANIFEST</span><button class="button button-dark" data-open="6.4">Lees mijn hele manifest ${icon('arrow-up-right')}</button></div>`;
    else visual=`<div class="tour-art tour-next">${icon('target')}<h3>Mijn volgende stap</h3><ol><li>Echte gebruikers betrekken</li><li>Feedback vastleggen</li><li>Praktijkimpact meten</li></ol><button class="button button-dark" data-end-tour>Verder praten met mijn portfolio ${icon('arrow-up-right')}</button></div>`;
    $('#presentation').innerHTML=`<div class="presentation-top"><a class="tour-brand" href="#overzicht" data-end-tour><span class="brand-mark small">m<span>g</span><i></i></span> Growth Map <span>/ Freek van Rijn</span></a><div><button class="icon-button ${showNotes?'is-active':''}" data-toggle-notes aria-label="${showNotes?'Verberg':'Toon'} spreeknotities" aria-pressed="${showNotes}">${icon('note')}</button><button class="icon-button" data-fullscreen aria-label="Volledig scherm">${icon('expand')}</button><button class="button button-outline button-small" data-end-tour>${icon('x')} Sluit presentatie</button></div></div><div class="tour-body"><div class="tour-copy"><span class="tour-step-label"><i></i> ${String(tourIndex+1).padStart(2,'0')} / ${String(tour.length).padStart(2,'0')} <span>·</span> ${s.label.toUpperCase()}</span><h2 id="tour-title" tabindex="-1">${s.title}</h2><p>${s.text}</p>${a?`<div class="tour-assignment-label">OPDRACHT ${a.id} <span>·</span> ${a.format.toUpperCase()}</div>`:''}${showNotes?`<aside class="speaker-notes"><span>${icon('note')} SPREEKNOTITIE · ALLEEN ALS HULP</span><p>${s.prompt}</p></aside>`:''}</div><div class="tour-visual">${visual}</div></div><div class="presentation-bottom"><button class="button button-outline" data-tour-prev ${tourIndex===0?'disabled':''}>${icon('arrow-left')} Vorige</button><div class="tour-progress" role="group" aria-label="Ga naar presentatiestap">${tour.map((s,i)=>`<button class="${i===tourIndex?'active':''} ${i<tourIndex?'visited':''}" data-tour-step="${i}" aria-label="Stap ${i+1}: ${s.label}" ${i===tourIndex?'aria-current="step"':''}><span></span></button>`).join('')}<span>${tourIndex+1} van ${tour.length}</span></div><button class="button button-dark" ${tourIndex===tour.length-1?'data-end-tour':'data-tour-next'}>${tourIndex===tour.length-1?'Naar het overzicht':'Volgende'} ${icon('arrow-right')}</button></div>`;
  }
  function moveTour(delta) {pauseMedia($('#presentation'));tourIndex=Math.max(0,Math.min(tour.length-1,tourIndex+delta));renderPresentation();$('#tour-title').focus({preventScroll:true});}
  function showHelp() { if(!presenting)$('#help-dialog').showModal(); }

  document.addEventListener('click',e=>{
    const t=e.target.closest('button,a');if(!t)return;
    if(t.hasAttribute('data-open')){e.preventDefault();openAssignment(t.dataset.open);return;}
    if(t.hasAttribute('data-tour')||t.id==='start-presentation'){startPresentation();return;}
    if(t.hasAttribute('data-end-tour')){e.preventDefault();endPresentation();return;}
    if(t.hasAttribute('data-select-week')) {activeWeek=Number(t.dataset.selectWeek);$$('[data-select-week]').forEach(b=>{const sel=Number(b.dataset.selectWeek)===activeWeek;b.classList.toggle('selected',sel);b.setAttribute('aria-pressed',sel);});$('#week-spotlight').innerHTML=spotlight(activeWeek);return;}
    if(t.hasAttribute('data-kind')){filterKind=t.dataset.kind;$$('[data-kind]').forEach(b=>{const sel=b.dataset.kind===filterKind;b.classList.toggle('active',sel);b.setAttribute('aria-pressed',sel);});renderResults();return;}
    if(t.hasAttribute('data-reset-filters')){query='';filterWeek='all';filterKind='all';renderPortfolio();return;}
    if(t.hasAttribute('data-domain')){selectedDomain=t.dataset.domain;const y=window.scrollY;renderGrowth();window.scrollTo(0,y);return;}
    if(t.hasAttribute('data-close-detail')){closeAssignment();return;}
    if(t.hasAttribute('data-close-for-route')){closeAssignment();return;}
    if(t.hasAttribute('data-close-help')){$('#help-dialog').close();return;}
    if(t.hasAttribute('data-detail-tab')){pauseMedia(dialog);detailTab=t.dataset.detailTab;renderDetail();$(`[data-detail-tab="${detailTab}"]`).focus();return;}
    if(t.hasAttribute('data-file')){pauseMedia(dialog);dialogFile=t.dataset.file;detailTab='work';renderDetail();$(`[data-file="${CSS.escape(dialogFile)}"]`)?.focus({preventScroll:true});return;}
    if(t.hasAttribute('data-next-assignment')){const i=assignments.indexOf(dialogAssignment);pauseMedia(dialog);const a=assignments[(i+1)%assignments.length];if(!presenting)location.hash='opdracht-'+a.id.replace('.','-');else openAssignment(a.id,false);return;}
    if(t.hasAttribute('data-compare')){const v=t.dataset.compare;$('#compare-range').value=v;$('.comparison').style.setProperty('--split',v+'%');return;}
    if(t.hasAttribute('data-travel')){runTravel(t.dataset.travel);return;}
    if(t.hasAttribute('data-reset-travel')){$('#file-preview').innerHTML=renderTravel();return;}
    if(t.hasAttribute('data-handoff')){renderHandoff(t.dataset.handoff);return;}
    if(t.hasAttribute('data-flow')){const i=Number(t.dataset.flow);$$('[data-flow]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.flow)===i);b.setAttribute('aria-pressed',Number(b.dataset.flow)===i);});$('#flow-explanation').innerHTML=`<span>0${i+1}</span><div><h4>${flowSteps[i][0]}</h4><p>${flowSteps[i][1]}</p></div>`;return;}
    if(t.id==='fullscreen-button'||t.hasAttribute('data-fullscreen')){setFullscreen();return;}
    if(t.id==='help-button'){showHelp();return;}
    if(t.hasAttribute('data-tour-next')){moveTour(1);return;}
    if(t.hasAttribute('data-tour-prev')){moveTour(-1);return;}
    if(t.hasAttribute('data-tour-step')){pauseMedia($('#presentation'));tourIndex=Number(t.dataset.tourStep);renderPresentation();return;}
    if(t.hasAttribute('data-toggle-notes')){showNotes=!showNotes;renderPresentation();return;}
  });
  document.addEventListener('input',e=>{
    if(e.target.id==='portfolio-search'){query=e.target.value;renderResults();}
    if(e.target.id==='compare-range')$('.comparison').style.setProperty('--split',e.target.value+'%');
  });
  document.addEventListener('change',e=>{if(e.target.id==='week-filter'){filterWeek=e.target.value;renderResults();}});
  document.addEventListener('keydown',e=>{
    if(e.target.closest('[role="tablist"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){
      const tabs=$$('[role="tab"]',dialog),current=tabs.indexOf(e.target);e.preventDefault();const i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(current+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[i].click();return;
    }
    const typing=/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.target.isContentEditable;
    if(typing||e.metaKey||e.ctrlKey||e.altKey)return;
    if(e.key==='Escape'&&presenting&&!dialog.open){e.preventDefault();endPresentation();return;}
    if(dialog.open||$('#help-dialog').open)return;
    if(e.key.toLowerCase()==='p'&&!presenting){e.preventDefault();startPresentation();}
    else if(e.key.toLowerCase()==='f'){e.preventDefault();setFullscreen();}
    else if(e.key==='?'&&!presenting)showHelp();
    else if(e.key==='/'&&!presenting&&$('#portfolio-search')){e.preventDefault();$('#portfolio-search').focus();}
    else if(presenting&&['ArrowRight','PageDown','ArrowLeft','PageUp'].includes(e.key)&&!['VIDEO','AUDIO'].includes(e.target.tagName)){e.preventDefault();moveTour(['ArrowRight','PageDown'].includes(e.key)?1:-1);}
    else if(presenting&&e.key.toLowerCase()==='n'){showNotes=!showNotes;renderPresentation();}
  });
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeAssignment();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeAssignment();}});
  $('#help-dialog').addEventListener('click',e=>{if(e.target===$('#help-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
  window.addEventListener('hashchange',()=>{if(presenting)endPresentation();renderRoute();});
  $('#week-nav').innerHTML=weekButtons();hydrateIcons();renderRoute();
})();

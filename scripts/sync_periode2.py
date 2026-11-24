"""Werk periode 2 bij vanuit de DOCX-bestanden in de bronmap."""
from pathlib import Path
from hashlib import sha256
import json
import re
import shutil
import sys
import unicodedata
from docx_reader import read_document

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SOURCE = Path('/Users/freekvanrijn/Documents/School/Jaar 4/Minor - AI Marketing en Salesadviseur/Periode 2/Mindset & Growth')

KNOWN = {
 '01 Reflectie gastcollege Rens Drost.docx': {
  'id': 'rens-drost', 'title': 'Reflectie gastcollege Rens Drost', 'week': 11,
  'status': 'Uitgewerkt', 'summary': 'De link tussen mijn ICT-achtergrond, Magento en AI.',
  'sources': [('AI Mindset & Growth week 1-1.pdf', 3)],
 },
 '02 Individuele opdrachten les 2.docx': {
  'id': 'vacatures', 'title': 'Vacatures en individuele reflecties', 'week': 12,
  'status': 'Individueel uitgewerkt', 'summary': 'Vijf vacatures, twee analyses en mijn eigen reflecties.',
  'note': 'Het gezamenlijke whiteboard en de gezamenlijke conclusie maak ik nog met mijn duopartner.',
  'sources': [('AI Mindset & Growth week 1-2.pdf', 15)],
 },
 '03 Huiswerk AI in de praktijk.docx': {
  'id': 'ai-in-de-praktijk', 'title': 'AI in de praktijk bij Carrefour', 'week': 12,
  'status': 'Uitgewerkt', 'summary': 'Een praktijkvoorbeeld over AI en productinformatie voor webshops.',
  'sources': [('AI Mindset & Growth week 1-2.pdf', 19)],
 },
 '04 Reflectie Alexandra invulversie.docx': {
  'id': 'feedback-alexandra', 'title': 'Reflectie op feedback van Alexandra', 'week': 14,
  'status': 'Nog invullen', 'summary': 'Een invulversie voor na de TikTok-pitch.',
  'note': 'De pitch en de feedback hebben nog niet plaatsgevonden. Deze reflectie is een voorbereiding.',
  'sources': [('AI Mindset & Growth week 1-4.pdf', 5)],
 },
}

def slug(text):
 ascii_text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
 return re.sub(r'[^a-z0-9]+', '-', ascii_text.lower()).strip('-')

def sync(source):
 source = source.resolve()
 documents = sorted((source / 'Uitwerkingen').glob('*.docx'))
 if not documents:
  raise SystemExit(f'Geen Word-bestanden gevonden in {source / "Uitwerkingen"}')
 destination = ROOT / 'portfolio' / 'periode-2'
 downloads = destination / 'opdrachten'
 lessons = destination / 'presentaties'
 downloads.mkdir(parents=True, exist_ok=True)
 lessons.mkdir(parents=True, exist_ok=True)
 entries = []
 used_ids = set()
 for document in documents:
  if document.name.startswith('~$'):
   continue
  html = read_document(document)
  entry = dict(KNOWN.get(document.name, {}))
  if not entry:
   title_match = re.search(r'<h2>(.*?)</h2>', html, re.S)
   title = re.sub('<[^>]+>', '', title_match[1]) if title_match else document.stem
   week_match = re.search(r'\bweek\s+(\d+)\b', html[:1000], re.I)
   entry = {'id': slug(document.stem), 'title': title,
            'week': int(week_match[1]) if week_match else None,
            'status': 'Nog invullen' if 'invul' in document.stem.lower() else 'Concept' if 'concept' in document.stem.lower() else 'Uitgewerkt',
            'summary': '', 'sources': []}
  if entry['id'] in used_ids:
   raise SystemExit(f'Dubbele opdracht-id: {entry["id"]}')
  used_ids.add(entry['id'])
  shutil.copy2(document, downloads / document.name)
  entry.update({'name': document.name, 'url': f'portfolio/periode-2/opdrachten/{document.name}',
                'html': html, 'sha256': sha256(document.read_bytes()).hexdigest()})
  entry['sources'] = [{'name': name, 'url': f'portfolio/periode-2/presentaties/{name}', 'page': page}
                      for name, page in entry['sources']]
  entries.append(entry)
 for presentation in sorted(source.glob('*.pdf')):
  shutil.copy2(presentation, lessons / presentation.name)
 for entry in entries:
  for ref in entry['sources']:
   if not (ROOT / ref['url']).is_file():
    raise SystemExit(f'Lesmateriaal ontbreekt: {ref["name"]}')
 payload = {'entries': entries}
 serialized = json.dumps(payload, ensure_ascii=False, indent=2)
 (ROOT / 'data' / 'periode2.json').write_text(serialized + '\n')
 (ROOT / 'data' / 'periode2.js').write_text('window.PERIODE2_DATA = ' + serialized + ';\n')
 index_file = ROOT / 'index.html'
 index = index_file.read_text()
 for relative in ['data/periode2.js', 'data/content.js', 'app.js', 'portfolio.css']:
  version = sha256((ROOT / relative).read_bytes()).hexdigest()[:12]
  index = re.sub(r'((?:src|href)="' + re.escape(relative) + r')(?:\?v=[^"\s]*)?"',
                 lambda m: m[1] + '?v=' + version + '"', index)
 index_file.write_text(index)
 print(f'Periode 2 bijgewerkt: {len(entries)} Word-bestanden en {len(list(lessons.glob("*.pdf")))} presentaties.')

if __name__ == '__main__':
 sync(Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SOURCE)

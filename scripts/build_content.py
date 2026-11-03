"""Import approved portfolio files without modifying the originals.
Usage: python3 scripts/build_content.py '/path/to/Mindset & Growth'
"""
from pathlib import Path
from zipfile import ZipFile
from html import escape
import xml.etree.ElementTree as ET
import json, shutil, sys, re, subprocess
from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent.parent
SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('/Users/freekvanrijn/Documents/MINOR/Mindset & Growth')
DEST = ROOT / 'portfolio' / 'definitief'
DEST.mkdir(parents=True, exist_ok=True)
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
N = {'w': W[1:-1]}

def read_document(path):
    with ZipFile(path) as z:
        body = ET.fromstring(z.read('word/document.xml')).find(W+'body')
        rels = {}
        if 'word/_rels/document.xml.rels' in z.namelist():
            for el in ET.fromstring(z.read('word/_rels/document.xml.rels')):
                if el.get('TargetMode') == 'External': rels[el.get('Id')] = el.get('Target')
        def inline(el):
            result = ''
            for c in el:
                if c.tag == W+'r':
                    text = ''.join(escape(t.text or '') if t.tag == W+'t' else '<br>' if t.tag == W+'br' else ' ' if t.tag == W+'tab' else '' for t in c)
                    props = c.find(W+'rPr')
                    if props is not None:
                        b, i = props.find(W+'b'), props.find(W+'i')
                        if b is not None and b.get(W+'val') not in ['0','false']: text = '<strong>'+text+'</strong>'
                        if i is not None and i.get(W+'val') not in ['0','false']: text = '<em>'+text+'</em>'
                    result += text
                elif c.tag == W+'hyperlink':
                    text = inline(c); url = rels.get(c.get(R+'id'),'')
                    result += '<a href="'+escape(url,quote=True)+'" target="_blank" rel="noopener noreferrer">'+text+'</a>' if url.startswith(('https://','http://')) else text
            return result
        def paragraph(el):
            text = inline(el)
            if not re.sub('<[^>]+>','',text).strip(): return ''
            style = el.find('w:pPr/w:pStyle',N)
            sty = (style.get(W+'val','') if style is not None else '').lower()
            if sty in ['title','titel']: return '<h2>'+text+'</h2>'
            if 'heading' in sty or 'kop' in sty:
                num = re.search(r'\d',sty)
                level = min(4,int(num.group())+1) if num else 3
                return f'<h{level}>{text}</h{level}>'
            num = el.find('w:pPr/w:numPr',N)
            if num is not None: return '<p class="list-paragraph"><span aria-hidden="true">•</span> '+text+'</p>'
            return '<p>'+text+'</p>'
        html = []
        for el in body:
            if el.tag == W+'p': html.append(paragraph(el))
            if el.tag == W+'tbl':
                rows=[]
                for ri,row in enumerate(el.findall(W+'tr')):
                    cells=[]
                    for cell in row.findall(W+'tc'):
                        tag='th' if ri==0 else 'td'
                        span=cell.find('w:tcPr/w:gridSpan',N)
                        extra=f' colspan="{int(span.get(W+"val"))}"' if span is not None else ''
                        scope=' scope="col"' if ri==0 else ''
                        cells.append(f'<{tag}{extra}{scope}>'+''.join(paragraph(p) for p in cell.findall(W+'p'))+f'</{tag}>')
                    rows.append('<tr>'+''.join(cells)+'</tr>')
                html.append('<div class="table-scroll" tabindex="0"><table>'+''.join(rows)+'</table></div>')
        return '\n'.join(html)

files=[]
for p in sorted((SOURCE/'Inlevermap').iterdir()):
    if not p.is_file() or p.name.startswith('.'): continue
    shutil.copy2(p, DEST/p.name)
    item={'name':p.name,'url':'portfolio/definitief/'+p.name,'type':p.suffix[1:],'size':p.stat().st_size}
    if p.suffix=='.docx': item['html']=read_document(p)
    if p.suffix in ['.mp4','.mp3']:
        probe=json.loads(subprocess.check_output(['ffprobe','-v','quiet','-show_format','-show_streams','-of','json',str(p)]))
        item['duration']=round(float(probe['format']['duration']))
        item['durationLabel']=f"{item['duration']//60}:{item['duration']%60:02d}"
        if p.suffix=='.mp4':
            stem=p.name[:3].replace('.','-')
            image=ROOT/'assets'/'media'/f'video-{stem}.jpg'
            subprocess.run(['ffmpeg','-loglevel','error','-y','-ss','12','-i',str(p),'-frames:v','1','-vf','scale=1000:-1','-q:v','3',str(image)],check=True)
            item['poster']=str(image.relative_to(ROOT))
    files.append(item)

scorefiles=sorted((SOURCE/'Inlevermap').glob('*.xlsx'),key=lambda p:'eindmeting' in p.name)
score=[]
for p in scorefiles:
    s=load_workbook(p,data_only=True).active
    groups=[]
    for title,rows,summary in [('Mens & AI',[9,10,11],29),('AI-systemen',[14,15,16],30),('Ethiek',[19,20,21],31),('Technieken & toepassingen',[24,25,26],32)]:
        groups.append({'name':title,'status':s[f'F{summary}'].value,'items':[{'text':s[f'A{r}'].value,'status':s[f'G{r}'].value,'evidence':s[f'H{r}'].value,'next':s[f'J{r}'].value} for r in rows]})
    score.append({'name':'Eindmeting' if 'eindmeting' in p.name else 'Startmeting','overall':s['H29'].value,'groups':groups})

(ROOT/'data'/'portfolio.json').write_text(json.dumps({'files':files,'scorecards':score},ensure_ascii=False,indent=2))
# Also expose content as a plain script so the portfolio can be opened directly from disk.
(ROOT/'data'/'portfolio.js').write_text('window.PORTFOLIO_DATA = '+json.dumps({'files':files,'scorecards':score},ensure_ascii=False)+';\n')
week6=SOURCE/'presentaties'/'AI Mindset & Growth week 6 Ethiek.pdf'
shutil.copy2(week6,ROOT/'portfolio'/'presentaties'/week6.name)
robot=SOURCE/'opdrachten'/'21 - Week 6 - Robotiseringsoplossing creëren'/'assets'/'6.3 - magazijnrobot en menselijke controle.png'
shutil.copy2(robot,ROOT/'assets'/'media'/'smart-warehouse.png')
print(f'Imported {len(files)} final files, {sum("html" in f for f in files)} readable documents, 2 scorecards.')

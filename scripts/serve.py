"""A local, private preview for the Growth Map. Run with python3 scripts/serve.py."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser

root = Path(__file__).resolve().parent.parent
for port in range(8100, 8120):
    try:
        server = ThreadingHTTPServer(('127.0.0.1', port), partial(SimpleHTTPRequestHandler, directory=str(root)))
        break
    except OSError:
        continue
else:
    raise SystemExit('Geen vrije poort gevonden. Open index.html rechtstreeks in je browser.')
address = f'http://127.0.0.1:{port}'
print(f'Growth Map staat klaar op {address}\nLaat dit venster open tijdens je presentatie. Stoppen: Ctrl+C.', flush=True)
webbrowser.open(address)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('\nPresentatie gestopt.')
finally:
    server.server_close()

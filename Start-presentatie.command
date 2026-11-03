#!/bin/zsh
# Starts this portfolio from its own folder; no internet or installation needed.
cd -- "${0:A:h}" || exit 1
if command -v python3 >/dev/null 2>&1; then
  python3 scripts/serve.py
else
  open index.html
fi

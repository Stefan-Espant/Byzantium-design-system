#!/bin/bash
set -e

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
NUXT_BIN="$REPO_DIR/node_modules/.pnpm/node_modules/.bin/nuxt"
DIST_DIR="$REPO_DIR/playground/.output/public"
PORT=3000

echo "▶ Stopping any running preview servers..."
pkill -f "http.server|serve.*dist|serve.*public" 2>/dev/null || true
sleep 1

echo "▶ Building playground..."
cd "$REPO_DIR/playground"
"$NUXT_BIN" generate

echo "▶ Starting preview on http://localhost:$PORT ..."
cd "$REPO_DIR"
# Use serve with --single so client-side routing works
npx serve "$DIST_DIR" --single --listen "$PORT" 2>/dev/null || \
  python3 -c "
import http.server, socketserver, os, urllib.parse

PORT = $PORT
DIR  = '$DIST_DIR'

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def do_GET(self):
        path = urllib.parse.unquote(self.path.split('?')[0])
        full = os.path.join(DIR, path.lstrip('/'))
        if not os.path.exists(full) or os.path.isdir(full):
            # Try /path/index.html first, then fallback to 200.html
            idx = os.path.join(DIR, path.lstrip('/'), 'index.html')
            if os.path.exists(idx):
                self.path = path.rstrip('/') + '/index.html'
            else:
                self.path = '/200.html'
        return super().do_GET()
    def log_message(self, fmt, *args):
        pass

with socketserver.TCPServer(('', PORT), SPAHandler) as httpd:
    print(f'  Listening on http://localhost:{PORT}')
    httpd.serve_forever()
"

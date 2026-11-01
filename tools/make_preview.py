#!/usr/bin/env python3
"""Gói cả web thành MỘT file HTML duy nhất để xem thử (không cần máy chủ). Chạy: python3 tools/make_preview.py <file ra>.
Gộp CSS, JS, dữ liệu bài và câu đố; nhúng phông chữ. Không gói Stockfish nên trang 'Đánh với máy' không chạy trong bản xem thử."""
import re, sys, os, base64, glob
out = sys.argv[1]
html = open('index.html', encoding='utf-8').read()
def rd(p): return open(p, encoding='utf-8').read()
def esc_js(s): return s.replace('</script', '<\\/script')
def font_inline(css, base):
    def sub(m):
        path = os.path.normpath(os.path.join(base, m.group(1)))
        if not os.path.exists(path): return m.group(0)
        return 'url(data:font/woff2;base64,' + base64.b64encode(open(path, 'rb').read()).decode() + ')'
    return re.sub(r'url\(([^)]+\.woff2)\)', sub, css)
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', lambda m: '<style>' + font_inline(rd(m.group(1)), os.path.dirname(m.group(1))) + '</style>', html)
extra = ''.join('<script>' + esc_js(rd(f)) + '</script>\n' for f in sorted(glob.glob('data/puz/*.js')) + sorted(glob.glob('data/lessons/*.js'))
                if os.path.basename(f) != 'index.js')
# dữ liệu nạp theo nhu cầu được nhúng sẵn (bộ nạp kiểm window.PUZT / window.LESSONS trước khi tải file)
html = re.sub(r'<script src="([^"]+)"></script>', lambda m: '<script>' + esc_js(rd(m.group(1))) + '</script>' + (extra if m.group(1) == 'js/lessons.js' else ''), html)
open(out, 'w', encoding='utf-8').write(html)
print(out, round(len(html.encode()) / 1e6, 2), 'MB')

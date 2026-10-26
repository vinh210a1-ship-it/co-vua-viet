"""Tạo bản kiểm duyệt cho giáo viên: gom mọi nhận định (ý tưởng, điểm mạnh/yếu, kế hoạch, lời khuyên) của từng khai cuộc
vào một file Markdown có ô tích, để duyệt hoặc sửa.   Chạy:  python3 tools/content/make_review.py"""
import json, os, glob

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, 'docs', 'DUYET-NOI-DUNG.md')

def load(path):
    s = open(path, encoding='utf-8').read()
    return json.loads(s[s.index(']=') + 2:].rstrip().rstrip(';'))

files = [f for f in sorted(glob.glob(os.path.join(ROOT, 'data', 'lessons', '*.js'))) if not f.endswith('index.js')]
data = [load(f) for f in files]
data.sort(key=lambda d: (d['opening'].get('level', 1), d['opening']['name_vi']))
L = ['# Bản kiểm duyệt nội dung khai cuộc', '',
     'File này do máy tự gom từ `data/lessons/`. **Các nước đi, tên khai cuộc, đánh giá thế cờ và đáp án puzzle đã được máy kiểm** (python-chess và Stockfish).',
     'Những phần dưới đây là **nhận định của người soạn, chưa có nguồn tham khảo**, cần giáo viên đọc và duyệt: ý tưởng, điểm mạnh, điểm yếu, kế hoạch hai bên, lời khuyên, và lời giải thích từng nước.',
     'Cách duyệt: đọc từng mục, tích `[x]` nếu đồng ý; nếu cần sửa, ghi chú ngay dưới mục đó.', '']
for d in data:
    o = d['opening']
    L += [f"## {o['name_vi']} ({o['name_en']})", '', f"- [{"x" if o.get("reviewed") else " "}] Đã duyệt toàn bộ khai cuộc này  · mã ECO {o['eco']} · {len(d['variations'])} biến thể · {len(d['puzzles'])} puzzle", '',
          f"**Câu giới thiệu:** {o['tagline']}", '', '**Ý tưởng:**']
    L += [f'- {x}' for x in o['idea']]
    L += ['', '**Điểm mạnh:**'] + [f'- {x}' for x in o['strengths']]
    L += ['', '**Điểm yếu:**'] + [f'- {x}' for x in o['weaknesses']] + ['']
    for v in d['variations']:
        L += [f"### {v['name_vi']}", '', f"- [{"x" if o.get("reviewed") else " "}] Đã duyệt  · nước đi: `{v['moves']}` · tên Lichess: {v['lichess_name']} · máy chấm {v['eval_cp']:+d} centipawn (Trắng dương)", '',
              f"**Ý tưởng:** {v['idea']}", '', '**Điểm mạnh:** ' + ' / '.join(v['strengths']), '', '**Điểm yếu:** ' + ' / '.join(v['weaknesses']), '',
              f"**Kế hoạch Trắng:** {v['plan_w']}", '', f"**Kế hoạch Đen:** {v['plan_b']}", '', f"**Lời khuyên:** {v['tip']}", '']
    L += ['---', '']
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write('\n'.join(L))
print('Đã ghi', OUT, f'({len(data)} khai cuộc)')

"""Tạo lại các file dữ liệu trong thư mục data/ từ nguồn.

Cần: python-chess (pip install chess) và Stockfish (apt-get install stockfish).
Chạy từ thư mục gốc của kho:  python3 tools/make_data.py
"""
import json, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(ROOT, 'tools')
BUILD = os.path.join(TOOLS, 'build')
os.makedirs(BUILD, exist_ok=True)
env = dict(os.environ, PYTHONPATH=TOOLS)

def run(script, *args):
    subprocess.run([sys.executable, os.path.join(TOOLS, script), *args], cwd=BUILD, env=env, check=True)

run('check_dataset.py', os.path.join(TOOLS, 'sources'))   # kiểm mọi dòng khai cuộc đi hợp lệ, tạo openings_all.json
run('build_data.py')                                       # kiểm các bài Caro-Kann
run('build_puzzles.py')                                    # sinh và kiểm puzzle bằng Stockfish

data = json.load(open(os.path.join(BUILD, 'data.json'), encoding='utf-8'))
op = {'opening': data['opening'], 'variations': data['variations'], 'trap': data['trap']}
dump = lambda o: json.dumps(o, ensure_ascii=False, separators=(',', ':'))
with open(os.path.join(ROOT, 'data', 'caro-kann.js'), 'w', encoding='utf-8') as f:
    f.write('/* Tạo bởi tools/make_data.py. Đừng sửa tay. */\nconst OP = ' + dump(op) + ';\nconst PUZ = ' + dump(data['puzzles']) + ';\n')
with open(os.path.join(ROOT, 'data', 'openings-all.js'), 'w', encoding='utf-8') as f:
    f.write('/* Tên và nước mở đầu khai cuộc: lichess-org/chess-openings (CC0). Tạo bởi tools/make_data.py. */\nconst ALL = '
            + open(os.path.join(BUILD, 'openings_all.json'), encoding='utf-8').read() + ';\n')
print('Xong. Đã ghi data/caro-kann.js và data/openings-all.js')

import csv, io, sys, chess, re, json
D=sys.argv[1]
rows=[]
for f in 'abcde':
    with open(f'{D}/{f}.tsv',encoding='utf-8',newline='') as fh:
        rows+=list(csv.DictReader(fh,delimiter='\t'))
bad=[]; out=[]
for r in rows:
    b=chess.Board(); ok=True; sans=[]
    for tok in r['pgn'].split():
        if re.fullmatch(r'\d+\.+',tok) : continue
        try:
            m=b.parse_san(tok); sans.append(b.san(m)); b.push(m)
        except Exception as e:
            ok=False; break
    if not ok: bad.append(r)
    out.append([r['eco'],r['name'],' '.join(sans)])
print('tổng',len(rows),'lỗi',len(bad))
for r in bad[:5]: print(r)
json.dump(out,open('openings_all.json','w',encoding='utf-8'),ensure_ascii=False,separators=(',',':'))
import os; print(os.path.getsize('openings_all.json'),'bytes')

# Soạn bài khai cuộc (tools/content)

Mỗi khai cuộc là một file Python trong `specs/`. Máy kiểm hết mọi nước đi và chấm puzzle, rồi mới sinh ra file dữ liệu cho web trong `data/lessons/`.

## Chạy

```bash
pip install --only-binary=:all: chess        # thư viện luật cờ (gói tên là "chess")
sudo apt-get install stockfish               # máy cờ chấm thế cờ
python3 tools/content/build_lessons.py                 # tạo tất cả
python3 tools/content/build_lessons.py sicilian        # chỉ một khai cuộc
python3 tools/content/probe.py "e4 e5 Nf3 Nc6" 18 6    # xem máy chấm một thế cờ (độ sâu 18, 6 nước tốt nhất)
python3 tools/content/make_review.py                   # tạo bản kiểm duyệt cho giáo viên (docs/DUYET-NOI-DUNG.md)
```

Kết quả: `data/lessons/<id>.js`, `data/lessons/index.js`. Mọi file này là tự sinh, đừng sửa tay.
Kết quả chấm của Stockfish được lưu tạm trong `tools/build/cache.pkl` (không đưa lên kho) nên chạy lại rất nhanh.

## Cấu trúc một file `specs/<id>.py`

| Tên | Nội dung |
|---|---|
| `OPENING` | Thông tin chung: `id`, `name_vi`, `name_en`, `eco`, `side` (`'w'`/`'b'`: bên người học chơi), `first_moves`, `group`, `level` (1 dễ → 3 khó), `tagline`, `idea`, `strengths`, `weaknesses`. |
| `BASE` | Các nước chung của mọi biến thể: danh sách `(SAN, lời giải thích, [điều kiện kiểm])`. |
| `VARS` | Danh sách biến thể. Mỗi biến thể có `id`, `name_vi`, `name_en`, `idea`, `strengths`, `weaknesses`, `plan_w`, `plan_b`, `tip`, `steps` (các nước TIẾP SAU `BASE`). Tùy chọn `max_eval` (mặc định 120 centipawn). |
| `TRAPS` | Các bẫy chiếu hết: `moves` (đến trước nước chốt), `finish` (nước chiếu hết), `by` (`'w'`/`'b'`), `text`, câu hỏi, gợi ý, giải thích. |
| `PUZZLES` | Câu đố: `var` (id biến thể, hoặc `'base'`), `tag`, `line` (nước đi tới thế cờ), `ok` (đáp án), `q`, `hint`, `explain`, `tip`, tùy chọn `verify`, `distractors`, `why`, `multi_ok`. |

### Điều kiện kiểm (kiểm trên bàn cờ thật sau nước đi)

`('att','c4','f7')` quân ở c4 đánh được f7 · `('empty','e6')` · `('piece','d4','P')` loại quân (không phân màu) · `('sym','g7','b')` quân đúng màu (chữ hoa Trắng, thường Đen) · `('mob_gt','f1',0)` quân ở f1 có hơn 0 nước đi · `('no_pawn_file','c','b')` · `('can_castle','w','k')` · `('castled',)` · `('check',)` · `('mate',)` · `('capture',)` · `('pinned','c3')` · `('no_pawn_guard','d5','b')` không tốt Đen nào canh d5 · `('attacked_by','e5','w')` · `('defended','e5')`.

Mọi khẳng định trong lời giải thích có thể kiểm được thì nên có điều kiện kiểm; nếu khẳng định sai thì máy báo LỖI và không cho qua.

## Máy kiểm những gì

1. Mọi nước hợp lệ, đúng bên đi, khớp tên SAN trong file mô tả.
2. Mọi điều kiện kiểm đều đúng.
3. Thế cuối mỗi biến thể được Stockfish (độ sâu 20) chấm; nếu lệch quá `max_eval` (mặc định 1,2 tốt) thì báo lỗi.
4. Mỗi puzzle: đáp án đúng kém nước tốt nhất không quá 0,4 tốt; mỗi đáp án gây nhiễu kém ít nhất 1,2 tốt (hoặc không chiếu hết, với bài chiếu hết). Nếu còn nước khác ngang đáp án (≤ 0,25 tốt), máy cảnh báo `!` để người soạn quyết định (thêm `multi_ok=True` nếu chấp nhận).
5. Tên chính thức và mã ECO lấy từ bảng Lichess (CC0) theo VỊ TRÍ cờ, nên đúng cả khi đổi thứ tự nước.

## Quy ước về nội dung

- Lời giảng tự viết bằng tiếng Việt, không chép từ sách hay khóa học có bản quyền.
- Phần điểm mạnh, điểm yếu, kế hoạch hai bên và lời khuyên là **nhận định của người soạn**, chưa có nguồn: `opening.reviewed` luôn là `false` cho tới khi giáo viên duyệt.
- Khi đã duyệt, đổi `reviewed` thành `True` trong `OPENING` của file spec rồi chạy lại.

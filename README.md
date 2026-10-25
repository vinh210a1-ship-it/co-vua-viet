# Thư Viện Khai Cuộc

Web học cờ vua bằng tiếng Việt: tìm khai cuộc, học từng nước kèm giải thích mục đích của nước đó, xem điểm mạnh và điểm yếu của từng biến thể, rồi luyện puzzle.

Địa chỉ web: https://vinh210a1-ship-it.github.io/co-vua-viet/

## Hiện có

- Tìm trong 3.865 dòng khai cuộc (xem được nước đi).
- Bài học đầy đủ: **Phòng thủ Caro-Kann** (Advance, Exchange, Panov, Classical, một bẫy chiếu hết, 10 câu puzzle).
- Sẽ làm tiếp: Sicilian và các khai cuộc phổ biến khác, bài lý thuyết, tàn cuộc.

## Cấu trúc thư mục

| Thư mục hoặc file | Nội dung |
|---|---|
| `index.html` | Trang chính |
| `css/style.css` | Màu sắc, kiểu chữ, bố cục |
| `js/app.js` | Chương trình chạy trong trình duyệt (tìm kiếm, bàn cờ, puzzle) |
| `js/chess.js` | Thư viện luật cờ chess.js (BSD-2) |
| `data/openings-all.js` | Bảng 3.865 khai cuộc (tạo tự động, không sửa tay) |
| `data/caro-kann.js` | Bài học và puzzle Caro-Kann (tạo tự động, không sửa tay) |
| `tools/` | Tập lệnh Python tạo và kiểm chứng dữ liệu, bằng python-chess và Stockfish |

## Cách đảm bảo đáp án đúng

Mọi nước đi trong bài được kiểm bằng python-chess (hợp lệ, đúng quân, đúng ô). Mỗi câu puzzle được Stockfish chấm: mọi nước sai đều kém nước đúng từ 1,2 tốt trở lên. Các câu như "quân này đang đánh ô kia" cũng được kiểm trên bàn cờ thật. Phần điểm mạnh, điểm yếu và kế hoạch là nhận định theo nguyên lý khai cuộc phổ biến, do giáo viên duyệt.

Tạo lại dữ liệu: `pip install chess`, cài Stockfish, rồi `python3 tools/make_data.py`.

## Nguồn và giấy phép

- Mã nguồn web: GPL-3.0 (xem `LICENSE`).
- Tên và nước mở đầu khai cuộc: [lichess-org/chess-openings](https://github.com/lichess-org/chess-openings), CC0 (bản sao trong `tools/sources/`).
- Quân cờ: Colin M.L. Burnett, GPLv2 trở lên, qua lichess.org.
- Luật cờ trong trang: [chess.js](https://github.com/jhlywa/chess.js), BSD-2-Clause (xem đầu file `js/chess.js`).
- Nội dung bài giảng do thầy vinh210a1 biên soạn và duyệt. Giấy phép riêng cho phần nội dung bài giảng sẽ được chọn sau.

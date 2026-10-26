/* Từ điển cờ vua (86 mục). Soạn lại từ phần "Từ điển lý thuyết" của khóa học "Cờ vua: từ biết luật đến chơi khá",
   viết lại bằng lời đơn giản cho học sinh.
   Trường: id, t (tên tiếng Việt), en (tên quốc tế, để tra cứu), g (nhóm A-G), lv (cấp đầu tiên gặp, 0-5), m (nghĩa), e (ví dụ, có thể bỏ).
   Các mục đã đối chiếu với khóa học; nhận định "chưa xác minh" của khóa học (cặp tượng ≈ 0,5 tốt, v.v.) KHÔNG đưa vào đây. */
const GLOSSARY_GROUPS = {
  A:'Khái niệm nền', B:'Chiến thuật', C:'Mẫu chiếu hết', D:'Khai cuộc',
  E:'Cấu trúc Tốt và chiến lược', F:'Tàn cuộc', G:'Tư duy và luyện tập'
};
const GLOSSARY = [
  /* A. Khái niệm nền */
  {id:'gia-tri-quan', t:'Giá trị quân', en:'piece value', g:'A', lv:0, m:'Điểm quy ước để so sánh các quân: Tốt 1, Mã 3, Tượng 3, Xe 5, Hậu 9. Vua không tính điểm vì mất Vua là thua.', e:'Đổi Xe (5) lấy Mã (3) là bị thiệt khoảng 2 điểm.'},
  {id:'nuoc-di', t:'Nước đi, nửa nước', en:'move, ply', g:'A', lv:1, m:'Một nước gồm một lượt của Trắng và một lượt của Đen. Khi chỉ một bên đi thì gọi là nửa nước.', e:'Chiếu hết sau 2 nước của mình là 3 nửa nước tính từ lượt mình.'},
  {id:'en-passant', t:'Bắt Tốt qua đường', en:'en passant', g:'A', lv:1, m:'Khi một Tốt đi hai ô và đứng cạnh Tốt đối phương, Tốt đối phương được ăn nó như thể nó chỉ đi một ô. Phải ăn ngay ở nước kế tiếp, để lỡ là mất quyền.', e:'Tốt trắng ở e5, Đen đi Tốt d7–d5: Trắng được ăn exd6.'},
  {id:'hoa-pat', t:'Hòa pat', en:'stalemate', g:'A', lv:1, m:'Đến lượt mình đi, Vua không bị chiếu nhưng mình không còn nước đi hợp lệ nào. Ván cờ hòa.', e:'Hay gặp khi đã hơn nhiều quân mà dồn Vua đối phương vào góc quá vội.'},
  {id:'luat-50-nuoc', t:'Luật 50 nước và lặp thế 3 lần', en:'50-move rule, threefold repetition', g:'A', lv:1, m:'Sau 50 nước không ai ăn quân hay đi Tốt thì được xin hòa. Cùng một thế cờ xuất hiện 3 lần cũng được xin hòa.', e:'Chiếu liên tục mà Vua không thoát được thì ván hòa do lặp thế.'},
  {id:'uu-the', t:'Ưu thế', en:'advantage', g:'A', lv:2, m:'Điều có lợi cho một bên và đo được: hơn quân, quân đứng đẹp hơn, hoặc đi trước đối phương một nhịp.', e:'Máy báo +1,5 nghĩa là Trắng hơn tương đương khoảng 1,5 Tốt.'},
  {id:'chat-luong', t:'Chất lượng', en:'the exchange', g:'A', lv:2, m:'Phần chênh lệch giữa một Xe và một quân nhẹ (Mã hoặc Tượng). Ai lấy được Xe mà chỉ mất quân nhẹ là "được chất lượng".', e:'"Thí chất lượng" là chủ động cho Xe để lấy Mã hoặc Tượng nhằm đổi lấy một lợi ích khác.'},
  {id:'phat-trien', t:'Phát triển quân', en:'development', g:'A', lv:3, m:'Đưa quân từ ô xuất phát ra chỗ có việc để làm.', e:'Trong khai cuộc: Mã ra f3, Tượng ra c4.'},
  {id:'trung-tam', t:'Trung tâm', en:'center', g:'A', lv:3, m:'Bốn ô giữa bàn d4, e4, d5, e5 và vùng quanh chúng. Quân đứng giữa kiểm soát nhiều ô hơn quân đứng sát mép.', e:'Giống như đặt bếp ở giữa nhà: đi đâu cũng gần.'},
  {id:'nhip', t:'Nhịp', en:'tempo', g:'A', lv:3, m:'Một lượt đi được xem như một đơn vị thời gian. Ai làm được nhiều việc có ích hơn trong cùng số lượt thì "được nhịp".', e:'Vừa ra quân vừa dọa quân đối phương, bắt họ phải tránh: mình được thêm một nhịp.'},
  {id:'sang-kien', t:'Sáng kiến', en:'initiative', g:'A', lv:5, m:'Quyền ép đối phương phải lo đỡ đòn của mình, thay vì họ tự do làm việc họ muốn.', e:'Bên có sáng kiến được chọn chỗ đánh.'},

  /* B. Chiến thuật */
  {id:'don-doi', t:'Đòn đôi', en:'fork', g:'B', lv:2, m:'Một quân cùng lúc tấn công hai mục tiêu. Đối phương chỉ đỡ được một, nên mình ăn được mục tiêu còn lại.', e:'Mã vừa chiếu Vua vừa đánh Hậu.'},
  {id:'ghim', t:'Ghim', en:'pin', g:'B', lv:2, m:'Quân bị ghim không dám rời chỗ vì ngay sau nó là quân quý hơn. Ghim tuyệt đối: phía sau là Vua nên rời chỗ là phạm luật. Ghim tương đối: phía sau là quân khác, rời chỗ được nhưng thiệt.', e:'Tượng b5 ghim Mã c6 vào Vua e8.'},
  {id:'xien', t:'Xiên', en:'skewer', g:'B', lv:2, m:'Ngược với ghim: quân quý đứng phía trước bị dọa, nó phải tránh đi, và để lộ quân đứng phía sau cho mình ăn.', e:'Xe chiếu Vua, Vua tránh, Xe ăn Hậu đứng sau.'},
  {id:'quan-long', t:'Quân không được bảo vệ', en:'loose piece', g:'B', lv:2, m:'Quân không có quân nào bảo vệ. Đây là mục tiêu quen thuộc của đòn đôi.', e:'Câu cửa miệng của người chơi cờ: "quân lỏng thì rơi".'},
  {id:'tan-cong-phat-hien', t:'Tấn công phát hiện', en:'discovered attack', g:'B', lv:2, m:'Một quân bước đi để mở đường cho quân đứng sau nó tấn công. Quân vừa đi còn có thể tự gây ra một đe dọa khác.', e:'Như kéo tấm rèm sân khấu: người trước bước ra, người sau lộ diện.'},
  {id:'chieu-doi', t:'Chiếu đôi', en:'double check', g:'B', lv:2, m:'Hai quân cùng chiếu Vua một lúc. Không thể chắn hay ăn cả hai, chỉ còn cách đi Vua.', e:'Là kiểu chiếu mạnh nhất.'},
  {id:'danh-lac-huong', t:'Đánh lạc hướng', en:'deflection', g:'B', lv:4, m:'Ép một quân đang bảo vệ rời khỏi nhiệm vụ, để chỗ nó bảo vệ bị bỏ ngỏ.', e:'Thí một quân để kéo Xe đối phương rời hàng cuối, rồi chiếu hết.'},
  {id:'du', t:'Dụ', en:'decoy', g:'B', lv:4, m:'Kéo một quân của đối phương (thường là Vua) đến một ô bất lợi.', e:'Thí quân ở f7 để Vua ăn, Vua đứng ở f7 rồi bị đòn đôi.'},
  {id:'qua-tai', t:'Quá tải', en:'overloading', g:'B', lv:4, m:'Một quân phải gánh hai nhiệm vụ cùng lúc, làm không nổi cả hai.', e:'Một người bảo vệ phải trông hai cái cửa.'},
  {id:'chan', t:'Chặn đường', en:'interference', g:'B', lv:4, m:'Đặt một quân vào giữa đường liên lạc của hai quân đối phương để cắt đứt sự hỗ trợ giữa chúng.', e:'Chen vào giữa Hậu và Xe để Hậu không còn bảo vệ được Xe.'},
  {id:'don-duong', t:'Dọn đường', en:'clearance', g:'B', lv:4, m:'Đi hoặc thí quân của mình để nhường ô hay nhường đường cho quân khác.', e:'Mã bước đi để Hậu vào ô đó chiếu hết.'},
  {id:'xuyen', t:'Xuyên', en:'x-ray', g:'B', lv:4, m:'Một quân "nhìn xuyên" qua quân khác để tác động tới ô phía sau.', e:'Hai Xe chồng nhau trên một cột.'},
  {id:'nuoc-trung-gian', t:'Nước trung gian', en:'zwischenzug', g:'B', lv:4, m:'Thay vì ăn lại ngay, chèn trước một nước ép buộc (chiếu hoặc dọa) rồi mới ăn.', e:'"Khoan ăn đã, chiếu cái đã."'},
  {id:'quan-lieu-mang', t:'Quân liều mạng', en:'desperado', g:'B', lv:4, m:'Quân đằng nào cũng sắp bị mất thì nên ăn được càng nhiều càng tốt trước khi mất.', e:'Mã bị bắt, nhảy sang ăn một Tốt rồi mới bị ăn.'},
  {id:'ket-hop', t:'Chuỗi đòn kết hợp', en:'combination', g:'B', lv:4, m:'Một chuỗi nước ép buộc, thường có hy sinh quân, dẫn đến một lợi ích cụ thể.', e:'Thí Hậu rồi chiếu hết.'},
  {id:'nuoc-yen-lang', t:'Nước yên lặng', en:'quiet move', g:'B', lv:4, m:'Nước không chiếu, không ăn quân nhưng tạo ra đe dọa mà đối phương không đỡ được. Đây là loại nước hay bị bỏ sót nhất khi tính.', e:''},
  {id:'coi-xay-gio', t:'Cối xay gió', en:'windmill', g:'B', lv:5, m:'Chuỗi chiếu phát hiện lặp đi lặp lại, mỗi lần chiếu lại ăn thêm một quân.', e:'Nổi tiếng nhất trong ván Torre – Lasker năm 1925.'},

  /* C. Mẫu chiếu hết */
  {id:'hang-cuoi', t:'Chiếu hết hàng cuối', en:'back-rank mate', g:'C', lv:2, m:'Vua bị chính các Tốt của mình nhốt ở hàng cuối, một Xe hoặc Hậu chiếu theo hàng ngang là hết cờ.', e:'Nên chừa cho Vua một ô thoát ("lỗ thoáng") để tránh bị chiếu kiểu này.'},
  {id:'ma-ngop', t:'Chiếu hết ngạt', en:'smothered mate', g:'C', lv:2, m:'Vua bị chính quân mình vây kín mọi phía, một con Mã chiếu là hết cờ.', e:'Thường phải thí Hậu để dồn Vua vào góc.'},
  {id:'hai-xe', t:'Chiếu hết bằng hai Xe', en:'ladder mate', g:'C', lv:1, m:'Hai Xe thay nhau đẩy Vua về mép bàn cờ, từng hàng một như leo thang, rồi chiếu hết.', e:''},
  {id:'phap-ma-legal', t:'Bẫy Légal', en:'Légal trap', g:'C', lv:3, m:'Thí Hậu cho Tượng đối phương ăn, rồi chiếu hết bằng các quân nhẹ.', e:'Mã bị ghim vào Hậu (ghim tương đối) vẫn nhảy đi được. Nếu đối phương tham ăn Hậu thì bị chiếu hết.'},
  {id:'anastasia', t:'Chiếu hết Anastasia', en:'Anastasia\'s mate', g:'C', lv:4, m:'Mã chặn mất ô thoát của Vua, Xe chiếu hết ở cột mép (cột h).', e:''},
  {id:'a-rap', t:'Chiếu hết Ả Rập', en:'Arabian mate', g:'C', lv:4, m:'Xe và Mã phối hợp chiếu hết Vua đang ở góc bàn cờ.', e:''},
  {id:'boden', t:'Chiếu hết Boden', en:'Boden\'s mate', g:'C', lv:4, m:'Hai Tượng trên hai đường chéo cắt nhau chiếu hết Vua đã nhập thành cánh Hậu.', e:''},
  {id:'hy-lap', t:'Đòn quà Hy Lạp', en:'Greek gift', g:'C', lv:4, m:'Thí Tượng ở h7 (Bxh7+), sau đó Mã lên g5 và Hậu vào cuộc để tấn công Vua đã nhập thành.', e:''},

  /* D. Khai cuộc */
  {id:'gambit', t:'Thí quân khai cuộc', en:'gambit', g:'D', lv:3, m:'Cho đi một Tốt hay một quân ngay từ đầu ván để đổi lấy phát triển nhanh hoặc trung tâm đẹp.', e:'Gambit Hậu: 1.d4 d5 2.c4.'},
  {id:'khai-cuoc-mo', t:'Khai cuộc mở, nửa mở, đóng', en:'open, semi-open, closed game', g:'D', lv:3, m:'Mở: 1.e4 e5. Nửa mở: 1.e4 mà Đen không đáp e5. Đóng: 1.d4 d5 và thế trận khép kín hơn.', e:'Khai cuộc Ý (mở), Caro-Kann (nửa mở), Gambit Hậu (đóng).'},
  {id:'ly-thuyet', t:'Lý thuyết khai cuộc', en:'theory, "book"', g:'D', lv:3, m:'Phần nước đi mà các kỳ thủ đã nghiên cứu và ghi thành sách.', e:'"Ra khỏi sách" là lúc bắt đầu tự nghĩ.'},
  {id:'bo-khai-cuoc', t:'Bộ khai cuộc', en:'repertoire', g:'D', lv:3, m:'Danh sách các khai cuộc mình chọn dùng cố định, cho bên Trắng và cho bên Đen.', e:'Một khai cuộc khi cầm Trắng, một cách đáp 1.e4, một cách đáp 1.d4.'},
  {id:'fianchetto', t:'Fianchetto', en:'fianchetto', g:'D', lv:5, m:'Đưa Tượng lên ô b2 hoặc g2 (với Đen là b7, g7), sau khi đi Tốt lên một ô, để Tượng nhìn dọc đường chéo dài.', e:'Thường gặp trong Phòng thủ Ấn Độ của Vua.'},
  {id:'chuyen-the', t:'Chuyển thế', en:'transposition', g:'D', lv:5, m:'Hai thứ tự nước đi khác nhau nhưng dẫn đến cùng một thế cờ.', e:'Như đi hai con đường khác nhau tới cùng một ngã tư.'},

  /* E. Cấu trúc Tốt và chiến lược */
  {id:'tot-thong', t:'Tốt thông', en:'passed pawn', g:'E', lv:4, m:'Tốt không còn Tốt đối phương nào chặn hoặc ăn được trên đường đi tới hàng phong cấp.', e:'"Tốt thông phải được đẩy."'},
  {id:'tot-co-lap', t:'Tốt cô lập', en:'isolated pawn', g:'E', lv:5, m:'Tốt không có Tốt cùng màu ở hai cột bên cạnh để bảo vệ.', e:'Như người đứng một mình: mạnh khi tấn công, yếu khi bị vây.'},
  {id:'tot-chong', t:'Tốt chồng', en:'doubled pawns', g:'E', lv:5, m:'Hai Tốt cùng màu nằm trên một cột. Chúng khó bảo vệ nhau và để hở cột bên cạnh.', e:''},
  {id:'tot-lac-hau', t:'Tốt lạc hậu', en:'backward pawn', g:'E', lv:5, m:'Tốt tụt lại phía sau, không có Tốt bên cạnh che chở, và ô ngay trước nó bị đối phương khống chế.', e:'Ô trước nó dễ thành "tiền đồn" cho đối phương.'},
  {id:'tot-treo', t:'Tốt treo', en:'hanging pawns', g:'E', lv:5, m:'Cặp Tốt cạnh nhau (như c4–d4) mà hai bên không còn Tốt nào hỗ trợ.', e:'Mạnh khi đứng vững, dễ vỡ khi bị ép tiến.'},
  {id:'chuoi-tot', t:'Chuỗi Tốt', en:'pawn chain', g:'E', lv:5, m:'Các Tốt nối nhau theo đường chéo, Tốt sau bảo vệ Tốt trước. Chỗ yếu nhất là Tốt ở gốc chuỗi.', e:'Muốn phá chuỗi thì tấn công vào gốc chuỗi.'},
  {id:'dot-pha-tot', t:'Đột phá bằng Tốt', en:'pawn break', g:'E', lv:5, m:'Nước đi Tốt nhằm phá cấu trúc của đối phương và mở đường cho quân mình.', e:'…c5 trong khai cuộc Pháp.'},
  {id:'tan-cong-thieu-so', t:'Tấn công thiểu số', en:'minority attack', g:'E', lv:5, m:'Dùng ít Tốt hơn ở một cánh để đẩy lên, tạo điểm yếu trong hàng Tốt đối phương.', e:'Đẩy b4–b5 trong cấu trúc Carlsbad.'},
  {id:'o-yeu', t:'Ô yếu, lỗ hổng', en:'weak square, hole', g:'E', lv:5, m:'Ô mà không còn Tốt nào của mình bảo vệ được nữa, đối phương có thể chiếm.', e:'Như lỗ thủng trên mái nhà: kiểu gì cũng có người chui vào.'},
  {id:'tien-don', t:'Tiền đồn', en:'outpost', g:'E', lv:5, m:'Một ô yếu của đối phương mà Tốt mình bảo vệ được. Quân mình đứng đó không bị Tốt đối phương đuổi đi.', e:'Mã ở d5 trong thế Sicilian.'},
  {id:'cot-mo', t:'Cột mở, cột nửa mở', en:'open, half-open file', g:'E', lv:5, m:'Cột mở: không còn Tốt nào trên cột. Cột nửa mở: chỉ còn Tốt của đối phương. Đây là "đường cao tốc" cho Xe.', e:''},
  {id:'hang-7', t:'Hàng 7', en:'seventh rank', g:'E', lv:5, m:'Xe vào hàng 7 của đối phương sẽ ăn Tốt và ép Vua.', e:'Người ta gọi vui là "xe lợn" (pig on the 7th).'},
  {id:'tuong-tot-xau', t:'Tượng tốt, Tượng xấu', en:'good, bad bishop', g:'E', lv:5, m:'Tượng xấu là Tượng bị chính Tốt của mình, nằm trên ô cùng màu, chắn đường.', e:'Như người bị nhốt sau hàng rào nhà mình.'},
  {id:'cap-tuong', t:'Cặp Tượng', en:'bishop pair', g:'E', lv:5, m:'Giữ được cả hai Tượng khi đối phương chỉ còn một. Hai Tượng phủ cả ô sáng và ô tối nên thường có lợi, nhất là khi bàn cờ thoáng.', e:''},
  {id:'phong-ngua', t:'Phòng ngừa', en:'prophylaxis', g:'E', lv:5, m:'Đi một nước để ngăn kế hoạch của đối phương trước khi nó kịp xuất hiện.', e:'Như khóa cửa trước khi kẻ trộm tới.'},
  {id:'phong-toa', t:'Phong tỏa', en:'blockade', g:'E', lv:5, m:'Đặt quân ngay phía trước Tốt thông của đối phương để chặn nó lại. Mã là quân phong tỏa tốt nhất theo nhà chiến lược Nimzowitsch.', e:''},
  {id:'hai-diem-yeu', t:'Nguyên tắc hai điểm yếu', en:'two weaknesses', g:'E', lv:5, m:'Một điểm yếu thường giữ được. Khi tạo thêm điểm yếu thứ hai ở cánh bên kia, hàng phòng thủ dễ vỡ.', e:'Một người không thể giữ hai cửa ở xa nhau.'},
  {id:'bu-dap', t:'Bù đắp', en:'compensation', g:'E', lv:5, m:'Thiếu quân nhưng có thứ khác bù lại: sáng kiến, tấn công hay cấu trúc tốt hơn.', e:'Một Gambit hay là Gambit có bù đắp.'},
  {id:'khong-gian', t:'Không gian', en:'space', g:'E', lv:5, m:'Số ô mình kiểm soát ở phần bàn cờ của đối phương. Nhiều không gian thì dễ điều quân.', e:''},

  /* F. Tàn cuộc */
  {id:'vua-hoat-dong', t:'Vua hoạt động', en:'active king', g:'F', lv:4, m:'Ở tàn cuộc Vua là một quân chiến đấu rất tốt vì ít quân nên khó bị chiếu hết. Vua phải tiến lên giữa bàn cờ.', e:'Khai cuộc thì Vua trốn kỹ, tàn cuộc thì Vua ra trận.'},
  {id:'zugzwang', t:'Zugzwang', en:'zugzwang', g:'F', lv:4, m:'Thế cờ mà bên đang đến lượt ước gì được "bỏ lượt", vì nước đi nào cũng làm thế của mình xấu đi. (Tiếng Đức: "bắt buộc phải đi".)', e:'Hai người cùng giữ cửa; ai nhúc nhích trước là mở đường cho người kia.'},
  {id:'zugzwang-tuong-ho', t:'Zugzwang tương hỗ', en:'mutual zugzwang', g:'F', lv:4, m:'Thế cờ mà ai đến lượt đi người đó bị thiệt.', e:'Hai Vua đối đầu nhau với Tốt ở giữa.'},
  {id:'doi-vua', t:'Đối vua', en:'opposition', g:'F', lv:4, m:'Hai Vua cách nhau một số lẻ ô trên cùng cột, hàng hoặc đường chéo. Bên nào KHÔNG phải đi thì "giữ đối vua", còn bên phải đi thì phải nhường đường.', e:'Hai người chặn nhau trong hành lang hẹp: ai phải nhường trước là thua.'},
  {id:'o-then-chot', t:'Ô then chốt', en:'key squares', g:'F', lv:4, m:'Những ô mà nếu Vua bên có Tốt chiếm được thì Tốt chắc chắn phong cấp, bất kể ai đi trước.', e:'Tốt ở e4 có ô then chốt là d6, e6, f6.'},
  {id:'hinh-vuong', t:'Quy tắc hình vuông', en:'rule of the square', g:'F', lv:4, m:'Vẽ một hình vuông từ Tốt tới hàng phong cấp. Nếu Vua đối phương bước được vào hình vuông ấy thì đuổi kịp Tốt.', e:'Đo nhanh mà không cần đếm từng nước.'},
  {id:'tam-giac-hoa', t:'Tam giác hóa', en:'triangulation', g:'F', lv:4, m:'Vua đi vòng ba ô theo hình tam giác để "mất một nhịp", nhờ đó đẩy lượt phải đi sang đối phương.', e:'Đi một vòng ngắn để đối phương phải nhúc nhích trước.'},
  {id:'o-tuong-ung', t:'Ô tương ứng', en:'corresponding squares', g:'F', lv:5, m:'Các cặp ô mà Vua phòng thủ phải đứng đúng chỗ khi Vua tấn công đứng ở ô kia. Đây là dạng tổng quát của đối vua.', e:''},
  {id:'huych-vai', t:'Huých vai', en:'shouldering', g:'F', lv:5, m:'Vua dùng thân mình chắn Vua đối phương khỏi con đường nó cần đi.', e:'Như chắn người khác ở cửa.'},
  {id:'nuoc-reti', t:'Nước Réti', en:'Réti manoeuvre', g:'F', lv:5, m:'Vua đi chéo để cùng lúc đuổi Tốt của đối phương và đến gần hỗ trợ Tốt của mình.', e:'Trên bàn cờ, đường chéo dài ngang đường thẳng.'},
  {id:'lucena', t:'Thế Lucena', en:'Lucena position', g:'F', lv:5, m:'Thế thắng kinh điển của Xe và Tốt chống Xe: dùng Xe "xây cầu" để Vua thoát khỏi các nước chiếu rồi phong cấp.', e:'Bắc cầu để Vua đi qua.'},
  {id:'philidor', t:'Thế Philidor', en:'Philidor position', g:'F', lv:5, m:'Thế hòa kinh điển: Xe phòng thủ giữ hàng 3 (hàng 6 với Đen). Khi Tốt tấn công bước lên hàng 6, Xe chạy ra sau chiếu liên tục.', e:'Giữ cửa, rồi chuyển sang đánh từ phía sau.'},
  {id:'xe-sau-tot', t:'Xe đứng sau Tốt thông', en:'Tarrasch rule', g:'F', lv:5, m:'Xe nên đứng sau Tốt thông, của mình hoặc của đối phương.', e:'Tốt càng đi lên thì Xe càng mạnh.'},
  {id:'tuong-sai-mau', t:'Tượng sai màu', en:'wrong bishop', g:'F', lv:5, m:'Tốt ở cột mép cùng Tượng mà Tượng không kiểm soát được ô phong cấp. Vua phòng thủ nép vào góc là giữ được hòa.', e:'Hơn cả Tượng lẫn Tốt mà vẫn không thắng.'},
  {id:'tuong-trai-mau', t:'Tượng trái màu', en:'opposite-colored bishops', g:'F', lv:5, m:'Mỗi bên có một Tượng, hai Tượng đứng trên ô khác màu nhau. Tàn cuộc kiểu này dễ hòa dù một bên hơn 1 đến 2 Tốt.', e:''},
  {id:'phao-dai', t:'Pháo đài', en:'fortress', g:'F', lv:5, m:'Thế phòng thủ bền chắc, đối phương không phá nổi dù mình thiếu quân.', e:'Xây tường rồi ngồi yên trong đó.'},
  {id:'bang-tra', t:'Bảng tra tàn cuộc', en:'tablebase', g:'F', lv:5, m:'Cơ sở dữ liệu đã giải xong mọi thế cờ có ít quân (đến 7 quân), cho biết thắng, hòa hay thua với cách chơi hoàn hảo.', e:'Có thể tra trên lichess.org.'},

  /* G. Tư duy và luyện tập */
  {id:'chieu-an-doa', t:'Chiếu – Ăn – Dọa', en:'checks, captures, threats', g:'G', lv:2, m:'Thứ tự rà soát trước mỗi nước đi: có nước chiếu nào không, nước ăn quân nào, nước dọa nào. Xét cho cả mình lẫn đối phương.', e:'Nước chiếu xét trước vì bắt buộc đối phương phải đỡ.'},
  {id:'kiem-tra-sai-lam', t:'Kiểm tra sai lầm', en:'blunder check', g:'G', lv:2, m:'Trước khi thả tay, tự hỏi: "Sau nước này, đối phương có thể chiếu, ăn, dọa mình những gì?"', e:''},
  {id:'nuoc-ung-vien', t:'Nước ứng viên', en:'candidate moves', g:'G', lv:2, m:'Khoảng 2 đến 4 nước đáng xét nhất, liệt kê ra trước khi tính sâu từng nước.', e:''},
  {id:'cay-bien', t:'Cây biến', en:'variation tree', g:'G', lv:3, m:'Sơ đồ các nhánh nước đi khi tính toán: mình đi gì, đối phương đáp gì, mình lại đi gì.', e:''},
  {id:'dong-co-co', t:'Máy cờ', en:'engine', g:'G', lv:3, m:'Phần mềm tính nước đi, ví dụ Stockfish. Điểm dương nghĩa là Trắng hơn, và xấp xỉ bằng số Tốt hơn.', e:'Máy cho đáp án nhưng không cho lý do, nên hãy tự nghĩ trước.'},
  {id:'danh-gia-tinh', t:'Đánh giá thế cờ', en:'static evaluation', g:'G', lv:5, m:'Nhìn thế cờ và nhận xét mà không cần tính nước: ai hơn quân, Vua ai an toàn hơn, quân ai hoạt động hơn, cấu trúc Tốt thế nào.', e:''},
  {id:'elo', t:'Điểm Elo', en:'Elo rating', g:'G', lv:5, m:'Con số đo trình độ. Chênh nhau 200 điểm thì người cao hơn được kỳ vọng ăn khoảng 76% số điểm.', e:'Điểm trên các trang chơi cờ online không so trực tiếp được với điểm của liên đoàn cờ.'},
  {id:'phan-tich-sau-van', t:'Phân tích sau ván', en:'post-mortem', g:'G', lv:5, m:'Xem lại ván vừa chơi: tự phân tích trước, rồi nhờ máy kiểm tra sau.', e:''}
];

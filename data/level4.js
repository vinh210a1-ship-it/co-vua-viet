/* Cấp 4: Tấn công Vua và tàn cuộc Tốt. Soạn từ Chương 2, 5 và 6 của khóa học "Cờ vua: từ biết luật đến chơi khá",
   viết lại cho học sinh. Thế cờ và nước đáp án được kiểm bằng tools/check_lessons.js và tools/check_mates.py (Stockfish).
   Phần nhận định chiến lược chờ thầy duyệt (reviewed:false). */
const LV4 = {
  'tan-cong-lo': {title:'Tấn công lộ và chiếu đôi', reviewed:false, intro:[
    'Khi một quân đứng chắn đường của quân phía sau, chỉ cần dời quân đứng trước đi là quân phía sau lập tức tấn công. Đó là tấn công lộ, hay chiếu lộ nếu nó chiếu Vua.',
    'Nước đi của quân phía trước còn có thể tự tạo thêm một đe dọa. Một nước, hai đe dọa: đối thủ không đỡ nổi cả hai.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Điểm khác nhau giữa ghim và xiên là gì?', opts:['Ghim: quân yếu đứng trước. Xiên: quân quý đứng trước','Ghim chỉ dùng Xe','Hai đòn giống hệt nhau'], correct:0, why:'Ghim: quân yếu ở trước. Xiên: quân quý ở trước, phải tránh đi rồi mất quân phía sau.'},
    {phase:'Học', type:'show', fen:'4q1k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1', text:'Hậu trắng ở e2 nhìn lên cột e, nhưng Mã trắng ở e4 đang đứng chắn. Ở cuối cột là Hậu đen. Nếu Mã dời đi, Hậu trắng sẽ tấn công Hậu đen. Mã dời đi bằng cách nào để tự gây thêm đe dọa?'},
    {phase:'Học', type:'demo', fen:'4q1k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1', start:'Bấm nút để xem Mã dời đi.', text:'Xem tấn công lộ.', moves:[
      {m:'e4f6', t:'Mã nhảy tới f6: chiếu Vua g8 (một đe dọa), đồng thời mở cột e cho Hậu e2 đánh Hậu đen (đe dọa thứ hai).'},
      {m:'g7f6', t:'Đen phải lo chiếu trước nên ăn Mã. Hậu đen vẫn đang bị Hậu trắng tấn công.'},
      {m:'e2e8', t:'Hậu trắng ăn Hậu đen, vừa ăn vừa chiếu. Trắng hơn một Hậu.'}
    ]},
    {phase:'Học', type:'note', title:'Tấn công lộ và chiếu đôi', list:['Quân phía trước đi, quân phía sau ra đòn.','Nếu quân đi trước chiếu Vua, đối thủ phải lo chiếu trước, và quân phía sau muốn ăn gì cũng được.','Chiếu đôi: hai quân cùng chiếu một lúc. Không thể ăn hay chắn cả hai, nên chỉ còn cách đi Vua.','Vì chiếu đôi mạnh như vậy nên đôi khi có thể thí cả Hậu.'], tip:'Khi thấy quân mình đứng trước Xe, Tượng hay Hậu của mình, và phía sau hướng về Vua đối thủ, hãy tìm ô cho quân đứng trước đi sang để tạo thêm một đe dọa.'},
    {phase:'Học', type:'demo', fen:'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9', start:'Một ván nổi tiếng năm 1910 (Réti gặp Tartakower). Bấm nút để xem Trắng thí Hậu.', text:'Xem Trắng thí Hậu rồi chiếu hết bằng chiếu đôi.', moves:[
      {m:'d3d8', t:'Trắng thí Hậu! Hậu chiếu Vua đen ở e8.'},
      {m:'e8d8', t:'Vua đen ăn Hậu. Bây giờ Vua đen đứng ở d8, trên cột d.'},
      {m:'d2g5', t:'Tượng rời d2 và chiếu Vua ở d8. Cùng lúc Xe d1 được mở đường, cũng chiếu Vua. Đây là chiếu đôi: Vua bắt buộc phải đi.'},
      {m:'d8c7', t:'Vua đen đi sang c7 (nếu đi e8 thì Xe d8 chiếu hết).'},
      {m:'g5d8', t:'Tượng đi d8: chiếu hết! Đen có Hậu và quân nhưng vẫn thua.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'4q1k1/5ppp/8/8/4N3/8/4QPPP/6K1 w - - 0 1', answer:['e4f6'], text:'Bây giờ bạn làm lại. Trắng đi: hãy dời Mã để chiếu Vua và mở đường cho Hậu cùng lúc.', hint:'Mã cần nhảy tới một ô để chiếu Vua ở g8. Mã e4 chiếu được g8 từ ô nào?', why:'Mã f6 chiếu Vua và mở cột e. Đen mất Hậu.'},
    {phase:'Tự làm', type:'run', theme:'discoveredAttack', band:'de', n:5},
    {phase:'Chốt', type:'quiz', q:'Chiếu đôi chỉ đỡ được bằng cách nào?', opts:['Đi Vua','Ăn một trong hai quân chiếu','Chắn đường chiếu'], correct:0, why:'Hai quân chiếu từ hai hướng, không thể ăn hay chắn cả hai trong một nước, nên bắt buộc phải đi Vua.'}
  ]},

  'lac-huong': {title:'Đánh lạc hướng, dụ, quá tải', reviewed:false, intro:[
    'Một thế phòng thủ thường dựa vào vài quân đang "canh gác". Muốn tấn công thì phải phá những quân canh đó.',
    'Có ba cách: kéo quân canh đi chỗ khác, dụ quân đối thủ tới ô xấu, hoặc bắt một quân gánh quá nhiều việc.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Chiếu đôi là gì?', opts:['Hai quân cùng chiếu Vua, chỉ còn cách đi Vua','Chiếu hai lần liên tiếp','Hai Vua cùng bị chiếu'], correct:0, why:'Chiếu đôi là hai quân cùng chiếu một lúc.'},
    {phase:'Học', type:'note', title:'Ba cách phá quân canh', list:['Đánh lạc hướng: ép quân canh rời khỏi nhiệm vụ, thường bằng cách cho nó ăn một quân.','Dụ: kéo quân đối thủ (hay Vua) tới một ô bất lợi.','Quá tải: một quân gánh hai việc. Đánh vào một việc thì việc kia bỏ ngỏ, như một người phải trông hai cái cửa.'], tip:'Hai câu hỏi để tìm đòn: "Quân nào của đối thủ đang làm việc quan trọng nhất?" và "Nước nào buộc nó bỏ việc đó?"'},
    {phase:'Học', type:'demo', fen:'2r3k1/5ppp/8/8/3Q4/8/5PPP/3R2K1 w - - 0 1', start:'Xe đen ở c8 là quân duy nhất canh hàng cuối. Vua đen bị ba Tốt của mình nhốt lại. Bấm nút để xem.', text:'Xem đánh lạc hướng: thí Hậu để kéo Xe đi.', moves:[
      {m:'d4d8', t:'Trắng thí Hậu, chiếu Vua đen ở g8. Xe c8 là quân duy nhất ăn được Hậu.'},
      {m:'c8d8', t:'Xe đen ăn Hậu và rời hàng cuối của chính nó. Nhiệm vụ canh gác đã bị phá.'},
      {m:'d1d8', t:'Xe trắng ăn Xe d8: chiếu hết ở hàng cuối. Vua đen bị Tốt f7, g7, h7 nhốt chặt.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'2r3k1/5ppp/8/8/3Q4/8/5PPP/3R2K1 w - - 0 1', answer:['d4d8'], text:'Bây giờ tự làm. Trắng đi: hãy thí Hậu để chiếu hết trong hai nước.', hint:'Xe đen c8 đang canh hàng cuối. Hãy kéo nó đi bằng một nước chiếu.', why:'Qd8+ ép Rxd8, rồi Rxd8 chiếu hết.'},
    {phase:'Học', type:'note', title:'Phòng cho mình: "lỗ thở"', list:['Vua kẹt sau hàng Tốt của chính mình rất dễ bị chiếu hết hàng cuối.','Đẩy sớm Tốt h hoặc g lên một ô để Vua có chỗ thoát. Ô đó gọi là "lỗ thở".'], tip:'Đòn dụ nổi tiếng: bẫy Légal ở cấp 3 kéo Vua đen tới e7, nơi Mã chiếu hết.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'deflection', band:'de'}, {theme:'backRankMate', band:'de'}], n:6},
    {phase:'Chốt', type:'quiz', q:'Đánh lạc hướng khác dụ ở điểm nào?', opts:['Lạc hướng kéo quân rời chỗ quan trọng, dụ kéo quân tới chỗ bất lợi','Hai đòn giống nhau','Lạc hướng chỉ dùng Tốt'], correct:0, why:'Lạc hướng: kéo quân canh ra khỏi chỗ. Dụ: kéo quân vào ô xấu.'}
  ]},

  'mau-chieu-het': {title:'Mẫu chiếu hết kinh điển', reviewed:false, intro:[
    'Người chơi giỏi không tính mọi thứ từ đầu. Họ nhận ra "hình" đã gặp và chỉ kiểm tra chi tiết.',
    'Hôm nay bạn học bốn mẫu chiếu hết: chiếu hết ngạt, Anastasia, Ả Rập và Boden. Thấy hình quen là biết ngay có đòn.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Trong đòn đánh lạc hướng, bạn kéo quân đối thủ đi đâu?', opts:['Ra khỏi chỗ quan trọng mà nó đang canh','Về góc bàn cờ','Lên hàng 8'], correct:0, why:'Lạc hướng kéo quân canh khỏi nhiệm vụ.'},
    {phase:'Học', type:'demo', fen:'4r2k/6pp/8/3Q2N1/8/8/6PP/6K1 w - - 0 1', start:'Vua đen bị Tốt g7, h7 và Xe e8 vây kín. Bấm nút để xem chiếu hết ngạt.', text:'Xem chiếu hết ngạt: thí Hậu để Mã chiếu hết.', moves:[
      {m:'g5f7', t:'Mã chiếu Vua ở h8.'},
      {m:'h8g8', t:'Vua đen đi g8.'},
      {m:'f7h6', t:'Mã chiếu tiếp, lần này là chiếu đôi: Mã h6 và Hậu d5 cùng chiếu. Vua phải đi.'},
      {m:'g8h8', t:'Vua đen chỉ còn ô h8.'},
      {m:'d5g8', t:'Thí Hậu! Hậu chiếu Vua ở g8, Xe e8 buộc phải ăn nếu không thì mất Vua.'},
      {m:'e8g8', t:'Xe đen ăn Hậu, và tự lấp ô g8. Bây giờ Vua đen không còn ô thoát nào.'},
      {m:'h6f7', t:'Mã f7 chiếu hết! Vua bị chính quân mình vây kín.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'8/4Nppk/8/8/8/3R4/5PPP/6K1 w - - 0 1', mate:true, text:'Mẫu Anastasia. Trắng đi: hãy chiếu hết trong một nước. Mã e7 đã chặn ô thoát của Vua.', hint:'Xe đi lên cột h. Vua đen ở h7 bị Tốt g7 của chính nó chắn ở bên cạnh.', why:'Xe h3 chiếu hết: Mã e7 khống chế g8 và g6, Tốt g7 chặn Vua. Đó là mẫu Anastasia.'},
    {phase:'Làm cùng', type:'find', fen:'7k/R7/5N2/8/8/8/6PP/6K1 w - - 0 1', mate:true, text:'Mẫu Ả Rập: Xe và Mã phối hợp chiếu hết Vua ở góc. Trắng đi: tìm chiếu hết trong một nước.', hint:'Xe a7 cần đi tới ô mà Mã f6 bảo vệ và Vua đen ăn không được.', why:'Xe h7 chiếu hết. Mã f6 bảo vệ Xe và canh g8, Xe canh g7.'},
    {phase:'Học', type:'demo', fen:'2kr4/pp1n4/2n5/8/5B2/5Q2/4BPPP/6K1 w - - 0 1', start:'Vua đen đã nhập thành cánh Hậu. Bấm nút để xem mẫu Boden với hai Tượng.', text:'Xem mẫu Boden: hai Tượng cắt nhau chiếu hết.', moves:[
      {m:'f3c6', t:'Thí Hậu! Hậu chiếu Vua ở c8.'},
      {m:'b7c6', t:'Tốt b7 ăn Hậu, và để hở đường chéo cho Tượng.'},
      {m:'e2a6', t:'Tượng a6 chiếu hết! Tượng f4 canh b8 và c7, còn d7, d8 đã bị chính quân Đen chiếm.'}
    ]},
    {phase:'Tự làm', type:'run', mixed:[{theme:'smotheredMate', band:'de'}, {theme:'backRankMate', band:'de'}, {theme:'mateIn2', band:'de'}], n:6},
    {phase:'Chốt', type:'note', title:'Nhớ các mẫu này', list:['Chiếu hết ngạt: Vua bị quân nhà vây kín, Mã chiếu hết.','Anastasia: Mã chặn ô thoát, Xe chiếu hết ở cột mép.','Ả Rập: Xe và Mã phối hợp chiếu hết Vua ở góc.','Boden: hai Tượng cắt nhau chiếu hết Vua đã nhập thành cánh Hậu.'], tip:'Mỗi mẫu có điều kiện riêng. Trước khi thí quân, hãy kiểm tra lại điều kiện.'},
    {phase:'Chốt', type:'quiz', q:'Trong chiếu hết ngạt, quân nào cho nhát chiếu hết cuối cùng?', opts:['Mã','Hậu','Tượng'], correct:0, why:'Mã chiếu hết, vì Mã nhảy qua được các quân đang vây Vua.'}
  ]},

  'tan-cong-vua': {title:'Tấn công Vua', reviewed:false, intro:[
    'Tấn công Vua rất hấp dẫn nhưng chỉ nên làm khi đúng lúc. Tấn công thiếu quân thường chỉ để lại điểm yếu cho chính mình.',
    'Bài này dạy bạn nhận ra lúc nào được phép tấn công và nên tấn công theo thứ tự nào.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Trong mẫu Boden, hai Tượng chiếu hết Vua đã nhập thành ở cánh nào?', opts:['Cánh Hậu','Cánh Vua','Giữa bàn'], correct:0, why:'Boden chiếu hết Vua đã nhập thành cánh Hậu.'},
    {phase:'Học', type:'note', title:'Khi nào được phép tấn công Vua?', list:['Khi số quân của mình nhắm vào cánh Vua đối thủ nhiều hơn số quân phòng thủ.','Khi Tốt che Vua đối thủ đã bị đẩy lên (như h6, g6), tạo ô yếu để quân mình vào.','Khi Mã f6, quân phòng thủ tốt nhất của ô h7, đã bị đuổi hoặc đổi mất.','Khi trung tâm đã ổn định, đối thủ khó phản công ở giữa.'], tip:'Nếu thiếu quân thì đừng vội tấn công. Hãy cải thiện thế cờ trước.'},
    {phase:'Học', type:'note', title:'Hai kiểu tấn công', list:['Nhập thành khác cánh: xung phong Tốt. Đẩy Tốt g, h (hoặc a, b) vào Vua đối thủ để mở cột cho Xe. Vua mình không ở đó nên không sợ hở.','Nhập thành cùng cánh: tấn công bằng quân. Dùng Hậu, Tượng, Mã, Xe, đừng đẩy Tốt trước Vua mình vì sẽ làm hở Vua mình.'], text:'Thứ tự tấn công: giữ trung tâm vững, đưa quân đến gần Vua đối thủ, loại quân phòng thủ, mở đường vào Vua, rồi tính đòn chiếu hết.'},
    {phase:'Học', type:'show', fen:'rnbq1rk1/pp1nbppp/4p3/2ppP3/3P3P/2PB1N2/PP3PP1/RNBQK2R w KQ - 0 1', text:'Đây là thế cờ để làm đòn "quà Hy Lạp": Tượng d3 nhắm vào Tốt h7. Mã f3 có thể nhảy g5. Hậu d1 có thể lên h5. Đen không còn Mã f6 để bảo vệ h7.'},
    {phase:'Học', type:'demo', fen:'rnbq1rk1/pp1nbppp/4p3/2ppP3/3P3P/2PB1N2/PP3PP1/RNBQK2R w KQ - 0 1', start:'Bấm nút để xem Trắng thí Tượng.', text:'Xem đòn thí Tượng ở h7.', moves:[
      {m:'d3h7', t:'Trắng thí Tượng ăn Tốt h7, chiếu Vua.'},
      {m:'g8h7', t:'Vua đen ăn Tượng. Bây giờ Vua đã bị kéo ra ngoài.'},
      {m:'f3g5', t:'Mã chiếu Vua. Vua đen sắp bị tấn công bằng cả Mã và Hậu.'},
      {m:'h7g8', t:'Vua đen lùi về g8. Nếu đi ô khác cũng bị tấn công mạnh.'},
      {m:'d1h5', t:'Hậu lên h5, đe dọa chiếu hết ở h7. Máy tính ra Trắng thắng ép buộc trong mọi nhánh.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'rnbq1rk1/pp1nbppp/4p3/2ppP3/3P3P/2PB1N2/PP3PP1/RNBQK2R w KQ - 0 1', answer:['d3h7'], text:'Trắng đi. Tất cả điều kiện đã đủ: Tượng nhắm h7, Mã tới được g5, Hậu tới được h5, Đen không có Mã f6. Hãy bắt đầu cuộc tấn công.', hint:'Tượng d3 thí ở h7 và chiếu Vua.', why:'Bxh7+ mở màn cuộc tấn công. Thiếu một điều kiện thôi là phải tính lại từng biến.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'mateIn2', band:'de'}, {theme:'mateIn3', band:'de'}], n:5},
    {phase:'Chốt', type:'quiz', q:'Nhập thành khác cánh thì nên làm gì?', opts:['Xung phong Tốt vào Vua đối thủ','Không bao giờ đẩy Tốt','Đổi hết quân'], correct:0, why:'Vua mình không ở đó nên đẩy Tốt không làm hở Vua mình, và mở cột nhanh cho Xe.'},
    {phase:'Chốt', type:'quiz', q:'Quân phòng thủ quan trọng nhất cho ô h7 là quân nào?', opts:['Mã f6','Tốt a7','Xe a8'], correct:0, why:'Mã f6 bảo vệ h7. Loại bỏ nó là bước quan trọng trong tấn công.'}
  ]},

  'hinh-vuong': {title:'Quy tắc hình vuông', reviewed:false, intro:[
    'Tàn cuộc là lúc Tốt phong cấp. Khi bên không có Tốt chỉ còn Vua, câu hỏi là: Vua có bắt kịp Tốt không?',
    'Có một cách đo nhanh mà không cần đếm từng nước: quy tắc hình vuông.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Tốt chạm hàng cuối của đối thủ sẽ thế nào?', opts:['Phong cấp thành quân mạnh hơn','Biến mất','Bị loại'], correct:0, why:'Tốt phong cấp, thường thành Hậu.'},
    {phase:'Học', type:'show', fen:'7k/8/8/p7/5K2/8/8/8 w - - 0 1', text:'Tốt đen a5 còn 4 ô nữa là phong cấp ở a1. Vẽ một hình vuông từ a5 xuống a1 rồi sang phải: a5, a1, e1, e5. Nếu Vua trắng bước vào được hình vuông này thì bắt kịp Tốt.'},
    {phase:'Học', type:'note', title:'Quy tắc hình vuông', list:['Vẽ hình vuông có một cạnh là đường đi từ Tốt tới hàng phong cấp.','Nếu Vua đối thủ bước vào được hình vuông (kể cả ngay nước đi này) thì bắt kịp Tốt.','Nếu không, Tốt chạy thoát và phong cấp.','Mỗi lần Tốt tiến lên một ô, hình vuông nhỏ lại. Vì vậy ai đi trước rất quan trọng.'], tip:'Tốt ở hàng xuất phát được đi hai ô, nên tính hình vuông từ ô ngay phía trước nó.'},
    {phase:'Làm cùng', type:'find', fen:'7k/8/8/p7/5K2/8/8/8 w - - 0 1', answer:['f4e4','f4e5','f4e3'], wrong:{f4f5:'Vua f5 vẫn ngoài hình vuông. Đen đẩy a4 rồi chạy phong Hậu.'}, text:'Trắng đi. Hãy đưa Vua trắng vào hình vuông của Tốt đen để bắt kịp nó.', hint:'Hình vuông là a5, a1, e1, e5. Vua đang ở f4, cạnh ngay phía ngoài. Vua cần bước vào cột e.', why:'Vua vào cột e là vào hình vuông và bắt kịp Tốt. Ván cờ hòa.'},
    {phase:'Làm cùng', type:'quiz', q:'Tốt đen đã tiến lên a4, Vua trắng vẫn ở f4, đến lượt Trắng. Vua trắng còn bắt kịp không?', fen:'7k/8/8/8/p4K2/8/8/8 w - - 0 1', opts:['Còn, vì Vua ở gần','Không, vì hình vuông đã nhỏ lại'], correct:1, why:'Hình vuông còn a4, a1, d1, d4. Vua ở f4 ngoài hình vuông nên không bắt kịp.'},
    {phase:'Tự làm', type:'quiz', q:'Tốt trắng d5, Vua đen h6, đến lượt Trắng. Vua đen có bắt kịp Tốt không?', fen:'8/8/7k/3P4/8/8/8/K7 w - - 0 1', opts:['Có','Không'], correct:1, why:'Trắng đi d6, hình vuông là d6, d8, f8, f6. Vua đen ở h6 vẫn ngoài hình vuông, nên Tốt phong Hậu.'},
    {phase:'Tự làm', type:'quiz', q:'Cùng thế cờ đó nhưng bây giờ đến lượt ĐEN đi. Vua đen có bắt kịp không?', fen:'8/8/7k/3P4/8/8/8/K7 b - - 0 1', opts:['Có, vì Vua đi trước','Không'], correct:0, why:'Đen đi Kg6 là vào hình vuông (g6 nằm trong hình vuông khi Tốt còn ở d5). Ai đi trước thay đổi kết quả.'},
    {phase:'Chốt', type:'quiz', q:'Quy tắc hình vuông dùng để làm gì?', opts:['Tính nhanh Vua có bắt kịp Tốt không','Đếm số quân trên bàn','Tính điểm quân'], correct:0, why:'Bạn vẽ hình vuông thay vì đếm từng nước.'}
  ]},

  'doi-vua': {title:'Đối vua và ô then chốt', reviewed:false, intro:[
    'Khi Vua và Tốt chống Vua, Tốt chỉ phong cấp được khi Vua của nó đi trước dẫn đường. Hai Vua sẽ tranh nhau những ô quan trọng.',
    'Bài này dạy ô then chốt (đích đến của Vua) và đối vua (cách giành ô đó).'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Hai Vua có được đứng cạnh nhau không?', opts:['Không, vì Vua nào cũng bị chiếu','Được','Chỉ khi có Tốt'], correct:0, why:'Hai Vua đứng cạnh nhau sẽ tự chiếu nhau, mà luật cấm. Vì thế ô giữa hai Vua thuộc về không ai.'},
    {phase:'Học', type:'note', title:'Ô then chốt', list:['Ô then chốt là những ô mà nếu Vua bên có Tốt chiếm được thì Tốt chắc chắn phong cấp, bất kể ai đi trước.','Với Tốt e4: ô then chốt là d6, e6, f6, cách Tốt hai hàng phía trước.','Với Tốt ở cột mép (a, h): Vua phòng thủ vào góc là hòa.'], tip:'Bên có Tốt cố vào ô then chốt. Bên chỉ có Vua cố chặn, không cho vào.'},
    {phase:'Học', type:'show', fen:'8/4k3/8/4K3/4P3/8/8/8 b - - 0 1', text:'Hai Vua đứng đối mặt: Vua trắng e5, Vua đen e7, cách nhau một ô. Đây là "đối vua". Bên KHÔNG phải đi gọi là "giữ đối vua". Ở đây đến lượt Đen đi, nên Trắng đang giữ đối vua.'},
    {phase:'Học', type:'demo', fen:'8/4k3/8/4K3/4P3/8/8/8 b - - 0 1', start:'Bấm nút để xem Trắng thắng nhờ giữ đối vua.', text:'Xem Trắng giữ đối vua rồi thắng.', moves:[
      {m:'e7d7', t:'Đen phải đi, và phải nhường đường: Vua đen rời cột e.'},
      {m:'e5f6', t:'Vua trắng vào f6, một ô then chốt. Từ đây Tốt chắc chắn phong cấp.'},
      {m:'d7d6', t:'Đen chặn tốt tiến lên.'},
      {m:'e4e5', t:'Tốt tiến lên e5, chiếu Vua đen.'},
      {m:'d6d7', t:'Vua đen lùi lại.'},
      {m:'f6f7', t:'Vua trắng tiến lên f7, giữ Tốt đi tiếp được.'},
      {m:'d7d8', t:'Vua đen lùi về hàng cuối.'},
      {m:'e5e6', t:'Tốt tiến e6.'},
      {m:'d8c7', t:'Vua đen không chặn được nữa.'},
      {m:'e6e7', t:'Tốt e7, sắp phong Hậu ở e8.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'8/3k4/8/4K3/4P3/8/8/8 w - - 0 1', answer:['e5f6','e5f5','e5d5'], wrong:{e5d4:'Vua lùi lại làm mất cơ hội. Vua phải tiến lên ô then chốt, không lùi.'}, text:'Trắng đi. Hãy đưa Vua trắng tới một ô then chốt của Tốt e4 (d6, e6, f6) hoặc tiến sát tới đó.', hint:'Vua ở e5. Ô f6 là một ô then chốt và Vua đi tới được ngay.', why:'Vua tiến lên (nhất là f6) để dẫn Tốt đi. Lùi Vua xuống là bỏ lỡ cơ hội thắng.'},
    {phase:'Làm cùng', type:'quiz', q:'Cùng thế hai Vua đối mặt ở e5 và e7, nhưng đến lượt TRẮNG đi. Kết quả thế nào?', fen:'8/4k3/8/4K3/4P3/8/8/8 w - - 0 1', opts:['Trắng vẫn thắng','Hòa, vì Đen giữ đối vua','Đen thắng'], correct:1, why:'Bây giờ Đen giữ đối vua. Vua trắng đi đâu, Vua đen cũng đối mặt lại, và Trắng không vào được ô then chốt.'},
    {phase:'Tự làm', type:'quiz', q:'Vua phòng thủ (chỉ có Vua) nên đứng ở đâu để chặn Tốt?', opts:['Ngay trước Tốt, và giữ đối vua khi Vua đối thủ tiến lên','Xa Tốt, ở góc bàn cờ','Cạnh Tốt'], correct:0, why:'Đứng trước Tốt và giữ đối vua là cách chặn tốt nhất. Khi bị đẩy về hàng cuối thì lùi thẳng xuống.'},
    {phase:'Chốt', type:'quiz', q:'Ai giữ đối vua?', opts:['Bên KHÔNG phải đi','Bên phải đi','Bên có nhiều quân hơn'], correct:0, why:'Hai Vua đối mặt, bên đến lượt đi thì phải nhường đường. Bên còn lại giữ đối vua.'}
  ]},

  'zugzwang': {title:'Zugzwang: khi đến lượt đi là bất lợi', reviewed:false, intro:[
    'Luật cờ bắt buộc phải đi, không được bỏ lượt. Có những thế mà nước nào cũng làm mình thiệt, ước gì được bỏ lượt. Đó là zugzwang.',
    'Từ "zugzwang" trong tiếng Đức nghĩa là "bắt buộc phải đi". Nó gần như chỉ gặp ở tàn cuộc, khi còn ít quân.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Hòa pat là khi nào?', opts:['Đến lượt đi, Vua không bị chiếu nhưng không còn nước đi hợp lệ nào','Một bên xin hòa','Hai bên cùng chiếu nhau'], correct:0, why:'Hòa pat (bế tắc): không còn nước hợp lệ và Vua không bị chiếu, ván cờ hòa.'},
    {phase:'Học', type:'show', fen:'2k5/2P5/3K4/8/8/8/8/8 b - - 0 1', text:'Vua trắng d6, Tốt trắng c7. Vua đen c8 bị kẹt: các ô b8, b7, d8, d7 đều bị Vua hoặc Tốt trắng canh. Đến lượt Đen đi.'},
    {phase:'Học', type:'demo', fen:'2k5/2P5/3K4/8/8/8/8/8 b - - 0 1', start:'Đến lượt Đen. Bấm nút để xem Đen buộc phải đi và thua.', text:'Xem Đen rơi vào zugzwang.', moves:[
      {m:'c8b7', t:'Đen chỉ có một nước hợp lệ duy nhất là Vua b7. Nước nào cũng đi vào ô bị canh nên chỉ còn nước này.'},
      {m:'d6d7', t:'Vua trắng tiến lên d7 và vẫn giữ Tốt c7 an toàn.'},
      {m:'b7a6', t:'Vua đen tránh sang a6.'},
      {m:'c7c8q', t:'Tốt phong Hậu, chiếu Vua. Trắng thắng.'}
    ]},
    {phase:'Học', type:'quiz', q:'Cùng thế cờ đó nhưng bây giờ đến lượt TRẮNG đi. Trắng đi Vua c6 thì chuyện gì xảy ra?', fen:'2k5/2P5/3K4/8/8/8/8/8 w - - 0 1', opts:['Đen bị hòa pat, ván hòa','Trắng chiếu hết ngay','Đen thắng'], correct:0, why:'Vua đen c8 không còn ô nào đi được mà không bị chiếu, và Vua không đang bị chiếu: hòa pat. Chỉ cần đổi lượt đi là kết quả khác hẳn.'},
    {phase:'Học', type:'note', title:'Ghi nhớ về zugzwang', list:['Zugzwang: mọi nước đi đều làm thế cờ xấu đi, ước gì được bỏ lượt.','Zugzwang tương hỗ: ai đến lượt đi thì người đó thiệt.','Hiếm gặp ở trung cuộc vì còn nhiều quân nên luôn có nước chờ vô hại.','Khi mình hơn mà chưa tiến thêm được, hãy tìm cách chuyển lượt đi cho đối thủ.'], tip:'Cẩn thận: ép Vua đối thủ vào chỗ hết nước đi có thể gây hòa pat. Hãy luôn kiểm tra trước khi đi.'},
    {phase:'Tự làm', type:'quiz', q:'Thế hai Vua đối mặt với Tốt ở giữa, ai đến lượt đi thì thiệt. Đó là gì?', opts:['Zugzwang tương hỗ','Chiếu đôi','Quân treo'], correct:0, why:'Zugzwang tương hỗ: cả hai bên đều muốn bên kia phải đi trước.'},
    {phase:'Chốt', type:'quiz', q:'Vì sao zugzwang hiếm gặp ở trung cuộc?', opts:['Còn nhiều quân nên luôn có nước chờ vô hại','Luật cấm','Vì Vua không đi được'], correct:0, why:'Zugzwang cần bên phòng thủ gần hết nước đi vô hại, điều này chỉ xảy ra ở tàn cuộc.'}
  ]},

  'kiem-tra-4': {title:'Ôn trộn và kiểm tra cấp 4', test:true, level:4, reviewed:false, intro:[
    'Bài này có 16 câu về tấn công lộ, đánh lạc hướng, mẫu chiếu hết, tấn công Vua và tàn cuộc Tốt.',
    'Điểm chỉ tính khi bạn đúng ngay lần đầu. Cần đúng ít nhất 13 câu trong 16 để qua cấp.'
  ], steps:[
    {from:'tan-cong-lo', type:'run', theme:'discoveredAttack', band:'de', n:2, noHelp:true},
    {from:'tan-cong-lo', type:'quiz', q:'Chiếu đôi chỉ đỡ được bằng cách nào?', opts:['Đi Vua','Ăn một quân chiếu','Chắn đường'], correct:0, why:'Hai quân chiếu từ hai hướng.'},
    {from:'lac-huong', type:'find', fen:'2r3k1/5ppp/8/8/3Q4/8/5PPP/3R2K1 w - - 0 1', answer:['d4d8'], text:'Trắng đi: hãy thí Hậu để chiếu hết trong hai nước.', why:'Qd8+ ép Rxd8, rồi Rxd8 chiếu hết.'},
    {from:'lac-huong', type:'run', theme:'deflection', band:'de', n:2, noHelp:true},
    {from:'mau-chieu-het', type:'find', fen:'8/4Nppk/8/8/8/3R4/5PPP/6K1 w - - 0 1', mate:true, text:'Trắng đi: hãy chiếu hết trong một nước (mẫu Anastasia).', why:'Xe h3 chiếu hết.'},
    {from:'mau-chieu-het', type:'find', fen:'7k/R7/5N2/8/8/8/6PP/6K1 w - - 0 1', mate:true, text:'Trắng đi: hãy chiếu hết trong một nước (mẫu Ả Rập).', why:'Xe h7 chiếu hết.'},
    {from:'mau-chieu-het', type:'run', theme:'smotheredMate', band:'de', n:1, noHelp:true},
    {from:'tan-cong-vua', type:'quiz', q:'Nhập thành khác cánh thì nên làm gì?', opts:['Xung phong Tốt vào Vua đối thủ','Không bao giờ đẩy Tốt','Đổi hết quân'], correct:0, why:'Vua mình không ở đó nên đẩy Tốt không làm hở Vua mình.'},
    {from:'tan-cong-vua', type:'quiz', q:'Quân phòng thủ quan trọng nhất cho ô h7 là quân nào?', opts:['Mã f6','Tốt a7','Xe a8'], correct:0, why:'Mã f6 bảo vệ h7.'},
    {from:'hinh-vuong', type:'find', fen:'7k/8/8/p7/5K2/8/8/8 w - - 0 1', answer:['f4e4','f4e5','f4e3'], text:'Trắng đi: hãy đưa Vua vào hình vuông của Tốt đen a5.', why:'Vua vào cột e là vào hình vuông.'},
    {from:'hinh-vuong', type:'quiz', q:'Tốt trắng d5, Vua đen h6, đến lượt Trắng. Vua đen có bắt kịp Tốt không?', fen:'8/8/7k/3P4/8/8/8/K7 w - - 0 1', opts:['Có','Không'], correct:1, why:'Vua đen ngoài hình vuông.'},
    {from:'doi-vua', type:'find', fen:'8/3k4/8/4K3/4P3/8/8/8 w - - 0 1', answer:['e5f6','e5f5','e5d5'], text:'Trắng đi: hãy đưa Vua tiến lên để dẫn Tốt e4.', why:'Vua phải tiến lên, không lùi.'},
    {from:'doi-vua', type:'quiz', q:'Ai giữ đối vua?', opts:['Bên KHÔNG phải đi','Bên phải đi','Bên nhiều quân hơn'], correct:0, why:'Bên không phải đi giữ đối vua.'},
    {from:'zugzwang', type:'quiz', q:'Zugzwang là gì?', opts:['Thế mà đến lượt đi là bất lợi, ước gì được bỏ lượt','Chiếu hết','Hòa cờ'], correct:0, why:'Mọi nước đi đều làm thế cờ xấu đi.'}
  ]}
};

/* Cấp 3: Nguyên tắc khai cuộc. Soạn từ Chương 3 của khóa học "Cờ vua: từ biết luật đến chơi khá", viết lại cho học sinh.
   Thế cờ và nước đáp án được kiểm bằng tools/check_lessons.js (luật) và tools/check_mates.py (Stockfish).
   Nhận định chiến lược trong bài là kiến thức khai cuộc phổ biến, chờ thầy duyệt (reviewed:false). */
const LV3 = {
  'ba-nguyen-tac': {title:'Ba nguyên tắc: trung tâm, phát triển, nhập thành', reviewed:false, intro:[
    'Khai cuộc là một cuộc đua. Ai đưa quân ra trận nhanh hơn và vào ô đẹp hơn thì có lợi khi hai bên bắt đầu giao tranh.',
    'Bạn không cần học thuộc nhiều nước. Chỉ cần hỏi ba câu trước mỗi nước đi: Trung tâm chưa? Quân đã ra chưa? Vua đã an toàn chưa?'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Trước khi ăn một quân, câu hỏi quan trọng nhất là gì?', opts:['Quân đó có đẹp không','Quân đó có được bảo vệ không','Mình đã đi bao nhiêu nước'], correct:1, why:'Nếu quân đó được bảo vệ thì ăn xong mình sẽ bị ăn lại.'},
    {phase:'Học', type:'explore', fen:'8/8/8/8/4N3/8/8/8 w - - 0 1', min:2, text:'Đây là Mã đứng giữa bàn cờ, ở ô e4. Chạm vào Mã và đếm các ô sáng: Mã tấn công 8 ô.'},
    {phase:'Học', type:'explore', fen:'8/8/8/8/8/8/8/N7 w - - 0 1', min:2, text:'Bây giờ Mã đứng ở góc a1. Chạm vào Mã: chỉ có 2 ô sáng. Mã ở góc yếu hơn nhiều so với Mã ở giữa.'},
    {phase:'Học', type:'note', title:'Ba nguyên tắc của khai cuộc', list:['Trung tâm: đưa Tốt e4 hoặc d4 ra giữa bàn, để quân của mình có nhiều đường đi.','Phát triển: ra Mã và Tượng trước, mỗi quân ra một lần. Mỗi nước đi lại một quân là còn một quân khác chưa ra.','Nhập thành sớm: Vua vào chỗ an toàn và Xe ra được giữa bàn.'], text:'Hai lời nhắc nữa: đừng đưa Hậu ra quá sớm, vì Hậu sẽ bị quân nhẹ đuổi và đối thủ được thêm nhịp. Đừng mải ăn Tốt ở cánh khi quân mình chưa ra.', tip:'Hai đội xây nhà. Đội A mất ba buổi đi nhặt một viên gạch rơi, đội B đổ xong móng. Khi bão đến, nhà đội B đứng vững hơn.'},
    {phase:'Học', type:'demo', fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', start:'Bấm nút để xem một khai cuộc làm đủ cả ba việc.', text:'Xem khai cuộc Ý: trung tâm, phát triển, nhập thành.', moves:[
      {m:'e2e4', t:'Tốt ra giữa bàn: chiếm trung tâm, mở đường cho Tượng và Hậu.'},
      {m:'e7e5', t:'Đen cũng chiếm trung tâm.'},
      {m:'g1f3', t:'Mã ra, tấn công Tốt e5 và đi về phía trung tâm.'},
      {m:'b8c6', t:'Mã đen ra, bảo vệ Tốt e5.'},
      {m:'f1c4', t:'Tượng ra, nhắm vào ô f7, ô yếu nhất của Đen.'},
      {m:'g8f6', t:'Mã đen thứ hai ra trận.'},
      {m:'d2d3', t:'Tốt d3 giữ Tốt e4 và mở đường cho Tượng c1.'},
      {m:'f8e7', t:'Tượng đen ra, chuẩn bị nhập thành.'},
      {m:'e1g1', t:'Trắng nhập thành: Vua an toàn, Xe ra giữa.'},
      {m:'e8g8', t:'Đen cũng nhập thành. Cả hai bên đã làm đủ ba nguyên tắc.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', answer:['e2e4','d2d4'], wrong:{g2g4:'Tốt g4 không giúp trung tâm mà còn làm hở Vua. Hãy đưa Tốt e hoặc d ra giữa bàn.'}, text:'Trắng đi nước đầu tiên. Hãy chiếm trung tâm bằng một Tốt.', hint:'Trung tâm là các ô d4, e4, d5, e5. Tốt nào của Trắng ra được giữa bàn?', why:'Tốt e4 hoặc d4 chiếm trung tâm và mở đường cho Tượng, Hậu.'},
    {phase:'Làm cùng', type:'find', fen:'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', answer:['f1c4','f1b5'], text:'Trắng đi. Hãy phát triển Tượng ra một đường chéo tốt.', hint:'Tượng ở f1 đi theo đường chéo. Hãy đưa nó ra c4 hoặc b5.', why:'Tượng ra c4 nhắm ô f7, hoặc ra b5 đè Mã c6. Cả hai đều là phát triển tốt.'},
    {phase:'Tự làm', type:'find', fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', answer:['b8c6','g8f6'], wrong:{d8h4:'Hậu ra sớm bị Mã ăn mất: Nxh4. Đừng đưa Hậu ra quá sớm.'}, text:'Đen đi. Hãy phát triển một Mã ra trận.', hint:'Mã ra giữa bàn là tốt nhất. Đừng đưa Hậu ra sớm.', why:'Mã c6 bảo vệ Tốt e5. Mã f6 tấn công Tốt e4. Cả hai đều phát triển và giữ trung tâm.'},
    {phase:'Tự làm', type:'find', fen:'r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 1 5', answer:['e1g1','b1c3'], text:'Trắng đi. Hãy cho Vua vào chỗ an toàn: nhập thành.', hint:'Vua ở e1 và Xe ở h1. Nhập thành gần là đưa Vua sang g1.', why:'Nhập thành đưa Vua vào góc an toàn và đưa Xe ra giữa bàn.'},
    {phase:'Chốt', type:'quiz', q:'Vì sao không nên đưa Hậu ra quá sớm?', opts:['Hậu sẽ bị quân nhẹ đuổi, đối thủ vừa đuổi vừa phát triển thêm quân','Hậu không được đi nước đầu','Hậu quá yếu'], correct:0, why:'Mỗi lần Hậu phải tránh là đối thủ được thêm một nhịp để ra quân.'},
    {phase:'Chốt', type:'quiz', q:'Ba câu hỏi cho mọi nước khai cuộc là gì?', opts:['Trung tâm, phát triển, an toàn cho Vua','Ăn quân, chiếu, nhập thành','Hậu, Xe, Tượng'], correct:0, why:'Trung tâm chưa? Quân đã ra chưa? Vua đã an toàn chưa?'}
  ]},

  'bay-khai-cuoc': {title:'Bẫy khai cuộc phổ biến', reviewed:false, intro:[
    'Bẫy khai cuộc hiếm khi là nước tốt. Nó chỉ bắt được người không kiểm tra lại nước đi của mình.',
    'Biết bẫy giúp bạn không thua sớm, và biết cách trừng phạt khi đối thủ đi sai.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Nên đưa Hậu ra sớm hay ra muộn?', opts:['Ra muộn, sau khi Mã và Tượng đã ra','Ra sớm cho mạnh','Không quan trọng'], correct:0, why:'Hậu ra sớm dễ bị quân nhẹ đuổi, đối thủ được thêm nhịp.'},
    {phase:'Học', type:'demo', fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', start:'Bấm nút để xem bẫy "chiếu hết học trò".', text:'Xem bẫy chiếu hết học trò, dài chỉ bốn nước.', moves:[
      {m:'e2e4', t:'Trắng ra Tốt e4.'},
      {m:'e7e5', t:'Đen đáp lại.'},
      {m:'f1c4', t:'Tượng nhắm thẳng vào ô f7. Ô f7 chỉ có Vua bảo vệ.'},
      {m:'b8c6', t:'Đen ra Mã.'},
      {m:'d1h5', t:'Hậu ra h5, cũng nhắm f7. Bây giờ f7 bị tấn công hai lần, chỉ có một người bảo vệ.'},
      {m:'g8f6', t:'Đen đánh Hậu bằng Mã mà quên f7. Đây là sai lầm.'},
      {m:'h5f7', t:'Hậu ăn f7: chiếu hết! Chỉ sau 4 nước.'}
    ]},
    {phase:'Học', type:'note', title:'Vì sao f7 (và f2) là ô yếu nhất?', list:['Chỉ có Vua bảo vệ nó.','Nó nằm trên đường chéo của Tượng c4 và Hậu h5.','Tượng và Hậu của Trắng cùng nhắm vào đó là rất nguy hiểm.'], tip:'Muốn không bị bẫy, hãy làm bước "kiểm tra sai lầm": sau nước này, đối thủ có thể chiếu, ăn, dọa mình những gì?'},
    {phase:'Làm cùng', type:'find', fen:'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3', answer:['g7g6','d8e7','g8h6'], wrong:{g8f6:'Hậu trắng ăn f7: chiếu hết! Hãy bảo vệ ô f7.'}, text:'Đen đi. Hậu và Tượng trắng đang nhắm ô f7. Hãy chặn đòn chiếu hết.', hint:'Có ba cách: đuổi Hậu bằng g6, bảo vệ f7 bằng Hậu hoặc Mã h6. Đừng đi Mã f6.', why:'Tốt g6 đuổi Hậu đi. Sau đó Mã f6 ra với thêm một nhịp cho Đen.'},
    {phase:'Học', type:'demo', fen:'rn1qkbnr/ppp2p1p/3p2p1/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5', start:'Bấm nút để xem bẫy Légal, một bẫy rất đẹp.', text:'Xem Trắng thí Hậu để chiếu hết bằng quân nhẹ.', moves:[
      {m:'f3e5', t:'Mã ăn Tốt e5. Mã đang bị Tượng g4 ghim vào Hậu (ghim tương đối), nhưng vẫn đi được.'},
      {m:'g4d1', t:'Đen tham ăn Hậu trắng. Đây là sai lầm.'},
      {m:'c4f7', t:'Tượng ăn f7, chiếu Vua đen. Vua phải đi sang e7.'},
      {m:'e8e7', t:'Vua đen chỉ còn ô e7.'},
      {m:'c3d5', t:'Mã d5 chiếu hết! Vua đen bị chính quân của mình vây kín.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'r1bqkbnr/pppp1ppp/8/4p3/2BnP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', answer:['f3d4'], wrong:{f3e5:'Hậu đen ra g5, đánh cùng lúc Mã e5 và Tốt g2. Trắng không đỡ được cả hai.'}, text:'Trắng đi. Mã đen vừa nhảy tới d4 (bẫy "Blackburne Shilling"). Tốt e5 trông như đang bị treo. Nên ăn nó không?', hint:'Trước khi ăn, hỏi: sau nước này đối thủ có thể chiếu, ăn, dọa gì? Thử xem Hậu đen đi g5 thì sao.', why:'Ăn Mã d4 mới là đúng. Còn Nxe5? thì ...Qg5! đánh hai quân cùng lúc. Bẫy chỉ bắt được người không kiểm tra.'},
    {phase:'Tự làm', type:'find', fen:'r1bqkb1r/ppp2ppp/2n2n2/3Pp1N1/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 5', answer:['c6a5'], text:'Đen đi. Trắng vừa ăn d5 (bẫy "Gan chiên", Fried Liver). Ăn lại bằng Mã f6 thì sao? Hãy tìm nước đúng.', hint:'Nước đúng đuổi Tượng c4 đi, vì Tượng này nhắm vào f7. Mã c6 nhảy đi đâu được?', why:'Mã đi a5 đuổi Tượng khỏi đường chéo nhắm f7. Nếu ăn lại d5 thì Trắng có đòn Nxf7!, kéo Vua đen ra giữa bàn, Đen rất khó chịu.'},
    {phase:'Tự làm', type:'find', fen:'r1bqkb1r/pppn1ppp/5n2/3N2B1/3P4/8/PP2PPPP/R2QKBNR b KQkq - 0 6', answer:['f6d5'], text:'Đen đi. Trắng vừa ăn Tốt d5 bằng Mã (bẫy "Con voi"). Mã f6 đang bị Tượng g5 ghim vào Hậu. Đen ăn lại được không?', hint:'Đây là ghim tương đối: Mã f6 vẫn đi được, nhưng nó phải có lý do. Hãy thử Mã ăn d5.', why:'Mã f6 ăn Mã d5. Nếu Bxd8 thì Bb4+ rồi Đen lấy lại Hậu và còn hơn một quân. Ghim tương đối không cấm đi.'},
    {phase:'Chốt', type:'note', title:'Điều rút ra từ các bẫy', list:['Bẫy chỉ bắt được người không kiểm tra sai lầm.','Ô f7 (và f2) là điểm yếu lúc khai cuộc.','Ghim tương đối có thể bị phá: quân bị ghim vẫn đi được nếu bạn tính kỹ.','Đừng tham ăn Tốt khi quân chưa ra: thời gian quý hơn một Tốt.']},
    {phase:'Chốt', type:'quiz', q:'Vì sao ô f7 yếu ở khai cuộc?', opts:['Chỉ có Vua bảo vệ nó','Ô f7 là ô tối','Tốt f7 không đi được'], correct:0, why:'Ô f7 chỉ có Vua bảo vệ, và hay bị Tượng và Hậu trắng cùng nhắm tới.'}
  ]},

  'bo-khai-cuoc': {title:'Xây bộ khai cuộc của mình', reviewed:false, intro:[
    'Bộ khai cuộc là danh sách khai cuộc bạn chọn dùng mãi: một khai cuộc khi cầm Trắng, một cách đáp khi đối thủ đi 1.e4, một cách đáp khi đối thủ đi 1.d4.',
    'Mục đích không phải là thắng ngay, mà là vào trung cuộc với thế quen thuộc: bạn biết quân nào đi đâu và kế hoạch là gì.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Ba nguyên tắc của khai cuộc là gì?', opts:['Trung tâm, phát triển, nhập thành','Ăn quân, ăn quân, ăn quân','Đi Hậu, đi Xe, đi Vua'], correct:0, why:'Trung tâm, phát triển quân, nhập thành.'},
    {phase:'Học', type:'note', title:'Bộ khai cuộc gợi ý cho bạn', list:['Cầm Trắng, đi 1.e4: khai cuộc Ý (có bài trong mục Khai cuộc).','Cầm Trắng, đi 1.d4 và không muốn học nhiều: hệ thống London.','Cầm Đen, đối thủ đi 1.e4: Caro-Kann (có bài ở cấp này).','Cầm Đen, đối thủ đi 1.d4: Gambit Hậu từ chối.'], tip:'Chơi ít khai cuộc hơn nhưng hiểu sâu thì bạn gặp lại nhiều thế giống nhau và học nhanh hơn.'},
    {phase:'Học', type:'demo', fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', start:'Bấm nút để xem hệ thống London được dựng như thế nào.', text:'Xem hệ thống London: một cách dựng giống nhau trước nhiều nước đáp.', moves:[
      {m:'d2d4', t:'Tốt d4 chiếm trung tâm.'},
      {m:'d7d5', t:'Đen cũng đẩy Tốt d.'},
      {m:'c1f4', t:'Tượng ra f4 trước khi đẩy Tốt e. Tượng này sẽ không bị nhốt sau Tốt.'},
      {m:'g8f6', t:'Mã đen ra.'},
      {m:'e2e3', t:'Tốt e3 giữ chỗ cho Tượng và mở đường cho Tượng f1.'},
      {m:'e7e6', t:'Đen đẩy Tốt e.'},
      {m:'g1f3', t:'Mã ra f3.'},
      {m:'c7c5', t:'Đen đánh vào trung tâm.'},
      {m:'c2c3', t:'Tốt c3 giữ d4 vững chắc.'},
      {m:'b8c6', t:'Đen ra Mã c6.'},
      {m:'b1d2', t:'Mã d2 xong. Thế dựng của Trắng gần như giống nhau dù Đen đáp gì.'}
    ]},
    {phase:'Làm cùng', type:'quiz', q:'Trong Caro-Kann, vì sao Đen ra Tượng c8 trước khi đẩy Tốt e6?', opts:['Vì đẩy Tốt e6 trước sẽ nhốt Tượng c8 sau Tốt của mình','Vì Tượng c8 mạnh hơn Hậu','Vì luật cờ bắt buộc'], correct:0, why:'Tốt e6 chặn đường chéo của Tượng c8. Ra Tượng trước, rồi mới đẩy Tốt.'},
    {phase:'Tự làm', type:'quiz', q:'Cách làm bộ khai cuộc "lớn dần theo ván thật" là gì?', opts:['Sau mỗi ván, xem mình ra khỏi sách ở nước nào, rồi thêm đúng nước đó vào bộ của mình','Học thuộc 50 nước ngay từ đầu','Đổi khai cuộc mỗi ván'], correct:0, why:'Bộ khai cuộc lớn dần theo những ván bạn thật sự chơi, nên bạn học đúng thứ mình cần.'},
    {phase:'Tự làm', type:'quiz', q:'Học ý tưởng tốt hơn học thuộc 20 nước vì sao?', opts:['Đối thủ sẽ sớm đi ra ngoài nước bạn đã học, khi đó chỉ ý tưởng mới giúp bạn chọn nước','Vì 20 nước quá dễ','Vì ý tưởng nhanh hơn đi nước'], correct:0, why:'Đối thủ thường đi khác sách. Khi đó bạn cần hiểu vì sao các nước được chơi.'},
    {phase:'Chốt', type:'note', title:'Việc nhỏ cho bạn', list:['Chọn một khai cuộc cho mỗi mục: Trắng, Đen đáp 1.e4, Đen đáp 1.d4.','Học 8 đến 10 nước đầu và ý tưởng của từng khai cuộc.','Chơi vài ván, ghi lại nước đối thủ đi khác sách.'], tip:'Hãy mở mục Khai cuộc để học khai cuộc Ý và Caro-Kann trước.'},
    {phase:'Chốt', type:'quiz', q:'Mục tiêu thực tế của bộ khai cuộc là gì?', opts:['Vào trung cuộc với thế quen thuộc','Thắng trong 5 nước','Không bao giờ đổi quân'], correct:0, why:'Bạn biết cấu trúc Tốt và kế hoạch, nên chơi tự tin hơn.'}
  ]},

  'kiem-tra-3': {title:'Ôn trộn và kiểm tra cấp 3', test:true, level:3, reviewed:false, intro:[
    'Bài này có 12 câu về ba nguyên tắc khai cuộc, các bẫy phổ biến và bộ khai cuộc.',
    'Điểm chỉ tính khi bạn đúng ngay lần đầu. Cần đúng ít nhất 10 câu trong 12 để qua cấp.'
  ], steps:[
    {from:'ba-nguyen-tac', type:'quiz', q:'Mã ở giữa bàn cờ khác Mã ở góc thế nào?', opts:['Mã giữa bàn tấn công nhiều ô hơn, Mã ở góc chỉ tấn công 2 ô','Không khác nhau','Mã ở góc mạnh hơn'], correct:0, why:'Mã ở giữa bàn tấn công tới 8 ô, ở góc chỉ 2 ô.'},
    {from:'ba-nguyen-tac', type:'find', fen:'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', answer:['e2e4','d2d4'], text:'Trắng đi nước đầu tiên: hãy chiếm trung tâm bằng một Tốt.', why:'Tốt e4 hoặc d4 chiếm trung tâm.'},
    {from:'ba-nguyen-tac', type:'find', fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', answer:['b8c6','g8f6'], wrong:{d8h4:'Hậu ra sớm bị Mã ăn: Nxh4.'}, text:'Đen đi: hãy phát triển một Mã.', why:'Mã ra trận giữ trung tâm. Đừng đưa Hậu ra sớm.'},
    {from:'ba-nguyen-tac', type:'find', fen:'r1bqk2r/ppppbppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 1 5', answer:['e1g1','b1c3'], text:'Trắng đi: hãy đưa Vua vào chỗ an toàn.', why:'Nhập thành đưa Vua vào góc và đưa Xe ra giữa.'},
    {from:'ba-nguyen-tac', type:'quiz', q:'Vì sao không nên đưa Hậu ra quá sớm?', opts:['Hậu bị quân nhẹ đuổi, đối thủ được thêm nhịp','Hậu không đi được','Hậu rất yếu'], correct:0, why:'Hậu ra sớm bị đuổi, đối thủ vừa đuổi vừa phát triển quân.'},
    {from:'bay-khai-cuoc', type:'quiz', q:'Vì sao ô f7 là ô yếu ở khai cuộc?', opts:['Chỉ có Vua bảo vệ nó','Nó là ô tối','Có hai Tốt đứng sau nó'], correct:0, why:'Ô f7 chỉ có Vua bảo vệ và hay bị Tượng với Hậu cùng nhắm tới.'},
    {from:'bay-khai-cuoc', type:'find', fen:'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3', answer:['g7g6','d8e7','g8h6'], wrong:{g8f6:'Qxf7 chiếu hết.'}, text:'Đen đi. Hậu và Tượng trắng đang nhắm ô f7. Hãy chặn đòn chiếu hết.', why:'Đuổi Hậu bằng g6 hoặc bảo vệ f7.'},
    {from:'bay-khai-cuoc', type:'find', fen:'r1bqkbnr/pppp1ppp/8/4p3/2BnP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', answer:['f3d4'], wrong:{f3e5:'Qg5 đánh hai quân cùng lúc.'}, text:'Trắng đi. Mã đen vừa nhảy tới d4. Hãy chọn nước an toàn.', why:'Ăn Mã d4 là đúng. Ăn Tốt e5 thì bị ...Qg5.'},
    {from:'bay-khai-cuoc', type:'find', fen:'r1bqkb1r/ppp2ppp/2n2n2/3Pp1N1/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 5', answer:['c6a5'], text:'Đen đi. Hãy tìm nước phòng thủ đúng thay vì ăn lại Tốt d5.', why:'Mã a5 đuổi Tượng c4 khỏi đường nhắm f7.'},
    {from:'bay-khai-cuoc', type:'quiz', q:'Điểm chung của bẫy Légal và bẫy Con voi là gì?', opts:['Quân bị ghim tương đối vẫn đi được và phạt lại đối thủ tham ăn','Cả hai bắt đầu bằng 1.f3','Cả hai chỉ có Tốt'], correct:0, why:'Quân chỉ bị ghim vào Hậu (ghim tương đối) vẫn đi được, và đối thủ tham ăn sẽ bị phạt.'},
    {from:'bo-khai-cuoc', type:'quiz', q:'Mục tiêu thực tế của bộ khai cuộc là gì?', opts:['Vào trung cuộc với thế quen thuộc','Thắng trong 5 nước','Không bao giờ đổi quân'], correct:0, why:'Bạn biết cấu trúc Tốt và kế hoạch.'},
    {from:'bo-khai-cuoc', type:'quiz', q:'Trong Caro-Kann, vì sao ra Tượng c8 trước khi đẩy Tốt e6?', opts:['Để Tượng không bị nhốt sau Tốt','Vì Tượng mạnh hơn Hậu','Vì luật bắt buộc'], correct:0, why:'Đẩy Tốt e6 trước sẽ chặn đường chéo của Tượng c8.'}
  ]}
};

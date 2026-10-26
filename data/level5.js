/* Cấp 5: Chiến lược và tàn cuộc. Soạn từ Chương 4, 5 và 6 của khóa học "Cờ vua: từ biết luật đến chơi khá",
   viết lại cho học sinh. Thế cờ và nước đáp án được kiểm bằng tools/check_lessons.js (luật) và tools/check_mates.py (Stockfish).
   Phần nhận định chiến lược là kiến thức phổ biến trong sách cờ, chờ thầy duyệt (reviewed:false).
   Không đưa số đo "hơn bao nhiêu tốt" của máy vào bài vì chưa kiểm chứng đủ. */
const LV5 = {
  'tot-yeu': {title:'Tốt yếu: cô lập, chồng, lạc hậu', reviewed:false, intro:[
    'Một Tốt gọi là yếu khi không có Tốt nào bảo vệ được nó. Muốn giữ nó phải dùng quân, mà quân bị trói vào việc giữ Tốt thì mất tự do.',
    'Có ba kiểu Tốt yếu hay gặp: Tốt cô lập, Tốt chồng và Tốt lạc hậu. Bài này dạy bạn nhận ra chúng và biết cách tấn công chúng.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân Mã nhảy qua các quân khác được. Còn Tốt thì sao?', opts:['Tốt không nhảy qua được, bị chặn ngay trước mặt','Tốt cũng nhảy qua được','Tốt đi lùi được'], correct:0, why:'Tốt chỉ tiến thẳng, nên bị quân đứng ngay trước chặn lại. Đó là lý do cấu trúc Tốt rất quan trọng.'},
    {phase:'Học', type:'show', fen:'4k3/pp3ppp/8/8/3P4/8/PP3PPP/4K3 w - - 0 1', text:'Nhìn Tốt trắng d4. Ở hai cột bên cạnh (cột c và cột e) Trắng không còn Tốt nào. Không Tốt nào đứng cạnh để bảo vệ nó. Đó là Tốt cô lập.'},
    {phase:'Học', type:'quiz', q:'Trong thế cờ này, Tốt trắng nào là Tốt cô lập?', fen:'4k3/pp3ppp/8/8/3P4/8/PP3PPP/4K3 w - - 0 1', opts:['Tốt d4','Tốt a2','Tốt g2'], correct:0, why:'Tốt a2 có Tốt b2 bên cạnh, Tốt g2 có Tốt f2 và h2. Chỉ Tốt d4 không có Tốt nào ở cột c và cột e.'},
    {phase:'Học', type:'quiz', q:'Hai Tốt trắng nào là Tốt chồng (hai Tốt cùng màu nằm trên cùng một cột)?', fen:'4k3/pp3ppp/8/8/8/2P5/PPP2PPP/4K3 w - - 0 1', opts:['Tốt c2 và Tốt c3','Tốt a2 và Tốt b2','Tốt f2 và Tốt g2'], correct:0, why:'Hai Tốt c2 và c3 đứng chồng lên nhau trên cột c. Tốt chồng khó bảo vệ nhau, vì Tốt phía sau không bảo vệ được Tốt đứng trước nó.'},
    {phase:'Học', type:'quiz', q:'Tốt trắng nào là Tốt lạc hậu? (Hai Tốt bên cạnh đã đi lên trước, nó bị bỏ lại phía sau và không đẩy lên được an toàn vì ô trước mặt bị Tốt đen canh.)', fen:'4k3/pp3ppp/8/4p3/2P1P3/3P4/PP3PP1/4K3 w - - 0 1', opts:['Tốt d3','Tốt c4','Tốt a2'], correct:0, why:'Tốt d3 bị bỏ lại sau Tốt c4 và e4. Ô d4 phía trước nó bị Tốt đen e5 canh, nên nếu đẩy lên là bị ăn. Tốt a2 và b2 vẫn đứng cạnh nhau nên không lạc hậu.'},
    {phase:'Học', type:'note', title:'Cách tấn công một Tốt yếu', list:['1. Cố định nó: đặt quân hoặc Tốt chặn ngay trước mặt để nó không đẩy lên đổi quân được.','2. Chiếm ô ngay trước mặt nó, thường bằng Mã (Mã không bị Tốt yếu đuổi đi).','3. Dồn nhiều quân tấn công nó hơn số quân đối thủ giữ được. Xe xếp chồng trên cột nửa mở rất hợp.','4. Nếu đối thủ vẫn giữ được, hãy tạo một điểm yếu thứ hai ở cánh bên kia.'], tip:'Ví dụ ở phòng thí nghiệm: một thiết bị đắt tiền mà chỉ một người biết dùng. Khi dự án dồn dập thì nó rất có ích, nhưng nếu người đó vắng mặt thì cả dự án bị đình trệ. Tốt cô lập cũng vậy.'},
    {phase:'Học', type:'show', fen:'r1bq1rk1/pp2bppp/2n1pn2/8/3P4/2NB1N2/PP3PPP/R1BQ1RK1 w - - 0 1', text:'Đây là thế Tốt cô lập d4 rất hay gặp trong ván thật. Bên có Tốt d4 thường tấn công sớm và giữ nhiều quân trên bàn để dùng Tốt d4 làm "bàn đạp". Bên kia thì phong tỏa ô d5 (Mã d5 là tốt nhất) và đổi quân để đưa ván cờ vào tàn cuộc, nơi Tốt d4 chỉ còn là gánh nặng.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'hangingPiece', band:'de'}, {theme:'fork', band:'de'}], n:4},
    {phase:'Chốt', type:'quiz', q:'Vì sao Tốt cô lập bị coi là yếu?', opts:['Không có Tốt nào bảo vệ nó, chỉ quân mới bảo vệ được','Vì nó đi chậm','Vì nó luôn bị ghim'], correct:0, why:'Muốn giữ nó phải dùng quân, mà quân bị trói vào việc canh Tốt sẽ thụ động.'}
  ]},

  'tot-thong': {title:'Tốt thông và đột phá', reviewed:false, intro:[
    'Tốt thông là Tốt không còn Tốt đối thủ nào chặn trước mặt hoặc đánh vào đường đi của nó tới hàng phong cấp.',
    'Mỗi nước tiến của Tốt thông buộc đối thủ phải dành quân canh. Vì vậy ở tàn cuộc, Tốt thông là một "vũ khí".'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Tốt chạm hàng cuối của đối thủ thì sao?', opts:['Phong cấp, thường thành Hậu','Biến mất','Đứng yên'], correct:0, why:'Tốt phong cấp, thường thành Hậu.'},
    {phase:'Học', type:'quiz', q:'Tốt trắng d5 có phải Tốt thông không? (Nhìn các Tốt đen ở cột c, d, e.)', fen:'4k3/pp3ppp/8/3P4/8/8/PP3PPP/4K3 w - - 0 1', opts:['Có, vì không Tốt đen nào ở cột c, d, e','Không'], correct:0, why:'Đen không còn Tốt nào ở cột c, d, e, nên không Tốt nào chặn hoặc ăn được Tốt d5 trên đường đi. Đó là Tốt thông.'},
    {phase:'Học', type:'quiz', q:'Thế này thì sao: Tốt trắng d5 có phải Tốt thông không?', fen:'4k3/pp3ppp/4p3/3P4/8/8/PP3PPP/4K3 w - - 0 1', opts:['Có','Không, vì Tốt đen e6 đánh được vào ô d5 và các ô phía trước nó'], correct:1, why:'Tốt đen e6 ở cột bên cạnh và đứng phía trước, nó đánh được các ô mà Tốt d5 muốn đi qua. Vì vậy d5 không còn là Tốt thông.'},
    {phase:'Học', type:'note', title:'Ba điều cần nhớ', list:['Tốt thông bị trói quân đối thủ: mỗi bước tiến buộc đối thủ phải đặt quân canh trước nó.','Chuỗi Tốt (các Tốt xếp chéo bảo vệ nhau) có điểm yếu ở "gốc": Tốt cuối chuỗi không có Tốt nào bảo vệ. Hãy tấn công vào gốc.','Nếu mình có nhiều Tốt hơn ở một cánh (ví dụ 3 chống 2), mình có thể tạo Tốt thông ở cánh đó.'], tip:'Tốt thông được Tốt khác bảo vệ thì đặc biệt mạnh.'},
    {phase:'Học', type:'show', fen:'7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1', text:'Thế cờ kinh điển "3 chống 3". Mỗi bên có ba Tốt đứng đối mặt nhau, ai cũng bị chặn. Vua trắng và Vua đen đều ở xa. Trắng có thể hy sinh Tốt để tạo ra Tốt thông. Đó gọi là đột phá.'},
    {phase:'Làm cùng', type:'find', fen:'7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1', answer:['b5b6'], wrong:{c5c6:'Sai thứ tự. Đen ăn lại bằng bxc6 và các Tốt đen chạy trước, Đen lại thắng.', a5a6:'Sai thứ tự. Đen ăn lại bằng bxa6 và Tốt đen chạy trước, Đen lại thắng.'}, text:'Trắng đi. Hãy đột phá để tạo Tốt thông. Bắt đầu bằng Tốt nào?', hint:'Đột phá bắt đầu từ Tốt ở giữa, b5. Đẩy nó lên b6.', why:'b6! Nếu Đen ăn bằng axb6 thì c6 mở đường, nếu cxb6 thì a6 mở đường. Dù thế nào Trắng cũng tạo được một Tốt thông chạy xa nhất.'},
    {phase:'Học', type:'demo', fen:'7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1', start:'Bấm nút để xem Trắng đột phá khi Đen ăn Tốt.', text:'Xem đột phá 3 chống 3.', moves:[
      {m:'b5b6', t:'Trắng hy sinh Tốt b6.'},
      {m:'c7b6', t:'Đen ăn bằng Tốt c. Bây giờ cột c mở ra.'},
      {m:'a5a6', t:'Trắng hy sinh thêm Tốt a6, kéo Tốt b7 đi.'},
      {m:'b7a6', t:'Đen ăn tiếp. Tốt b7 rời khỏi cột b, và cột c không còn Tốt đen nào chặn.'},
      {m:'c5c6', t:'Tốt c6 bây giờ là Tốt thông! Không Tốt đen nào ở cột b, c, d chặn được nó.'},
      {m:'h8g7', t:'Vua đen chạy về hướng Tốt nhưng quá xa.'},
      {m:'c6c7', t:'Tốt c7.'},
      {m:'g7f6', t:'Vua đen vẫn không kịp.'},
      {m:'c7c8q', t:'Tốt phong Hậu và Trắng thắng.'}
    ]},
    {phase:'Làm cùng', type:'quiz', q:'Cùng thế cờ đó nhưng bây giờ đến lượt ĐEN đi. Đen nên đi b6. Kết quả thế nào?', fen:'7k/ppp5/8/PPP5/8/8/8/7K b - - 0 1', opts:['Hòa, vì Đen đi trước chặn được đột phá','Trắng vẫn thắng','Đen thắng'], correct:0, why:'Đen đi b6 trước, chặn mất đột phá. Máy tính cho kết quả hòa. Trong đột phá, ai đi trước quan trọng hơn số Tốt.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'skewer', band:'de'}, {theme:'pin', band:'de'}], n:4},
    {phase:'Chốt', type:'quiz', q:'Vì sao Tốt thông mạnh?', opts:['Mỗi bước tiến buộc đối thủ phải dành quân để canh','Vì nó đi nhanh hơn Tốt khác','Vì nó không bị ăn được'], correct:0, why:'Quân đối thủ bị trói vào việc canh Tốt thông nên không tấn công được chỗ khác.'}
  ]},

  'quan-tot-xau': {title:'Quân tốt và quân xấu', reviewed:false, intro:[
    'Cùng một quân, nhưng đứng ở chỗ này thì mạnh, đứng chỗ kia thì yếu. Giá trị thật của quân phụ thuộc vào ô nó đứng và vào Tốt xung quanh.',
    'Bài này dạy bạn về Tượng tốt, Tượng xấu, cặp Tượng, khi nào nên chọn Mã hay Tượng, và khi nào nên đổi quân.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân Tượng đi trên mấy màu ô?', opts:['Chỉ một màu ô, màu mà nó bắt đầu','Cả hai màu','Tùy nước đi'], correct:0, why:'Mỗi Tượng chỉ đi trên một màu ô suốt ván cờ.'},
    {phase:'Học', type:'show', fen:'2b3k1/5ppp/2p1p3/3p4/3P4/2N1P3/PP3PPP/6K1 w - - 0 1', text:'Nhìn Tượng đen c8 (đi trên ô trắng). Các Tốt đen c6, d5, e6 cũng đứng trên ô trắng. Tượng c8 bị chính Tốt của mình chặn đường, chỉ còn đi ra được rất ít ô.'},
    {phase:'Học', type:'quiz', q:'Quân nào của Đen bị coi là Tượng xấu và vì sao?', fen:'2b3k1/5ppp/2p1p3/3p4/3P4/2N1P3/PP3PPP/6K1 w - - 0 1', opts:['Tượng c8: các Tốt c6, d5, e6 cùng màu ô và chặn đường của nó','Tượng c8: vì nó đứng ở hàng cuối','Không có Tượng xấu nào'], correct:0, why:'Tượng xấu là Tượng mà nhiều Tốt của chính mình đứng cùng màu ô với nó, nên bị chặn. Tượng xấu vẫn còn tác dụng bảo vệ các Tốt cùng màu.'},
    {phase:'Học', type:'note', title:'Tượng tốt, Tượng xấu và cặp Tượng', list:['Tượng xấu: nhiều Tốt của mình đứng cùng màu ô với nó, nên Tốt chặn đường của nó.','Tượng tốt: đường chéo thông thoáng, ít Tốt mình chặn.','Cặp Tượng (cả hai Tượng của mình còn): phủ cả hai màu ô. Cặp Tượng thường mạnh nhất khi thế cờ mở và trong tàn cuộc có Tốt ở cả hai cánh.'], tip:'Muốn biết Tượng tốt hay xấu, đếm Tốt của mình đứng cùng màu ô với nó.'},
    {phase:'Học', type:'note', title:'Mã hay Tượng?', list:['Thế cờ đóng (các Tốt bị khóa lại, ít đường đi): Mã tốt hơn, vì Mã nhảy qua được Tốt và có thể đứng ở tiền đồn.','Thế cờ mở (ít Tốt ở giữa): Tượng tốt hơn, vì đi được đường dài.','Tàn cuộc có Tốt ở hai cánh: Tượng tốt hơn vì canh được cả hai cánh cùng lúc.','Tàn cuộc có Tốt chỉ ở một cánh: Mã và Tượng gần ngang nhau.']},
    {phase:'Làm cùng', type:'quiz', q:'Các Tốt khóa chặt nhau ở giữa bàn, chẳng đường nào mở. Nên chọn Mã hay Tượng?', opts:['Mã, vì nhảy qua Tốt được','Tượng, vì đi đường dài','Như nhau'], correct:0, why:'Thế đóng có lợi cho Mã: nó nhảy qua các Tốt bị khóa mà Tượng thì không.'},
    {phase:'Làm cùng', type:'quiz', q:'Thế cờ rất mở, Tốt đã đổi gần hết, còn Tốt ở cả hai cánh. Quân nào có lợi?', opts:['Tượng, nhất là cặp Tượng','Mã','Xe'], correct:0, why:'Tượng đi đường dài và canh được hai cánh. Cặp Tượng càng mạnh.'},
    {phase:'Học', type:'note', title:'Khi nào nên đổi quân?', list:['Đang hơn quân hoặc hơn Tốt: đổi quân (không đổi Tốt) để tiến vào tàn cuộc dễ thắng.','Đang bị chật chội: đổi quân để có thêm chỗ.','Đổi Tượng tốt của đối thủ lấy Tượng xấu của mình.','Đổi quân đang phòng thủ quan trọng của đối thủ.','Không đổi khi mình đang tấn công và cần nhiều quân.'], tip:'Bên có nhiều không gian thì muốn tránh đổi. Bên bị chật chội mới cần đổi.'},
    {phase:'Tự làm', type:'quiz', q:'Bạn đang hơn một Tốt. Nên đổi quân hay đổi Tốt?', opts:['Đổi quân, giữ Tốt','Đổi Tốt, giữ quân','Không đổi gì'], correct:0, why:'Càng ít quân thì Tốt dư càng quyết định. Đổi quân đưa ván cờ về tàn cuộc dễ thắng.'},
    {phase:'Chốt', type:'quiz', q:'Tượng xấu có ích gì?', opts:['Bảo vệ các Tốt cùng màu ô','Không có ích gì','Tấn công mạnh nhất'], correct:0, why:'Tượng xấu bị Tốt chặn nên kém hoạt động, nhưng vẫn bảo vệ được các Tốt đứng cùng màu ô.'}
  ]},

  'co-mo-tien-don': {title:'Tiền đồn và cột mở', reviewed:false, intro:[
    'Quân mạnh hay yếu phụ thuộc rất nhiều vào ô nó đứng. Một Mã ở ô tốt có thể mạnh hơn cả một Xe bị kẹt.',
    'Bài này dạy hai chỗ đứng đẹp: tiền đồn cho Mã và cột mở cho Xe.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Tốt chỉ ăn theo hướng nào?', opts:['Chéo về phía trước','Thẳng về phía trước','Mọi hướng'], correct:0, why:'Tốt đi thẳng nhưng ăn chéo. Vì vậy Tốt chỉ đánh được hai ô chéo phía trước nó.'},
    {phase:'Học', type:'show', fen:'6k1/1b3ppp/p2p4/1p1Np3/4P3/8/PPP2PPP/6K1 w - - 0 1', text:'Mã trắng d5 đứng ở ô rất đẹp. Tốt trắng e4 bảo vệ nó. Đen không còn Tốt ở cột c, và Tốt đen e5 đã đi qua rồi. Không Tốt đen nào đuổi được Mã. Ô như vậy gọi là tiền đồn.'},
    {phase:'Học', type:'note', title:'Tiền đồn là gì?', list:['Ô yếu (còn gọi là "lỗ"): ô mà Tốt của một bên không thể đánh được nữa.','Tiền đồn: ô yếu của đối thủ, nằm ở nửa bàn của họ, và có Tốt mình bảo vệ.','Mã hợp nhất với tiền đồn: nó tầm ngắn, cần đứng gần mục tiêu, và không Tốt nào đuổi được.'], tip:'Quân quá mạnh thì đối thủ sẽ tìm cách đổi nó. Ở thế này Đen có thể đổi Tượng lấy Mã (Bxd5) để gỡ quân mạnh nhất của Trắng.'},
    {phase:'Làm cùng', type:'quiz', q:'Vì sao Đen khó chịu với Mã trắng ở d5?', fen:'6k1/1b3ppp/p2p4/1p1Np3/4P3/8/PPP2PPP/6K1 w - - 0 1', opts:['Không Tốt đen nào đánh được ô d5 để đuổi Mã','Vì Mã d5 luôn chiếu hết','Vì ô d5 là ô trắng'], correct:0, why:'Đen không còn Tốt ở cột c, và Tốt e5 đã đi qua d5. Nên Mã đứng đó mãi và quân nào của Đen cũng phải tránh nó.'},
    {phase:'Học', type:'note', title:'Cột mở và hàng 7 cho Xe', list:['Cột mở: cột không còn Tốt nào. Cột nửa mở: cột chỉ còn Tốt của đối thủ.','Xe cần đường dài, nên hãy đặt Xe lên cột mở hoặc nửa mở.','Hàng 7 là hàng Tốt đối thủ chưa đi và Vua của họ hay đứng gần đó. Xe lên hàng 7, nhất là hai Xe cùng lên, thường thắng được ít nhất một Tốt.'], tip:'Sau khi chiếm cột mở, Xe muốn đi tiếp tới hàng 7 hoặc hàng 8 của đối thủ.'},
    {phase:'Làm cùng', type:'quiz', q:'Cột nào là cột mở (không còn Tốt nào của cả hai bên)?', fen:'r5k1/pp3ppp/8/8/8/8/PP3PPP/3R2K1 w - - 0 1', opts:['Cột d','Cột a','Cột g'], correct:0, why:'Cột d không còn Tốt nào của cả hai bên. Xe trắng d1 đang đứng trên cột mở và có thể tiến lên d7.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'trappedPiece', band:'de'}, {theme:'fork', band:'de'}], n:4},
    {phase:'Chốt', type:'quiz', q:'Quân nào hợp nhất với tiền đồn?', opts:['Mã','Hậu','Vua'], correct:0, why:'Mã không bị Tốt đuổi và đứng gần mục tiêu mà vẫn rất mạnh.'},
    {phase:'Chốt', type:'quiz', q:'Xe nên ưu tiên đứng ở đâu?', opts:['Cột mở hoặc nửa mở','Góc bàn cờ','Sau lưng Tốt của mình'], correct:0, why:'Xe cần đường dài. Cột mở cho nó đường đi và dẫn tới hàng 7.'}
  ]},

  'phong-ngua': {title:'Phòng ngừa, phong tỏa, hai điểm yếu', reviewed:false, intro:[
    'Có lúc bàn cờ không có đòn chiến thuật nào. Khi đó người giỏi vẫn biết nên làm gì. Họ dùng ba ý tưởng của kiện tướng Nimzowitsch: phòng ngừa, phong tỏa và hai điểm yếu.',
    'Đây là cách nghĩ của người chơi chiến lược, và rất hữu ích khi bạn "không biết đi gì".'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân phòng thủ tốt nhất cho ô h7 (khi Vua đen đã nhập thành) thường là quân nào?', opts:['Mã f6','Tốt a7','Xe a8'], correct:0, why:'Mã f6 bảo vệ ô h7, ta đã gặp ở bài tấn công Vua.'},
    {phase:'Học', type:'note', title:'1. Phòng ngừa', list:['Trước khi thực hiện kế hoạch, hãy hỏi: "Nếu đối thủ được đi hai nước liên tiếp, họ sẽ làm gì?"','Rồi ngăn điều đó trước.','Giống như trong phòng lab: trước khi chạy mẻ thử, hãy kiểm tra những chỗ hay hỏng thay vì xử lý sự cố giữa chừng.'], tip:'Người chơi nổi tiếng theo phong cách này là Karpov và Petrosian.'},
    {phase:'Làm cùng', type:'quiz', q:'Trắng vừa đi Mã g5. Nếu Đen đi một nước chờ, Trắng định làm gì?', fen:'r1bqkb1r/pppp1ppp/2n2n2/6N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 0 4', opts:['Mxf7, Mã đánh cùng lúc Hậu d8 và Xe h8','Mxh7','Tượng ăn b7'], correct:0, why:'Mxf7 là đòn đôi: Mã f7 tấn công cả Hậu d8 và Xe h8. Biết trước điều đối thủ định làm giúp Đen chuẩn bị phòng ngừa.'},
    {phase:'Học', type:'note', title:'2. Phong tỏa', list:['Tốt thông của đối thủ phải bị chặn bằng quân đứng NGAY TRƯỚC nó, không chỉ là canh từ xa.','Quân phong tỏa tốt nhất là Mã: Tốt không đuổi được nó, và từ chỗ đó Mã vẫn đánh được các ô xung quanh.','Nimzowitsch nói đại ý: "Tốt thông là kẻ phạm tội, phải giam lại."'], tip:'Phong tỏa: đứng ngay trước. Canh: chỉ đánh vào ô trước mặt, Tốt vẫn có thể được hỗ trợ đẩy lên.'},
    {phase:'Làm cùng', type:'quiz', q:'Đối thủ có một Tốt thông. Quân nào phong tỏa tốt nhất?', opts:['Mã, đứng ngay trước Tốt','Hậu, đứng xa canh','Vua, bỏ nhiệm vụ khác'], correct:0, why:'Mã không bị Tốt đuổi và vẫn hoạt động từ ô phong tỏa.'},
    {phase:'Học', type:'note', title:'3. Hai điểm yếu', list:['Một điểm yếu thì đối thủ dồn quân về giữ được.','Hãy tạo thêm điểm yếu thứ hai ở bên kia bàn cờ, rồi chuyển tấn công qua lại.','Quân phòng thủ phải chạy qua chạy lại, đến lúc không kịp.'], tip:'Giống một người trông hai cửa: dồn người ra cửa này thì cửa kia bị bỏ ngỏ.'},
    {phase:'Học', type:'note', title:'Khi không biết đi gì, hỏi 4 câu', list:['1. Đối thủ muốn gì? (phòng ngừa)','2. Quân nào của mình đứng kém nhất? Đưa nó tới ô tốt hơn.','3. Điểm yếu của đối thủ ở đâu? Có tạo được điểm yếu thứ hai không?','4. Có Tốt thông nào cần phong tỏa hoặc đẩy lên không?'], tip:'Mỗi nước vẫn phải kiểm tra chiến thuật như thường. Kế hoạch không thay được việc nhìn đòn.'},
    {phase:'Tự làm', type:'quiz', q:'Vì sao cần điểm yếu thứ hai?', opts:['Một điểm yếu thì giữ được, hai điểm yếu ở xa nhau thì quân phòng thủ không kịp chạy','Vì luật cờ bắt buộc','Để Vua dễ nhập thành'], correct:0, why:'Hai điểm yếu xa nhau làm quân phòng thủ bị quá tải.'},
    {phase:'Chốt', type:'quiz', q:'Câu hỏi cốt lõi của phòng ngừa là gì?', opts:['"Nếu đối thủ được đi hai nước liên tiếp, họ làm gì?"','"Quân nào của tôi mạnh nhất?"','"Tôi ăn được gì?"'], correct:0, why:'Hỏi câu đó để ngăn kế hoạch của đối thủ trước khi nó thành hiện thực.'}
  ]},

  'lap-ke-hoach': {title:'Lập kế hoạch', reviewed:false, intro:[
    'Kế hoạch là câu trả lời cho câu hỏi "Thế này cần gì?". Nó xuất phát từ những đặc điểm lâu dài của thế cờ: cấu trúc Tốt, ô yếu, quân tốt xấu, an toàn của Vua.',
    'Bài này dạy bạn đi từ nhận xét thế cờ, đến một mục tiêu, rồi đến kế hoạch ba đến năm nước.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Tốt cô lập khác Tốt lạc hậu ở điểm nào?', opts:['Tốt cô lập không có Tốt cạnh nào, Tốt lạc hậu vẫn có Tốt cạnh nhưng chúng đã đi lên trước','Hai loại giống nhau','Tốt lạc hậu luôn thua'], correct:0, why:'Cô lập: không có Tốt bên cạnh. Lạc hậu: Tốt bên cạnh đã đi lên và không bảo vệ được nó.'},
    {phase:'Học', type:'note', title:'Sáu bước lập kế hoạch', list:['1. Nhìn thế cờ: so hai bên về vật chất (ai hơn quân), an toàn Vua, cấu trúc Tốt, quân nào thụ động, ô mạnh yếu, không gian.','2. Chọn MỘT mục tiêu (ví dụ "Tốt c6 yếu", "ô d5", "Vua đen thiếu quân giữ").','3. Hỏi: để đánh vào mục tiêu đó, quân nào cần đứng ở đâu?','4. Xếp thứ tự nước đi, ba đến năm nước.','5. Mỗi nước vẫn kiểm tra chiến thuật, đối thủ có đe dọa gì không.','6. Khi cấu trúc thay đổi (đổi Tốt, mở cột), nhìn lại từ bước 1.'], tip:'Steinitz, nhà vô địch thế giới đầu tiên: bên có ưu thế phải tấn công, nếu chần chừ thì ưu thế sẽ mất.'},
    {phase:'Học', type:'show', fen:'6k1/pp3ppp/2p5/3p4/3P4/4P3/PP3PPP/6K1 w - - 0 1', text:'Cánh Hậu: Trắng có hai Tốt (a2, b2) đứng trước ba Tốt đen (a7, b7, c6). Hãy nghĩ: Trắng có ít Tốt hơn ở cánh này. Kế hoạch có tên là tấn công thiểu số.'},
    {phase:'Làm cùng', type:'quiz', q:'Trắng đi. Kế hoạch hợp lý ở cánh Hậu là gì?', fen:'6k1/pp3ppp/2p5/3p4/3P4/4P3/PP3PPP/6K1 w - - 0 1', opts:['Đẩy Tốt b lên b4 rồi b5 để tạo điểm yếu cho Đen','Đẩy Tốt h để mở đường','Đổi hết quân'], correct:0, why:'Bên ít Tốt hơn ở một cánh đẩy Tốt lên để tạo điểm yếu. Nếu sau b5 Đen ăn bxc6 thì Tốt c lạc hậu, nếu Đen cxb5 thì Tốt d5 thành cô lập. Máy tính cũng thích b4 nhất, nhưng chỉ nhỉnh hơn các nước khác một chút.'},
    {phase:'Tự làm', type:'quiz', q:'Vì sao khi đang theo kế hoạch vẫn phải kiểm tra chiến thuật mỗi nước?', opts:['Một nước đúng kế hoạch vẫn có thể bỏ quân hoặc cho đối thủ đòn','Vì luật bắt buộc','Vì kế hoạch luôn sai'], correct:0, why:'Kế hoạch không thay được việc nhìn đòn. Mỗi nước vẫn qua năm bước kiểm tra như thường.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'hangingPiece', band:'de'}, {theme:'pin', band:'de'}, {theme:'fork', band:'de'}], n:4},
    {phase:'Chốt', type:'quiz', q:'Theo Steinitz, bên có ưu thế phải làm gì?', opts:['Tấn công, nếu chần chừ ưu thế sẽ mất dần','Chờ đối thủ phạm sai lầm','Đổi hết quân'], correct:0, why:'Bên ưu thế có nghĩa vụ tấn công. Bên yếu hơn nên phòng thủ chắc.'}
  ]},

  'tam-giac-reti': {title:'Tam giác hóa và nước Réti', reviewed:false, intro:[
    'Tàn cuộc có hai ý tưởng đẹp. Thứ nhất là mất một nhịp có chủ đích để chuyển lượt đi sang đối thủ. Thứ hai là một nước đi cùng lúc đuổi theo hai mục tiêu.',
    'Cả hai đều dựa trên chuyển động của Vua. Hãy xem kỹ từng bước.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quy tắc nào cho biết nhanh Vua có bắt kịp Tốt không?', opts:['Quy tắc hình vuông','Quy tắc ghim','Quy tắc nhập thành'], correct:0, why:'Hình vuông của Tốt cho biết Vua đối thủ có bắt kịp hay không.'},
    {phase:'Học', type:'show', fen:'8/1p1k4/1P6/2PK4/8/8/8/8 w - - 0 1', text:'Thế cờ kinh điển cho tam giác hóa. Trắng thắng, nhưng chỉ khi đi đúng. Điều kiện: nếu đến lượt Đen đi thế này thì Đen thua (zugzwang). Nhưng bây giờ lại đến lượt Trắng! Trắng cần "mất một nhịp".'},
    {phase:'Làm cùng', type:'find', fen:'8/1p1k4/1P6/2PK4/8/8/8/8 w - - 0 1', answer:['d5e4','d5c4','d5d4','d5e5'], wrong:{c5c6:'Đẩy Tốt vội. Đen đi Vua c8 và ván gần như hòa. Trắng nên mất một nhịp bằng Vua.'}, text:'Trắng đi. Đẩy Tốt c6 chiếu ngay có thắng không? Hãy thử suy nghĩ, rồi chọn nước tốt nhất.', hint:'Đừng đẩy Tốt. Trắng cần đi Vua để chuyển lượt đi sang cho Đen.', why:'Một nước Vua là tốt, ví dụ Ke5. Còn c6+ làm Đen kịp phòng thủ.'},
    {phase:'Học', type:'demo', fen:'8/1p1k4/1P6/2PK4/8/8/8/8 w - - 0 1', start:'Bấm nút để xem Vua trắng đi một vòng tam giác.', text:'Xem tam giác hóa.', moves:[
      {m:'d5e5', t:'Vua trắng bước thứ nhất của vòng tam giác: d5 sang e5.'},
      {m:'d7c6', t:'Đen đi Vua, chỉ có vài ô để đi qua lại nên đi Vua c6.'},
      {m:'e5d4', t:'Vua trắng bước thứ hai: e5 sang d4.'},
      {m:'c6d7', t:'Vua đen quay về d7.'},
      {m:'d4d5', t:'Vua trắng bước thứ ba: trở về d5. Thế cờ y hệt lúc đầu, nhưng bây giờ đến lượt ĐEN đi. Đen bị zugzwang và Trắng thắng.'}
    ]},
    {phase:'Học', type:'note', title:'Vì sao tam giác hóa có tác dụng?', list:['Vua tấn công đi ba nước theo hình tam giác để quay về đúng ô cũ.','Vua phòng thủ chỉ có hai ô an toàn để đi qua lại, nên đi hai nước cũng về ô cũ.','Kết quả: cùng một thế cờ, nhưng đến lượt đối thủ đi. Họ bị zugzwang.','Vua phòng thủ không tam giác lại được vì không có ô thứ ba an toàn.'], tip:'Trắng còn có cách thắng khác (máy tính tìm ra). Tam giác chỉ là cách dễ hiểu nhất.'},
    {phase:'Làm cùng', type:'quiz', q:'Sau khi Vua trắng đi hết vòng tam giác, thế cờ khác lúc đầu ở điểm nào?', opts:['Giống hệt, nhưng đến lượt Đen đi','Trắng mất một Tốt','Trắng đã nhập thành'], correct:0, why:'Đó là mục đích của tam giác hóa: mất một nhịp, chuyển lượt đi sang đối thủ.'},
    {phase:'Học', type:'show', fen:'7K/8/k1P5/7p/8/8/8/8 w - - 0 1', text:'Thế cờ nổi tiếng của kỳ thủ Richard Réti (1921). Trắng đi và hòa. Thoạt nhìn, Vua trắng h8 quá xa Tốt h5, còn Tốt c6 sắp bị Vua đen ăn. Có vẻ Trắng thua.'},
    {phase:'Làm cùng', type:'find', fen:'7K/8/k1P5/7p/8/8/8/8 w - - 0 1', answer:['h8g7'], wrong:{h8h7:'Vua đi thẳng xuống nhưng Tốt h chạy nhanh hơn, Vua trắng ngoài hình vuông và Tốt phong Hậu.', c6c7:'Đen ăn Tốt c7 bằng Vua, còn Vua trắng quá xa Tốt h nên Tốt h phong Hậu.'}, text:'Trắng đi và phải hòa. Hãy đi Vua theo ĐƯỜNG CHÉO. Vua nên đi đâu?', hint:'Đường chéo đi tới đích nhanh bằng đường thẳng. Vua đi chéo từ h8 vừa đến gần Tốt h, vừa hướng về Tốt c.', why:'Kg7! Vua đi chéo cùng lúc đuổi theo hai mục tiêu: Tốt h của Đen và Tốt c của mình.'},
    {phase:'Học', type:'demo', fen:'7K/8/k1P5/7p/8/8/8/8 w - - 0 1', start:'Bấm nút để xem Vua trắng đuổi theo hai mục tiêu cùng lúc.', text:'Xem nước Réti.', moves:[
      {m:'h8g7', t:'Vua đi chéo tới g7: gần Tốt h hơn.'},
      {m:'h5h4', t:'Tốt đen chạy.'},
      {m:'g7f6', t:'Vua đi chéo tiếp tới f6. Bây giờ Vua vừa tiến về Tốt h, vừa tiến về Tốt c.'},
      {m:'a6b6', t:'Đen quyết tâm ăn Tốt c bằng Vua.'},
      {m:'f6e5', t:'Vua trắng đi tiếp. Nếu Đen ăn Tốt c thì Vua trắng bắt kịp Tốt h. Nếu Đen đẩy Tốt h thì Vua trắng quay về hỗ trợ Tốt c.'},
      {m:'b6c6', t:'Vua đen ăn Tốt c.'},
      {m:'e5f4', t:'Vua trắng vào hình vuông của Tốt h và bắt kịp nó. Cả hai bên đều hết Tốt thông: ván hòa.'}
    ]},
    {phase:'Chốt', type:'quiz', q:'Điều gì giúp Vua đi chéo đuổi được hai mục tiêu cùng lúc?', opts:['Đi chéo tới đích nhanh bằng đi thẳng, nên một đường chéo có thể lại gần cả hai mục tiêu','Vua đi nhanh gấp đôi','Luật cờ cho phép'], correct:0, why:'Số nước Vua đi bằng số ô lớn hơn giữa hiệu hàng và hiệu cột. Vì vậy đi chéo không tốn thêm nước.'}
  ]},

  'xe-lucena-philidor': {title:'Tàn cuộc Xe: Lucena và Philidor', reviewed:false, intro:[
    'Tàn cuộc Xe và Tốt chống Xe là loại hay gặp nhất trong ván thật. Có hai thế nền móng mà người chơi nào cũng nên biết.',
    'Thế Lucena: bên có Tốt biết cách thắng. Thế Philidor: bên phòng thủ biết cách hòa.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Tốt trắng ở hàng 7 sắp phong cấp. Phong cấp ở hàng nào?', opts:['Hàng 8','Hàng 7','Hàng 1'], correct:0, why:'Tốt trắng phong cấp khi tới hàng 8.'},
    {phase:'Học', type:'show', fen:'1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1', text:'Thế Lucena. Tốt trắng b7 đã ở hàng 7. Vua trắng b8 đứng trước Tốt, nhưng bị cản: nếu Vua ra ngoài thì Xe đen chiếu liên tục. Xe trắng c1 cắt Vua đen ra một cột. Vấn đề: làm sao đưa Vua trắng ra mà không bị chiếu?'},
    {phase:'Học', type:'demo', fen:'1K1k4/1P6/8/8/8/8/r7/2R5 w - - 0 1', start:'Bấm nút để xem Trắng xây cầu.', text:'Xem cách thắng thế Lucena.', moves:[
      {m:'c1c4', t:'Xe lên hàng 4. Đây là bước chuẩn bị xây cầu.'},
      {m:'a2a1', t:'Đen đưa Xe ra xa để chuẩn bị chiếu.'},
      {m:'c4d4', t:'Xe d4 chiếu Vua đen và đẩy nó xa thêm một cột.'},
      {m:'d8e7', t:'Vua đen lùi sang e7.'},
      {m:'b8c7', t:'Bây giờ Vua trắng rời b8. Tốt b7 chuẩn bị đi tiếp.'},
      {m:'a1c1', t:'Đen chiếu từ cột c.'},
      {m:'c7b6', t:'Vua trắng tránh sang b6.'},
      {m:'c1b1', t:'Đen chiếu tiếp từ cột b.'},
      {m:'b6c6', t:'Vua trắng tránh sang c6.'},
      {m:'b1c1', t:'Đen lại chiếu.'},
      {m:'c6b5', t:'Vua trắng tránh sang b5, gần Xe d4 của mình.'},
      {m:'c1b1', t:'Đen chiếu lần nữa.'},
      {m:'d4b4', t:'Xe d4 xuống b4: đây là chiếc CẦU. Xe che đường chiếu của Xe đen.'},
      {m:'b1b4', t:'Đen buộc phải ăn Xe.'},
      {m:'b5b4', t:'Vua trắng ăn lại. Đen hết Xe, Tốt b7 sắp phong Hậu. Trắng thắng.'}
    ]},
    {phase:'Học', type:'note', title:'Lucena: xây cầu', list:['Điều kiện: Tốt đã ở hàng 7, Vua bên có Tốt đứng ngay trước Tốt, Vua đối thủ bị Xe cắt ra một cột.','Vấn đề: Vua ra ngoài là bị chiếu liên tục.','Cách giải: đưa Xe lên hàng 4 làm "cầu" che chiếu. Khi bị chiếu, Xe xuống chặn.','Lỗi hay gặp: ra Vua trước khi chuẩn bị cầu.'], tip:'Tên Lucena gắn với một nhà cờ thế kỷ 15, dù thế này có thể không có trong sách của ông. Đừng lo, quan trọng là ý tưởng "xây cầu".'},
    {phase:'Làm cùng', type:'quiz', q:'Trong thế Lucena, "xây cầu" nghĩa là gì?', opts:['Đưa Xe lên hàng 4 để che chiếu cho Vua','Đẩy Tốt lên hàng 8','Đổi Xe lấy Xe'], correct:0, why:'Xe hàng 4 làm cầu: khi Xe đen chiếu từ bên, Xe xuống chặn để Vua tiến lên.'},
    {phase:'Học', type:'show', fen:'4k3/R7/1r6/4PK2/8/8/8/8 b - - 0 1', text:'Thế Philidor. Bây giờ bạn là bên Đen và bên đối thủ có Tốt. Vua đen đứng trước Tốt. Xe đen b6 đứng ở hàng 6, tức hàng thứ ba tính từ phía mình. Nhiệm vụ của Đen: giữ hòa.'},
    {phase:'Học', type:'demo', fen:'4k3/R7/1r6/4PK2/8/8/8/8 b - - 0 1', start:'Bấm nút để xem Đen giữ hòa.', text:'Xem phòng thủ Philidor.', moves:[
      {m:'b6c6', t:'Xe đen đi dọc hàng 6 và chờ. Hàng 6 ngăn Vua trắng tiến lên trước Tốt.'},
      {m:'e5e6', t:'Trắng đẩy Tốt lên hàng 6. Bây giờ Tốt đã đi qua hàng của Xe đen, không còn che được cho Vua trắng.'},
      {m:'c6c1', t:'Xe đen về ngay hàng 1, sau lưng Tốt.'},
      {m:'f5f6', t:'Vua trắng tiến lên.'},
      {m:'c1f1', t:'Xe chiếu từ phía sau, chiếu mãi không dứt. Vua trắng không có chỗ trú vì Tốt e6 đã ở phía trước. Ván hòa.'}
    ]},
    {phase:'Học', type:'note', title:'Philidor: chiếu từ phía sau', list:['Điều kiện: Vua phòng thủ đứng trước Tốt, Tốt chưa lên hàng 6.','Xe phòng thủ đứng ở hàng thứ ba tính từ phía mình (hàng 6 với Đen), để Vua đối thủ không tiến lên được.','Khi Tốt lên hàng 6, Xe về hàng cuối của đối thủ và chiếu từ phía sau.','Lỗi hay gặp: Xe thụ động ở hàng cuối quá sớm.'], tip:'Philidor là một kiện tướng người Pháp, phân tích thế này năm 1777.'},
    {phase:'Làm cùng', type:'quiz', q:'Trong phòng thủ Philidor, khi Tốt đối thủ đẩy lên hàng 6, Xe phòng thủ làm gì?', opts:['Về hàng cuối của đối thủ và chiếu từ phía sau','Đứng yên ở hàng 6','Ăn Tốt ngay'], correct:0, why:'Khi Tốt đã lên hàng 6, Vua đối thủ không còn chỗ núp, nên chiếu từ sau là cách hòa.'},
    {phase:'Chốt', type:'quiz', q:'Hai thế này khác nhau thế nào?', opts:['Lucena: bên có Tốt cần thắng. Philidor: bên phòng thủ cần hòa','Hai thế giống hệt nhau','Lucena là phòng thủ, Philidor là tấn công'], correct:0, why:'Lucena dạy bên có Tốt cách thắng. Philidor dạy bên yếu hơn cách giữ hòa.'}
  ]},

  'tuong-sai-mau': {title:'Tượng sai màu và pháo đài', reviewed:false, intro:[
    'Có những ván cờ mà một bên hơn cả quân mà vẫn không thắng được. Đó là các thế hòa lý thuyết, hay thế "pháo đài".',
    'Bài này dạy ba thế hay gặp: Tượng sai màu, Tượng trái màu, và vài tàn cuộc quân nhẹ cần nhớ.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Hòa pat (bế tắc) là gì?', opts:['Đến lượt đi, Vua không bị chiếu nhưng không còn nước đi hợp lệ nào','Một bên xin hòa','Hai bên nhắc lại thế cờ'], correct:0, why:'Hòa pat: không còn nước hợp lệ và Vua không đang bị chiếu. Ván cờ hòa.'},
    {phase:'Học', type:'show', fen:'7k/8/5K2/7P/2B5/8/8/8 b - - 0 1', text:'Trắng có thêm một Tượng và một Tốt. Nhưng Tốt h5 cần phong cấp ở h8, mà h8 là ô tối (ô đen), còn Tượng c4 đi trên ô sáng (ô trắng). Tượng không bao giờ chạm tới góc h8. Nó là Tượng sai màu.'},
    {phase:'Học', type:'demo', fen:'7k/8/5K2/7P/2B5/8/8/8 b - - 0 1', start:'Bấm nút để xem Đen trốn ở góc.', text:'Xem Tượng sai màu hòa.', moves:[
      {m:'h8h7', t:'Đen chỉ có một nước hợp lệ: Vua h7.'},
      {m:'c4e6', t:'Trắng thử đủ cách để đẩy Đen khỏi góc.'},
      {m:'h7h6', t:'Vua đen đi ra.'},
      {m:'e6f7', t:'Tượng canh ô g8.'},
      {m:'h6h7', t:'Vua đen quay vào.'},
      {m:'f7g6', t:'Tượng chiếu Vua.'},
      {m:'h7h8', t:'Vua đen về góc h8. Trắng không đuổi được: Tượng không bao giờ canh được h8, còn nếu ép quá sát thì Đen bị hòa pat. Máy tính đánh giá ván hòa.'}
    ]},
    {phase:'Làm cùng', type:'quiz', q:'Cùng thế cờ nhưng Tượng trắng đứng ở f4 (ô tối, cùng màu với góc h8). Kết quả thế nào?', fen:'7k/8/5K2/7P/5B2/8/8/8 b - - 0 1', opts:['Trắng thắng, vì Tượng canh được ô h8','Vẫn hòa','Đen thắng'], correct:0, why:'Tượng đúng màu với ô phong cấp thì đuổi được Vua đen khỏi góc. Máy tính tìm ra chiếu hết trong khoảng 8 đến 10 nước.'},
    {phase:'Học', type:'note', title:'Tượng sai màu và pháo đài', list:['Tượng sai màu: Tượng khác màu với ô phong cấp của Tốt cạnh (Tốt a hoặc Tốt h). Vua phòng thủ vào góc là hòa.','Pháo đài: thế phòng thủ mà bên yếu hơn không bị phá được dù đối phương hơn quân. Bên yếu chỉ cần đi qua lại.','Khi bạn đang thua, hãy hỏi: có pháo đài nào không?','Máy cờ đôi khi đánh giá sai pháo đài (cho điểm hơn nhiều dù ván hòa), nên cần hiểu nguyên lý chứ không chỉ nhìn con số.'], tip:'Tượng trái màu: mỗi bên một Tượng, hai Tượng đi hai màu khác nhau. Ở tàn cuộc, bên hơn một hai Tốt thường vẫn hòa. Ở trung cuộc thì ngược lại, Tượng trái màu có lợi cho bên tấn công.'},
    {phase:'Học', type:'note', title:'Vài phép tính nhanh về quân nhẹ', list:['Vua và một Mã (hoặc một Tượng) chống Vua trần: hòa.','Vua và hai Mã chống Vua trần: không ép chiếu hết được.','Vua và hai Tượng chống Vua trần: thắng.','Vua, Tượng và Mã chống Vua trần: thắng nhưng khó.'], tip:'Phải đủ lực mới chiếu hết được. Đừng đổi hết quân khi chưa chắc còn đủ lực.'},
    {phase:'Tự làm', type:'quiz', q:'Vua và hai Mã chống Vua trần. Có ép chiếu hết được không?', opts:['Không ép được','Có, luôn thắng','Chỉ khi có Tốt'], correct:0, why:'Hai Mã không đủ lực ép Vua trần vào chiếu hết (chỉ chiếu hết nếu đối thủ đi sai).'},
    {phase:'Chốt', type:'quiz', q:'Tượng sai màu nghĩa là gì?', opts:['Tượng khác màu với ô phong cấp của Tốt cạnh, nên không đuổi được Vua phòng thủ khỏi góc','Tượng đã bị ăn','Tượng đứng sai chỗ trong khai cuộc'], correct:0, why:'Tượng sai màu không thể chạm tới ô góc nên Vua đối thủ trốn ở đó là hòa.'}
  ]},

  'kiem-tra-5': {title:'Ôn trộn và kiểm tra cấp 5', test:true, level:5, reviewed:false, intro:[
    'Bài này có 16 câu về Tốt yếu, Tốt thông, quân tốt xấu, tiền đồn, phòng ngừa, lập kế hoạch và các thế tàn cuộc.',
    'Điểm chỉ tính khi bạn đúng ngay lần đầu. Cần đúng ít nhất 13 câu trong 16 để qua cấp.'
  ], steps:[
    {from:'tot-yeu', type:'quiz', q:'Trong thế cờ này, Tốt trắng nào là Tốt cô lập?', fen:'4k3/pp3ppp/8/8/3P4/8/PP3PPP/4K3 w - - 0 1', opts:['Tốt d4','Tốt a2','Tốt g2'], correct:0, why:'Tốt d4 không có Tốt nào ở cột c và cột e.'},
    {from:'tot-yeu', type:'quiz', q:'Hai Tốt trắng nào là Tốt chồng?', fen:'4k3/pp3ppp/8/8/8/2P5/PPP2PPP/4K3 w - - 0 1', opts:['Tốt c2 và Tốt c3','Tốt a2 và Tốt b2','Tốt f2 và Tốt g2'], correct:0, why:'Hai Tốt đứng chồng trên cột c.'},
    {from:'tot-thong', type:'find', fen:'7k/ppp5/8/PPP5/8/8/8/7K w - - 0 1', answer:['b5b6'], text:'Trắng đi: hãy đột phá để tạo Tốt thông.', why:'b6! Dù Đen ăn bằng Tốt nào, Trắng cũng tạo được Tốt thông.'},
    {from:'tot-thong', type:'quiz', q:'Tốt trắng d5 có phải Tốt thông không?', fen:'4k3/pp3ppp/4p3/3P4/8/8/PP3PPP/4K3 w - - 0 1', opts:['Có','Không, vì Tốt đen e6 đánh được các ô phía trước nó'], correct:1, why:'Tốt đen e6 ở cột bên cạnh, đứng phía trước d5.'},
    {from:'quan-tot-xau', type:'quiz', q:'Tượng c8 bị coi là Tượng xấu vì sao?', fen:'2b3k1/5ppp/2p1p3/3p4/3P4/2N1P3/PP3PPP/6K1 w - - 0 1', opts:['Tốt c6, d5, e6 của Đen cùng màu ô với nó và chặn đường nó','Vì nó ở hàng cuối','Vì nó là Tượng'], correct:0, why:'Tượng xấu bị chính Tốt mình cùng màu ô chặn đường.'},
    {from:'quan-tot-xau', type:'quiz', q:'Thế cờ đóng, Tốt khóa chặt nhau: nên chọn Mã hay Tượng?', opts:['Mã','Tượng','Như nhau'], correct:0, why:'Mã nhảy qua Tốt được.'},
    {from:'co-mo-tien-don', type:'quiz', q:'Tiền đồn là gì?', opts:['Ô yếu của đối thủ ở nửa bàn của họ, được Tốt mình bảo vệ','Ô ở góc bàn cờ','Ô Vua nhập thành'], correct:0, why:'Tiền đồn: ô mà Tốt đối thủ không đánh được, có Tốt mình bảo vệ.'},
    {from:'phong-ngua', type:'quiz', q:'Quân nào phong tỏa Tốt thông tốt nhất?', opts:['Mã, đứng ngay trước Tốt','Hậu, canh từ xa','Vua'], correct:0, why:'Mã không bị Tốt đuổi và vẫn hoạt động.'},
    {from:'phong-ngua', type:'quiz', q:'Câu hỏi cốt lõi của phòng ngừa là gì?', opts:['"Nếu đối thủ được đi hai nước liên tiếp, họ làm gì?"','"Tôi ăn được gì?"','"Quân nào mạnh nhất?"'], correct:0, why:'Hỏi để ngăn kế hoạch của đối thủ trước.'},
    {from:'lap-ke-hoach', type:'quiz', q:'Trắng đi. Kế hoạch hợp lý ở cánh Hậu là gì?', fen:'6k1/pp3ppp/2p5/3p4/3P4/4P3/PP3PPP/6K1 w - - 0 1', opts:['Đẩy Tốt b lên b4 rồi b5 để tạo điểm yếu cho Đen','Đẩy Tốt h để mở đường','Đổi hết quân'], correct:0, why:'Bên ít Tốt hơn ở một cánh đẩy Tốt lên để tạo điểm yếu.'},
    {from:'tam-giac-reti', type:'find', fen:'8/1p1k4/1P6/2PK4/8/8/8/8 w - - 0 1', answer:['d5e4','d5c4','d5d4','d5e5'], text:'Trắng đi: đừng đẩy Tốt vội. Hãy đi Vua để mất một nhịp.', why:'Đi Vua (ví dụ Ke5) để chuyển lượt đi cho Đen.'},
    {from:'tam-giac-reti', type:'find', fen:'7K/8/k1P5/7p/8/8/8/8 w - - 0 1', answer:['h8g7'], text:'Trắng đi và phải hòa. Hãy đi Vua theo đường chéo.', why:'Kg7! Vua đuổi hai mục tiêu cùng lúc.'},
    {from:'xe-lucena-philidor', type:'quiz', q:'Trong thế Lucena, "xây cầu" nghĩa là gì?', opts:['Đưa Xe lên hàng 4 để che chiếu cho Vua','Đẩy Tốt lên hàng 8','Đổi Xe lấy Xe'], correct:0, why:'Xe hàng 4 làm cầu che chiếu.'},
    {from:'xe-lucena-philidor', type:'quiz', q:'Trong phòng thủ Philidor, khi Tốt đối thủ lên hàng 6, Xe phòng thủ làm gì?', opts:['Về hàng cuối của đối thủ và chiếu từ phía sau','Đứng yên','Ăn Tốt ngay'], correct:0, why:'Chiếu từ phía sau là cách hòa.'},
    {from:'tuong-sai-mau', type:'quiz', q:'Tượng sai màu nghĩa là gì?', opts:['Tượng khác màu với ô phong cấp của Tốt cạnh','Tượng đã bị ăn','Tượng đứng sai chỗ'], correct:0, why:'Tượng không chạm tới ô góc, Vua phòng thủ trốn ở đó là hòa.'},
    {from:'tuong-sai-mau', type:'quiz', q:'Vua và hai Mã chống Vua trần. Có ép chiếu hết được không?', opts:['Không ép được','Có, luôn thắng','Chỉ khi có Tốt'], correct:0, why:'Hai Mã không đủ lực ép chiếu hết.'}
  ]}
};

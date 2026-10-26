/* Cấp 1: Luật và chiếu hết. Soạn tay, mỗi bài theo vòng: Đố nhanh, Học, Làm cùng, Tự làm, Chốt.
   Mọi thế cờ, nước đáp án và nước chiếu hết được kiểm bằng tools/check_lessons.js (chess.js) và tools/check_mates.py (Stockfish). */
const LV1 = {
  'chieu': {title:'Chiếu và chiếu hết', intro:[
    'Chiếu là khi Vua bị một quân của đối thủ tấn công. Lúc đó bạn phải thoát chiếu ngay, không được đi nước nào khác.',
    'Chiếu hết là khi Vua bị chiếu mà không thoát được. Ván cờ kết thúc và bên chiếu hết là người thắng.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân nào mà mất là thua cả ván?', opts:['Hậu','Vua','Xe'], correct:1, why:'Đúng, là Vua. Hôm nay ta học cách bảo vệ Vua và cách bắt Vua của đối thủ.'},
    {phase:'Học', type:'show', fen:'4k3/8/8/8/8/8/8/4RK2 b - - 0 1', text:'Xe trắng ở e1 nhìn thẳng lên cột e và chạm tới Vua đen. Vua đen đang BỊ CHIẾU. Đến lượt Đen, và Đen phải thoát chiếu.'},
    {phase:'Học', type:'note', title:'Ba cách thoát chiếu', list:['Đi Vua sang một ô an toàn.','Chắn: đặt một quân vào giữa quân chiếu và Vua.','Ăn quân đang chiếu.'], text:'Nếu không làm được cách nào trong ba cách này thì đó là CHIẾU HẾT.', tip:'Chiếu bằng Mã hoặc bằng Tốt thì không chắn được, vì Mã nhảy qua đầu các quân khác còn Tốt thì đứng sát Vua. Khi đó chỉ còn đi Vua hoặc ăn quân chiếu.'},
    {phase:'Làm cùng', type:'find', fen:'4k3/p7/8/8/8/8/8/4RK2 b - - 0 1', want:'king', text:'Bạn cầm Đen và Vua đang bị chiếu. Cách thứ nhất: đi Vua sang ô an toàn.', hint:'Chạm vào Vua rồi chọn một ô không nằm trên cột e. Cột e đang bị Xe trắng canh.', why:'Vua đã bước ra khỏi cột e nên Xe không chiếu nữa.'},
    {phase:'Làm cùng', type:'find', fen:'3qkb2/3p1p2/2n5/8/8/8/8/4RK2 b - - 0 1', want:'block', text:'Bây giờ Vua đen kẹt rồi: các ô quanh Vua hoặc có quân mình, hoặc bị tấn công. Cách thứ hai: chắn đường chiếu bằng một quân.', hint:'Đưa một quân vào giữa Xe e1 và Vua e8, tức là vào một ô trên cột e.', why:'Quân đứng giữa chặn đường của Xe nên Vua an toàn.'},
    {phase:'Làm cùng', type:'find', fen:'4k3/6p1/5N2/8/8/8/8/4K3 b - - 0 1', want:'capture', text:'Mã trắng ở f6 đang chiếu Vua đen. Cách thứ ba: ăn quân đang chiếu.', hint:'Quân nào của Đen có thể ăn con Mã ở f6? Tốt ăn theo đường chéo phía trước.', why:'Mã bị ăn rồi nên không còn ai chiếu Vua.'},
    {phase:'Tự làm', type:'find', fen:'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', mate:true, text:'Trắng đi. Hãy chiếu hết ngay trong một nước.', hint:'Hậu và Tượng cùng nhìn vào ô f7, chỗ Vua đen yếu nhất.', why:'Hậu ăn ở f7 và được Tượng c4 bảo vệ nên Vua đen không ăn lại được, cũng không còn ô nào để chạy.'},
    {phase:'Tự làm', type:'find', fen:'3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', mate:true, text:'Trắng đi. Hãy chiếu hết ngay trong một nước.', hint:'Xe trắng có thể ăn Xe đen ở hàng cuối. Vua đen có chạy được không?', why:'Vua đen bị chính ba Tốt của mình chặn đường, nên Xe chiếu ở hàng cuối là chiếu hết.'},
    {phase:'Chốt', type:'quiz', q:'Vua bị Mã chiếu. Cách nào KHÔNG dùng được?', opts:['Đi Vua sang ô an toàn','Chắn giữa Mã và Vua','Ăn con Mã'], correct:1, why:'Mã nhảy qua đầu quân khác nên giữa Mã và Vua không có ô nào để chắn.'},
    {phase:'Chốt', type:'quiz', q:'Vua bị chiếu và không làm được cách nào trong ba cách thoát chiếu. Đó là gì?', opts:['Hòa','Chiếu hết','Bế tắc'], correct:1, why:'Đó là chiếu hết. Bên chiếu hết thắng ván.'}
  ]},

  'hoa-co': {title:'Hòa cờ', intro:[
    'Không phải ván cờ nào cũng có người thắng. Có những cách làm ván cờ hòa.',
    'Cách quan trọng nhất cần biết là BẾ TẮC. Nhiều bạn đang thắng lớn mà lỡ làm bế tắc nên chỉ hòa. Hôm nay ta học cách tránh.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Có mấy cách để thoát chiếu?', opts:['Một cách','Hai cách','Ba cách'], correct:2, why:'Ba cách: đi Vua, chắn, hoặc ăn quân đang chiếu.'},
    {phase:'Học', type:'show', fen:'k7/2Q5/1K6/8/8/8/8/8 b - - 0 1', text:'Đến lượt Đen. Vua đen KHÔNG bị chiếu, nhưng ô nào Vua cũng không đi được vì bị Hậu và Vua trắng canh. Đen không còn nước nào để đi. Đó là BẾ TẮC và ván cờ HÒA, dù Trắng hơn một Hậu!'},
    {phase:'Học', type:'note', title:'Các cách làm ván cờ hòa', list:['Bế tắc: đến lượt mà không có nước nào đi được và Vua không bị chiếu.','Không đủ quân để chiếu hết, ví dụ Vua đấu Vua hoặc Vua và Tượng đấu Vua.','Một thế cờ lặp lại ba lần.','Năm mươi nước liền không ai ăn quân và không ai đi Tốt.','Hai bên đồng ý hòa.'], tip:'Khi bạn đang thắng lớn, trước mỗi nước hãy hỏi: Vua đối thủ còn ô nào để đi không?'},
    {phase:'Làm cùng', type:'find', fen:'k7/8/1K6/8/8/8/2Q5/8 w - - 0 1', mate:true, text:'Trắng đi. Hãy chiếu hết Vua đen, nhưng cẩn thận: có một nước nhìn rất hấp dẫn mà lại gây bế tắc. Thử xem nhé.', hint:'Hậu đi lên hàng 8 để chiếu. Vua trắng đã canh các ô a7 và b7.', why:'Hậu ở c8 chiếu Vua đen. Các ô a7, b7 bị Vua trắng canh, ô b8 bị Hậu canh.'},
    {phase:'Tự làm', type:'find', fen:'7k/8/6K1/8/8/8/8/5Q2 w - - 0 1', mate:true, text:'Trắng đi. Chiếu hết, và đừng làm bế tắc!', hint:'Nếu Hậu đi tới f7, Vua đen đứng yên hết nước. Hãy tìm nước chiếu.', why:'Hậu ở f8 chiếu dọc hàng 8. Vua trắng canh g7 và h7 nên Vua đen hết đường.'},
    {phase:'Tự làm', type:'quiz', q:'Đến lượt Đen. Vua đen không bị chiếu và không có nước nào để đi. Kết quả ván cờ là gì?', fen:'7k/5Q2/6K1/8/8/8/8/8 b - - 0 1', opts:['Trắng thắng','Hòa (bế tắc)','Đen thắng'], correct:1, why:'Đó là bế tắc: bên đến lượt không đi được mà Vua không bị chiếu, nên ván hòa.'},
    {phase:'Chốt', type:'quiz', q:'Hai bên chỉ còn Vua trắng và Vua đen. Kết quả là gì?', opts:['Trắng thắng','Hòa','Chơi tiếp'], correct:1, why:'Không bên nào đủ quân để chiếu hết, nên ván hòa.'},
    {phase:'Chốt', type:'note', title:'Thói quen tốt', text:'Trước khi đi nước chiếu hết bằng Hậu hoặc Xe, hãy đếm: Vua đối thủ còn mấy ô để đi? Nếu còn 0 mà Vua chưa bị chiếu thì bạn đang gây bế tắc. Hãy chừa cho Vua một ô, hoặc tìm nước chiếu hết thật sự.'}
  ]},

  'nhap-thanh': {title:'Nhập thành', intro:[
    'Nhập thành là nước đi duy nhất đi hai quân cùng lúc: Vua đi hai ô về phía một con Xe, rồi Xe nhảy sang ô bên kia Vua.',
    'Nhập thành giúp Vua an toàn hơn và đưa Xe ra chơi. Mỗi bên chỉ nhập thành được một lần trong ván.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Bình thường Vua đi được mấy ô trong một nước?', opts:['Một ô','Hai ô','Bao nhiêu ô cũng được'], correct:0, why:'Vua đi một ô. Nhập thành là ngoại lệ duy nhất: Vua đi hai ô.'},
    {phase:'Học', type:'demo', fen:'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1', start:'Hai Vua và bốn Xe đang đứng ở vị trí xuất phát. Bấm nút để xem nhập thành.', text:'Xem Trắng nhập thành gần, rồi Đen nhập thành xa.', moves:[
      {m:'e1g1', t:'Nhập thành gần (viết O-O): Vua đi hai ô sang g1, rồi Xe h1 nhảy qua Vua sang f1.'},
      {m:'e8c8', t:'Nhập thành xa (viết O-O-O): Vua đi hai ô sang c8, rồi Xe a8 nhảy qua Vua sang d8.'}
    ]},
    {phase:'Học', type:'note', title:'Khi nào được nhập thành?', list:['Vua và con Xe đó chưa đi lần nào.','Giữa Vua và Xe không còn quân nào.','Vua không đang bị chiếu.','Vua không đi qua hoặc đáp xuống ô đang bị tấn công.'], tip:'Nhớ: Vua đi hai ô trước, Xe nhảy qua sau. Trên bàn cờ này, chạm Vua rồi chạm ô g1, Xe sẽ tự nhảy.'},
    {phase:'Làm cùng', type:'find', fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', answer:['e1g1'], text:'Trắng đi. Hãy nhập thành gần.', hint:'Chạm vào Vua rồi chạm ô g1. Xe sẽ tự nhảy sang f1.', why:'Vua đã về g1 sau hàng Tốt, Xe ra f1.'},
    {phase:'Làm cùng', type:'find', fen:'r3kb1r/pppqpppp/2n2n2/3p1b2/3P1B2/2N2N2/PPPQPPPP/R3KB1R b KQkq - 0 1', answer:['e8c8'], text:'Đen đi. Lần này hãy nhập thành xa, về phía cánh Hậu.', hint:'Vua đen đi hai ô sang bên trái, tới ô c8.', why:'Vua tới c8, Xe a8 nhảy sang d8.'},
    {phase:'Tự làm', type:'quiz', q:'Trắng có nhập thành được lúc này không?', fen:'4k3/8/8/8/8/8/4r3/R3K2R w KQ - 0 1', opts:['Được, nhập thành gần','Không, vì Vua đang bị chiếu'], correct:1, why:'Xe đen ở e2 đang chiếu Vua trắng. Khi Vua bị chiếu thì không được nhập thành.'},
    {phase:'Tự làm', type:'quiz', q:'Trắng có nhập thành gần được không?', fen:'4k3/8/8/8/8/5r2/8/4K2R w K - 0 1', opts:['Được','Không, vì Vua phải đi qua ô f1 đang bị tấn công'], correct:1, why:'Xe đen ở f3 canh cả cột f, trong đó có ô f1. Vua không được đi qua ô đang bị tấn công.'},
    {phase:'Chốt', type:'quiz', q:'Mỗi bên được nhập thành mấy lần trong một ván?', opts:['Một lần','Hai lần','Bao nhiêu lần cũng được'], correct:0, why:'Chỉ một lần, vì sau khi nhập thành Vua đã đi rồi.'}
  ]},

  'qua-duong': {title:'Bắt Tốt qua đường', intro:[
    'Đây là luật đặc biệt của Tốt. Khi một Tốt đi hai ô từ hàng xuất phát và dừng ngay cạnh Tốt của bạn, bạn được ăn nó như thể nó chỉ đi một ô.',
    'Cơ hội này chỉ có ở nước đi liền sau. Bỏ lỡ là mất luôn.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Tốt ăn quân theo hướng nào?', opts:['Thẳng phía trước','Chéo phía trước','Sang ngang'], correct:1, why:'Tốt đi thẳng nhưng ăn chéo.'},
    {phase:'Học', type:'demo', fen:'4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1', start:'Tốt trắng ở e5. Tốt đen ở d7 chưa đi. Bấm nút để xem.', text:'Xem Tốt đen đi hai ô và bị bắt qua đường.', moves:[
      {m:'d7d5', t:'Tốt đen đi hai ô từ d7 tới d5 và dừng ngay cạnh Tốt trắng e5.'},
      {m:'e5d6', t:'Tốt trắng ăn qua đường: nó đi chéo tới d6, như thể Tốt đen chỉ đi một ô. Tốt đen ở d5 bị lấy khỏi bàn cờ.'}
    ]},
    {phase:'Học', type:'note', title:'Ba điều kiện', list:['Tốt đối thủ vừa đi hai ô ở nước ngay trước đó.','Tốt của bạn đứng cạnh nó, cùng hàng (Tốt trắng ở hàng 5, Tốt đen ở hàng 4).','Bạn phải bắt ngay ở nước kế tiếp.'], tip:'Sau khi bắt, Tốt của bạn đứng ở ô phía sau Tốt kia, không phải ô nó đứng.'},
    {phase:'Làm cùng', type:'find', fen:'4k3/8/8/2pP4/8/8/8/4K3 w - c6 0 1', last:['c7','c5'], answer:['d5c6'], text:'Tốt đen vừa đi từ c7 tới c5. Trắng hãy bắt Tốt qua đường.', hint:'Tốt trắng d5 đi chéo sang c6, ô mà Tốt đen vừa đi ngang qua.', why:'Tốt trắng đáp xuống c6 và Tốt đen ở c5 bị lấy khỏi bàn cờ.'},
    {phase:'Tự làm', type:'find', fen:'4k3/8/8/8/3pP3/8/8/4K3 b - e3 0 1', last:['e2','e4'], answer:['d4e3'], text:'Trắng vừa đi Tốt từ e2 tới e4. Đen hãy bắt Tốt qua đường.', hint:'Tốt đen d4 đi chéo xuống e3.', why:'Tốt đen đáp xuống e3 và Tốt trắng ở e4 bị lấy khỏi bàn cờ.'},
    {phase:'Tự làm', type:'quiz', q:'Trắng vừa đi Tốt a2 lên a3 (một ô). Đen có bắt Tốt qua đường được không?', fen:'4k3/8/8/8/1p6/P7/8/4K3 b - - 0 1', opts:['Được','Không, vì Tốt trắng chỉ đi một ô'], correct:1, why:'Chỉ bắt qua đường được khi Tốt kia vừa đi HAI ô.'},
    {phase:'Chốt', type:'quiz', q:'Khi nào được bắt Tốt qua đường?', opts:['Bất cứ lúc nào','Ngay ở nước kế tiếp','Chỉ ở cuối ván'], correct:1, why:'Cơ hội chỉ có ngay ở nước kế tiếp. Bỏ lỡ là mất.'}
  ]},

  'phong-cap': {title:'Phong cấp', intro:[
    'Khi Tốt đi tới hàng cuối cùng của bàn cờ (hàng 8 với Trắng, hàng 1 với Đen), nó phải biến thành một quân mạnh hơn: Hậu, Xe, Tượng hoặc Mã.',
    'Thường thì chọn Hậu vì Hậu mạnh nhất. Nhưng có lúc chọn Xe lại hay hơn, vì Hậu làm đối thủ bị bế tắc.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân nào có giá trị lớn nhất (9 Tốt)?', opts:['Xe','Hậu','Mã'], correct:1, why:'Hậu là quân mạnh nhất, giá trị 9.'},
    {phase:'Học', type:'show', fen:'7k/P7/8/8/8/8/8/4K3 w - - 0 1', text:'Tốt trắng ở a7, chỉ còn một bước nữa là tới hàng 8. Khi tới nơi, bạn chọn biến Tốt thành quân nào.'},
    {phase:'Làm cùng', type:'find', fen:'7k/P7/8/8/8/8/8/4K3 w - - 0 1', answer:['a7a8q'], wrong:{a7a8r:'Xe cũng được, nhưng Hậu mạnh hơn. Hãy chọn Hậu.', a7a8b:'Tượng yếu hơn Hậu. Hãy chọn Hậu.', a7a8n:'Mã yếu hơn Hậu. Hãy chọn Hậu.'}, text:'Đưa Tốt lên hàng 8 và chọn biến thành Hậu.', hint:'Chạm Tốt, chạm ô a8, rồi chọn Hậu trong bảng hiện ra.', why:'Trắng có thêm một Hậu và còn chiếu Vua đen.'},
    {phase:'Làm cùng', type:'find', fen:'6r1/5P2/8/8/8/8/8/k3K3 w - - 0 1', answer:['f7g8q'], wrong:{f7f8q:'Xe đen ở g8 ăn mất Hậu mới của bạn. Hãy ăn Xe trước.'}, text:'Tốt cũng phong cấp được khi ĂN quân. Hãy vừa ăn Xe đen vừa phong Hậu.', hint:'Tốt ăn theo đường chéo. Xe đen ở g8 nằm chéo phía trước Tốt.', why:'Bạn ăn được Xe và có Hậu mới, được hai lợi một lúc.'},
    {phase:'Học', type:'note', title:'Khi nào không chọn Hậu?', text:'Có một bẫy: nếu Hậu mới làm Vua đối thủ hết nước đi mà chưa bị chiếu, đó là bế tắc và ván hòa. Khi đó chọn quân khác để vẫn thắng.', tip:'Trước khi phong Hậu, hãy đếm số ô Vua đối thủ còn đi được.'},
    {phase:'Tự làm', type:'find', fen:'8/6P1/8/8/8/8/2K5/k7 w - - 0 1', answer:['g7g8r'], wrong:{g7g8q:'Bế tắc! Vua đen ở a1 hết nước đi mà không bị chiếu, nên ván hòa. Hãy chọn Xe.'}, text:'Trắng đi. Phong cấp để THẮNG, đừng để hòa!', hint:'Hậu ở g8 làm Vua đen hết nước đi mà chưa bị chiếu. Thử chọn quân khác.', why:'Với Xe, Vua đen chỉ còn ô a2, rồi Xe xuống a8 chiếu hết. Với Hậu thì chỉ hòa.'},
    {phase:'Tự làm', type:'find', fen:'8/3P4/8/8/8/8/k7/4K3 w - - 0 1', answer:['d7d8q'], text:'Trắng đi. Hãy phong cấp thành quân mạnh nhất.', hint:'Chạm Tốt, chạm ô d8, chọn Hậu.', why:'Hậu mới giúp Trắng thắng dễ dàng.'},
    {phase:'Chốt', type:'quiz', q:'Tốt đi tới hàng cuối thì được biến thành quân nào?', opts:['Chỉ Hậu','Hậu, Xe, Tượng hoặc Mã','Vua'], correct:1, why:'Bạn chọn một trong bốn quân: Hậu, Xe, Tượng hoặc Mã. Không được chọn Vua.'}
  ]},

  'chieu-het-hau-xe': {title:'Chiếu hết bằng Hậu và bằng Xe', intro:[
    'Khi bạn còn Hậu hoặc Xe mà đối thủ chỉ còn Vua, bạn phải biết chiếu hết. Nếu không, bạn có thể làm bế tắc hoặc cứ đi mãi mà không thắng.',
    'Điều quan trọng: Hậu hoặc Xe đứng một mình không chiếu hết được. Vua của bạn phải đến giúp.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Vua đối thủ không bị chiếu nhưng hết nước đi. Kết quả?', opts:['Bạn thắng','Hòa (bế tắc)','Bạn thua'], correct:1, why:'Đó là bế tắc. Hôm nay hãy luôn chừa cho Vua đối thủ một ô, cho tới nước chiếu hết.'},
    {phase:'Học', type:'demo', fen:'6k1/8/4K3/8/8/8/8/Q7 w - - 0 1', start:'Trắng có Hậu và Vua, Đen chỉ còn Vua. Bấm nút để xem cách thắng.', text:'Xem cách chiếu hết bằng Hậu.', moves:[
      {m:'a1d4', t:'Hậu chiếm đường chéo lớn và cắt bàn cờ làm đôi. Vua đen chỉ còn một khu vực nhỏ ở góc.'},
      {m:'g8h7', t:'Vua đen chạy lên cạnh.'},
      {m:'e6f7', t:'Vua trắng tiến sát để giúp Hậu. Để ý: vẫn còn ô h6 cho Vua đen, nên chưa bế tắc.'},
      {m:'h7h6', t:'Vua đen chỉ còn đúng ô này.'},
      {m:'d4h4', t:'Chiếu hết! Hậu chiếu dọc cột h. Vua trắng canh g6 và g7, Hậu canh g5 và h7.'}
    ]},
    {phase:'Học', type:'demo', fen:'7k/8/5K2/8/8/8/8/R7 b - - 0 1', start:'Bây giờ là Xe và Vua trắng, Đen chỉ có Vua. Đến lượt Đen đi.', text:'Xem cách chiếu hết bằng Xe.', moves:[
      {m:'h8g8', t:'Vua đen đi sang g8. Vua trắng ở f6 đang canh các ô f7, g7 và e7.'},
      {m:'a1h1', t:'Xe chuyển sang cột h, cắt Vua đen khỏi cột h. Vua đen chỉ còn ô f8.'},
      {m:'g8f8', t:'Vua đen đi sang f8, ô cuối cùng.'},
      {m:'h1h8', t:'Chiếu hết! Xe chiếu dọc hàng 8. Vua trắng canh e7, f7, g7 nên Vua đen không còn ô nào.'}
    ]},
    {phase:'Học', type:'note', title:'Cách làm chung', list:['Dùng Hậu hoặc Xe để thu hẹp khu vực của Vua đối thủ, đẩy nó về mép bàn cờ.','Đưa Vua của bạn lại gần, cách Vua đối thủ một ô trống.','Chiếu hết ở mép bàn cờ, khi Vua của bạn canh các ô thoát.','Luôn đếm: Vua đối thủ còn ô nào để đi không? Đừng gây bế tắc.'], tip:'Đừng để quân mạnh đứng cạnh Vua đối thủ khi không có quân bảo vệ, vì Vua sẽ ăn mất.'},
    {phase:'Tự làm', type:'mate', fen:'8/8/8/8/6k1/8/8/Q3K3 w - - 0 1', max:20, text:'Bạn cầm Trắng: Hậu và Vua đấu Vua đen. Hãy chiếu hết trong tối đa 20 nước. Máy cầm Đen và sẽ cố chạy trốn.', tips:['Đưa Hậu tới một ô cách Vua đen một nước đi của quân Mã. Vua đen sẽ bị nhốt vào một hộp nhỏ.','Khi hộp đã nhỏ, đưa Vua trắng lại gần. Mỗi nước hãy hỏi: Vua đen còn ô nào để đi?','Tìm nước chiếu mà Hậu được Vua trắng bảo vệ, và mọi ô quanh Vua đen đều bị canh.']},
    {phase:'Tự làm', type:'mate', fen:'8/8/8/8/8/6k1/8/R3K3 w - - 0 1', max:40, text:'Bây giờ chỉ có Xe và Vua. Hãy chiếu hết trong tối đa 40 nước. Xe chậm hơn Hậu nên cần kiên nhẫn.', tips:['Xe chiếm một cột hoặc một hàng để cắt Vua đen ra một phía của bàn cờ.','Đưa Vua trắng lên, rồi đẩy Vua đen về mép bàn cờ từng hàng một.','Chiếu hết bằng Xe thường xảy ra ở mép, khi hai Vua đứng đối diện nhau cách một ô trống.']},
    {phase:'Chốt', type:'quiz', q:'Một con Xe đứng một mình có chiếu hết được Vua đối thủ không?', opts:['Được','Không, cần Vua của mình đến giúp'], correct:1, why:'Nếu Vua của bạn ở xa, Vua đối thủ luôn có chỗ thoát hoặc ăn quân của bạn. Cần Vua giúp.'}
  ]},

  'kiem-tra-1': {title:'Bài kiểm tra cấp 1', test:true, level:1, take:10, intro:[
    'Bài kiểm tra có 10 câu lấy ngẫu nhiên về chiếu và chiếu hết, hòa cờ, nhập thành, bắt Tốt qua đường, phong cấp và chiếu hết bằng Hậu hoặc Xe.',
    'Không có gợi ý. Nếu chưa tìm ra, bạn có thể bấm Bỏ qua câu này.'
  ], steps:[
    {from:'chieu', type:'quiz', q:'Chiếu hết là gì?', opts:['Vua bị chiếu và không có cách thoát','Ăn được Hậu của đối thủ','Hai quân cùng chiếu một lúc'], correct:0, why:'Chiếu hết là Vua bị chiếu mà không thoát được, ván kết thúc.'},
    {from:'chieu', type:'find', fen:'3qkb2/3p1p2/2n5/8/8/8/8/4RK2 b - - 0 1', want:'block', text:'Vua đen bị chiếu và hết ô để đi. Hãy chắn đường chiếu.', why:'Quân đứng giữa chặn đường của Xe.'},
    {from:'chieu', type:'find', fen:'4k3/6p1/5N2/8/8/8/8/4K3 b - - 0 1', want:'capture', text:'Mã trắng đang chiếu. Hãy ăn quân đang chiếu.', why:'Ăn Mã nên không còn ai chiếu.'},
    {from:'chieu', type:'find', fen:'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', mate:true, text:'Trắng chiếu hết trong một nước.', why:'Hậu ăn ở f7 được Tượng bảo vệ, Vua đen hết đường.'},
    {from:'chieu', type:'find', fen:'3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', mate:true, text:'Trắng chiếu hết trong một nước.', why:'Vua đen bị ba Tốt của mình chặn đường.'},
    {from:'hoa-co', type:'find', fen:'7k/8/6K1/8/8/8/8/5Q2 w - - 0 1', mate:true, text:'Trắng chiếu hết, đừng làm bế tắc.', why:'Hậu ở f8 chiếu hết, Vua trắng canh g7 và h7.'},
    {from:'hoa-co', type:'quiz', q:'Đến lượt Đen. Vua đen không bị chiếu và không có nước nào đi được. Kết quả ván cờ?', fen:'7k/5Q2/6K1/8/8/8/8/8 b - - 0 1', opts:['Trắng thắng','Hòa (bế tắc)','Đen thắng'], correct:1, why:'Bế tắc là hòa.'},
    {from:'hoa-co', type:'quiz', q:'Cách nào dưới đây KHÔNG làm ván cờ hòa?', opts:['Hai bên chỉ còn Vua','Bế tắc','Một bên mất Hậu'], correct:2, why:'Mất Hậu không làm ván hòa, chỉ là mất quân.'},
    {from:'nhap-thanh', type:'find', fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', answer:['e1g1'], text:'Trắng hãy nhập thành gần.', why:'Vua tới g1, Xe nhảy sang f1.'},
    {from:'nhap-thanh', type:'quiz', q:'Trắng có nhập thành được lúc này không?', fen:'4k3/8/8/8/8/8/4r3/R3K2R w KQ - 0 1', opts:['Được, nhập thành gần','Không, vì Vua đang bị chiếu'], correct:1, why:'Vua đang bị chiếu thì không được nhập thành.'},
    {from:'qua-duong', type:'find', fen:'4k3/8/8/8/1pP5/8/8/4K3 b - c3 0 1', last:['c2','c4'], answer:['b4c3'], text:'Trắng vừa đi Tốt từ c2 tới c4. Đen hãy bắt Tốt qua đường.', why:'Tốt đen đáp xuống c3 và Tốt trắng ở c4 bị lấy khỏi bàn cờ.'},
    {from:'qua-duong', type:'quiz', q:'Tốt trắng vừa đi từ h2 lên h3 (một ô). Tốt đen ở g4 có bắt qua đường được không?', fen:'4k3/8/8/8/6p1/7P/8/4K3 b - - 0 1', opts:['Được','Không, vì Tốt trắng chỉ đi một ô'], correct:1, why:'Chỉ bắt qua đường khi Tốt kia vừa đi hai ô.'},
    {from:'phong-cap', type:'find', fen:'8/5P1k/5K2/8/8/8/8/8 w - - 0 1', answer:['f7f8r'], wrong:{f7f8q:'Bế tắc! Vua đen hết nước đi mà không bị chiếu, nên hòa.'}, text:'Trắng phong cấp để thắng, đừng để hòa.', why:'Với Xe, Vua đen chỉ còn h6, rồi Xe ở h8 chiếu hết.'},
    {from:'phong-cap', type:'find', fen:'8/3P4/8/8/8/8/k7/4K3 w - - 0 1', answer:['d7d8q'], text:'Trắng hãy phong cấp thành quân mạnh nhất.', why:'Hậu là quân mạnh nhất.'},
    {from:'chieu-het-hau-xe', type:'mate', fen:'8/8/3k4/8/8/8/8/Q3K3 w - - 0 1', max:20, text:'Chiếu hết Vua đen bằng Hậu và Vua trong tối đa 20 nước.', tips:[]},
    {from:'chieu-het-hau-xe', type:'quiz', q:'Quân nào đứng một mình KHÔNG chiếu hết được Vua đối thủ?', opts:['Hậu','Xe','Cả Hậu và Xe'], correct:2, why:'Cả Hậu và Xe đều cần Vua của mình đến giúp.'}
  ]}
};

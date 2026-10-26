/* Cấp 2: Chiến thuật một đến hai nước. Phần "Tự làm" lấy câu đố từ kho Lichess (data/puz/, CC0), phần còn lại soạn tay.
   Thế cờ và nước đáp án được kiểm bằng tools/check_lessons.js. */
const LV2 = {
  'doi': {title:'Đòn đôi', intro:[
    'Đòn đôi là khi một quân tấn công hai mục tiêu cùng lúc. Đối thủ chỉ cứu được một, và bạn ăn quân còn lại.',
    'Đòn đôi mạnh nhất khi một mục tiêu là Vua, vì đối thủ bắt buộc phải lo thoát chiếu trước.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân nào nhảy qua được quân khác?', opts:['Xe','Mã','Tượng'], correct:1, why:'Chỉ Mã nhảy qua đầu các quân khác. Vì thế Mã rất hay làm đòn đôi.'},
    {phase:'Học', type:'demo', fen:'r3k3/8/4N3/8/8/8/8/4K3 w - - 0 1', start:'Mã trắng ở e6. Vua đen ở e8, Xe đen ở a8. Bấm nút để xem.', text:'Xem Mã làm đòn đôi.', moves:[
      {m:'e6c7', t:'Mã nhảy tới c7: vừa chiếu Vua đen, vừa tấn công Xe ở a8. Đó là đòn đôi.'},
      {m:'e8d7', t:'Vua đen phải thoát chiếu trước. Đen không còn thời gian cứu Xe.'},
      {m:'c7a8', t:'Mã ăn Xe. Đòn đôi thành công!'}
    ]},
    {phase:'Học', type:'note', title:'Ghi nhớ về đòn đôi', list:['Một quân, hai mục tiêu cùng lúc.','Đối thủ chỉ cứu được một mục tiêu.','Quân nào cũng làm được đòn đôi: Mã, Tốt, Tượng, Xe, Hậu.','Nếu một mục tiêu là Vua thì đối thủ không còn lựa chọn.'], tip:'Khi nhìn một thế cờ, hãy tìm hai quân của đối thủ nằm ở hai ô mà một quân của bạn có thể tấn công cùng lúc.'},
    {phase:'Làm cùng', type:'find', fen:'4k3/8/8/3r1n2/8/4P3/8/4K3 w - - 0 1', answer:['e3e4'], text:'Trắng đi. Quân nhỏ nhất cũng làm được đòn đôi. Hãy tìm nước tấn công Xe và Mã cùng lúc.', hint:'Tốt tấn công chéo phía trước. Tìm ô mà Tốt nhìn được cả d5 và f5.', why:'Tốt ở e4 tấn công cả Xe d5 và Mã f5. Đen chỉ cứu được một quân.'},
    {phase:'Tự làm', type:'run', theme:'fork', band:'de', n:5},
    {phase:'Chốt', type:'quiz', q:'Đòn đôi là gì?', opts:['Đi hai nước liên tiếp','Một quân tấn công hai mục tiêu cùng lúc','Ăn hai quân bằng một nước'], correct:1, why:'Đòn đôi là một quân nhìn thấy hai mục tiêu cùng lúc.'}
  ]},

  'ghim': {title:'Ghim', intro:[
    'Ghim là khi một quân bị "đóng đinh" tại chỗ: nếu nó rời đi, quân quý phía sau nó sẽ bị tấn công.',
    'Quân bị ghim vào Vua thì không được đi, vì luật không cho phép để Vua bị chiếu.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Trong đòn đôi, chuyện gì xảy ra với hai mục tiêu?', opts:['Cả hai đều chạy thoát','Đối thủ chỉ cứu được một','Không ai bị gì'], correct:1, why:'Đối thủ chỉ cứu được một mục tiêu, bạn ăn quân kia.'},
    {phase:'Học', type:'show', fen:'4k3/4n3/8/8/8/8/8/4R1K1 b - - 0 1', text:'Xe trắng ở e1 nhìn lên cột e. Mã đen ở e7 đứng giữa Xe và Vua đen. Mã đang bị GHIM: nếu Mã đi, Xe sẽ chiếu Vua đen, mà luật cấm điều đó.'},
    {phase:'Học', type:'explore', fen:'4k3/4n3/8/8/8/8/8/4R1K1 b - - 0 1', min:2, text:'Bạn cầm Đen. Chạm vào Mã đen: không có ô nào sáng, vì Mã bị ghim! Sau đó chạm Vua và đi vài nước.'},
    {phase:'Học', type:'note', title:'Hai kiểu ghim', list:['Ghim vào Vua: quân bị ghim KHÔNG được đi, luật cấm.','Ghim vào quân quý như Hậu: quân bị ghim vẫn đi được, nhưng bạn sẽ ăn mất quân quý phía sau.','Chỉ Xe, Tượng và Hậu mới ghim được, vì chúng đi xa theo đường thẳng.'], tip:'Quân bị ghim rất dễ bị tấn công, vì nó không thể bỏ chạy.'},
    {phase:'Làm cùng', type:'find', fen:'4k3/3n4/8/8/8/8/8/4KB2 w - - 0 1', answer:['f1b5'], text:'Trắng đi. Hãy ghim Mã đen vào Vua đen bằng Tượng.', hint:'Tượng đi chéo. Tìm ô để Tượng, Mã đen và Vua đen nằm trên cùng một đường chéo.', why:'Tượng ở b5, Mã ở d7, Vua ở e8 thẳng hàng trên một đường chéo. Mã bị ghim và không được đi.'},
    {phase:'Tự làm', type:'run', theme:'pin', band:'de', n:5},
    {phase:'Chốt', type:'quiz', q:'Mã đen bị ghim vào Vua đen. Đen có được đi Mã không?', fen:'4k3/4n3/8/8/8/8/8/4R1K1 b - - 0 1', opts:['Có','Không, vì Vua sẽ bị chiếu'], correct:1, why:'Nếu Mã đi, Xe trắng chiếu Vua đen. Luật không cho phép.'}
  ]},

  'xien': {title:'Xiên', intro:[
    'Xiên giống ghim nhưng ngược lại: quân QUÝ đứng trước bị tấn công, nó phải tránh đi, rồi bạn ăn quân đứng SAU nó.',
    'Xiên thường dùng Xe, Tượng hoặc Hậu, và rất hay có chiếu đi kèm.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Trong đòn ghim, quân bị ghim đứng ở đâu?', opts:['Giữa quân ghim và quân quý phía sau','Sau quân quý','Cạnh quân ghim'], correct:0, why:'Quân bị ghim đứng giữa, nên không dám rời đi.'},
    {phase:'Học', type:'demo', fen:'8/8/8/q3k3/8/8/8/6KR w - - 0 1', start:'Vua đen và Hậu đen cùng đứng trên hàng 5. Bấm nút để xem.', text:'Xem đòn xiên.', moves:[
      {m:'h1h5', t:'Xe chiếu Vua đen dọc hàng 5. Phía sau Vua, cùng hàng, là Hậu đen.'},
      {m:'e5e6', t:'Vua đen phải tránh sang bên. Vua không bảo vệ được Hậu.'},
      {m:'h5a5', t:'Xe ăn Hậu! Quân quý đứng trước phải tránh, quân đứng sau mất. Đó là đòn xiên.'}
    ]},
    {phase:'Học', type:'note', title:'Ghim và xiên khác nhau thế nào?', list:['Ghim: quân yếu đứng TRƯỚC, quân quý đứng sau.','Xiên: quân quý đứng TRƯỚC, quân yếu đứng sau.','Xiên: quân quý phải tránh, bạn ăn quân phía sau.'], tip:'Xiên bằng nước chiếu là mạnh nhất, vì Vua bắt buộc phải tránh.'},
    {phase:'Làm cùng', type:'find', fen:'1r6/8/3k4/8/8/8/8/2B1K3 w - - 0 1', answer:['c1f4'], text:'Trắng đi. Hãy chiếu Vua đen bằng Tượng sao cho Xe đen nằm ngay sau Vua trên cùng đường chéo.', hint:'Tượng đi chéo. Tìm ô trên đường chéo b8 tới h2 để chiếu Vua đen ở d6.', why:'Tượng ở f4 chiếu Vua d6. Vua phải tránh, rồi Tượng ăn Xe ở b8.'},
    {phase:'Tự làm', type:'run', theme:'skewer', band:'de', n:5},
    {phase:'Chốt', type:'quiz', q:'Điểm khác nhau giữa ghim và xiên là gì?', opts:['Ghim: quân yếu đứng trước. Xiên: quân quý đứng trước','Ghim chỉ dùng Xe','Hai đòn giống hệt nhau'], correct:0, why:'Ghim: quân yếu ở trước. Xiên: quân quý ở trước, phải tránh đi rồi mất quân phía sau.'}
  ]},

  'quan-treo': {title:'Quân treo', intro:[
    'Quân treo là quân đang bị tấn công mà không có quân nào bảo vệ. Ăn nó là bạn được lợi và không mất gì.',
    'Hôm nay bạn học cách tìm quân treo của đối thủ, và cách không để quân mình bị treo.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân được bảo vệ nghĩa là gì?', opts:['Có quân của mình canh ô đó, nên ăn xong sẽ bị ăn lại','Quân đó không bị tấn công','Quân đó đứng ở mép bàn cờ'], correct:0, why:'Quân được bảo vệ: nếu đối thủ ăn nó thì bạn ăn lại được.'},
    {phase:'Học', type:'show', fen:'4k3/8/8/3n4/8/8/8/3QK3 w - - 0 1', text:'Mã đen ở d5 bị Hậu trắng tấn công theo cột d. Không có quân đen nào bảo vệ Mã. Hậu ăn Mã xong sẽ không bị ăn lại. Mã đen là QUÂN TREO.'},
    {phase:'Làm cùng', type:'find', fen:'4k3/8/3p4/4b3/1n2R3/8/6K1/8 w - - 0 1', answer:['e4b4'], wrong:{e4e5:'Tượng ở e5 có Tốt d6 bảo vệ. Nếu Xe ăn Tượng thì Tốt ăn lại Xe: Xe (5) đổi lấy Tượng (3) là thiệt.'}, text:'Trắng đi. Xe của bạn tấn công cả Tượng và Mã. Hãy ăn đúng quân đang bị treo.', hint:'Quân nào của Đen không có ai bảo vệ? Hãy xem Tốt đen ở d6 đang bảo vệ quân nào.', why:'Mã b4 không có ai bảo vệ nên Xe ăn xong không bị ăn lại.'},
    {phase:'Tự làm', type:'run', theme:'hangingPiece', band:'de', n:5},
    {phase:'Chốt', type:'note', title:'Ba câu hỏi trước khi đi', list:['Quân nào của mình đang bị đe dọa?','Nước này có để hở quân nào không?','Đối thủ vừa đi nước đó để làm gì?'], text:'Hãy hỏi ba câu này trước MỖI nước đi, trong ván thật và trong câu đố. Thói quen này giúp bạn không bao giờ để quân bị treo.', tip:'Bạn cũng sẽ thấy ba câu hỏi này ngay dưới bàn cờ trong phần Đánh với máy.'},
    {phase:'Chốt', type:'quiz', q:'Quân treo là quân thế nào?', opts:['Quân đứng ở mép bàn cờ','Quân bị tấn công mà không có ai bảo vệ','Quân đã đi nhiều nước'], correct:1, why:'Quân treo bị tấn công mà không có quân nào bảo vệ.'}
  ]},

  'chieu-het-1-2': {title:'Chiếu hết 1 nước và 2 nước', intro:[
    'Bài này dạy bạn cách TÌM nước chiếu hết trong một hoặc hai nước đi. Đây là kỹ năng thắng ván nhanh nhất.',
    'Bí quyết: hãy liệt kê mọi nước chiếu, rồi kiểm tra từng nước.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Vua bị chiếu và không thoát được. Đó là gì?', opts:['Hòa','Chiếu hết','Bế tắc'], correct:1, why:'Chiếu hết, và bên chiếu hết thắng.'},
    {phase:'Học', type:'note', title:'Cách tìm chiếu hết', list:['Liệt kê MỌI nước chiếu của bạn.','Với mỗi nước chiếu, hỏi: Vua có ô nào để chạy không?','Có ăn được quân đang chiếu không?','Có chắn được đường chiếu không?','Nếu cả ba câu trả lời đều KHÔNG thì đó là chiếu hết.'], tip:'Đừng quên cả những nước chiếu bằng cách hy sinh quân. Một nước hy sinh có thể dẫn tới chiếu hết.'},
    {phase:'Học', type:'demo', fen:'7k/8/8/8/8/8/R7/1R5K w - - 0 1', start:'Hai Xe trắng và Vua trắng, Đen chỉ có Vua. Bấm nút để xem chiếu hết trong 2 nước.', text:'Xem chiếu hết bằng hai Xe, theo kiểu "bậc thang".', moves:[
      {m:'a2a7', t:'Xe chiếm hàng 7: Vua đen không còn đi xuống hàng 7 được. Vua đen chỉ còn ô g8.'},
      {m:'h8g8', t:'Vua đen đi sang g8, nước duy nhất.'},
      {m:'b1b8', t:'Chiếu hết! Xe ở b8 chiếu dọc hàng 8 còn Xe ở a7 canh hàng 7.'}
    ]},
    {phase:'Làm cùng', type:'find', fen:'6k1/5ppp/8/8/8/8/5PPP/3Q2K1 w - - 0 1', mate:true, text:'Trắng đi. Hãy chiếu hết trong một nước.', hint:'Liệt kê các nước chiếu. Hậu có thể chiếu ở hàng 8 không? Vua đen có chạy được không?', why:'Hậu chiếu ở hàng 8, Vua đen bị ba Tốt của mình chặn đường nên không thoát được.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'mateIn1', band:'de'}, {theme:'mateIn2', band:'de'}], n:6},
    {phase:'Chốt', type:'quiz', q:'Muốn tìm chiếu hết một nước, nên bắt đầu từ đâu?', opts:['Liệt kê các nước chiếu','Đi Tốt lên trước','Ăn quân nhiều nhất'], correct:0, why:'Chiếu hết luôn bắt đầu bằng một nước chiếu, nên hãy liệt kê chúng rồi kiểm tra từng nước.'}
  ]},

  'tranh-nha-quan': {title:'Tránh nhả quân', intro:[
    'Nhả quân là đi một nước làm quân mình bị mất mà không được gì đổi lại. Đây là lỗi hay gặp nhất của người mới.',
    'Hôm nay bạn học cách nhìn kỹ trước khi đi, nhất là trước khi ăn quân.'
  ], steps:[
    {phase:'Đố nhanh', type:'quiz', q:'Quân treo là quân thế nào?', opts:['Bị tấn công mà không có ai bảo vệ','Quân ở mép bàn cờ','Quân đã đi nhiều nước'], correct:0, why:'Quân treo bị tấn công mà không có ai bảo vệ.'},
    {phase:'Học', type:'quiz', q:'Trắng định ăn Tốt đen ở b5 bằng Hậu. Có nên không?', fen:'4k3/8/2p5/1p6/8/3Q4/8/4K3 w - - 0 1', opts:['Nên, vì được thêm một Tốt','Không nên, vì Tốt c6 ăn lại Hậu'], correct:1, why:'Tốt b5 được Tốt c6 bảo vệ. Hậu (9 điểm) đổi lấy Tốt (1 điểm) là nhả quân.'},
    {phase:'Làm cùng', type:'find', fen:'4k3/7p/2p5/1p6/8/3Q4/8/4K3 w - - 0 1', answer:['d3h7'], wrong:{d3b5:'Tốt c6 ăn lại Hậu! Tốt b5 được bảo vệ.'}, text:'Trắng đi. Hãy ăn một Tốt mà không bị ăn lại.', hint:'Hậu có thể ăn Tốt b5 hoặc Tốt h7. Tốt nào được bảo vệ, tốt nào không?', why:'Tốt h7 không có ai bảo vệ, nên Hậu ăn xong vẫn an toàn.'},
    {phase:'Tự làm', type:'run', mixed:[{theme:'hangingPiece', band:'de'}, {theme:'fork', band:'de'}, {theme:'pin', band:'de'}], n:5},
    {phase:'Chốt', type:'note', title:'Ba câu hỏi trước khi đi', list:['Quân nào của mình đang bị đe dọa?','Nước này có để hở quân nào không?','Đối thủ vừa đi nước đó để làm gì?'], text:'Trước khi ăn quân, hãy hỏi thêm: quân đó có được bảo vệ không? Nếu có, ăn xong mình sẽ bị ăn lại.'},
    {phase:'Chốt', type:'quiz', q:'Trước khi ăn một quân, câu hỏi quan trọng nhất là gì?', opts:['Quân đó có đẹp không','Quân đó có được bảo vệ không','Mình đã đi bao nhiêu nước'], correct:1, why:'Nếu quân đó được bảo vệ thì ăn xong bạn sẽ bị ăn lại, có thể thiệt hơn.'}
  ]},

  'kiem-tra-2': {title:'Ôn trộn và kiểm tra cấp 2', test:true, level:2, intro:[
    'Bài này gồm 15 câu đố trộn từ sáu chủ đề: đòn đôi, ghim, xiên, quân treo, chiếu hết 1 nước và chiếu hết 2 nước.',
    'Điểm chỉ tính khi bạn đi đúng ngay lần đầu. Cần đúng ít nhất 12 câu trong 15 để qua cấp.'
  ], steps:[
    {from:'doi', type:'run', theme:'fork', band:'de', n:3, noHelp:true},
    {from:'ghim', type:'run', theme:'pin', band:'de', n:3, noHelp:true},
    {from:'xien', type:'run', theme:'skewer', band:'de', n:2, noHelp:true},
    {from:'quan-treo', type:'run', theme:'hangingPiece', band:'de', n:3, noHelp:true},
    {from:'chieu-het-1-2', type:'run', theme:'mateIn1', band:'de', n:2, noHelp:true},
    {from:'chieu-het-1-2', type:'run', theme:'mateIn2', band:'de', n:2, noHelp:true}
  ]}
};

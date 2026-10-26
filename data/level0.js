/* Cấp 0: Làm quen. Bài soạn tay, các bài tập "reach" và "capture" được kiểm bằng tools/check_level0.js
   (nước ngắn nhất ghi ở trường best). Mọi thế cờ cố ý bỏ Vua cho gọn, trừ bài Quân Vua. */
const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const LV0 = {
  'ban-co': {title:'Bàn cờ và tọa độ', intro:[
    'Bàn cờ có 64 ô, gồm 8 cột và 8 hàng, ô sáng và ô tối nằm xen kẽ.',
    'Mỗi ô có một cái tên giống địa chỉ nhà: chữ cái của cột (từ a đến h) ghép với số của hàng (từ 1 đến 8). Ví dụ ô e4 là cột e, hàng 4.'
  ], steps:[
    {type:'show', fen:START_FEN, text:'Quân Trắng đứng ở hàng 1 và 2, quân Đen đứng ở hàng 7 và 8. Trắng đi trước. Hãy nhìn các chữ a đến h dọc mép dưới và các số 1 đến 8 dọc mép trái. Mẹo nhớ: ô ở góc dưới bên phải của bạn luôn là ô sáng.'},
    {type:'tap', squares:['e4','a1','h8','c6','f3','d7'], text:'Chạm vào ô được yêu cầu trên bàn cờ trống.'}
  ]},
  'tot': {title:'Quân Tốt', intro:[
    'Tốt đi thẳng về phía trước một ô. Lần đầu tiên một con Tốt đi, nó được chọn đi một hoặc hai ô.',
    'Tốt không đi lùi. Tốt ăn quân theo đường chéo phía trước, không ăn quân đứng thẳng trước mặt: quân đứng thẳng trước mặt chặn đường Tốt.'
  ], steps:[
    {type:'explore', fen:'8/8/8/8/8/8/4P3/8 w - - 0 1', min:3, text:'Chạm vào Tốt, rồi chạm ô muốn đi. Để ý: lần đầu có hai ô để chọn, các lần sau chỉ còn một.'},
    {type:'reach', fen:'8/8/8/8/8/8/3P4/8 w - - 0 1', target:'d4', best:1, text:'Đưa Tốt tới ô d4 chỉ trong một nước.'},
    {type:'capture', fen:'8/8/8/1p6/2p5/3p4/4P3/8 w - - 0 1', best:3, text:'Ăn hết 3 Tốt Đen. Nhớ: Tốt ăn theo đường chéo phía trước.'}
  ]},
  'xe': {title:'Quân Xe', intro:[
    'Xe đi thẳng theo hàng ngang hoặc cột dọc, bao nhiêu ô cũng được.',
    'Xe không nhảy qua được quân khác. Gặp quân địch thì Xe ăn bằng cách đi vào ô của nó; gặp quân mình thì dừng lại trước đó.'
  ], steps:[
    {type:'explore', fen:'8/8/8/8/3R4/8/8/8 w - - 0 1', min:3, text:'Chạm vào Xe và xem các ô nó đi được. Thử đi vài nước.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/R7 w - - 0 1', target:'h8', best:2, text:'Đưa Xe từ a1 tới góc h8. Xe chỉ đi thẳng, nên cần hai nước.'},
    {type:'capture', fen:'8/4p3/8/p3p3/8/8/8/R7 w - - 0 1', best:3, text:'Ăn hết 3 Tốt Đen bằng Xe. Hãy tìm thứ tự ăn hợp lý.'}
  ]},
  'tuong': {title:'Quân Tượng', intro:[
    'Tượng đi theo đường chéo, bao nhiêu ô cũng được, và cũng không nhảy qua quân khác.',
    'Vì chỉ đi chéo nên mỗi Tượng chỉ đi trên một màu ô suốt ván: Tượng ô sáng và Tượng ô tối. Mỗi bên có hai Tượng, mỗi màu một con.'
  ], steps:[
    {type:'explore', fen:'8/8/8/8/8/8/8/2B5 w - - 0 1', min:3, text:'Chạm vào Tượng và thử đi. Để ý nó luôn đứng trên cùng một màu ô.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/2B5 w - - 0 1', target:'f8', best:2, text:'Đưa Tượng từ c1 tới ô f8. Cần hai nước.'},
    {type:'capture', fen:'8/2p5/3p4/8/5p2/8/8/2B5 w - - 0 1', best:3, text:'Ăn hết 3 Tốt Đen bằng Tượng.'}
  ]},
  'ma': {title:'Quân Mã', intro:[
    'Mã đi hình chữ L: hai ô theo một hướng rồi một ô vuông góc với hướng đó.',
    'Mã là quân duy nhất nhảy qua được quân khác. Mỗi nước đi, Mã đổi sang ô khác màu.'
  ], steps:[
    {type:'explore', fen:'8/8/8/2PPP3/2PNP3/2PPP3/8/8 w - - 0 1', min:3, text:'Mã bị 8 Tốt trắng vây quanh nhưng vẫn nhảy ra được. Chạm vào Mã và xem.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/6N1 w - - 0 1', target:'e5', best:2, text:'Đưa Mã từ g1 tới ô e5. Cần hai nước.'},
    {type:'capture', fen:'8/8/5p2/8/4p3/2p5/8/1N6 w - - 0 1', best:3, text:'Ăn hết 3 Tốt Đen bằng Mã.'}
  ]},
  'hau': {title:'Quân Hậu', intro:[
    'Hậu là quân mạnh nhất. Hậu đi như Xe và Tượng gộp lại: theo hàng ngang, cột dọc và đường chéo, bao nhiêu ô cũng được.',
    'Hậu cũng không nhảy qua được quân khác. Vì mạnh nên Hậu rất quý: đừng để mất Hậu vì một quân nhỏ.'
  ], steps:[
    {type:'explore', fen:'8/8/8/8/3Q4/8/8/8 w - - 0 1', min:3, text:'Chạm vào Hậu và đếm xem nó đi được bao nhiêu hướng.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/Q7 w - - 0 1', target:'h7', best:2, text:'Đưa Hậu từ a1 tới ô h7. Hậu không có đường thẳng tới đó, cần hai nước.'},
    {type:'capture', fen:'8/p7/8/8/p7/8/5p2/3Q4 w - - 0 1', best:3, text:'Ăn hết 3 Tốt Đen bằng Hậu.'}
  ]},
  'vua': {title:'Quân Vua', intro:[
    'Vua đi một ô theo mọi hướng. Vua là quân quan trọng nhất: bị chiếu hết (không thoát được) là thua ván.',
    'Vua không bao giờ được đi vào ô đang bị quân địch tấn công. Nếu một ô nguy hiểm, bàn cờ sẽ không hiện chấm ở ô đó.'
  ], steps:[
    {type:'explore', fen:'8/8/8/8/8/8/r7/4K3 w - - 0 1', min:3, text:'Xe Đen ở a2 tấn công cả hàng 2. Chạm vào Vua và xem các ô an toàn. Vua không dám bước vào hàng 2.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/4K3 w - - 0 1', target:'e4', best:3, text:'Đưa Vua từ e1 tới ô e4. Vua đi từng ô một.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/4K3 w - - 0 1', target:'g3', best:2, text:'Đưa Vua từ e1 tới ô g3. Cần hai nước.'}
  ]},
  'gia-tri': {title:'Giá trị các quân', intro:[
    'Để biết một nước đổi quân có lợi không, người ta gán cho mỗi quân một giá trị gần đúng, tính bằng số Tốt: Tốt 1, Mã 3, Tượng 3, Xe 5, Hậu 9.',
    'Vua không có giá trị vì không thể bị đổi: mất Vua là thua ván. Bảng này chỉ để tính nhanh, trong ván thực tế vị trí quân còn quan trọng hơn.'
  ], steps:[
    {type:'quiz', q:'Quân nào có giá trị lớn hơn: Tượng hay Xe?', opts:['Tượng','Xe','Bằng nhau'], correct:1, why:'Xe có giá trị 5, Tượng có giá trị 3.'},
    {type:'quiz', q:'Tượng và Mã có giá trị thế nào?', opts:['Tượng lớn hơn rõ rệt','Mã lớn hơn rõ rệt','Gần như bằng nhau (cùng 3)'], correct:2, why:'Cả hai đều tính là 3 Tốt.'},
    {type:'quiz', q:'Bạn đổi Hậu của mình lấy một Xe của đối phương. Theo bảng giá trị, bạn được hay mất?', opts:['Mất, vì Hậu (9) hơn Xe (5) tới 4 Tốt','Được, vì Xe nhiều quân hơn','Bằng nhau'], correct:0, why:'Hậu 9, Xe 5: bạn mất khoảng 4 Tốt giá trị.'},
    {type:'quiz', q:'Hai Mã (3 + 3) đổi lấy một Xe (5). Bên nào có lợi theo bảng giá trị?', opts:['Bên nhận hai Mã (6 so với 5)','Bên nhận Xe (5 so với 6)','Bằng nhau'], correct:0, why:'Hai Mã có tổng 6, hơn Xe 1 Tốt. Đây chỉ là tính nhanh, vị trí cụ thể có thể làm khác đi.'}
  ]},
  'kiem-tra': {title:'Bài kiểm tra cấp 0', test:true, intro:[
    'Bài kiểm tra có 9 câu về những gì bạn đã học: tọa độ, cách đi của các quân và giá trị quân.',
    'Câu đi quân chỉ tính đúng khi bạn đi bằng số nước ngắn nhất.'
  ], steps:[
    {type:'tap', squares:['b5','g2','d8'], text:'Chạm vào ô được yêu cầu.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/R7 w - - 0 1', target:'a8', best:1, text:'Đưa Xe lên ô a8.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/6N1 w - - 0 1', target:'f3', best:1, text:'Đưa Mã tới ô f3.'},
    {type:'reach', fen:'8/8/8/8/8/8/8/2B5 w - - 0 1', target:'h6', best:1, text:'Đưa Tượng tới ô h6.'},
    {type:'capture', fen:'8/8/8/1p6/2p5/3p4/4P3/8 w - - 0 1', best:3, text:'Ăn hết 3 Tốt Đen bằng Tốt.'},
    {type:'quiz', q:'Quân nào đi được hình chữ L và nhảy qua quân khác?', opts:['Tượng','Mã','Xe'], correct:1, why:'Chỉ Mã đi hình chữ L và nhảy qua được quân khác.'},
    {type:'quiz', q:'Quân nào đi được cả hàng ngang, cột dọc và đường chéo?', opts:['Hậu','Xe','Vua'], correct:0, why:'Hậu gộp cách đi của Xe và Tượng. (Vua cũng đi mọi hướng nhưng chỉ một ô.)'},
    {type:'quiz', q:'Quân nào có giá trị lớn nhất trong Tốt, Mã, Tượng, Xe, Hậu?', opts:['Xe','Hậu','Tượng'], correct:1, why:'Hậu 9 là lớn nhất trong năm loại quân này.'},
    {type:'quiz', q:'Vua có được đi vào ô đang bị quân địch tấn công không?', opts:['Được','Không được'], correct:1, why:'Vua không bao giờ được tự đi vào ô bị tấn công.'}
  ]}
};

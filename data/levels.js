/* Khung 6 cấp (cấp 0 đến cấp 5) đã được thầy duyệt. Mỗi bài: {id, title, href?, soon?}.
   Bài có id có trong LESSON_BANK (js/lesson.js) hoặc có href là bài đã làm xong; bài soon:true là bài sẽ làm sau.
   test:true là bài kiểm tra cuối cấp: đạt 80% thì cấp được tính là đã qua (Prog.level). */
const LEVELS = [
  {n:0, name:'Làm quen', desc:'Bàn cờ, cách đi và ăn của từng quân, giá trị quân.', units:[
    {id:'ban-co', title:'Bàn cờ và tọa độ'}, {id:'tot', title:'Quân Tốt'}, {id:'xe', title:'Quân Xe'}, {id:'tuong', title:'Quân Tượng'},
    {id:'ma', title:'Quân Mã'}, {id:'hau', title:'Quân Hậu'}, {id:'vua', title:'Quân Vua'}, {id:'gia-tri', title:'Giá trị các quân'},
    {id:'kiem-tra', title:'Bài kiểm tra cấp 0', test:true}
  ]},
  {n:1, name:'Luật và chiếu hết', desc:'Chiếu, chiếu hết, hòa, nhập thành, bắt Tốt qua đường, phong cấp; chiếu hết bằng Hậu và bằng Xe.', units:[
    {id:'chieu', title:'Chiếu và chiếu hết'}, {id:'hoa-co', title:'Hòa cờ'}, {id:'nhap-thanh', title:'Nhập thành'}, {id:'qua-duong', title:'Bắt Tốt qua đường'},
    {id:'phong-cap', title:'Phong cấp'}, {id:'chieu-het-hau-xe', title:'Chiếu hết bằng Hậu và bằng Xe'}, {id:'kiem-tra-1', title:'Bài kiểm tra cấp 1', test:true}
  ]},
  {n:2, name:'Chiến thuật một đến hai nước', desc:'Đòn đôi, ghim, xiên, quân treo, chiếu hết 1 nước và 2 nước, tránh nhả quân.', units:[
    {id:'doi', title:'Đòn đôi'}, {id:'ghim', title:'Ghim'}, {id:'xien', title:'Xiên'}, {id:'quan-treo', title:'Quân treo'},
    {id:'chieu-het-1-2', title:'Chiếu hết 1 nước và 2 nước'}, {id:'tranh-nha-quan', title:'Tránh nhả quân'}, {id:'kiem-tra-2', title:'Ôn trộn và kiểm tra cấp 2', test:true}
  ]},
  {n:3, name:'Nguyên tắc khai cuộc', desc:'Chiếm trung tâm, phát triển quân, nhập thành, tránh bẫy; hai khai cuộc đầu tiên cho mỗi bên.', units:[
    {id:'ba-nguyen-tac', title:'Ba nguyên tắc: trung tâm, phát triển, nhập thành'}, {id:'bay-khai-cuoc', title:'Bẫy khai cuộc phổ biến'},
    {id:'caro-kann', title:'Caro-Kann: thế trận đầu tiên cho Đen', href:'#/o/caro-kann', quiz:'ck-all'},
    {id:'italian', title:'Khai cuộc Ý (Italian): đầu tiên cho Trắng', href:'#/o/italian', quiz:'op:italian'}, {id:'bo-khai-cuoc', title:'Xây bộ khai cuộc của mình'}, {id:'kiem-tra-3', title:'Ôn trộn và kiểm tra cấp 3', test:true}
  ]},
  {n:4, name:'Tấn công Vua và tàn cuộc Tốt', desc:'Tấn công lộ, mẫu chiếu hết, tấn công Vua; tàn cuộc Vua và Tốt (hình vuông, đối vua, zugzwang).', units:[
    {id:'tan-cong-lo', title:'Tấn công lộ và chiếu đôi'}, {id:'lac-huong', title:'Đánh lạc hướng, dụ, quá tải'}, {id:'mau-chieu-het', title:'Mẫu chiếu hết kinh điển'},
    {id:'tan-cong-vua', title:'Tấn công Vua'}, {id:'hinh-vuong', title:'Quy tắc hình vuông'}, {id:'doi-vua', title:'Đối vua và ô then chốt'}, {id:'zugzwang', title:'Zugzwang: khi đến lượt đi là bất lợi'},
    {id:'tan-cuoc', title:'Luyện 10 câu tàn cuộc', href:'#/cau-do/tan-cuoc', quiz:'end'}, {id:'kiem-tra-4', title:'Ôn trộn và kiểm tra cấp 4', test:true}
  ]},
  {n:5, name:'Chiến lược và tàn cuộc', desc:'Cấu trúc Tốt, quân tốt và quân xấu, tiền đồn, kế hoạch; tàn cuộc Xe và quân nhẹ; thư viện khai cuộc mở rộng.', units:[
    {id:'tot-yeu', title:'Tốt yếu: cô lập, chồng, lạc hậu'}, {id:'tot-thong', title:'Tốt thông và đột phá'}, {id:'quan-tot-xau', title:'Quân tốt và quân xấu'},
    {id:'co-mo-tien-don', title:'Tiền đồn và cột mở'}, {id:'phong-ngua', title:'Phòng ngừa, phong tỏa, hai điểm yếu'}, {id:'lap-ke-hoach', title:'Lập kế hoạch'},
    {id:'tam-giac-reti', title:'Tam giác hóa và nước Réti'}, {id:'xe-lucena-philidor', title:'Tàn cuộc Xe: Lucena và Philidor'}, {id:'tuong-sai-mau', title:'Tượng sai màu và pháo đài'},
    {id:'sicilian', title:'Phòng thủ Sicilian', href:'#/o/sicilian', quiz:'op:sicilian'}, {id:'french', title:'Phòng thủ Pháp', href:'#/o/french', quiz:'op:french'}, {id:'ruy-lopez', title:'Khai cuộc Tây Ban Nha (Ruy Lopez)', href:'#/o/ruy-lopez', quiz:'op:ruy-lopez'}, {id:'kiem-tra-5', title:'Ôn trộn và kiểm tra cấp 5', test:true}
  ]}
];

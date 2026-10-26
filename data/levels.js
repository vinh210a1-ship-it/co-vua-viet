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
    {title:'Ba nguyên tắc: trung tâm, phát triển, nhập thành', soon:true},
    {id:'caro-kann', title:'Caro-Kann: thế trận đầu tiên cho Đen', href:'#/o/caro-kann', quiz:'ck-all'},
    {title:'Khai cuộc đầu tiên cho Trắng (Italian hoặc Scotch)', soon:true}, {title:'Ôn trộn và kiểm tra cấp 3', soon:true}
  ]},
  {n:4, name:'Tấn công Vua và tàn cuộc Tốt', desc:'Chiến thuật 3 nước, tấn công Vua; tàn cuộc Vua và Tốt (đối lập, ô then chốt).', units:[
    {title:'Chiến thuật 3 nước', soon:true}, {title:'Tấn công Vua', soon:true}, {title:'Tàn cuộc Tốt: đối lập, ô then chốt', soon:true},
    {id:'tan-cuoc', title:'Luyện 10 câu tàn cuộc', href:'#/cau-do/tan-cuoc', quiz:'end'}, {title:'Ôn trộn và kiểm tra cấp 4', soon:true}
  ]},
  {n:5, name:'Chiến lược', desc:'Cấu trúc Tốt, quân tốt và quân xấu, cột mở, tàn cuộc Xe; thư viện khai cuộc mở rộng.', units:[
    {title:'Cấu trúc Tốt', soon:true}, {title:'Quân tốt và quân xấu', soon:true}, {title:'Cột mở', soon:true},
    {title:'Tàn cuộc Xe (Lucena, Philidor)', soon:true}, {title:'Khai cuộc mở rộng: Sicilian, Pháp, Ruy Lopez...', soon:true}, {title:'Ôn trộn và kiểm tra cấp 5', soon:true}
  ]}
];

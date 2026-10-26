/* Bài xếp lớp: 15 câu, chia theo cấp (lv 0 đến 3). Cấp nào đúng từ 75% trở lên (liên tiếp từ cấp 0) thì coi như đã biết.
   Kết quả chỉ là gợi ý nên bắt đầu từ cấp nào, học sinh vẫn tự chọn học lại bất kỳ cấp nào.
   Mỗi câu có from: bài học tương ứng (để gợi ý ôn lại). */
const PLACEMENT = {
  title:'Bài xếp lớp', placement:true, intro:[
    'Bài này có 15 câu, từ dễ đến khó, để biết bạn nên bắt đầu học từ cấp nào. Không cần điểm cao, cứ làm hết sức.',
    'Không có gợi ý. Nếu chưa tìm ra, bạn có thể bấm Bỏ qua câu này. Chỉ mất khoảng 10 phút.'
  ], steps:[
    {lv:0, from:'ban-co', type:'tap', squares:['c3','f6','h1'], text:'Chạm vào ô được yêu cầu trên bàn cờ trống.'},
    {lv:0, from:'ma', type:'quiz', q:'Quân nào đi được hình chữ L và nhảy qua quân khác?', opts:['Tượng','Mã','Xe'], correct:1, why:'Chỉ Mã đi hình chữ L và nhảy qua quân khác.'},
    {lv:0, from:'tuong', type:'reach', fen:'8/8/8/8/8/8/8/2B5 w - - 0 1', target:'h6', best:1, text:'Đưa Tượng tới ô h6 bằng một nước.'},
    {lv:0, from:'gia-tri', type:'quiz', q:'Hậu đổi lấy một Xe. Theo bảng giá trị, bạn được hay mất?', opts:['Mất, vì Hậu (9) hơn Xe (5)','Được, vì Xe ít hơn','Bằng nhau'], correct:0, why:'Hậu 9 điểm, Xe 5 điểm. Đổi Hậu lấy Xe là thiệt 4 điểm.'},
    {lv:1, from:'chieu', type:'find', fen:'3qkb2/3p1p2/2n5/8/8/8/8/4RK2 b - - 0 1', want:'block', text:'Vua đen bị chiếu và hết ô để đi. Hãy chắn đường chiếu.', why:'Quân đứng giữa chặn đường của Xe.'},
    {lv:1, from:'chieu', type:'find', fen:'3r2k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1', mate:true, text:'Trắng chiếu hết trong một nước.', why:'Vua đen bị ba Tốt của mình chặn đường.'},
    {lv:1, from:'nhap-thanh', type:'find', fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', answer:['e1g1'], text:'Trắng hãy nhập thành gần.', why:'Vua tới g1, Xe nhảy sang f1.'},
    {lv:1, from:'hoa-co', type:'quiz', q:'Đến lượt Đen. Vua đen không bị chiếu và không có nước nào đi được. Kết quả?', fen:'7k/5Q2/6K1/8/8/8/8/8 b - - 0 1', opts:['Trắng thắng','Hòa (bế tắc)','Đen thắng'], correct:1, why:'Bế tắc là hòa.'},
    {lv:2, from:'doi', type:'find', fen:'r3k3/8/4N3/8/8/8/8/4K3 w - - 0 1', answer:['e6c7'], text:'Trắng đi. Hãy tìm đòn đôi: một nước tấn công cùng lúc Vua và Xe.', why:'Mã ở c7 chiếu Vua và tấn công Xe a8.'},
    {lv:2, from:'ghim', type:'find', fen:'4k3/3n4/8/8/8/8/8/4KB2 w - - 0 1', answer:['f1b5'], text:'Trắng đi. Hãy ghim Mã đen vào Vua đen.', why:'Tượng, Mã và Vua thẳng hàng trên một đường chéo.'},
    {lv:2, from:'xien', type:'find', fen:'1r6/8/3k4/8/8/8/8/2B1K3 w - - 0 1', answer:['c1f4'], text:'Trắng đi. Hãy chiếu Vua đen sao cho thắng được quân đứng sau Vua.', why:'Vua phải tránh, rồi Tượng ăn Xe ở b8.'},
    {lv:2, from:'quan-treo', type:'find', fen:'4k3/8/3p4/4b3/1n2R3/8/6K1/8 w - - 0 1', answer:['e4b4'], wrong:{e4e5:'Tượng e5 có Tốt d6 bảo vệ, ăn là thiệt Xe.'}, text:'Trắng đi. Hãy ăn quân đang bị treo.', why:'Mã b4 không ai bảo vệ.'},
    {lv:3, from:'khai-cuoc', type:'quiz', q:'Trong khai cuộc, nên làm điều gì trước?', opts:['Đưa Hậu ra sớm để tấn công','Đưa Mã và Tượng ra, chiếm trung tâm, rồi nhập thành','Đi Tốt ở cánh liên tục'], correct:1, why:'Ba nguyên tắc: chiếm trung tâm, phát triển Mã và Tượng, nhập thành cho Vua an toàn.'},
    {lv:3, from:'khai-cuoc', type:'quiz', q:'Trắng vừa đi 1.e4, Đen đi 1...e5, Trắng đi 2.Nf3. Đen nên đi nước nào?', fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2', opts:['Nc6: đưa Mã ra và bảo vệ Tốt e5','Qh4: đưa Hậu ra sớm','a6: đi Tốt cánh'], correct:0, why:'Nc6 phát triển Mã và bảo vệ Tốt e5. Qh4 thì Hậu bị Mã f3 ăn ngay.'},
    {lv:3, from:'khai-cuoc', type:'quiz', q:'Vì sao không nên đi cùng một quân nhiều lần trong khai cuộc?', opts:['Vì luật cấm','Vì mất thời gian, đối thủ đưa quân ra nhanh hơn','Vì quân sẽ bị hỏng'], correct:1, why:'Mỗi nước nên đưa thêm một quân mới ra chơi. Đi một quân nhiều lần là bỏ phí thời gian.'}
  ]
};

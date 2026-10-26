/* Kho lời thoại của Hội quân cờ. Sửa file này để thêm hoặc đổi câu, không đụng vào mã chương trình.
   Mỗi câu: [người nói, nội dung, cờ trend]. Người nói: P Tốt, N Mã, B Tượng, R Xe, Q Hậu, K Vua.
   Cờ trend = 1 nếu câu có dùng từ đang phổ biến (để chương trình chọn đúng tỉ lệ theo mức trend).
   {n} là số ngày của chuỗi.
   Bốn luật khi viết câu: chỉ trêu nước đi, không trêu con người; không đùa về ngoại hình, hoàn cảnh, sức khỏe tinh thần, chuyện yêu đương;
   không dùng từ lóng chê người khác; sai liền 3 lần thì ngừng trêu (chương trình tự xử lý, xem mục sai3).
   Từ lóng cần duyệt lại định kỳ: ghi ngày duyệt gần nhất ở VOICE.reviewed. */
window.VOICE = {
  reviewed: '2026-10-26',
  trend: {it:.25, vua:.5, nhieu:.85},
  defaults: {tone:'vui', trend:'vua'},
  /* Xác suất hiện lời khen khi trả lời đúng (lời trêu khi sai thì luôn hiện) để không làm phiền. */
  praiseChance: .6,
  tones: [['nhe','Nhẹ nhàng','Lời động viên, không trêu'], ['vui','Hài hước','Trêu vui, có trend'], ['gat','Gắt yêu','Nói thẳng kiểu thương nhau'], ['tat','Tắt trêu','Không có nhân vật nói, chỉ báo đúng sai']],
  cast: {
    P:{name:'Tốt', sym:'wP', trait:'Chăm chỉ, hay nhắc học', says:'Đi từng ô một, không bỏ buổi nào.'},
    N:{name:'Mã', sym:'wN', trait:'Tinh nghịch, hay trêu', says:'Nhảy chữ L, nói chuyện cũng nhảy.'},
    B:{name:'Tượng', sym:'wB', trait:'Điềm đạm, hay động viên', says:'Đi chéo, nhìn xa, nói nhẹ.'},
    R:{name:'Xe', sym:'wR', trait:'Nói thẳng như đường thẳng', says:'Không vòng vo, nhưng luôn thương.'},
    Q:{name:'Hậu', sym:'wQ', trait:'Quyền lực, khen rất đã', says:'Hiếm khi khen, khen là đáng nhớ.'},
    K:{name:'Vua', sym:'wK', trait:'Hay lo, sợ bị chiếu', says:'Lo từng nước một, nhưng rất tự hào.'}
  },
  /* Danh hiệu: need = ngưỡng của chỉ số stat. */
  badges: [
    {id:'tot-len-duong', name:'Tốt lên đường', desc:'Giải đúng câu đố đầu tiên.', stat:'solved', need:1},
    {id:'gcl-tap-su', name:'Gia Cát Lượng tập sự', desc:'Giải đúng 10 câu.', stat:'solved', need:10},
    {id:'gcl-cay-quat', name:'Thua Gia Cát Lượng đúng cây quạt', desc:'Giải đúng 50 câu.', stat:'solved', need:50},
    {id:'chieu-het', name:'Chiến thần chiếu hết', desc:'Chiếu hết 5 lần.', stat:'mates', need:5},
    {id:'aura', name:'Aura đầy bình', desc:'Đúng liền 5 câu.', stat:'bestCombo', need:5},
    {id:'co-cot', name:'Cốt của Vua', desc:'Giữ chuỗi 7 ngày.', stat:'maxStreak', need:7},
    {id:'giu-lua', name:'Người giữ lửa', desc:'Giữ chuỗi 30 ngày.', stat:'maxStreak', need:30},
    {id:'nan-nhan', name:'Nạn nhân của nước đi vội', desc:'Đưa quân vào chỗ bị ăn 10 lần. Ai cũng từng vậy.', stat:'hangs', need:10},
    {id:'ai-cung-tung', name:'Ai cũng từng vậy', desc:'Xin gợi ý 10 lần. Xin gợi ý là chuyện bình thường.', stat:'hints', need:10},
    {id:'phong-cap', name:'Phong cấp', desc:'Hoàn thành một cấp học.', stat:'levels', need:1}
  ],
  /* Nhãn nước đi: loss = số trăm Tốt kém hơn nước tốt nhất (centipawn). */
  labels: [
    {max:10, id:'best', t:'Tuyệt đối điện ảnh', cls:'ok'},
    {max:30, id:'great', t:'Vuýp', cls:'ok'},
    {max:80, id:'ok', t:'Cũng cũng', cls:'mid'},
    {max:150, id:'meh', t:'Chưa đủ wow', cls:'mid'},
    {max:300, id:'miss', t:'Lỡ tay rồi', cls:'no'},
    {max:1e9, id:'blunder', t:'Về kể không ai tin', cls:'no'}
  ],
  /* Thẻ tổng kết: đổi câu theo số liệu buổi học. Chỉ dùng với giọng Hài hước và Gắt yêu. */
  recap: {
    hangs:['Tôi là nạn nhân của {hangs} lần cho đối thủ ăn quân miễn phí.'],
    wrong:['Tôi là nạn nhân của chính những nước đi vội. Mai làm lại.'],
    many:['Giải {solved} câu trong một buổi. Thua Gia Cát Lượng đúng cây quạt.'],
    mates:['Hôm nay Vua đối phương bị chiếu hết {mates} lần. Ai bảo cản đường.'],
    hints:['+1 máy: tôi xin gợi ý {hints} lần và không hối hận.'],
    base:['Hôm nay tôi vào học. Vậy là đủ vuýp rồi.'],
    nhe:['Hôm nay mình giải {solved} câu. Cảm ơn bạn đã kiên trì.']
  },
  L: {
    dung:{
      nhe:[['B','Chính xác! Bạn nhìn thế cờ rất tinh.'],['Q','Đúng rồi. Nước này gọn và đẹp.'],['B','Tuyệt đối điện ảnh. Nước đi này như một cảnh trong phim.',1]],
      vui:[['Q','Tuyệt đối điện ảnh! Nước đi này đáng được quay phim.',1],['N','Ra đường Mã chỉ nể mỗi bạn.',1],['N','Đúng ngay! Mã nhảy chữ L còn bạn nhảy thẳng vào đáp án.'],['Q','Chuẩn. Hậu gật đầu một cái, hiếm lắm đó.']],
      gat:[['Q','Đúng luôn. Hậu định chê mà không tìm ra chỗ nào, bực ghê.'],['N','Thua Gia Cát Lượng đúng cây quạt đó nha.',1],['R','Đúng. Xe không khen nhiều đâu, nhưng nước này đáng.']]
    },
    combo:{
      nhe:[['B','5 câu đúng liên tiếp! Bạn đang vào guồng rồi đó.']],
      vui:[['Q','5 câu liền, aura đầy bình luôn. Bạn đang aura farming hả?',1],['N','Chuỗi 5 câu đúng, vuýp luôn!',1],['Q','5 câu liền, cả hội quân cờ đứng dậy vỗ tay.']],
      gat:[['N','5 câu liền không sai. Mã bắt đầu sợ rồi, bạn nương tay với Mã đi.'],['R','5 câu không sai. Xe chịu, hết chê được rồi.']]
    },
    sai:{
      nhe:[['B','Chưa đúng, không sao đâu. Thử xem quân nào đang bị đe dọa nhé.'],['P','Gần rồi. Nhìn lại thế cờ một lần nữa nào.']],
      vui:[['N','Ủa? Nước này đúng kiểu về kể không ai tin. Thử lại nào!',1],['N','Nước đó mà đi thật thì Mã phải mời đoàn mình di chuyển lên núi giùm em. Làm lại nha!',1],['P','Sai một nước thôi, Tốt còn đi từng ô một mà. Thử lại!']],
      gat:[['R','Hmm. Xe nhìn nước đó và phải ngồi xuống một chút. Thử lại đi.'],['N','Sai rồi. Nhưng Mã biết bạn làm được, nên Mã mới dám nói thẳng.'],['R','Nước đó chưa tới đích. Xe đi thẳng một mạch, bạn thử đi đường ngắn hơn xem.']]
    },
    /* Nước đi ổn nhưng không phải đáp án của bài (máy chấm kém dưới 0,8 Tốt). */
    gan:{
      nhe:[['B','Nước này cũng ổn, nhưng bài đang hỏi một nước khác. Thử lại nhé.']],
      vui:[['P','Nước này đi được, chỉ là câu đố đang tìm nước khác. Tốt tin bạn tìm ra.'],['N','Không dở đâu, nhưng chưa phải đáp án. Mã thấy còn nước hay hơn.']],
      gat:[['R','Nước đó không dở, nhưng chưa đủ wow. Tìm nước mạnh hơn đi.',1],['Q','Ổn, nhưng Hậu muốn thấy nước tốt hơn.']]
    },
    /* Tự bật khi sai liền 3 lần, mọi giọng đều dịu lại. */
    sai3:{
      all:[['B','Ba lần rồi, Hội quân cờ ngừng trêu nhé. Câu này khó thật. Bấm Gợi ý hoặc xem lại bài, chúng tôi ở đây với bạn.'],['P','Nghỉ một nhịp nhé. Ai cũng có câu làm mãi không ra. Mình xem lại cách đi của quân này cùng nhau.']]
    },
    matquan:{
      nhe:[['K','Ôi, quân này đang đứng ở ô có thể bị ăn. Thử tìm xem đối thủ ăn nó bằng quân nào nhé.']],
      vui:[['N','Ơ, quân của bạn vừa tự đăng ký đi du lịch không hẹn ngày về.'],['K','Mất quân rồi à? Vua sợ quá, hướng nội hết phần đời còn lại.',1],['P','Tốt chứng kiến rồi nha: quân đó đi vào chỗ bị ăn.']],
      gat:[['Q','Bạn vừa tặng quân cho đối thủ mà không gói quà luôn hả? Hào phóng ghê.'],['R','Quân đó đi vào chỗ bị ăn. Xe nhắm mắt lại cho đỡ thương.']]
    },
    bolo:{
      nhe:[['B','Bạn đi đúng hướng rồi, chỉ thiếu nước cuối. Thử tìm nước khóa hẳn đường chạy của Vua nhé.']],
      vui:[['R','Chiếu hết nằm ngay đó mà bạn lướt qua. Về kể không ai tin! Quay lại nhìn kỹ xem.',1],['K','Vua đối phương đang run lẩy bẩy, mà bạn lại cho nó thêm một nước thở. Vua đồng nghiệp thở phào rồi đó.']],
      gat:[['R','Chiếu hết có 1 nước mà bạn đi đường vòng. Xe đang thở dài đây này.'],['Q','Chiếu hết ngay trước mũi mà bạn bỏ qua. Hậu thấy tiếc dùm.']]
    },
    hint:{
      nhe:[['B','Ai cũng cần gợi ý lúc nào đó. Tượng chỉ hướng cho bạn nhé.']],
      vui:[['N','Xin gợi ý hả? +1 máy, ai cũng từng vậy.',1],['N','Gợi ý đây. Lần sau nhớ chia Mã một nửa chiến thắng nha.']],
      gat:[['R','Được, lần này Xe cho. Lần sau thử tự nghĩ trước 30 giây nhé.'],['Q','Gợi ý hả? Hmm. Hậu thương bạn nên mới cho đó.']]
    },
    chuoi:{
      nhe:[['P','{n} ngày liên tiếp! Bạn học đều đặn quá.']],
      vui:[['Q','Chuỗi {n} ngày, vuýp luôn! Cả hội tặng bạn một tràng pháo tay.',1],['N','{n} ngày liền. Aura của bạn đang lên rõ rệt.',1]],
      gat:[['N','{n} ngày không bỏ buổi nào. Mã nghi nghi: bạn có phải người thật không?'],['R','{n} ngày rồi đó. Giờ mà bỏ thì Xe giận thật đấy, nói trước.']]
    },
    /* Nhắc học khi còn chuỗi mà hôm nay chưa học. */
    nhac1:{
      nhe:[['P','Hôm nay bạn chưa vào học. Chỉ cần một câu đố 2 phút là giữ được chuỗi {n} ngày.']],
      vui:[['P','Cơm nước gì chưa bạn ơi? Ăn xong làm một câu đố cho tiêu cơm nha.',1],['N','Gét gô! Một câu thôi, giữ chuỗi {n} ngày nè.',1]],
      gat:[['Q','Bàn cờ nhớ bạn. Chuỗi {n} ngày của bạn đang run lẩy bẩy ở góc kia kìa.'],['K','Cả hội đứng ở cửa chờ bạn từ sáng. Không áp lực đâu, chỉ là hơi lâu thôi.']]
    },
    /* Nhắc học khi đã nghỉ từ 3 ngày. */
    nhac3:{
      nhe:[['P','Lâu rồi không gặp! Mình quay lại bằng một câu dễ thôi nhé, không áp lực.']],
      vui:[['K','Bạn đi đâu mà để bàn cờ bám bụi vậy? Cả hội đứng đợi mấy ngày rồi nha.'],['N','Ủa, bạn còn nhớ đường vào đây không? Một câu dễ thôi, Mã hứa.']],
      gat:[['N','Mã thấy lời nhắc không có tác dụng nên Mã quyết định... nhắc tiếp. Vào làm một câu thôi!'],['P','Mấy ngày rồi! Con Tốt nhỏ nhất bàn cờ còn đi mỗi ngày một ô đó nha.']]
    },
    cap:{
      nhe:[['B','Bạn đã hoàn thành cấp này. Cảm ơn vì đã kiên trì.']],
      vui:[['Q','Lên cấp rồi! Đi khoe cả nhóm được rồi đó, Hậu cho phép.'],['N','Vuýp! Cấp mới đang chờ bạn.',1]],
      gat:[['R','Qua cấp rồi à? Được đó. Cấp sau khó hơn, chuẩn bị tinh thần nha.'],['K','Xong cấp. Vua không nói gì thêm, vì Vua đang bận tự hào.']]
    },
    khuya:{
      nhe:[['B','Muộn rồi. Làm xong câu này rồi đi ngủ nhé, mắt cần nghỉ.']],
      vui:[['N','Khuya vậy mà còn đi cờ? Tuyệt đối điện ảnh, nhưng đi ngủ đi.',1],['P','Giờ này Tốt cũng buồn ngủ rồi. Mai mình gặp lại nha.']],
      gat:[['K','Giờ này đến Vua cũng đi ngủ. Xong câu này là tắt máy nha.'],['R','Mai còn học. Thức khuya là nước đi sai lớn nhất trong ngày đó.']]
    },
    /* Thẻ nghỉ: hai tình huống. */
    theNghi:{
      all:[['P','Bạn được tặng 1 thẻ nghỉ vì học đủ 7 ngày. Hôm nào bận, thẻ sẽ giữ chuỗi giùm bạn.']]
    },
    theDung:{
      all:[['P','Hôm qua bạn nghỉ, thẻ nghỉ đã giữ chuỗi {n} ngày cho bạn. Hôm nay mình học tiếp nhé.']]
    },
    huyhieu:{
      all:[['Q','Danh hiệu mới: {badge}. {desc}']]
    }
  },
  /* Nút trả lời lời nhắc: giọng nhẹ nhàng dùng chữ thường, giọng vui và gắt yêu dùng chữ trend. */
  remind: {
    go:{nhe:'Vào học ngay', vui:'Gét gô', gat:'Gét gô'},
    later:{nhe:'Để lát nữa', vui:'Ok {name}', gat:'Ok {name}'},
    off:'Đừng nhắc nữa'
  }
};

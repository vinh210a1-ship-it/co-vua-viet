# Bản kiểm duyệt nội dung khai cuộc

File này do máy tự gom từ `data/lessons/`. **Các nước đi, tên khai cuộc, đánh giá thế cờ và đáp án puzzle đã được máy kiểm** (python-chess và Stockfish).
Những phần dưới đây là **nhận định của người soạn, chưa có nguồn tham khảo**, cần giáo viên đọc và duyệt: ý tưởng, điểm mạnh, điểm yếu, kế hoạch hai bên, lời khuyên, và lời giải thích từng nước.
Cách duyệt: đọc từng mục, tích `[x]` nếu đồng ý; nếu cần sửa, ghi chú ngay dưới mục đó.

## Chiếu hết sớm (bẫy cho người mới) (Early Checkmate Traps)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A00-C44 · 6 biến thể · 8 puzzle

**Câu giới thiệu:** Những cú chiếu hết chỉ sau vài nước. Biết để tự bảo vệ, và biết khi nào đối thủ sắp mắc bẫy.

**Ý tưởng:**
- Ở những nước đầu, ô f7 (của Đen) và f2 (của Trắng) chỉ có Vua bảo vệ, nên đây là mục tiêu số một của mọi đòn tấn công nhanh. Hầu hết các bẫy dưới đây đều nhắm vào hai ô này.
- Cách tránh bẫy luôn giống nhau: phát triển quân nhẹ trước, đừng đưa Hậu ra sớm, và trước mỗi nước đi hãy hỏi "đối thủ định đe dọa ô nào?".

**Điểm mạnh:**
- Rất dễ học: mỗi bẫy chỉ có vài nước, nhưng dạy được nguyên tắc quan trọng.
- Biết bẫy giúp người mới tự bảo vệ và nhận ra đòn nguy hiểm sớm.
- Phù hợp để luyện tính toán chiếu hết một nước.

**Điểm yếu:**
- Đối thủ biết lý thuyết sẽ tránh bẫy dễ dàng, nên không thể dựa vào bẫy để thắng.
- Nếu cố chơi bẫy mà bỏ qua nguyên tắc phát triển quân, bạn sẽ thua khi đối thủ phòng thủ đúng.
- Mỗi bẫy chỉ đúng với một thứ tự nước cụ thể; sai thứ tự là mất tác dụng.

### Chiếu hết 4 nước (Scholar's Mate)

- [ ] Đã duyệt  · nước đi: `e4 e5 Bc4 Nc6 Qh5 Nf6 Qxf7#` · tên Lichess: Bishop's Opening · máy chấm +10000 centipawn (Trắng dương)

**Ý tưởng:** Trắng đưa Tượng và Hậu cùng nhắm vào f7. Nếu Đen không chú ý, Hậu ăn f7 chiếu hết chỉ sau 4 nước.

**Điểm mạnh:** Rất nhanh nếu đối thủ bỏ qua. / Dạy rõ tầm quan trọng của ô f7.

**Điểm yếu:** Đen chỉ cần đẩy g6 hoặc phát triển Mã f6 đúng lúc là hóa giải. / Hậu ra sớm dễ bị đuổi và mất thời gian.

**Kế hoạch Trắng:** Nếu Đen phòng thủ, hãy rút Hậu về và chơi bình thường, đừng cố ép.

**Kế hoạch Đen:** Bảo vệ f7: đi g6 đuổi Hậu, hoặc Qe7, hoặc Nh6. Tuyệt đối không đi Nf6?? vì Qxf7# chiếu hết ngay.

**Lời khuyên:** Khi Hậu và Tượng địch cùng nhắm vào một tốt chỉ có Vua bảo vệ, phải xử lý ngay.

### Phòng thủ Scholar's Mate đúng cách

- [ ] Đã duyệt  · nước đi: `e4 e5 Bc4 Nc6 Qh5 g6 Qf3 Nf6 Qb3 Qe7 Nc3 Na5` · tên Lichess: Bishop's Opening · máy chấm -77 centipawn (Trắng dương)

**Ý tưởng:** Đen đẩy g6 đuổi Hậu h5, phát triển quân nhẹ và Trắng mất thời gian vì Hậu ra sớm. Đây là cách hóa giải sạch nhất.

**Điểm mạnh:** Đen phát triển quân tự nhiên mà vẫn đuổi được Hậu. / Trắng đã đưa Hậu ra sớm nên Đen có lợi thế phát triển.

**Điểm yếu:** Đen phải nhớ không được đáp Nf6?? vội vì Qxf7#. / Nước g6 làm yếu ô f6 và h6, cần cẩn thận về sau.

**Kế hoạch Trắng:** Rút Hậu về f3 hoặc b3 và tiếp tục phát triển, đừng cố ép tấn công.

**Kế hoạch Đen:** Phát triển Mã f6 chỉ khi f7 đã an toàn, đẩy Qe7 để giữ f7, và đuổi Tượng c4 bằng ...Na5.

**Lời khuyên:** Sau g6, Hậu Trắng không còn nhắm được vào f7 theo đường chéo, nhưng Qf3 vẫn nhắm theo cột f.

### Chiếu hết kẻ ngốc (Fool's Mate)

- [ ] Đã duyệt  · nước đi: `f3 e5 g4 Qh4#` · tên Lichess: Barnes Opening: Fool's Mate · máy chấm -10000 centipawn (Trắng dương)

**Ý tưởng:** Chiếu hết nhanh nhất trong cờ vua: hai nước của Trắng làm yếu Vua nghiêm trọng, và Hậu Đen chiếu hết ngay ở nước thứ hai của mình.

**Điểm mạnh:** Cho thấy rõ tại sao không được đẩy tốt f và g của Vua ở nước đầu. / Dễ nhớ, dễ nhận ra.

**Điểm yếu:** Chỉ xảy ra khi Trắng chơi cực kỳ sai. / Hầu như không gặp trong ván thật giữa người biết luật.

**Kế hoạch Trắng:** Đừng đẩy tốt f hoặc g ở những nước đầu: chúng mở đường chéo e1-h4 cho Hậu Đen.

**Kế hoạch Đen:** Khi Trắng mở đường chéo e1-h4, hãy kiểm tra ngay xem Hậu có chiếu hết được không.

**Lời khuyên:** Đường chéo e1-h4 là điểm yếu số một của Vua Trắng ở khai cuộc.

### Chiếu hết Légal (hy sinh Hậu)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 d6 Bc4 Bg4 Nc3 g6 Nxe5 Bxd1 Bxf7+ Ke7 Nd5#` · tên Lichess: Philidor Defense · máy chấm +10000 centipawn (Trắng dương)

**Ý tưởng:** Trắng bỏ Hậu để lôi Vua Đen ra và chiếu hết bằng ba quân nhẹ (Mã, Mã và Tượng). Đen tham ăn Hậu sẽ mắc bẫy.

**Điểm mạnh:** Một ví dụ kinh điển về phối hợp Mã và Tượng. / Dạy rằng không nên tham ăn Hậu khi Vua mình chưa an toàn.

**Điểm yếu:** Đen chỉ cần ăn Mã e5 bằng tốt d là hóa giải. / Đen đáp ...Bg4 sớm là điều kiện để bẫy xảy ra.

**Kế hoạch Trắng:** Khi Đen ghim Mã f3 bằng Tượng g4, hãy xem có đòn Nxe5 không.

**Kế hoạch Đen:** Đừng ăn Hậu bằng Tượng g4: hãy ăn Mã bằng tốt d6xe5.

**Lời khuyên:** Khi đối phương tặng Hậu, hãy tính xem có chiếu hết không trước khi ăn.

### Bẫy Blackburne Shilling (Đen thắng nhanh)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bc4 Nd4 Nxe5 Qg5 Nxf7 Qxg2 Rf1 Qxe4+ Be2 Nf3#` · tên Lichess: Italian Game: Blackburne-Kostić Gambit · máy chấm -10000 centipawn (Trắng dương)

**Ý tưởng:** Đen cố tình để Trắng ăn tốt, rồi dùng Hậu và Mã chiếu hết khi Trắng tham lam bỏ qua Vua.

**Điểm mạnh:** Một bẫy rất đẹp cho Đen. / Dạy rằng Hậu và Mã phối hợp rất nguy hiểm ở g2 và f3.

**Điểm yếu:** Nếu Trắng đáp đúng (Nxd4), Đen mất thời gian và không có gì. / Đen phải chấp nhận thế cờ kém nếu Trắng biết bẫy.

**Kế hoạch Trắng:** Sau 3...Nd4, hãy đổi Mã (Nxd4 exd4) rồi nhập thành, đừng tham ăn tốt.

**Kế hoạch Đen:** Giữ bẫy chỉ khi đối thủ chưa quen; nếu Trắng đổi Mã, hãy chơi bình thường.

**Lời khuyên:** Khi đối phương hy sinh tốt dễ dãi, hãy kiểm tra xem Hậu của họ định làm gì.

### Chiếu hết bằng Mã (bẫy Caro-Kann)

- [ ] Đã duyệt  · nước đi: `e4 c6 d4 d5 Nc3 dxe4 Nxe4 Nd7 Qe2 Ngf6 Nd6#` · tên Lichess: Caro-Kann Defense: Karpov Variation · máy chấm +10000 centipawn (Trắng dương)

**Ý tưởng:** Mã Trắng nhảy tới d6 chiếu hết khi Vua Đen bị chính quân mình chặn kín (Vua bị "ngạt"). Bẫy xuất hiện trong Caro-Kann khi Đen chơi sai thứ tự.

**Điểm mạnh:** Dạy cách nhận ra Vua bị "chôn" bởi quân nhà. / Chiếu hết đẹp chỉ bằng một Mã và Hậu ghim.

**Điểm yếu:** Chỉ xảy ra nếu Đen đi 5...Ngf6??; chỉ cần chọn nước khác (ví dụ ...e6) là hóa giải. / Đen chỉ cần để ý cột e và ô thoát của Vua.

**Kế hoạch Trắng:** Nếu Đen bỏ qua e7, hãy chuẩn bị Qe2 và Nd6#.

**Kế hoạch Đen:** Không đưa Mã g8 ra f6 khi Hậu Trắng đã ở e2 và tốt e7 còn ghim.

**Lời khuyên:** Tốt e7 bị ghim trên cột e thì không thể ăn được Mã d6.

---

## Hệ thống Colle (Colle System)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO D04-D05 · 3 biến thể · 10 puzzle

**Câu giới thiệu:** Bộ khung đơn giản cho Trắng: e3, Bd3, Nbd2, c3, O-O rồi đẩy e4 để mở thế cờ có lợi.

**Ý tưởng:**
- Hệ thống Colle (và biến thể Zukertort có b3) là một bộ khung quân dễ học: d4, Nf3, e3, Bd3, c3, Nbd2, nhập thành, rồi đẩy tốt e4 để mở trung tâm. Khung này hầu như không đổi dù Đen đáp thế nào, nên người mới học ít phải nhớ biến thể.
- Thế cờ an toàn, Vua Trắng ở yên, và Tượng d3 nhắm thẳng vào cánh vua của Đen. Khi Trắng đẩy được e4 đúng lúc, Tượng d3 và Hậu có thể dẫn đến đòn tấn công mạnh (ví dụ hy sinh Tượng trên h7). Đổi lại, thế cờ ít tham vọng giành ưu thế sớm.

**Điểm mạnh:**
- Bộ khung đơn giản, ít phải học thuộc lý thuyết.
- Thế cờ vững chắc, Vua nhập thành an toàn.
- Có sẵn kế hoạch tấn công khi đẩy được e4.

**Điểm yếu:**
- Không giành ưu thế rõ ràng, Đen dễ cân bằng.
- Nếu Đen kịp chơi ...c5 và ...Nc6 sớm thì Trắng khó đẩy e4.
- Đối thủ có kinh nghiệm biết rõ cách chống lại các nước quen thuộc.

### Colle chính (c3 + Nbd2 + e4)

- [ ] Đã duyệt  · nước đi: `d4 d5 Nf3 Nf6 e3 e6 Bd3 c5 c3 Nc6 Nbd2 Bd6 O-O O-O Re1 Qc7 dxc5 Bxc5 e4 dxe4 Nxe4 Nxe4 Bxe4` · tên Lichess: Queen's Pawn Game: Colle System, Traditional Colle · máy chấm +40 centipawn (Trắng dương)

**Ý tưởng:** Trắng dựng bộ khung c3, Bd3, Nbd2, nhập thành và Re1, rồi đẩy e4 khi Đen đã đổi tốt ở c5. Sau e4, Trắng có trung tâm tốt và Tượng d3 nhắm thẳng vào cánh vua Đen.

**Điểm mạnh:** Bộ khung chắc, ít rủi ro. / Sau e4 Trắng có trung tâm mạnh và thế tấn công.

**Điểm yếu:** Đen có thể phản công kịp thời bằng ...c5 và ...Nc6. / Trắng khó giành ưu thế nếu Đen đổi quân đúng lúc.

**Kế hoạch Trắng:** Nhập thành, c3, Nbd2, Re1 rồi e4; nếu Đen đổi tốt thì dùng Tượng d3 tấn công cánh vua.

**Kế hoạch Đen:** Phá bộ khung bằng ...c5, ...Nc6, ...Bd6, rồi đổi tốt ở c5 và e4 để mở thế cờ.

**Lời khuyên:** Chỉ đẩy e4 khi Đen không thể đáp lại bằng nước phá trung tâm có lợi.

### Colle-Zukertort (b3)

- [ ] Đã duyệt  · nước đi: `d4 d5 Nf3 Nf6 e3 e6 Bd3 c5 b3 Nc6 O-O Bd6 Bb2 O-O Nbd2 Qe7 Ne5` · tên Lichess: Rubinstein Opening: Bogoljubow Defense · máy chấm +11 centipawn (Trắng dương)

**Ý tưởng:** Trắng đặt Tượng c1 ra b2 (fianchetto) thay vì chơi c3, nhắm vào đường chéo dài tới h8. Mã d2 và Mã e5 phối hợp với Tượng d3, tạo áp lực lên cánh vua Đen.

**Điểm mạnh:** Hai Tượng của Trắng nhìn về cánh vua Đen. / Mã e5 chiếm ô trung tâm mạnh.

**Điểm yếu:** Đen có thể cân bằng bằng ...c5 và ...Nc6. / Trắng khó giành ưu thế rõ ràng.

**Kế hoạch Trắng:** Nhập thành, b3, Bb2, Nbd2; đưa Mã vào e5 rồi tấn công cánh vua bằng f4 hoặc Hậu.

**Kế hoạch Đen:** Phản công bằng ...c5, ...Nc6, đổi Mã e5 và giữ cấu trúc chắc.

**Lời khuyên:** Mã ở e5 mạnh nhất khi nó được tốt d4 bảo vệ và không dễ bị đuổi.

### Đen đáp ...Bf5

- [ ] Đã duyệt  · nước đi: `d4 d5 Nf3 Nf6 e3 Bf5 Bd3 Bxd3 Qxd3 e6 O-O Bd6 c4 c6 Nc3 Nbd7` · tên Lichess: Queen's Pawn Game: Colle System, Anti-Colle · máy chấm +21 centipawn (Trắng dương)

**Ý tưởng:** Đen đưa Tượng c8 ra f5 sớm. Trắng đề nghị đổi Tượng bằng Bd3; sau khi đổi, Trắng có thế cờ vững và chuyển sang c4 để chiếm trung tâm kiểu Gambit Hậu.

**Điểm mạnh:** Trắng đổi Tượng ô trắng đơn giản và vững. / Thế cờ giống Gambit Hậu từ Slav, dễ chơi.

**Điểm yếu:** Ít cơ hội tấn công sau khi đổi Tượng. / Đen có thế cờ thoải mái nếu không mắc lỗi.

**Kế hoạch Trắng:** Đổi Tượng, nhập thành rồi c4 và Nc3 để chiếm trung tâm.

**Kế hoạch Đen:** Đổi Tượng, đưa Tượng f8 ra d6, rồi ...c6 và ...Nbd7 xây thế vững.

**Lời khuyên:** Nếu Đen đưa Tượng ra f5 sớm, hãy đổi nó đi: Tượng đó thường là quân phòng thủ tốt nhất của Đen.

---

## Hệ thống London (London System)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO D00-D02 · 4 biến thể · 8 puzzle

**Câu giới thiệu:** Một trong những hệ thống dễ học nhất cho Trắng: cùng một bộ nước đi dùng được gần như chống mọi cách đáp của Đen.

**Ý tưởng:**
- Trắng đưa Tượng c1 ra f4 ngay từ đầu, TRƯỚC khi đẩy tốt e3 (vì tốt e3 sẽ nhốt Tượng này). Sau đó Trắng dựng một "bộ khung" quen thuộc: e3, Nf3, Bd3, c3, Nbd2, O-O.
- Vì bộ khung gần như giống nhau với mọi cách đáp của Đen, người học nhớ ít nước đi mà vẫn có thế cờ chắc chắn. Đổi lại, hệ thống này ít tham vọng giành lợi thế lớn.

**Điểm mạnh:**
- Bộ khung nước đi quen thuộc, ít phải học thuộc lý thuyết.
- Thế cờ chắc chắn, ít bị tấn công bất ngờ.
- Tượng f4 hoạt động tốt trên đường chéo c1-h7 và nhắm vào ô yếu c7.

**Điểm yếu:**
- Ít tham vọng: Đen dễ cân bằng thế cờ nếu biết cách.
- Nếu chơi quá máy móc mà không nhìn nước đi của Đen thì dễ bị phản công (ví dụ ...Qb6 đánh vào b2).
- Thế cờ khá dễ đoán nên đối thủ chuẩn bị kỹ sẽ biết cách đối phó.

### Đen đáp ...c5 (cách phổ biến)

- [ ] Đã duyệt  · nước đi: `d4 d5 Bf4 Nf6 e3 c5 c3 Nc6 Nd2 e6 Ngf3 Bd6 Bg3 O-O Bd3` · tên Lichess: Queen's Pawn Game: London System · máy chấm +20 centipawn (Trắng dương)

**Ý tưởng:** Đen đánh vào d4 bằng ...c5. Trắng củng cố bằng c3 và e3, phát triển Mã ra d2 và f3, rồi chọn có đổi Tượng hay rút về g3.

**Điểm mạnh:** Bộ khung của Trắng vững chắc: e3, c3, Nbd2, Ngf3. / Tượng f4 có ô lùi an toàn g3.

**Điểm yếu:** Đen có thể áp lực d4 hoặc b2 (...Qb6) nếu Trắng quên đề phòng. / Trắng ít có đòn tấn công rõ ràng ở khai cuộc.

**Kế hoạch Trắng:** Hoàn thiện bộ khung (Bd3, O-O), rồi đẩy e4 hoặc tấn công cánh vua bằng h4 hoặc Ne5.

**Kế hoạch Đen:** Gây áp lực lên d4 bằng ...Nc6, ...Qb6 và ...cxd4; đổi Tượng d6 để làm mất đi quân mạnh của Trắng.

**Lời khuyên:** Khi Đen đi ...Qb6, hãy bảo vệ tốt b2 (Qb3 hoặc Qc1) thay vì bỏ qua.

### Đen đáp ...e6 và ...Bd6

- [ ] Đã duyệt  · nước đi: `d4 d5 Bf4 Nf6 e3 e6 Nf3 Bd6 Bg3 O-O Nbd2 c5 c3 Nc6 Bd3` · tên Lichess: Queen's Pawn Game: Accelerated London System · máy chấm +20 centipawn (Trắng dương)

**Ý tưởng:** Đen chơi thế cờ vững: ...e6, ...Bd6 để đổi Tượng ô đen của Trắng. Đổi Tượng khiến London mất đi quân đặc trưng, nên Trắng thường rút Tượng về g3.

**Điểm mạnh:** Trắng có kế hoạch rõ ràng và an toàn. / Bộ khung dễ nhớ.

**Điểm yếu:** Đen cân bằng thế cờ dễ dàng. / Trắng khó có lợi thế lớn.

**Kế hoạch Trắng:** Giữ Tượng bằng Bg3, hoàn thiện bộ khung, rồi chơi c4 hoặc Ne5 để có cơ hội tấn công.

**Kế hoạch Đen:** Đổi Tượng ô đen, phát triển Mã f6-e4 hoặc đẩy c5 để phản công.

**Lời khuyên:** Giữ Tượng f4 bằng Bg3 thay vì cho đổi: nó là quân đặc trưng của hệ thống.

### Đen đáp ...g6 (thế Ấn Độ Vua)

- [ ] Đã duyệt  · nước đi: `d4 d5 Bf4 Nf6 e3 g6 Nf3 Bg7 h3 O-O Be2 c5 c3 Nc6 Nbd2` · tên Lichess: Queen's Pawn Game: Accelerated London System · máy chấm +19 centipawn (Trắng dương)

**Ý tưởng:** Đen fianchetto Tượng f8 ra g7 để nhắm vào trung tâm Trắng. Trắng giữ bộ khung nhưng nên thêm h3 để Tượng f4 có ô lùi và tránh bị Mã Đen quấy rối.

**Điểm mạnh:** Trắng có thể tấn công Vua Đen bằng h4-h5 nếu Đen nhập thành sớm. / Bộ khung London vẫn hoạt động tốt.

**Điểm yếu:** Tượng g7 của Đen khá mạnh trên đường chéo dài. / Đen có thể phản công ở trung tâm bằng ...c5 và ...Nc6.

**Kế hoạch Trắng:** Hoàn thiện bộ khung và thêm h3 để Tượng f4 có ô lùi; có thể thử h4-h5 để tấn công.

**Kế hoạch Đen:** Dùng Tượng g7 và tốt c5 phản công trung tâm; cân nhắc ...Nh5 để đổi Tượng f4.

**Lời khuyên:** Khi Đen chơi ...g6, đừng quên h3: nó vừa giữ ô lùi vừa chuẩn bị tấn công.

### Đen đáp ...Bf5 (đối xứng)

- [ ] Đã duyệt  · nước đi: `d4 d5 Bf4 Bf5 e3 e6 Nf3 Nf6 Bd3 Bxd3 Qxd3 Bd6 Bxd6 Qxd6 Nbd2` · tên Lichess: Queen's Pawn Game: Accelerated London System · máy chấm +10 centipawn (Trắng dương)

**Ý tưởng:** Đen bắt chước Trắng bằng cách đưa Tượng c8 ra f5. Hai bên có thế cờ đối xứng và dễ đổi Tượng, dẫn tới thế cờ cân bằng.

**Điểm mạnh:** Thế cờ đơn giản, dễ chơi. / Trắng có thể đổi Tượng để giảm rủi ro.

**Điểm yếu:** Thế cờ đối xứng nên dễ hòa. / Trắng khó tạo lợi thế.

**Kế hoạch Trắng:** Đổi Tượng ô trắng (Bd3) hoặc giữ chúng để tạo áp lực; cuối cùng nhắm tới cánh Hậu hoặc đẩy e4.

**Kế hoạch Đen:** Đổi Tượng ô trắng, củng cố trung tâm và đưa Mã vào cuộc.

**Lời khuyên:** Khi hai bên đối xứng, hãy tìm cách phá thế đối xứng sớm bằng nước đi có kế hoạch.

---

## Khai cuộc Bốn Mã (Four Knights Game)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C46-C49 · 3 biến thể · 8 puzzle

**Câu giới thiệu:** Cả hai bên phát triển cả hai Mã trước: thế cờ cân đối, dễ học, rất tốt để hiểu nguyên tắc khai cuộc.

**Ý tưởng:**
- Mỗi bên đưa cả hai Mã ra ngoài (f3, c3 cho Trắng; c6, f6 cho Đen) trước khi làm gì khác. Đây là cách phát triển tự nhiên theo đúng nguyên tắc: Mã ra trước, Tượng ra sau, rồi nhập thành. Thế cờ đối xứng và ít đòn chiến thuật sớm, nên được xem là khai cuộc an toàn.
- Từ vị trí này Trắng có ba hướng chính: Tây Ban Nha (Bb5) để ghim Mã c6, Scotland (d4) để mở trung tâm, và các nhánh yên tĩnh khác. Người mới học nên bắt đầu từ đây để hiểu cách phát triển quân hợp lý.

**Điểm mạnh:**
- Dễ học: các nước đi đều tự nhiên theo nguyên tắc khai cuộc.
- Thế cờ ít rủi ro, thích hợp cho người mới.
- Có thể chuyển sang nhiều thế cờ khác (Tây Ban Nha, Scotland) tùy tình huống.

**Điểm yếu:**
- Thế cờ hay dẫn đến hòa nếu Đen chơi chính xác.
- Ít cơ hội tấn công mạnh, đối thủ giỏi dễ cân bằng.
- Nếu Trắng chơi quá thụ động, Đen có thể chiếm thế chủ động.

### Tây Ban Nha (Bb5)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Bb4 O-O O-O d3 d6 Bg5 Bxc3 bxc3 Qe7 Re1 Nd8 d4 Ne6` · tên Lichess: Four Knights Game: Spanish Variation, Symmetrical Variation, Metger Unpin · máy chấm +40 centipawn (Trắng dương)

**Ý tưởng:** Trắng ghim Mã c6 bằng Tượng b5, Đen đáp lại bằng cách ghim Mã c3 bằng Tượng b4. Hai bên đều nhập thành rồi đổi Tượng lấy Mã; thế cờ rất cân bằng và hay dẫn đến hòa.

**Điểm mạnh:** Cả hai bên đều phát triển hợp lý, ít rủi ro. / Trắng có thể gây áp lực lên cánh vua bằng Bg5.

**Điểm yếu:** Rất nhiều biến thể dẫn đến hòa. / Trắng khó giành ưu thế rõ ràng.

**Kế hoạch Trắng:** Nhập thành, đẩy d3, ghim Mã f6 bằng Bg5 và chuẩn bị d4 để chiếm trung tâm.

**Kế hoạch Đen:** Đối xứng: nhập thành, ...d6, đổi Tượng lấy Mã, rồi dựng thế cờ chắc.

**Lời khuyên:** Khi đối thủ ghim quân của bạn, hãy tìm cách ghim lại quân tương ứng.

### Scotland (d4)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Nc3 Nf6 d4 exd4 Nxd4 Bb4 Nxc6 bxc6 Bd3 d5 exd5 cxd5 O-O O-O Bg5 c6` · tên Lichess: Four Knights Game: Scotch Variation Accepted · máy chấm +9 centipawn (Trắng dương)

**Ý tưởng:** Trắng mở trung tâm bằng d4. Sau khi đổi tốt, Đen ghim Mã c3 bằng Bb4. Trắng đổi Mã d4 lấy Mã c6, tạo cấu trúc tốt đôi cho Đen. Thế cờ cân bằng nhưng Trắng có Tượng d3 mạnh.

**Điểm mạnh:** Trắng mở thế cờ, phát triển tự nhiên. / Đen có tốt đôi c ở cánh Hậu.

**Điểm yếu:** Đen có cặp Tượng và thế cờ vững. / Trắng khó duy trì ưu thế nếu Đen đổi quân chính xác.

**Kế hoạch Trắng:** Nhập thành, dùng Tượng g5 ghim Mã f6, đổi quân và khai thác tốt đôi của Đen.

**Kế hoạch Đen:** Phá trung tâm bằng ...d5, đổi quân để giảm áp lực và dùng cặp Tượng.

**Lời khuyên:** Tốt đôi chỉ yếu khi thế cờ đóng; Đen thường bù lại bằng hoạt động quân.

### Phản công Rubinstein (4...Nd4)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Nc3 Nf6 Bb5 Nd4 Nxd4 exd4 e5 dxc3 exf6 Qxf6 dxc3 Qe5+` · tên Lichess: Four Knights Game: Spanish Variation, Rubinstein Variation Accepted · máy chấm +16 centipawn (Trắng dương)

**Ý tưởng:** Đen không ghim lại mà phản công ngay bằng Mã d4. Trắng có thể ăn Mã d4 và đẩy e5 để thu lại Hậu. Thế cờ sắc bén và cần tính chính xác: cả hai bên đều có đòn tấn công.

**Điểm mạnh:** Trắng có thể ép đổi quân với thế cờ vững. / Đòn e5 buộc Đen phải xử lý chính xác.

**Điểm yếu:** Thế cờ phức tạp, dễ nhầm. / Đen có thể bù lại tốt thua bằng hoạt động quân.

**Kế hoạch Trắng:** Đổi quân, nhập thành, phát triển Tượng và dùng cặp Tượng.

**Kế hoạch Đen:** Phản công vào cột e và chiếm trung tâm bằng Hậu e5.

**Lời khuyên:** Khi đối phương hiến quân, hãy kiểm tra xem bạn có thể từ chối mà vẫn an toàn không.

---

## Khai cuộc Scotland (Scotch Game)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C44-C45 · 4 biến thể · 12 puzzle

**Câu giới thiệu:** Mở trung tâm ngay: Trắng đẩy d4 để quân phát triển nhanh và thế cờ mở, dễ hiểu.

**Ý tưởng:**
- Thay vì chờ đợi như Khai cuộc Ý hay Tây Ban Nha, Trắng đẩy d4 ngay ở nước thứ ba. Nếu Đen ăn d4, Trắng ăn lại bằng Mã, quân này đứng giữa bàn cờ rất mạnh.
- Thế cờ trở nên mở, quân di chuyển tự do, rất hợp để học nguyên lý: phát triển quân, chiếm trung tâm, nhập thành.

**Điểm mạnh:**
- Trung tâm mở nhanh nên quân Trắng hoạt động tích cực.
- Ít lý thuyết hơn Ruy Lopez, dễ nắm kế hoạch chính.
- Mã d4 ở giữa bàn cờ rất mạnh, nhắm vào nhiều ô quan trọng.

**Điểm yếu:**
- Trắng giải tỏa căng thẳng trung tâm sớm, Đen dễ cân bằng thế cờ.
- Sau các nước đổi quân, thế cờ có thể trở nên đơn giản và ít cơ hội thắng.
- Đen có nhiều đường chơi tốt (Bc5, Nf6) nên Trắng phải học nhiều hướng.

### Biến thể Cổ điển (…Bc5)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Bc5 Be3 Qf6 c3 Nge7 Bc4 O-O O-O Bb6` · tên Lichess: Scotch Game: Classical Variation · máy chấm +32 centipawn (Trắng dương)

**Ý tưởng:** Đen đưa Tượng ra c5 để đánh vào Mã d4. Trắng củng cố bằng Be3 và c3, giữ Mã d4 ở trung tâm. Đây là cách chơi cổ điển và vững chắc.

**Điểm mạnh:** Thế cờ chắc, Trắng phát triển quân tự nhiên. / Mã d4 mạnh ở trung tâm nếu được củng cố.

**Điểm yếu:** Đen có phản công bằng ...Qf6 đánh vào Mã d4 và tốt b2. / Trắng phải chính xác để không mất tempo.

**Kế hoạch Trắng:** Củng cố Mã d4 bằng c3 và Be3, phát triển Tượng c4, nhập thành rồi tìm cơ hội tấn công trung tâm.

**Kế hoạch Đen:** Đánh vào Mã d4 bằng ...Qf6 và ...Bc5; đưa Mã e7 vào cuộc và nhập thành.

**Lời khuyên:** Mã d4 mạnh nhưng dễ bị tấn công; luôn đếm số quân bảo vệ nó.

### Biến thể Mieses (…Nf6)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nxc6 bxc6 e5 Qe7 Qe2 Nd5 c4 Ba6` · tên Lichess: Scotch Game: Mieses Variation · máy chấm +11 centipawn (Trắng dương)

**Ý tưởng:** Đen phản công bằng Mã f6. Trắng đổi Mã d4 lấy Mã c6, rồi đẩy e5 đuổi Mã f6 và dành được không gian. Thế cờ động và có nhiều cơ hội cho cả hai bên.

**Điểm mạnh:** Trắng có không gian và tốt e5 mạnh. / Đen có cặp Tượng, thế cờ năng động.

**Điểm yếu:** Đen có tốt chồng c6 và mất tốt ở trung tâm. / Trắng cần tính chính xác vì thế cờ sắc bén.

**Kế hoạch Trắng:** Dùng không gian và tốt e5 để tấn công cánh vua; cẩn thận với Tượng a6 của Đen.

**Kế hoạch Đen:** Dùng cặp Tượng và phản công cánh Hậu; Tượng a6 ngăn Trắng nhập thành.

**Lời khuyên:** Khi Tượng a6 của Đen nhìn thẳng vào cánh vua, hãy chú ý khả năng nhập thành của mình.

### Biến thể Bốn Mã Scotland

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 d4 exd4 Nxd4 Nf6 Nc3 Bb4 Nxc6 bxc6 Bd3 d5 exd5 cxd5 O-O O-O` · tên Lichess: Scotch Game: Schmidt Variation · máy chấm +10 centipawn (Trắng dương)

**Ý tưởng:** Trắng và Đen đều phát triển hai Mã. Sau khi đổi Mã d4 lấy Mã c6, Trắng có Tượng d3 mạnh và cấu trúc tốt vững. Thế cờ cân bằng và thiên về chiến lược.

**Điểm mạnh:** Phát triển quân tự nhiên, Tượng d3 mạnh. / Dễ học, thế cờ ít rủi ro.

**Điểm yếu:** Thế cờ khá đối xứng, dễ hòa. / Trắng ít có đòn tấn công trực tiếp.

**Kế hoạch Trắng:** Nhập thành, đẩy f4 hoặc Qf3 để tấn công cánh vua; hoặc đổi quân và chơi thế cờ chắc.

**Kế hoạch Đen:** Đẩy d5 giải phóng thế cờ và tìm cách đổi bớt quân.

**Lời khuyên:** Khi hai bên có cấu trúc chắc, hãy tìm kế hoạch dài hạn thay vì đòn nhanh.

### Gambit Scotland

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 d4 exd4 Bc4 Nf6 e5 d5 Bb5 Ne4 Nxd4 Bd7 Bxc6 bxc6 O-O Be7` · tên Lichess: Italian Game: Scotch Gambit, Max Lange Attack · máy chấm +21 centipawn (Trắng dương)

**Ý tưởng:** Thay vì ăn lại d4 ngay, Trắng phát triển Tượng ra c4 và để Đen giữ tốt thừa. Đổi lại Trắng dẫn trước về phát triển và có tấn công mạnh vào f7.

**Điểm mạnh:** Trắng phát triển nhanh, có cơ hội tấn công f7. / Thế cờ sắc bén và dạy cách sử dụng lợi thế phát triển.

**Điểm yếu:** Trắng mất tốt tạm thời, nếu Đen phòng thủ đúng thì Trắng phải trả lại thế cờ. / Đòi hỏi biết lý thuyết nhiều hơn.

**Kế hoạch Trắng:** Lấy lại tốt d4, giữ tốt e5 của Đen và dùng Tượng c4 cùng Mã tấn công f7.

**Kế hoạch Đen:** Phát triển Mã f6, đẩy d5 khóa Tượng c4 và dùng tốt e5 thừa để chuyển sang phản công.

**Lời khuyên:** Gambit: hỏi bản thân "tốt thừa của đối phương đổi lấy gì cho mình?".

---

## Khai cuộc Tượng (Bishop's Opening)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C23-C24 · 2 biến thể · 7 puzzle

**Câu giới thiệu:** Đưa Tượng ra c4 ngay nước thứ hai, nhắm vào f7 và giữ cho mình nhiều lựa chọn: Ý, Vienna hay mở trung tâm.

**Ý tưởng:**
- Trắng phát triển Tượng f1 ra c4 trước cả Mã. Từ c4 Tượng nhắm thẳng vào ô f7, điểm yếu nhất của Đen ở khai cuộc, và vẫn để ngỏ lựa chọn Mã nào ra, tốt nào đẩy. Khai cuộc này dễ dẫn đến các thế cờ quen thuộc của Khai cuộc Ý hoặc Vienna.
- Ưu điểm lớn là sự linh hoạt và tránh được vài biến thể sắc bén mà Đen đã chuẩn bị (ví dụ Phòng thủ Berlin). Đổi lại, Đen có thể chiếm trung tâm bằng ...Nf6 và ...d5 sớm, nên Trắng phải biết cách đáp lại bằng d3 hoặc d4.

**Điểm mạnh:**
- Linh hoạt: chuyển được sang Ý, Vienna, Gambit Tượng.
- Tượng c4 nhắm vào f7 ngay từ đầu.
- Đối thủ thường chuẩn bị ít chống lại khai cuộc này.

**Điểm yếu:**
- Đen có thể chiếm trung tâm sớm bằng ...Nf6, ...d5.
- Tượng c4 có thể bị ...Na5 hoặc ...d5 đuổi nếu Trắng chơi chậm.
- Máy tính cho rằng Trắng chỉ có ưu thế rất nhỏ.

### Hệ thống yên tĩnh (d3 + c6)

- [ ] Đã duyệt  · nước đi: `e4 e5 Bc4 Nf6 d3 c6 Nf3 d5 Bb3 Bd6 Nc3 O-O` · tên Lichess: Bishop's Opening: Paulsen Defense · máy chấm +6 centipawn (Trắng dương)

**Ý tưởng:** Đen chơi chắc với ...Nf6, ...c6 và ...d5. Trắng đáp bằng d3, Nf3 và đưa Tượng về b3 khi cần; thế cờ yên tĩnh, trung tâm đóng nhiều hơn.

**Điểm mạnh:** Trắng chơi chắc chắn, ít rủi ro. / Tượng b3 giữ đường chéo a2-g8 an toàn.

**Điểm yếu:** Trắng không tạo ưu thế rõ rệt. / Đen có trung tâm tốt với c6, d5 và e5.

**Kế hoạch Trắng:** Nhập thành, Nbd2/Nc3, rồi chuẩn bị mở trung tâm bằng exd5 hoặc f4.

**Kế hoạch Đen:** Dựng trung tâm c6-d5-e5, phát triển Bd6, nhập thành và đẩy ...d4 khi thuận lợi.

**Lời khuyên:** Khi Tượng c4 bị đuổi bằng ...d5, hãy rút về b3 thay vì đổi quân.

### Mở trung tâm (d4)

- [ ] Đã duyệt  · nước đi: `e4 e5 Bc4 Nf6 d4 exd4 Nf3 Nc6 O-O Nxe4 Re1 d5 Bxd5 Qxd5 Nc3 Qa5` · tên Lichess: Italian Game: Scotch Gambit, Anderssen Attack · máy chấm +11 centipawn (Trắng dương)

**Ý tưởng:** Trắng mở thế bằng d4 sau khi Đen ra Mã f6. Đen đổi tốt rồi ăn tốt e4; Trắng lấy lại bằng đòn Re1 và Nc3, tạo thế cờ sắc bén với nhiều bẫy.

**Điểm mạnh:** Trắng có Xe e1 gây áp lực lên cột e. / Đen có nhiều cơ hội mắc lỗi nếu không quen.

**Điểm yếu:** Đen có thể phòng thủ chính xác và giữ tốt thừa. / Máy tính đánh giá thế cờ gần cân bằng.

**Kế hoạch Trắng:** Tấn công Mã e4 và cột e, phát triển Nc3 và đổi quân để lấy lại tốt.

**Kế hoạch Đen:** Giữ Mã e4 vững bằng ...d5, phát triển quân và đổi quân để giảm áp lực.

**Lời khuyên:** Khi hiến tốt để mở cột, hãy chắc chắn Xe của bạn lên cột đó ngay.

---

## Khai cuộc Ý (Italian Game)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C50-C54 · 4 biến thể · 16 puzzle

**Câu giới thiệu:** Phát triển quân tự nhiên, nhắm thẳng vào điểm yếu f7. Rất hợp để học nguyên lý khai cuộc.

**Ý tưởng:**
- Trắng đưa Tượng ra c4 trên đường chéo a2-g8, nhắm vào tốt f7. Đó là ô yếu nhất của Đen ở những nước đầu, vì chỉ có Vua bảo vệ nó.
- Đây là một trong những khai cuộc lâu đời nhất. Nó dạy đúng ba nguyên lý: chiếm trung tâm, phát triển quân nhẹ nhanh, nhập thành sớm.

**Điểm mạnh:**
- Quân phát triển tự nhiên, dễ nhớ vì mỗi nước đều có mục đích rõ ràng.
- Tượng c4 nhắm thẳng vào f7 nên Đen phải luôn để ý các đòn tấn công vào ô này.
- Có nhiều hướng chơi: chậm và chắc (Pianissimo) hoặc sắc bén (Evans, Fried Liver).

**Điểm yếu:**
- Đen có nhiều cách đáp tốt, và khi Đen chơi chính xác thì Trắng chỉ giữ được lợi thế rất nhỏ.
- Tượng c4 có thể bị Đen đuổi bằng ...d5 hoặc ...Na5, mất thời gian.
- Các biến thể sắc bén đòi hỏi nhớ nước đi chính xác, đi sai là mất quân.

### Giuoco Pianissimo (chơi chậm và chắc)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bc4 Bc5 c3 Nf6 d3 d6 O-O O-O` · tên Lichess: Italian Game: Classical Variation, Giuoco Pianissimo · máy chấm +18 centipawn (Trắng dương)

**Ý tưởng:** Hai bên đưa Tượng ra đường chéo tốt nhất rồi củng cố trung tâm chậm rãi bằng c3 và d3. Đây là cách chơi phổ biến nhất của Khai cuộc Ý ở mọi trình độ.

**Điểm mạnh:** Thế cờ chắc chắn, ít rủi ro. / Dễ học: cả kế hoạch lẫn thế tốt đều rõ ràng.

**Điểm yếu:** Tiến triển chậm; lợi thế của Trắng rất nhỏ. / Nếu không có kế hoạch, thế cờ dễ rơi vào hòa hoãn.

**Kế hoạch Trắng:** Đưa Mã b1 vòng d2-f1-g3, chơi Re1 và a4, rồi chuẩn bị đẩy d4 để mở trung tâm đúng lúc.

**Kế hoạch Đen:** Giữ Tượng c5 bằng ...a6 và ...Ba7, phát triển Mã d7-b6 hoặc Mã f6-e7, chuẩn bị đẩy ...d5 khi thuận lợi.

**Lời khuyên:** Pianissimo nghĩa là "rất nhẹ nhàng": đừng vội đẩy d4 khi quân chưa sẵn sàng.

### Gambit Evans

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bc4 Bc5 b4 Bxb4 c3 Ba5 d4 exd4 O-O d6 cxd4 Bb6` · tên Lichess: Italian Game: Evans Gambit, McDonnell Defense, Main Line · máy chấm +16 centipawn (Trắng dương)

**Ý tưởng:** Trắng hy sinh tốt b4 để mở đường cho tốt c3 và d4, giành trung tâm rộng và phát triển quân nhanh. Đây là gambit (hy sinh tốt đổi lấy thế cờ tốt) nổi tiếng từ thế kỷ 19.

**Điểm mạnh:** Trắng có trung tâm rộng với hai tốt e4 và d4. / Quân phát triển nhanh, có đòn tấn công vào Vua Đen nếu Đen đi chậm.

**Điểm yếu:** Trắng thiếu một tốt; nếu tấn công không đủ mạnh thì thế cờ sẽ khó. / Phải nhớ chính xác các nước đầu, đi lệch là mất lợi thế.

**Kế hoạch Trắng:** Dùng trung tâm d4-e4, phát triển nhanh, đẩy d5 hoặc tấn công vào cánh vua của Đen.

**Kế hoạch Đen:** Nhận tốt rồi trả lại khi cần để hóa giải đòn tấn công, phát triển quân an toàn và đổi bớt quân.

**Lời khuyên:** Gambit là đổi tốt lấy thời gian: dùng thời gian đó để phát triển quân.

### Phòng thủ Hai Mã: Ng5 và d5

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Na5 Bb5+ c6 dxc6 bxc6 Be2 h6 Nf3 e4 Ne5 Bd6` · tên Lichess: Italian Game: Two Knights Defense, Polerio Defense, Suhle Defense · máy chấm +6 centipawn (Trắng dương)

**Ý tưởng:** Đen đáp bằng Mã f6 thay vì Tượng, đòi phản công ngay. Trắng đáp Ng5 để đánh vào f7 hai quân, Đen đẩy d5 để chặn đường chéo của Tượng c4.

**Điểm mạnh:** Trắng có đòn tấn công mạnh vào f7 ngay lập tức. / Đen phải biết nước đi chính xác, đáp sai sẽ thua nhanh.

**Điểm yếu:** Đen có thể đáp chính xác bằng ...Na5, hoàn trả tốt và có thế cờ ổn. / Trắng đã đi Mã một quân hai lần, chưa phát triển thêm quân nhẹ.

**Kế hoạch Trắng:** Sau khi Đen chuẩn bị chống đỡ, Trắng dùng tốt hơn về phát triển để tìm cách đổi lại tốt bị mất.

**Kế hoạch Đen:** Đẩy Mã b8-c6 sang a5 để đuổi Tượng c4, hoàn trả tốt rồi tận dụng cặp Tượng và nhà tốt không bị phá hỏng.

**Lời khuyên:** Ở thế cờ này, nước ...Nxd5? là cái bẫy. Phải đi ...Na5 mới đúng.

### Tấn công Gan Chiên (Fried Liver)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bc4 Nf6 Ng5 d5 exd5 Nxd5 Nxf7 Kxf7 Qf3+ Ke6 Nc3 Nb4` · tên Lichess: Italian Game: Two Knights Defense, Fried Liver Attack · máy chấm +65 centipawn (Trắng dương)

**Ý tưởng:** Khi Đen ăn lại bằng Mã (…Nxd5), Trắng hy sinh Mã ở f7 để lôi Vua Đen ra giữa bàn cờ. Vua bị kéo ra trung tâm thường rất khó thoát khỏi đòn tấn công.

**Điểm mạnh:** Rất sắc bén: Vua Đen bị lôi ra giữa bàn và Trắng có đòn chiếu liên tục. / Cực kỳ nguy hiểm với người không biết cách phòng thủ.

**Điểm yếu:** Trắng phải hy sinh quân thật sự; nếu Đen phòng thủ đúng thì Trắng chỉ còn ưu thế nhỏ hoặc có thể bị thiệt. / Nếu Đen biết đáp ...Na5 (thay vì ...Nxd5) thì Trắng không có được cơ hội này.

**Kế hoạch Trắng:** Giữ Vua Đen ngoài trung tâm, đưa quân vào cuộc nhanh (Mã c3, Hậu e4) và chiếu liên tục để Đen không kịp tổ chức.

**Kế hoạch Đen:** Đưa Vua về lại chỗ an toàn (Ke6 rồi Nb4 và c6), dùng quân thừa để phản đòn, hy vọng đổi bớt quân.

**Lời khuyên:** Chỉ chơi Fried Liver khi bạn thuộc các nước tiếp theo; nếu không, hãy chọn Pianissimo.

---

## Phòng thủ Petrov (Petrov's Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C42-C43 · 3 biến thể · 9 puzzle

**Câu giới thiệu:** Phản công thay vì phòng thủ: Đen đánh ngược vào tốt e4 của Trắng. Thế cờ chắc, hòa hợp với mọi trình độ.

**Ý tưởng:**
- Thay vì bảo vệ tốt e5 (như ...Nc6), Đen đi Mã f6 để đánh ngược vào tốt e4 của Trắng. Hai bên cùng bị đe dọa nên thế cờ đối xứng và cân bằng.
- Điều quan trọng cần nhớ: sau 3.Nxe5, Đen KHÔNG được ăn ngay tốt e4 (bị Qe2 phạt). Đen phải đẩy 3...d6 đuổi Mã trước rồi mới ăn.

**Điểm mạnh:**
- Thế cờ đối xứng, chắc chắn, ít rủi ro.
- Dễ nắm kế hoạch: đuổi Mã e5, ăn tốt e4, đẩy d5.
- Trắng khó tạo lợi thế lớn nếu Đen chơi chính xác.

**Điểm yếu:**
- Đen phải nhớ chính xác thứ tự nước (d6 trước, Nxe4 sau), nếu sai sẽ mất quân.
- Thế cờ có thể rất cân bằng nên khó tạo cơ hội thắng cho Đen.
- Nhiều ván kết thúc hòa nếu cả hai bên chơi đúng lý thuyết.

### Biến thể Cổ điển (3.Nxe5)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nf6 Nxe5 d6 Nf3 Nxe4 d4 d5 Bd3 Nc6 O-O Be7` · tên Lichess: Petrov's Defense: Classical Attack, Mason-Showalter Variation · máy chấm +42 centipawn (Trắng dương)

**Ý tưởng:** Trắng ăn tốt e5 bằng Mã. Đen phải đuổi Mã bằng ...d6 trước rồi mới ăn tốt e4. Sau đó Đen đẩy d5 lập thế cờ vững chắc.

**Điểm mạnh:** Thế cờ cân bằng, Đen có quân phát triển tốt. / Kế hoạch dễ nhớ: d6, Nxe4, d5.

**Điểm yếu:** Nếu Đen ăn e4 trước khi đi d6, Trắng đánh Qe2 và Đen gặp nguy hiểm. / Thế cờ ít chỗ cho tấn công, dễ hòa.

**Kế hoạch Trắng:** Chiếm trung tâm bằng d4, đổi Mã e4 hoặc tấn công bằng Qe2 khi có cơ hội; nhập thành sớm.

**Kế hoạch Đen:** Giữ Mã e4 vững bằng d5, phát triển Tượng d6 hoặc e7, nhập thành và đổi bớt quân.

**Lời khuyên:** Cái bẫy kinh điển: sau 3.Nxe5 Nxe4 4.Qe2, nước lùi Mã 4...Nf6?? thua Hậu vì 5.Nc6+. Đúng thứ tự là 3...d6 trước.

### Tấn công Steinitz (3.d4)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nf6 d4 Nxe4 Bd3 d5 Nxe5 Nd7 Nxd7 Bxd7 O-O Bd6` · tên Lichess: Petrov's Defense: Modern Attack, Center Variation · máy chấm +35 centipawn (Trắng dương)

**Ý tưởng:** Trắng mở trung tâm ngay bằng d4, thay vì ăn e5. Sau khi Đen ăn e4, Trắng đẩy Tượng ra d3 rồi lấy lại tốt e5 bằng Mã.

**Điểm mạnh:** Trắng có quân hoạt động nhanh. / Thế cờ đơn giản, ít rủi ro cho Trắng.

**Điểm yếu:** Đen có thế cờ vững sau khi đẩy d5 và đổi quân. / Trắng dễ rơi vào thế cờ cân bằng.

**Kế hoạch Trắng:** Lấy lại tốt e5, đổi Mã rồi nhập thành và tìm cách tấn công cánh vua.

**Kế hoạch Đen:** Giữ trung tâm vững bằng d5, đổi quân bằng Nd7 và đưa Tượng ra d6 để đánh vào cánh vua Trắng.

**Lời khuyên:** Khi Trắng đổi Mã e5, hãy đổi lại để giảm áp lực chứ đừng sợ mất tốt.

### Biến thể Bốn Mã

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nf6 Nc3 Nc6 Bb5 Bb4 O-O O-O d3 d6 Bg5 Bxc3 bxc3 Qe7` · tên Lichess: Four Knights Game: Spanish Variation, Symmetrical Variation, Metger Unpin · máy chấm +28 centipawn (Trắng dương)

**Ý tưởng:** Trắng phát triển Mã b1 ra c3 thay vì tấn công e5. Đen đáp lại đối xứng bằng Mã c6. Thế cờ cân bằng và dễ học, thường dẫn tới Bb5 hoặc Bb4.

**Điểm mạnh:** Quân phát triển tự nhiên, chắc chắn. / Dễ học, thế cờ đối xứng nên ít rủi ro.

**Điểm yếu:** Dễ hòa vì thế cờ đối xứng. / Khó tạo lợi thế lớn cho cả hai bên.

**Kế hoạch Trắng:** Ghim Mã c6, nhập thành và chuẩn bị d3 rồi Bg5 để tăng áp lực.

**Kế hoạch Đen:** Phản ghim bằng ...Bb4, nhập thành rồi đổi bớt quân hoặc đẩy d6 củng cố.

**Lời khuyên:** Trong Bốn Mã, ai ghim Mã đối phương trước thì có áp lực hơn một chút.

---

## Phòng thủ Philidor (Philidor Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C41 · 3 biến thể · 8 puzzle

**Câu giới thiệu:** Giữ chắc tốt e5 bằng tốt d6: thế cờ chật nhưng vững, dễ hiểu và ít phải học thuộc.

**Ý tưởng:**
- Sau khi Trắng đánh vào tốt e5 bằng Mã f3, Đen bảo vệ tốt e5 bằng tốt d6 (thay vì Mã c6 như khai cuộc Tây Ban Nha hay Ý). Nhờ vậy chuỗi tốt d6-e5 rất chắc, và Mã b8 có thể chọn ra d7 thay vì c6.
- Đổi lại, Đen bị chật: Tượng c8 bị chắn bởi tốt d6 và e5, nên Đen phải kiên nhẫn chờ thời điểm phản công bằng ...exd4 hoặc ...c6 và ...d5. Khai cuộc này thích hợp cho người thích thế cờ chắc, ít đòn chiến thuật sớm.

**Điểm mạnh:**
- Cấu trúc tốt chắc chắn, ít bị tấn công chiến thuật sớm.
- Dễ học: nhiều biến thể có cùng bộ khung (Nf6, Nbd7, Be7, O-O, c6).
- Thích hợp để rèn kỹ năng phòng thủ và chờ cơ hội phản công.

**Điểm yếu:**
- Đen bị chật không gian, Tượng c8 khó ra.
- Máy tính đánh giá Trắng có lợi thế nhỏ nếu chơi chính xác.
- Nếu Đen không tìm được kế hoạch phản công, thế cờ có thể trở nên bị động.

### Hệ thống Hanham (Nbd7)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 d6 d4 Nf6 Nc3 Nbd7 Bc4 Be7 O-O O-O Qe2 c6 a4 Qc7` · tên Lichess: Philidor Defense: Lion Variation · máy chấm +58 centipawn (Trắng dương)

**Ý tưởng:** Đen dựng bộ khung chắc: Nf6, Nbd7, Be7, nhập thành và c6. Chuỗi tốt d6-e5 được Mã d7 hỗ trợ, và Đen chờ thời điểm phản công bằng ...exd4 hoặc ...d5.

**Điểm mạnh:** Bộ khung quen thuộc, ít phải nhớ nước đi. / Cấu trúc vững chắc, Vua an toàn sau khi nhập thành.

**Điểm yếu:** Đen khá chật và phải chờ cơ hội phản công. / Mã d7 chắn Tượng c8.

**Kế hoạch Trắng:** Nhập thành, Qe2, a4 và chuẩn bị đẩy d5 hoặc dxe5 để lấy không gian.

**Kế hoạch Đen:** Giữ tốt e5, ...c6 rồi ...Qc7 và chuẩn bị ...exd4 hoặc ...d5 khi Trắng mất nhịp.

**Lời khuyên:** Khi bị chật, hãy giữ cấu trúc chắc chắn và chờ đối phương tạo ra điểm yếu.

### Đổi tốt (3...exd4)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 d6 d4 exd4 Nxd4 Nf6 Nc3 Be7 Be2 O-O O-O Re8` · tên Lichess: Philidor Defense: Exchange Variation · máy chấm +33 centipawn (Trắng dương)

**Ý tưởng:** Đen đổi tốt ở trung tâm ngay: ...exd4. Cấu trúc trở nên mở hơn, Đen có thêm không gian và Tượng c8 mở đường, nhưng Trắng có Mã d4 rất mạnh ở trung tâm.

**Điểm mạnh:** Đen giải tỏa bớt thế chật và mở đường cho Tượng c8. / Thế cờ rõ ràng, ít phức tạp.

**Điểm yếu:** Mã d4 của Trắng ở trung tâm khá mạnh. / Đen phải cẩn thận ô e5 và d5.

**Kế hoạch Trắng:** Nhập thành, Re1 hoặc f4 để chiếm không gian, dùng Mã d4 làm điểm tựa.

**Kế hoạch Đen:** Phát triển Be7, O-O, Re8 rồi phản công bằng ...c5 hoặc ...d5.

**Lời khuyên:** Sau khi đổi tốt, hãy phản công vào Mã d4 bằng ...c5 hoặc ...Nc6 để đuổi nó khỏi trung tâm.

### Trắng chơi Bc4

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 d6 Bc4 Be7 O-O Nf6 d4 Nbd7 Nc3 O-O` · tên Lichess: Philidor Defense · máy chấm +55 centipawn (Trắng dương)

**Ý tưởng:** Trắng phát triển Tượng ra c4 và nhập thành trước khi dựng trung tâm bằng d4. Đen đáp bằng bộ khung quen thuộc Be7, Nf6, Nbd7 và nhập thành.

**Điểm mạnh:** Đen không bị tấn công bất ngờ vì Trắng chưa dựng trung tâm. / Đen có bộ khung vững chắc.

**Điểm yếu:** Tượng c4 nhắm vào f7, Đen phải chú ý. / Trắng có thể mở trung tâm bất cứ lúc nào bằng d4.

**Kế hoạch Trắng:** Nhập thành, đẩy d4 và dùng Tượng c4 nhắm vào f7.

**Kế hoạch Đen:** Bộ khung Be7, Nf6, Nbd7 rồi O-O và chờ cơ hội phản công ...exd4 hoặc ...c6.

**Lời khuyên:** Bộ khung của Philidor dùng được với hầu hết các cách chơi của Trắng.

---

## Phòng thủ Scandinavian (Scandinavian Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO B01 · 3 biến thể · 8 puzzle

**Câu giới thiệu:** Đen đánh thẳng vào tốt e4 ngay nước đầu. Đơn giản, ít lý thuyết, dễ học cho người mới.

**Ý tưởng:**
- Đen đẩy d5 để buộc Trắng quyết định ngay. Nếu Trắng ăn d5, Đen lấy lại tốt bằng Hậu (hoặc Mã f6), nên thế cờ trở nên đơn giản: không cần nhớ nhiều biến.
- Cái giá phải trả là Hậu ra sớm: Trắng đuổi Hậu bằng Mã c3 và dẫn trước một chút về phát triển. Đen đáp lại bằng cấu trúc tốt chắc chắn.

**Điểm mạnh:**
- Dễ học: bộ nước đi quen thuộc, cấu trúc tốt đơn giản.
- Không bị tấn công bất ngờ ở những nước đầu, Đen giải quyết trung tâm ngay.
- Tránh được nhiều lý thuyết dài của Sicilian hay Ruy Lopez.

**Điểm yếu:**
- Hậu ra sớm nên Trắng được đi quân tự nhiên (Nc3) với tempo (đe dọa).
- Trắng thường có lợi thế phát triển và không gian nhỏ.
- Cần cẩn thận với Hậu: đừng để Hậu bị tấn công nhiều lần liền.

### Biến thể chính (Qa5)

- [ ] Đã duyệt  · nước đi: `e4 d5 exd5 Qxd5 Nc3 Qa5 d4 Nf6 Nf3 c6 Bc4 Bf5` · tên Lichess: Scandinavian Defense: Main Line, Mieses Variation · máy chấm +66 centipawn (Trắng dương)

**Ý tưởng:** Đen ăn lại tốt bằng Hậu, khi bị Mã c3 đuổi thì rút Hậu về a5. Từ a5 Hậu vẫn nhìn vào Mã c3, và sau đó Đen dựng cấu trúc chắc với Nf6, c6, Bf5.

**Điểm mạnh:** Hậu ở a5 an toàn và vẫn có tác dụng. / Cấu trúc c6 + Nf6 + Bf5 rất chắc chắn.

**Điểm yếu:** Hậu a5 hơi bị lạc lõng khỏi cánh vua. / Trắng có nhiều không gian và phát triển quân thuận lợi.

**Kế hoạch Trắng:** Phát triển nhanh (Nf3, Bc4, nhập thành), có thể thử Ne5 hoặc Bd2 để đuổi Hậu.

**Kế hoạch Đen:** Đưa Tượng c8 ra f5 hoặc g4, củng cố bằng ...e6, nhập thành rồi phản công ở trung tâm bằng ...c5.

**Lời khuyên:** Đưa Tượng c8 ra ngoài TRƯỚC khi đóng bằng ...e6.

### Biến thể Qd8 (rút Hậu về nhà)

- [ ] Đã duyệt  · nước đi: `e4 d5 exd5 Qxd5 Nc3 Qd8 d4 Nf6 Nf3 Bg4 h3 Bxf3 Qxf3 c6` · tên Lichess: Scandinavian Defense: Valencian Variation, Main Line · máy chấm +86 centipawn (Trắng dương)

**Ý tưởng:** Đen rút Hậu về d8 thay vì a5. Hậu an toàn và ở gần cánh vua, nhưng Đen mất một nước. Đổi lại thế cờ rất chắc, ít điểm yếu.

**Điểm mạnh:** Hậu ở nhà an toàn, hỗ trợ phòng thủ cánh vua. / Thế cờ ít rủi ro, ít điểm yếu.

**Điểm yếu:** Đen mất một nước (tempo) nên Trắng dẫn trước về phát triển. / Trắng có thể chiếm không gian ở trung tâm.

**Kế hoạch Trắng:** Phát triển nhanh quân nhẹ, nhập thành sớm và chiếm trung tâm.

**Kế hoạch Đen:** Phát triển Mã f6, Tượng g4, rồi củng cố bằng ...e6 và nhập thành; có thể đổi quân để giảm áp lực.

**Lời khuyên:** Khi dẫn sau về phát triển, hãy đổi bớt quân thay vì cố giữ thế cờ phức tạp.

### Biến thể Hiện đại (…Nf6)

- [ ] Đã duyệt  · nước đi: `e4 d5 exd5 Nf6 d4 Nxd5 c4 Nb6 Nf3 g6 Nc3 Bg7` · tên Lichess: Scandinavian Defense: Marshall Variation · máy chấm +92 centipawn (Trắng dương)

**Ý tưởng:** Đen không ăn lại tốt ngay mà phát triển Mã f6 để đánh vào d5. Tốt thừa của Trắng sẽ bị lấy lại bằng Mã, nên Hậu không phải ra sớm.

**Điểm mạnh:** Hậu ở nhà, không bị đuổi bằng Nc3. / Thế cờ động, Đen có nhiều cách phản công.

**Điểm yếu:** Trắng có thể bảo vệ tốt d5 tạm thời bằng c4 và giữ tốt thừa. / Đen phải lấy lại tốt chính xác.

**Kế hoạch Trắng:** Đuổi Mã d5 bằng c4 để lấy không gian, củng cố trung tâm và phát triển nhanh.

**Kế hoạch Đen:** Đưa Mã về b6, fianchetto Tượng g7 hoặc phát triển Tượng g4; phản công vào trung tâm bằng ...c6 hoặc ...c5.

**Lời khuyên:** Với Mã đã lấy lại tốt, đừng để nó bị đuổi nhiều lần: hãy chọn ô an toàn như b6.

---

## Tấn công Ấn Độ Vua (KIA) (King's Indian Attack)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A07-A08 · 2 biến thể · 5 puzzle

**Câu giới thiệu:** Một "bộ khung" dùng được chống nhiều cách đáp: Nf3, g3, Bg2, O-O, d3, Nbd2, e4, rồi tấn công cánh vua.

**Ý tưởng:**
- KIA không phải là một chuỗi nước đi cố định mà là một bộ khung quân: Mã f3, Tượng fianchetto g2, nhập thành, tốt d3, Mã bd2 rồi đẩy e4. Dù Đen đáp thế nào, Trắng thường có thể dựng cùng một bộ khung này, nên người học nhớ ít nước đi.
- Sau khi dựng xong, Trắng thường tấn công cánh vua bằng e5, Nh4, f4 và sự hỗ trợ của Hậu. Cái giá phải trả là KIA không cố giành ưu thế ngay từ đầu, và nếu Đen phản công trung tâm tốt thì Trắng phải biết đổi hướng.

**Điểm mạnh:**
- Bộ khung đơn giản, ít phải học thuộc.
- Dùng được chống nhiều cách đáp của Đen (Sicilian, Pháp, Caro-Kann đều có phiên bản KIA).
- Vua Trắng an toàn sau khi nhập thành; Tượng g2 hoạt động tốt.

**Điểm yếu:**
- Không tạo ưu thế rõ ràng ở khai cuộc.
- Nếu Đen phản công trung tâm sớm, bộ khung cứng nhắc có thể bị mất nhịp.
- Đòi hỏi kỹ năng tấn công cánh vua để thắng ván.

### KIA chống ...e6

- [ ] Đã duyệt  · nước đi: `Nf3 d5 g3 Nf6 Bg2 e6 O-O Be7 d3 O-O Nbd2 c5 e4 Nc6 Re1` · tên Lichess: King's Indian Attack: Sicilian Variation · máy chấm +0 centipawn (Trắng dương)

**Ý tưởng:** Đen chơi chắc với ...e6, ...Be7 và ...c5. Trắng dựng đủ bộ khung (Bg2, O-O, d3, Nbd2) rồi đẩy e4 để chiếm trung tâm và chuẩn bị tấn công cánh vua.

**Điểm mạnh:** Bộ khung của Trắng rất chắc chắn. / Trắng có kế hoạch rõ ràng, ít phải tính toán biến thể.

**Điểm yếu:** Đen cũng có thế cờ vững và nhiều không gian. / Trắng cần kiên nhẫn và biết khi nào đẩy e4.

**Kế hoạch Trắng:** Đẩy e4 rồi chuẩn bị e5 hoặc Nh4/f4 để tấn công cánh vua.

**Kế hoạch Đen:** Phản công cánh Hậu bằng ...c5, ...Nc6, ...b5 và chiếm trung tâm bằng ...e5 khi thuận lợi.

**Lời khuyên:** Khi Đen đóng thế cờ bằng ...e6, hãy chuẩn bị e4 để mở thế có lợi cho Tượng g2.

### KIA chống ...Bg4

- [ ] Đã duyệt  · nước đi: `Nf3 d5 g3 Nf6 Bg2 Bg4 O-O Nbd7 d3 e6 Nbd2 Be7 e4 c6 h3 Bh5` · tên Lichess: King's Indian Attack · máy chấm +34 centipawn (Trắng dương)

**Ý tưởng:** Đen ghim Mã f3 bằng Tượng c8 ngay, trước khi đóng bằng ...e6. Trắng vẫn dựng bộ khung bình thường rồi đuổi Tượng bằng h3.

**Điểm mạnh:** Trắng bình tĩnh dựng bộ khung và đuổi Tượng g4 bằng h3. / Đen không có đòn chiến thuật rõ ràng.

**Điểm yếu:** Tượng g4 gây áp lực lên Mã f3 trong vài nước. / Trắng phải chú ý không để Đen đổi Tượng lấy Mã f3 bất lợi.

**Kế hoạch Trắng:** Đuổi Tượng bằng h3, dựng trung tâm e4 rồi tấn công cánh vua.

**Kế hoạch Đen:** Giữ Tượng hoạt động ở h5, phát triển Nbd7, e6, Be7 và chuẩn bị ...c6/...O-O.

**Lời khuyên:** Khi Tượng ghim Mã f3, hãy chuẩn bị h3 trước khi làm những nước tham vọng.

---

## Chống Sicilian (Alapin, Morra, Grand Prix) (Anti-Sicilian Systems)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO B20-B29 · 4 biến thể · 11 puzzle

**Câu giới thiệu:** Tránh biến thể Sicilian Mở đồ sộ: chọn một hệ thống ít lý thuyết hơn mà vẫn giữ trung tâm vững và có đòn tấn công.

**Ý tưởng:**
- Sau 1.e4 c5, cách chơi chính là 2.Nf3 rồi 3.d4 (Sicilian Mở) với hàng trăm biến thể phải học thuộc. Nhiều người chơi chọn "chống Sicilian": một hệ thống riêng ở nước 2 hoặc 3 để thoát khỏi lý thuyết dày đặc mà vẫn có thế cờ tốt.
- Bài này giới thiệu ba hướng phổ biến: Alapin (2.c3) chuẩn bị dựng trung tâm c3-d4; Gambit Smith-Morra (2.d4 cxd4 3.c3) hiến một tốt để lấy nhịp phát triển và áp lực; Grand Prix (2.Nc3 rồi f4) tấn công thẳng vào cánh vua. Mỗi cái hợp với một phong cách chơi khác nhau.

**Điểm mạnh:**
- Ít phải học thuộc so với Sicilian Mở.
- Thế cờ có ý tưởng rõ ràng, dễ hiểu và dễ chơi lặp lại.
- Đối thủ thường quen Sicilian Mở hơn và ít chuẩn bị chống lại các hệ thống này.

**Điểm yếu:**
- Máy tính thường cho Đen cân bằng hoặc lợi thế rất nhỏ trong vài hệ thống (nhất là Morra gambit).
- Đen có nhiều cách đáp, mỗi cách đòi hỏi kế hoạch riêng.
- Nếu chơi quá máy móc, Đen dễ phản công vào trung tâm.

### Alapin: Đen đáp ...Nf6

- [ ] Đã duyệt  · nước đi: `e4 c5 c3 Nf6 e5 Nd5 d4 cxd4 Nf3 Nc6 cxd4 d6 Bc4 Nb6 Bb3 dxe5 Nxe5 Nxe5 dxe5` · tên Lichess: Sicilian Defense: Alapin Variation, Smith-Morra Declined · máy chấm +7 centipawn (Trắng dương)

**Ý tưởng:** Trắng chơi 2.c3 để chuẩn bị d4 với trung tâm hai tốt vững. Nếu Đen đuổi bằng ...Nf6, Trắng đẩy e5 lấy không gian rồi dựng trung tâm bằng d4.

**Điểm mạnh:** Trắng có trung tâm c3-d4-e5 vững chắc. / Đen không có phản công rõ ràng ở khai cuộc.

**Điểm yếu:** Đen có thể phản công vào trung tâm bằng ...Nc6 và ...d6. / Trắng khó giữ ưu thế lớn nếu Đen chơi chính xác.

**Kế hoạch Trắng:** Dựng trung tâm d4, phát triển Mã f3, Tượng c4 và chuẩn bị tấn công cánh vua.

**Kế hoạch Đen:** Phá trung tâm bằng ...cxd4, ...Nc6, ...d6 và đổi Mã để giảm không gian của Trắng.

**Lời khuyên:** Khi Mã đối phương bị đuổi vào b6, tốt e5 của bạn dễ trở thành điểm yếu: hãy theo dõi nó.

### Alapin: Đen đáp ...d5

- [ ] Đã duyệt  · nước đi: `e4 c5 c3 d5 exd5 Qxd5 d4 Nf6 Nf3 e6 Be2 Nc6 O-O cxd4 cxd4 Be7` · tên Lichess: Sicilian Defense: Delayed Alapin Variation · máy chấm +26 centipawn (Trắng dương)

**Ý tưởng:** Đen phản công trung tâm ngay bằng ...d5. Sau khi đổi tốt, Hậu đen ra d5 và Trắng đuổi nó bằng Nf3 và d4, dựng thế cờ với tốt cô lập tiềm năng.

**Điểm mạnh:** Trắng có thể đuổi Hậu đen bằng nhịp phát triển. / Thế cờ rõ ràng, dễ hiểu.

**Điểm yếu:** Đen có phản công trung tâm sớm. / Trắng có thể bị cô lập tốt d4 nếu đổi tốt c4xd4.

**Kế hoạch Trắng:** Đuổi Hậu đen bằng Nc3, phát triển Tượng và nhập thành, rồi dựng thế cờ tốt cô lập.

**Kế hoạch Đen:** Phát triển Mã, Be7 và nhập thành; giữ Hậu d5 hoạt động hoặc chuyển về d6/d8 khi bị đuổi.

**Lời khuyên:** Hậu ra sớm thường bị đuổi bằng nhịp phát triển: hãy tận dụng bằng Nc3.

### Gambit Smith-Morra

- [ ] Đã duyệt  · nước đi: `e4 c5 d4 cxd4 c3 dxc3 Nxc3 Nc6 Nf3 d6 Bc4 e6 O-O Nf6 Qe2 Be7 Rd1 e5` · tên Lichess: Sicilian Defense: Smith-Morra Gambit Accepted, Scheveningen Formation · máy chấm +12 centipawn (Trắng dương)

**Ý tưởng:** Trắng hiến tốt d để lấy nhịp phát triển nhanh: sau 2.d4 cxd4 3.c3 dxc3 4.Nxc3, Trắng có Mã, Tượng, Xe nhanh chóng vào trận và áp lực lớn lên cột d và c.

**Điểm mạnh:** Trắng phát triển rất nhanh và thế cờ dễ chơi. / Đen phải phòng thủ chính xác, nhiều bẫy.

**Điểm yếu:** Trắng hiến tốt; nếu Đen phòng thủ tốt, Trắng khó lấy lại. / Máy tính đánh giá Đen có lợi thế nhỏ.

**Kế hoạch Trắng:** Phát triển nhanh Nf3, Bc4, nhập thành và Re1/Qe2; tấn công vào e5 hoặc d6.

**Kế hoạch Đen:** Giữ tốt thừa, phát triển Nf6, Be7 và nhập thành rồi đổi quân để giảm áp lực.

**Lời khuyên:** Trong gambit, ưu tiên phát triển quân và hoàn thành nhập thành trước khi tấn công.

### Tấn công Grand Prix (f4)

- [ ] Đã duyệt  · nước đi: `e4 c5 Nc3 Nc6 f4 g6 Nf3 Bg7 Bc4 e6 f5 Nge7 d3 d5` · tên Lichess: Sicilian Defense: Grand Prix Attack, Schofman Variation · máy chấm -122 centipawn (Trắng dương)

**Ý tưởng:** Trắng đưa Mã ra c3, rồi đẩy f4 và phát triển Mã f3, Tượng c4 để tấn công cánh vua. Đen thường fianchetto Tượng ra g7 và phản công trung tâm bằng ...d5.

**Điểm mạnh:** Trắng tấn công cánh vua nhanh, thế cờ có tính chiến thuật cao. / Ít lý thuyết hơn Sicilian Mở.

**Điểm yếu:** Vua Trắng hơi lộ sau f4. / Đen có thể phản công mạnh vào trung tâm bằng ...d5.

**Kế hoạch Trắng:** Tấn công bằng f5, đưa Tượng c4 và Mã f3 vào trận, nhập thành rồi đẩy d3.

**Kế hoạch Đen:** Giữ cấu trúc chắc, phản công trung tâm bằng ...d5 và dùng Tượng g7 để gây áp lực.

**Lời khuyên:** Tấn công cánh vua chỉ có hiệu quả khi cả hai Mã và Tượng đều tham gia.

---

## Gambit Budapest (Budapest Gambit)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A51-A52 · 2 biến thể · 5 puzzle

**Câu giới thiệu:** Hiến tốt e5 ngay nước thứ hai để Mã đen nhảy vào g4 và tấn công tốt e5: nhiều bẫy sắc, ít lý thuyết.

**Ý tưởng:**
- Sau 1.d4 Nf6 2.c4, thay vì ...e6 hay ...g6 quen thuộc, Đen đẩy ...e5 hiến tốt. Nếu Trắng ăn tốt e5, Mã f6 nhảy vào g4 và đánh vào tốt e5 để lấy lại tốt; Tượng đen có thể chiếu b4+ và Hậu e7 tiếp tục gây áp lực lên tốt e5.
- Thế cờ giống một "bẫy cờ": nếu Trắng bảo vệ tốt e5 không chính xác, Đen có nhiều đòn chiến thuật (ví dụ hy sinh Tượng, Hậu e7 và Mã). Tuy vậy, máy tính hiện đại đánh giá Trắng có lợi thế nhỏ nếu chơi đúng, nên đây là khai cuộc "cạm bẫy" hơn là khai cuộc chắc chắn.

**Điểm mạnh:**
- Ít phải học thuộc lý thuyết, nhiều bẫy chiến thuật.
- Đen luôn có thế cờ hoạt động, Tượng b4+ và Mã g4 gây khó chịu.
- Phù hợp với người thích tấn công và tính toán ngắn.

**Điểm yếu:**
- Máy tính đánh giá Trắng có lợi thế nhỏ (khoảng nửa tốt hoặc hơn).
- Đen hiến tốt và phải lấy lại bằng nhịp, nếu Trắng phòng thủ đúng thì Đen thiếu tốt.
- Trắng có hai cách đáp chính (Bf4 và e4), mỗi cách khác biệt đáng kể.

### Trắng đáp Bf4

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e5 dxe5 Ng4 Bf4 Nc6 Nf3 Bb4+ Nbd2 Qe7 e3 Ngxe5 Nxe5 Nxe5` · tên Lichess: Indian Defense: Budapest Gambit Accepted, Main Line, Rubinstein Variation · máy chấm +39 centipawn (Trắng dương)

**Ý tưởng:** Trắng nhận tốt rồi bảo vệ bằng Bf4. Đen đáp Ng4, Nc6, Bb4+ và Qe7 để lấy lại tốt e5 bằng nhịp; sau đó đổi Mã, Đen có thế cờ thoải mái.

**Điểm mạnh:** Đen lấy lại tốt dễ dàng và phát triển nhanh. / Có nhiều bẫy nếu Trắng chơi không chính xác.

**Điểm yếu:** Trắng có Tượng f4 mạnh và cặp Tượng. / Máy tính đánh giá Trắng nhỉnh nếu chơi đúng.

**Kế hoạch Trắng:** Phát triển Nf3, Nbd2, e3 và giữ cặp Tượng, lấy lại tốt khi cần.

**Kế hoạch Đen:** Lấy lại tốt e5 bằng ...Ngxe5, đổi Mã và chơi ...d6, ...O-O.

**Lời khuyên:** Trong Budapest, đừng vội bỏ Mã g4: nó đánh vào e5 và giữ nhịp tấn công.

### Trắng đáp e4

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e5 dxe5 Ng4 e4 Nxe5 f4 Nec6 Nf3 Bb4+ Nc3 Qe7` · tên Lichess: Indian Defense: Budapest Gambit Accepted, Main Line, Alekhine Variation, Abonyi Variation · máy chấm +64 centipawn (Trắng dương)

**Ý tưởng:** Trắng trả lại tốt bằng e4 để chiếm trung tâm; Đen ăn tốt e5 bằng Mã rồi chơi ...Nc6 và ...Bb4+ để có nhịp phát triển. Thế cờ sắc bén, Trắng có trung tâm lớn nhưng Đen có thế cờ hoạt động.

**Điểm mạnh:** Trắng có trung tâm lớn, hoạt động. / Đen có nhịp phát triển nhanh.

**Điểm yếu:** Máy tính đánh giá Trắng nhỉnh khoảng nửa tốt hoặc hơn. / Đen phải cẩn thận không để trung tâm Trắng nghiền nát.

**Kế hoạch Trắng:** Phát triển Nf3, Nc3 và Bd3, nhập thành; dựng trung tâm e4-f4.

**Kế hoạch Đen:** Đổi Tượng ô đen bằng ...Bxc3+, dùng Hậu e7 và ...d6 để củng cố.

**Lời khuyên:** Khi hiến tốt, hãy nhanh chóng phát triển để lấy lại thế chủ động.

---

## Gambit Hậu (Queen's Gambit)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO D06-D69 · 4 biến thể · 10 puzzle

**Câu giới thiệu:** Khai cuộc cổ điển: Trắng đề nghị đổi tốt c lấy tốt d của Đen để chiếm ưu thế ở trung tâm.

**Ý tưởng:**
- Trắng đẩy tốt c4 để đánh vào tốt d5. Nếu Đen ăn c4 thì Trắng thường lấy lại được tốt và nắm trung tâm. Gọi là "gambit" (hy sinh tốt) nhưng thật ra Trắng gần như luôn lấy lại được tốt.
- Nếu Đen không ăn mà giữ d5, Trắng có thể đổi tốt hoặc tăng áp lực lên d5 để buộc Đen phải bảo vệ. Thế cờ thường đóng và mang tính chiến lược.

**Điểm mạnh:**
- Trắng chiếm trung tâm bằng tốt d4 và c4, nắm thế chủ động.
- Nguyên lý dễ hiểu và dạy kỹ năng chơi vị trí.
- Có nhiều hướng chơi cho Đen nên Trắng học được cách đối phó từng kiểu.

**Điểm yếu:**
- Thế cờ có thể hơi cứng nhắc và chậm; Trắng cần kiên nhẫn.
- Đen có nhiều cách phòng thủ chắc chắn (Slav, Declined) nên Trắng ít khi có lợi thế lớn.
- Phải cẩn thận với các bẫy như Bẫy Voi và Albin Countergambit.

### Từ chối Gambit (Declined)

- [ ] Đã duyệt  · nước đi: `d4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 Nbd7` · tên Lichess: Queen's Gambit Declined: Orthodox Defense · máy chấm +24 centipawn (Trắng dương)

**Ý tưởng:** Đen giữ d5 bằng tốt e6 thay vì ăn c4. Thế cờ vững chắc nhưng làm Tượng c8 bị nhốt. Đây là một trong những hệ thống phòng thủ cổ điển và đáng tin cậy nhất.

**Điểm mạnh:** Trung tâm Đen rất vững, ít điểm yếu. / Đen có kế hoạch rõ ràng: ...Be7, ...O-O, ...Nbd7, ...c5.

**Điểm yếu:** Tượng c8 bị nhốt sau tốt e6, khó phát triển. / Đen hơi chật vì ít không gian.

**Kế hoạch Trắng:** Phát triển nhanh, giữ trung tâm; có thể tăng áp lực với Qc2 và Rd1 hoặc chuẩn bị e4 khi đủ quân.

**Kế hoạch Đen:** Giải phóng Tượng c8 bằng ...c5 hoặc ...dxc4 đúng lúc; đổi bớt quân để giảm bớt thế chật.

**Lời khuyên:** Tượng c8 là quân khó phát triển nhất của Đen: mọi nước đi nên giúp giải quyết điều này.

### Biến thể Đổi (Exchange)

- [ ] Đã duyệt  · nước đi: `d4 d5 c4 e6 Nc3 Nf6 cxd5 exd5 Bg5 Be7 e3 O-O Bd3 Nbd7` · tên Lichess: Queen's Gambit Declined: Exchange Variation, Positional Variation · máy chấm +39 centipawn (Trắng dương)

**Ý tưởng:** Trắng đổi tốt c lấy tốt d, tạo cấu trúc tốt đối xứng đặc biệt gọi là "Carlsbad". Kế hoạch kinh điển của Trắng là "tấn công thiểu số": đẩy tốt b và c ở cánh Hậu để phá cấu trúc tốt của Đen.

**Điểm mạnh:** Kế hoạch rõ ràng và dễ học: tấn công thiểu số b4-b5. / Cấu trúc tốt đối xứng, ít rủi ro cho Trắng.

**Điểm yếu:** Thế cờ đối xứng nên Trắng khó tạo lợi thế lớn. / Đen có thể phản công ở cánh vua nếu Trắng chơi cánh Hậu quá chậm.

**Kế hoạch Trắng:** Đẩy tốt b4-b5 tấn công tốt c6 (thiểu số tấn công) hoặc đẩy e4 phá trung tâm đúng thời điểm.

**Kế hoạch Đen:** Phản công cánh vua bằng ...Ne4, ...f5 hoặc chuẩn bị ...c5 để phá cấu trúc.

**Lời khuyên:** Carlsbad: Trắng tấn công cánh Hậu, Đen tấn công cánh vua. Ai nhanh hơn thì thắng.

### Nhận Gambit (Accepted)

- [ ] Đã duyệt  · nước đi: `d4 d5 c4 dxc4 Nf3 Nf6 e3 e6 Bxc4 c5 O-O a6` · tên Lichess: Queen's Gambit Accepted: Classical Defense, Main Line · máy chấm +27 centipawn (Trắng dương)

**Ý tưởng:** Đen ăn tốt c4. Trắng không vội lấy lại mà phát triển quân trước, sau đó dễ dàng lấy lại tốt bằng Bxc4. Đen có thể giải phóng thế cờ nhanh hơn.

**Điểm mạnh:** Đen chiếm lợi thế phát triển Tượng c8 (tự do), tránh thế chật. / Đen có thể phản công trung tâm bằng ...c5 và ...a6.

**Điểm yếu:** Trắng nắm trung tâm và có thể phát triển nhanh hơn. / Đen không giữ được tốt thừa lâu, phải trả lại để phát triển.

**Kế hoạch Trắng:** Lấy lại tốt bằng Bxc4, nhập thành và giữ trung tâm; có thể đẩy e4 nếu có dịp.

**Kế hoạch Đen:** Phát triển nhanh, phản công bằng ...c5 và ...a6-b5 để đuổi Tượng và mở rộng cánh Hậu.

**Lời khuyên:** Đừng cố giữ tốt thừa bằng ...b5 vì Trắng sẽ ăn lại với a4 và Qb3.

### Albin Countergambit

- [ ] Đã duyệt  · nước đi: `d4 d5 c4 e5 dxe5 d4 Nf3 Nc6 g3 Be6 Nbd2 Qd7` · tên Lichess: Queen's Gambit Declined: Albin Countergambit, Fianchetto Variation, Be6 Line · máy chấm +99 centipawn (Trắng dương)

**Ý tưởng:** Đen không ăn c4 mà phản gambit bằng ...e5: hy sinh tốt để đẩy d4 và chiếm không gian cánh Hậu của Trắng. Đây là khai cuộc táo bạo, có nhiều bẫy.

**Điểm mạnh:** Đen lấy không gian và có tốt d4 gây khó chịu cho Trắng. / Có nhiều bẫy nhanh cho Trắng nếu đi sai.

**Điểm yếu:** Nếu Trắng chơi đúng, Đen thiếu một tốt và khó có đủ bù. / Tốt d4 có thể trở thành mục tiêu thay vì sức mạnh.

**Kế hoạch Trắng:** Giữ tốt thừa bằng cách phát triển chắc chắn (Nf3, g3, Bg2) và khóa tốt d4.

**Kế hoạch Đen:** Dùng không gian để tấn công: phát triển Mã c6, Tượng e6, và đẩy tốt g hoặc đẩy Tượng g4 gây khó cho Trắng.

**Lời khuyên:** Bẫy Lasker: nếu Trắng ăn Tượng b4 một cách tham lam thì Đen có đòn thắng nhanh.

---

## Gambit Đan Mạch (Danish Gambit)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C21-C22 · 3 biến thể · 8 puzzle

**Câu giới thiệu:** Hiến hai tốt để dựng trung tâm và hai Tượng chĩa thẳng vào Vua Đen: lối chơi tấn công cổ điển, rất sắc.

**Ý tưởng:**
- Trắng đẩy d4, và khi Đen ăn tốt thì tiếp tục hiến thêm tốt c3, rồi Bc4. Nếu Đen ăn hết, Trắng đổi hai tốt lấy sự phát triển nhanh: hai Tượng c4 và b2 chĩa thẳng vào ô f7 và g7, kèm theo Mã và Hậu sẵn sàng tấn công.
- Ý tưởng cốt lõi của gambit là "đổi vật chất lấy nhịp". Tuy vậy, máy tính hiện đại cho rằng Đen ăn hết hai tốt rồi phòng thủ đúng thì Đen ổn. Vì thế khai cuộc này hợp để học tấn công, bẫy và nhịp phát triển hơn là để thắng chắc ở trình độ cao.

**Điểm mạnh:**
- Trắng phát triển cực nhanh, hai Tượng nhắm vào cánh vua Đen.
- Nhiều bẫy chiến thuật cho Đen, rất tốt để luyện tấn công.
- Dễ học: ý tưởng đơn giản, nhớ ít nước đi.

**Điểm yếu:**
- Trắng thiếu hai tốt; nếu Đen phòng thủ đúng, tấn công có thể cạn.
- Máy tính đánh giá Đen có lợi thế rõ rệt (khoảng 0,6-0,7 tốt) sau khi ăn hết tốt.
- Đen có thể trả bớt tốt để giảm sức ép (ví dụ ...d5 hoặc ...d6).

### Đen nhận cả hai tốt

- [ ] Đã duyệt  · nước đi: `e4 e5 d4 exd4 c3 dxc3 Bc4 cxb2 Bxb2 Nf6 e5 Bb4+ Bc3` · tên Lichess: Danish Gambit Accepted: Classical Defense · máy chấm -59 centipawn (Trắng dương)

**Ý tưởng:** Đen ăn d4, c3 và b2. Trắng hiến hai tốt rồi lấy lại một tốt bằng Bxb2, có hai Tượng nhìn thẳng vào cánh vua Đen. Đen phải phòng thủ chính xác, nhất là ô f7.

**Điểm mạnh:** Hai Tượng của Trắng nhắm vào cánh vua Đen. / Trắng phát triển rất nhanh.

**Điểm yếu:** Trắng thiếu hai tốt nếu Đen phòng thủ tốt. / Đen có thể chiếu ...Bb4+ để giảm áp lực.

**Kế hoạch Trắng:** Tấn công f7 và g7 bằng hai Tượng, dùng Hậu và Mã để thêm áp lực.

**Kế hoạch Đen:** Phát triển Nf6 để đánh vào e4, chiếu ...Bb4+ để đổi quân và giữ tốt thừa.

**Lời khuyên:** Khi nhận gambit, hãy đưa Vua vào nhập thành và đổi bớt quân tấn công.

### Đen trả tốt (...d5)

- [ ] Đã duyệt  · nước đi: `e4 e5 d4 exd4 c3 d5 exd5 Qxd5 cxd4 Nc6 Nf3 Bg4 Be2 Nf6` · tên Lichess: Danish Gambit Declined: Sörensen Defense · máy chấm +12 centipawn (Trắng dương)

**Ý tưởng:** Đen không ăn hết mà trả tốt bằng ...d5. Sau khi đổi tốt, Trắng lấy lại tốt d4 và có thế cờ cân bằng với tốt d4 được bảo vệ.

**Điểm mạnh:** Trắng có thế cờ cân bằng, Hậu đen ra sớm bị đuổi. / Trắng có nhịp phát triển nhanh hơn.

**Điểm yếu:** Đen đã trả tốt và có thế cờ ổn. / Gambit không còn là gambit nữa.

**Kế hoạch Trắng:** Đuổi Hậu đen bằng Nf3, Be2 và nhập thành rồi dựng thế cờ tốt d4.

**Kế hoạch Đen:** Phát triển Mã, Tượng g4 và nhập thành dài để tấn công.

**Lời khuyên:** Khi đối phương trả lại tốt, hãy chơi như khai cuộc thường: phát triển và nhập thành.

### Đen trả tốt (...d6)

- [ ] Đã duyệt  · nước đi: `e4 e5 d4 exd4 c3 dxc3 Bc4 d6 Nxc3 Nf6 Nf3 Be7 O-O O-O Qb3` · tên Lichess: Danish Gambit Accepted · máy chấm -56 centipawn (Trắng dương)

**Ý tưởng:** Đen ăn hai tốt nhưng không ăn b2; thay vào đó đưa tốt d6 về để củng cố. Trắng phát triển Mã c3, Mã f3, nhập thành và Hậu b3, có thế cờ chủ động nhưng Đen vẫn hơn tốt.

**Điểm mạnh:** Trắng phát triển nhanh và có áp lực. / Đen chưa nhập thành nên Vua còn kẹt.

**Điểm yếu:** Đen hơn tốt và đã củng cố trung tâm. / Trắng khó tạo đòn tấn công thật sự.

**Kế hoạch Trắng:** Phát triển Mã c3, f3, nhập thành và Hậu b3 để đánh vào b7 và f7.

**Kế hoạch Đen:** Phát triển Nf6, Be7 và nhập thành, rồi đổi quân để hóa giải áp lực.

**Lời khuyên:** Khi đối phương không ăn tốt, hãy nhanh chóng phát triển quân thay vì cố giữ gambit.

---

## Khai cuộc Anh (English Opening)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A10-A39 · 3 biến thể · 7 puzzle

**Câu giới thiệu:** Mở đầu bằng tốt c: Trắng đánh vào trung tâm từ bên cạnh, giữ thế cờ linh hoạt và hay "đảo" Sicilian.

**Ý tưởng:**
- Thay vì chiếm trung tâm bằng tốt e4 hay d4, Trắng đẩy tốt c lên hai ô để kiểm soát ô d5 từ xa. Tốt c4 chưa phải là quân chiếm giữ trung tâm, nhưng nó "nhìn" ô d5 và đồng thời không làm lộ cấu trúc của Trắng.
- Nhiều thế cờ của Khai cuộc Anh giống Phòng thủ Sicilian nhưng đảo màu (Trắng chơi như Đen có thêm một nước đi). Vì vậy kinh nghiệm chơi Sicilian giúp ích rất nhiều. Trắng thường đưa Tượng f1 ra g2 (fianchetto: đặt Tượng trên đường chéo dài) để canh ô d5 và cánh Hậu của Đen.

**Điểm mạnh:**
- Linh hoạt: Trắng có thể chuyển sang nhiều thế cờ khác nhau (d4, e4 hoặc cấu trúc fianchetto).
- Ít phải học thuộc nước đi, nhiều thế cờ dựa vào ý tưởng và hiểu biết chung.
- Tượng g2 hoạt động mạnh trên đường chéo dài, hỗ trợ cả tấn công lẫn phòng thủ.

**Điểm yếu:**
- Trắng chưa chiếm trung tâm nên Đen có thể giành trung tâm thoải mái nếu Trắng chơi chậm.
- Hay xảy ra chuyển thế (transposition) sang khai cuộc khác, người học dễ rối nếu không nắm kế hoạch.
- Ít đòn tấn công trực tiếp ở giai đoạn đầu nên cần kiên nhẫn.

### Sicilian đảo (1...e5)

- [ ] Đã duyệt  · nước đi: `c4 e5 Nc3 Nf6 Nf3 Nc6 g3 d5 cxd5 Nxd5 Bg2 Nb6 O-O Be7` · tên Lichess: English Opening: King's English Variation, Four Knights Variation, Fianchetto Line, with Nb6 · máy chấm +18 centipawn (Trắng dương)

**Ý tưởng:** Đen đáp ...e5, chiếm trung tâm theo kiểu "Sicilian đảo": cấu trúc giống Sicilian nhưng Trắng có thêm một nước. Trắng phát triển Mã, đưa Tượng ra g2 rồi ép Đen đổi tốt ở d5.

**Điểm mạnh:** Trắng có thêm một nước đi so với Sicilian bình thường, nên chủ động hơn. / Tượng g2 và Mã c3 cùng gây áp lực vào ô d5.

**Điểm yếu:** Đen có trung tâm tốt e5, d5 vững nếu giữ được. / Trắng cần chú ý Mã c3 có thể bị ghim hoặc bị đuổi bằng tốt.

**Kế hoạch Trắng:** Hoàn thành phát triển (Bg2, O-O, d3 hoặc d4), tìm cơ hội đổi tốt để mở cột c hoặc cột d.

**Kế hoạch Đen:** Giữ trung tâm bằng ...Nf6, ...Nc6, ...d5 và đổi bớt quân để giảm sức ép lên ô d5.

**Lời khuyên:** Khi Đen phá d5, hãy chủ động đổi tốt c4xd5 để mở đường cho Tượng g2.

### Biến thể đối xứng (1...c5)

- [ ] Đã duyệt  · nước đi: `c4 c5 Nc3 Nc6 g3 g6 Bg2 Bg7 Nf3 Nf6 O-O O-O d3 d6` · tên Lichess: English Opening: Symmetrical Variation, Duchamp Variation · máy chấm +21 centipawn (Trắng dương)

**Ý tưởng:** Đen đáp bằng cách chơi y hệt: ...c5, Nc6, g6, Bg7. Cả hai bên fianchetto Tượng ở cánh vua. Thế cờ thiên về chiến lược và đổi quân hơn là đòn chiến thuật.

**Điểm mạnh:** Cấu trúc vững chắc cho cả hai bên, ít rủi ro. / Trắng có đi trước nên giữ được một chút chủ động.

**Điểm yếu:** Thế cờ có thể hơi bằng nhau nếu Đen chơi chính xác. / Trắng khó tạo đòn tấn công nhanh vì Đen cũng phát triển tốt.

**Kế hoạch Trắng:** Nhập thành sớm, chuẩn bị d3 và a3-b4 hoặc đổi Mã để lấy không gian cánh Hậu.

**Kế hoạch Đen:** Phản chiếu kế hoạch của Trắng: nhập thành, ...d6, ...Rb8 và ...b5 để mở cánh Hậu.

**Lời khuyên:** Ở thế cờ đối xứng, người nào hiểu rõ kế hoạch sẽ thắng thế, không phải người nhớ nhiều nước.

### Hệ thống Botvinnik (e4 + g3)

- [ ] Đã duyệt  · nước đi: `c4 e5 Nc3 Nc6 g3 g6 Bg2 Bg7 e4 d6 Nge2 Nge7 O-O O-O d3` · tên Lichess: English Opening: King's English Variation, Taimanov Variation · máy chấm +25 centipawn (Trắng dương)

**Ý tưởng:** Trắng kết hợp cả hai ý tưởng: chiếm trung tâm bằng e4 (như Sicilian) và fianchetto Tượng g2. Cấu trúc tốt c4-e4-d3 khá chắc và cho Trắng không gian rộng.

**Điểm mạnh:** Trắng có không gian trung tâm lớn hơn với tốt c4 và e4. / Cấu trúc vững chắc, Tượng g2 hoạt động tốt.

**Điểm yếu:** Ô d4 yếu nếu Đen chiếm được bằng Mã. / Cần kỹ năng để chuyển sang tấn công, nếu không dễ bị phòng ngự bị động.

**Kế hoạch Trắng:** Hoàn thành phát triển (Nge2, O-O, d3, Be3) rồi đẩy f4 để tấn công cánh vua.

**Kế hoạch Đen:** Chiếm ô d4 bằng Mã, giữ Tượng g7 hoạt động và chuẩn bị ...f5 hoặc ...b5.

**Lời khuyên:** Ô d4 là ô mấu chốt của hệ thống Botvinnik; ai kiểm soát nó thường nắm thế chủ động.

---

## Khai cuộc Réti (Réti Opening)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A04-A09 · 3 biến thể · 7 puzzle

**Câu giới thiệu:** Kiểm soát trung tâm bằng quân từ xa: Mã f3, tốt c4 và Tượng fianchetto, thay vì chiếm trung tâm bằng tốt.

**Ý tưởng:**
- Trong khai cuộc "siêu hiện đại" này, Trắng không vội đặt tốt vào trung tâm mà dùng Mã f3, tốt c4 và Tượng g2 (fianchetto) để kiểm soát ô d5 và e5 từ xa. Sau đó Trắng mới chọn lúc thích hợp để đẩy tốt (d4 hoặc e4) khi thế cờ đã sẵn sàng.
- Ưu điểm lớn là tính linh hoạt: cùng một bộ khung quân có thể chuyển sang Catalan, Gambit Hậu hay khai cuộc Anh tùy cách đáp của Đen. Đổi lại, Đen có thể dựng trung tâm tốt rộng rãi (d5, e6, c5), nên Trắng phải hiểu rõ cách tấn công trung tâm đó.

**Điểm mạnh:**
- Linh hoạt, dễ chuyển thế sang nhiều khai cuộc khác.
- Kiểm soát trung tâm bằng quân nên khó bị tấn công bất ngờ.
- Ít phải học thuộc nước đi, tập trung vào hiểu ý tưởng.

**Điểm yếu:**
- Đen được phép dựng trung tâm tốt nên Trắng cần biết cách phản công.
- Thế cờ có thể hơi thụ động nếu Trắng không tìm được đòn phá trung tâm.
- Có nhiều chuyển thế, người học dễ nhầm sang khai cuộc khác.

### Réti chính (...e6 + g3)

- [ ] Đã duyệt  · nước đi: `Nf3 d5 c4 e6 g3 Nf6 Bg2 Be7 O-O O-O b3 c5 Bb2 Nc6` · tên Lichess: English Opening: Agincourt Defense, Neo-Catalan Declined · máy chấm +23 centipawn (Trắng dương)

**Ý tưởng:** Đen củng cố bằng ...e6 và ...Nf6; Trắng fianchetto Tượng g2, nhập thành rồi đẩy b3 và Tượng b2. Hai Tượng của Trắng nhìn thẳng vào trung tâm và cánh Hậu Đen.

**Điểm mạnh:** Hai Tượng fianchetto kiểm soát đường chéo dài. / Thế cờ vững, Vua nhập thành sớm.

**Điểm yếu:** Đen dễ chiếm trung tâm bằng ...c5 và ...Nc6. / Trắng cần tìm đòn phá trung tâm để không bị bó hẹp.

**Kế hoạch Trắng:** Nhập thành, b3, Bb2; sau đó tìm cơ hội đổi tốt ở d5 hoặc dựng trung tâm bằng d4/e3.

**Kế hoạch Đen:** Dựng trung tâm bằng ...c5, ...Nc6, giữ tốt d5 và đổi quân để hóa giải áp lực của hai Tượng.

**Lời khuyên:** Khi Đen có trung tâm tốt, hãy đổi tốt ở d5 để mở đường chéo cho Tượng g2.

### Đen đáp kiểu Slav (...c6)

- [ ] Đã duyệt  · nước đi: `Nf3 d5 c4 c6 b3 Bf5 g3 e6 Bg2 Nf6 Bb2 Nbd7 O-O Be7` · tên Lichess: Réti Opening: Anglo-Slav Variation, London Defensive System · máy chấm -4 centipawn (Trắng dương)

**Ý tưởng:** Đen củng cố d5 bằng ...c6 và đưa Tượng c8 ra f5 trước khi đóng bằng ...e6. Trắng đáp bằng b3 và fianchetto cả hai Tượng, giữ thế cờ chắc và cân bằng.

**Điểm mạnh:** Đen có cấu trúc tốt vững chắc. / Tượng c8 ra ngoài chuỗi tốt rất tích cực.

**Điểm yếu:** Trắng ít cơ hội tấn công nhanh. / Thế cờ khá cân bằng và đòi hỏi chiến lược dài hạn.

**Kế hoạch Trắng:** Fianchetto, nhập thành, rồi d3 hoặc cxd5 để mở đường cho Tượng g2.

**Kế hoạch Đen:** Phát triển Nf6, Nbd7, Be7 và nhập thành; chờ cơ hội phản công bằng ...e5 hoặc ...dxc4.

**Lời khuyên:** Với Slav, Tượng c8 ra trước khi đóng e6 là nguyên tắc quan trọng của Đen.

### Đen đẩy ...d4 (Gambit Réti)

- [ ] Đã duyệt  · nước đi: `Nf3 d5 c4 d4 b4 c5 bxc5 e6 e3 Bxc5 exd4 Bxd4 Nxd4 Qxd4` · tên Lichess: Réti Opening: Advance Variation, Michel Gambit · máy chấm +51 centipawn (Trắng dương)

**Ý tưởng:** Đen đẩy d4 để chiếm không gian. Trắng hiến tốt b4 để phá cấu trúc của Đen: sau ...c5 bxc5, Trắng có cơ hội phát triển nhanh và đánh vào trung tâm Đen. Thế cờ sắc bén, đòi hỏi tính toán chính xác.

**Điểm mạnh:** Trắng có thể phá trung tâm của Đen bằng tốt b4. / Trắng phát triển nhanh nếu Đen nhận tốt.

**Điểm yếu:** Trắng hiến tốt và phải bù bằng hoạt động quân. / Thế cờ phức tạp, dễ sai.

**Kế hoạch Trắng:** Phát triển nhanh quân, nhắm vào tốt d4, và lấy lại tốt khi có cơ hội.

**Kế hoạch Đen:** Giữ tốt thừa, phát triển Mã và Tượng, rồi đổi quân để giảm áp lực.

**Lời khuyên:** Khi hiến tốt, hãy chắc chắn rằng quân của bạn sẽ ra nhanh hơn Đen.

---

## Khai cuộc Tây Ban Nha (Ruy Lopez) (Ruy Lopez)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C60-C99 · 5 biến thể · 13 puzzle

**Câu giới thiệu:** Khai cuộc kinh điển, Trắng gây sức ép lên Mã c6 để làm yếu tốt e5. Tính chiến lược cao, dùng được ở mọi trình độ.

**Ý tưởng:**
- Tượng b5 nhắm vào Mã c6, quân đang bảo vệ tốt e5. Trắng chưa đe dọa ăn Mã ngay, nhưng nếu đổi được Mã c6 thì tốt e5 mất người bảo vệ, và Trắng có thể ăn tốt đó.
- Khai cuộc này dạy kế hoạch dài hạn: tạo áp lực từ từ, giữ trung tâm vững, rồi tấn công đúng lúc thay vì tìm đòn chiếu nhanh.

**Điểm mạnh:**
- Tạo áp lực lâu dài lên trung tâm của Đen mà không cần mạo hiểm.
- Rất ít cái bẫy tầm thường cho Trắng, thế cờ chắc và có nhiều kế hoạch rõ ràng.
- Được nghiên cứu sâu: có nhiều biến thể cho cả lối chơi chắc chắn lẫn sắc bén.

**Điểm yếu:**
- Lợi thế của Trắng thường nhỏ, cần kiên nhẫn để khai thác.
- Lý thuyết dài và phức tạp, nhiều thế cờ đóng đòi hỏi hiểu biết chiến lược hơn là nhớ nước.
- Với người mới, các kế hoạch chậm (như dồn Mã vòng d2-f1-g3) có thể khó hiểu lúc đầu.

### Biến thể Đóng (Closed)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 d6 c3 O-O` · tên Lichess: Ruy Lopez: Closed · máy chấm +50 centipawn (Trắng dương)

**Ý tưởng:** Hai bên dựng thế cờ chắc chắn. Trắng chuẩn bị c3 và d4 để chiếm trung tâm, còn Đen giữ tốt e5 vững và chuẩn bị phản công cánh Hậu. Đây là hướng chơi chính của Ruy Lopez ở mọi cấp độ.

**Điểm mạnh:** Thế cờ rất chắc, Trắng có kế hoạch rõ ràng và nhiều thời gian. / Dễ học các nguyên tắc: bảo vệ e4, chuẩn bị c3 và d4, nhập thành sớm.

**Điểm yếu:** Thế cờ chậm, Trắng cần kiên nhẫn để khai thác lợi thế nhỏ. / Đen có nhiều đường phản công (Marshall, Chigorin) nên cần nhớ lý thuyết.

**Kế hoạch Trắng:** Đẩy c3 rồi d4 để chiếm trung tâm, đưa Mã b1 vòng d2-f1-g3 hoặc dùng h3 và Nbd2 để chuẩn bị tấn công cánh vua.

**Kế hoạch Đen:** Giữ tốt e5, đưa Mã vòng a5-c4 hoặc dùng ...c5 và ...Nc6 để đổi lại trung tâm; Xe vào e8 và Tượng ra f8/b7.

**Lời khuyên:** Closed Ruy Lopez: tốt c3 là chìa khóa. Nó chuẩn bị d4 và cho Tượng b3 ô lùi.

### Biến thể Đổi (Exchange)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bb5 a6 Bxc6 dxc6 O-O f6 d4 exd4 Nxd4 c5 Nb3 Qxd1 Rxd1 Bg4` · tên Lichess: Ruy Lopez: Exchange Variation, Gligoric Variation · máy chấm +7 centipawn (Trắng dương)

**Ý tưởng:** Trắng đổi Tượng lấy Mã c6, buộc Đen có tốt chồng ở cột c. Đổi lại Đen có cặp Tượng. Kế hoạch của Trắng là tận dụng đa số tốt cánh vua (4 tốt đối 3) để thắng ở tàn cuộc.

**Điểm mạnh:** Cấu trúc tốt rõ ràng, kế hoạch tàn cuộc dễ hiểu. / Ít lý thuyết phức tạp.

**Điểm yếu:** Đen có cặp Tượng, nên thế cờ không dễ để Trắng thắng. / Trắng phải chấp nhận đổi quân sớm và thế cờ khá đơn giản.

**Kế hoạch Trắng:** Đổi Hậu, đẩy tốt cánh vua để tạo tốt thông (tốt không bị tốt địch chặn) ở tàn cuộc.

**Kế hoạch Đen:** Dùng cặp Tượng và phát triển nhanh; khi Hậu bị đổi thì đưa Vua vào trung tâm và tận dụng đa số tốt ở cánh Hậu.

**Lời khuyên:** Khi hai bên có tốt khác nhau về số lượng ở hai cánh, tàn cuộc quyết định kết quả.

### Phòng thủ Berlin ("Bức tường Berlin")

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bb5 Nf6 O-O Nxe4 d4 Nd6 Bxc6 dxc6 dxe5 Nf5 Qxd8+ Kxd8` · tên Lichess: Ruy Lopez: Berlin Defense, l'Hermet Variation, Berlin Wall Defense · máy chấm +21 centipawn (Trắng dương)

**Ý tưởng:** Đen không dùng ...a6 mà phản công ngay bằng ...Nf6, rồi ăn e4 và chấp nhận đổi Hậu sớm. Thế cờ sau đó rất chắc, được gọi là "Bức tường Berlin".

**Điểm mạnh:** Đen có thế cờ rất chắc chắn, gần như không có điểm yếu. / Trắng khó tạo áp lực, nhiều trận kết thúc hòa.

**Điểm yếu:** Thế cờ khô khan, ít cơ hội tấn công. / Đen mất quyền nhập thành (Vua phải đi vào giữa), cần chơi khéo ở tàn cuộc.

**Kế hoạch Trắng:** Dùng đa số tốt cánh vua (e5, f, g, h) để tạo tốt thông, và đổi quân cẩn thận.

**Kế hoạch Đen:** Đưa Vua về nơi an toàn (Ke8) và dùng cặp Tượng và đa số tốt cánh Hậu; chơi chắc, không vội.

**Lời khuyên:** Berlin là tàn cuộc dạy kiên nhẫn: cả hai bên đều phải tính cẩn thận từng nước.

### Biến thể Mở (Open)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Nxe4 d4 b5 Bb3 d5 dxe5 Be6 c3 Be7` · tên Lichess: Ruy Lopez: Open, Classical Defense · máy chấm +32 centipawn (Trắng dương)

**Ý tưởng:** Đen ăn tốt e4 sớm để mở trung tâm và phát triển quân nhanh. Trắng tạm mất tốt nhưng lấy lại bằng áp lực lên trung tâm, và thế cờ sắc bén hơn Closed.

**Điểm mạnh:** Quân Đen hoạt động tích cực, thế cờ động. / Trắng có nhiều cách tạo áp lực ở trung tâm và cột e.

**Điểm yếu:** Thế cờ khá phức tạp, nhiều biến thể phụ. / Đen bị Tượng b3 nhắm vào f7 nên phải để ý tốt f7 liên tục.

**Kế hoạch Trắng:** Tăng sức ép lên e5 (c3, Nbd2, Re1), đổi Mã và tận dụng Tượng b3 mạnh trên đường chéo.

**Kế hoạch Đen:** Giữ tốt thừa nếu có thể, phát triển quân (Be6, Be7) và tìm cách đổi bớt quân để thoát áp lực.

**Lời khuyên:** Biến thể Mở: Đen nhận tốt nhưng phải trả bằng thời gian. Hãy phát triển nhanh.

### Tấn công Marshall

- [ ] Đã duyệt  · nước đi: `e4 e5 Nf3 Nc6 Bb5 a6 Ba4 Nf6 O-O Be7 Re1 b5 Bb3 O-O c3 d5 exd5 Nxd5 Nxe5 Nxe5 Rxe5 c6` · tên Lichess: Ruy Lopez: Marshall Attack, Modern Variation · máy chấm +34 centipawn (Trắng dương)

**Ý tưởng:** Đen chủ động hy sinh một tốt (e5) để đổi lấy sự phát triển quân nhanh và đòn tấn công vào Vua Trắng. Đây là một trong những gambit nổi tiếng nhất lịch sử cờ vua.

**Điểm mạnh:** Đen có tấn công rất mạnh nếu Trắng phòng thủ không chính xác. / Quân Đen hoạt động tích cực và gây nhiều khó khăn cho Trắng.

**Điểm yếu:** Đen thiếu một tốt, nếu Trắng phòng thủ đúng thì Đen phải chấp nhận thế khó. / Phải học thuộc nhiều nước của cả hai bên.

**Kế hoạch Trắng:** Phòng thủ chính xác: trả lại tốt khi cần, đổi quân tấn công và giữ Vua an toàn.

**Kế hoạch Đen:** Tấn công cánh vua bằng Hậu và Tượng, tận dụng quân phát triển nhanh để tạo đe dọa liên tục.

**Lời khuyên:** Trong Marshall, cả hai bên phải chính xác. Đen thua nếu tấn công hết đà, Trắng thua nếu phòng thủ sai.

---

## Khai cuộc Vienna (Vienna Game)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C25-C29 · 3 biến thể · 9 puzzle

**Câu giới thiệu:** Phát triển Mã c3 trước, giữ cả hai lựa chọn: tấn công bằng f4 (Gambit Vienna) hoặc chơi chắc với Tượng c4 và g3.

**Ý tưởng:**
- Thay vì đưa Mã ra f3 như thường lệ, Trắng đưa Mã ra c3 trước. Nước đi này bảo vệ tốt e4 và để ngỏ tốt f: Trắng có thể đẩy f4 (hiến tốt, tấn công nhanh) hoặc chơi Bc4, hoặc fianchetto với g3. Đen chưa biết Trắng chọn kế hoạch nào.
- Khai cuộc này ít phổ biến hơn Ý hoặc Tây Ban Nha nên đối thủ thường chưa chuẩn bị kỹ, nhưng cũng ít được nghiên cứu sâu. Nó phù hợp với người thích thế cờ linh hoạt và muốn tránh các biến thể quá quen thuộc.

**Điểm mạnh:**
- Linh hoạt: có thể chọn tấn công (f4), chắc (Bc4) hoặc fianchetto (g3).
- Ít được đối thủ chuẩn bị nên có yếu tố bất ngờ.
- Mã c3 bảo vệ tốt e4 ngay từ đầu.

**Điểm yếu:**
- Mã c3 chắn tốt c, khó dựng trung tâm c3-d4 như Gambit Ý.
- Máy tính đánh giá thế cờ gần cân bằng, ưu thế rất nhỏ.
- Gambit f4 đòi hỏi tính toán chính xác, nếu sai Trắng dễ thiệt thòi.

### Gambit Vienna (3.f4)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nc3 Nf6 f4 d5 fxe5 Nxe4 Nf3 Be7 d4 O-O Bd3 f5` · tên Lichess: Vienna Game: Vienna Gambit, Breyer Variation · máy chấm +17 centipawn (Trắng dương)

**Ý tưởng:** Sau 2...Nf6 3.f4 d5 4.fxe5 Nxe4 5.Nf3, Trắng mở cột f để tấn công và cho Đen một tốt thừa trung tâm tạm thời. Đen phản công bằng ...Be7 và ...f5; Trắng có Tượng d3 và Hậu mạnh.

**Điểm mạnh:** Thế cờ sắc bén, Trắng có nhiều đòn tấn công. / Mã e4 của Đen dễ bị tấn công.

**Điểm yếu:** Trắng hiến tốt và Vua bị lộ nếu tấn công thất bại. / Đen có thể phản công mạnh bằng ...d5 sớm.

**Kế hoạch Trắng:** Phát triển nhanh Nf3, Bd3, nhập thành và tấn công Mã e4 cùng cột f.

**Kế hoạch Đen:** Giữ Mã e4 vững bằng ...f5, nhập thành và đổi quân để giảm tấn công.

**Lời khuyên:** Trong gambit, hãy tấn công Mã e4 ngay, đừng để Đen kịp củng cố.

### Biến thể Bc4

- [ ] Đã duyệt  · nước đi: `e4 e5 Nc3 Nf6 Bc4 Nxe4 Qh5 Nd6 Bb3 Be7 Nf3 Nc6 Nxe5 g6 Qf3 f5 d4` · tên Lichess: Vienna Game: Stanley Variation, Alekhine Variation · máy chấm +43 centipawn (Trắng dương)

**Ý tưởng:** Trắng đưa Tượng ra c4 nhắm vào f7, rồi sau khi Đen ăn e4 thì tấn công bằng Hậu h5. Đen phải phòng thủ chính xác nhưng có thể chống đỡ nhờ Mã d6 và ...g6.

**Điểm mạnh:** Hậu h5 gây áp lực cùng lúc lên e5 và f7. / Trắng phát triển nhanh quân.

**Điểm yếu:** Đen có thể đỡ chính xác và giữ tốt thừa. / Trắng phải tìm cách bù lại nếu Đen phòng thủ tốt.

**Kế hoạch Trắng:** Tấn công e5 và f7, ăn lại tốt e5 và chiếm trung tâm bằng d4.

**Kế hoạch Đen:** Đưa Mã về d6, phát triển Tượng e7 và ...g6 để đuổi Hậu.

**Lời khuyên:** Hậu chỉ đi sớm khi nó tạo ra hai mối đe dọa cùng lúc; Qh5 đe dọa cả e5 lẫn f7.

### Biến thể g3 (Fianchetto)

- [ ] Đã duyệt  · nước đi: `e4 e5 Nc3 Nf6 g3 d5 exd5 Nxd5 Bg2 Nxc3 bxc3 Bd6 Nf3 O-O` · tên Lichess: Vienna Game: Mieses Variation · máy chấm +3 centipawn (Trắng dương)

**Ý tưởng:** Trắng không tấn công mà fianchetto Tượng ra g2 để canh đường chéo dài a8-h1. Thế cờ yên tĩnh, Trắng có ưu thế rất nhỏ về không gian và cấu trúc.

**Điểm mạnh:** Thế cờ an toàn, ít rủi ro. / Tượng g2 hoạt động mạnh sau khi trung tâm mở.

**Điểm yếu:** Thế cờ gần như cân bằng, ít cơ hội tấn công nhanh. / Cấu trúc tốt Trắng sau bxc3 bị đôi.

**Kế hoạch Trắng:** Nhập thành, Nf3 và d3 rồi chơi theo thế trung tâm.

**Kế hoạch Đen:** Phát triển Bd6, nhập thành, phản công trung tâm bằng ...Nc6.

**Lời khuyên:** Thế cờ yên tĩnh đòi hỏi hiểu cấu trúc tốt hơn là tính toán.

---

## Phòng thủ Hà Lan (Dutch Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A80-A99 · 3 biến thể · 10 puzzle

**Câu giới thiệu:** Đen đẩy tốt f lên f5 ngay từ đầu để kiểm soát ô e4 và tạo thế tấn công vào cánh vua.

**Ý tưởng:**
- Thay vì chiếm trung tâm bằng d5, Đen đặt tốt f5 để kiểm soát ô e4. Đây là cách chống d4 rất khác thường: Đen muốn thế cờ không đối xứng và tìm đòn tấn công vào Vua Trắng, nhất là khi Trắng mở thế.
- Cái giá phải trả là cánh vua Đen yếu đi (tốt f5 đã rời hàng 7, mở đường chéo a2-g8 cho Tượng Trắng) và ô e6 trở nên yếu. Tùy cách xếp quân (Leningrad với ...g6, Cổ điển với ...e6, Stonewall với ...d5) mà Đen chọn kế hoạch khác nhau.

**Điểm mạnh:**
- Kiểm soát e4 từ nước đầu và thế cờ không đối xứng, giàu cơ hội phản công.
- Đen có kế hoạch tấn công cánh vua rõ ràng khi Trắng chơi chậm.
- Các cấu trúc (Stonewall, Leningrad) đều có kế hoạch riêng, dễ hiểu một khi đã quen.

**Điểm yếu:**
- Tốt f5 làm yếu cánh vua và đường chéo a2-g8, Trắng có thể tấn công bằng Gambit Staunton (e4).
- Ô e6 và Tượng c8 dễ bị yếu trong cấu trúc Stonewall.
- Máy tính thường đánh giá Trắng có lợi thế nhỏ.

### Leningrad (...g6)

- [ ] Đã duyệt  · nước đi: `d4 f5 g3 Nf6 Bg2 g6 Nf3 Bg7 O-O O-O c4 d6 Nc3 Qe8` · tên Lichess: Dutch Defense: Semi-Leningrad Variation · máy chấm +80 centipawn (Trắng dương)

**Ý tưởng:** Đen fianchetto Tượng f8 ra g7, kết hợp tốt f5 và d6 để có thế cờ linh hoạt. Tượng g7 bảo vệ cánh vua và chuẩn bị ...e5 để mở thế cờ.

**Điểm mạnh:** Tượng g7 mạnh khi thế cờ mở ra bằng ...e5. / Cánh vua Đen được bảo vệ bởi tốt g6 và Tượng.

**Điểm yếu:** Ô e6 yếu và đường chéo a2-g8 cho Tượng Trắng. / Trắng có thể chặn ...e5 bằng d5 và không gian cánh Hậu.

**Kế hoạch Trắng:** Dựng thế cờ chắc bằng c4, Nc3, d5 để khóa Tượng g7, rồi tấn công cánh Hậu.

**Kế hoạch Đen:** Chuẩn bị ...e5 hoặc ...c6/...Nc6, đưa Hậu ra e8 để hỗ trợ ...Nh5/...g5 và tấn công cánh vua.

**Lời khuyên:** Mục tiêu của Leningrad là ...e5: nếu bạn phá được trung tâm bằng e5, Tượng g7 sẽ phát huy sức mạnh.

### Cổ điển (...e6)

- [ ] Đã duyệt  · nước đi: `d4 f5 g3 Nf6 Bg2 e6 Nf3 Be7 O-O O-O c4 d6 Nc3 Qe8` · tên Lichess: Dutch Defense: Classical Variation, Ilyin-Zhenevsky Variation · máy chấm +81 centipawn (Trắng dương)

**Ý tưởng:** Đen củng cố trung tâm bằng ...e6 và đưa Tượng f8 ra e7. Hậu cũng thường ra e8 để chuẩn bị ...Qh5 hoặc ...Ne4. Đây là cách chơi chắc chắn nhưng hơi bị động.

**Điểm mạnh:** Cấu trúc vững chắc, ít điểm yếu rõ rệt. / Hậu e8 và Mã f6 hỗ trợ tấn công cánh vua.

**Điểm yếu:** Tượng c8 bị chắn bởi tốt d6/e6. / Cánh vua yếu nếu Trắng mở thế cờ.

**Kế hoạch Trắng:** Đưa Mã ra c3, tấn công cánh Hậu bằng b4-a4 hoặc mở thế bằng e4.

**Kế hoạch Đen:** Đưa Hậu ra e8, đánh Mã e4 hoặc tấn công cánh vua bằng ...Qh5 và ...g5.

**Lời khuyên:** Hậu e8 giúp tấn công cánh vua; nhưng đừng bỏ qua phòng thủ cánh Hậu.

### Stonewall (...d5)

- [ ] Đã duyệt  · nước đi: `d4 f5 c4 Nf6 Nc3 e6 Nf3 d5 e3 c6 Bd3 Bd6` · tên Lichess: Dutch Defense: Queen's Knight Variation · máy chấm +48 centipawn (Trắng dương)

**Ý tưởng:** Đen dựng "bức tường đá" bằng tốt c6, d5, e6, f5. Cấu trúc rất chắc nhưng ô e5 trở thành ô yếu của Trắng (Mã) và Tượng c8 bị chắn bên trong. Đen thường chơi ...Bd6 và tấn công cánh vua.

**Điểm mạnh:** Cấu trúc tốt vững chắc, kiểm soát e4. / Đen có kế hoạch rõ: Bd6, Ne4, Qf6/g5 tấn công cánh vua.

**Điểm yếu:** Tượng c8 bị chắn và ô e5 là ô lỗ hổng cho Mã Trắng. / Ô e6 và đường chéo a2-g8 yếu.

**Kế hoạch Trắng:** Chiếm ô e5 bằng Mã, đổi Tượng ô trắng của Đen và tấn công cánh Hậu.

**Kế hoạch Đen:** Đặt Mã trên e4, nhập thành, tấn công cánh vua bằng Qf6, Bd6, g5.

**Lời khuyên:** Trong Stonewall, ô e4 là ô then chốt: Mã Đen ở e4 mạnh như một chốt chặn.

---

## Phòng thủ Pháp (French Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C00-C19 · 5 biến thể · 16 puzzle

**Câu giới thiệu:** Cấu trúc tốt chắc chắn, kế hoạch phản công rõ ràng: đánh vào chân chuỗi tốt của Trắng.

**Ý tưởng:**
- Đen đi e6 để chuẩn bị đẩy d5 với tốt e6 làm chỗ dựa. Sau d5, hai tốt d5 và e6 đứng sát nhau tạo thành một khối vững chắc ở trung tâm.
- Đổi lại, tượng c8 (Tượng ô trắng) bị chính các tốt đen chắn, nên thường là "Tượng xấu". Kế hoạch chính của Đen là đánh vào chân chuỗi tốt của Trắng bằng ...c5.

**Điểm mạnh:**
- Cấu trúc tốt vững, ít bị tấn công bất ngờ ở trung tâm.
- Kế hoạch phản công rõ ràng và dễ nhớ: ...c5 đánh vào d4, ...f6 đánh vào e5.
- Hay gây khó cho đối thủ không quen đánh thế cờ đóng.

**Điểm yếu:**
- Tượng c8 bị nhốt sau chuỗi tốt, mất thời gian để đưa ra ngoài.
- Trắng thường có nhiều không gian hơn nên Đen có thể bị chật.
- Các điểm yếu trên ô trắng (như ô e5, d5) có thể trở thành mục tiêu cho Trắng.

### Biến thể Tiến lên (Advance)

- [ ] Đã duyệt  · nước đi: `e4 e6 d4 d5 e5 c5 c3 Nc6 Nf3 Qb6 a3 c4` · tên Lichess: French Defense: Advance Variation, Main Line · máy chấm +39 centipawn (Trắng dương)

**Ý tưởng:** Trắng đẩy e5 để khóa trung tâm và lấy không gian. Đen đáp bằng ...c5 để đánh vào chân chuỗi tốt Trắng (d4), và nhanh chóng đặt áp lực lên đó.

**Điểm mạnh:** Kế hoạch của Đen rõ ràng và dễ nhớ: phá chân chuỗi tốt d4. / Đen có quân phát triển tự nhiên và phản công nhanh.

**Điểm yếu:** Trắng có không gian rộng hơn, Đen bị chật. / Tượng c8 vẫn còn bị tốt đen chắn.

**Kế hoạch Trắng:** Giữ chân chuỗi tốt d4, tấn công cánh vua (dùng không gian), và có thể đẩy f4 hoặc nhắm tới g4.

**Kế hoạch Đen:** Đánh vào d4 bằng ...c5, ...Nc6, ...Qb6; sau đó phá tốt e5 bằng ...f6 và đưa Tượng c8 ra ngoài.

**Lời khuyên:** Trong Advance, nếu d4 bị bắt buộc phải bảo vệ nhiều lần thì Trắng sẽ khó phát triển.

### Biến thể Tarrasch

- [ ] Đã duyệt  · nước đi: `e4 e6 d4 d5 Nd2 Nf6 e5 Nfd7 Bd3 c5 c3 Nc6 Ne2 cxd4 cxd4 f6` · tên Lichess: French Defense: Tarrasch Variation, Closed Variation, Main Line · máy chấm +38 centipawn (Trắng dương)

**Ý tưởng:** Trắng đưa Mã ra d2 thay vì c3 để không bị Tượng b4 của Đen ghim (như trong Winawer) và giữ tốt c2 để hỗ trợ d4 bằng c3.

**Điểm mạnh:** Thế cờ chắc, Trắng tránh được thế ghim khó chịu của Winawer. / Kế hoạch dễ hiểu cho cả hai bên.

**Điểm yếu:** Mã d2 chắn đường Tượng c1 nên Trắng phát triển hơi chậm. / Đen có thể phản công trung tâm nhanh bằng ...c5.

**Kế hoạch Trắng:** Củng cố d4 bằng c3 và Ne2, tấn công cánh vua với Tượng d3 và Hậu.

**Kế hoạch Đen:** Đánh vào d4 bằng ...c5, ...Nc6; sau khi trung tâm mở, dùng ...f6 để phá tốt e5.

**Lời khuyên:** Ne2 củng cố d4 mà không cản Tượng c1, thường tốt hơn Nf3.

### Biến thể Cổ điển (Classical)

- [ ] Đã duyệt  · nước đi: `e4 e6 d4 d5 Nc3 Nf6 Bg5 Be7 e5 Nfd7 Bxe7 Qxe7 f4 O-O Nf3 c5` · tên Lichess: French Defense: Classical Variation, Steinitz Variation · máy chấm +38 centipawn (Trắng dương)

**Ý tưởng:** Trắng phát triển Mã c3 và Tượng g5 theo nguyên lý khai cuộc. Đen đáp bằng thế cờ chắc chắn với ...Be7 và phản công vào tốt e5 hoặc d4.

**Điểm mạnh:** Quân phát triển tự nhiên cho cả hai bên. / Đen có nhiều cách phản công rõ ràng.

**Điểm yếu:** Trắng giữ nhiều không gian hơn. / Đen phải cẩn thận với đòn tấn công cánh vua bằng f4.

**Kế hoạch Trắng:** Củng cố e5 bằng f4 và tấn công cánh vua, hoặc khóa trung tâm rồi tìm cơ hội mở cánh Hậu.

**Kế hoạch Đen:** Phản công bằng ...c5, ...Nc6 và ...f6 để phá chuỗi tốt Trắng; giữ cặp Tượng khi có thể.

**Lời khuyên:** Trong Cổ điển, Đen cần phá chuỗi tốt bằng ...c5 và ...f6 trước khi Trắng kịp tấn công cánh vua.

### Biến thể Winawer

- [ ] Đã duyệt  · nước đi: `e4 e6 d4 d5 Nc3 Bb4 e5 c5 a3 Bxc3+ bxc3 Ne7 Qg4 Qc7` · tên Lichess: French Defense: Winawer Variation, Poisoned Pawn Variation · máy chấm +72 centipawn (Trắng dương)

**Ý tưởng:** Đen ghim Mã c3 bằng Tượng b4, tăng áp lực lên e4 và d4. Trắng thường đẩy e5 và để Đen đổi Tượng lấy Mã, tạo tốt đôi ở cột c. Đổi lại Trắng có cặp Tượng và tấn công cánh vua.

**Điểm mạnh:** Đen gây áp lực mạnh lên trung tâm Trắng ngay từ đầu. / Đen phản công tốt ở cánh Hậu nhờ tốt đôi c của Trắng.

**Điểm yếu:** Cánh vua của Đen yếu hơn (ô đen), đặc biệt tốt g7 có thể bị tấn công. / Lý thuyết sâu, đòi hỏi ghi nhớ nhiều.

**Kế hoạch Trắng:** Dùng cặp Tượng và tấn công cánh vua với Qg4; tốt đôi cột c có thể mạnh hơn nó trông.

**Kế hoạch Đen:** Tấn công các tốt đôi c3, c2, phát triển Mã đến e7-f5 hoặc c6, và giữ cho cánh vua an toàn.

**Lời khuyên:** Đen có thể chọn phòng thủ g7 (…O-O) hoặc hy sinh tốt (…Qc7). Mỗi cách đều có lý thuyết riêng.

### Biến thể Đổi (Exchange)

- [ ] Đã duyệt  · nước đi: `e4 e6 d4 d5 exd5 exd5 Nf3 Nf6 Bd3 Bd6 O-O O-O` · tên Lichess: French Defense: Exchange Variation · máy chấm +24 centipawn (Trắng dương)

**Ý tưởng:** Trắng đổi tốt e4 lấy d5 để có cấu trúc đối xứng. Thế cờ đơn giản, ít rủi ro cho cả hai bên, nhưng cũng ít cơ hội thắng nhanh.

**Điểm mạnh:** Thế cờ rõ ràng, dễ chơi cho cả hai bên. / Đen có Tượng c8 tự do (không bị chắn nữa).

**Điểm yếu:** Thế cờ đối xứng nên dễ hòa. / Đen mất đi lợi thế "cấu trúc phản công" của Pháp thông thường.

**Kế hoạch Trắng:** Phát triển nhanh quân nhẹ, nhập thành sớm và tận dụng cột e.

**Kế hoạch Đen:** Phát triển Tượng c8 ra ngoài (g4 hoặc f5), chiếm cột e và đổi bớt quân.

**Lời khuyên:** Cẩn thận: Exchange nhàm chán, nhưng Đen phải chủ động để không bị chiếm cột e.

---

## Phòng thủ Slav (Slav Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO D10-D19 · 3 biến thể · 11 puzzle

**Câu giới thiệu:** Đáp lại Gambit Hậu bằng tốt c6: giữ vững d5 mà không nhốt Tượng c8. Chắc chắn và đáng tin cậy.

**Ý tưởng:**
- Đen bảo vệ tốt d5 bằng tốt c6 thay vì tốt e6 (như Gambit Hậu từ chối). Nhờ vậy đường chéo của Tượng c8 vẫn mở, và Đen có thể đưa Tượng ra f5 hoặc g4 trước khi đóng cửa bằng ...e6.
- Nếu Trắng chiếm lấy tốt c4 thì Đen ăn trước (…dxc4) rồi giữ tốt thừa bằng ...b5 hoặc phát triển Tượng nhanh. Trong Semi-Slav, Đen đi ...e6 sớm để tạo thế cờ phức tạp hơn.

**Điểm mạnh:**
- Tượng c8 không bị nhốt: nó ra f5/g4 trước khi đóng bằng e6.
- Cấu trúc tốt chắc chắn, ít điểm yếu.
- Có nhiều hướng chơi: Slav chuẩn (chắc) và Semi-Slav (sắc bén).

**Điểm yếu:**
- Đen hơi bị động, Trắng thường có chút không gian.
- Tốt c6 lấy mất ô tự nhiên của Mã b8 (ô c6), nên Mã thường ra d7.
- Một số biến Semi-Slav cực kỳ phức tạp và đòi hỏi học thuộc nhiều.

### Slav chuẩn (Tượng ra f5)

- [ ] Đã duyệt  · nước đi: `d4 d5 c4 c6 Nf3 Nf6 Nc3 dxc4 a4 Bf5 e3 e6 Bxc4 Bb4 O-O Nbd7` · tên Lichess: Slav Defense: Czech Variation, Dutch Variation · máy chấm +46 centipawn (Trắng dương)

**Ý tưởng:** Đen ăn tốt c4, đưa Tượng c8 ra f5 rồi đóng cửa bằng ...e6. Đen tạm giữ tốt thừa nhưng thường phải trả lại. Mục tiêu chính là có thế cờ vững và Tượng đẹp.

**Điểm mạnh:** Tượng c8 ra ngoài chuỗi tốt, thế cờ vững. / Cấu trúc tốt chắc, kế hoạch dễ hiểu.

**Điểm yếu:** Trắng lấy lại tốt dễ dàng và có chút không gian. / Đen hơi bị động, phải chính xác về thứ tự nước.

**Kế hoạch Trắng:** Lấy lại tốt c4 bằng Bxc4, nhập thành, rồi mở rộng bằng e4 hoặc Qe2/Rd1.

**Kế hoạch Đen:** Phát triển Mã d7, nhập thành, rồi đẩy ...c5 hoặc ...e5 để giải phóng thế cờ.

**Lời khuyên:** Trong Slav, Tượng c8 phải ra ngoài TRƯỚC khi Đen đi ...e6.

### Semi-Slav Meran

- [ ] Đã duyệt  · nước đi: `d4 d5 c4 c6 Nf3 Nf6 Nc3 e6 e3 Nbd7 Bd3 dxc4 Bxc4 b5 Bd3 a6 e4 c5` · tên Lichess: Semi-Slav Defense: Meran Variation · máy chấm +24 centipawn (Trắng dương)

**Ý tưởng:** Đen đi ...e6 sớm (nhốt Tượng c8) để đổi lấy cấu trúc tốt chắc và đòn phản công ở cánh Hậu bằng ...b5 và ...c5. Là hệ thống sắc bén và phức tạp.

**Điểm mạnh:** Đen có phản công mạnh ở cánh Hậu (b5, c5). / Cấu trúc tốt chắc chắn và có nhiều ý tưởng.

**Điểm yếu:** Tượng c8 bị nhốt lâu. / Lý thuyết rất dài và sắc bén.

**Kế hoạch Trắng:** Đẩy e4 phá trung tâm, hoặc tấn công cánh vua; tận dụng Tượng d3 và c4.

**Kế hoạch Đen:** Dùng ...b5 và ...c5 mở rộng cánh Hậu; giải phóng Tượng c8 bằng ...Bb7 hoặc ...Bb7.

**Lời khuyên:** Trong Meran, Đen đổi một tốt (c4) để lấy không gian cánh Hậu. Hãy tính cẩn thận.

### Slav Đổi (Exchange)

- [ ] Đã duyệt  · nước đi: `d4 d5 c4 c6 cxd5 cxd5 Nc3 Nf6 Bf4 Nc6 e3 Bf5 Nf3 e6` · tên Lichess: Slav Defense: Exchange Variation · máy chấm +25 centipawn (Trắng dương)

**Ý tưởng:** Trắng đổi tốt c4 lấy d5 để có cấu trúc đối xứng đơn giản. Thế cờ ít rủi ro nhưng Đen phải chủ động để không bị chật.

**Điểm mạnh:** Thế cờ đối xứng, rõ ràng và dễ hiểu. / Đen có thể phát triển Tượng ra f5 an toàn.

**Điểm yếu:** Dễ hòa vì cấu trúc đối xứng. / Trắng có chút thời gian hơn vì được đi trước.

**Kế hoạch Trắng:** Chiếm cột c, đưa Hậu b3 và Xe c1 để gây áp lực; phát triển Tượng f4.

**Kế hoạch Đen:** Đưa Tượng ra f5 trước khi đóng ...e6, đổi quân để giảm áp lực, và nhập thành.

**Lời khuyên:** Trong Exchange Slav, ai chiếm cột c trước sẽ có lợi thế nhỏ.

---

## Phòng thủ Ấn Độ Hậu (Queen's Indian Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO E12-E19 · 3 biến thể · 9 puzzle

**Câu giới thiệu:** Fianchetto Tượng ô trắng ra b7 để kiểm soát ô e4: thế cờ vững, ít rủi ro, rất tốt để hiểu cấu trúc trung tâm.

**Ý tưởng:**
- Sau 3.Nf3 (thay vì 3.Nc3 cho phép Nimzo-Ấn Độ), Đen đẩy b6 và đưa Tượng c8 ra b7. Tượng b7 nhìn thẳng xuống đường chéo dài a8-h1, kiểm soát ô e4 và nhắm vào trung tâm của Trắng. Cùng với Mã f6, Đen kiểm soát e4 bằng hai quân nên Trắng khó đẩy e4.
- Đen không cố giành không gian trung tâm mà kiểm soát nó từ xa rồi chờ thời điểm phản công bằng ...c5 hoặc ...d5. Khai cuộc này đòi hỏi bạn hiểu cách đối phó với cả ba kế hoạch của Trắng (g3, a3, e3) nhưng bộ khung quân đi khá giống nhau.

**Điểm mạnh:**
- Thế cờ rất vững, Đen ít khi bị tấn công.
- Kiểm soát e4 bằng Tượng b7 và Mã f6, Trắng khó dựng trung tâm lớn.
- Dễ tìm kế hoạch: nhập thành, ...d5 hoặc ...c5, đổi quân.

**Điểm yếu:**
- Thế cờ hay dẫn đến hòa nếu Trắng chơi chính xác.
- Đen ít cơ hội tấn công nhanh vì chọn lối chơi chắc.
- Khi Trắng chiếm được trung tâm bằng d5 hoặc e4 thì Tượng b7 có thể bị chặn.

### Biến thể Fianchetto (g3)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 Nf3 b6 g3 Bb7 Bg2 Be7 O-O O-O Nc3 Ne4 Qc2 Nxc3 Qxc3 c5` · tên Lichess: Queen's Indian Defense: Classical Variation, Traditional Variation, Main Line · máy chấm +40 centipawn (Trắng dương)

**Ý tưởng:** Trắng đưa Tượng ra g2 để đối mặt Tượng b7. Hai bên đều có Tượng nhìn thẳng xuống đường chéo dài, nên cuộc chiến xoay quanh ô e4 và d5. Đen thường đổi Mã c3 bằng ...Ne4 để giải tỏa.

**Điểm mạnh:** Thế cờ cân bằng, vững chắc cho cả hai bên. / Đen có kế hoạch rõ ràng với ...Ne4 và ...c5.

**Điểm yếu:** Trắng có Tượng g2 mạnh nếu trung tâm mở ra. / Đen phải cẩn thận để không bị chật sau khi đổi Mã.

**Kế hoạch Trắng:** Nhập thành, Nc3, rồi chuẩn bị d5 hoặc e4 để chiếm không gian.

**Kế hoạch Đen:** Đổi Mã c3 bằng ...Ne4, đánh vào d4 bằng ...c5 và giữ Tượng b7 hoạt động.

**Lời khuyên:** Khi đổi Mã c3 bằng ...Ne4, hãy chắc chắn Hậu Trắng không đánh được vào f7 hay b7.

### Biến thể Petrosian (a3)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 Nf3 b6 a3 Bb7 Nc3 d5 cxd5 Nxd5 e3 Be7 Bb5+ c6 Bd3 Nxc3 bxc3 Nd7` · tên Lichess: Queen's Indian Defense: Kasparov-Petrosian Variation, Petrosian Attack · máy chấm +17 centipawn (Trắng dương)

**Ý tưởng:** Trắng chơi a3 để ngăn Tượng đen ra b4 và chuẩn bị Nc3 với trung tâm mở rộng hơn. Đen thường đáp bằng ...d5, mở thế cờ ngay và Tượng b7 hoạt động mạnh trên đường chéo dài.

**Điểm mạnh:** Đen có thế cờ thoải mái, ít bị chật. / Tượng b7 mạnh khi trung tâm mở.

**Điểm yếu:** Trắng có Bb5+ và cấu trúc tốt đa dạng. / Đen phải cẩn thận không để tốt đôi c3 hình thành bất lợi.

**Kế hoạch Trắng:** Chiếm trung tâm bằng e3, đổi quân và dùng cặp Tượng.

**Kế hoạch Đen:** Đẩy d5, đổi Mã c3 để Trắng có tốt đôi c, và dùng Tượng b7 gây áp lực.

**Lời khuyên:** Sau a3, đừng sợ tốt đôi của Trắng: tốt đôi chỉ yếu khi bạn nhắm vào nó.

### Biến thể Cổ điển (e3)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 Nf3 b6 e3 Bb7 Bd3 d5 O-O Bd6 b3 O-O Bb2 Nbd7 Nbd2` · tên Lichess: Queen's Indian Defense, with e3 · máy chấm +0 centipawn (Trắng dương)

**Ý tưởng:** Trắng chơi vững với e3, Bd3, nhập thành, b3 và Bb2 (kiểu Colle-Zukertort). Đen đáp bằng ...d5 và ...Bd6 hoặc ...Be7, chuẩn bị nhập thành và phản công.

**Điểm mạnh:** Trắng có thế cờ vững chắc, ít rủi ro. / Đen có nhiều kế hoạch phản công.

**Điểm yếu:** Thế cờ hơi bị động cho cả hai bên. / Trắng có Tượng d3 nhắm vào cánh vua.

**Kế hoạch Trắng:** Dựng trung tâm bằng d4, c4, nhập thành rồi đẩy e4 hoặc tấn công cánh vua.

**Kế hoạch Đen:** Chiếm trung tâm bằng ...d5, đưa Tượng ra d6, nhập thành và tìm ...c5 hoặc ...e5.

**Lời khuyên:** Khi Trắng chơi vững, Đen cần chủ động tìm kế hoạch phản công, đừng đợi.

---

## Tấn công Trompowsky (Trompowsky Attack)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A45 · 3 biến thể · 7 puzzle

**Câu giới thiệu:** Đưa Tượng ra g5 ngay nước thứ hai để ghim Mã f6: tránh lý thuyết dày đặc và đặt câu hỏi sớm cho Đen.

**Ý tưởng:**
- Đối với 1.d4 Nf6, hầu hết người chơi tiếp tục bằng 2.c4 (Gambit Hậu, Ấn Độ). Trompowsky đi khác: Trắng đưa Tượng c1 ra g5 để nhắm vào Mã f6. Tượng ra ngoài chuỗi tốt sớm, Đen phải quyết định ngay: đuổi Tượng, đánh vào Tượng hay chấp nhận đổi nó lấy Mã.
- Cái giá của ý tưởng này là Trắng có thể mất nhịp phát triển (Tượng đi hai lần) hoặc phải chấp nhận tốt đôi trên cột f hay cột g của Đen. Đổi lại, Đen không dễ theo lý thuyết quen thuộc, và nhiều đối thủ bị bất ngờ.

**Điểm mạnh:**
- Tránh được lý thuyết nặng của Gambit Hậu và Ấn Độ Vua.
- Ý tưởng rõ ràng: tạo tốt đôi cho Đen hoặc dùng cặp Tượng.
- Phù hợp với người thích thế cờ khác thường và linh hoạt.

**Điểm yếu:**
- Đen có nhiều cách đáp, mỗi cách đòi hỏi kế hoạch khác nhau.
- Trắng có thể mất nhịp nếu Tượng bị đuổi nhiều lần.
- Nếu Đen biết cách (ví dụ ...Ne4 rồi ...d5), thế cờ rất cân bằng.

### Đen đáp ...Ne4

- [ ] Đã duyệt  · nước đi: `d4 Nf6 Bg5 Ne4 Bf4 d5 e3 Bf5 Bd3 Nd7 Nd2 e6 Ngf3 Bd6` · tên Lichess: Trompowsky Attack · máy chấm -6 centipawn (Trắng dương)

**Ý tưởng:** Đen đưa Mã vào e4 để đánh vào Tượng g5. Trắng lùi Tượng về f4, Đen dựng thế cờ vững bằng ...d5 và ...Bf5. Thế cờ cân bằng, cả hai bên phát triển tự nhiên.

**Điểm mạnh:** Đen chiếm trung tâm và phát triển tốt. / Tượng f4 vẫn hoạt động tích cực.

**Điểm yếu:** Trắng mất một nhịp vì Tượng đi hai lần. / Đen có thế cờ thoải mái.

**Kế hoạch Trắng:** Phát triển Nd2 để đổi Mã e4, Bd3 và nhập thành; dùng Tượng f4 nhắm vào c7.

**Kế hoạch Đen:** Giữ Mã e4 vững, phát triển Bf5, Nd7 và dựng ...e6 hoặc ...c5.

**Lời khuyên:** Đổi Mã e4 bằng Nd2 để hóa giải ưu thế không gian của Đen.

### Đen đáp ...e6 (Bxf6)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 Bg5 e6 e4 h6 Bxf6 Qxf6 Nc3 d6 Nf3 Nd7 Qd2 c5` · tên Lichess: Trompowsky Attack: Classical Defense, Big Center Variation · máy chấm +47 centipawn (Trắng dương)

**Ý tưởng:** Đen đáp ...e6 để Hậu d8 nhắm vào g5; sau e4 và h6, Trắng ăn Mã f6 và Hậu đen ăn lại. Cả hai bên đổi Tượng lấy Mã, Trắng có trung tâm e4-d4 nhưng Đen có thế cờ vững.

**Điểm mạnh:** Trắng có trung tâm e4-d4 lớn. / Thế cờ dễ hiểu, Trắng nhiều không gian.

**Điểm yếu:** Đen có cặp Tượng sau khi đổi. / Hậu đen ra sớm có thể bị đuổi.

**Kế hoạch Trắng:** Phát triển Nc3, Nf3, Hậu d2 rồi nhập thành dài và tấn công cánh vua.

**Kế hoạch Đen:** Dựng thế bằng ...d6, ...Nd7, ...c5 để phá trung tâm, cặp Tượng tạo lợi thế dài hạn.

**Lời khuyên:** Khi đổi Tượng lấy Mã mà bạn có trung tâm, hãy tận dụng không gian để phát triển nhanh.

### Đen đáp ...d5

- [ ] Đã duyệt  · nước đi: `d4 Nf6 Bg5 d5 Bxf6 exf6 e3 Be6 Bd3 Bd6 Qh5 g6` · tên Lichess: Trompowsky Attack · máy chấm -36 centipawn (Trắng dương)

**Ý tưởng:** Đen chiếm trung tâm bằng d5. Trắng ăn Mã f6, Đen ăn lại bằng tốt tạo cấu trúc tốt f6 hơi yếu. Trắng có Tượng d3, Hậu h5 nhắm vào h7 và cánh vua Đen.

**Điểm mạnh:** Trắng nhắm vào cánh vua Đen bằng Bd3 và Qh5. / Cấu trúc tốt f6 của Đen hơi yếu.

**Điểm yếu:** Đen có cặp Tượng và thế cờ vững. / Trắng khó giành ưu thế rõ rệt.

**Kế hoạch Trắng:** Nhập thành dài, tấn công cánh vua với Bd3, Qh5 và Ne2.

**Kế hoạch Đen:** Dùng cặp Tượng, ...Bd6, ...g6 để đuổi Hậu và ...Nd7, nhập thành.

**Lời khuyên:** Khi đối phương có tốt yếu, hãy nhắm vào đó bằng quân nhẹ và Hậu.

---

## Gambit Vua (King's Gambit)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO C30-C39 · 5 biến thể · 11 puzzle

**Câu giới thiệu:** Hy sinh một tốt ở cánh vua để phá trung tâm Đen và mở cột f: khai cuộc của thời Lãng mạn, đầy đòn tấn công.

**Ý tưởng:**
- Gambit (hiến quân) là cách chơi bỏ một quân hoặc tốt ở khai cuộc để đổi lấy nhịp phát triển và thế tấn công. Ở Gambit Vua, Trắng đẩy tốt f lên f4, đề nghị Đen ăn. Nếu Đen ăn tốt f4, Trắng mất tốt cánh vua nhưng có thể chiếm trung tâm bằng d4 và mở cột f cho Xe tấn công f7.
- Cái giá phải trả là Vua Trắng bị lộ trên đường chéo e1-h4 (Hậu đen có thể chiếu từ h4) và Trắng thiếu một tốt. Máy tính hiện đại thường đánh giá Đen có lợi thế nhỏ, vì vậy khai cuộc này chủ yếu hợp với người thích chơi tấn công và tính toán.

**Điểm mạnh:**
- Thế cờ sắc bén, nhiều đòn chiến thuật; rất tốt để luyện kỹ năng tấn công.
- Mở cột f và cho Trắng nhịp phát triển nhanh nếu Đen đỡ chậm.
- Đối phương ít gặp nên có thể không quen các nước chính xác.

**Điểm yếu:**
- Trắng mất một tốt và Vua bị lộ nên nếu tấn công thất bại sẽ thua cờ tàn.
- Nếu Đen biết các nước chính xác, máy tính cho rằng Đen có lợi thế nhỏ.
- Cần học khá nhiều nước đi vì mỗi cách đáp của Đen mang một thế cờ khác nhau.

### Gambit Kieseritzky (3.Nf3 g5 4.h4)

- [ ] Đã duyệt  · nước đi: `e4 e5 f4 exf4 Nf3 g5 h4 g4 Ne5 Nf6 Nxg4` · tên Lichess: King's Gambit Accepted: Kieseritzky Gambit, Berlin Defense · máy chấm -37 centipawn (Trắng dương)

**Ý tưởng:** Đen nhận tốt gambit rồi giữ tốt thừa bằng ...g5. Trắng tấn công chuỗi tốt g5 bằng h4 và đưa Mã vào e5. Đây là thế cờ rất sắc, cả hai bên đều có đòn tấn công.

**Điểm mạnh:** Mã e5 rất mạnh ở trung tâm, đe dọa tốt g4 và f7. / Thế cờ mở, Trắng có nhiều đòn tấn công.

**Điểm yếu:** Vua Trắng bị lộ, Đen có thể chiếu ...Qh4+ hoặc ...Qe7. / Trắng mất tốt thừa và phải bù lại bằng tấn công.

**Kế hoạch Trắng:** Lấy lại tốt bằng Nxg4 hoặc Bxf4, chiếm trung tâm bằng d4 và tấn công bằng Tượng c4.

**Kế hoạch Đen:** Giữ tốt thừa, phát triển Mã f6 và đổi Mã e5 bằng ...Nc6 hoặc ...d6.

**Lời khuyên:** Trong gambit, bạn phải tính chính xác. Nếu không nhận ra đòn Qh4+ thì tấn công sẽ sụp.

### Phòng thủ Cunningham (3...Be7)

- [ ] Đã duyệt  · nước đi: `e4 e5 f4 exf4 Nf3 Be7 Bc4 Nf6 e5 Ng4 O-O` · tên Lichess: King's Gambit Accepted: Cunningham Defense, McCormick Defense · máy chấm -12 centipawn (Trắng dương)

**Ý tưởng:** Đen nhận tốt nhưng không giữ tốt thừa bằng ...g5; thay vào đó đưa Tượng ra e7 để ngăn các đòn tấn công và chờ cơ hội chiếu bằng ...Bh4+. Nếu Trắng đi Bc4, thế cờ trở nên linh hoạt cho cả hai bên.

**Điểm mạnh:** Đen phòng thủ chắc chắn, giữ tốt thừa mà ít rủi ro. / Tượng e7 bảo vệ Vua và chuẩn bị ...Bh4+.

**Điểm yếu:** Đen phát triển chậm hơn so với biến thể chính. / Trắng có cơ hội tấn công qua cột f nếu Đen mất nhịp.

**Kế hoạch Trắng:** Phát triển Tượng c4, nhập thành sớm và đẩy e5 để đuổi Mã f6.

**Kế hoạch Đen:** Nhập thành, ...d6, ...Nc6 và giữ tốt thừa trong khi tránh các đòn chiếu bất ngờ.

**Lời khuyên:** Khi Trắng nhập thành, Đen đã tránh được ...Bh4+ nên Trắng hoàn toàn an toàn.

### Gambit Tượng (3.Bc4)

- [ ] Đã duyệt  · nước đi: `e4 e5 f4 exf4 Bc4 Nf6 Nc3 c6 Nf3 d5 exd5 cxd5 Bb3` · tên Lichess: King's Gambit Accepted: Bishop's Gambit, Bogoljubow Defense · máy chấm -78 centipawn (Trắng dương)

**Ý tưởng:** Trắng phát triển Tượng c4 ngay lập tức, nhắm vào f7 và đe dọa chiếu ...Qh4+ bị chặn. Đen thường đáp bằng ...Nf6, ...c6 và ...d5 để phá trung tâm Trắng.

**Điểm mạnh:** Tượng c4 nhắm vào f7, điểm yếu của Đen. / Trắng phát triển nhanh và có nhiều lựa chọn tấn công.

**Điểm yếu:** Đen có thể chiếu ...Qh4+ bất ngờ nếu Trắng không chú ý. / Trắng vẫn thiếu một tốt trong khi Đen phát triển đủ nhanh.

**Kế hoạch Trắng:** Phát triển Mã c3 và f3, giữ Tượng c4 mạnh và tìm cơ hội tấn công cột f.

**Kế hoạch Đen:** Phản công vào trung tâm bằng ...c6 và ...d5, giữ tốt thừa và đổi quân khi có thể.

**Lời khuyên:** Tượng c4 mạnh nhưng sẽ bị đuổi bởi ...d5; hãy chuẩn bị Bb3 để giữ nó.

### Từ chối gambit (2...Bc5)

- [ ] Đã duyệt  · nước đi: `e4 e5 f4 Bc5 Nf3 d6 c3 Nf6 d4 exd4 cxd4 Bb6` · tên Lichess: King's Gambit Declined: Classical Variation · máy chấm +6 centipawn (Trắng dương)

**Ý tưởng:** Đen không nhận tốt mà phát triển Tượng ra c5, nhắm vào f2 và g1. Thế cờ hay chuyển sang kiểu Ý hoặc Vienna. Trắng phát triển tự nhiên, dựng trung tâm bằng c3 và d4.

**Điểm mạnh:** Đen phát triển nhanh mà không mất tốt. / Tượng c5 nhắm vào f2 và g1.

**Điểm yếu:** Trắng không có đòn tấn công trực tiếp. / Đen có thể chiếm thế chủ động nếu Trắng chơi chậm.

**Kế hoạch Trắng:** Chiếm trung tâm bằng c3, d4; sau đó tấn công cột f hoặc cánh vua.

**Kế hoạch Đen:** Phát triển Mã f6, giữ trung tâm e5 bằng ...d6 và nhập thành.

**Lời khuyên:** Khi Đen từ chối gambit, hãy chơi như khai cuộc thường: phát triển và chiếm trung tâm.

### Phản gambit Falkbeer (2...d5)

- [ ] Đã duyệt  · nước đi: `e4 e5 f4 d5 exd5 e4 d3 Nf6 dxe4 Nxe4 Nf3 Bc5` · tên Lichess: King's Gambit Declined: Falkbeer Countergambit, Charousek Gambit Accepted · máy chấm +81 centipawn (Trắng dương)

**Ý tưởng:** Đen không nhận mà phản công ngay vào trung tâm bằng ...d5. Nếu Trắng ăn d5 thì Đen đẩy ...e4, giành nhịp và không gian. Trắng phải chính xác để giữ tốt thừa mà không mất thế chủ động.

**Điểm mạnh:** Đen có đòn phản công mạnh và nhiều không gian. / Thế cờ sắc bén, cả hai bên đều có đòn chiến thuật.

**Điểm yếu:** Đen phải tính chính xác, nếu không sẽ thua tốt. / Trắng có thể giữ tốt thừa và chuyển sang cờ tàn thuận lợi.

**Kế hoạch Trắng:** Trả tốt khi cần, phát triển nhanh và giữ Vua an toàn, nhập thành sớm.

**Kế hoạch Đen:** Dùng không gian và nhịp để tấn công trước khi Trắng nhập thành.

**Lời khuyên:** Trong phản gambit, nhịp phát triển quan trọng hơn tốt thừa.

---

## Khai cuộc Catalan (Catalan Opening)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO E01-E09 · 3 biến thể · 8 puzzle

**Câu giới thiệu:** Gambit Hậu kết hợp fianchetto: Tượng g2 gây áp lực dài hạn lên ô d5 và cánh Hậu Đen.

**Ý tưởng:**
- Trắng lấy ý tưởng của Gambit Hậu (c4, d4) nhưng thay vì đưa Mã ra c3 và Tượng ra g5, Trắng fianchetto Tượng f1 ra g2. Từ g2 Tượng nhìn xuống đường chéo dài a8-h1, đánh vào ô d5 và đặc biệt vào ô b7, gây áp lực lâu dài lên cánh Hậu Đen.
- Khai cuộc này không có đòn tấn công bất ngờ mà dựa vào ưu thế nhỏ nhưng bền vững: Tượng g2 mạnh, Trắng có không gian hơn một chút và Đen khó giải phóng. Muốn chơi tốt cần hiểu kế hoạch hơn là học thuộc nước đi.

**Điểm mạnh:**
- Thế cờ vững chắc, Vua Trắng an toàn sau khi nhập thành.
- Tượng g2 hoạt động mạnh trên đường chéo dài suốt cả ván.
- Máy tính cũng đánh giá Trắng có ưu thế nhỏ trong nhiều biến thể.

**Điểm yếu:**
- Ưu thế nhỏ và đòi hỏi kiên nhẫn: nếu thiếu kế hoạch, thế cờ nhanh chóng cân bằng.
- Đen có nhiều lựa chọn (đóng, mở, ...Bb4+), mỗi nhánh cần hiểu riêng.
- Tốt c4 có thể bị Đen ăn (Catalan mở) và Trắng phải lấy lại chính xác.

### Catalan mở (...dxc4)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 g3 d5 Bg2 Be7 Nf3 O-O O-O dxc4 Qc2 a6 Qxc4 b5 Qc2 Bb7 Bd2 Be4` · tên Lichess: Catalan Opening: Open Defense, Classical Line · máy chấm +24 centipawn (Trắng dương)

**Ý tưởng:** Đen ăn tốt c4 và cố giữ lại tốt thừa bằng ...b5. Trắng không vội ăn lại tốt, thay vào đó cho Tượng g2 và quân khác làm việc; cuối cùng lấy lại tốt bằng Hậu.

**Điểm mạnh:** Tượng g2 gây áp lực lên cánh Hậu Đen. / Trắng lấy lại tốt dễ dàng, giữ được thế chủ động.

**Điểm yếu:** Đen có tốt thừa nên có thể phòng thủ chắc. / Trắng phải chính xác để không mất nhịp trong lúc ăn lại tốt.

**Kế hoạch Trắng:** Lấy lại tốt c4 bằng Hậu, đưa Tượng c1 ra d2 hoặc f4, rồi dùng Tượng g2 đánh vào b7.

**Kế hoạch Đen:** Giữ tốt thừa bằng ...a6 và ...b5, đưa Tượng c8 ra b7 để đối mặt Tượng g2.

**Lời khuyên:** Trong Catalan mở, đừng vội ăn lại tốt: để Đen chuyển nhượng và dùng nhịp đó để phát triển.

### Catalan đóng (...c6)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 g3 d5 Bg2 Be7 Nf3 O-O O-O c6 Qc2 Nbd7 Nbd2 b6 b3 Bb7` · tên Lichess: Catalan Opening: Closed Variation, Traditional Variation · máy chấm +11 centipawn (Trắng dương)

**Ý tưởng:** Đen không ăn tốt c4 mà dựng thế vững chắc bằng ...c6, ...Nbd7. Trắng giữ không gian và thường chuẩn bị e4 để phá thế phòng thủ của Đen.

**Điểm mạnh:** Đen có thế cờ rất chắc, ít điểm yếu. / Trắng có không gian và Tượng g2 mạnh.

**Điểm yếu:** Thế cờ ít đòn tấn công trực tiếp; Trắng phải kiên nhẫn. / Đen có thể chuyển sang ...dxc4 hoặc ...c5 khi thuận lợi.

**Kế hoạch Trắng:** Đưa Mã ra d2, chuẩn bị e4; kiểm soát c-file và tấn công cánh Hậu bằng b3, Bb2.

**Kế hoạch Đen:** Giữ tốt d5, đưa Tượng c8 ra b7, chuẩn bị ...c5 hoặc ...dxc4 khi Trắng mất nhịp.

**Lời khuyên:** Trong thế cờ đóng, chơi tốt nghĩa là biết khi nào nên mở thế: tìm cơ hội e4.

### Đen chiếu ...Bb4+

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 g3 d5 Bg2 Bb4+ Bd2 Be7 Nf3 O-O O-O c6` · tên Lichess: Bogo-Indian Defense: Retreat Variation · máy chấm +28 centipawn (Trắng dương)

**Ý tưởng:** Đen chiếu Vua bằng Tượng b4 để buộc Trắng đi Bd2 hoặc Nc3. Sau Bd2, Đen thường lui Tượng về e7 và quay lại thế Catalan thông thường, nhưng Tượng d2 đã ở vị trí hơi lạ so với bình thường.

**Điểm mạnh:** Đen kiểm soát được thời điểm đổi Tượng. / Trắng vẫn có Tượng g2 mạnh.

**Điểm yếu:** Trắng có thể bị mất nhịp nếu đổi Tượng sớm. / Tượng d2 hơi bị động.

**Kế hoạch Trắng:** Bd2 hoặc Nc3, nhập thành rồi chuẩn bị Qc2 và Bf4 để tận dụng thế cờ.

**Kế hoạch Đen:** Rút Tượng về e7 để trở về thế cờ quen thuộc, hoặc đổi Tượng lấy Mã.

**Lời khuyên:** Khi bị chiếu bằng Tượng, hãy chọn nước chặn sao cho quân chặn vẫn hữu ích.

---

## Phòng thủ Alekhine (Alekhine's Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO B02-B05 · 3 biến thể · 9 puzzle

**Câu giới thiệu:** Mời Trắng đẩy tốt đuổi Mã: Đen cố tình để Trắng chiếm không gian, rồi tấn công vào trung tâm đã phình quá rộng.

**Ý tưởng:**
- Đen đưa Mã ra f6 để đánh vào tốt e4. Trắng thường đẩy e5 đuổi Mã, và Mã f6 phải đi nhiều bước: Nd5, rồi có thể Nb6. Đen tốn vài nhịp nhưng Trắng cũng phải đẩy nhiều tốt, tạo ra một "trung tâm to" có thể trở thành điểm yếu.
- Đây là một ví dụ của phong cách "siêu hiện đại": nhường không gian để sau đó phá trung tâm bằng ...d6, ...c5 và ...f6. Nếu Trắng dựng thế quá rộng mà không bảo vệ, Đen có thể phá tan nó.

**Điểm mạnh:**
- Khai cuộc ít người gặp nên đối thủ thường không chuẩn bị kỹ.
- Thế cờ không đối xứng, giàu cơ hội phản công.
- Mã d5 ban đầu hoạt động tốt ở trung tâm.

**Điểm yếu:**
- Máy tính đánh giá Trắng có lợi thế nhỏ vì chiếm nhiều không gian.
- Mã phải di chuyển nhiều lần ở khai cuộc nên Đen dễ mất nhịp phát triển.
- Nếu không phá được trung tâm, Đen bị chật và thế cờ khó thở.

### Biến thể Hiện đại (Nf3)

- [ ] Đã duyệt  · nước đi: `e4 Nf6 e5 Nd5 d4 d6 Nf3 Bg4 Be2 e6 O-O Be7 c4 Nb6` · tên Lichess: Alekhine Defense: Modern Variation, Main Line · máy chấm +88 centipawn (Trắng dương)

**Ý tưởng:** Trắng phát triển Mã f3 để bảo vệ tốt e5 rồi nhập thành. Đen ghim Mã f3 bằng ...Bg4 và tìm cơ hội đổi Tượng lấy Mã để giảm áp lực không gian.

**Điểm mạnh:** Trắng phát triển tự nhiên, ít rủi ro. / Đen có kế hoạch đổi quân và phản công vào e5.

**Điểm yếu:** Trắng vẫn có nhiều không gian hơn. / Đen phải đổi quân chính xác để không bị chật.

**Kế hoạch Trắng:** Nhập thành, đẩy c4 đuổi Mã d5 và giữ trung tâm chắc.

**Kế hoạch Đen:** Ghim Mã f3, đổi Tượng lấy Mã khi thuận lợi và phá e5 bằng ...dxe5 hoặc ...c5.

**Lời khuyên:** Khi bị chật, hãy đổi quân: mỗi lần đổi, tốt trung tâm của Trắng ít được bảo vệ hơn.

### Tấn công Bốn Tốt

- [ ] Đã duyệt  · nước đi: `e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 f4 dxe5 fxe5 Nc6 Be3 Bf5 Nc3 e6 Nf3 Be7` · tên Lichess: Alekhine Defense: Four Pawns Attack, Main Line · máy chấm +88 centipawn (Trắng dương)

**Ý tưởng:** Trắng đẩy c4 và f4 để có bốn tốt cùng chiếm hàng 4-5: c4, d4, e5, f4. Đây là kiểu chiếm không gian cực đoan; Đen phải nhanh chóng phá bằng ...dxe5 và ...Nc6.

**Điểm mạnh:** Trắng có không gian rất lớn. / Đen có mục tiêu rõ ràng để phản công: tốt d4.

**Điểm yếu:** Nếu Đen chậm trễ, Trắng sẽ nghiền nát Đen. / Đen bị chật cánh Hậu trong thời gian đầu.

**Kế hoạch Trắng:** Dựng trung tâm, phát triển Mã f3, Tượng e2 và nhập thành. Đẩy d5 khi thuận lợi.

**Kế hoạch Đen:** Phá chân chuỗi tốt: ...dxe5, ...Nc6 và nhanh chóng đánh vào d4 bằng ...Bg4 hoặc ...f6.

**Lời khuyên:** Khi đối phương có trung tâm quá lớn, bạn phải phá nó ngay, đừng chờ.

### Biến thể Đổi tốt (exd6)

- [ ] Đã duyệt  · nước đi: `e4 Nf6 e5 Nd5 d4 d6 c4 Nb6 exd6 cxd6 Nc3 g6 Be3 Bg7 Rc1 O-O b3` · tên Lichess: Alekhine Defense: Exchange Variation, Voronezh Variation · máy chấm +45 centipawn (Trắng dương)

**Ý tưởng:** Trắng đổi tốt e5 lấy d6 để giải tỏa căng thẳng và phá cấu trúc Đen. Đen nhận lấy tốt c6 thành d6 rồi fianchetto Tượng g7 và nhập thành.

**Điểm mạnh:** Cấu trúc Đen vững sau khi ăn lại cxd6. / Tượng g7 hoạt động mạnh nếu Trắng không phòng bị.

**Điểm yếu:** Trắng giữ lại trung tâm c4-d4 rộng. / Đen ít không gian.

**Kế hoạch Trắng:** Phát triển Mã c3, Tượng e3, Xe c1 và tìm cách tấn công d6.

**Kế hoạch Đen:** Phản công tốt d4 bằng ...Bg7, ...O-O và ...e5 hoặc ...c5.

**Lời khuyên:** Khi chuỗi tốt thay đổi, hãy tìm ô để phản công ngay thay vì giữ nguyên thế phòng thủ.

---

## Phòng thủ Benoni và Gambit Benko (Benoni Defense and Benko Gambit)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO A57-A79 · 2 biến thể · 8 puzzle

**Câu giới thiệu:** Cấu trúc tốt không đối xứng: Đen chấp nhận chật ở trung tâm để đổi lấy hoạt động quân và tấn công cánh Hậu.

**Ý tưởng:**
- Khi Trắng đẩy d5 chống lại ...c5, cấu trúc tốt trở nên không đối xứng: Trắng có "đa số tốt" ở trung tâm (e4, d5), Đen có đa số tốt ở cánh Hậu (a, b, c). Đen không cố phá trung tâm mà dùng tính linh hoạt: Tượng g7 mạnh, Mã nhảy vào các ô tốt, và tốt b5 tấn công cánh Hậu.
- Hai biến thể chính: Benoni hiện đại (Đen đáp ...e6, ...exd5, ...d6, ...g6) là cách chơi chuẩn; Gambit Benko (Đen đẩy ...b5 hiến tốt) hiến tốt để mở cột a và b cho Xe, đổi lấy áp lực lâu dài lên cánh Hậu.

**Điểm mạnh:**
- Thế cờ không đối xứng, giàu cơ hội phản công chủ động.
- Benko: Đen có áp lực dài hạn mà Trắng khó xóa hết.
- Phù hợp với người thích chiến đấu và tính toán.

**Điểm yếu:**
- Máy tính đánh giá Trắng có lợi thế nhỏ trong cả hai biến thể.
- Đen bị chật ở trung tâm; nếu Trắng đẩy e5 đúng lúc thì Đen khó thở.
- Cần học khá nhiều lý thuyết vì Trắng có nhiều cách chơi sắc bén (Tấn công Bốn Tốt, Taimanov).

### Benoni hiện đại (...e6)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 c5 d5 e6 Nc3 exd5 cxd5 d6 e4 g6 Nf3 Bg7 Be2 O-O O-O Re8` · tên Lichess: Benoni Defense: Classical Variation, Czerniak Defense · máy chấm +67 centipawn (Trắng dương)

**Ý tưởng:** Đen đánh vào d5 bằng ...e6, đổi tốt rồi dựng thế cờ ...d6, ...g6 và ...Bg7. Tượng g7 là quân mạnh nhất của Đen, nhắm vào d4 và b2. Đen phản công bằng ...b5 hoặc ...Re8 và ...Nbd7.

**Điểm mạnh:** Tượng g7 mạnh trên đường chéo dài. / Đen có đa số tốt cánh Hậu để tấn công.

**Điểm yếu:** Đen bị chật ở trung tâm. / Trắng có thể đẩy e5 để phá thế phòng thủ.

**Kế hoạch Trắng:** Nhập thành, phát triển Nf3, Be2, rồi đẩy e5 hoặc tấn công cánh vua.

**Kế hoạch Đen:** Đưa Tượng g7, Xe e8, Mã a6/bd7 vào trận; chuẩn bị ...b5 hoặc ...Nc7-b5.

**Lời khuyên:** Trong Benoni, nước đẩy e5 của Trắng là mối nguy lớn nhất: luôn kiểm tra nó trước mỗi nước đi.

### Gambit Benko (...b5)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 c5 d5 b5 cxb5 a6 bxa6 Bxa6 Nc3 d6 e4 Bxf1 Kxf1 g6` · tên Lichess: Benko Gambit Accepted: Yugoslav · máy chấm +89 centipawn (Trắng dương)

**Ý tưởng:** Đen hiến tốt b để mở cột a và b cho Xe, rồi đánh vào cánh Hậu Trắng. Sau khi Trắng nhận tốt, Đen đổi Tượng ô trắng ở a6 và có thế cờ thoải mái, dù thiếu tốt.

**Điểm mạnh:** Đen có áp lực dài hạn trên cột a và b. / Thế cờ hấp dẫn, dễ chơi nếu quen các ý tưởng chung.

**Điểm yếu:** Đen thiếu một tốt nếu Trắng chơi chính xác. / Trắng có thể trả tốt để giảm áp lực.

**Kế hoạch Trắng:** Trả tốt khi cần, giữ Vua an toàn bằng Kf1, g3, Kg2 và củng cố cánh Hậu.

**Kế hoạch Đen:** Đưa Xe lên cột a và b, đánh vào b2 bằng Hậu b6, và dùng Tượng g7.

**Lời khuyên:** Trong gambit này, đổi Tượng ô trắng giúp Đen giảm thiểu rủi ro mất Vua.

---

## Phòng thủ Grünfeld (Grünfeld Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO D70-D99 · 3 biến thể · 10 puzzle

**Câu giới thiệu:** Để Trắng dựng trung tâm lớn rồi phá nó bằng Tượng g7, ...c5 và Hậu: lối chơi động, giàu đòn phản công.

**Ý tưởng:**
- Đen đánh vào trung tâm từ xa: sau 3...d5, nếu Trắng ăn d5 và dựng thế e4 đuổi Mã, Đen có trung tâm tốt của Trắng làm mục tiêu. Mã d5 bị đuổi thì đổi lấy Mã c3, Trắng có hai tốt trung tâm lớn nhưng phải bảo vệ chúng khỏi đòn ...Bg7 và ...c5.
- Đen không cố giữ không gian mà chấp nhận thế cờ chật hơn, đổi lại có Tượng g7 mạnh trên đường chéo dài và cơ hội đánh vào d4. Đây là khai cuộc năng động, đòi hỏi tính toán và hiểu thế cờ.

**Điểm mạnh:**
- Thế cờ động, Đen có nhiều cơ hội phản công chủ động.
- Tượng g7 rất mạnh khi trung tâm Trắng bị phá.
- Được nhiều đại kiện tướng dùng ở trình độ cao.

**Điểm yếu:**
- Đen chấp nhận thế cờ chật hơn lúc đầu; nếu phản công chậm sẽ bị nghiền nát.
- Cần học khá nhiều lý thuyết vì nhiều nhánh sắc bén.
- Trắng có trung tâm lớn và nhiều không gian nếu Đen sai nhịp.

### Biến thể Đổi (cxd5, e4)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 g6 Nc3 d5 cxd5 Nxd5 e4 Nxc3 bxc3 Bg7 Nf3 c5 Rb1 O-O Be2 cxd4 cxd4 Qa5+` · tên Lichess: Grünfeld Defense: Exchange Variation, Modern Exchange Variation · máy chấm +40 centipawn (Trắng dương)

**Ý tưởng:** Trắng ăn d5, rồi dựng trung tâm e4 đuổi Mã. Đen đổi Mã lấy Mã c3 để phá cấu trúc tốt của Trắng, sau đó dùng Tượng g7, tốt c5 và Hậu a5+ để tấn công tốt d4.

**Điểm mạnh:** Đen có mục tiêu rõ ràng: tốt d4 và trung tâm lớn của Trắng. / Tượng g7 hoạt động mạnh trên đường chéo dài.

**Điểm yếu:** Trắng có trung tâm lớn và nhiều không gian. / Đen phải phản công nhanh, nếu không sẽ bị chật.

**Kế hoạch Trắng:** Bảo vệ d4 (Nf3, Be3), phát triển Tượng và dùng không gian trung tâm.

**Kế hoạch Đen:** Đánh vào d4 bằng ...c5 và ...Nc6, dùng Hậu a5+ và Xe c8 để gây áp lực.

**Lời khuyên:** Trong Grünfeld, trung tâm lớn của Trắng không phải điểm mạnh mà là mục tiêu.

### Biến thể Tượng f4

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 g6 Nc3 d5 Bf4 Bg7 e3 O-O Rc1 c5 dxc5 Be6` · tên Lichess: Grünfeld Defense: Brinckmann Attack, Grünfeld Gambit, Botvinnik Variation · máy chấm +32 centipawn (Trắng dương)

**Ý tưởng:** Trắng phát triển Tượng ra f4 trước, chuẩn bị Rc1 và e3 một cách chắc chắn. Đen chống bằng ...c5, phá thế trung tâm của Trắng và tìm đổi tốt.

**Điểm mạnh:** Trắng phát triển tự nhiên và vững chắc. / Tượng f4 nhắm vào c7.

**Điểm yếu:** Trắng không dựng trung tâm lớn nên Đen dễ phản công. / Thế cờ khá cân bằng.

**Kế hoạch Trắng:** Nhập thành, Rc1, chuẩn bị Nf3 và áp lực cột c.

**Kế hoạch Đen:** Phá trung tâm bằng ...c5, đổi quân và dùng Tượng g7 để gây áp lực.

**Lời khuyên:** Khi đối phương chơi chậm, hãy phản công ngay bằng ...c5.

### Biến thể Nga (Qb3)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 g6 Nc3 d5 Nf3 Bg7 Qb3 dxc4 Qxc4 O-O e4 Bg4 Be3 Nfd7` · tên Lichess: Grünfeld Defense: Russian Variation, Smyslov Variation · máy chấm +59 centipawn (Trắng dương)

**Ý tưởng:** Trắng đưa Hậu ra b3 để đánh vào d5 và Mã f6 trước khi dựng trung tâm. Đen ăn c4 rồi sau khi Trắng lấy lại tốt, Đen đánh vào trung tâm bằng ...Bg4 và ...Nfd7.

**Điểm mạnh:** Trắng có Hậu hoạt động mạnh sớm. / Đen có nhiều cơ hội phản công vào e4.

**Điểm yếu:** Hậu c4 có thể bị Đen đuổi bằng tempo. / Trắng có thể mất nhịp phát triển.

**Kế hoạch Trắng:** Dựng trung tâm e4, phát triển Tượng e3 và nhập thành.

**Kế hoạch Đen:** Đuổi Hậu, tấn công e4 bằng ...Bg4, ...Nfd7 và ...c5.

**Lời khuyên:** Đuổi Hậu bằng nhịp là một cách phát triển miễn phí.

---

## Phòng thủ Nimzo-Ấn Độ (Nimzo-Indian Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO E20-E59 · 3 biến thể · 9 puzzle

**Câu giới thiệu:** Ghim Mã c3 bằng Tượng b4 để kiểm soát ô e4 và buộc Trắng phải trả giá nếu muốn dựng trung tâm lớn.

**Ý tưởng:**
- Thay vì chiếm trung tâm bằng tốt, Đen dùng quân để kiểm soát nó. Tượng b4 ghim Mã c3, mà Mã c3 lại là quân chủ lực canh ô e4 và d5 của Trắng. Nhờ vậy Trắng khó đẩy tốt e4 để dựng trung tâm lớn.
- Đen sẵn sàng đổi Tượng lấy Mã c3 nếu Trắng chơi a3, khiến Trắng có "tốt đôi" ở cột c (hai tốt cùng cột, yếu hơn). Đổi lại Trắng có cặp Tượng. Tùy cách Trắng đáp mà kế hoạch của Đen thay đổi.

**Điểm mạnh:**
- Kế hoạch rõ ràng: kiểm soát e4, đánh vào tốt đôi c3 nếu Trắng bị ép tạo ra.
- Linh hoạt: Đen chọn giữa đổi Tượng lấy Mã hoặc dựng thế bằng ...d5, ...c5.
- Cấu trúc tốt chắc, Vua nhập thành dễ dàng.

**Điểm yếu:**
- Phải học nhiều biến thể vì mỗi cách đáp của Trắng (Rubinstein, Cổ điển, Sämisch...) đòi hỏi kế hoạch khác.
- Nếu Trắng có cặp Tượng và trung tâm mở, Đen cần phòng thủ chính xác.
- Dễ rơi vào thế bị động nếu đổi Tượng sớm mà không tìm được đòn phản công.

### Biến thể Rubinstein (4.e3)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 Nc3 Bb4 e3 O-O Bd3 d5 Nf3 c5 O-O Nc6 a3 Bxc3 bxc3 dxc4 Bxc4 Qc7` · tên Lichess: Nimzo-Indian Defense: Normal Variation, Bernstein Defense · máy chấm +23 centipawn (Trắng dương)

**Ý tưởng:** Trắng chơi chắc chắn: e3, Bd3, Nf3, nhập thành. Đen dựng thế bằng ...O-O, ...d5, ...c5 và ...Nc6 rồi chờ lúc đổi Tượng lấy Mã khi Trắng đi a3.

**Điểm mạnh:** Trắng chơi vững, ít rủi ro. / Đen có kế hoạch rõ: ...d5, ...c5, ...Nc6 và áp lực lên d4.

**Điểm yếu:** Trắng có Tượng d3 nhắm vào cánh vua Đen. / Đen phải cẩn thận không để cặp Tượng Trắng trở nên mạnh.

**Kế hoạch Trắng:** Nhập thành, đổi tốt ở trung tâm hoặc chơi a3 để hỏi Tượng b4 rồi dùng cặp Tượng.

**Kế hoạch Đen:** Đánh vào trung tâm bằng ...c5 và ...dxc4 để cô lập tốt d4, đổi Tượng lấy Mã khi Trắng đi a3.

**Lời khuyên:** Đen thường đổi ...dxc4 khi Tượng d3 đã ra, để tốn một nước phát triển của Trắng (Bxc4).

### Biến thể Cổ điển (4.Qc2)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 Nc3 Bb4 Qc2 O-O a3 Bxc3+ Qxc3 b6 Bg5 Bb7 e3 d6` · tên Lichess: Nimzo-Indian Defense: Classical Variation, Keres Defense · máy chấm +14 centipawn (Trắng dương)

**Ý tưởng:** Trắng đưa Hậu ra c2 để nếu Tượng b4 ăn Mã c3 thì Hậu ăn lại bằng Qxc3 mà không làm hỏng cấu trúc tốt. Đen thường nhập thành rồi đổi Tượng lấy Mã và đưa Tượng c8 ra b7.

**Điểm mạnh:** Trắng giữ cấu trúc tốt nguyên vẹn khi đổi Tượng. / Đen có thế cờ vững và nhiều kế hoạch.

**Điểm yếu:** Trắng có cặp Tượng sau khi đổi. / Hậu c3 của Trắng có thể bị tấn công bằng ...Ne4.

**Kế hoạch Trắng:** Dùng cặp Tượng và chiếm trung tâm bằng e3, f3, e4 sau khi hoàn thành phát triển.

**Kế hoạch Đen:** Đổi Tượng lấy Mã, đưa Tượng c8 ra b7 và kiểm soát e4 bằng Mã f6.

**Lời khuyên:** Sau 4.Qc2, Đen không cần ghim thêm: đổi Tượng lấy Mã c3 và chuyển sang kế hoạch kiểm soát e4.

### Biến thể Sämisch (4.a3)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 e6 Nc3 Bb4 a3 Bxc3+ bxc3 c5 e3 Nc6 Bd3 O-O Ne2 b6 e4 Ne8` · tên Lichess: Nimzo-Indian Defense: Sämisch Variation, Capablanca Variation · máy chấm +3 centipawn (Trắng dương)

**Ý tưởng:** Trắng buộc Đen hỏi ngay: a3 hỏi Tượng b4, Đen đổi Tượng lấy Mã c3 và Trắng ăn lại bằng tốt b tạo tốt đôi c3-c4. Đổi lại Trắng có cặp Tượng và trung tâm lớn.

**Điểm mạnh:** Đen tấn công vào tốt đôi c3-c4 được xem là điểm yếu. / Thế cờ rõ ràng: Đen giữ chặt e4 và c4.

**Điểm yếu:** Trắng có cặp Tượng và có thể mở thế cờ để dùng chúng. / Đen phải ngăn Trắng mở thế bằng f3-e4 một cách thuận lợi.

**Kế hoạch Trắng:** Đẩy e4 để chiếm trung tâm, rồi tấn công cánh vua bằng f4 và Tượng.

**Kế hoạch Đen:** Đánh vào tốt đôi c3-c4 bằng ...c5, ...Na5 và ...b6, giữ e4 chặt.

**Lời khuyên:** Tốt đôi chỉ yếu khi bạn thật sự tấn công được nó; hãy nhắm vào c4 bằng ...b6 và ...Na5.

---

## Phòng thủ Pirc (Pirc Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO B07-B09 · 3 biến thể · 9 puzzle

**Câu giới thiệu:** Cho Trắng dựng trung tâm lớn rồi phản công: Đen đưa Tượng ra g7 và đánh vào trung tâm từ bên ngoài.

**Ý tưởng:**
- Thay vì tranh trung tâm ngay, Đen để Trắng dựng trung tâm e4 và d4, rồi đưa Tượng f8 ra g7 (fianchetto: đặt Tượng trên đường chéo dài a1-h8) và phản công trung tâm bằng các nước ...c5, ...e5 hoặc ...c6.
- Đây là cách chơi "siêu hiện đại": chấp nhận để đối phương chiếm không gian, đổi lại quân Đen linh hoạt và phản công bất ngờ.

**Điểm mạnh:**
- Cấu trúc tốt chắc, Tượng g7 rất mạnh khi trung tâm Trắng mở ra.
- Phù hợp với người thích phản công và thế cờ không đối xứng.
- Không cần học thuộc quá dài ở những nước đầu.

**Điểm yếu:**
- Trắng có nhiều không gian, Đen dễ bị chật nếu không phản công kịp thời.
- Trắng có đòn tấn công mạnh (Tấn công Áo với f4) nếu Đen phòng thủ chậm.
- Cần hiểu rõ lúc nào phản công, nếu không Trắng sẽ nghiền nát.

### Tấn công Áo (f4)

- [ ] Đã duyệt  · nước đi: `e4 d6 d4 Nf6 Nc3 g6 f4 Bg7 Nf3 O-O Bd3 Na6 O-O c5` · tên Lichess: Pirc Defense: Austrian Attack, Weiss Variation · máy chấm +81 centipawn (Trắng dương)

**Ý tưởng:** Trắng lập ba tốt ở trung tâm (e4, d4, f4) để lấy nhiều không gian và tấn công. Đen phải phản công nhanh vào trung tâm, đặc biệt là nước ...c5.

**Điểm mạnh:** Trắng có trung tâm rộng và nhiều không gian tấn công. / Đen có đòn phản công rõ ràng (...c5, ...Nc6).

**Điểm yếu:** Đen bị chật nếu phản công chậm. / Trắng có thể đẩy e5 đuổi Mã f6.

**Kế hoạch Trắng:** Nhập thành, phát triển Tượng d3, rồi đẩy e5 hoặc d5 để lấn không gian.

**Kế hoạch Đen:** Phản công ngay bằng ...c5, ...Nc6 để đánh vào d4; dùng Tượng g7 nhắm vào trung tâm.

**Lời khuyên:** Trong Tấn công Áo, Đen phải phản công vào trung tâm trước khi Trắng kịp nhập thành và đẩy e5.

### Biến thể Cổ điển (Nf3 + Be2)

- [ ] Đã duyệt  · nước đi: `e4 d6 d4 Nf6 Nc3 g6 Nf3 Bg7 Be2 O-O O-O c6 a4 Nbd7` · tên Lichess: Pirc Defense: Classical Variation, Quiet System, Czech Defense · máy chấm +60 centipawn (Trắng dương)

**Ý tưởng:** Trắng chơi chắc chắn: Nf3, Be2, nhập thành. Đen dựng thế cờ vững với ...Bg7, ...O-O, ...c6 và chờ phản công bằng ...e5 hoặc ...b5.

**Điểm mạnh:** Trắng chơi chắc chắn, ít rủi ro. / Đen có kế hoạch rõ: c6, Nbd7, e5.

**Điểm yếu:** Trắng có không gian hơn một chút. / Đen phải kiên nhẫn chờ thời điểm phản công.

**Kế hoạch Trắng:** Nhập thành, phát triển Tượng c1 (g5 hoặc e3) và dùng không gian để mở rộng.

**Kế hoạch Đen:** Dựng thế cờ vững bằng ...c6 và ...Nbd7, sau đó phản công với ...e5 hoặc ...b5.

**Lời khuyên:** Trong Classical, ...c6 là nước chuẩn bị cho cả ...e5 lẫn ...b5.

### Tấn công 150 (Be3 + Qd2)

- [ ] Đã duyệt  · nước đi: `e4 d6 d4 Nf6 Nc3 g6 Be3 Bg7 Qd2 c6 f3 b5 Nge2 Nbd7` · tên Lichess: Pirc Defense · máy chấm +32 centipawn (Trắng dương)

**Ý tưởng:** Trắng bố trí Be3, Qd2, f3 và nhập thành dài để tấn công cánh vua bằng h4-h5. Đen phản công cánh Hậu bằng ...c6 và ...b5.

**Điểm mạnh:** Trắng có kế hoạch tấn công mạnh vào Vua Đen. / Đen có phản công cánh Hậu rõ ràng (b5).

**Điểm yếu:** Đen bị tấn công nhanh nếu phản công chậm. / Trắng phải cẩn thận không để Vua dưới đòn phản công cánh Hậu.

**Kế hoạch Trắng:** Nhập thành dài và tấn công cánh vua bằng h4-h5, Bh6 đổi Tượng g7 của Đen.

**Kế hoạch Đen:** Phản công nhanh cánh Hậu với ...c6, ...b5, ...Nbd7 và ...Qa5; dùng tốt đa số để tạo đòn trước.

**Lời khuyên:** Cuộc đua: Trắng tấn công cánh vua, Đen tấn công cánh Hậu. Ai nhanh hơn sẽ thắng.

---

## Phòng thủ Sicilian (Sicilian Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO B20-B99 · 4 biến thể · 14 puzzle

**Câu giới thiệu:** Cách đáp 1.e4 sắc bén nhất của Đen: thế cờ bất đối xứng, cả hai bên đều có cơ hội tấn công.

**Ý tưởng:**
- Đen không bắt chước nước đi của Trắng mà đẩy tốt c lên c5 để đánh vào ô d4. Khi Trắng đẩy d4, Đen đổi tốt c lấy tốt d (cxd4).
- Sau khi đổi, thế cờ bất đối xứng: Đen có thêm tốt ở trung tâm (d và e) và có cột c bán mở cho Xe; Trắng có nhiều tốt hơn ở cánh Hậu. Vì vậy hai bên thường tấn công ở hai cánh khác nhau.

**Điểm mạnh:**
- Thế cờ bất đối xứng nên khó hòa, Đen có nhiều cơ hội thắng.
- Cột c bán mở cho Đen một mục tiêu và đường tấn công vào cánh Hậu của Trắng.
- Có nhiều hệ thống khác nhau (Najdorf, Dragon, Scheveningen, Sveshnikov...) cho mọi phong cách chơi.

**Điểm yếu:**
- Lý thuyết rất dài, nhiều biến phải học thuộc.
- Nước đầu c5 không phát triển quân, nên Trắng thường dẫn trước về phát triển và có thể tấn công mạnh vào Vua Đen nếu Đen sơ suất.
- Nhiều biến thể rất sắc bén, người mới dễ đi sai một nước là thua nhanh.

### Biến thể Najdorf

- [ ] Đã duyệt  · nước đi: `e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 a6 Be3 e5 Nb3 Be6` · tên Lichess: Sicilian Defense: Najdorf Variation, English Attack · máy chấm +32 centipawn (Trắng dương)

**Ý tưởng:** Đen đi ...a6 để cấm Mã hoặc Tượng Trắng nhảy vào b5, và chuẩn bị ...b5 lấy không gian cánh Hậu. Đây là biến thể tham vọng, rất được ưa chuộng ở mọi cấp độ.

**Điểm mạnh:** Nước a6 hữu ích cho nhiều kế hoạch (b5, Be6, Qc7...). / Đen có đòn phản công mạnh ở cánh Hậu và ở trung tâm.

**Điểm yếu:** Phải học thuộc nhiều nước vì lý thuyết rất sâu. / Đen chưa nhập thành, Vua dễ gặp đòn tấn công của Trắng.

**Kế hoạch Trắng:** Phát triển nhanh (Be3, f3, Qd2), nhập thành dài rồi đẩy tốt g và h tấn công Vua Đen.

**Kế hoạch Đen:** Đẩy ...b5 và ...Nbd7 phản công cánh Hậu, chiếm cột c với Xe, và đổi quân để giảm sức ép lên Vua.

**Lời khuyên:** Najdorf là cuộc đua: Trắng tấn công cánh vua, Đen tấn công cánh Hậu. Ai nhanh hơn thì thắng.

### Biến thể Dragon (Rồng)

- [ ] Đã duyệt  · nước đi: `e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 g6 Be3 Bg7 f3 O-O Qd2 Nc6` · tên Lichess: Sicilian Defense: Dragon Variation, Yugoslav Attack · máy chấm +64 centipawn (Trắng dương)

**Ý tưởng:** Đen đi ...g6 và đưa Tượng ra g7 (fianchetto, tức đặt Tượng trên đường chéo dài a1-h8). Hình dáng các tốt đen giống con rồng nên có tên Dragon.

**Điểm mạnh:** Tượng g7 là quân rất mạnh trên đường chéo dài, nhắm thẳng tới cánh Hậu Trắng. / Cấu trúc tốt chắc, Đen có cơ hội phản công bằng Xe trên cột c.

**Điểm yếu:** Trắng có kế hoạch tấn công rất mạnh vào Vua Đen (hệ thống Yugoslav). / Đen phải biết rõ lý thuyết, đi sai một nước có thể thua rất nhanh.

**Kế hoạch Trắng:** Hệ thống Yugoslav: Be3, f3, Qd2, nhập thành dài, rồi đẩy tốt h và g để mở cột h tấn công Vua Đen.

**Kế hoạch Đen:** Đưa Xe vào cột c (…Rc8), đổi Mã d4 bằng ...Nxd4 và dùng Tượng g7 để phản công về phía cánh Hậu Trắng.

**Lời khuyên:** Trong Dragon, hai bên nhập thành khác cánh nên cuộc đua tốc độ quyết định kết quả.

### Biến thể Scheveningen

- [ ] Đã duyệt  · nước đi: `e4 c5 Nf3 d6 d4 cxd4 Nxd4 Nf6 Nc3 e6 Be2 Be7 O-O O-O f4 Nc6` · tên Lichess: Sicilian Defense: Scheveningen Variation, Classical Variation · máy chấm +31 centipawn (Trắng dương)

**Ý tưởng:** Đen dựng "tổ tốt" d6 và e6 vững chắc, giữ các quân linh hoạt phía sau. Kế hoạch là chờ đợi, rồi phản công vào đúng lúc.

**Điểm mạnh:** Cấu trúc tốt d6-e6 rất chắc, che chắn trung tâm và Vua. / Đen có nhiều quân hậu cần và nhiều kế hoạch phản công linh hoạt.

**Điểm yếu:** Đen hơi bị chật vì thiếu không gian. / Trắng có thể tấn công mạnh ở cánh vua bằng tốt f, g, h (nước f4, g4).

**Kế hoạch Trắng:** Lấy không gian bằng f4, g4 và tấn công cánh vua; hoặc chơi chắc với Be3, Qd2 và nhập thành dài.

**Kế hoạch Đen:** Phản công bằng ...a6, ...Qc7, ...Nc6 và ...e5 hoặc ...d5 khi có dịp, tận dụng cột c để cân bằng.

**Lời khuyên:** Khi Trắng đẩy tốt tấn công, hãy phản công ở trung tâm bằng ...d5 hoặc ...e5.

### Biến thể Sveshnikov

- [ ] Đã duyệt  · nước đi: `e4 c5 Nf3 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 e5 Ndb5 d6 Bg5 a6 Na3 b5 Nd5 Be7` · tên Lichess: Sicilian Defense: Lasker-Pelikan Variation, Sveshnikov Variation, Chelyabinsk Variation · máy chấm +27 centipawn (Trắng dương)

**Ý tưởng:** Đen chấp nhận ô d5 yếu (không còn tốt Đen nào canh được) để đổi lấy trung tâm rộng với e5 và thế cờ năng động. Trắng đặt Mã vào d5, Đen tấn công cánh Hậu và cột c.

**Điểm mạnh:** Trung tâm rộng, quân Đen hoạt động tích cực. / Cánh Hậu có thể mở rộng nhanh bằng ...a6 và ...b5.

**Điểm yếu:** Ô d5 là điểm yếu vĩnh viễn: Mã Trắng có thể đứng ở đó rất vững. / Thế tốt khá lệch, đòi hỏi hiểu biết thế cờ cao.

**Kế hoạch Trắng:** Đặt Mã vào d5, giữ ô d5 và khai thác điểm yếu d6; cố giữ thế cờ chắc và đổi quân.

**Kế hoạch Đen:** Dùng tốt b5 và cặp Tượng, đổi bớt quân và phản công ở cánh Hậu hoặc đẩy ...f5 tấn công trung tâm.

**Lời khuyên:** Ô d5 yếu là cái giá Đen phải trả. Đổi lại, Đen có không gian và đòn phản công.

---

## Phòng thủ Ấn Độ Vua (King's Indian Defense)

- [ ] Đã duyệt toàn bộ khai cuộc này  · mã ECO E60-E99 · 4 biến thể · 12 puzzle

**Câu giới thiệu:** Cho Trắng dựng trung tâm lớn rồi phản công bằng ...e5 và tấn công cánh vua. Sắc bén, giàu cơ hội thắng cho Đen.

**Ý tưởng:**
- Đen đưa Tượng ra g7 (fianchetto: đặt Tượng trên đường chéo dài), nhập thành sớm, rồi phá trung tâm của Trắng bằng ...e5 hoặc ...c5. Đây là khai cuộc "siêu hiện đại": nhường trung tâm cho đối phương rồi tấn công nó.
- Thế cờ thường là cuộc đua: Trắng tấn công cánh Hậu (c5, b4), Đen tấn công cánh vua (...f5, ...g5, ...Nh5). Ai nhanh hơn sẽ thắng.

**Điểm mạnh:**
- Rất giàu cơ hội thắng cho Đen: tấn công cánh vua mạnh nếu Trắng chơi chậm.
- Tượng g7 là quân rất mạnh khi trung tâm mở ra.
- Kế hoạch rõ ràng, ngay cả khi lý thuyết dài.

**Điểm yếu:**
- Trắng có không gian lớn và nếu tấn công cánh Hậu nhanh thì Đen rất khó chịu.
- Lý thuyết rất dài, người mới dễ bị nghiền nát nếu không nắm kế hoạch.
- Nếu Đen chậm phản công, Trắng có thể thắng thế cờ chiến lược.

### Biến thể Cổ điển (Mar del Plata)

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O Be2 e5 O-O Nc6 d5 Ne7 Ne1 Nd7` · tên Lichess: King's Indian Defense: Orthodox Variation, Classical System · máy chấm +72 centipawn (Trắng dương)

**Ý tưởng:** Hai bên phát triển quân tự nhiên. Trắng khóa trung tâm bằng d5, Đen mở cuộc tấn công cánh vua bằng ...f5. Cuộc đua nổi tiếng nhất của Ấn Độ Vua.

**Điểm mạnh:** Đen có kế hoạch tấn công rõ ràng: f5, f4, g5. / Cấu trúc tốt khóa nên tấn công không bị cản.

**Điểm yếu:** Trắng cũng có đòn tấn công cánh Hậu (c5, b4) khá nhanh. / Nếu Đen chậm, Trắng chiếm ưu thế.

**Kế hoạch Trắng:** Tấn công cánh Hậu với c5, b4, Nd3; cố gắng mở cột c trước khi Đen kịp mở cánh vua.

**Kế hoạch Đen:** Tấn công cánh vua: ...f5, ...Nf6, ...f4, ...g5 và ...Ng6-h4. Nhanh hơn Trắng một nước là đủ.

**Lời khuyên:** Trong King's Indian, tốc độ là tất cả. Đừng mất tempo vào những nước phụ.

### Biến thể Sämisch

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f3 O-O Be3 e5 Nge2 c6 Qd2 Nbd7` · tên Lichess: King's Indian Defense: Sämisch Variation · máy chấm +81 centipawn (Trắng dương)

**Ý tưởng:** Trắng củng cố e4 bằng f3 và phát triển Tượng e3, chuẩn bị nhập thành dài rồi tấn công cánh vua. Đen thường đáp bằng ...e5 hoặc ...c5.

**Điểm mạnh:** Trắng có trung tâm vững chắc và kế hoạch tấn công rõ ràng. / Đen có nhiều lựa chọn phản công (e5, c5, Nc6).

**Điểm yếu:** Tốt f3 làm Mã g1 mất ô f3 và hơi cản quân. / Đen có thể phản công nhanh nếu Trắng chậm.

**Kế hoạch Trắng:** Nhập thành dài, đẩy g4 và h4 để tấn công cánh vua Đen.

**Kế hoạch Đen:** Phản công trung tâm bằng ...e5 hoặc ...c5; hoặc đẩy ...c6 và ...b5 tấn công cánh Hậu Trắng.

**Lời khuyên:** Khi Trắng nhập thành dài, hai bên tấn công khác cánh: cuộc đua tốc độ.

### Tấn công Bốn Tốt

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 f4 O-O Nf3 c5 d5 e6 Be2 exd5 cxd5 Bg4 O-O Nbd7` · tên Lichess: Benoni Defense: Four Pawns Attack · máy chấm +43 centipawn (Trắng dương)

**Ý tưởng:** Trắng lập bốn tốt c4, d4, e4, f4 để chiếm không gian rộng nhất. Đen phản công ngay bằng ...c5 và phá trung tâm khổng lồ này.

**Điểm mạnh:** Trắng chiếm không gian rộng và có đòn tấn công cánh vua. / Đen có phản công rõ ràng vào trung tâm.

**Điểm yếu:** Trung tâm Trắng khá "nhô ra", dễ bị phản công. / Cánh vua Trắng yếu hơn khi các tốt tiến lên.

**Kế hoạch Trắng:** Giữ trung tâm, nhập thành và tìm cơ hội đẩy e5 hoặc d5 để khóa.

**Kế hoạch Đen:** Phản công bằng ...c5 và ...Nc6 đánh vào d4; đổi quân để giảm sức ép.

**Lời khuyên:** Trung tâm càng lớn càng dễ trở thành mục tiêu: hãy đánh vào chân của nó.

### Biến thể Averbakh

- [ ] Đã duyệt  · nước đi: `d4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Be2 O-O Bg5 c5 d5 e6 Qd2 exd5 exd5 Re8 Nf3 Bg4 O-O Nbd7` · tên Lichess: King's Indian Defense: Averbakh Variation, Main Line · máy chấm +51 centipawn (Trắng dương)

**Ý tưởng:** Trắng phát triển Tượng ô đen ra g5, ghim Mã f6 và giữ thế cờ linh hoạt. Đen đáp bằng ...c5 để phản công, và hai bên cùng tranh nhau thế cờ trung tâm.

**Điểm mạnh:** Trắng giữ thế cờ chắc, Tượng g5 hoạt động tốt. / Đen có phản công rõ ràng ở trung tâm và cánh Hậu.

**Điểm yếu:** Đen phải cẩn thận với thế ghim của Tượng g5. / Trắng có thể bị phản công nếu quân phát triển chậm.

**Kế hoạch Trắng:** Giữ trung tâm vững, Qd2, nhập thành dài và tấn công cánh vua bằng h4-h5.

**Kế hoạch Đen:** Phản công bằng ...c5 và ...e6; dùng Tượng g4 và Mã f6 để đối phó với thế ghim.

**Lời khuyên:** Khi bị ghim, hãy phản công vào chính quân ghim hoặc chuẩn bị ...h6 để buộc Tượng quyết định.

---

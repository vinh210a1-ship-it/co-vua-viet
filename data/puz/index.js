/* Danh sách chủ đề câu đố. Tạo bởi tools/build_themes.py. */
const PUZ_THEMES=[
 {
  "id": "mateIn1",
  "name": "Chiếu hết 1 nước",
  "desc": "Tìm nước chiếu hết ngay.",
  "tip": "Liệt kê mọi nước chiếu. Nước nào mà Vua không chạy được, không ăn được quân chiếu và không chắn được là chiếu hết.",
  "group": "Chiếu hết",
  "n": 60
 },
 {
  "id": "mateIn2",
  "name": "Chiếu hết 2 nước",
  "desc": "Đi một nước, đối thủ buộc phải đỡ, rồi chiếu hết.",
  "tip": "Tìm nước ép đối thủ vào thế chỉ còn một cách đỡ, rồi chiếu hết. Thử cả những nước chiếu lẫn nước im lặng.",
  "group": "Chiếu hết",
  "n": 60
 },
 {
  "id": "mateIn3",
  "name": "Chiếu hết 3 nước",
  "desc": "Chuỗi ba nước dẫn tới chiếu hết.",
  "tip": "Bắt đầu từ ô cuối cùng: Vua bị chiếu hết ở đâu? Rồi đi ngược lại, dùng nước chiếu để ép Vua vào đó.",
  "group": "Chiếu hết",
  "n": 60
 },
 {
  "id": "backRankMate",
  "name": "Chiếu hết hàng cuối",
  "desc": "Vua bị kẹt sau hàng Tốt của chính nó.",
  "tip": "Vua kẹt sau hàng Tốt của mình thì một Xe hoặc Hậu chiếu ở hàng cuối có thể là chiếu hết. Hãy nhìn xem quân nào đang bảo vệ hàng cuối.",
  "group": "Chiếu hết",
  "n": 60
 },
 {
  "id": "smotheredMate",
  "name": "Chiếu hết ngạt",
  "desc": "Mã chiếu hết khi Vua bị quân mình vây kín.",
  "tip": "Vua bị chính quân mình vây kín thì chỉ một con Mã chiếu cũng đủ hết cờ. Thường phải hy sinh Hậu để dồn Vua vào góc.",
  "group": "Chiếu hết",
  "n": 60
 },
 {
  "id": "fork",
  "name": "Đòn đôi (đòn nĩa)",
  "desc": "Một quân tấn công hai quân cùng lúc.",
  "tip": "Tìm ô mà quân của bạn đứng đó tấn công hai mục tiêu cùng lúc, tốt nhất là một trong hai là chiếu Vua.",
  "group": "Chiến thuật cơ bản",
  "n": 60
 },
 {
  "id": "pin",
  "name": "Ghim",
  "desc": "Quân bị ghim không dám rời chỗ vì sau nó là quân quý hơn.",
  "tip": "Quân bị ghim không được rời vị trí vì sau nó là quân quý hơn. Hãy tấn công thêm vào quân bị ghim.",
  "group": "Chiến thuật cơ bản",
  "n": 60
 },
 {
  "id": "skewer",
  "name": "Xiên",
  "desc": "Ép quân quý phải tránh để ăn quân đứng sau nó.",
  "tip": "Xiên là ghim ngược: ép quân quý ở phía trước phải tránh, rồi ăn quân đứng sau nó.",
  "group": "Chiến thuật cơ bản",
  "n": 60
 },
 {
  "id": "discoveredAttack",
  "name": "Tấn công lộ",
  "desc": "Dời một quân để mở đường cho quân phía sau tấn công.",
  "tip": "Dời một quân đi để mở đường cho quân phía sau tấn công. Quân vừa dời đi có thể tự gây ra một đòn dọa khác.",
  "group": "Chiến thuật cơ bản",
  "n": 60
 },
 {
  "id": "hangingPiece",
  "name": "Quân treo",
  "desc": "Tìm quân không được bảo vệ để ăn.",
  "tip": "Trước khi đi, hỏi: quân nào của đối thủ không có ai bảo vệ? Ăn nó, hoặc dọa nó bằng nước có lợi.",
  "group": "Chiến thuật cơ bản",
  "n": 60
 },
 {
  "id": "trappedPiece",
  "name": "Quân bị nhốt",
  "desc": "Quân không còn đường thoát và sẽ bị bắt.",
  "tip": "Đếm các ô mà quân đó có thể thoát. Nếu mọi ô đều bị tấn công, hãy dọa nó thêm một lần nữa.",
  "group": "Chiến thuật cơ bản",
  "n": 60
 },
 {
  "id": "deflection",
  "name": "Dụ khai",
  "desc": "Kéo quân bảo vệ rời khỏi vị trí quan trọng.",
  "tip": "Quân đối thủ đang làm một việc quan trọng (bảo vệ quân, chắn nước chiếu). Ép nó rời đi bằng một đòn dọa hoặc một lần hy sinh.",
  "group": "Chiến thuật cơ bản",
  "n": 60
 },
 {
  "id": "sacrifice",
  "name": "Hy sinh",
  "desc": "Cho đi quân để đổi lấy thứ lớn hơn: chiếu hết, thắng quân hoặc thế trận.",
  "tip": "Hỏi: sau khi cho quân đi, đối thủ bị ép đi nước nào? Hy sinh đáng giá khi các nước ép buộc dẫn tới chiếu hết hoặc thắng lại nhiều hơn.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "attraction",
  "name": "Dụ vào",
  "desc": "Ép quân đối thủ, thường là Vua, đi vào một ô xấu để rồi bị đánh.",
  "tip": "Nhìn ô mà Vua đối thủ bị ép đứng vào: từ đó nó có bị đòn đôi, chiếu hết hay bị ghim không? Thường phải hy sinh một quân để dụ.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "exposedKing",
  "name": "Vua bị phơi trần",
  "desc": "Vua thiếu quân che chắn nên dễ bị tấn công liên tiếp.",
  "tip": "Đếm các ô quanh Vua đối thủ và quân nào của mình có thể chiếu tiếp. Khi Vua phơi trần, nước chiếu liên tiếp thường mạnh hơn thắng quân thường.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "quietMove",
  "name": "Nước im lặng",
  "desc": "Nước đi không chiếu, không ăn quân nhưng tạo ra đòn dọa mà đối thủ không đỡ nổi.",
  "tip": "Khi mọi nước chiếu và nước ăn đều không hiệu quả, hãy tìm nước chuẩn bị: nâng quân lên vị trí tốt, chặn đường chạy của Vua.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "clearance",
  "name": "Dọn đường",
  "desc": "Đưa một quân đi khỏi để mở ô hoặc mở đường cho quân khác, thường kèm đòn dọa.",
  "tip": "Hỏi: quân nào của mình đang đứng chắn đường quân khác? Dời nó đi bằng một nước có đòn dọa để đối thủ không kịp phản ứng.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "intermezzo",
  "name": "Nước xen",
  "desc": "Thay vì đáp ngay nước đối thủ mong đợi, chen vào một nước dọa lớn hơn trước.",
  "tip": "Khi đối thủ vừa ăn quân của bạn, đừng vội ăn lại. Tự hỏi: có nước chiếu hoặc dọa lớn hơn để đi trước không?",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "interference",
  "name": "Chắn đường",
  "desc": "Đặt quân vào giữa hai quân của đối thủ để cắt đường bảo vệ hoặc đường tấn công của họ.",
  "tip": "Tìm hai quân của đối thủ đang bảo vệ nhau qua một đường. Đặt quân vào giữa đường đó, nhất là khi quân chắn được bảo vệ.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "xRayAttack",
  "name": "Tấn công xuyên",
  "desc": "Một quân tấn công hoặc bảo vệ một ô xuyên qua quân khác đứng cùng đường đi.",
  "tip": "Xe, Hậu, Tượng vẫn nhìn xuyên qua quân đứng giữa. Sau khi hai quân đổi chác ở giữa, quân phía sau mới là quân quyết định.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "capturingDefender",
  "name": "Ăn quân bảo vệ",
  "desc": "Loại bỏ quân đang bảo vệ rồi ăn quân đang được bảo vệ.",
  "tip": "Với mỗi quân đối thủ, hỏi: ai đang bảo vệ nó? Nếu ăn hoặc đuổi quân bảo vệ được, quân kia thành quân treo.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "doubleCheck",
  "name": "Chiếu đôi",
  "desc": "Hai quân cùng chiếu Vua một lúc, đối thủ chỉ còn cách đi Vua.",
  "tip": "Chiếu đôi thường xuất hiện sau một nước chiếu lộ. Vì chỉ có Vua được đi, hãy tính trước Vua có chạy được ô nào không.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "discoveredCheck",
  "name": "Chiếu lộ",
  "desc": "Dời một quân đi để quân phía sau chiếu Vua, trong khi quân vừa dời tự tạo thêm đòn dọa.",
  "tip": "Quân dời đi được phép làm gì cũng được vì đối thủ phải lo chiếu: ăn quân, dọa Hậu, hoặc chiếu thêm.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "zugzwang",
  "name": "Zugzwang",
  "desc": "Bên nào đến lượt đi thì bất lợi, vì mọi nước đi đều làm thế cờ xấu hơn.",
  "tip": "Hãy liệt kê các nước đi của đối thủ rồi tìm nước khiến mọi lựa chọn của họ đều xấu. Thường gặp ở tàn cuộc.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "advancedPawn",
  "name": "Tốt tiến sâu",
  "desc": "Tốt đã đi gần hàng phong cấp và trở thành mối đe dọa quyết định.",
  "tip": "Tốt gần hàng cuối buộc đối thủ phải lo giữ. Hãy xem quân nào đang chặn hoặc bảo vệ ô phong cấp.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "promotion",
  "name": "Phong cấp",
  "desc": "Đưa Tốt xuống hàng cuối để thành quân mạnh, thường là Hậu.",
  "tip": "Đếm quân bảo vệ ô phong cấp. Có khi phải ăn quân hoặc dụ quân bảo vệ đi để Tốt đi qua.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "defensiveMove",
  "name": "Phòng thủ chính xác",
  "desc": "Tìm nước duy nhất để không thua hoặc không mất lợi thế.",
  "tip": "Đừng chỉ tìm nước tấn công. Hỏi: đối thủ đang dọa gì? Nước nào vừa đỡ đòn dọa đó vừa không tạo thêm điểm yếu?",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "kingsideAttack",
  "name": "Tấn công cánh Vua",
  "desc": "Tấn công Vua đối thủ khi họ đã nhập thành ngắn về cánh Vua.",
  "tip": "Đếm số quân của mình có thể hướng về cánh Vua đối thủ. Tấn công thường cần ít nhất ba quân.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "queensideAttack",
  "name": "Tấn công cánh Hậu",
  "desc": "Tấn công Vua đối thủ khi họ đã nhập thành dài về cánh Hậu.",
  "tip": "Mở cột bằng cách đẩy Tốt hoặc hy sinh Tốt, rồi đưa Xe và Hậu vào. Vua nhập thành dài thường kém an toàn hơn.",
  "group": "Chiến thuật nâng cao",
  "n": 60
 },
 {
  "id": "operaMate",
  "name": "Chiếu hết Opera",
  "desc": "Tượng ghim một quân, rồi Xe chiếu hết ở hàng cuối. Tên theo ván Opera của Paul Morphy (Paris, 1858).",
  "tip": "Tìm hàng cuối của đối thủ: Tượng ghim quân bảo vệ ô chiếu, Xe đến chiếu hết.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "pillsburysMate",
  "name": "Chiếu hết Pillsbury",
  "desc": "Xe chiếu hết ở biên, Tượng khống chế các ô thoát của Vua.",
  "tip": "Vua nhập thành ngắn, Tốt đã đi mất: Tượng đứng trên đường chéo dài giữ ô thoát, Xe vào cột bên cạnh để chiếu hết.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "anastasiaMate",
  "name": "Chiếu hết Anastasia",
  "desc": "Mã và Xe nhốt Vua giữa mép bàn cờ và quân của chính nó.",
  "tip": "Vua sát mép bàn cờ, Mã giữ các ô thoát, Xe chiếu hết dọc theo hàng.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "arabianMate",
  "name": "Chiếu hết Ả Rập",
  "desc": "Mã và Xe dồn Vua vào góc bàn cờ, Mã bảo vệ Xe.",
  "tip": "Vua ở góc: Xe chiếu sát bên cạnh và Mã bảo vệ Xe, đồng thời giữ ô thoát duy nhất.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "epauletteMate",
  "name": "Chiếu hết vai áo (Epaulette)",
  "desc": "Vua bị hai quân của chính mình kẹp hai bên, Hậu chiếu hết.",
  "tip": "Khi Vua bị hai Xe của chính nó đứng cạnh, ô thoát biến mất. Một nước chiếu của Hậu là chiếu hết.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "hookMate",
  "name": "Chiếu hết cái móc (Hook)",
  "desc": "Xe chiếu hết, Mã hỗ trợ, và một Tốt chặn đường chạy của Vua.",
  "tip": "Nhìn Mã bảo vệ Xe, rồi nhìn Tốt chặn ô thoát: ba quân phối hợp tạo thành hình cái móc.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "cornerMate",
  "name": "Chiếu hết góc",
  "desc": "Xe hoặc Hậu giam Vua ở góc, Mã chiếu hết.",
  "tip": "Giam Vua vào góc bằng Xe hoặc Hậu, rồi tìm ô để Mã chiếu hết.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "dovetailMate",
  "name": "Chiếu hết đuôi én (Dovetail)",
  "desc": "Hậu chiếu hết một Vua đứng sát, khi hai ô thoát cuối cùng bị chính quân của Vua chặn.",
  "tip": "Hậu đứng chéo sát Vua và được bảo vệ. Hai ô thoát còn lại của Vua đã có quân mình chiếm.",
  "group": "Mẫu chiếu hết kinh điển",
  "n": 60
 },
 {
  "id": "pawnEndgame",
  "name": "Tàn cuộc Tốt",
  "desc": "Chỉ còn Vua và Tốt hai bên.",
  "tip": "Đếm nhịp: Tốt nào phong cấp trước? Dùng Vua để chặn Tốt và giữ ô đối vua.",
  "group": "Tàn cuộc",
  "n": 60
 },
 {
  "id": "rookEndgame",
  "name": "Tàn cuộc Xe",
  "desc": "Còn Xe và Tốt.",
  "tip": "Xe thích hoạt động: đặt Xe sau Tốt thông và đưa Xe ra xa cắt Vua đối thủ.",
  "group": "Tàn cuộc",
  "n": 60
 },
 {
  "id": "bishopEndgame",
  "name": "Tàn cuộc Tượng",
  "desc": "Còn Tượng và Tốt.",
  "tip": "Chú ý màu ô của Tượng và Tốt đối thủ. Tượng cùng màu thì hòa dễ hơn, Tượng khác màu thì mạnh khi chủ động.",
  "group": "Tàn cuộc",
  "n": 60
 },
 {
  "id": "knightEndgame",
  "name": "Tàn cuộc Mã",
  "desc": "Còn Mã và Tốt.",
  "tip": "Mã đi chậm, nên đếm kỹ số nước. Mã đứng trung tâm và gần Tốt thông thì mạnh.",
  "group": "Tàn cuộc",
  "n": 60
 },
 {
  "id": "queenEndgame",
  "name": "Tàn cuộc Hậu",
  "desc": "Còn Hậu và Tốt.",
  "tip": "Chú ý chiếu liên tục và Vua nào an toàn hơn. Hậu có thể vừa hỗ trợ Tốt vừa dọa Vua đối thủ.",
  "group": "Tàn cuộc",
  "n": 60
 },
 {
  "id": "queenRookEndgame",
  "name": "Tàn cuộc Hậu và Xe",
  "desc": "Còn Hậu, Xe và Tốt.",
  "tip": "Nhiều quân mạnh nghĩa là chiếu liên tục và đòn đôi xuất hiện thường xuyên. Giữ Vua an toàn trước khi tấn công.",
  "group": "Tàn cuộc",
  "n": 60
 }
];

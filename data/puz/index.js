/* Danh sách chủ đề câu đố. Tạo bởi tools/build_themes.py. */
const PUZ_THEMES=[
 {
  "id": "mateIn1",
  "name": "Chiếu hết 1 nước",
  "desc": "Tìm nước chiếu hết ngay.",
  "tip": "Liệt kê mọi nước chiếu. Nước nào mà Vua không chạy được, không ăn được quân chiếu và không chắn được là chiếu hết.",
  "n": 60
 },
 {
  "id": "mateIn2",
  "name": "Chiếu hết 2 nước",
  "desc": "Đi một nước, đối thủ buộc phải đỡ, rồi chiếu hết.",
  "tip": "Tìm nước ép đối thủ vào thế chỉ còn một cách đỡ, rồi chiếu hết. Thử cả những nước chiếu lẫn nước im lặng.",
  "n": 60
 },
 {
  "id": "mateIn3",
  "name": "Chiếu hết 3 nước",
  "desc": "Chuỗi ba nước dẫn tới chiếu hết.",
  "tip": "Bắt đầu từ ô cuối cùng: Vua bị chiếu hết ở đâu? Rồi đi ngược lại, dùng nước chiếu để ép Vua vào đó.",
  "n": 60
 },
 {
  "id": "backRankMate",
  "name": "Chiếu hết hàng cuối",
  "desc": "Vua bị kẹt sau hàng Tốt của chính nó.",
  "tip": "Vua kẹt sau hàng Tốt của mình thì một Xe hoặc Hậu chiếu ở hàng cuối có thể là chiếu hết. Hãy nhìn xem quân nào đang bảo vệ hàng cuối.",
  "n": 60
 },
 {
  "id": "smotheredMate",
  "name": "Chiếu hết ngạt",
  "desc": "Mã chiếu hết khi Vua bị quân mình vây kín.",
  "tip": "Vua bị chính quân mình vây kín thì chỉ một con Mã chiếu cũng đủ hết cờ. Thường phải hy sinh Hậu để dồn Vua vào góc.",
  "n": 60
 },
 {
  "id": "fork",
  "name": "Đòn đôi (đòn nĩa)",
  "desc": "Một quân tấn công hai quân cùng lúc.",
  "tip": "Tìm ô mà quân của bạn đứng đó tấn công hai mục tiêu cùng lúc, tốt nhất là một trong hai là chiếu Vua.",
  "n": 60
 },
 {
  "id": "pin",
  "name": "Ghim",
  "desc": "Quân bị ghim không dám rời chỗ vì sau nó là quân quý hơn.",
  "tip": "Quân bị ghim không được rời vị trí vì sau nó là quân quý hơn. Hãy tấn công thêm vào quân bị ghim.",
  "n": 60
 },
 {
  "id": "skewer",
  "name": "Xiên",
  "desc": "Ép quân quý phải tránh để ăn quân đứng sau nó.",
  "tip": "Xiên là ghim ngược: ép quân quý ở phía trước phải tránh, rồi ăn quân đứng sau nó.",
  "n": 60
 },
 {
  "id": "discoveredAttack",
  "name": "Tấn công lộ",
  "desc": "Dời một quân để mở đường cho quân phía sau tấn công.",
  "tip": "Dời một quân đi để mở đường cho quân phía sau tấn công. Quân vừa dời đi có thể tự gây ra một đòn dọa khác.",
  "n": 60
 },
 {
  "id": "hangingPiece",
  "name": "Quân treo",
  "desc": "Tìm quân không được bảo vệ để ăn.",
  "tip": "Trước khi đi, hỏi: quân nào của đối thủ không có ai bảo vệ? Ăn nó, hoặc dọa nó bằng nước có lợi.",
  "n": 60
 },
 {
  "id": "trappedPiece",
  "name": "Quân bị nhốt",
  "desc": "Quân không còn đường thoát và sẽ bị bắt.",
  "tip": "Đếm các ô mà quân đó có thể thoát. Nếu mọi ô đều bị tấn công, hãy dọa nó thêm một lần nữa.",
  "n": 60
 },
 {
  "id": "deflection",
  "name": "Dụ khai",
  "desc": "Kéo quân bảo vệ rời khỏi vị trí quan trọng.",
  "tip": "Quân đối thủ đang làm một việc quan trọng (bảo vệ quân, chắn nước chiếu). Ép nó rời đi bằng một đòn dọa hoặc một lần hy sinh.",
  "n": 60
 }
];

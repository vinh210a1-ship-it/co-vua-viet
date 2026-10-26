/* Kho mẹo ngắn, rút từ khóa học "Cờ vua: từ biết luật đến chơi khá" và viết lại cho học sinh.
   TIPS.themes[id]: mẹo theo chủ đề câu đố (id trùng PUZ_THEMES). TIPS.general: mẹo chung, dùng khi không có mẹo riêng.
   reviewed:false cho tới khi thầy duyệt. Mẹo chỉ nêu nguyên tắc, không có nước đi cụ thể. */
const TIPS = {
  reviewed:false,
  themes:{
    mateIn1:[
      'Xét nước chiếu trước tiên. Nước chiếu bắt đối phương phải đỡ ngay nên dễ tính nhất.',
      'Muốn chiếu hết thì phải kiểm tra đủ ba thứ: Vua không chạy được, không ăn được quân đang chiếu, và không chắn được.'
    ],
    mateIn2:[
      'Đừng chỉ nhìn nước chiếu. Đôi khi nước "yên lặng" (không chiếu, không ăn) mới là nước thắng, và nó hay bị bỏ sót nhất.',
      'Học các mẫu chiếu hết kinh điển. Thấy "hình" quen là biết ngay có đòn, khỏi phải tính từ đầu.'
    ],
    mateIn3:[
      'Hãy học thuộc các mẫu chiếu hết: chiếu hết hàng cuối, chiếu hết ngạt, Anastasia, Ả Rập, Boden. Mỗi mẫu có điều kiện riêng, nhớ kiểm tra trước khi thí quân.',
      'Tính từng nhánh: mình đi gì, đối phương có mấy cách đỡ, rồi mình đáp lại ra sao. Chỉ xét nước chiếu và nước ép buộc thì cây biến nhỏ hơn nhiều.'
    ],
    backRankMate:[
      'Vua bị chính Tốt nhà nhốt ở hàng cuối thì Xe hoặc Hậu chiếu ngang là hết cờ. Hỏi: quân nào đang canh hàng cuối?',
      'Muốn phá quân canh, hãy thí một quân để kéo nó đi chỗ khác (đánh lạc hướng), rồi chiếu hết.',
      'Phòng cho mình: đẩy sớm Tốt h hoặc g lên một ô để Vua có "lỗ thở", chỗ trốn khi bị chiếu ở hàng cuối.'
    ],
    smotheredMate:[
      'Vua bị chính quân nhà vây kín thì chỉ một con Mã chiếu cũng đủ hết cờ.',
      'Hay phải thí Hậu để ép Xe đối phương ăn và tự lấp ô thoát của Vua. Đó là thế "di sản Philidor" nổi tiếng.'
    ],
    fork:[
      'Mã là vua của đòn đôi: nó đi hình chữ L, không bị chặn đường, và quân bị Mã đánh không đánh lại được (trừ Mã khác).',
      'Tìm quân đối phương không có ai bảo vệ, hoặc hai quân cách nhau đúng một bước Mã. Đó là mục tiêu của đòn đôi.',
      'Để không bị đòn đôi: đừng để quân "lỏng" không ai bảo vệ, và đừng để Vua với Hậu đứng cùng một đường chéo hay cột.'
    ],
    pin:[
      'Cách ăn quân bị ghim hiệu quả nhất là tấn công nó bằng Tốt, vì nó không chạy được.',
      'Ghim tuyệt đối: phía sau là Vua nên quân bị ghim không được đi. Ghim tương đối: phía sau là quân khác, đi được nhưng thiệt. Đôi khi vẫn nên đi!',
      'Hai quân thẳng hàng trên cột, hàng hoặc đường chéo là dấu hiệu của ghim hoặc xiên.'
    ],
    skewer:[
      'Xiên là ghim ngược: quân quý đứng trước bị dọa, nó phải tránh đi, và để lộ quân đứng sau cho mình ăn.',
      'Đừng xếp Hậu và Vua thẳng hàng với Xe hoặc Tượng của đối phương.'
    ],
    discoveredAttack:[
      'Quân phía trước đi, quân phía sau ra đòn. Nếu quân đi trước còn chiếu Vua, đối phương phải lo chiếu trước, và quân kia được ăn thoải mái.',
      'Thấy quân mình đứng trước Xe, Tượng hay Hậu của mình, và phía sau hướng về Vua đối phương? Tìm ô cho quân đứng trước đi sang để tạo thêm một đe dọa thứ hai.',
      'Chiếu đôi (hai quân cùng chiếu) mạnh nhất: chỉ còn cách đi Vua, nên đôi khi thí cả Hậu cũng đáng.'
    ],
    hangingPiece:[
      'Trước mỗi nước, hỏi: "Đối phương vừa đe dọa gì?" và "Sau nước này mình có để lại quân nào không ai bảo vệ không?"',
      'Quân không ai bảo vệ gọi là quân "lỏng", dễ thành mục tiêu của đòn đôi. Câu cửa miệng: quân lỏng thì rơi.'
    ],
    deflection:[
      'Hai câu hỏi để tìm đòn phá quân canh: "Quân nào của đối phương đang làm việc quan trọng nhất?" và "Nước nào buộc nó bỏ việc đó?"',
      'Đánh lạc hướng kéo quân rời khỏi chỗ quan trọng. Dụ thì kéo quân (thường là Vua) tới một ô bất lợi.',
      'Quá tải là một quân phải gánh hai việc. Đánh vào một việc thì việc kia bị bỏ ngỏ, như một người phải trông hai cái cửa.'
    ]
  },
  general:[
    'Trước mỗi nước đi, hỏi: "Đối phương vừa đi gì, và nó đe dọa mình điều gì?"',
    'Rà soát theo thứ tự Chiếu, Ăn, Dọa, cho cả hai bên. Nước chiếu xét trước vì bắt buộc đối phương phải đỡ.',
    'Trước khi thả tay, tự hỏi: "Sau nước này, đối phương có thể chiếu, ăn, dọa mình những gì?" Nhiều người thua vì quên bước này.',
    'Bẫy khai cuộc hiếm khi là nước tốt. Nó chỉ ăn được người không kiểm tra lại nước đi của mình.',
    'Máy cho đáp án nhưng không cho lý do. Hãy tự nghĩ trước, rồi mới nhờ máy kiểm tra.'
  ]
};

/* Lấy một mẹo cho chủ đề themeId (không có thì lấy mẹo chung). seed là số bất kỳ để xoay vòng. */
function tipFor(themeId, seed){
  const list = (TIPS.themes[themeId] && TIPS.themes[themeId].length) ? TIPS.themes[themeId] : TIPS.general;
  return list[Math.abs(seed|0) % list.length];
}

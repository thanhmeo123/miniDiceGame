🎲 Mini Dice Game
📌 Giới thiệu

Mini-game xúc xắc đơn giản (không dùng tiền thật), viết bằng Cocos Creator (TypeScript).
Người chơi có thể chọn cửa cược (Tài, Xỉu hoặc đoán Tổng điểm), nhập số tiền cược, sau đó bấm Roll để gieo 3 xúc xắc. Kết quả được tính toán, điểm được cập nhật, và lịch sử 10 ván gần nhất được lưu lại.

📜 Luật chơi

Có 3 xúc xắc, giá trị mỗi xúc xắc từ 1 → 6.

Tài / Xỉu:

Xỉu: Tổng 4–10

Tài: Tổng 11–17

Đoán Tổng: Người chơi nhập số tổng cụ thể (4–17). Nếu đúng, thắng.

Tỷ lệ trả thưởng:

Tài/Xỉu: 1 : 1 (đặt 10 → thắng +10, thua -10)

Tổng điểm: 1 : 5 (đặt 10 → thắng +50, thua -10)

⚙️ Cách chạy
1. Yêu cầu

Cocos Creator 3.x

Node.js (nếu muốn chạy unit test với Jest)

2. Chạy trong Cocos Creator

  1. Mở Cocos Creator → Open Project → chọn thư mục project này.
  2. Nhấn Play trong Cocos để chạy thử.

3. Web đã được tích hợp trong file index.html (Live Server) có thể chạy ở máy sau khi clone src về máy.

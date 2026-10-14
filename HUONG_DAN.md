# Landing page đăng ký tư vấn iPOS

## 1. Nối form với Google Sheet (khoảng 3 phút)

1. Tạo Google Sheet mới (ví dụ "Khách đăng ký tư vấn iPOS").
2. Trong Sheet, chọn **Tiện ích mở rộng → Apps Script**.
3. Xóa code mặc định, dán toàn bộ nội dung file `google-apps-script.gs`.
   - Muốn nhận email khi có khách thì điền email vào `NOTIFY_EMAIL`.
4. Bấm **Lưu**, sau đó bấm **Triển khai → Tùy chọn triển khai mới**:
   - Loại: **Ứng dụng web**
   - Thực thi dưới dạng: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
5. Bấm **Triển khai** và cấp quyền cho tài khoản Google của bạn.
6. Sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).
7. Mở `index.html`, tìm dòng `const SCRIPT_URL = "";` rồi dán URL vào giữa hai dấu ngoặc kép.

Dòng đầu tiên của Sheet (tiêu đề cột) được tạo tự động khi có lượt đăng ký đầu tiên.

## 2. Đưa lên Vercel

1. Vào vercel.com → **Add New → Project** → chọn repo GitHub của trang này → **Import**.
2. Framework Preset: **Other**. Không cần lệnh build. Bấm **Deploy**.
3. Các lần sửa sau chỉ cần push lên GitHub, Vercel tự cập nhật.

## 3. Gắn link quảng cáo

Thêm tham số utm vào link để biết khách đến từ đâu, ví dụ:
`https://<ten-mien>.vercel.app/?utm_source=facebook&utm_campaign=thang10`

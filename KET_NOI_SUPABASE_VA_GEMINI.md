# Kết nối Supabase và thử Gemini thật

Toàn bộ mã đã nằm trong dự án này; bạn không cần dán lại từng đoạn code. `BACKEND_SETUP.md` giải thích đầy đủ các luồng nghiệp vụ.

## A. Supabase

1. Vào https://supabase.com/dashboard, tạo hoặc chọn dự án của bạn.
2. Mở SQL Editor, tạo query mới, dán **toàn bộ** nội dung `supabase/migrations/202610160001_backend.sql` rồi chạy. Trong gói ZIP có thêm bản `supabase-setup.sql` giống hệt để dễ tìm. Sao lưu database nếu đã có dữ liệu. Không chạy lại schema MVP mở quyền cũ.
3. Mở Connect hoặc Settings → API Keys để lấy Project URL, public key và server key. Theo tài liệu Supabase, publishable key dùng phía trình duyệt; secret key chỉ dùng backend. Dự án này giữ tên biến tương thích `ANON_KEY` và `SERVICE_ROLE_KEY`: bạn có thể điền publishable key vào biến ANON_KEY, secret key vào biến SERVICE_ROLE_KEY. Nếu dùng khóa legacy thì điền anon và service_role tương ứng. Không điền server key vào biến NEXT_PUBLIC.
4. Trong thư mục `thepencily`, nếu chưa có `.env.local`, sao chép `.env.example` thành `.env.local`, rồi sửa:

```dotenv
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://MA-DU-AN.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=PUBLIC-KEY-CUA-BAN
SUPABASE_SERVICE_ROLE_KEY=SERVER-KEY-CUA-BAN
NEXT_PUBLIC_DISCORD_ENABLED=false
GEMINI_API_KEY=
GEMINI_MODEL=
```

Các giá trị chữ hoa trên là chỗ trống minh họa, phải thay bằng giá trị của dự án thật. Không đưa `.env.local` lên Git hoặc gửi file đó cho người khác.

5. Authentication → URL Configuration: Site URL `http://localhost:3000`; Redirect URLs thêm `http://localhost:3000/auth/callback` và `http://localhost:3000/auth/callback?recovery=1`. Bật Email provider, cấu hình gửi email theo tài khoản Supabase của bạn. Khi hosting, thay/thêm URL HTTPS thực tế.
6. Mở PowerShell trong thư mục mã nguồn:

```powershell
npm.cmd ci
node scripts/check-supabase-live.mjs
npm.cmd run dev
```

Script Supabase chỉ đọc để kiểm tra các bảng; không tự chạy migration hay cấp quyền. Mở http://localhost:3000/signin, tạo tài khoản rồi hoàn thiện hồ sơ. Cấp Academic và kiểm tra Realtime theo `BACKEND_SETUP.md`. Sau khi sửa biến môi trường, khởi động lại server; bản production cần build lại.

### Các tệp kết nối quan trọng

| Tệp | Vai trò |
| --- | --- |
| `src/lib/supabaseClient.ts` | Supabase client trên trình duyệt, đăng nhập và PKCE |
| `src/lib/server/backend.ts` | Client backend với server key; kiểm tra user token và quyền |
| `src/lib/api.ts` | Gửi token từ trình duyệt vào API website |
| `src/app/signin/page.tsx` | Đăng ký, đăng nhập và quên mật khẩu |
| `src/app/auth/callback/page.tsx` | Đổi mã PKCE thành phiên đăng nhập |
| `src/app/api/` | API hồ sơ, tutor, lớp, Academic, phòng, attendance, rewards, AI |
| `src/context/PencilyContext.tsx` | Đồng bộ trạng thái giao diện với dữ liệu backend |
| `supabase/migrations/202610160001_backend.sql` | Toàn bộ bảng, RLS, quyền và hàm giao dịch |

## B. Gemini thật, không cần đợi Supabase

1. Tạo API key tại https://aistudio.google.com/api-keys trong tài khoản Google của bạn.
2. Điền `GEMINI_API_KEY` vào `.env.local`. Không gửi khóa vào chat.
3. Xem các model mà khóa của bạn hỗ trợ:

```powershell
node scripts/check-gemini-live.mjs --list-models
```

4. Điền một ID model trong danh sách vào `GEMINI_MODEL` (không gồm tiền tố `models/`). Chọn model và quota phù hợp tài khoản; lệnh gọi thật sử dụng quota và có thể phát sinh chi phí theo cấu hình Google của bạn.
5. Gọi thử:

```powershell
node scripts/check-gemini-live.mjs
# Hoặc hỏi câu cụ thể:
node scripts/check-gemini-live.mjs "Demo phải trước buổi học bao lâu?"
```

Lệnh gọi đúng hàm `askPencily` và system prompt của website; không dùng phản hồi giả. Khi chưa có key/model, script dừng và báo thiếu cấu hình. HTTP thành công chỉ chứng minh API phản hồi; vẫn cần đánh giá câu trả lời đúng quy chuẩn. Lệnh này kiểm tra riêng Gemini, chưa chứng minh luồng đăng nhập + quota Supabase của `/api/ai/ask` hoạt động.

Nguồn chính thức: [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Gemini API](https://ai.google.dev/api), [Gemini models.list](https://ai.google.dev/api/models).

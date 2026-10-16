# Chạy backend The Pencily

Bản này triển khai yêu cầu trong THE_PENCILY_BACKEND_WEBRTC_SPEC.docx: đăng nhập email, tutor 5 bước, Academic duyệt demo, phòng WebRTC, điểm danh hai phía, PP và AI dùng chung với Discord. Mã nguồn đã có; cần cấu hình Supabase và các dịch vụ tùy chọn bên dưới để dùng dữ liệu thật.

## 1. Cấu hình cơ sở dữ liệu và email

1. Tạo dự án Supabase. Sao lưu database hiện có trước khi chạy migration.
2. Mở SQL Editor, chạy **toàn bộ** `supabase/migrations/202610160001_backend.sql`. Script dùng được với database mới hoặc schema MVP cũ trong dự án, chạy lại được. Không chạy lại các policy mở quyền của schema MVP cũ. Các lớp cũ chưa có tutor/đề cương được giữ làm bản nháp riêng tư; cần quản trị đối soát trước khi đưa vào quy trình mới.
3. Authentication → URL Configuration: Site URL `http://localhost:3000`; thêm Redirect URLs `http://localhost:3000/auth/callback` và `http://localhost:3000/auth/callback?recovery=1`. Khi đưa lên hosting, thêm các URL HTTPS tương ứng. Bật Email provider và cấu hình SMTP để gửi thư xác nhận/khôi phục thực tế. PKCE cần mở thư xác nhận trong cùng trình duyệt đã đăng ký.
4. Sao chép `.env.example` thành `.env.local`. Điền URL, anon key và service_role key từ dự án. Khóa service_role chỉ dùng phía server, không đưa vào mã client hoặc kho Git.
5. Supabase Realtime: kiểm tra `room_members` và `room_signals` thuộc publication `supabase_realtime` (migration tự thêm nếu publication tồn tại). Bật private-only channels nếu tài khoản hỗ trợ. Migration tạo policy trên `realtime.messages`; không cần tự bật lại RLS cho bảng hệ thống này.
6. Chạy website theo mục 2, tạo tài khoản email, xác nhận email và hoàn thiện hồ sơ.
7. Chủ dự án cấp Academic cho một tài khoản đã tạo, bằng SQL Editor (thay email thật):

```sql
update public.users set role = 'academic'
where id = (select id from auth.users where email = 'academic@example.com');
```

Đăng xuất/đăng nhập hoặc tải lại trạng thái hồ sơ để thấy tab Academic. Người dùng không thể tự cấp quyền qua form hay localStorage.

## 2. Chạy trên máy

Mở PowerShell trong thư mục `thepencily`:

```powershell
Copy-Item .env.example .env.local
# Điền cấu hình trong .env.local, không ghi đè file đã cấu hình.
npm.cmd ci
npm.cmd run dev
```

Mở `http://localhost:3000`. Terminal hiện Ready rồi tiếp tục chạy là bình thường. `Ctrl+C` dừng server. Sau khi đổi `.env.local`, khởi động lại; các biến NEXT_PUBLIC được đóng vào bản build nên cần build lại khi triển khai. Nếu chưa cấu hình backend, giao diện vẫn xem được nhưng thao tác thật bị chặn với thông báo, không tạo tài khoản/điểm giả.

Chạy bản production cục bộ: `npm.cmd run build`, sau đó `npm.cmd start`.

## 3. Quy trình tutor và Academic

- Tutor Studio: hồ sơ tên thật, tuổi, trường, môn/chuyên môn; Toán & KHTN và Flagship từ 16 tuổi. Flagship cần URL minh chứng và Academic xác nhận. Khai phóng / Bạn cùng tiến không áp dụng ngưỡng 16.
- Academic duyệt hồ sơ trước khi tutor nộp lớp. Giáo án có 6 phần, bài tập là phần tùy chọn. Tutor chọn lịch demo ở tương lai, sớm hơn buổi chính ít nhất 48 giờ.
- Lớp mới `pending_demo`, không hiện trên danh sách công khai. Tutor và Academic mở phòng demo từ khu vực riêng, demo không cộng PP.
- Academic dự giờ rồi duyệt hoặc yêu cầu sửa/đổi lịch; không tự duyệt hồ sơ/lớp mình. Chỉ phê duyệt sau thời điểm demo. Yêu cầu đổi lịch lưu trạng thái `needs_revision` cùng nhận xét và lịch đề xuất để tutor nộp lại.
- Chỉ lớp `approved` / `live` hiện ở danh sách công khai. Tutor bắt đầu lớp tối đa 15 phút trước giờ chính và kết thúc trong phòng. Lớp hoàn tất không nhận thêm heartbeat.

## 4. WebRTC và điểm danh

WebRTC mesh dùng signaling Supabase Realtime, có API phục hồi tín hiệu bị lỡ. Mic/camera cần người dùng bật và cấp quyền; không tự mở khi tải trang. Phòng gồm media, chia sẻ màn hình, chat, ghi chú đồng bộ và các nút có nhãn hỗ trợ trình đọc màn hình. Video chia sẻ màn hình tắt âm; tiếng mic nhận qua phần tử audio riêng. Chat và ghi chú trong phòng không lưu vĩnh viễn.

Phòng web tối đa **6 người kể cả tutor**, một phiên phòng hoạt động cho mỗi tài khoản. Đăng ký lớp web giữ một chỗ cho tutor. Lớp lớn chọn Meet/Discord. STUN Google có sẵn; nếu mạng chặn P2P, cấu hình TURN_URL/TURN_USERNAME/TURN_CREDENTIAL hoặc chuyển nền tảng. Không cam kết STUN vượt mọi NAT hay TURN miễn phí. TURN credentials hiện được cấp cho thành viên đăng nhập, nên dùng tài khoản có hạn mức, xoay khóa định kỳ; với triển khai lớn nên đổi sang TURN REST credentials ngắn hạn.

HTTPS bắt buộc khi dùng thiết bị ngoài localhost. `localhost` trên máy khác là máy đó; muốn thử hai thiết bị cần hosting HTTPS có cùng backend, không chỉ mở cổng VS Code.

Điểm danh chỉ có khi lớp `live`, tutor và học viên khác tài khoản có phiên còn hiệu lực. Mỗi 60 giây trình duyệt xin nonce ngẫu nhiên từ server, chuyển qua DataChannel cho tutor; tutor xác nhận qua API có token riêng, học viên gửi claim. SQL khóa giao dịch, chống nonce dùng lại, không cộng dồn phút bỏ lỡ và chỉ cộng một phút mỗi người trong 60 giây. Tutor không được nhân PP theo số học viên. Presence quá 90 giây và không hoạt động 15 phút bị loại; rời phòng/dừng lớp dừng nhận điểm. Kết nối media là một điều kiện kiểm tra phía client; server xác minh hai tài khoản và nonce, không thể tự quan sát gói RTP hoặc chứng minh người thật đang chú ý. Hai người thông đồng vẫn cần chính sách kiểm duyệt thực tế.

Học viên nhận 1 PP / 12 phút đã xác nhận; tutor 1 PP / 2 phút dạy đã xác nhận. Điểm và phút lấy từ database, không lấy bộ đếm browser/localStorage. Đổi thưởng trừ PP bằng giao dịch server. Các vật phẩm ghi placeholder chỉ ghi nhận yêu cầu đổi, chưa cung cấp tài nguyên hay gán Discord role tự động. Feed cộng đồng/yêu cầu lớp cũ vẫn là phần xem thử trên trình duyệt, chưa có backend xuất bản và không cấp PP.

## 5. Discord tùy chọn

Email và web hoạt động độc lập. Không bắt học sinh dưới 13 tuổi dùng Discord.

- Bật Discord provider trong Supabase Auth; điền client ID/secret của Discord Application, cấu hình OAuth redirect theo URL callback **Supabase cung cấp**. Bật `NEXT_PUBLIC_DISCORD_ENABLED=true`. SDK khởi tạo PKCE và callback web ở `/auth/callback`; cookie Discord cũ không còn cấp phiên đăng nhập. Không tự thêm người dùng vào guild.
- Thông báo lớp: tạo webhook kênh và điền `DISCORD_CLASS_WEBHOOK_URL`. Chỉ quyết định duyệt lớp tạo outbox; lỗi gửi giữ lại để Academic bấm gửi lại. Webhook dùng allowed_mentions rỗng. Không thông báo lớp chưa duyệt.
- Chatbot `/ask`: điền `DISCORD_APPLICATION_ID`, `DISCORD_PUBLIC_KEY`, `DISCORD_GUILD_ID`. Đặt Interactions Endpoint URL là `https://TEN-MIEN/api/discord/interactions`. Route xác minh Ed25519 trên raw body, timestamp, application và guild, rồi trả phản hồi riêng tư sau khi AI xử lý.
- Cài bot vào guild với `applications.commands`; khai báo `DISCORD_BOT_TOKEN` cho lệnh quản trị sau (không cần bot token để chạy route interaction):

```powershell
node --env-file=.env.local scripts/register-discord-command.mjs
```

Lệnh này thực sự đăng ký/cập nhật `/ask` trong guild đã cấu hình, chỉ chạy khi đã sẵn sàng.

## 6. AI dùng chung

Điền `GEMINI_API_KEY` và `GEMINI_MODEL` là ID model đang có trong Google AI Studio của bạn. Không cố định model cũ trong tài liệu. Dashboard Cú Pencily và Discord `/ask` dùng chung `src/lib/server/ai.ts` và system prompt, giới hạn câu hỏi 2.000 ký tự, 10 lượt/phút/tài khoản. API key chỉ đặt trên server, không lộ trong URL. Cần kiểm tra quota/chi phí tài khoản Google; khi chưa có key/model, UI báo chưa cấu hình.

## 7. Kiểm thử và nghiệm thu

```powershell
npm.cmd run lint
npm.cmd run build
node scripts/check-backend.mjs
# Khi website đang chạy:
node scripts/check-http.mjs http://localhost:3000
# Bộ SQL kiểm thử cần PGlite, cài riêng để không đổi dependencies ứng dụng:
npm.cmd install --prefix .qa --no-save --package-lock=false @electric-sql/pglite
node scripts/check-database.mjs
```

`check-backend` kiểm tra validation, auth, PKCE entry, AI bằng mock, chữ ký Discord thật bằng khóa test, không gọi dịch vụ ngoài. `check-database` chạy migration hai lần trên PostgreSQL nhúng và kiểm tra RLS/quyền, demo, nonce, PP, đổi thưởng. Đây chưa phải nghiệm thu Supabase cloud hay hai mạng Internet thực tế.

Trước khi đưa người dùng thật vào: thử hai tài khoản email; tutor nộp hồ sơ/lớp, Academic dự giờ/duyệt; kiểm tra webhook; hai thiết bị bật mic/kết nối DataChannel, dạy tối thiểu 12 phút, so sánh attendance_records/points_ledger; ngắt mạng/rời phòng/đổi tab/đăng nhập lại; thử TURN trên mạng khác; kiểm tra `/ask`, đổi thưởng và màn hình điện thoại. Các bước này cần cấu hình dịch vụ và thiết bị thật, chưa tự hoàn tất chỉ từ mã nguồn.

Tham khảo chính thức: [Supabase Discord Auth](https://supabase.com/docs/guides/auth/social-login/auth-discord), [Realtime authorization](https://supabase.com/docs/guides/realtime/authorization), [WebRTC TURN](https://webrtc.org/getting-started/turn-server), [Gemini models](https://ai.google.dev/gemini-api/docs/models).

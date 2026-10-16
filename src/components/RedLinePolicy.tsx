import React from "react";
import { ShieldCheck, AlertOctagon, HeartHandshake, FileCheck, DollarSign, Scale } from "lucide-react";

export function RedLinePolicy() {
  const policies = [
    {
      number: "01",
      title: "An Toàn & Bảo Vệ Người Học",
      subtitle: "Safety & Anti-Harassment",
      icon: ShieldCheck,
      desc: "Nghiêm cấm mọi hành vi xúc phạm danh dự, bắt nạt trực tuyến, quấy rối, đe dọa dưới mọi hình thức. Vấn đề an toàn tâm lý của học sinh luôn được ưu tiên xử lý cao hơn mọi hoạt động học thuật.",
      accent: "border-red-500/40 text-red-600 bg-red-500/5",
    },
    {
      number: "02",
      title: "Trung Thực Học Thuật Tuyệt Đối",
      subtitle: "Academic Integrity",
      icon: FileCheck,
      desc: "Nghiêm cấm đạo văn, làm hộ bài kiểm tra/thi cử, phát tán đề thi mật hoặc tiếp tay cho gian lận. Tutor tuyệt đối không khai khống hồ sơ năng lực hoặc làm giả chứng chỉ cá nhân.",
      accent: "border-amber-500/40 text-amber-600 bg-amber-500/5",
    },
    {
      number: "03",
      title: "Không Thương Mại Hóa Trái Quy Định",
      subtitle: "100% Non-Profit Education",
      icon: DollarSign,
      desc: "Toàn bộ lớp học cộng đồng tại The Pencily là 100% miễn phí. Nghiêm cấm tutor hoặc thành viên tự ý thu tiền người học, bán tài liệu, hoặc trục lợi dữ liệu thành viên để chào mời dịch vụ cá nhân bên ngoài.",
      accent: "border-emerald-500/40 text-emerald-600 bg-emerald-500/5",
    },
    {
      number: "04",
      title: "Tôn Trọng Bản Quyền & Tác Giả",
      subtitle: "Intellectual Property & Citations",
      icon: Scale,
      desc: "Tutor giữ bản quyền đối với bài giảng do mình biên soạn. Khi sử dụng nguồn tài liệu của bên thứ ba, bắt buộc phải trích dẫn nguồn minh bạch và chỉ sử dụng các tài nguyên mở được phép.",
      accent: "border-blue-500/40 text-blue-600 bg-blue-500/5",
    },
    {
      number: "05",
      title: "Văn Hóa Học Tập Bình Đẳng",
      subtitle: "Equal & Inclusive Culture",
      icon: HeartHandshake,
      desc: "Nghiêm cấm mọi định kiến và phân biệt đối xử dựa trên xuất thân trường lớp (chuyên / không chuyên), vùng miền, giới tính hoặc thành tích học tập ban đầu. Tại The Pencily, mọi nỗ lực đều được tôn trọng.",
      accent: "border-indigo-500/40 text-indigo-600 bg-indigo-500/5",
    },
  ];

  return (
    <section id="policy" className="py-16 sm:py-24 bg-white border-b border-[#0F2747]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider mb-3">
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Red-Line Policy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2747] font-heading tracking-tight">
            Nguyên Tắc Giới Hạn Đỏ
          </h2>
          <p className="mt-4 text-base text-[#4B5563]">
            Bộ quy chuẩn bắt buộc áp dụng nghiêm ngặt đối với toàn bộ thành viên dự án (Founder, Core Team, Tutor và Learner) nhằm duy trì một môi trường học tập liêm chính, an toàn và bình đẳng.
          </p>
        </div>

        {/* 5 Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => {
            const Icon = policy.icon;
            return (
              <div
                key={policy.number}
                className={`rounded-3xl border-2 p-6 sm:p-7 flex flex-col justify-between transition-all hover:shadow-lg ${policy.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-white border border-current shadow-xs">
                      Điều {policy.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-current flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0F2747] font-heading mb-1">
                    {policy.title}
                  </h3>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                    {policy.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                    {policy.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#0F2747]/10 flex items-center justify-between text-xs font-bold text-[#0F2747]">
                  <span>Cam kết tuân thủ</span>
                  <span>✓ Bắt buộc</span>
                </div>
              </div>
            );
          })}

          {/* Callout Card */}
          <div className="rounded-3xl border-2 border-[#0F2747] bg-[#0F2747] text-white p-7 flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-[#FFC83D] mb-2">
                Quy Trình Xử Lý Vi Phạm
              </div>
              <h3 className="text-2xl font-extrabold font-heading text-white mb-3">
                Kênh Báo Cáo Bảo Mật (Confidential Report)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Nếu phát hiện bất kỳ hành vi nào vi phạm 5 nguyên tắc giới hạn đỏ trên, bạn có thể gửi tố giác ẩn danh trực tiếp đến Ban Điều hành (President & Vice Presidents) để được can thiệp ngay lập tức trong 24 giờ.
              </p>
            </div>

            <a
              href="#report"
              onClick={(e) => {
                e.preventDefault();
                alert("Kênh tố giác vi phạm an toàn hoạt động 24/7 qua biểu mẫu bảo mật hoặc gửi tin nhắn trực tiếp cho ban HR-Adlogs.");
              }}
              className="py-3 px-4 rounded-xl bg-[#FFC83D] text-[#0F2747] font-bold text-xs uppercase tracking-wider text-center hover:bg-[#EAB308] transition shadow"
            >
              Gửi Báo Cáo Vi Phạm An Toàn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

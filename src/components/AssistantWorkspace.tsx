"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { usePencily } from "@/context/PencilyContext";
import Link from "next/link";
export function AssistantWorkspace(){const {backendAuthenticated}=usePencily();const [question,setQuestion]=useState('');const [messages,setMessages]=useState<{question:string;answer:string}[]>([]);const [busy,setBusy]=useState(false);const [error,setError]=useState('');
  async function ask(event:React.FormEvent){event.preventDefault();if(!question.trim())return;setBusy(true);setError('');try{const result=await api<{answer:string}>('/api/ai/ask',{method:'POST',body:JSON.stringify({question:question.trim()})});setMessages((old)=>[...old,{question,answer:result.answer}]);setQuestion('');}catch(reason){setError(reason instanceof Error?reason.message:'Chưa thể trả lời.');}finally{setBusy(false);}}
  return (
    <section className="w-full space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            Hỏi Cú Pencily
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
            Trợ lý AI giải đáp thắc mắc về lớp học, quy chế điểm PP và quy chuẩn cộng đồng
          </p>
        </div>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">
        Giải thích quy trình tutor, cách tham gia lớp, quy chuẩn cộng đồng và điểm PP. Câu hỏi được gửi tới dịch vụ Gemini khi bạn bấm gửi; không đưa mật khẩu hoặc thông tin riêng tư vào câu hỏi.
      </p>
      {!backendAuthenticated && <p className="border-2 border-slate-300 bg-white p-4 text-sm rounded-sm">Hãy <Link className="underline font-bold" href="/signin">đăng nhập</Link> để sử dụng trợ lý.</p>}
      <div className="space-y-4">{messages.map((item, index) => <article key={index} className="border-2 border-slate-300 bg-white p-5 space-y-3 rounded-sm shadow-2xs"><h3 className="font-bold">{item.question}</h3><p className="whitespace-pre-wrap text-sm leading-relaxed">{item.answer}</p></article>)}</div>
      {error && <p role="alert" className="border-2 border-amber-300 p-4 rounded-sm bg-amber-50 text-sm">{error}</p>}
      <form onSubmit={ask} className="space-y-3"><label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Câu hỏi của bạn<textarea value={question} onChange={(e) => setQuestion(e.target.value)} required maxLength={2000} rows={3} className="mt-1 block w-full p-3 bg-white border-2 border-slate-300 rounded-sm text-sm" placeholder="Nhập câu hỏi bạn cần giải đáp..." /></label><button disabled={busy || !backendAuthenticated} className="bg-[#0F2747] text-white px-5 py-2.5 rounded-sm font-bold text-xs shadow-2xs disabled:opacity-50 cursor-pointer active:scale-95 transition">{busy ? "Đang trả lời…" : "Gửi câu hỏi"}</button></form>
      <p className="text-xs text-slate-500">AI có thể trả lời sai. Thông tin tài khoản và quyết định phê duyệt lấy từ backend và ban Academic.</p>
    </section>
  );
}

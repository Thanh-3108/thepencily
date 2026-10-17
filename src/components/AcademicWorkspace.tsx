"use client";
import { useCallback,useEffect,useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { usePencily } from "@/context/PencilyContext";
import { isReviewer,STATUS_LABELS,PROGRAM_LABELS,type TutorApplication,type PlatformClass } from "@/lib/platform";
type Application=TutorApplication&{users?:{age:number|null;school:string}};
interface Queue { classes:PlatformClass[];applications:Application[];pendingNotifications:{id:string;last_error:string|null}[]; }
export function AcademicWorkspace(){
  const {user}=usePencily();const [queue,setQueue]=useState<Queue>({classes:[],applications:[],pendingNotifications:[]});
  const [selected,setSelected]=useState<{kind:'tutor';value:Application}|{kind:'class';value:PlatformClass}|null>(null);
  const [feedback,setFeedback]=useState('');const [verified,setVerified]=useState(false);const [demo,setDemo]=useState('');const [message,setMessage]=useState('');const [busy,setBusy]=useState(false);
  const load=useCallback(async()=>{setQueue(await api<Queue>('/api/academic'));},[]);
  useEffect(()=>{if(!isReviewer(user.platformRole))return;let active=true;void api<Queue>('/api/academic').then((result)=>{if(active)setQueue(result);}).catch((error)=>{if(active)setMessage(error.message);});return()=>{active=false;};},[user.platformRole,user.id]);
  async function review(action:string){if(!selected)return;setBusy(true);setMessage('');try{const result=await api<{notification?:{pending:boolean}}>('/api/academic',{method:'POST',body:JSON.stringify({target:selected.kind,id:selected.value.id,action,feedback,verifiedIdentity:verified,observedDemo:verified,demoDate:demo?new Date(demo).toISOString():undefined})});setSelected(null);await load();setMessage(result.notification?.pending?'Đã duyệt lớp. Thông báo Discord đang chờ gửi / cấu hình webhook.':'Đã lưu quyết định và nhật ký kiểm duyệt.');}catch(error){setMessage(error instanceof Error?error.message:'Không thể lưu quyết định.');}finally{setBusy(false);}}
  function open(value:NonNullable<typeof selected>){setSelected(value);setFeedback('');setVerified(false);setDemo('');}
  if(!isReviewer(user.platformRole))return <p className="border-2 border-amber-300 p-5">Khu vực dành cho ban Academic. Quyền được cấp trên backend, không lấy từ hồ sơ tự khai.</p>;
  return (
    <div className="w-full space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-slate-300">
        <div>
          <h2 className="font-poppins font-black text-2xl sm:text-3xl text-[#0F2747] tracking-tight">
            Academic · Thẩm Định & Duyệt Lớp
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 font-medium">
            Khu vực thẩm định hồ sơ Peer Tutor, kiểm tra đề cương bài giảng và dự giờ demo
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-sm bg-white hover:bg-slate-50 text-[#0F2747] border-2 border-slate-300 text-xs font-bold transition shadow-2xs cursor-pointer active:scale-95"
          onClick={() => { void load().catch((error) => setMessage(error.message)); }}
        >
          Tải lại hàng đợi
        </button>
      </div>
      {message && <p role="status" className="border-2 border-blue-200 bg-blue-50 p-4 rounded-sm text-sm">{message}</p>}
    <section className="space-y-3"><h3 className="text-xl font-bold">Hồ sơ tutor ({queue.applications.length})</h3>{queue.applications.map((item)=><button key={item.id} className="block w-full bg-white border-2 border-slate-300 p-4 text-left" onClick={()=>open({kind:'tutor',value:item})}><strong>{item.full_name}</strong><p>{item.subjects} · {item.users?.age??'Chưa có'} tuổi · {item.users?.school}</p></button>)}</section>
    <section className="space-y-3"><h3 className="text-xl font-bold">Đề cương / Demo ({queue.classes.length})</h3>{queue.classes.map((item)=><button key={item.id} className="block w-full bg-white border-2 border-slate-300 p-4 text-left" onClick={()=>open({kind:'class',value:item})}><strong>{item.title}</strong><p>{item.tutor_name} · {STATUS_LABELS[item.status]}</p><p>Demo: {new Date(item.demo_date).toLocaleString('vi-VN')}</p></button>)}</section>
    <section className="border-2 border-slate-300 p-4 space-y-2"><h3 className="font-bold">Thông báo Discord chờ gửi: {queue.pendingNotifications.length}</h3><button className="underline" onClick={()=>{void api('/api/academic',{method:'POST',body:JSON.stringify({target:'notifications'})}).then(()=>load()).catch((error)=>setMessage(error.message));}}>Thử gửi lại các thông báo đã duyệt</button></section>
    {selected&&<aside role="dialog" aria-modal="false" aria-label="Kiểm duyệt Academic" className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto bg-[#FFFDF9] border-l-2 border-slate-300 shadow-2xl p-6 space-y-5"><header className="flex justify-between gap-3"><h3 className="text-xl font-bold">{selected.kind==='tutor'?selected.value.full_name:selected.value.title}</h3><button aria-label="Đóng kiểm duyệt" onClick={()=>setSelected(null)}><X size={20}/></button></header>
      {selected.kind==='tutor'?<><p>{selected.value.subjects}</p><p className="whitespace-pre-wrap">{selected.value.motivation}</p><p>Tuổi: {selected.value.users?.age} · {selected.value.programs.map((item)=>PROGRAM_LABELS[item]).join(', ')}</p>{selected.value.credentials_url&&<a href={selected.value.credentials_url} target="_blank" rel="noreferrer" className="underline">Mở minh chứng học thuật</a>}</>:<>{([['objectives','Mục tiêu'],['main_topics','Nội dung chính'],['interactive_activities','Hoạt động tương tác'],['practice_exercises','Bài tập'],['reference_sources','Nguồn tham khảo']] as const).map(([key,label])=><section key={key}><h4 className="font-bold">{label}</h4><p className="whitespace-pre-wrap">{selected.value[key]||'Không có bài tập'}</p></section>)}<a href={selected.value.materials_url} target="_blank" rel="noreferrer" className="underline">Mở tài liệu / slide</a><Link className="block underline" href={selected.value.meet_url}>Mở phòng dự giờ demo</Link><p>Demo {new Date(selected.value.demo_date).toLocaleString('vi-VN')} · Buổi chính {new Date(selected.value.scheduled_time).toLocaleString('vi-VN')}</p></>}
      <label className="block">Nhận xét bắt buộc<textarea required maxLength={4000} rows={4} className="block w-full border-2 border-slate-300 p-3 mt-1" value={feedback} onChange={(e)=>setFeedback(e.target.value)}/></label><label className="block"><input type="checkbox" checked={verified} onChange={(e)=>setVerified(e.target.checked)}/> {selected.kind==='tutor'?'Đã kiểm tra danh tính, tuổi và minh chứng chuyên môn':'Đã dự giờ demo và kiểm tra giáo án'}</label>
      <div className="flex flex-wrap gap-3"><button disabled={busy||!feedback.trim()||!verified} className="bg-[#0F2747] text-white p-3 disabled:opacity-50" onClick={()=>review('approve')}>Phê duyệt</button><button disabled={busy||!feedback.trim()} className="border-2 border-slate-300 p-3" onClick={()=>review(selected.kind==='tutor'?'reject':'revise')}>Yêu cầu bổ sung</button></div>
      {selected.kind==='class'&&<section className="border-t-2 border-slate-200 pt-4 space-y-3"><label className="block">Đề xuất đổi lịch demo<input type="datetime-local" value={demo} onChange={(e)=>setDemo(e.target.value)} className="block border-2 border-slate-300 p-2 w-full"/></label><button disabled={busy||!demo||!feedback.trim()} className="border-2 border-slate-300 p-3" onClick={()=>review('reschedule')}>Yêu cầu đổi lịch</button></section>}
    </aside>}
    </div>
  );
}

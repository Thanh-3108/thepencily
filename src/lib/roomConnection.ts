"use client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "./supabaseClient";
import { api, ApiError } from "./api";
import type { RoomMember, PlatformClass } from "./platform";
export interface RoomChat { id:string;sender:string;text:string;time:string; }
export interface RemotePeer { member:RoomMember; media:MediaStream; screen:MediaStream; connected:boolean; mic:boolean;camera:boolean;sharing:boolean; }
interface Peer extends RemotePeer { pc:RTCPeerConnection; channel?:RTCDataChannel; makingOffer:boolean;ignoreOffer:boolean;settingAnswer:boolean;queuedIce:RTCIceCandidateInit[];chain:Promise<void>; }
interface Signal { id:string;from_connection_id:string;kind:"hello"|"description"|"ice";payload:Record<string,unknown>; }
interface Notes { counter:number;author:string;content:string; }
interface Events { peers:(peers:RemotePeer[])=>void;chat:(message:RoomChat)=>void;notes:(value:string)=>void;status:(message:string)=>void;classChanged:(value:PlatformClass)=>void;credited:()=>void; }
export class RoomConnection {
  private peers=new Map<string,Peer>();private channel:RealtimeChannel|null=null;private seenSignals=new Set<string>();
  private timers=new Set<ReturnType<typeof setTimeout>>();private closed=false;private token="";private ice:RTCIceServer[]=[];
  private connectionId="";private roster:RoomMember[]=[];private self:RoomMember|null=null;private pendingChallenge="";
  private tracks:(MediaStreamTrack|null)[]=[null,null,null];private controls={mic:false,camera:false,sharing:false};
  private latestNotes:Notes={counter:0,author:"",content:""};private lastInteraction=Date.now();private deafened=false;
  constructor(private classId:string,private events:Events){}
  private later(callback:()=>void,delay:number){const timer=setTimeout(()=>{this.timers.delete(timer);if(!this.closed)callback();},delay);this.timers.add(timer);}
  private emit(){this.events.peers([...this.peers.values()].map(({member,media,screen,connected,mic,camera,sharing})=>({member,media,screen,connected,mic,camera,sharing})));}
  async start(){
    if(!supabase)throw new Error("Chưa cấu hình Supabase cho phòng học.");
    if(!window.isSecureContext||!window.RTCPeerConnection)throw new Error("WebRTC cần HTTPS hoặc localhost và trình duyệt có hỗ trợ WebRTC.");
    const session=(await supabase.auth.getSession()).data.session;if(!session)throw new Error("Hãy đăng nhập để tham gia phòng học.");this.token=session.access_token;
    const joined=await api<{connectionId:string;iceServers:RTCIceServer[]}>(`/api/rooms/${this.classId}`,{method:"POST"});
    if(this.closed){void this.leave(joined.connectionId);return;}
    this.connectionId=joined.connectionId;this.ice=joined.iceServers;
    await supabase.realtime.setAuth(session.access_token);
    this.channel=supabase.channel(`pencily:${this.classId}`,{config:{private:true}})
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"room_signals",filter:`to_connection_id=eq.${this.connectionId}`},(event)=>{void this.receiveSignal(event.new as Signal).catch((error)=>this.events.status(error.message));})
      .on("postgres_changes",{event:"*",schema:"public",table:"room_members",filter:`class_id=eq.${this.classId}`},()=>{void this.refreshRoster().catch((error)=>this.events.status(error.message));});
    await new Promise<void>((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error("Không kết nối được Supabase Realtime. Kiểm tra migration và quyền private channel.")),12000);this.channel!.subscribe((status)=>{if(status==="SUBSCRIBED"){clearTimeout(timer);resolve();}else if(status==="CHANNEL_ERROR"||status==="TIMED_OUT"){clearTimeout(timer);reject(new Error("Signaling chưa kết nối được. Kiểm tra Supabase Realtime."));}});});
    if(this.closed)return;
    await this.refreshRoster();
    await Promise.all(this.roster.filter((member)=>member.connection_id!==this.connectionId).map((member)=>this.signal(member.connection_id,"hello",{})));
    window.addEventListener("pagehide",this.onPageHide);window.addEventListener("pointerdown",this.touch);window.addEventListener("keydown",this.touch);
    this.presenceLoop();this.signalRecoveryLoop();this.later(()=>{void this.attendanceLoop();},60000);
    this.events.status("Đã vào phòng. Giờ học chỉ được tính khi buổi học bắt đầu và có xác nhận kết nối hai phía.");
  }
  touch=()=>{this.lastInteraction=Date.now();};
  setDeafened(value:boolean){this.deafened=value;this.touch();}
  private onPageHide=()=>{this.close();};
  private async leave(connectionId=this.connectionId){if(!connectionId)return;await fetch(`/api/rooms/${this.classId}`,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.token}`},body:JSON.stringify({connectionId}),keepalive:true}).catch(()=>{});}
  close(){if(this.closed)return;this.closed=true;this.tracks.forEach((track)=>track?.stop());for(const timer of this.timers)clearTimeout(timer);this.timers.clear();window.removeEventListener("pagehide",this.onPageHide);window.removeEventListener("pointerdown",this.touch);window.removeEventListener("keydown",this.touch);for(const peer of this.peers.values()){peer.channel?.close();peer.pc.close();}this.peers.clear();if(this.channel&&supabase)void supabase.removeChannel(this.channel);void this.leave();}
  async refreshRoster(){
    if(this.closed)return;
    const result=await api<{classSession:PlatformClass;peers:RoomMember[]}>(`/api/rooms/${this.classId}`);
    if(this.closed)return;this.roster=result.peers;this.events.classChanged(result.classSession);
    this.self=this.roster.find((member)=>member.connection_id===this.connectionId)||null;
    if(!this.self)throw new Error("Phiên phòng đã đóng hoặc đang được sử dụng ở tab khác.");
    for(const member of this.roster){if(member.connection_id!==this.connectionId)this.ensurePeer(member);}
    for(const [id,peer] of this.peers){if(!this.roster.some((member)=>member.connection_id===id)){peer.pc.close();this.peers.delete(id);}}
    this.emit();
  }
  private async signal(to:string,kind:Signal["kind"],payload:Record<string,unknown>){if(this.closed)return;await api(`/api/rooms/${this.classId}/signal`,{method:"POST",body:JSON.stringify({connectionId:this.connectionId,toConnectionId:to,kind,payload})});}
  private ensurePeer(member:RoomMember){
    const id=member.connection_id;const existing=this.peers.get(id);if(existing){existing.member=member;return existing;}
    const pc=new RTCPeerConnection({iceServers:this.ice});
    const peer:Peer={member,pc,media:new MediaStream(),screen:new MediaStream(),connected:false,mic:false,camera:false,sharing:false,makingOffer:false,ignoreOffer:false,settingAnswer:false,queuedIce:[],chain:Promise.resolve()};this.peers.set(id,peer);
    for(const [index,kind] of (["audio","video","video"] as const).entries()){const transceiver=pc.addTransceiver(kind,{direction:"sendrecv"});if(this.tracks[index])void transceiver.sender.replaceTrack(this.tracks[index]);}
    pc.onicecandidate=(event)=>{if(event.candidate)void this.signal(id,"ice",{candidate:event.candidate.toJSON()}).catch((error)=>this.events.status(error.message));};
    pc.onnegotiationneeded=async()=>{try{peer.makingOffer=true;await pc.setLocalDescription();if(pc.localDescription)await this.signal(id,"description",{description:pc.localDescription.toJSON()});}catch(error){if(!this.closed)this.events.status(error instanceof Error?error.message:"Không thương lượng được kết nối.");}finally{peer.makingOffer=false;}};
    pc.onconnectionstatechange=()=>{peer.connected=pc.connectionState==="connected";if(pc.connectionState==="failed"){this.events.status("Kết nối P2P thất bại. Mạng có thể cần TURN; có thể chuyển buổi học sang Meet/Discord.");pc.restartIce();}this.emit();};
    pc.ontrack=(event)=>{const index=pc.getTransceivers().indexOf(event.transceiver);const stream=index===2?peer.screen:peer.media;if(!stream.getTracks().some((track)=>track.id===event.track.id))stream.addTrack(event.track);event.track.onunmute=()=>this.emit();event.track.onmute=()=>this.emit();this.emit();};
    pc.ondatachannel=(event)=>this.attachDataChannel(peer,event.channel);
    if(this.connectionId<id)this.attachDataChannel(peer,pc.createDataChannel("pencily"));
    return peer;
  }
  private attachDataChannel(peer:Peer,channel:RTCDataChannel){peer.channel=channel;channel.onopen=()=>{channel.send(JSON.stringify({type:"notes",value:this.latestNotes}));channel.send(JSON.stringify({type:"media",...this.controls}));};channel.onmessage=(event)=>{if(typeof event.data!=="string"||event.data.length>24000)return;void this.receiveData(peer,event.data).catch((error)=>this.events.status(error.message));};}
  private async receiveSignal(signal:Signal){
    if(this.closed||this.seenSignals.has(signal.id))return;this.seenSignals.add(signal.id);
    if(this.seenSignals.size>3000)this.seenSignals=new Set([...this.seenSignals].slice(-1500));
    let member=this.roster.find((item)=>item.connection_id===signal.from_connection_id);if(!member){await this.refreshRoster();member=this.roster.find((item)=>item.connection_id===signal.from_connection_id);}if(!member)return;
    const peer=this.ensurePeer(member);if(signal.kind==="hello")return;
    peer.chain=peer.chain.catch(()=>{}).then(async()=>{
      if(peer.pc.signalingState==="closed")return;
      if(signal.kind==="description"){
        const description=signal.payload.description as RTCSessionDescriptionInit;
        const ready=!peer.makingOffer&&(peer.pc.signalingState==="stable"||peer.settingAnswer);
        const collision=description.type==="offer"&&!ready;const polite=this.connectionId>peer.member.connection_id;
        peer.ignoreOffer=!polite&&collision;if(peer.ignoreOffer)return;
        peer.settingAnswer=description.type==="answer";await peer.pc.setRemoteDescription(description);peer.settingAnswer=false;
        for(const candidate of peer.queuedIce)await peer.pc.addIceCandidate(candidate);peer.queuedIce=[];
        if(description.type==="offer"){await peer.pc.setLocalDescription();if(peer.pc.localDescription)await this.signal(peer.member.connection_id,"description",{description:peer.pc.localDescription.toJSON()});}
      }else if(signal.kind==="ice"){
        const candidate=signal.payload.candidate as RTCIceCandidateInit;if(peer.ignoreOffer)return;
        if(peer.pc.remoteDescription)await peer.pc.addIceCandidate(candidate);else peer.queuedIce.push(candidate);
      }
    });await peer.chain;
  }
  private send(value:object){const data=JSON.stringify(value);for(const peer of this.peers.values())if(peer.channel?.readyState==="open")peer.channel.send(data);}
  sendChat(text:string){this.touch();const message:RoomChat={id:crypto.randomUUID(),sender:this.self?.name||"Bạn",text:text.trim().slice(0,4000),time:new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})};if(!message.text)return;this.events.chat(message);this.send({type:"chat",id:message.id,text:message.text});}
  setNotes(content:string){this.touch();this.latestNotes={counter:this.latestNotes.counter+1,author:this.connectionId,content:content.slice(0,16000)};this.events.notes(this.latestNotes.content);this.send({type:"notes",value:this.latestNotes});}
  async setTrack(index:0|1|2,track:MediaStreamTrack|null){if(this.closed){track?.stop();return;}this.tracks[index]=track;this.touch();for(const peer of this.peers.values()){const sender=peer.pc.getTransceivers()[index]?.sender;if(sender)await sender.replaceTrack(track);}this.controls={mic:Boolean(this.tracks[0]?.enabled),camera:Boolean(this.tracks[1]?.enabled),sharing:Boolean(this.tracks[2])};this.send({type:"media",...this.controls});}
  private async hasMedia(peer:Peer){let present=false;const stats=await peer.pc.getStats();stats.forEach((report)=>{if((report.type==="inbound-rtp"&&report.bytesReceived>0)||(report.type==="outbound-rtp"&&report.bytesSent>0))present=true;});return present;}
  private async receiveData(peer:Peer,raw:string){
    let data:Record<string,unknown>;try{data=JSON.parse(raw);}catch{return;}
    if(!data||typeof data!=="object")return;
    if(data.type==="chat"&&typeof data.text==="string"&&data.text.trim())this.events.chat({id:typeof data.id==='string'?data.id:crypto.randomUUID(),sender:peer.member.name,text:data.text.slice(0,4000),time:new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})});
    if(data.type==="notes"){
      const value=data.value as Notes;if(!value||!Number.isSafeInteger(value.counter)||value.counter<0||typeof value.author!=="string"||typeof value.content!=="string"||value.content.length>16000)return;
      if(value.counter>this.latestNotes.counter||(value.counter===this.latestNotes.counter&&value.author>this.latestNotes.author)){this.latestNotes=value;this.events.notes(value.content);}
    }
    if(data.type==="media"){peer.mic=data.mic===true;peer.camera=data.camera===true;peer.sharing=data.sharing===true;this.emit();}
    if(data.type==="attendance-challenge"&&this.self?.is_host&&peer.connected&&peer.channel?.readyState==="open"&&await this.hasMedia(peer)){
      await api('/api/attendance/heartbeat',{method:'POST',body:JSON.stringify({phase:'ack',connectionId:this.connectionId,challengeId:data.challengeId,nonce:data.nonce,peerConnectionId:peer.member.connection_id})});
      peer.channel.send(JSON.stringify({type:'attendance-ack',challengeId:data.challengeId}));
    }
    if(data.type==="attendance-ack"&&peer.member.is_host&&typeof data.challengeId==='string'&&data.challengeId===this.pendingChallenge&&peer.connected){
      this.pendingChallenge='';await api('/api/attendance/heartbeat',{method:'POST',body:JSON.stringify({phase:'claim',connectionId:this.connectionId,challengeId:data.challengeId})});this.events.credited();this.events.status('Server đã xác nhận phút học. Điểm PP được cập nhật theo thời gian thực học.');peer.channel?.send(JSON.stringify({type:'attendance-credited'}));
    }
    if(data.type==='attendance-credited'&&this.self?.is_host)this.events.credited();
  }
  private async presenceLoop(){try{const active=!this.deafened&&(Boolean(this.tracks[0]?.enabled)||Boolean(this.tracks[1]?.enabled)||Date.now()-this.lastInteraction<900000);await api(`/api/rooms/${this.classId}`,{method:'PATCH',body:JSON.stringify({connectionId:this.connectionId,active})});await this.refreshRoster();}catch(error){this.events.status(error instanceof Error?error.message:'Không xác nhận được kết nối.');if(error instanceof ApiError&&(error.status===409||error.status===401))this.close();}finally{if(!this.closed)this.later(()=>{void this.presenceLoop();},25000);}}
  private async signalRecoveryLoop(){try{const result=await api<{signals:Signal[]}>(`/api/rooms/${this.classId}/signal?connectionId=${this.connectionId}`);for(const signal of result.signals)await this.receiveSignal(signal);}catch(error){if(!this.closed)this.events.status(error instanceof Error?error.message:'Không đồng bộ được signaling.');}finally{this.later(()=>{void this.signalRecoveryLoop();},10000);}}
  private async attendanceLoop(){
    try{
      const host=[...this.peers.values()].find((peer)=>peer.member.is_host&&peer.connected&&peer.channel?.readyState==='open');
      if(!this.self?.is_host&&host&&!this.deafened&&await this.hasMedia(host)){
        const result=await api<{challenge:{id:string;nonce:string}}>('/api/attendance/heartbeat',{method:'POST',body:JSON.stringify({phase:'challenge',connectionId:this.connectionId})});this.pendingChallenge=result.challenge.id;host.channel!.send(JSON.stringify({type:'attendance-challenge',challengeId:result.challenge.id,nonce:result.challenge.nonce}));
      }else if(!this.self?.is_host)this.events.status('Chưa tính giờ: cần tutor, kết nối âm thanh/video thực tế và buổi học đã bắt đầu.');
    }catch(error){this.events.status(error instanceof Error?error.message:'Chưa xác nhận được phút học.');}finally{this.later(()=>{void this.attendanceLoop();},60000);}
  }
}

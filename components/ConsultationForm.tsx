import React, { useState } from 'react';
import { Send, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

export const ConsultationForm: React.FC = () => {
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isAgreed) {
        alert("개인정보 수집 및 이용에 동의해야 합니다.");
        return;
    }
    setStatus("SUBMITTING");
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mvzzjrgz", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section id="consultation" className="py-24 bg-yellow-400 text-black">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Text */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <h2 className="text-3xl md:text-4xl font-black leading-tight">
              망설이지 마세요.<br/>
              취업 전문가가 <br/>
              친절하게 안내해드립니다.
            </h2>
            <p className="text-lg font-medium text-black/80">
              국비지원 자격 여부부터 취업 및 교육과정까지<br/>
              <span className="border-b-2 border-black">무료로 상담해드립니다.</span>
            </p>
            
            <div className="space-y-4 pt-8">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-yellow-400 rounded-full flex items-center justify-center">
                        <Phone size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold opacity-70">교육문의</p>
                        <p className="text-2xl font-black">1877-5280</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-yellow-400 rounded-full flex items-center justify-center">
                        <MapPin size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-bold opacity-70">교육장소</p>
                        <p className="text-lg font-bold">부평 / 구로 / 성남</p>
                    </div>
                </div>
            </div>
            <p className="font-bold text-base mt-8">여러분의 꿈을 응원합니다!</p>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl">
            {status === "SUCCESS" ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">상담 신청이 완료되었습니다!</h3>
                    <p className="text-gray-600 text-sm">빠른 시일 내에 전문 상담원이 연락드리겠습니다.</p>
                    <button onClick={() => setStatus("IDLE")} className="mt-8 text-xs text-gray-500 underline">다시 작성하기</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    빠른 교육상담 신청
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700">이름</label>
                        <input required name="name" type="text" placeholder="홍길동" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-700">출생년도</label>
                        <input required name="birthyear" type="text" placeholder="예: 1995" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all text-sm" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">연락처</label>
                    <input required name="phone" type="tel" placeholder="010-0000-0000" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all text-sm" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">관심과정</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                            <input type="radio" name="course" value="전기기능사" required className="accent-yellow-400" />
                            <span className="text-xs font-medium">전기기능사</span>
                        </label>
                        <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 flex-1">
                            <input type="radio" name="course" value="전기(산업)기사" className="accent-yellow-400" />
                            <span className="text-xs font-medium">전기(산업)기사</span>
                        </label>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700">문의내용</label>
                    <textarea name="message" rows={3} placeholder="궁금하신 점을 자유롭게 적어주세요." className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 outline-none transition-all resize-none text-sm"></textarea>
                </div>

                {/* Privacy Policy */}
                <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                         <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input 
                                type="checkbox" 
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                                className="w-4 h-4 accent-yellow-400 rounded cursor-pointer" 
                            />
                            <span className="text-xs font-bold text-gray-700">
                                개인정보 수집 및 이용에 동의합니다.
                            </span>
                        </label>
                        <button 
                            type="button"
                            onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
                            className="text-[10px] font-bold text-gray-500 hover:text-black flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded"
                        >
                            {isPrivacyOpen ? '접기' : '자세히보기'}
                            {isPrivacyOpen ? <ChevronUp size={10}/> : <ChevronDown size={10}/>}
                        </button>
                    </div>

                    {isPrivacyOpen && (
                        <div className="bg-gray-50 p-4 rounded-lg text-[11px] text-black animate-fade-in-down border border-gray-200 mb-4">
                            <h5 className="font-bold mb-2">개인정보 수집 및 이용 동의 (필수)</h5>
                            <p className="mb-2">국비교육원 실시간온라인문의 신청을 위해 다음과 같이 개인정보를 수집 및 이용합니다.</p>
                            <table className="w-full border-collapse border border-gray-300 mb-2 text-center bg-white">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-1 text-black">수집 및 이용목적</th>
                                        <th className="border border-gray-300 p-1 text-black">수집항목</th>
                                        <th className="border border-gray-300 p-1 text-black">보유 및 이용기간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-1 text-black">실시간온라인문의</td>
                                        <td className="border border-gray-300 p-1 text-black">이름, 연락처 등</td>
                                        <td className="border border-gray-300 p-1 text-black">60일 까지</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="text-gray-500 leading-tight">
                                동의를 거부하실 경우 신청이 불가합니다.
                            </p>
                        </div>
                    )}
                </div>

                <button 
                    disabled={status === "SUBMITTING"}
                    className="w-full bg-black text-white font-bold py-4 rounded-xl text-base hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2"
                >
                    {status === "SUBMITTING" ? "전송 중..." : "무료상담 신청하기"}
                    <Send size={16} />
                </button>
                <p className="text-[10px] text-center text-gray-500 mt-4">
                    개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
                </p>
                </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
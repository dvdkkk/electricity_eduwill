import React from 'react';
import { TARGET_AUDIENCE } from '../constants';
import { TrendingUp, Award, Building2, Check, Users } from 'lucide-react';

export const VisionSection: React.FC = () => {
  const visionItems = [
    {
      Icon: Award,
      num: '01',
      title: '보수·승진 우대',
      desc: '기술직 공무원 및 기업체 보수나 승진에 있어 확실한 우대'
    },
    {
      Icon: Building2,
      num: '02',
      title: '공기업 가산점',
      desc: '한국전력공사 등 주요 공기업 입사 지원 시 가산점 부여'
    },
    {
      Icon: TrendingUp,
      num: '03',
      title: '전기 관리직 수요',
      desc: '4차 산업 발전과 함께 꾸준히 수요가 늘어나는 전문직'
    },
    {
      Icon: Users,
      num: '04',
      title: '중장년층 취업 가능',
      desc: '나이 무관! 은퇴 없는 평생 직업으로 제2의 인생 시작'
    }
  ];

  return (
    <section id="vision" className="py-24 bg-black relative">
       {/* Decorative gradient */}
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

      <div className="container mx-auto px-4">
        {/* Why Choose Section */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-yellow-400 text-[11px] font-bold tracking-widest uppercase mb-3">VISION</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">왜 주목해야 하나?</h3>
            <p className="text-gray-400 text-xs md:text-sm">전기기사 자격증이 지속적으로 인기를 끄는 확실한 이유</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionItems.map((item, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-7 rounded-2xl border border-zinc-800 hover:border-yellow-400/50 transition-colors group relative overflow-hidden">
                <div className="text-yellow-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <item.Icon size={32} />
                </div>
                <div className="text-3xl font-black text-white absolute top-6 right-6 select-none opacity-20">{item.num}</div>
                <h4 className="text-base font-bold text-white mb-4 relative z-10">{item.title}</h4>
                <p className="text-gray-400 relative z-10 text-[11px] md:text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Card & Target Audience */}
        <div className="grid lg:grid-cols-2 gap-12">
            {/* National Funding Info */}
            <div className="bg-gradient-to-br from-zinc-900 to-black p-8 md:p-10 rounded-3xl border border-zinc-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-6">국민내일배움카드 국비지원</h3>
                
                <div className="space-y-6 relative z-10">
                    <div className="flex gap-4">
                        <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-yellow-400 font-bold text-base">₩</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">고용노동부 훈련비 지원</h4>
                            <p className="text-gray-400 text-[11px]">직종 취업률별 일부 자부담 발생 (국비지원과정)</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-yellow-400 font-bold text-base">$</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">훈련수당 지급</h4>
                            <p className="text-gray-400 text-[11px]">월 최대 61만 6천원 (유형별 상이)</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-yellow-400 font-bold text-[10px]">Pass</span>
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">취업성공수당</h4>
                            <p className="text-gray-400 text-[11px]">취업 성공 시 최대 150만원 지급</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Target Audience */}
            <div className="bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-800 flex flex-col justify-center">
                <h3 className="text-lg md:text-xl font-bold text-white mb-8">교육 훈련 대상</h3>
                <ul className="space-y-3.5">
                    {TARGET_AUDIENCE.map((target, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                            <div className="bg-yellow-400/20 p-1 rounded-full mt-0.5">
                                <Check size={11} className="text-yellow-400" />
                            </div>
                            <span className="text-gray-300 text-xs">{target}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-zinc-800">
                    <p className="text-center text-gray-500 text-[10px]">
                        * 비전공자도 기초부터 탄탄하게 배워 전문가가 될 수 있습니다.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
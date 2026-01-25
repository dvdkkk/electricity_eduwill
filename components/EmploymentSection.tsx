import React from 'react';
import { EMPLOYMENT_STATUS, PROCESS_STEPS } from '../constants';
import { Briefcase } from 'lucide-react';

export const EmploymentSection: React.FC = () => {
  // Triple the list for smoother infinite loop
  const marqueeList = [...EMPLOYMENT_STATUS, ...EMPLOYMENT_STATUS, ...EMPLOYMENT_STATUS];

  return (
    <section id="employment" className="py-24 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto px-4 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
                <h2 className="text-yellow-400 text-[11px] font-bold tracking-widest uppercase mb-3">Employment Status</h2>
                <h3 className="text-2xl font-bold text-white">취업 현황</h3>
            </div>
            <p className="text-gray-400 text-xs md:text-right md:max-w-sm">
                20대부터 50대까지, 나이와 성별을 불문하고<br/> 많은 수료생들이 현장에서 활약하고 있습니다.
            </p>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="w-full bg-zinc-900 py-5 border-y border-zinc-800 mb-24 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-900 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-900 to-transparent z-10"></div>
        
        <div className="animate-marquee flex gap-5 px-4">
          {marqueeList.map((item, idx) => (
            <div 
              key={`${item.company}-${idx}`} 
              className="flex-shrink-0 bg-black border border-zinc-800 rounded-xl p-3.5 w-56 hover:border-yellow-400 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="bg-zinc-800 text-gray-300 text-[9px] px-1.5 py-0.5 rounded">{item.branch}</span>
                <span className="text-yellow-400 text-[9px] font-bold">취업성공</span>
              </div>
              <h4 className="text-white text-xs font-bold truncate mb-1">{item.company}</h4>
              <div className="flex justify-between items-end">
                <p className="text-gray-400 text-[10px]">{item.name} 수강생</p>
                <p className="text-zinc-500 text-[9px] truncate max-w-[80px]">{item.license}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Employment Process */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">에듀윌 취업 연계 PROCESS</h3>
            <p className="text-gray-400 text-xs">입학부터 취업까지 체계적인 5단계 시스템</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-9 left-0 w-full h-px bg-zinc-800 -z-0"></div>

            {PROCESS_STEPS.map((step, idx) => (
                <div key={idx} className="relative z-10 group">
                    <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-full hover:-translate-y-2 transition-transform duration-300 hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-400/10">
                        <div className="w-9 h-9 bg-black rounded-full border-2 border-yellow-400 text-yellow-400 flex items-center justify-center font-bold text-sm mb-6 mx-auto group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                            {step.step}
                        </div>
                        <h4 className="text-sm font-bold text-white text-center mb-3 break-keep">
                            {step.title}
                        </h4>
                        <p className="text-gray-500 text-[10px] text-center break-keep leading-relaxed">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};
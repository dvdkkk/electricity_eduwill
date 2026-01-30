import React, { useRef, useState, useEffect } from 'react';
import { Calendar, MousePointer2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const ExamSchedule: React.FC = () => {
  const { content } = useContent();
  const { technician, engineer } = content.examSchedule;
  
  // 각 테이블별 스크롤 참조
  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);

  // 스크롤 감지 (어느 하나라도 스크롤되면 힌트 숨김)
  const handleScroll = () => {
    if (
      (scrollRef1.current && scrollRef1.current.scrollLeft > 20) ||
      (scrollRef2.current && scrollRef2.current.scrollLeft > 20)
    ) {
      setShowScrollHint(false);
    }
  };

  const Table = ({ data, title, scrollRef }: { data: typeof technician, title: string, scrollRef: React.RefObject<HTMLDivElement> }) => (
    <div className="mb-12 last:mb-0">
      <h4 className="text-xl md:text-2xl font-bold text-white mb-4 pl-2 border-l-4 border-yellow-400">
        {title}
      </h4>
      <div className="relative rounded-xl border border-zinc-700 bg-black overflow-hidden shadow-2xl">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-x-auto custom-scrollbar"
          style={{ 
            scrollbarColor: '#facc15 #18181b', 
            scrollbarWidth: 'thin' 
          }}
        >
          <table className="w-full text-sm min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-zinc-800 text-white border-b border-zinc-700">
                <th className="py-4 px-4 font-bold text-center border-r border-zinc-700 w-[15%]">구분</th>
                <th className="py-4 px-4 font-bold text-center border-r border-zinc-700 w-[14%]">필기원서접수</th>
                <th className="py-4 px-4 font-bold text-center border-r border-zinc-700 w-[14%] text-yellow-400">필기시험</th>
                <th className="py-4 px-4 font-bold text-center border-r border-zinc-700 w-[14%]">필기발표</th>
                <th className="py-4 px-4 font-bold text-center border-r border-zinc-700 w-[14%]">실기원서접수</th>
                <th className="py-4 px-4 font-bold text-center border-r border-zinc-700 w-[14%] text-yellow-400">실기시험</th>
                <th className="py-4 px-4 font-bold text-center w-[15%]">실기발표</th>
              </tr>
            </thead>
            <tbody className="text-gray-300 divide-y divide-zinc-800">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="py-4 px-4 text-center font-bold text-white border-r border-zinc-800 whitespace-pre-line">
                    {row.round}
                  </td>
                  <td className="py-4 px-4 text-center border-r border-zinc-800 text-xs md:text-sm whitespace-pre-line">
                    {row.writtenApp}
                  </td>
                  <td className="py-4 px-4 text-center border-r border-zinc-800 text-xs md:text-sm font-bold text-yellow-400">
                    {row.writtenExam}
                  </td>
                  <td className="py-4 px-4 text-center border-r border-zinc-800 text-xs md:text-sm">
                    {row.writtenRes}
                  </td>
                  <td className="py-4 px-4 text-center border-r border-zinc-800 text-xs md:text-sm">
                    {row.practicalApp}
                  </td>
                  <td className="py-4 px-4 text-center border-r border-zinc-800 text-xs md:text-sm font-bold text-yellow-400">
                    {row.practicalExam}
                  </td>
                  <td className="py-4 px-4 text-center text-xs md:text-sm">
                    {row.practicalRes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-14 bg-zinc-900 border-b border-zinc-800 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 mb-4">
            <Calendar size={14} />
            <span className="text-xs font-bold tracking-wide">Schedule</span>
          </div>
          <h3 className="text-2xl md:text-4xl font-black text-white mb-3">
            2026년 정기시험 일정
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
            시험 일정을 미리 확인하고 체계적으로 준비하세요.
          </p>
        </div>

        {/* Scroll Hint (Mobile) */}
        <div className={`md:hidden flex justify-end mb-2 transition-opacity duration-300 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-1 text-xs text-yellow-400 animate-pulse">
            <MousePointer2 size={12} className="rotate-90" />
            <span>좌우로 스크롤하여 확인하세요</span>
          </div>
        </div>

        {/* Tables */}
        <Table data={technician} title="전기기능사 (1~5달전 공부시작)" scrollRef={scrollRef1} />
        <Table data={engineer} title="전기(산업)기사 (1~5달전 공부시작)" scrollRef={scrollRef2} />

        <div className="mt-4 text-center">
            <p className="text-[10px] text-gray-600">
                ※ 상기 일정은 공단 사정에 따라 변경될 수 있으며, 빈자리 접수 등 세부 일정은 큐넷(Q-Net) 공지사항을 확인하시기 바랍니다.
            </p>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #18181b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #facc15;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #eab308;
        }
      `}</style>
    </section>
  );
};
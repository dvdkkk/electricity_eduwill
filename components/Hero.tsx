import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/retrofuturisticcircuitloop-slaUZQa1nNOPcuJ6yjRHlM02/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full scale-105"
          style={{ pointerEvents: 'none' }} // 3D 인터랙션 비활성화로 스크롤 방해 방지
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 z-10 relative text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 mb-6 animate-fade-in-up">
          <Star size={14} fill="currentColor" />
          <span className="text-xs font-bold tracking-wide">취업잘되는 자격증 4위, 전기분야</span>
        </div>
        
        <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
          미래를 밝히는 기술 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            전기 전문가
          </span>로 거듭나세요
        </h1>
        
        <p className="text-base md:text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          에듀윌 국비교육원에서 <strong className="text-white">전기기능사·전기(산업)기사</strong> 자격증 취득부터 <br className="hidden md:block"/>
          실무 교육, 그리고 <strong className="text-yellow-400">취업지원</strong>까지 한 번에 해결하십시오.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a 
            href="#consultation" 
            onClick={(e) => handleNavClick(e, '#consultation')}
            className="group w-full md:w-auto px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          >
            국비지원 무료상담 신청하기
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#courses" 
            onClick={(e) => handleNavClick(e, '#courses')}
            className="w-full md:w-auto px-7 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white text-lg font-bold rounded-xl transition-all border border-zinc-700"
          >
            교육과정 자세히 보기
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 pt-8">
          {[
            { label: '교육비 지원', value: '국비지원' },
            { label: '모집 정원', value: '각 20명' },
            { label: '교육 장소', value: '부평/구로/성남' },
            { label: '취업 지원', value: '1:1 매칭' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
              <p className="text-lg md:text-xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
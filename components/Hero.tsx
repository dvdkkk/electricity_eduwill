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
      {/* Background overlay */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img 
          src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1920&auto=format&fit=crop" 
          alt="전기설비 배경이미지" 
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 z-10 relative text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 mb-6 animate-fade-in-up">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-bold tracking-wide">취업잘되는 자격증 4위, 전기분야</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          미래를 밝히는 기술, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            전기 전문가
          </span>로 거듭나세요
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light">
          에듀윌 국비교육원에서 <strong className="text-white">전기기능사·전기(산업)기사</strong> 자격증 취득부터 <br className="hidden md:block"/>
          실무 교육, 그리고 <strong className="text-yellow-400">취업지원</strong>까지 한 번에 해결하십시오.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <a 
            href="#consultation" 
            onClick={(e) => handleNavClick(e, '#consultation')}
            className="group w-full md:w-auto px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black text-lg font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          >
            국비지원 무료상담 신청하기
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#courses" 
            onClick={(e) => handleNavClick(e, '#courses')}
            className="w-full md:w-auto px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white text-lg font-bold rounded-xl transition-all border border-zinc-700"
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
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
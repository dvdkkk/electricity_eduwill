import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      
      // 모바일 환경(768px 미만)이고 상담신청(#consultation)일 경우 
      // 기존 420px에서 약 1행(30px) 위로 조정한 390px 추가 스크롤
      const isMobile = window.innerWidth < 768;
      const additionalOffset = (isMobile && targetId === 'consultation') ? 390 : 0;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset + additionalOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: '비전 & 혜택', href: '#vision' },
    { name: '시험일정', href: '#schedule' },
    { name: '과정소개', href: '#courses' },
    { name: '전기기능사', href: '#course-1' },
    { name: '전기(산업)기사', href: '#course-2' },
    { name: '취업현황', href: '#employment' },
    { name: '상담신청', href: '#consultation' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg border-b border-gray-800' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-2xl md:text-3xl font-black tracking-tighter text-white"
        >
          <span className="text-yellow-400">Eduwill</span> 국비교육원
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-lg font-medium transition-colors ${
                link.name === '상담신청' 
                  ? 'text-yellow-400 font-bold' 
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:18775280" 
            onClick={(e) => {
              // PC 환경(1024px 이상)에서는 스크롤, 모바일에서는 전화 연결
              // handleNavClick에는 e.preventDefault()가 있어 링크 이동(전화)을 막고 스크롤합니다.
              // 모바일에서는 이 함수를 호출하지 않음으로써 href="tel:..."이 정상 작동하게 합니다.
              const isPc = window.innerWidth >= 1024;
              if (isPc) {
                handleNavClick(e, '#consultation');
              }
            }}
            className="flex items-center gap-2 bg-yellow-400 text-black px-5 py-2 rounded-full font-bold text-lg hover:bg-yellow-300 transition-transform hover:scale-105"
          >
            <PhoneCall size={20} />
            1877-5280
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 p-4 flex flex-col space-y-4 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-base font-medium py-2 border-b border-zinc-800 ${
                link.name === '상담신청' 
                  ? 'text-yellow-400 font-bold' 
                  : 'text-gray-300 hover:text-yellow-400'
              }`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#consultation" 
            className="bg-yellow-400 text-black text-center py-3 rounded-md font-bold text-sm"
            onClick={(e) => handleNavClick(e, '#consultation')}
          >
            무료상담 신청하기
          </a>
        </div>
      )}
    </nav>
  );
};
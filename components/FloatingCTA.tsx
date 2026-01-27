import React, { useEffect, useState } from 'react';

export const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 조금 발생하면 버튼 표시 (Hero 영역의 버튼과 자연스럽게 이어지도록)
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('consultation');
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
    <div 
      className={`fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none transition-all duration-500 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
    >
      <a 
        href="#consultation" 
        onClick={handleClick}
        className="pointer-events-auto bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-sm py-3 px-6 rounded-full shadow-[0_4px_15px_rgb(0,0,0,0.3)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95 border border-yellow-300"
      >
        국비무료상담 신청
      </a>
    </div>
  );
};
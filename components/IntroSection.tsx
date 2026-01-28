import React, { useEffect, useRef, useState } from 'react';
import { Users, Zap, Target } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // 한 번 실행 후 관찰 중단
        }
      },
      {
        threshold: 0.01, // 1%만 보여도 트리거
        rootMargin: '0px' // 지연 없이 즉시 감지
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 애니메이션용 기본 클래스 (속도 200ms)
  const transitionBase = "transition-all duration-200 ease-out transform";
  
  // 상태에 따른 스타일 반환
  const getStyle = (delay: string) => ({
    className: `${transitionBase} ${delay} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`
  });

  const fieldImages = [
    "https://postfiles.pstatic.net/MjAyNjAxMjhfNjcg/MDAxNzY5NTcwMzIyMzU4.UKzP7PD7KQWFR-nsAPLOOMn2IcKW8b0N28YChdPLz0Yg.5qKMY9Fo1EdWSrwFm837mQFYckzrqxGD4XgIC23MvMMg.PNG/Gemini_Generated_Image_4spg6f4spg6f4spg.png?type=w466", // User provided image 1
    "https://postfiles.pstatic.net/MjAyNjAxMjhfMTgx/MDAxNzY5NTcwMzIyMzY4.nZmd95fkyvp32b9yIJ-1hIx0EpkTyaozkOuUx2fM8_0g.F_PTgpCDA4xlwDYEW5cx_wu1wHKOF6VyZwTc6FGsU-4g.PNG/Gemini_Generated_Image_hm87dchm87dchm87.png?type=w466", // User provided image 2
    "https://postfiles.pstatic.net/MjAyNjAxMjhfMTY2/MDAxNzY5NTcwMzIyMzYw.1_YtzWJjzPhvojxVFHzcvnSaSuke6m78x1ijUnykMDMg.TgXr-tKFDxHZxneRVjyzArXRSmMX00zoH0Pas_vjQ7wg.PNG/Gemini_Generated_Image_gxb5oigxb5oigxb5.png?type=w466", // User provided image 3
    "https://postfiles.pstatic.net/MjAyNjAxMjhfMzAw/MDAxNzY5NTcwMzIyMzQ5.J4AtHagzmy4V7wuSjIiU6Ozx8j4XLnVO1cE9Mi-J9r4g.MQBue43Js4oAA6M_aEA3BXYHDAhEZzyvm9Y8FzIT2Lgg.PNG/Gemini_Generated_Image_zwtxwzwtxwzwtxwz.png?type=w466"  // User provided image 4
  ];

  return (
    <section ref={sectionRef} className="py-10 md:py-14 bg-black relative border-b border-zinc-900 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50"></div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Top Badge */}
          <div className={getStyle("delay-0").className}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-yellow-400 mb-8 shadow-[0_0_15px_rgba(250,204,21,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">Education Mission</span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className={`text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[1.3] md:leading-[1.2] mb-10 tracking-tight break-keep ${getStyle("delay-100").className}`}>
            전공·경력·나이에 상관없이<br />
            <span className="relative inline-block px-2">
                <span className="absolute inset-0 bg-yellow-400 rounded-lg transform translate-y-1"></span>
                <span className="relative text-black">‘할 수 있는 사람’</span>
            </span>을<br className="md:hidden"/> 만들어냅니다
          </h2>

          {/* Description */}
          <p className={`text-base md:text-xl text-zinc-400 font-light leading-relaxed mb-12 break-keep ${getStyle("delay-200").className}`}>
            20대부터 50대까지, <span className="text-zinc-200 font-medium">성별과 전공을 넘어</span><br className="hidden md:block" />
            다양한 수료생들이 지금 이 순간에도 <span className="text-white border-b border-yellow-400/50 pb-0.5">현장에서 활약하고 있습니다.</span>
          </p>

          {/* Field Photos Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 mb-14 px-2 md:px-0 ${getStyle("delay-300").className}`}>
            {fieldImages.map((src, index) => (
              <div key={index} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-lg">
                <img 
                  src={src} 
                  alt={`교육 현장 사진 ${index + 1}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50"></div>
              </div>
            ))}
          </div>

          {/* Stats / Icons Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 text-left ${getStyle("delay-500").className}`}>
            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl hover:border-yellow-400/30 transition-colors group">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <Users size={20} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">나이 무관</h3>
              <p className="text-zinc-500 text-xs">20대 취업준비생부터 50대 재취업 희망자까지</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl hover:border-yellow-400/30 transition-colors group">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <Target size={20} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">전공 무관</h3>
              <p className="text-zinc-500 text-xs">인문계, 비전공자도 기초부터 확실하게</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl hover:border-yellow-400/30 transition-colors group">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-white mb-3 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                <Zap size={20} />
              </div>
              <h3 className="text-white font-bold text-base mb-1.5">자격증 +실무 중심</h3>
              <p className="text-zinc-500 text-xs">자격증 + 실무 중심 교육으로 현장 투입 즉시 가능</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
import React, { useRef, useState, useEffect } from 'react';
import { Target, Zap, BookOpen, ThumbsUp, Quote } from 'lucide-react';

export const SuccessStrategy: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Intersection Observer hook
  const useOnScreen = (ref: React.RefObject<HTMLElement>) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),
        { threshold: 0.1 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, [ref]);
    return isIntersecting;
  };
  
  const isVisible = useOnScreen(scrollRef);

  const strategies = [
    {
      icon: <Target className="w-8 h-8 text-black" />,
      title: "핵심 위주의 고효율 커리큘럼",
      desc: "방대한 이론 중 시험에 꼭 나오는 핵심만 짚어드립니다. 단기간에 합격권 실력을 완성하는 완성도 높은 커리큘럼입니다."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-black" />,
      title: "초보자 눈높이 맞춤 교육",
      desc: "생소한 용어와 수학 공식도 비전공자의 눈높이에서 알기 쉽게 설명합니다. 막연한 두려움을 자신감으로 바꿔드립니다."
    },
    {
      icon: <Zap className="w-8 h-8 text-black" />,
      title: "실전 중심의 완벽한 실기 대비",
      desc: "도면 해석부터 배관 배선까지 반복 훈련을 진행합니다. 초보자도 자연스럽게 도면을 보고 작업할 수 있는 수준으로 끌어올립니다."
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-black" />,
      title: "최적의 학습 환경과 지원",
      desc: "학습에만 집중할 수 있는 최고의 시설과 자재, 열정적인 강사진이 여러분의 합격을 끝까지 책임집니다."
    }
  ];

  const reviews = [
    {
      name: "오OO님",
      text: "에듀윌의 환경과 시설 자재 모두 너무나 맘에 들었습니다. 선생님의 열정적인 강의 덕분에 시험 합격할 수 있었습니다.",
      tag: "최종합격"
    },
    {
      name: "박OO님",
      text: "초심자여서 막연함과 생소한 용어, 수학 공식들로 인해 어려움이 있었지만, 선생님의 강의를 들으면 들을 수록 이해가 잘 되었습니다.",
      tag: "비전공자"
    },
    {
      name: "최OO님",
      text: "실기에 초보에 가까웠던 제가 아주 자연스럽게 도면을 보고 배관배선을 하게 된 것을 보고 감탄하게 되었습니다.",
      tag: "실기합격"
    },
    {
      name: "한OO님",
      text: "비교적 짧은 교육기간(2개월)에 비해 전기기능사자격취득을 위한 커리큘럼의 완성도가 높다고 판단됩니다.",
      tag: "단기합격"
    },
    {
      name: "김OO님",
      text: "주요내용과 용어들이 처음에는 힘들었지만, 에듀윌의 좋은 학습분위기와 꽉찬 수업진행에 잘 적응하면서 용기와 자신감이 생겼습니다.",
      tag: "취업준비"
    },
    {
      name: "정OO님",
      text: "처음 공부하는 시험인데 알기 쉽게 설명해주시면서 공부하기 쉽게 중요부분을 짚어주셔서 매우 좋았습니다.",
      tag: "필기합격"
    }
  ];

  return (
    <section ref={scrollRef} className="py-20 bg-black relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-yellow-400 text-xs font-bold tracking-widest uppercase mb-3">SUCCESS STRATEGY</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white mb-6">
            합격을 만드는 <span className="text-yellow-400">확실한 전략</span>
          </h3>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            수많은 합격생들이 증명하는 에듀윌 국비교육원만의 합격 비결을 공개합니다.
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {strategies.map((item, idx) => (
            <div 
              key={idx}
              className={`bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-yellow-400/50 transition-all duration-300 group hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed word-keep break-keep">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Reviews */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center gap-2 mb-10">
            <Quote className="text-yellow-400 fill-yellow-400" size={24} />
            <h3 className="text-2xl font-bold text-white">수강생 리얼 후기</h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 relative flex flex-col justify-between hover:border-zinc-600 transition-colors duration-300">
                <div>
                  <div className="text-zinc-700 mb-4">
                    <Quote size={20} className="transform scale-x-[-1]" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10 break-keep min-h-[80px]">
                    {review.text}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-sm">{review.name}</p>
                    <p className="text-xs text-yellow-400 font-medium">#{review.tag}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
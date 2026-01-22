import React from 'react';
import { COURSES } from '../constants';
import { CheckCircle2, Calendar, MapPin, Users, BookOpen } from 'lucide-react';

export const CourseSection: React.FC = () => {
  return (
    <section id="courses" className="py-24 bg-zinc-950 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-yellow-400 font-bold tracking-widest uppercase mb-3">Education Courses</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">체계적인 교육과정</h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            이론부터 실무까지, 초보자도 전문가로 성장할 수 있는 에듀윌만의 독보적인 커리큘럼을 만나보세요.
          </p>
        </div>

        {/* Courses List - Vertical Stack */}
        <div className="space-y-24">
          {COURSES.map((course, index) => (
            <div 
              key={course.id} 
              id={course.id}
              className="block scroll-mt-32" 
            >
              <div className="grid md:grid-cols-2 gap-12 items-start">
                {/* Left Info */}
                <div className="space-y-8">
                  <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 relative overflow-hidden group hover:border-yellow-400/50 transition-colors">
                     {/* Number Badge */}
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black font-black text-xl px-4 py-2 rounded-bl-2xl">
                      0{index + 1}
                    </div>

                    <h4 className="text-3xl font-bold text-white mb-2">{course.title}</h4>
                    <p className="text-yellow-400 font-medium mb-6">{course.subTitle}</p>
                    <p className="text-gray-400 leading-relaxed mb-8 border-b border-zinc-800 pb-8">
                      {course.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <Calendar className="text-yellow-400 shrink-0" />
                        <div>
                          <span className="block text-gray-500 text-sm">교육기간</span>
                          <span className="text-white font-medium">{course.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="text-yellow-400 shrink-0" />
                        <div>
                          <span className="block text-gray-500 text-sm">모집정원</span>
                          <span className="text-white font-medium">{course.capacity}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-yellow-400 shrink-0" />
                        <div>
                          <span className="block text-gray-500 text-sm">교육장소</span>
                          <span className="text-white font-medium">{course.locations}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="text-yellow-400 shrink-0" />
                        <div>
                          <span className="block text-gray-500 text-sm">수업형태</span>
                          <span className="text-white font-medium">{course.classTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Image */}
                   <div className="relative rounded-3xl overflow-hidden aspect-video border border-zinc-800 group shadow-2xl">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                          <span className="bg-yellow-400 text-black font-bold px-4 py-1 rounded-full text-sm">
                              {course.type === 'technician' ? '전기기능사 실습 현장' : '전기(산업)기사 실무 교육'}
                          </span>
                      </div>
                   </div>
                </div>

                {/* Right Curriculum */}
                <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 h-full">
                  <div className="flex items-center justify-between mb-8">
                    <h5 className="text-2xl font-bold text-white">CURRICULUM</h5>
                    <span className="text-xs font-bold px-3 py-1 bg-yellow-400 text-black rounded-full">자격증취득 + 실무중심</span>
                  </div>

                  <div className="space-y-6">
                    {course.curriculum.map((item, idx) => (
                      <div key={idx} className="group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-yellow-400 font-bold shrink-0 group-hover:bg-yellow-400 group-hover:text-black transition-colors">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <h6 className="text-lg font-bold text-white mb-2">{item.category}</h6>
                            <ul className="space-y-2">
                              {item.subjects.map((sub, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2 text-gray-400 text-sm">
                                  <CheckCircle2 size={16} className="text-zinc-600 mt-0.5 shrink-0" />
                                  {sub}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        {idx !== course.curriculum.length - 1 && (
                          <div className="w-px h-6 bg-zinc-800 ml-6 my-2"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
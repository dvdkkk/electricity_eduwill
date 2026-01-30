import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { 
  Save, Monitor, ChevronRight, LogOut, Layout, 
  Image as ImageIcon, Target, Calendar, Award, 
  MessageSquare, BarChart3, Globe, Hash, Clock, MousePointer
} from 'lucide-react';

const SECTIONS = [
  { id: 'stats', label: '방문 통계', icon: BarChart3 },
  { id: 'hero', label: '메인 상단(Hero)', icon: Layout },
  { id: 'intro', label: '소개(Intro)', icon: ImageIcon },
  { id: 'vision', label: '비전(Vision)', icon: Target },
  { id: 'schedule', label: '시험일정(Schedule)', icon: Calendar },
  { id: 'strategy', label: '합격전략(Strategy)', icon: Award },
  { id: 'reviews', label: '수강후기(Reviews)', icon: MessageSquare },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { content, visitorLogs, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState('stats');
  const [tempContent, setTempContent] = useState(content);

  React.useEffect(() => {
    setTempContent(content);
  }, [content, activeTab]);

  const handleSave = () => {
    updateContent(tempContent);
    alert('저장되었습니다.');
  };

  const handleBackToSite = () => {
    window.location.hash = '';
    window.location.reload();
  };

  const handleChange = (path: string, value: any) => {
    const keys = path.split('.');
    setTempContent(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const renderInput = (label: string, path: string, type: 'text' | 'textarea' = 'text') => (
    <div className="mb-4 last:mb-0">
      <label className="block text-[10px] font-bold text-gray-500 mb-1.5 uppercase tracking-widest">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-yellow-400 outline-none transition-all"
          rows={3}
          value={path.split('.').reduce((o: any, i) => o[i], tempContent)}
          onChange={(e) => handleChange(path, e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-yellow-400 outline-none transition-all"
          value={path.split('.').reduce((o: any, i) => o[i], tempContent)}
          onChange={(e) => handleChange(path, e.target.value)}
        />
      )}
    </div>
  );

  // 통계 데이터 가공
  const uniqueVisitors = new Set(visitorLogs.map(log => log.ip)).size;
  const totalVisits = visitorLogs.length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-72 bg-zinc-950 border-r border-zinc-900 flex-shrink-0 flex flex-col">
        <div className="p-8 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/50">
          <div>
            <h1 className="text-xl font-black text-yellow-400 tracking-tighter">EDUWILL <span className="text-white">CMS</span></h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Content Management</p>
          </div>
          <button onClick={onLogout} className="p-2 text-gray-600 hover:text-red-500 transition-colors" title="로그아웃">
            <LogOut size={18} />
          </button>
        </div>
        
        <nav className="p-6 space-y-2 flex-grow overflow-y-auto">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-all ${
                  activeTab === section.id 
                    ? 'bg-yellow-400 text-black font-black shadow-lg shadow-yellow-400/10' 
                    : 'text-gray-500 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{section.label}</span>
                {activeTab === section.id && <ChevronRight size={14} className="ml-auto" />}
              </button>
            );
          })}
        </nav>

        <div className="p-6 border-t border-zinc-900">
          <button 
            onClick={handleBackToSite}
            className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white py-4 rounded-xl font-bold text-xs transition-all border border-zinc-800"
          >
            <Monitor size={14} />
            홈페이지 미리보기
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-black">
        <div className="max-w-6xl mx-auto p-8 md:p-12 pb-32">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold mb-2 uppercase tracking-widest">
                <span className="w-8 h-px bg-yellow-400"></span>
                {SECTIONS.find(s => s.id === activeTab)?.id} section
              </div>
              <h2 className="text-3xl font-black">{SECTIONS.find(s => s.id === activeTab)?.label}</h2>
            </div>
            {activeTab !== 'stats' && (
              <button 
                onClick={handleSave}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-xl font-black shadow-xl shadow-yellow-400/20 transition-all transform active:scale-95"
              >
                <Save size={18} />
                변경사항 저장하기
              </button>
            )}
          </div>

          <div className="space-y-10">
            {activeTab === 'stats' && (
              <div className="space-y-10 animate-fade-in-up">
                {/* Statistics Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <BarChart3 size={64} />
                    </div>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">총 조회수</p>
                    <h3 className="text-4xl font-black text-white mb-1">{totalVisits.toLocaleString()}</h3>
                    <p className="text-zinc-600 text-[10px]">누적 페이지 로드 횟수</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Globe size={64} />
                    </div>
                    <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">순 방문자수</p>
                    <h3 className="text-4xl font-black text-white mb-1">{uniqueVisitors.toLocaleString()}</h3>
                    <p className="text-zinc-600 text-[10px]">중복 제외 접속 IP 수</p>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Hash size={64} />
                    </div>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">오늘의 방문자</p>
                    <h3 className="text-4xl font-black text-white mb-1">
                      {visitorLogs.filter(log => log.timestamp.startsWith(new Date().toISOString().split('T')[0])).length}
                    </h3>
                    <p className="text-zinc-600 text-[10px]">금일 기준 접속 횟수</p>
                  </div>
                </div>

                {/* Detailed Logs Table */}
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/30">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Clock size={18} className="text-yellow-400" />
                      최근 접속 로그 (최근 500건)
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-black/40 text-[10px] text-zinc-500 font-black uppercase tracking-widest border-b border-zinc-800">
                          <th className="px-6 py-4 w-40">접속 일시</th>
                          <th className="px-6 py-4 w-32">IP 주소</th>
                          <th className="px-6 py-4 w-48">검색 유입어</th>
                          <th className="px-6 py-4">이전 접속 경로 (Referrer)</th>
                          <th className="px-6 py-4 w-12"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/50">
                        {visitorLogs.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-6 py-20 text-center text-zinc-600 text-sm">
                              데이터가 아직 수집되지 않았습니다.
                            </td>
                          </tr>
                        ) : (
                          visitorLogs.map((log) => (
                            <tr key={log.id} className="hover:bg-zinc-800/30 transition-colors group">
                              <td className="px-6 py-5">
                                <span className="text-xs text-zinc-400 font-mono">
                                  {new Date(log.timestamp).toLocaleString('ko-KR', {
                                    month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
                                  })}
                                </span>
                              </td>
                              <td className="px-6 py-5">
                                <span className="text-xs font-bold text-white bg-zinc-800 px-2 py-1 rounded">
                                  {log.ip}
                                </span>
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                  {log.keyword !== '없음' ? (
                                    <span className="text-xs text-yellow-400 font-bold bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
                                      {log.keyword}
                                    </span>
                                  ) : (
                                    <span className="text-xs text-zinc-600">-</span>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-5 max-w-md">
                                <div className="flex items-center gap-2">
                                  <MousePointer size={12} className="text-zinc-600 shrink-0" />
                                  <span className="text-xs text-zinc-400 truncate block hover:text-white transition-colors cursor-default" title={log.referrer}>
                                    {log.referrer}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hero' && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center gap-2">
                    <Layout size={18} /> 메인 텍스트 설정
                  </h3>
                  <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 space-y-4 shadow-sm">
                    {renderInput('배지 텍스트', 'hero.badge')}
                    {renderInput('메인 타이틀', 'hero.title')}
                    {renderInput('강조 텍스트 (그라데이션)', 'hero.highlight')}
                    {renderInput('설명글', 'hero.description', 'textarea')}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">주요 통계 지표</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempContent.hero.stats.map((_, i) => (
                      <div key={i} className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                        <p className="text-[10px] text-yellow-500 font-black mb-3 uppercase tracking-tighter">Stat 0{i+1}</p>
                        {renderInput('항목명', `hero.stats.${i}.label`)}
                        {renderInput('데이터 값', `hero.stats.${i}.value`)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'intro' && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">섹션 헤더 정보</h3>
                  <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 space-y-4">
                    {renderInput('미션 배지', 'intro.badge')}
                    {renderInput('타이틀 첫 줄', 'intro.title1')}
                    {renderInput('강조 키워드', 'intro.highlight')}
                    {renderInput('타이틀 둘째 줄', 'intro.title2')}
                    {renderInput('소개 설명문', 'intro.description', 'textarea')}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-4">갤러리 이미지 (4개)</h3>
                  <div className="grid grid-cols-1 gap-3 p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                    {tempContent.intro.images.map((_, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        <span className="text-zinc-600 font-mono text-xs w-4">0{i+1}</span>
                        <div className="flex-1">
                          {renderInput('', `intro.images.${i}`)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-8 animate-fade-in-up">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">4대 비전 메시지</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tempContent.vision.items.map((item, i) => (
                    <div key={i} className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase">{item.num}</span>
                      </div>
                      {renderInput('비전 제목', `vision.items.${i}.title`)}
                      {renderInput('세부 설명', `vision.items.${i}.desc`, 'textarea')}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'strategy' && (
              <div className="space-y-8 animate-fade-in-up">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">합격 전략 커리큘럼</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tempContent.strategy.items.map((item, i) => (
                    <div key={i} className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                      <p className="text-[10px] text-yellow-500 font-black mb-3 uppercase tracking-tighter">Strategy 0{i+1}</p>
                      {renderInput('전략 제목', `strategy.items.${i}.title`)}
                      {renderInput('설명글', `strategy.items.${i}.desc`, 'textarea')}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 animate-fade-in-up">
                <h3 className="text-lg font-bold text-yellow-400 mb-4">수강생 리얼 후기</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tempContent.strategy.reviews.map((item, i) => (
                    <div key={i} className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800 space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1">{renderInput('작성자명', `strategy.reviews.${i}.name`)}</div>
                        <div className="flex-1">{renderInput('후기 태그', `strategy.reviews.${i}.tag`)}</div>
                      </div>
                      {renderInput('후기 내용', `strategy.reviews.${i}.text`, 'textarea')}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'schedule' && (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-6 flex items-center gap-2">
                    <Calendar size={18} /> 전기기능사 일정 관리
                  </h3>
                  <div className="space-y-4">
                    {tempContent.examSchedule.technician.map((item, i) => (
                      <div key={i} className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                        <div className="mb-4 border-b border-zinc-800 pb-4">
                          {renderInput('회차명 (예: 제 1회 정기시험)', `examSchedule.technician.${i}.round`)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                          {renderInput('필기 원서접수', `examSchedule.technician.${i}.writtenApp`)}
                          {renderInput('필기 시험일', `examSchedule.technician.${i}.writtenExam`)}
                          {renderInput('필기 합격발표', `examSchedule.technician.${i}.writtenRes`)}
                          {renderInput('실기 원서접수', `examSchedule.technician.${i}.practicalApp`)}
                          {renderInput('실기 시험일', `examSchedule.technician.${i}.practicalExam`)}
                          {renderInput('최종 합격발표', `examSchedule.technician.${i}.practicalRes`)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-6 flex items-center gap-2">
                    <Award size={18} /> 전기(산업)기사 일정 관리
                  </h3>
                  <div className="space-y-4">
                    {tempContent.examSchedule.engineer.map((item, i) => (
                      <div key={i} className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800">
                        <div className="mb-4 border-b border-zinc-800 pb-4">
                          {renderInput('회차명', `examSchedule.engineer.${i}.round`)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                          {renderInput('필기 원서접수', `examSchedule.engineer.${i}.writtenApp`)}
                          {renderInput('필기 시험일', `examSchedule.engineer.${i}.writtenExam`)}
                          {renderInput('필기 합격발표', `examSchedule.engineer.${i}.writtenRes`)}
                          {renderInput('실기 원서접수', `examSchedule.engineer.${i}.practicalApp`)}
                          {renderInput('실기 시험일', `examSchedule.engineer.${i}.practicalExam`)}
                          {renderInput('최종 합격발표', `examSchedule.engineer.${i}.practicalRes`)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
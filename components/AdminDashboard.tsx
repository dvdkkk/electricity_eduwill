import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { Save, Monitor, ChevronRight, LogOut } from 'lucide-react';

const SECTIONS = [
  { id: 'hero', label: '메인 상단(Hero)' },
  { id: 'intro', label: '소개(Intro)' },
  { id: 'vision', label: '비전(Vision)' },
  { id: 'schedule', label: '시험일정(Schedule)' },
  { id: 'strategy', label: '합격전략(Strategy)' },
  { id: 'reviews', label: '수강후기(Reviews)' },
];

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState('hero');
  const [tempContent, setTempContent] = useState(content);

  // Sync temp state when active tab changes or content updates externally
  React.useEffect(() => {
    setTempContent(content);
  }, [content]);

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
    <div className="mb-4">
      <label className="block text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
      {type === 'textarea' ? (
        <textarea
          className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-yellow-400 outline-none transition-colors"
          rows={4}
          value={path.split('.').reduce((o: any, i) => o[i], tempContent)}
          onChange={(e) => handleChange(path, e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-yellow-400 outline-none transition-colors"
          value={path.split('.').reduce((o: any, i) => o[i], tempContent)}
          onChange={(e) => handleChange(path, e.target.value)}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-zinc-900 border-r border-zinc-800 flex-shrink-0">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-black text-yellow-400 mb-1">ADMIN</h1>
            <p className="text-xs text-gray-500">콘텐츠 관리 시스템</p>
          </div>
          <button onClick={onLogout} className="text-gray-500 hover:text-red-500 transition-colors" title="로그아웃">
            <LogOut size={20} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition-colors ${
                activeTab === section.id 
                  ? 'bg-yellow-400 text-black font-bold' 
                  : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {section.label}
              {activeTab === section.id && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-zinc-800 space-y-3">
            <button 
                onClick={handleBackToSite}
                className="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg font-bold text-sm transition-colors"
            >
                <Monitor size={16} />
                사이트 보기
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen">
        <div className="max-w-4xl mx-auto p-8 pb-32">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{SECTIONS.find(s => s.id === activeTab)?.label} 수정</h2>
            <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-yellow-400/20 transition-all"
            >
                <Save size={18} />
                변경사항 저장
            </button>
          </div>

          <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
            {activeTab === 'hero' && (
              <div className="space-y-6">
                {renderInput('배지 텍스트', 'hero.badge')}
                {renderInput('메인 타이틀', 'hero.title')}
                {renderInput('강조 텍스트 (그라데이션)', 'hero.highlight')}
                {renderInput('설명글', 'hero.description', 'textarea')}
                <div className="grid grid-cols-2 gap-4">
                  {tempContent.hero.stats.map((_, i) => (
                    <div key={i} className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
                      <p className="text-xs text-yellow-500 font-bold mb-2">통계 #{i+1}</p>
                      {renderInput('라벨', `hero.stats.${i}.label`)}
                      {renderInput('값', `hero.stats.${i}.value`)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'intro' && (
              <div className="space-y-6">
                {renderInput('미션 배지', 'intro.badge')}
                {renderInput('타이틀 1', 'intro.title1')}
                {renderInput('강조 텍스트', 'intro.highlight')}
                {renderInput('타이틀 2', 'intro.title2')}
                {renderInput('설명글', 'intro.description', 'textarea')}
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">이미지 URL (4개)</label>
                  <div className="grid grid-cols-1 gap-3">
                    {tempContent.intro.images.map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white focus:border-yellow-400 outline-none text-xs font-mono"
                        value={tempContent.intro.images[i]}
                        onChange={(e) => handleChange(`intro.images.${i}`, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="space-y-6">
                {tempContent.vision.items.map((item, i) => (
                   <div key={i} className="p-5 bg-zinc-800/30 rounded-xl border border-zinc-700">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-yellow-400 font-bold">비전 항목 {item.num}</span>
                      </div>
                      {renderInput('제목', `vision.items.${i}.title`)}
                      {renderInput('설명', `vision.items.${i}.desc`)}
                   </div>
                ))}
              </div>
            )}
            
            {activeTab === 'strategy' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white mb-4">전략 항목 수정</h3>
                {tempContent.strategy.items.map((item, i) => (
                   <div key={i} className="p-5 bg-zinc-800/30 rounded-xl border border-zinc-700 mb-4">
                      <p className="text-xs text-yellow-500 font-bold mb-2">Strategy {i+1}</p>
                      {renderInput('제목', `strategy.items.${i}.title`)}
                      {renderInput('설명', `strategy.items.${i}.desc`)}
                   </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {tempContent.strategy.reviews.map((item, i) => (
                    <div key={i} className="p-5 bg-zinc-800/30 rounded-xl border border-zinc-700">
                        <p className="text-xs text-yellow-500 font-bold mb-2">후기 {i+1}</p>
                        {renderInput('이름', `strategy.reviews.${i}.name`)}
                        {renderInput('태그', `strategy.reviews.${i}.tag`)}
                        {renderInput('내용', `strategy.reviews.${i}.text`, 'textarea')}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
             {activeTab === 'schedule' && (
              <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-4">기능사 일정</h3>
                    <div className="space-y-4">
                        {tempContent.examSchedule.technician.map((item, i) => (
                            <div key={i} className="p-4 bg-zinc-800/30 rounded border border-zinc-700 grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    {renderInput('회차명', `examSchedule.technician.${i}.round`)}
                                </div>
                                {renderInput('필기접수', `examSchedule.technician.${i}.writtenApp`)}
                                {renderInput('필기시험', `examSchedule.technician.${i}.writtenExam`)}
                                {renderInput('필기발표', `examSchedule.technician.${i}.writtenRes`)}
                                {renderInput('실기접수', `examSchedule.technician.${i}.practicalApp`)}
                                {renderInput('실기시험', `examSchedule.technician.${i}.practicalExam`)}
                                {renderInput('실기발표', `examSchedule.technician.${i}.practicalRes`)}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-4">기사/산업기사 일정</h3>
                     <div className="space-y-4">
                        {tempContent.examSchedule.engineer.map((item, i) => (
                            <div key={i} className="p-4 bg-zinc-800/30 rounded border border-zinc-700 grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    {renderInput('회차명', `examSchedule.engineer.${i}.round`)}
                                </div>
                                {renderInput('필기접수', `examSchedule.engineer.${i}.writtenApp`)}
                                {renderInput('필기시험', `examSchedule.engineer.${i}.writtenExam`)}
                                {renderInput('필기발표', `examSchedule.engineer.${i}.writtenRes`)}
                                {renderInput('실기접수', `examSchedule.engineer.${i}.practicalApp`)}
                                {renderInput('실기시험', `examSchedule.engineer.${i}.practicalExam`)}
                                {renderInput('실기발표', `examSchedule.engineer.${i}.practicalRes`)}
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
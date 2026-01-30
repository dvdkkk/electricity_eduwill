import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { CourseSection } from './components/CourseSection';
import { VisionSection } from './components/VisionSection';
import { EmploymentSection } from './components/EmploymentSection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { CursorFollower } from './components/CursorFollower';
import { ExamSchedule } from './components/ExamSchedule';
import { SuccessStrategy } from './components/SuccessStrategy';
import { ContentProvider } from './contexts/ContentContext';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';

function AppContent() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      // 보안을 위해 URL Hash 변경: #admin -> #0107761
      const isRoute = window.location.hash === '#0107761';
      setIsAdminRoute(isRoute);
      
      // 세션 스토리지 체크 (새로고침 해도 로그인 유지)
      const hasAuth = sessionStorage.getItem('admin_auth') === 'true';
      setIsAuthenticated(hasAuth);
    };
    
    checkRoute(); // Initial check
    window.addEventListener('hashchange', checkRoute);
    
    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu only in admin mode
      if (window.location.hash !== '#0107761') {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (window.location.hash !== '#0107761') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    window.location.hash = ''; // 메인으로 리다이렉트
  };

  if (isAdminRoute) {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={handleLogin} />;
    }
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black cursor-none md:cursor-auto">
      <CursorFollower />
      <Navigation />
      <main>
        <Hero />
        <IntroSection />
        <VisionSection />
        <ExamSchedule />
        <CourseSection />
        <SuccessStrategy />
        <EmploymentSection />
        <ConsultationForm />
      </main>
      <FloatingCTA />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

export default App;
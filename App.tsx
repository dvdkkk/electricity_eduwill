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

function AppContent() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    
    checkHash(); // Initial check
    window.addEventListener('hashchange', checkHash);
    
    const handleContextMenu = (e: MouseEvent) => {
      // Allow context menu in admin mode
      if (window.location.hash !== '#admin') {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (window.location.hash !== '#admin') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      window.removeEventListener('hashchange', checkHash);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  if (isAdmin) {
    return <AdminDashboard />;
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
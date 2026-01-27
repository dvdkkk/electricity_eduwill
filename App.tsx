import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { CourseSection } from './components/CourseSection';
import { VisionSection } from './components/VisionSection';
import { EmploymentSection } from './components/EmploymentSection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-400 selection:text-black">
      <Navigation />
      <main>
        <Hero />
        <IntroSection />
        <VisionSection />
        <CourseSection />
        <EmploymentSection />
        <ConsultationForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
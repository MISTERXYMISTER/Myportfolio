// app/page.tsx
'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';

// Your existing imports
import Header from "@/sections/Header";
import HeroSection from "@/sections/Hero";
import { ProjectsSection } from "@/sections/Projects";
import { TapeSection } from "@/sections/Tape";
import { TestimonialsSection } from "@/sections/Testimonials";
import { AboutSection } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      
      <div className={isLoading ? 'hidden' : 'block'}>
        <Header />
        <HeroSection />
        <ProjectsSection />
        <TapeSection />
        <TestimonialsSection />
        <AboutSection />
        {/* <Contact /> */}
        <Footer />
      </div>
    </div>
  );
}
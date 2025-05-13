import { LandingNavbar } from '@/components/public/LandingNavbar';
import { Hero } from '@/components/public/Hero';
import { Features } from '@/components/public/Features';
import { Footer } from '@/components/public/Footer';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const LandingPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <div className="flex min-h-screen flex-col">
      <LandingNavbar />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

import { LandingNavbar } from '@/components/public/LandingNavbar';
import { Hero } from '@/components/public/Hero';
import { Features } from '@/components/public/Features';
import { Footer } from '@/components/public/Footer';

export const LandingPage = () => {
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

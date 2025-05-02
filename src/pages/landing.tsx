import { LandingNavbar } from '@/components/layout/public/LandingNavbar';
import { Hero } from '@/components/layout/public/Hero';
import { Features } from '@/components/layout/public/Features';
import { Footer } from '@/components/layout/public/Footer';

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

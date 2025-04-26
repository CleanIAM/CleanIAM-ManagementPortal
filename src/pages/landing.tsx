import { Navbar } from '@/components/layout/public/Navbar';
import { Hero } from '@/components/layout/public/Hero';
import { Features } from '@/components/layout/public/Features';
import { Footer } from '@/components/layout/public/Footer';

export const LandingPage = () => {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex-grow">
				<Hero />
				<Features />
			</main>
			<Footer />
		</div>
	);
};

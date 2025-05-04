import { Outlet } from 'react-router-dom';
import { Navbar } from '../public/Navbar';
import { Container } from '../ui/container';
import { Footer } from '../public/Footer';

export const RootLayout = () => {
	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm">
				<Navbar />
			</header>

			{/* Main content */}
			<main className="flex-1">
				<Container>
					<Outlet />
				</Container>
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
};

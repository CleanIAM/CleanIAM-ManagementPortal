import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PublicLayoutProps {
	showNav?: boolean;
	showFooter?: boolean;
}

export const PublicLayout = ({ showNav = true, showFooter = true }: PublicLayoutProps) => {
	return (
		<div className="flex min-h-screen flex-col">
			{showNav && <Navbar />}
			<main className="flex-grow">
				<Outlet />
			</main>
			{showFooter && <Footer />}
		</div>
	);
};

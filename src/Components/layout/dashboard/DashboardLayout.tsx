import { Outlet } from 'react-router-dom';
import { DashboardNavbar } from './DashboardNavbar';
import { DashboardFooter } from './DashboardFooter';
import { Container } from '@/components/ui/container';

export const DashboardLayout = () => {
	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<DashboardNavbar />
			<main className="flex-grow py-8">
				<Container>
					<Outlet />
				</Container>
			</main>
			<DashboardFooter />
		</div>
	);
};

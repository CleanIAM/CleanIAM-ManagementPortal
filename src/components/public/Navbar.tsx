import { NavLink } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useAuth } from 'react-oidc-context';
import { useRoles } from '@/lib/hooks/useRoles';

export const Navbar = () => {
	const auth = useAuth();
	const roles = useRoles();
	const handleLogout = async () => {
		try {
			await auth.signoutRedirect({ post_logout_redirect_uri: window.location.origin + '/' });
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<header className="bg-white shadow-sm">
			<Container>
				<div className="flex h-16 justify-between">
					{/* Logo and desktop navigation */}
					<div className="flex">
						<div className="flex flex-shrink-0 items-center">
							<NavLink to="/home" className="text-xl font-bold text-blue-800">
								CleanIAM
							</NavLink>
						</div>

						{/* Desktop navigation */}
						<nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<NavLink
								to="/home"
								className={({ isActive }) =>
									`${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
								}
							>
								Dashboard
							</NavLink>

							<NavLink
								to="/applications"
								className={({ isActive }) =>
									`${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
								}
							>
								Applications
							</NavLink>

							<NavLink
								to="/users"
								className={({ isActive }) =>
									`${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
								}
							>
								Users
							</NavLink>

							<NavLink
								to="/profile"
								className={({ isActive }) =>
									`${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
								}
							>
								Profile
							</NavLink>

							<NavLink
								to="/test"
								className={({ isActive }) =>
									`${isActive ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`
								}
							>
								API Test
							</NavLink>
						</nav>
					</div>

					{/* Right side user dropdown (desktop) */}
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						{/* User name */}
						<div className="sm:block">
							<span className="text-sm font-medium text-gray-700">{roles}</span>
						</div>

						<Button
							variant="ghost"
							onClick={handleLogout}
							className="text-gray-600 hover:text-gray-900"
						>
							Logout
						</Button>
						<div className="relative ml-3">
							<div>
								<button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
									<span className="sr-only">Open user menu</span>
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200">
										<span className="font-medium text-blue-800">JD</span>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</header>
	);
};

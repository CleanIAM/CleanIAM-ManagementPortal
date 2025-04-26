import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';

export const RootLayout = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			{/* Header */}
			<header className="bg-white shadow-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 justify-between">
						{/* Logo and desktop navigation */}
						<div className="flex">
							<div className="flex flex-shrink-0 items-center">
								<NavLink to="/" className="text-xl font-bold text-blue-800">
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

						{/* Mobile menu button */}
						<div className="flex items-center sm:hidden">
							<button
								onClick={toggleMobileMenu}
								className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							>
								<span className="sr-only">Open main menu</span>
								{/* Heroicon name: outline/menu */}
								<svg
									className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
								{/* Heroicon name: outline/x */}
								<svg
									className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* Right side user dropdown (desktop) */}
						<div className="hidden sm:ml-6 sm:flex sm:items-center">
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
				</div>

				{/* Mobile menu */}
				<div className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
					<div className="space-y-1 pb-3 pt-2">
						<NavLink
							to="/home"
							className={({ isActive }) =>
								`${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
							}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Dashboard
						</NavLink>

						<NavLink
							to="/applications"
							className={({ isActive }) =>
								`${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
							}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Applications
						</NavLink>

						<NavLink
							to="/profile"
							className={({ isActive }) =>
								`${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
							}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							Profile
						</NavLink>

						<NavLink
							to="/test"
							className={({ isActive }) =>
								`${isActive ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'} block border-l-4 py-2 pl-3 pr-4 text-base font-medium`
							}
							onClick={() => setIsMobileMenuOpen(false)}
						>
							API Test
						</NavLink>
					</div>
				</div>
			</header>

			{/* Main content */}
			<main className="flex-1">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="border-t border-gray-200 bg-white py-6"></footer>
		</div>
	);
};

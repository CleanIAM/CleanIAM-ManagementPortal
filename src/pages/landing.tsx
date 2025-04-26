import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

export const LandingPage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-screen flex-col">
			{/* Header */}
			<header className="bg-white px-6 py-4 shadow-sm">
				<div className="mx-auto flex max-w-7xl items-center justify-between">
					<div className="flex items-center">
						<h1 className="text-2xl font-bold text-blue-800">CleanIAM</h1>
					</div>
					<Button
						onClick={() => navigate('/auth/signin')}
						variant="outline"
						className="border-blue-600 text-blue-600 hover:bg-blue-50"
					>
						Sign In
					</Button>
				</div>
			</header>

			{/* Hero Section */}
			<section className="flex flex-grow items-center">
				<div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:flex lg:items-center lg:gap-x-10">
					<div className="lg:w-1/2">
						<h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
							<span className="block text-blue-600">Modern IAM</span>
							<span className="block">for your applications</span>
						</h1>
						<p className="mt-6 text-xl text-gray-500">
							CleanIAM provides a simple and secure way to manage identity and access for your
							applications. Built with modern standards and best practices.
						</p>
						<div className="mt-10 flex gap-x-6">
							<Button
								onClick={() => navigate('/auth/signin')}
								size="lg"
								className="bg-blue-600 hover:bg-blue-700"
							>
								Get Started
							</Button>
							<Link to="/about">
								<Button variant="outline" size="lg">
									Learn more
								</Button>
							</Link>
						</div>
					</div>
					<div className="mt-12 lg:mt-0 lg:w-1/2">
						<div className="rounded-xl border border-blue-100 bg-blue-50 p-8 shadow-lg">
							<div className="flex h-64 items-center justify-center">
								<div className="text-center">
									<div className="mb-4 inline-flex rounded-full bg-blue-100 p-6">
										<svg
											className="h-10 w-10 text-blue-600"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
											/>
										</svg>
									</div>
									<h3 className="text-xl font-medium text-gray-900">Secure by Design</h3>
									<p className="mt-2 text-gray-600">
										Built with OpenID Connect and OAuth 2.0 for enterprise-grade security.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-gray-50 py-16">
				<div className="mx-auto max-w-7xl px-6">
					<h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Key Features</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{/* Feature 1 */}
						<div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-900">Single Sign-On</h3>
							<p className="mt-2 text-gray-600">
								Provide a seamless authentication experience across all your applications.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-900">Fine-grained Access Control</h3>
							<p className="mt-2 text-gray-600">
								Manage permissions and roles with granular control for your applications.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
							<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500 text-white">
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-medium text-gray-900">Multi-factor Authentication</h3>
							<p className="mt-2 text-gray-600">
								Add an extra layer of security with support for various MFA methods.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-800 py-10 text-white">
				<div className="mx-auto max-w-7xl px-6">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<div className="mb-4 md:mb-0">
							<h3 className="text-xl font-semibold">CleanIAM</h3>
							<p className="mt-1 text-gray-400">Modern Identity and Access Management</p>
						</div>
						<div>
							<p className="text-gray-400">
								&copy; {new Date().getFullYear()} CleanIAM. All rights reserved.
							</p>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

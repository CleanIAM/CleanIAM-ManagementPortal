import { Link } from 'react-router-dom';

export const HomePage = () => {
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<h1 className="mb-6 text-3xl font-bold text-blue-800">Welcome to CleanIAM</h1>

			<div className="mb-8 rounded-lg bg-white p-6 shadow-md">
				<p className="mb-4 text-gray-700">
					This is the dashboard for managing your IAM applications and users.
				</p>

				<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
						<h2 className="mb-3 text-xl font-semibold text-blue-800">Applications</h2>
						<p className="mb-4 text-gray-600">
							Manage your OpenID Connect applications, clients, and configurations.
						</p>
						<Link
							to="/applications"
							className="inline-block w-full rounded bg-blue-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-blue-700"
						>
							View Applications
						</Link>
					</div>

					<div className="rounded-lg border border-purple-100 bg-purple-50 p-6">
						<h2 className="mb-3 text-xl font-semibold text-purple-800">User Management</h2>
						<p className="mb-4 text-gray-600">
							Manage user accounts, permissions, and authentication settings.
						</p>
						<Link
							to="/profile"
							className="inline-block w-full rounded bg-purple-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-purple-700"
						>
							View Profile
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

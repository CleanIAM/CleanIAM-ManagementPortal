import { Test } from '../components/test';

export const ApplicationsPage = () => {
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold text-blue-800">Applications</h1>
				<p className="text-gray-600">Manage your OpenID Connect applications</p>
			</div>

			<div className="mb-8 rounded-lg bg-white p-6 shadow-md">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:shadow-md">
						<h3 className="mb-2 text-lg font-semibold text-blue-800">Authentication Service</h3>
						<p className="text-sm text-gray-600">Main authentication provider</p>
						<div className="mt-3 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
							Active
						</div>
					</div>

					<div className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:shadow-md">
						<h3 className="mb-2 text-lg font-semibold text-blue-800">Customer Portal</h3>
						<p className="text-sm text-gray-600">Client application for customers</p>
						<div className="mt-3 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
							Active
						</div>
					</div>

					<div className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:shadow-md">
						<h3 className="mb-2 text-lg font-semibold text-blue-800">Admin Dashboard</h3>
						<p className="text-sm text-gray-600">Administrative interface</p>
						<div className="mt-3 inline-block rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
							Maintenance
						</div>
					</div>

					<div className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:shadow-md">
						<h3 className="mb-2 text-lg font-semibold text-blue-800">Mobile App</h3>
						<p className="text-sm text-gray-600">iOS and Android client</p>
						<div className="mt-3 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
							Active
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-end">
					<button className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
						Add Application
					</button>
				</div>
			</div>

			<div className="rounded-lg bg-white p-6 shadow-md">
				<h2 className="mb-4 text-xl font-semibold text-gray-800">API Test</h2>
				<Test />
			</div>
		</div>
	);
};

import { Test } from '../components/test';

export const TestPage = () => {
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold text-gray-800">API Test</h1>
				<p className="text-gray-600">Check if the API is working correctly</p>
			</div>

			<div className="rounded-lg bg-white p-6 shadow-md">
				<div className="mb-6">
					<h2 className="mb-2 text-xl font-semibold text-gray-800">Test Endpoint Status</h2>
					<p className="mb-4 text-gray-600">
						This page tests the connection to the backend API by calling the test endpoint. It will
						show if the API is accessible and responding correctly.
					</p>
				</div>

				<div className="border-t border-gray-200 pt-6">
					<Test />
				</div>
			</div>
		</div>
	);
};

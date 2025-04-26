import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
	return (
		<div className="mx-auto max-w-xl px-4 py-16 text-center">
			<h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
			<div className="mx-auto mb-8 h-1 w-24 bg-blue-600"></div>

			<h2 className="mb-4 text-2xl font-semibold text-gray-700">Page Not Found</h2>
			<p className="mb-8 text-gray-600">
				Sorry, the page you are looking for doesn't exist or has been moved.
			</p>

			<Link
				to="/"
				className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
			>
				Return to Home
			</Link>
		</div>
	);
};

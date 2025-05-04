import { Container } from '@/components/ui/container';

export const Footer = () => {
	return (
		<footer className="border-t border-gray-200 bg-white py-6">
			<Container>
				<div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
					<div className="text-sm text-gray-500">
						&copy; {new Date().getFullYear()} CleanIAM. All rights reserved.
					</div>
					<div className="mt-4 flex space-x-6 md:mt-0">
						<a href="#" className="text-sm text-gray-500 hover:text-gray-900">
							Privacy Policy
						</a>
						<a href="#" className="text-sm text-gray-500 hover:text-gray-900">
							Terms of Service
						</a>
						<a href="#" className="text-sm text-gray-500 hover:text-gray-900">
							Contact Support
						</a>
					</div>
				</div>
			</Container>
		</footer>
	);
};

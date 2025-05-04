import { useState } from 'react';
import { useGetApiApplications, useDeleteApiApplicationsId } from '../lib/api/generated/applications-api/applications-api';
import { ApiApplicationModel } from '../lib/api/generated/cleanIAM.schemas';
import { Test } from '../components/test';
import { ApplicationForm } from '../components/public/ApplicationForm';

export const ApplicationsPage = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	// Fetch applications data
	const { 
		data: applicationsResponse, 
		isLoading, 
		isError, 
		error, 
		refetch
	} = useGetApiApplications();

	// Get applications array from response
	const applications = applicationsResponse?.data || [];

	// Delete application mutation
	const deleteApplicationMutation = useDeleteApiApplicationsId({
		mutation: {
			onSuccess: () => {
				refetch();
			}
		}
	});

	// Handle delete application
	const handleDeleteApplication = (id: string) => {
		if (confirm('Are you sure you want to delete this application?')) {
			deleteApplicationMutation.mutate({ id });
		}
	};

	// Function to determine status badge class based on app data
	const getStatusBadge = (app: ApiApplicationModel) => {
		// Simple logic: assume apps with specific scopes are in maintenance
		const isInMaintenance = app.scopes.includes('offline_access');
		
		if (isInMaintenance) {
			return (
				<div className="mt-3 inline-block rounded bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
					Maintenance
				</div>
			);
		}
		
		return (
			<div className="mt-3 inline-block rounded bg-green-100 px-2 py-1 text-xs text-green-800">
				Active
			</div>
		);
	};

	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold text-blue-800">Applications</h1>
				<p className="text-gray-600">Manage your OpenID Connect applications</p>
			</div>

			{isLoading ? (
				<div className="flex justify-center py-12">
					<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
				</div>
			) : isError ? (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
					<p>Error loading applications: {error instanceof Error ? error.message : 'Unknown error'}</p>
					<button 
						onClick={() => refetch()} 
						className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
					>
						Try Again
					</button>
				</div>
			) : (
				<div className="mb-8 rounded-lg bg-white p-6 shadow-md">
					{applications.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-gray-500 mb-4">No applications found</p>
							<button 
								onClick={() => setIsAddModalOpen(true)} 
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Add Your First Application
							</button>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								{applications.map((app) => (
									<div 
										key={app.id} 
										className="rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:shadow-md"
									>
										<div className="flex justify-between">
											<h3 className="mb-2 text-lg font-semibold text-blue-800">
												{app.displayName || 'Unnamed Application'}
											</h3>
											<button 
												onClick={() => handleDeleteApplication(app.id)}
												className="text-red-600 hover:text-red-800"
												title="Delete Application"
											>
												<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
													<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
													<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
												</svg>
											</button>
										</div>
										<p className="text-sm text-gray-600">Client ID: {app.clientId}</p>
										<p className="text-sm text-gray-600">Type: {app.applicationType} / {app.clientType}</p>
										{getStatusBadge(app)}
									</div>
								))}
							</div>

							<div className="mt-6 flex justify-end">
								<button 
									onClick={() => setIsAddModalOpen(true)}
									className="rounded bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
								>
									Add Application
								</button>
							</div>
						</>
					)}
				</div>
			)}

			{/* Add Application Modal */}
			{isAddModalOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
					<div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-semibold">Add New Application</h2>
							<button 
								onClick={() => setIsAddModalOpen(false)}
								className="text-gray-400 hover:text-gray-600"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						
						<div className="max-h-[80vh] overflow-y-auto pr-2">
							<ApplicationForm 
								onSuccess={() => {
									setIsAddModalOpen(false);
									refetch();
								}}
								onCancel={() => setIsAddModalOpen(false)}
							/>
						</div>
					</div>
				</div>
			)}

			<div className="rounded-lg bg-white p-6 shadow-md">
				<h2 className="mb-4 text-xl font-semibold text-gray-800">API Test</h2>
				<Test />
			</div>
		</div>
	);
};

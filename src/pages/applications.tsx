import { useState } from 'react';
import { useGetApiApplications, useDeleteApiApplicationsId } from '../lib/api/generated/applications-api/applications-api';
import { ApiApplicationModel } from '../lib/api/generated/cleanIAM.schemas';
import { Test } from '../components/test';
import { ApplicationForm } from '../components/public/ApplicationForm';
import { FormButton } from '../components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

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
					<FormButton 
						onClick={() => refetch()} 
						variant="danger"
						className="mt-2"
					>
						Try Again
					</FormButton>
				</div>
			) : (
				<div className="mb-8 rounded-lg bg-white p-6 shadow-md">
					{applications.length === 0 ? (
						<div className="text-center py-8">
							<p className="text-gray-500 mb-4">No applications found</p>
							<FormButton 
								onClick={() => setIsAddModalOpen(true)} 
							>
								Add Your First Application
							</FormButton>
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
								<FormButton 
									onClick={() => setIsAddModalOpen(true)}
								>
									Add Application
								</FormButton>
							</div>
						</>
					)}
				</div>
			)}

			{/* Application Form Dialog */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
				<DialogContent className="max-w-3xl">
					<DialogHeader>
						<DialogTitle>Add New Application</DialogTitle>
						<DialogDescription>
							Create a new OpenID Connect application
						</DialogDescription>
					</DialogHeader>
					
					<div className="max-h-[80vh] overflow-y-auto py-4 pr-2">
						<ApplicationForm 
							onSuccess={() => {
								setIsAddModalOpen(false);
								refetch();
							}}
							onCancel={() => setIsAddModalOpen(false)}
						/>
					</div>
				</DialogContent>
			</Dialog>

			<div className="rounded-lg bg-white p-6 shadow-md">
				<h2 className="mb-4 text-xl font-semibold text-gray-800">API Test</h2>
				<Test />
			</div>
		</div>
	);
};

import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter } from '../ui/dialog';
import {
	Delete02Icon,
	LaptopProgrammingIcon,
	PencilEdit01Icon,
	InformationCircleIcon,
	CheckmarkSquare01Icon,
	Copy01Icon
} from 'hugeicons-react';
import { DialogHeader } from '../ui/dialog';
import { ApplicationForm } from './ApplicationForm';
import { useState } from 'react';
import { useGetApiApplications } from '@/lib/api/generated/applications-api/applications-api';
import { FormButton } from '../form';
import { toast } from 'react-toastify';
type ApplicationBannerProps = {
	app: ApiApplicationModel;
	onDelete: (id: string) => void;
} & React.HTMLProps<HTMLDivElement>;

export const ApplicationBanner = ({
	app,
	onDelete,
	className,
	...props
}: ApplicationBannerProps) => {
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
	const [clientIdCopied, setClientIdCopied] = useState(false);

	const { refetch } = useGetApiApplications();

	// Handle copying client ID to clipboard
	const handleCopyClientId = () => {
		if (app.clientId) {
			navigator.clipboard
				.writeText(app.clientId)
				.then(() => {
					setClientIdCopied(true);
					toast.success('Client ID copied to clipboard');

					// Reset the copied state after 3 seconds
					setTimeout(() => {
						setClientIdCopied(false);
					}, 3000);
				})
				.catch(() => {
					toast.error('Failed to copy Client ID to clipboard');
				});
		}
	};

	// Open edit dialog from info dialog
	const handleEditFromInfo = () => {
		setIsInfoModalOpen(false);
		setTimeout(() => setIsEditModalOpen(true), 100); // Small delay to ensure proper transition
	};

	return (
		<div
			{...props}
			className={cn(
				className,
				'flex cursor-pointer items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 transition-shadow hover:bg-blue-100 hover:shadow-lg'
			)}
			onClick={() => setIsInfoModalOpen(true)}
		>
			<LaptopProgrammingIcon size={30} className="m-2" />
			<div className="w-full">
				<div className="flex w-full justify-between">
					<h3 className="mb-2 text-lg font-semibold text-blue-800">
						{app.displayName || app.clientId}
					</h3>
					<div className="flex gap-2">
						<button
							onClick={e => {
								e.stopPropagation(); // Prevent banner click
								setIsEditModalOpen(true);
							}}
							className="text-blue-600 hover:text-blue-800"
							title="Edit Application"
						>
							<PencilEdit01Icon size={20} />
						</button>
						<button
							onClick={e => {
								e.stopPropagation(); // Prevent banner click
								onDelete(app.id);
							}}
							className="text-red-600 hover:text-red-800"
							title="Delete Application"
						>
							<Delete02Icon size={20} />
						</button>
					</div>
				</div>
				<p className="text-sm text-gray-600">Client ID: {app.clientId}</p>
				<p className="text-sm text-gray-600">
					Type: {app.applicationType} / {app.clientType}
				</p>
			</div>

			{/* Application Info Dialog */}
			<Dialog
				open={isInfoModalOpen}
				onOpenChange={open => {
					setIsInfoModalOpen(open);
				}}
				modal={true}
			>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<div className="mb-2 flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
								<InformationCircleIcon size={24} />
							</div>
							<DialogTitle className="text-xl">{app.displayName || app.clientId}</DialogTitle>
						</div>
						<DialogDescription>OpenID Connect Application Details</DialogDescription>
					</DialogHeader>

					<div className="space-y-6 py-4">
						{/* Client ID section */}
						<div>
							<h3 className="mb-1 text-sm font-medium text-gray-500">Client ID</h3>
							<div className="flex items-center">
								<div className="flex-1 rounded-l-md border border-gray-300 bg-gray-50 px-3 py-2 font-mono text-sm">
									{app.clientId}
								</div>
								<button
									onClick={handleCopyClientId}
									className={`flex items-center justify-center gap-1 rounded-r-md border border-l-0 border-gray-300 px-3 py-2 ${
										clientIdCopied
											? 'bg-green-100 text-green-700'
											: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
									}`}
								>
									{clientIdCopied ? <CheckmarkSquare01Icon size={16} /> : <Copy01Icon size={16} />}
								</button>
							</div>
						</div>

						{/* Application details */}
						<div className="grid grid-cols-2 gap-4">
							<div>
								<h3 className="mb-1 text-sm font-medium text-gray-500">Application Type</h3>
								<p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
									{app.applicationType}
								</p>
							</div>
							<div>
								<h3 className="mb-1 text-sm font-medium text-gray-500">Client Type</h3>
								<p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
									{app.clientType}
								</p>
							</div>
							<div>
								<h3 className="mb-1 text-sm font-medium text-gray-500">Consent Type</h3>
								<p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm">
									{app.consentType}
								</p>
							</div>
						</div>
						{/* Application Id */}
						<div>
							<h3 className="mb-1 text-sm font-medium text-gray-500">Application ID</h3>
							<p className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm">
								{app.id}
							</p>
						</div>

						{/* Scopes */}
						<div>
							<h3 className="mb-1 text-sm font-medium text-gray-500">Scopes</h3>
							<div className="flex min-h-12 flex-wrap gap-2 rounded-md border border-gray-200 bg-gray-50 p-3">
								{app.scopes.map(scope => (
									<span
										key={scope}
										className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-800"
									>
										{scope}
									</span>
								))}
							</div>
						</div>

						{/* Redirect URIs */}
						<div>
							<h3 className="mb-1 text-sm font-medium text-gray-500">Redirect URIs</h3>
							<div className="max-h-24 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-3">
								{app.redirectUris.length > 0 ? (
									<ul className="list-disc space-y-1 pl-5">
										{app.redirectUris.map((uri, index) => (
											<li key={index} className="break-all text-sm text-gray-700">
												{uri}
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm italic text-gray-500">No redirect URIs configured</p>
								)}
							</div>
						</div>

						{/* Post Logout Redirect URIs */}
						<div>
							<h3 className="mb-1 text-sm font-medium text-gray-500">Post-Logout Redirect URIs</h3>
							<div className="max-h-24 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-3">
								{app.postLogoutRedirectUris.length > 0 ? (
									<ul className="list-disc space-y-1 pl-5">
										{app.postLogoutRedirectUris.map((uri, index) => (
											<li key={index} className="break-all text-sm text-gray-700">
												{uri}
											</li>
										))}
									</ul>
								) : (
									<p className="text-sm italic text-gray-500">
										No post-logout redirect URIs configured
									</p>
								)}
							</div>
						</div>
					</div>

					<DialogFooter className="flex justify-end gap-2">
						<FormButton variant="secondary" onClick={() => setIsInfoModalOpen(false)}>
							Close
						</FormButton>
						<FormButton onClick={handleEditFromInfo} className="flex items-center gap-2">
							<PencilEdit01Icon size={16} />
							Edit Application
						</FormButton>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Edit Application Form Dialog */}
			<Dialog
				open={isEditModalOpen}
				onOpenChange={open => {
					setIsEditModalOpen(open);
				}}
				modal={false}
			>
				<DialogContent className="max-w-3xl">
					<DialogHeader>
						<DialogTitle>{app.displayName || app.clientId}</DialogTitle>
						<DialogDescription>
							Edit the details of your existing OpenID Connect application
						</DialogDescription>
					</DialogHeader>

					<div className="max-h-[80vh] overflow-y-auto py-4 pr-2">
						<ApplicationForm
							isEdit={true}
							initialData={app}
							onSuccess={() => {
								setIsEditModalOpen(false);
								refetch();
							}}
							onCancel={() => setIsEditModalOpen(false)}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

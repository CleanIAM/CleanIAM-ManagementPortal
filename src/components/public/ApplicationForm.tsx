import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMemo, useState } from 'react';
import {
	ApiApplicationModel,
	ApplicationType,
	ClientType,
	ConsentType,
	OpenIdApplicationCreated
} from '../../lib/api/generated/cleanIAM.schemas';
import {
	usePostApiApplications,
	usePutApiApplicationsId
} from '../../lib/api/generated/applications-api/applications-api';
import { TextField, SelectField, ArrayField, MultiSelectField, FormButton } from '../form';
import { useGetApiScopes } from '@/lib/api/generated/scopes-api-endpoint/scopes-api-endpoint';
import { toast } from 'react-toastify';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '../ui/dialog';
import {
	AlertCircleIcon,
	CheckmarkSquare01Icon,
	Copy01Icon,
	InformationCircleIcon
} from 'hugeicons-react';

// Define the validation schema with Zod
const applicationSchema = z.object({
	clientId: z
		.string()
		.min(1, 'Client ID is required')
		.max(32, 'Client ID must be less than 32 characters'),
	displayName: z.string().min(1, 'Application name is required'),
	applicationType: z.nativeEnum(ApplicationType),
	clientType: z.nativeEnum(ClientType),
	consentType: z.nativeEnum(ConsentType),
	redirectUris: z.array(z.string()),
	postLogoutRedirectUris: z.array(z.string()),
	scopes: z.array(z.string()).min(1, 'At least one scope is required')
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
	isEdit?: boolean;
	onSuccess?: () => void;
	onCancel?: () => void;
	initialData?: ApiApplicationModel;
}

export const ApplicationForm = ({
	onSuccess,
	onCancel,
	isEdit,
	initialData
}: ApplicationFormProps) => {
	// Client secret state for showing in dialog
	const [clientSecret, setClientSecret] = useState<string | null>(null);
	const [showSecretDialog, setShowSecretDialog] = useState(false);
	const [newAppName, setNewAppName] = useState<string>('');
	const [secretCopied, setSecretCopied] = useState(false);

	// Initialize the form with react-hook-form and zod resolver
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset
	} = useForm<ApplicationFormValues>({
		resolver: zodResolver(applicationSchema),
		defaultValues: {
			clientId: initialData?.clientId || '',
			displayName: initialData?.displayName || '',
			applicationType: initialData?.applicationType || ApplicationType.Web,
			clientType: initialData?.clientType || ClientType.Public,
			consentType: initialData?.consentType || ConsentType.Explicit,
			redirectUris: initialData?.redirectUris || [],
			postLogoutRedirectUris: initialData?.postLogoutRedirectUris || [],
			scopes: initialData?.scopes || ['openid', 'profile', 'roles']
		}
	});

	// Fetch available scopes
	const { data: scopesResponse, isLoading: isLoadingScopes } = useGetApiScopes();

	// Url string validation function
	const isValidUrl = (url: string) => {
		try {
			z.string().url().parse(url);
			return true;
		} catch {
			return false;
		}
	};

	// Handle copying client secret to clipboard
	const handleCopySecret = () => {
		if (clientSecret) {
			navigator.clipboard
				.writeText(clientSecret)
				.then(() => {
					setSecretCopied(true);
					toast.success('Client secret copied to clipboard');

					// Reset the copied state after 3 seconds
					setTimeout(() => {
						setSecretCopied(false);
					}, 3000);
				})
				.catch(() => {
					toast.error('Failed to copy secret to clipboard');
				});
		}
	};

	// Close secret dialog and notify parent
	const handleCloseSecretDialog = () => {
		setShowSecretDialog(false);
		setClientSecret(null);
		setSecretCopied(false);
		if (onSuccess) onSuccess();
	};

	// Handle user trying to close the modal by clicking outside
	const handleSecretDialogChange = (open: boolean) => {
		// Only allow the dialog to be closed if it's being explicitly closed by our button
		// Prevent closing when user clicks outside
		if (!open && clientSecret) {
			// Do nothing - dialog stays open
			return;
		}
		setShowSecretDialog(open);
	};

	// Create application mutation
	const createApplicationMutation = usePostApiApplications({
		mutation: {
			onSuccess: data => {
				if (data.status !== 200) {
					toast.error(data.data.message);
					return;
				}

				// Save client secret and app name for dialog
				const createdApp = data.data as OpenIdApplicationCreated;
				if (createdApp.clientSecret) {
					setClientSecret(createdApp.clientSecret);
					setNewAppName(createdApp.displayName || 'your application');
					setShowSecretDialog(true);
				} else {
					toast.success('Application created successfully');
					reset();
					if (onSuccess) onSuccess();
				}
			}
		}
	});

	// Update application mutation
	const updateApplicationMutation = usePutApiApplicationsId({
		mutation: {
			onSuccess: data => {
				if (data.status !== 200) {
					toast.error(data.data.message);
					return;
				}
				toast.success('Application updated successfully');
				reset();
				if (onSuccess) onSuccess();
			}
		}
	});

	// Handle form submission
	const onSubmit = (data: ApplicationFormValues) => {
		if (isEdit && initialData) {
			// Update existing application
			updateApplicationMutation.mutate({
				id: initialData.id,
				data: { id: initialData.id, ...data }
			});
		} else {
			createApplicationMutation.mutate({ data: data });
		}
	};

	// Application type options - defined as constants to prevent re-creation
	const applicationTypeOptions = [
		{ label: 'Web', value: ApplicationType.Web },
		{ label: 'Native', value: ApplicationType.Native }
	];

	// Client type options
	const clientTypeOptions = [
		{ label: 'Confidential', value: ClientType.Confidential },
		{ label: 'Public', value: ClientType.Public }
	];
	// Consent type options
	const consentTypeOptions = [
		{ label: 'Explicit', value: ConsentType.Explicit },
		{ label: 'Implicit', value: ConsentType.Implicit },
		{ label: 'External', value: ConsentType.External },
		{ label: 'Systematic', value: ConsentType.Systematic }
	];

	// Process scope options safely
	const scopeOptions = useMemo(() => {
		try {
			if (isLoadingScopes) {
				return 'Loading scopes...';
			}

			if (!scopesResponse || scopesResponse?.status !== 200) {
				return 'No scopes available';
			}

			if (scopesResponse.data) {
				return scopesResponse.data.map(scope => ({
					value: scope.value,
					label: scope.value,
					tooltip: scope.tooltip
				}));
			}

			// If not an array, return default options
			return 'No scopes available';
		} catch (error) {
			console.error('Error processing scopes:', error);
			return 'No scopes available';
		}
	}, [isLoadingScopes, scopesResponse]);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Client ID Field - only visible create mode */}
				<TextField
					name="clientId"
					label="Client ID"
					control={control}
					error={errors.clientId}
					disabled={isEdit}
					className="opacity-70"
					placeholder="Client ID"
				/>

				<TextField
					name="displayName"
					label="Application Display Name"
					control={control}
					error={errors.displayName}
					placeholder="My Application"
				/>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					<SelectField
						name="applicationType"
						label="Application Type"
						control={control}
						options={applicationTypeOptions}
						error={errors.applicationType}
					/>

					<SelectField
						name="clientType"
						label="Client Type"
						disabled={isEdit}
						control={control}
						options={clientTypeOptions}
						error={errors.clientType}
					/>

					<SelectField
						name="consentType"
						label="Consent Type"
						control={control}
						options={consentTypeOptions}
						error={errors.consentType}
					/>
				</div>

				<ArrayField
					name="redirectUris"
					label="Redirect URIs"
					setValue={setValue}
					isInputValid={isValidUrl}
					validatorMessage="Invalid URL format"
					watch={watch}
					error={errors.redirectUris}
					placeholder="https://example.com/callback"
				/>

				<ArrayField
					name="postLogoutRedirectUris"
					label="Post-Logout Redirect URIs"
					setValue={setValue}
					isInputValid={isValidUrl}
					validatorMessage="Invalid URL format"
					watch={watch}
					error={errors.postLogoutRedirectUris}
					placeholder="https://example.com"
				/>

				<MultiSelectField
					name="scopes"
					label="Scopes"
					options={scopeOptions}
					setValue={setValue}
					watch={watch}
					error={errors.scopes}
					isLoading={isLoadingScopes}
				/>

				<div className="flex justify-end space-x-3">
					{onCancel && (
						<FormButton onClick={onCancel} variant="secondary">
							Cancel
						</FormButton>
					)}
					<FormButton
						type="submit"
						disabled={createApplicationMutation.isPending || updateApplicationMutation.isPending}
						isLoading={createApplicationMutation.isPending || updateApplicationMutation.isPending}
					>
						{isEdit ? 'Update Application' : 'Create Application'}
					</FormButton>
				</div>
			</form>

			{/* Client Secret Dialog - not closable by clicking outside */}
			<Dialog open={showSecretDialog} onOpenChange={handleSecretDialogChange}>
				<DialogContent
					className="sm:max-w-md [&>button]:hidden"
					onInteractOutside={e => e.preventDefault()}
				>
					<DialogHeader>
						<div className="mb-2 flex items-center justify-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
								<InformationCircleIcon size={28} />
							</div>
						</div>
						<DialogTitle className="text-center text-xl">
							Important: Save Your Client Secret
						</DialogTitle>
						<DialogDescription className="text-center">
							The client secret for <span className="font-semibold">{newAppName}</span> has been
							generated. Please copy and securely store this secret.
						</DialogDescription>
					</DialogHeader>

					<div className="my-6 space-y-4">
						{/* Secret display box with gradient border */}
						<div className="relative rounded-lg border border-gray-200 bg-gray-50 p-1">
							<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-30"></div>
							<div className="relative rounded-md bg-white p-4">
								<code className="block w-full break-all font-mono text-sm">{clientSecret}</code>
							</div>
						</div>

						{/* Copy button */}
						<div className="flex justify-center">
							<button
								onClick={handleCopySecret}
								className={`flex items-center justify-center gap-2 rounded-md ${
									secretCopied ? 'bg-green-100 text-green-700' : 'bg-blue-600 text-white'
								} px-4 py-2 text-sm font-medium transition-colors hover:${
									secretCopied ? 'bg-green-200' : 'bg-blue-700'
								}`}
							>
								{secretCopied ? (
									<>
										<CheckmarkSquare01Icon size={20} />
										Copied!
									</>
								) : (
									<>
										<Copy01Icon size={20} />
										Copy to Clipboard
									</>
								)}
							</button>
						</div>

						{/* Warning message */}
						<div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4">
							<div className="flex items-center justify-between">
								<div className="flex-shrink-0">
									<AlertCircleIcon size={40} className="text-amber-400" />
								</div>
								<div className="ml-3">
									<h3 className="text-sm font-medium text-amber-800">Important</h3>
									<div className="mt-1 text-sm text-amber-700">
										<p>
											This is the <strong>only time</strong> you'll be able to view this secret. If
											you lose it, you'll need to generate a new one.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<DialogFooter className="sm:justify-center">
						<FormButton onClick={handleCloseSecretDialog} className="w-full sm:w-auto">
							I've Saved My Secret
						</FormButton>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

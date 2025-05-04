import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMemo } from 'react';
import {
	ApiApplicationModel,
	ApplicationType,
	ClientType,
	ConsentType
} from '../../lib/api/generated/cleanIAM.schemas';
import {
	usePostApiApplications,
	usePutApiApplicationsId
} from '../../lib/api/generated/applications-api/applications-api';
import { TextField, SelectField, ArrayField, MultiSelectField, FormButton } from '../form';
import { useGetApiScopes } from '@/lib/api/generated/scopes-api-endpoint/scopes-api-endpoint';
import { toast } from 'react-toastify';

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

	// Create application mutation
	const createApplicationMutation = usePostApiApplications({
		mutation: {
			onSuccess: data => {
				if (data.status !== 200) {
					toast.error(data.data.message);
					return;
				}
				toast.success('Application created successfully');
				reset();
				if (onSuccess) onSuccess();
			}
		}
	});

	// Create application mutation
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
			console.log('Creating new application:', data);

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
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
	);
};

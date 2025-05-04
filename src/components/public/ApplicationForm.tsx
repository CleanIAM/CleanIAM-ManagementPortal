import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ApiApplicationModel,
	ApplicationType,
	ClientType,
	ConsentType,
	PostApiApplicationsParams
} from '../../lib/api/generated/cleanIAM.schemas';
import { usePostApiApplications } from '../../lib/api/generated/applications-api/applications-api';
import { TextField, SelectField, ArrayField, TagsField, FormButton } from '../form';
import { ApplicationFormValues, applicationSchema } from '@/lib/schemas/ApplicationSchema';

interface ApplicationFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
	initialData?: Partial<ApiApplicationModel>;
}

export const ApplicationForm = ({ onSuccess, onCancel, initialData }: ApplicationFormProps) => {
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
			displayName: initialData?.displayName || '',
			applicationType: initialData?.applicationType || ApplicationType.web,
			clientType: initialData?.clientType || ClientType.confidential,
			consentType: initialData?.consentType || ConsentType.explicit,
			redirectUris: initialData?.redirectUris || [],
			postLogoutRedirectUris: initialData?.postLogoutRedirectUris || [],
			scopes: initialData?.scopes || ['openid', 'profile', 'email'],
			grantTypes: initialData?.grantTypes || ['authorization_code'],
			responseTypes: initialData?.responseTypes || ['code'],
			endpoints: initialData?.endpoints || [],
			requirements: initialData?.requirements || []
		}
	});

	// Create application mutation
	const createApplicationMutation = usePostApiApplications({
		mutation: {
			onSuccess: () => {
				reset();
				if (onSuccess) onSuccess();
			}
		}
	});

	// Handle form submission
	const onSubmit = (data: ApplicationFormValues) => {
		const applicationParams: PostApiApplicationsParams = {
			DisplayName: data.displayName,
			ApplicationType: data.applicationType,
			ClientType: data.clientType,
			ConsentType: data.consentType,
			RedirectUris: data.redirectUris,
			PostLogoutRedirectUris: data.postLogoutRedirectUris,
			Scopes: data.scopes,
			GrantTypes: data.grantTypes,
			ResponseTypes: data.responseTypes,
			Endpoints: data.endpoints,
			Requirements: data.requirements
		};

		createApplicationMutation.mutate({ params: applicationParams });
	};

	// Application type options
	const applicationTypeOptions = [
		{ label: 'Web', value: ApplicationType.web },
		{ label: 'Native', value: ApplicationType.native }
	];

	// Client type options
	const clientTypeOptions = [
		{ label: 'Confidential', value: ClientType.confidential },
		{ label: 'Public', value: ClientType.public }
	];

	// Consent type options
	const consentTypeOptions = [
		{ label: 'Explicit', value: ConsentType.explicit },
		{ label: 'Implicit', value: ConsentType.implicit },
		{ label: 'External', value: ConsentType.external },
		{ label: 'Systematic', value: ConsentType.systematic }
	];

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<TextField
				name="displayName"
				label="Application Name"
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
				watch={watch}
				error={errors.redirectUris}
				placeholder="https://example.com/callback"
			/>

			<ArrayField
				name="postLogoutRedirectUris"
				label="Post-Logout Redirect URIs"
				setValue={setValue}
				watch={watch}
				error={errors.postLogoutRedirectUris}
				placeholder="https://example.com"
			/>

			<TagsField
				name="scopes"
				label="Scopes"
				setValue={setValue}
				watch={watch}
				error={errors.scopes}
				placeholder="openid"
			/>

			<div className="flex justify-end space-x-3">
				{onCancel && (
					<FormButton onClick={onCancel} variant="secondary">
						Cancel
					</FormButton>
				)}
				<FormButton
					type="submit"
					disabled={createApplicationMutation.isPending}
					isLoading={createApplicationMutation.isPending}
				>
					Create Application
				</FormButton>
			</div>
		</form>
	);
};

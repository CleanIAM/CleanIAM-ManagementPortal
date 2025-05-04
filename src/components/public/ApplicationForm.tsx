import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	ApiApplicationModel,
	ApplicationType,
	ClientType,
	ConsentType,
	PostApiApplicationsParams
} from '../../lib/api/generated/cleanIAM.schemas';
import { usePostApiApplications } from '../../lib/api/generated/applications-api/applications-api';

// Define the validation schema with Zod
const applicationSchema = z.object({
	displayName: z.string().min(1, 'Application name is required'),
	applicationType: z.nativeEnum(ApplicationType),
	clientType: z.nativeEnum(ClientType),
	consentType: z.nativeEnum(ConsentType),
	redirectUris: z.array(z.string()).min(1, 'At least one redirect URI is required'),
	postLogoutRedirectUris: z
		.array(z.string())
		.min(1, 'At least one post-logout redirect URI is required'),
	scopes: z.array(z.string()).min(1, 'At least one scope is required'),
	grantTypes: z.array(z.string()).optional(),
	responseTypes: z.array(z.string()).optional(),
	endpoints: z.array(z.string()).optional(),
	requirements: z.array(z.string()).optional()
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
	initialData?: Partial<ApiApplicationModel>;
}

export const ApplicationForm = ({ onSuccess, onCancel, initialData }: ApplicationFormProps) => {
	const [redirectUri, setRedirectUri] = useState('');
	const [postLogoutRedirectUri, setPostLogoutRedirectUri] = useState('');
	const [scope, setScope] = useState('');

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
			scopes: initialData?.scopes || ['openid', 'profile', 'email', 'roles'],
			grantTypes: initialData?.grantTypes || ['authorization_code'],
			responseTypes: initialData?.responseTypes || ['code'],
			endpoints: initialData?.endpoints || [],
			requirements: initialData?.requirements || []
		}
	});

	// Watch arrays to display them in the UI
	const redirectUris = watch('redirectUris');
	const postLogoutRedirectUris = watch('postLogoutRedirectUris');
	const scopes = watch('scopes');

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

	// Handle adding a new redirect URI
	const addRedirectUri = () => {
		if (redirectUri && !redirectUris.includes(redirectUri)) {
			setValue('redirectUris', [...redirectUris, redirectUri]);
			setRedirectUri('');
		}
	};

	// Handle removing a redirect URI
	const removeRedirectUri = (uri: string) => {
		setValue(
			'redirectUris',
			redirectUris.filter(u => u !== uri)
		);
	};

	// Handle adding a new post-logout redirect URI
	const addPostLogoutRedirectUri = () => {
		if (postLogoutRedirectUri && !postLogoutRedirectUris.includes(postLogoutRedirectUri)) {
			setValue('postLogoutRedirectUris', [...postLogoutRedirectUris, postLogoutRedirectUri]);
			setPostLogoutRedirectUri('');
		}
	};

	// Handle removing a post-logout redirect URI
	const removePostLogoutRedirectUri = (uri: string) => {
		setValue(
			'postLogoutRedirectUris',
			postLogoutRedirectUris.filter(u => u !== uri)
		);
	};

	// Handle adding a new scope
	const addScope = () => {
		if (scope && !scopes.includes(scope)) {
			setValue('scopes', [...scopes, scope]);
			setScope('');
		}
	};

	// Handle removing a scope
	const removeScope = (s: string) => {
		setValue(
			'scopes',
			scopes.filter(item => item !== s)
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<div>
				<label className="block text-sm font-medium text-gray-700">Application Name</label>
				<Controller
					name="displayName"
					control={control}
					render={({ field }) => (
						<input
							{...field}
							type="text"
							className={`mt-1 block w-full rounded-md border ${errors.displayName ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
						/>
					)}
				/>
				{errors.displayName && (
					<p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
				)}
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div>
					<label className="block text-sm font-medium text-gray-700">Application Type</label>
					<Controller
						name="applicationType"
						control={control}
						render={({ field }) => (
							<select
								{...field}
								className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							>
								<option value={ApplicationType.web}>Web</option>
								<option value={ApplicationType.native}>Native</option>
							</select>
						)}
					/>
					{errors.applicationType && (
						<p className="mt-1 text-sm text-red-600">{errors.applicationType.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Client Type</label>
					<Controller
						name="clientType"
						control={control}
						render={({ field }) => (
							<select
								{...field}
								className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							>
								<option value={ClientType.confidential}>Confidential</option>
								<option value={ClientType.public}>Public</option>
							</select>
						)}
					/>
					{errors.clientType && (
						<p className="mt-1 text-sm text-red-600">{errors.clientType.message}</p>
					)}
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">Consent Type</label>
					<Controller
						name="consentType"
						control={control}
						render={({ field }) => (
							<select
								{...field}
								className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
							>
								<option value={ConsentType.explicit}>Explicit</option>
								<option value={ConsentType.implicit}>Implicit</option>
								<option value={ConsentType.external}>External</option>
								<option value={ConsentType.systematic}>Systematic</option>
							</select>
						)}
					/>
					{errors.consentType && (
						<p className="mt-1 text-sm text-red-600">{errors.consentType.message}</p>
					)}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Redirect URIs</label>
				<div className="mt-1 flex rounded-md shadow-sm">
					<input
						type="text"
						value={redirectUri}
						onChange={e => setRedirectUri(e.target.value)}
						placeholder="https://example.com/callback"
						className="block w-full flex-1 rounded-none rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					/>
					<button
						type="button"
						onClick={addRedirectUri}
						className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Add
					</button>
				</div>
				{errors.redirectUris && (
					<p className="mt-1 text-sm text-red-600">{errors.redirectUris.message}</p>
				)}

				<div className="mt-2 space-y-2">
					{redirectUris.map((uri, index) => (
						<div key={index} className="flex items-center justify-between rounded bg-gray-100 p-2">
							<span className="text-sm">{uri}</span>
							<button
								type="button"
								onClick={() => removeRedirectUri(uri)}
								className="text-red-600 hover:text-red-800"
							>
								Remove
							</button>
						</div>
					))}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Post-Logout Redirect URIs</label>
				<div className="mt-1 flex rounded-md shadow-sm">
					<input
						type="text"
						value={postLogoutRedirectUri}
						onChange={e => setPostLogoutRedirectUri(e.target.value)}
						placeholder="https://example.com"
						className="block w-full flex-1 rounded-none rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					/>
					<button
						type="button"
						onClick={addPostLogoutRedirectUri}
						className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Add
					</button>
				</div>
				{errors.postLogoutRedirectUris && (
					<p className="mt-1 text-sm text-red-600">{errors.postLogoutRedirectUris.message}</p>
				)}

				<div className="mt-2 space-y-2">
					{postLogoutRedirectUris.map((uri, index) => (
						<div key={index} className="flex items-center justify-between rounded bg-gray-100 p-2">
							<span className="text-sm">{uri}</span>
							<button
								type="button"
								onClick={() => removePostLogoutRedirectUri(uri)}
								className="text-red-600 hover:text-red-800"
							>
								Remove
							</button>
						</div>
					))}
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700">Scopes</label>
				<div className="mt-1 flex rounded-md shadow-sm">
					<input
						type="text"
						value={scope}
						onChange={e => setScope(e.target.value)}
						placeholder="openid"
						className="block w-full flex-1 rounded-none rounded-l-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
					/>
					<button
						type="button"
						onClick={addScope}
						className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Add
					</button>
				</div>
				{errors.scopes && <p className="mt-1 text-sm text-red-600">{errors.scopes.message}</p>}

				<div className="mt-2 flex flex-wrap gap-2">
					{scopes.map((s, index) => (
						<div
							key={index}
							className="flex items-center rounded bg-blue-100 px-3 py-1 text-sm text-blue-800"
						>
							{s}
							<button
								type="button"
								onClick={() => removeScope(s)}
								className="ml-2 text-blue-600 hover:text-blue-800"
							>
								×
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-end space-x-3">
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Cancel
					</button>
				)}
				<button
					type="submit"
					disabled={createApplicationMutation.isPending}
					className={`inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
						createApplicationMutation.isPending ? 'cursor-not-allowed opacity-75' : ''
					}`}
				>
					{createApplicationMutation.isPending ? 'Creating...' : 'Create Application'}
				</button>
			</div>
		</form>
	);
};

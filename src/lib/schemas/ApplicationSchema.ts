import { z } from 'zod';
import { ApplicationType, ClientType, ConsentType } from '../api/generated/cleanIAM.schemas';

// Define the validation schema with Zod
export const applicationSchema = z.object({
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

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

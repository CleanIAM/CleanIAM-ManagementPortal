import React from 'react';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { Badge } from '../public/Badge';
import { UserRoleBadges } from '../users/UserRoleBadges';
import { UserStatus } from '../users/UserStatus';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileFormValues, profileFormSchema } from './profileSchema';

interface ProfileInformationProps {
	user: ApiUserModel;
	isEditing: boolean;
	onSubmit: (data: ProfileFormValues) => void;
	isSubmitting: boolean;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({
	user,
	isEditing,
	onSubmit,
	isSubmitting
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			firstName: user.firstName,
			lastName: user.lastName
		}
	});

	// Reset form when user data changes or edit mode toggles
	React.useEffect(() => {
		if (user) {
			reset({
				firstName: user.firstName,
				lastName: user.lastName
			});
		}
	}, [user, reset, isEditing]);

	return (
		<div className="p-6">
			<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Left column */}
				<div className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
						<p className="text-gray-800">{user.email}</p>
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
						{isEditing ? (
							<div>
								<input
									type="text"
									className={`w-full rounded-md border ${
										errors.firstName ? 'border-red-500' : 'border-gray-300'
									} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
									{...register('firstName')}
								/>
								{errors.firstName && (
									<p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
								)}
							</div>
						) : (
							<p className="text-gray-800">{user.firstName}</p>
						)}
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
						{isEditing ? (
							<div>
								<input
									type="text"
									className={`w-full rounded-md border ${
										errors.lastName ? 'border-red-500' : 'border-gray-300'
									} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500`}
									{...register('lastName')}
								/>
								{errors.lastName && (
									<p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
								)}
							</div>
						) : (
							<p className="text-gray-800">{user.lastName}</p>
						)}
					</div>
				</div>

				{/* Right column */}
				<div className="space-y-4">
					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
						<UserRoleBadges roles={user.roles} />
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
						<UserStatus user={user} />
					</div>

					<div>
						<label className="mb-1 block text-sm font-medium text-gray-700">
							Email Verification
						</label>
						<Badge
							className={
								user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
							}
							value={user.emailVerified ? 'Verified' : 'Not Verified'}
						/>
					</div>
				</div>

				{isEditing && (
					<div className="col-span-1 mt-6 flex justify-end md:col-span-2">
						<button
							type="submit"
							disabled={isSubmitting}
							className="rounded bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 disabled:bg-purple-400"
						>
							{isSubmitting ? 'Saving...' : 'Save Changes'}
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

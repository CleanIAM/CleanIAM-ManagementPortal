import React, { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog';
import { ApiUserModel, UserRole } from '@/lib/api/generated/cleanIAM.schemas';
import { UserForm } from '../UserForm';
import { FormButton } from '@/components/form';
import { UserRoleBadges } from '../UserRoleBadges';
import { UserStatus } from '../UserStatus';
import { usePutApiUsersId, useGetApiUsers } from '@/lib/api/generated/users-api/users-api';
import { toast } from 'react-toastify';

interface UserDialogProps {
	user: ApiUserModel | null;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onSuccess?: () => void;
}

export const UserDialog: React.FC<UserDialogProps> = ({ user, isOpen, onOpenChange, onSuccess }) => {
	const [isEditing, setIsEditing] = useState(false);
	const { refetch } = useGetApiUsers();

	// Update user mutation
	const updateUserMutation = usePutApiUsersId({
		mutation: {
			onSuccess: () => {
				toast.success('User updated successfully');
				refetch();
				if (onSuccess) {
					onSuccess();
				}
			},
			onError: error => {
				toast.error(`Failed to update user: ${error.message}`);
			}
		}
	});

	// Handle edit success
	const handleEditSuccess = () => {
		setIsEditing(false);
	};

	// Handle dialog close
	const handleDialogClose = () => {
		setIsEditing(false);
		onOpenChange(false);
	};

	if (!user) {
		return null;
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>{isEditing ? 'Edit User' : 'User Details'}</DialogTitle>
					<DialogDescription>
						{isEditing ? 'Edit user information' : 'View user information'}
					</DialogDescription>
				</DialogHeader>

				<div className="py-4">
					{isEditing ? (
						<UserForm
							user={user}
							onSuccess={handleEditSuccess}
							onCancel={() => setIsEditing(false)}
							disableEmail={true}
						/>
					) : (
						<div className="space-y-6">
							<div>
								<h3 className="mb-2 text-sm font-medium text-gray-500">Personal Information</h3>
								<div className="grid gap-4 md:grid-cols-2">
									<div>
										<p className="text-sm font-medium text-gray-500">Full Name</p>
										<p className="text-lg font-medium">
											{user.firstName} {user.lastName}
										</p>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-500">Email</p>
										<p className="text-lg">{user.email}</p>
									</div>
								</div>
							</div>

							<div>
								<h3 className="mb-2 text-sm font-medium text-gray-500">Account Information</h3>
								<div className="grid gap-4 md:grid-cols-2">
									<div>
										<p className="text-sm font-medium text-gray-500">Roles</p>
										<div className="mt-1">
											<UserRoleBadges roles={user.roles} />
										</div>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-500">Status</p>
										<div className="mt-1">
											<UserStatus user={user} />
										</div>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-500">Email Verified</p>
										<p className="mt-1 font-medium">
											{user.emailVerified ? (
												<span className="text-green-600">Yes</span>
											) : (
												<span className="text-amber-600">No</span>
											)}
										</p>
									</div>
									<div>
										<p className="text-sm font-medium text-gray-500">MFA Enabled</p>
										<p className="mt-1 font-medium">
											{user.isMFAEnabled ? (
												<span className="text-green-600">Yes</span>
											) : (
												<span className="text-gray-600">No</span>
											)}
										</p>
									</div>
								</div>
							</div>

							<div className="flex justify-end">
								<FormButton
									variant="primary"
									onClick={() => setIsEditing(true)}
									className="ml-2"
								>
									Edit User
								</FormButton>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

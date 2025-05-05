import React from 'react';
import { FormButton } from '@/components/form';
import {
	useDeleteApiUsersId,
	useGetApiUsers,
	usePutApiUsersIdDisabled,
	usePutApiUsersIdEnabled
} from '@/lib/api/generated/users-api/users-api';
import { toast } from 'react-toastify';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { Loader } from '../public/Loader';
import { cn } from '@/lib/utils';

interface UserActionsProps {
	user: ApiUserModel;
}

export const UserActions: React.FC<UserActionsProps> = ({ user }) => {
	const { refetch } = useGetApiUsers();

	// Disable user mutation
	const disableUserMutation = usePutApiUsersIdDisabled({
		mutation: {
			onSuccess: () => {
				toast.success('User disabled successfully');
				refetch();
			},
			onError: error => {
				toast.error(`Failed to disable user: ${error.message}`);
			}
		}
	});

	// Enable user mutation
	const enableUserMutation = usePutApiUsersIdEnabled({
		mutation: {
			onSuccess: () => {
				toast.success('User enabled successfully');
				refetch();
			},
			onError: error => {
				toast.error(`Failed to enable user: ${error.message}`);
			}
		}
	});

	// Delete user mutation
	const deleteUserMutation = useDeleteApiUsersId({
		mutation: {
			onSuccess: () => {
				toast.success('User deleted successfully');
				refetch();
			},
			onError: error => {
				toast.error(`Failed to delete user: ${error.message}`);
			}
		}
	});

	// Handle delete user
	const handleDeleteUser = () => {
		if (confirm('Are you sure you want to delete this user?')) {
			deleteUserMutation.mutate({ id: user.id });
		}
	};

	// Handle toggle user status (enable/disable)
	const handleToggleUserStatus = () => {
		if (user.isDisabled) {
			enableUserMutation.mutate({ id: user.id });
		} else {
			disableUserMutation.mutate({ id: user.id });
		}
	};

	return (
		<div className="flex justify-end gap-2">
			<FormButton
				onClick={handleToggleUserStatus}
				variant="secondary"
				className={cn('w-20 py-1 text-sm')}
			>
				{disableUserMutation.isPending || enableUserMutation.isPending ? (
					<Loader />
				) : user.isDisabled ? (
					'Enable'
				) : (
					'Disable'
				)}
			</FormButton>
			<FormButton onClick={handleDeleteUser} variant="danger" className="w-20 py-1 text-sm">
				{deleteUserMutation.isPending ? 'Delete' : <Loader />}
			</FormButton>
		</div>
	);
};

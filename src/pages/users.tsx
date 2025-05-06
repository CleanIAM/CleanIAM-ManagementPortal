import { useState, useMemo } from 'react';
import { useGetApiUsers } from '../lib/api/generated/users-api/users-api';
import { FormButton } from '../components/form';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '../components/ui/dialog';
import { Loader } from '@/components/public/Loader';
import { UserForm } from '@/components/users/UserForm';
import { UserTable } from '@/components/users/UserTable';

export const UsersPage = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);

	// Fetch users data
	const { data: usersResponse, isLoading, isError, error, refetch } = useGetApiUsers();

	// Get users array from response with proper error handling
	const users = useMemo(() => {
		if (isLoading || isError || usersResponse?.status !== 200) {
			return [];
		}
		console.log('Users:', usersResponse?.data);

		return usersResponse?.data;
	}, [isError, isLoading, usersResponse?.data, usersResponse?.status]);

	// Handle closing the user form dialog
	const handleCloseUserDialog = () => {
		setIsAddModalOpen(false);
	};

	return (
		<div className="mx-auto max-w-6xl px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold text-blue-800">Users</h1>
				<p className="text-gray-600">Manage users in your application</p>
			</div>

			{isLoading ? (
				<div className="my-20 flex h-full w-full items-center justify-center">
					<Loader className="h-16 w-16" />
				</div>
			) : isError ? (
				<div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
					<p>Error loading users: {error instanceof Error ? error.message : 'Unknown error'}</p>
					<FormButton onClick={() => refetch()} variant="danger" className="mt-2">
						Try Again
					</FormButton>
				</div>
			) : (
				<div className="mb-8 rounded-lg bg-white p-6 shadow-md">
					<div className="mb-4 flex justify-end">
						<FormButton onClick={() => setIsAddModalOpen(true)}>Invite User</FormButton>
					</div>

					<UserTable users={users} />
				</div>
			)}

			{/* Invite Form Dialog */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} modal={false}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Invite New User</DialogTitle>
						<DialogDescription>Invite a new user to the system</DialogDescription>
					</DialogHeader>

					<div className="py-4">
						<UserForm
							onSuccess={() => {
								handleCloseUserDialog();
								refetch();
							}}
							onCancel={handleCloseUserDialog}
						/>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

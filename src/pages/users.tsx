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
import { UserTable, UserForm } from '@/components/users';

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
				<div className="flex justify-center py-12">
					<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-600">
						Loading...
					</div>
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
						<FormButton onClick={() => setIsAddModalOpen(true)}>Add User</FormButton>
					</div>

					<UserTable users={users} />
				</div>
			)}

			{/* Add User Form Dialog */}
			<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen} modal={false}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Add New User</DialogTitle>
						<DialogDescription>Create a new user account</DialogDescription>
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

import React, { useState } from 'react';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { UserRoleBadges } from './UserRoleBadges';
import { UserStatus } from './UserStatus';
import { UserActions } from './UserActions';
import { UserDialog } from './UserDialog';

interface UserTableProps {
	users: ApiUserModel[];
}

export const UserTable: React.FC<UserTableProps> = ({ users }) => {
	// State for managing the selected user and dialog visibility
	const [selectedUser, setSelectedUser] = useState<ApiUserModel | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Handle row click
	const handleRowClick = (user: ApiUserModel) => {
		setSelectedUser(user);
		setIsDialogOpen(true);
	};
	if (users.length === 0) {
		return (
			<div className="py-8 text-center">
				<p className="mb-4 text-gray-500">No users found</p>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Name
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Email
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Roles
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Status
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{users.map(user => (
						<tr
							key={user.id}
							className="cursor-pointer hover:bg-gray-50"
							onClick={e => {
								// Prevent row click when clicking on the actions column
								if ((e.target as HTMLElement).closest('.actions-column')) {
									return;
								}
								handleRowClick(user);
							}}
						>
							<td className="whitespace-nowrap px-6 py-4">
								<div className="text-sm font-medium text-gray-900">
									{user.firstName} {user.lastName}
								</div>
							</td>
							<td className="whitespace-nowrap px-6 py-4">
								<div className="text-sm text-gray-500">{user.email}</div>
							</td>
							<td className="whitespace-nowrap px-6 py-4">
								<UserRoleBadges roles={user.roles} />
							</td>
							<td className="whitespace-nowrap px-6 py-4">
								{/* In a real app, we'd have an isDisabled flag - mocked for demonstration */}
								<UserStatus user={user} />
							</td>
							<td className="actions-column whitespace-nowrap px-6 py-4 text-right">
								<UserActions user={user} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* User Dialog */}
			<UserDialog user={selectedUser} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
		</div>
	);
};

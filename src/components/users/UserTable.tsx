import React, { useState } from 'react';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { UserRoleBadges } from './UserRoleBadges';
import { UserStatus } from './UserStatus';
import { UserActions } from './UserActions';
import { UserInfoDialog } from './UserInfoDialog';

interface UserTableProps {
  users: ApiUserModel[];
  tenant?: string;
}

export const UserTable: React.FC<UserTableProps> = ({ users, tenant }) => {
  // Track any dialog that is open
  const [isAnyEditDialogOpen, setIsAnyEditDialogOpen] = useState(false);
  const [isAnyAssignDialogOpen, setIsAnyAssignDialogOpen] = useState(false);
  const isAnyDialogOpen = isAnyEditDialogOpen || isAnyAssignDialogOpen;

  // Create callback functions to be passed down to UserActions
  const handleEditDialogStateChange = (isOpen: boolean) => {
    setIsAnyEditDialogOpen(isOpen);
  };
  
  const handleAssignDialogStateChange = (isOpen: boolean) => {
    setIsAnyAssignDialogOpen(isOpen);
  };
  // State for managing the selected user and dialog visibility
  const [selectedUser, setSelectedUser] = useState<ApiUserModel | null>(null);
  const [isInfoDialogOpen, setInfoIsDialogOpen] = useState(false);

  // Handle row click
  const handleRowClick = (user: ApiUserModel) => {
    setSelectedUser(user);
    setInfoIsDialogOpen(true);
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
                // Prevent row click when clicking on the actions column or when any dialog is open
                if ((e.target as HTMLElement).closest('.actions-column') || isAnyDialogOpen) {
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
                <UserActions 
                  user={user} 
                  onEditDialogStateChange={handleEditDialogStateChange} 
                  onAssignDialogStateChange={handleAssignDialogStateChange}
                  tenant={tenant} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* User Dialog */}
      <UserInfoDialog
        user={selectedUser}
        isOpen={isInfoDialogOpen}
        onOpenChange={setInfoIsDialogOpen}
      />
    </div>
  );
};

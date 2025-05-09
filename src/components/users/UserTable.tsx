import React, { useState } from 'react';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { UserRoleBadges } from './UserRoleBadges';
import { UserStatus } from './UserStatus';
import { UserActions } from './UserActions';
import { UserInfoDialog } from './UserInfoDialog';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

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

  const columns: ColumnDef<ApiUserModel>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="text-sm font-medium text-gray-900">
            {user.firstName} {user.lastName}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        const fullNameA = `${rowA.original.firstName || ''} ${rowA.original.lastName || ''}`.trim();
        const fullNameB = `${rowB.original.firstName || ''} ${rowB.original.lastName || ''}`.trim();
        return fullNameA.localeCompare(fullNameB);
      },
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => {
        return <div className="text-sm text-gray-500">{row.original.email}</div>;
      },
    },
    {
      accessorKey: 'roles',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Roles" />
      ),
      cell: ({ row }) => {
        return <UserRoleBadges roles={row.original.roles} />;
      },
      enableSorting: false,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return <UserStatus user={row.original} />;
      },
      enableSorting: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <UserActions 
              user={row.original} 
              onEditDialogStateChange={handleEditDialogStateChange} 
              onAssignDialogStateChange={handleAssignDialogStateChange}
              tenant={tenant} 
            />
          </div>
        );
      },
    },
  ];

  if (users.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div>
      <DataTable 
        columns={columns}
        data={users}
        searchPlaceholder="Search users by name or email..."
        searchFunction={(user, searchTerm) => {
          const term = searchTerm.toLowerCase();
          const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase().trim();
          const email = (user.email || '').toLowerCase();
          return fullName.includes(term) || email.includes(term);
        }}
        onRowClick={handleRowClick}
        isRowClickDisabled={isAnyDialogOpen}
      />
      
      {/* User Dialog */}
      <UserInfoDialog
        user={selectedUser}
        isOpen={isInfoDialogOpen}
        onOpenChange={setInfoIsDialogOpen}
      />
    </div>
  );
};

import { useState, useMemo } from 'react';
import { useGetApiUsers } from '../lib/api/generated/users-api/users-api';
import { useGetApiTenants } from '../lib/api/generated/tenants/tenants';
import { UserRole } from '../lib/api/generated/cleanIAM.schemas';
import { FormButton } from '../components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Loader } from '@/components/public/Loader';
import { UserForm } from '@/components/users/UserForm';
import { UserTable } from '@/components/users/UserTable';
import { useRoles } from '@/lib/hooks/useRoles';

export const UsersPage = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<string>('default');

  // Get user roles
  const userRoles = useRoles();
  console.log('User Roles:', userRoles);

  const isMasterAdmin = userRoles.includes(UserRole.MasterAdmin);

  // Fetch tenants data if user is master admin
  const { data: tenantsResponse, isLoading: isLoadingTenants } = useGetApiTenants(undefined, {
    query: { enabled: isMasterAdmin }
  });

  // Filter and format tenants for dropdown
  const tenants = useMemo(() => {
    if (isLoadingTenants || !tenantsResponse?.data) return [];
    return tenantsResponse.data;
  }, [isLoadingTenants, tenantsResponse?.data]);

  // Fetch users data with tenant param when selected
  const {
    data: usersResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetApiUsers(
    selectedTenant && selectedTenant !== 'default' ? { tenant: selectedTenant } : undefined
  );

  // Get users array from response with proper error handling
  const users = useMemo(() => {
    if (isLoading || isError || usersResponse?.status !== 200) {
      return [];
    }
    console.log('Users:', usersResponse?.data);

    return usersResponse?.data;
  }, [isError, isLoading, usersResponse?.data, usersResponse?.status]);

  // Handle closing the user form dialog
  const handleCloseEditUserDialog = () => {
    setIsInviteDialogOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-blue-800">Users</h1>
        <p className="text-gray-600">Manage users in your application</p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div className="flex-grow">
          {/* Empty div to balance the flex layout when tenant selector is present */}
        </div>

        {isMasterAdmin && tenants.length > 0 && (
          <div className="w-64">
            <label className="mb-1 block text-sm font-medium text-gray-700">Select Tenant</label>
            <Select value={selectedTenant} onValueChange={value => setSelectedTenant(value)}>
              <SelectTrigger>
                <SelectValue placeholder="My tenant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">My tenant</SelectItem>
                {tenants.map(tenant => (
                  <SelectItem key={tenant.id} value={tenant.id}>
                    {tenant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
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
            <FormButton onClick={() => setIsInviteDialogOpen(true)}>Invite User</FormButton>
          </div>

          <UserTable users={users} tenant={selectedTenant || undefined} onUserUpdated={refetch} />
        </div>
      )}

      {/* Invite Form Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invite New User</DialogTitle>
            <DialogDescription>Invite a new user to the system</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <UserForm
              onSuccess={() => {
                handleCloseEditUserDialog();
                refetch();
              }}
              onCancel={handleCloseEditUserDialog}
              tenant={selectedTenant !== 'default' ? selectedTenant : undefined}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;

import { useState, useMemo } from 'react';
import { useGetApiTenants } from '../lib/api/generated/tenants/tenants';
import { FormButton } from '../components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../components/ui/dialog';
import { Loader } from '@/components/public/Loader';
import { TenantForm } from '@/components/tenants/TenantForm';
import { TenantTable } from '@/components/tenants/TenantTable';

export const TenantsPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch tenants data
  const { data: tenantsResponse, isLoading, isError, error, refetch } = useGetApiTenants();

  // Get tenants array from response with proper error handling
  const tenants = useMemo(() => {
    if (isLoading || isError || tenantsResponse?.status !== 200) {
      return [];
    }
    console.log('Tenants:', tenantsResponse?.data);

    return tenantsResponse?.data;
  }, [isError, isLoading, tenantsResponse?.data, tenantsResponse?.status]);

  // Handle closing the tenant form dialog
  const handleCloseCreateTenantDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-blue-800">Tenants</h1>
        <p className="text-gray-600">Manage tenants in your application</p>
      </div>

      {isLoading ? (
        <div className="my-20 flex h-full w-full items-center justify-center">
          <Loader className="h-16 w-16" />
        </div>
      ) : isError ? (
        <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>Error loading tenants: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <FormButton onClick={() => refetch()} variant="danger" className="mt-2">
            Try Again
          </FormButton>
        </div>
      ) : (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex justify-end">
            <FormButton onClick={() => setIsCreateDialogOpen(true)}>Create Tenant</FormButton>
          </div>

          <TenantTable tenants={tenants} />
        </div>
      )}

      {/* Create Tenant Form Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Tenant</DialogTitle>
            <DialogDescription>Create a new tenant in the system</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <TenantForm
              onSuccess={() => {
                handleCloseCreateTenantDialog();
                refetch();
              }}
              onCancel={handleCloseCreateTenantDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

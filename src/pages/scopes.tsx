import { useState, useMemo } from 'react';
import { useGetApiScopes, useGetApiScopesDefault } from '@/lib/api/generated/scopes-api-endpoint/scopes-api-endpoint';
import { FormButton } from '@/components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Loader } from '@/components/public/Loader';
import { ScopeForm } from '@/components/scopes/ScopeForm';
import { ScopeTable } from '@/components/scopes/ScopeTable';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';

export const ScopesPage = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch all scopes data
  const { data: scopesResponse, isLoading, isError, error, refetch } = useGetApiScopes();

  // Fetch default scopes data
  const { data: defaultScopesResponse, isLoading: isDefaultScopesLoading } = useGetApiScopesDefault();

  // Get default scope names
  const defaultScopeNames = useMemo(() => {
    if (isDefaultScopesLoading || !defaultScopesResponse?.data) {
      return new Set<string>();
    }
    return new Set(defaultScopesResponse.data.map(scope => scope.name));
  }, [isDefaultScopesLoading, defaultScopesResponse?.data]);

  // Get scopes array from response with proper error handling
  const scopes = useMemo(() => {
    if (isLoading || isError || !scopesResponse?.data) {
      return [];
    }
    
    // Add isDefault flag to each scope
    return scopesResponse.data.map(scope => ({
      ...scope,
      isDefault: defaultScopeNames.has(scope.name)
    }));
  }, [isError, isLoading, scopesResponse?.data, defaultScopeNames]);

  // Handle closing the scope form dialog
  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-blue-800">Scopes</h1>
        <p className="text-gray-600">Manage OAuth scopes for your applications</p>
      </div>

      {isLoading ? (
        <div className="my-20 flex h-full w-full items-center justify-center">
          <Loader className="h-16 w-16" />
        </div>
      ) : isError ? (
        <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>Error loading scopes: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <FormButton onClick={() => refetch()} variant="danger" className="mt-2">
            Try Again
          </FormButton>
        </div>
      ) : (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex justify-end">
            <FormButton onClick={() => setIsCreateDialogOpen(true)}>Create Scope</FormButton>
          </div>

          <ScopeTable scopes={scopes} />
        </div>
      )}

      {/* Create Scope Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Scope</DialogTitle>
            <DialogDescription>Create a new OAuth scope for your applications</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <ScopeForm
              onSuccess={() => {
                handleCloseCreateDialog();
                refetch();
              }}
              onCancel={handleCloseCreateDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScopesPage;

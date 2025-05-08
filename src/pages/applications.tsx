import { useState, useMemo } from 'react';
import {
  useGetApiApplications,
  useDeleteApiApplicationsId
} from '../lib/api/generated/applications-api/applications-api';
import { ApplicationForm } from '../components/public/ApplicationForm';
import { FormButton } from '../components/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../components/ui/dialog';
import { Loader } from '@/components/public/Loader';
import { ApplicationTable } from '@/components/applications/ApplicationTable';

export const ApplicationsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch applications data
  const {
    data: applicationsResponse,
    isLoading,
    isError,
    error,
    refetch
  } = useGetApiApplications();

  // Get applications array from response
  const applications = useMemo(() => {
    if (isLoading || isError || applicationsResponse?.status !== 200) {
      return [];
    }
    return applicationsResponse?.data || [];
  }, [isError, isLoading, applicationsResponse?.data, applicationsResponse?.status]);

  // Delete application mutation
  const deleteApplicationMutation = useDeleteApiApplicationsId({
    mutation: {
      onSuccess: () => {
        refetch();
      }
    }
  });

  // Handle delete application
  const handleDeleteApplication = (id: string) => {
    deleteApplicationMutation.mutate({ id });
  };

  // Handle closing the application dialog
  const handleCloseApplicationDialog = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-blue-800">Applications</h1>
        <p className="text-gray-600">Manage your OpenID Connect applications</p>
      </div>

      {isLoading ? (
        <div className="my-20 flex h-full w-full items-center justify-center">
          <Loader className="h-16 w-16" />
        </div>
      ) : isError ? (
        <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>
            Error loading applications: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <FormButton onClick={() => refetch()} variant="danger" className="mt-2">
            Try Again
          </FormButton>
        </div>
      ) : (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex justify-end">
            <FormButton onClick={() => setIsAddModalOpen(true)}>Add Application</FormButton>
          </div>

          <ApplicationTable
            applications={applications}
            onDelete={handleDeleteApplication}
            onRefetch={refetch}
          />
        </div>
      )}

      {/* Create New Application Form Dialog */}
      <Dialog open={isAddModalOpen} onOpenChange={handleCloseApplicationDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
            <DialogDescription>Create a new OpenID Connect application</DialogDescription>
          </DialogHeader>

          <div className="max-h-[80vh] overflow-y-auto py-4 pr-2">
            <ApplicationForm
              isEdit={false}
              onSuccess={() => {
                handleCloseApplicationDialog();
                refetch();
              }}
              onCancel={handleCloseApplicationDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import React, { useState } from 'react';
import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';
import { ApplicationActions } from './ApplicationActions';
import { ApplicationInfoDialog } from './ApplicationInfoDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ApplicationForm } from '@/components/public/ApplicationForm';
import { Badge } from '@/components/ui/badge';

interface ApplicationTableProps {
  applications: ApiApplicationModel[];
  onDelete: (id: string) => void;
  onRefetch: () => void;
}

export const ApplicationTable: React.FC<ApplicationTableProps> = ({ 
  applications, 
  onDelete,
  onRefetch
}) => {
  // Track if an edit dialog is currently open in any row
  const [isAnyEditDialogOpen, setIsAnyEditDialogOpen] = useState(false);

  // Create a callback function to be passed down to ApplicationActions
  const handleEditDialogStateChange = (isOpen: boolean) => {
    setIsAnyEditDialogOpen(isOpen);
  };

  // State for managing the selected application and dialog visibility
  const [selectedApplication, setSelectedApplication] = useState<ApiApplicationModel | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Handle row click
  const handleRowClick = (application: ApiApplicationModel) => {
    setSelectedApplication(application);
    setIsInfoDialogOpen(true);
  };

  if (applications.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-gray-500">No applications found</p>
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
              Client ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Redirect URIs
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
          {applications.map(application => (
            <tr
              key={application.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={e => {
                // Prevent row click when clicking on the actions column or when any edit dialog is open
                if ((e.target as HTMLElement).closest('.actions-column') || isAnyEditDialogOpen) {
                  return;
                }
                handleRowClick(application);
              }}
            >
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {application.displayName || 'Unnamed Application'}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm text-gray-500">{application.clientId}</div>
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-blue-50">
                    {application.applicationType}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    {application.clientType}
                  </Badge>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="max-h-10 overflow-hidden text-sm text-gray-500">
                  {application.redirectUris && application.redirectUris.length > 0 
                    ? application.redirectUris[0]
                    : 'No redirect URIs'}
                  {application.redirectUris && application.redirectUris.length > 1 && (
                    <span className="ml-1 text-xs text-gray-400">
                      (+{application.redirectUris.length - 1} more)
                    </span>
                  )}
                </div>
              </td>
              <td className="actions-column whitespace-nowrap px-6 py-4 text-right">
                <ApplicationActions 
                  application={application} 
                  onDelete={onDelete}
                  onRefetch={onRefetch}
                  onEditDialogStateChange={handleEditDialogStateChange} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Application Dialog */}
      <ApplicationInfoDialog
        application={selectedApplication}
        isOpen={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
        onEdit={(application) => {
          setIsEditDialogOpen(true);
          setIsAnyEditDialogOpen(true);
        }}
      />
      
      {/* Edit Dialog - will show up when edit button in info dialog is clicked */}
      {selectedApplication && (
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => {
            setIsEditDialogOpen(open);
            setIsAnyEditDialogOpen(open);
            if (!open) {
              // Reopen info dialog if edit dialog is closed without success
              setIsInfoDialogOpen(true);
            }
          }}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedApplication.displayName || selectedApplication.clientId}</DialogTitle>
              <DialogDescription>
                Edit the details of your existing OpenID Connect application
              </DialogDescription>
            </DialogHeader>

            <div className="max-h-[80vh] overflow-y-auto py-4 pr-2">
              <ApplicationForm
                isEdit={true}
                initialData={selectedApplication}
                onSuccess={() => {
                  setIsEditDialogOpen(false);
                  setIsAnyEditDialogOpen(false);
                  setIsInfoDialogOpen(false);
                  onRefetch();
                }}
                onCancel={() => {
                  setIsEditDialogOpen(false);
                  setIsAnyEditDialogOpen(false);
                  // Reopen info dialog when canceling
                  setIsInfoDialogOpen(true);
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

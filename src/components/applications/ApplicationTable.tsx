import React, { useState } from 'react';
import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';
import { ApplicationActions } from './ApplicationActions';
import { ApplicationInfoDialog } from './ApplicationInfoDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { ApplicationForm } from '@/components/public/ApplicationForm';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

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

  const columns: ColumnDef<ApiApplicationModel>[] = [
    {
      accessorKey: 'displayName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => {
        return (
          <div className="text-sm font-medium text-gray-900">
            {row.original.displayName || 'Unnamed Application'}
          </div>
        );
      }
    },
    {
      accessorKey: 'clientId',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Client ID" />,
      cell: ({ row }) => {
        return <div className="text-sm text-gray-500">{row.original.clientId}</div>;
      }
    },
    {
      accessorKey: 'applicationType',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Badge variant="outline" className="bg-blue-50">
              {row.original.applicationType}
            </Badge>
            <Badge variant="outline" className="bg-blue-50">
              {row.original.clientType}
            </Badge>
          </div>
        );
      },
      enableSorting: false
    },
    {
      accessorKey: 'redirectUris',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Redirect URIs" />,
      cell: ({ row }) => {
        const redirectUris = row.original.redirectUris || [];
        return (
          <div className="max-h-10 overflow-hidden text-sm text-gray-500">
            {redirectUris.length > 0 ? redirectUris[0] : 'No redirect URIs'}
            {redirectUris.length > 1 && (
              <span className="ml-1 text-xs text-gray-400">(+{redirectUris.length - 1} more)</span>
            )}
          </div>
        );
      },
      enableSorting: false
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <ApplicationActions
              application={row.original}
              onDelete={onDelete}
              onRefetch={onRefetch}
              onEditDialogStateChange={handleEditDialogStateChange}
            />
          </div>
        );
      }
    }
  ];

  if (applications.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-gray-500">No applications found</p>
      </div>
    );
  }

  return (
    <div>
      <DataTable 
      columns={columns}
      data={applications}
      searchPlaceholder="Search by name or client ID..."
      searchFunction={(application, searchTerm) => {
        const term = searchTerm.toLowerCase();
        const displayName = (application.displayName || '').toLowerCase();
          const clientId = (application.clientId || '').toLowerCase();
          return displayName.includes(term) || clientId.includes(term);
        }}
        onRowClick={handleRowClick}
        isRowClickDisabled={isAnyEditDialogOpen}
      />

      {/* Application Dialog */}
      <ApplicationInfoDialog
        application={selectedApplication}
        isOpen={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
        onEdit={application => {
          setIsEditDialogOpen(true);
          setIsAnyEditDialogOpen(true);
        }}
      />

      {/* Edit Dialog - will show up when edit button in info dialog is clicked */}
      {selectedApplication && (
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={open => {
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
              <DialogTitle>
                {selectedApplication.displayName || selectedApplication.clientId}
              </DialogTitle>
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

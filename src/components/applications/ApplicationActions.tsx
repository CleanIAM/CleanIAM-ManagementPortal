import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { ApplicationForm } from '@/components/applications/ApplicationForm';
import { DeleteApplicationConfirmDialog } from '@/components/applications/DeleteApplicationConfirmDialog';
import { MoreHorizontal, Edit, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';

interface ApplicationActionsProps {
  application: ApiApplicationModel;
  onDelete: (id: string) => void;
  onRefetch: () => void;
  onEditDialogStateChange: (isOpen: boolean) => void;
}

export const ApplicationActions: React.FC<ApplicationActionsProps> = ({
  application,
  onDelete,
  onRefetch,
  onEditDialogStateChange
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditDialogOpen(true);
    onEditDialogStateChange(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setIsEditDialogOpen(false);
    onEditDialogStateChange(false);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    onDelete(application.id);
    setIsDeleting(false);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={e => e.stopPropagation()} className="focus:outline-none">
          <MoreHorizontal className="h-5 w-5 text-gray-500 hover:text-gray-700" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEditClick}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Application Dialog */}
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={open => {
          setIsEditDialogOpen(open);
          onEditDialogStateChange(open);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{application.displayName || application.clientId}</DialogTitle>
            <DialogDescription>
              Edit the details of your existing OpenID Connect application
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[80vh] overflow-y-auto py-4 pr-2">
            <ApplicationForm
              isEdit={true}
              initialData={application}
              onSuccess={() => {
                handleEditDialogClose();
                onRefetch();
              }}
              onCancel={handleEditDialogClose}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Application Confirmation Dialog */}
      <DeleteApplicationConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        applicationName={application.displayName || application.clientId}
      />
    </>
  );
};

import React, { useState } from 'react';
import { useDeleteApiScopesScopeName, useGetApiScopes } from '@/lib/api/generated/scopes-api-endpoint/scopes-api-endpoint';
import { toast } from 'react-toastify';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { Loader } from '@/components/public/Loader';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Settings, Trash2, Edit } from 'lucide-react';
import { DeleteScopeConfirmDialog } from './DeleteScopeConfirmDialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScopeForm } from './ScopeForm';

interface ScopeActionsProps {
  scope: Scope;
}

export const ScopeActions: React.FC<ScopeActionsProps> = ({ scope }) => {
  // State for dialogs
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { refetch } = useGetApiScopes();

  // Delete scope mutation
  const deleteScopeMutation = useDeleteApiScopesScopeName({
    mutation: {
      onSuccess: () => {
        toast.success(`Scope '${scope.name}' deleted successfully`);
        refetch();
      },
      onError: error => {
        toast.error(`Failed to delete scope: ${error.message}`);
      }
    }
  });

  // Handle edit scope
  const handleEditScope = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditDialogOpen(true);
  };

  // Handle delete scope
  const handleDeleteScope = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete scope
  const handleConfirmDeleteScope = () => {
    deleteScopeMutation.mutate({ scopeName: scope.name });
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Scope actions</span>
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={handleEditScope}
          >
            <Edit className="mr-2 h-4 w-4" strokeWidth={2} />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteScope}
            disabled={deleteScopeMutation.isPending}
            className="text-red-600 focus:text-red-600"
          >
            {deleteScopeMutation.isPending ? (
              <Loader className="mr-2 h-4 w-4" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" strokeWidth={2} />
            )}
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Scope Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Scope</DialogTitle>
            <DialogDescription>Update the details of this scope</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <ScopeForm
              scope={scope}
              onSuccess={() => {
                setIsEditDialogOpen(false);
                refetch();
              }}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Scope Confirmation Dialog */}
      <DeleteScopeConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDeleteScope}
        isDeleting={deleteScopeMutation.isPending}
        scopeName={scope.displayName || scope.name}
      />
    </>
  );
};

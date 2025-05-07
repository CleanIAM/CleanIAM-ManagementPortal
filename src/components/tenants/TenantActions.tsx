import React, { useState } from 'react';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TenantForm } from './TenantForm';

interface TenantActionsProps {
  tenant: ApiTenantModel;
  onEditDialogStateChange: (isOpen: boolean) => void;
}

export const TenantActions: React.FC<TenantActionsProps> = ({ 
  tenant, 
  onEditDialogStateChange 
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Handle the edit button click
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditDialogOpen(true);
    onEditDialogStateChange(true);
  };

  // Handle closing the edit dialog
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    onEditDialogStateChange(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleEditClick}
        className="text-blue-600 hover:text-blue-800"
      >
        <EditIcon className="h-4 w-4 mr-1" />
        Edit
      </Button>

      {/* Edit dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <TenantForm 
              tenant={tenant}
              onSuccess={handleCloseEditDialog}
              onCancel={handleCloseEditDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

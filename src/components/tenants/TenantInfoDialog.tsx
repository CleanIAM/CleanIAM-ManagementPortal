import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { TenantForm } from './TenantForm';
import { FormButton } from '@/components/form';
import { TextWithCopy } from '@/components/public/TextWithCopy';

interface TenantInfoDialogProps {
  tenant: ApiTenantModel | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TenantInfoDialog: React.FC<TenantInfoDialogProps> = ({ 
  tenant, 
  isOpen, 
  onOpenChange 
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Handle edit success
  const handleEditSuccess = () => {
    setIsEditing(false);
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsEditing(false);
    // Use setTimeout to prevent event propagation issues
    if (!open) {
      setTimeout(() => {
        onOpenChange(open);
      }, 10);
    } else {
      onOpenChange(open);
    }
  };

  if (!tenant) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Tenant' : 'Tenant Details'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edit tenant information' : 'View tenant information'}
          </DialogDescription>
        </DialogHeader>

        <div className="pb-4">
          {isEditing ? (
            <TenantForm
              tenant={tenant}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Tenant ID</p>
                <TextWithCopy value={tenant.id} className="text-md justify-start gap-2 font-mono" />
              </div>
              
              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">Tenant Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg font-medium">{tenant.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <FormButton 
                  variant="primary" 
                  onClick={() => setIsEditing(true)} 
                  className="ml-2"
                >
                  Edit Tenant
                </FormButton>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

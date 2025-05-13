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
import { Badge } from '@/components/public/Badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoIcon } from 'lucide-react';
import { DEFAULT_TENANT_ID } from '@/utils/constants';
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

  // Function to check if tenant is the default tenant
  const isDefaultTenant = (tenant: ApiTenantModel) => {
    return tenant.id === DEFAULT_TENANT_ID;
  };

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
                    <div className="flex items-center">
                      <p className="text-lg font-medium">{tenant.name}</p>
                      {isDefaultTenant(tenant) && (
                        <div className="ml-2 flex items-center">
                          <Badge className="bg-blue-100 text-blue-800" value="Default" />
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon className="ml-1 h-4 w-4 text-blue-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Default tenant cannot be modified</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                {!isDefaultTenant(tenant) && (
                  <FormButton variant="primary" onClick={() => setIsEditing(true)} className="ml-2">
                    Edit Tenant
                  </FormButton>
                )}
                {isDefaultTenant(tenant) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <FormButton
                          variant="primary"
                          disabled={true}
                          className="ml-2 cursor-not-allowed opacity-50"
                        >
                          Edit Tenant
                        </FormButton>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Default tenant cannot be modified</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

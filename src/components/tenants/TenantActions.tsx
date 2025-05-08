import React, { useState } from 'react';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Settings, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { TenantEditDialog } from './TenantEditDialog';
import { useGetApiTenants } from '@/lib/api/generated/tenants/tenants';

interface TenantActionsProps {
  tenant: ApiTenantModel;
  onEditDialogStateChange: (isOpen: boolean) => void;
}

export const TenantActions: React.FC<TenantActionsProps> = ({
  tenant,
  onEditDialogStateChange
}) => {
  // State for edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { refetch } = useGetApiTenants();

  // Update parent component when edit dialog state changes
  const handleEditDialogOpen = (isOpen: boolean) => {
    refetch();
    setIsEditDialogOpen(isOpen);
    onEditDialogStateChange(isOpen);
  };

  // Handle delete tenant action
  const handleDeleteTenant = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.info('Delete tenant functionality available soon');
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Tenant actions</span>
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              handleEditDialogOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" strokeWidth={2} />
            <span>Edit Tenant</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteTenant}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" strokeWidth={2} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Tenant Dialog */}
      <TenantEditDialog
        tenant={tenant}
        isOpen={isEditDialogOpen}
        onOpenChange={handleEditDialogOpen}
      />
    </>
  );
};

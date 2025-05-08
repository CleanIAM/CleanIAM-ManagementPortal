import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { FormButton } from '@/components/form';
import { Loader } from '@/components/public/Loader';
import { ApiUserModel, ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { useGetApiTenants } from '@/lib/api/generated/tenants/tenants';
import { usePutApiTenantsTenantIdUsersUserId } from '@/lib/api/generated/tenants/tenants';
import { toast } from 'react-toastify';
import { useGetApiUsers } from '@/lib/api/generated/users-api/users-api';

interface AssignTenantDialogProps {
  user: ApiUserModel;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const AssignTenantDialog = ({
  user,
  isOpen,
  onOpenChange,
  onSuccess
}: AssignTenantDialogProps) => {
  const [selectedTenantId, setSelectedTenantId] = useState<string>('');

  // Fetch available tenants
  const { data: tenantsResponse, isLoading: isLoadingTenants } = useGetApiTenants();
  const { refetch } = useGetApiUsers();

  // Get tenants array from response
  const tenants = tenantsResponse?.data || [];

  // Assign user to tenant mutation
  const assignToTenantMutation = usePutApiTenantsTenantIdUsersUserId({
    mutation: {
      onSuccess: () => {
        toast.success(`User has been assigned to the selected tenant`);
        refetch();
        onSuccess();
        onOpenChange(false);
      },
      onError: error => {
        toast.error(`Failed to assign user to tenant: ${error.message}`);
      }
    }
  });

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedTenantId) {
      toast.error('Please select a tenant');
      return;
    }

    assignToTenantMutation.mutate({
      tenantId: selectedTenantId,
      userId: user.id
    });
  };

  // Handle dialog open change to prevent event propagation
  const handleOpenChange = (open: boolean) => {
    // Prevent the event from bubbling up
    if (!open) {
      setTimeout(() => {
        onOpenChange(open);
      }, 10);
    } else {
      onOpenChange(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md" onClick={e => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>Assign User to Tenant</DialogTitle>
          <DialogDescription>
            Assign {user.firstName} {user.lastName} to a different tenant.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoadingTenants ? (
            <div className="flex justify-center py-4">
              <Loader className="h-8 w-8" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Tenant
                </label>
                <Select value={selectedTenantId} onValueChange={setSelectedTenantId}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant: ApiTenantModel) => (
                      <SelectItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <FormButton
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={assignToTenantMutation.isPending}
          >
            Cancel
          </FormButton>
          <FormButton
            onClick={handleSubmit}
            disabled={!selectedTenantId || assignToTenantMutation.isPending}
          >
            {assignToTenantMutation.isPending ? (
              <>
                <Loader className="mr-2 h-4 w-4" />
                Assigning...
              </>
            ) : (
              'Assign'
            )}
          </FormButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

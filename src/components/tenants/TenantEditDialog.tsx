import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { TenantForm } from './TenantForm';

interface TenantEditDialogProps {
  tenant: ApiTenantModel;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TenantEditDialog = ({ tenant, isOpen, onOpenChange }: TenantEditDialogProps) => {
  // Handle dialog open change to prevent event propagation
  const handleOpenChange = (open: boolean) => {
    // Prevent the event from bubbling up when dialog is closed
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
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Tenant</DialogTitle>
          <DialogDescription>Edit tenant information</DialogDescription>
        </DialogHeader>

        <div className="pb-4">
          <TenantForm
            tenant={tenant}
            onSuccess={() => onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

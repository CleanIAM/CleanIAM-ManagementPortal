import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { UserForm } from './UserForm';

interface UserEditDialogProps {
  user: ApiUserModel;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  tenant?: string;
  onUserUpdated?: () => void;
}

export const UserEditDialog = ({ user, isOpen, onOpenChange, tenant, onUserUpdated }: UserEditDialogProps) => {
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
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Edit user information</DialogDescription>
        </DialogHeader>

        <div className="pb-4">
          <UserForm
            user={user}
            onSuccess={() => {
              onOpenChange(false);
              if (onUserUpdated) onUserUpdated();
            }}
            onCancel={() => onOpenChange(false)}
            disableEmail={true}
            tenant={tenant}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

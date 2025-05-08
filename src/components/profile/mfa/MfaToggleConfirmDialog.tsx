import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/public/Loader';

interface MfaToggleConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isUpdating: boolean;
  isEnabling: boolean;
}

export const MfaToggleConfirmDialog: React.FC<MfaToggleConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isUpdating,
  isEnabling
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEnabling ? 'Enable' : 'Disable'} Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            {isEnabling
              ? 'Are you sure you want to enable two-factor authentication? You will need your authenticator app to log in.'
              : 'Are you sure you want to disable two-factor authentication? This will lower the security of your account.'}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 sm:justify-between">
          <Button type="button" variant="outline" onClick={onClose} disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant={isEnabling ? 'default' : 'destructive'}
            disabled={isUpdating}
          >
            {isUpdating ? <Loader className="mr-2 h-4 w-4" /> : null}
            {isEnabling ? 'Enable' : 'Disable'} Two-Factor Authentication
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

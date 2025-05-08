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

interface MfaResetConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

export const MfaResetConfirmDialog: React.FC<MfaResetConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset MFA Configuration</DialogTitle>
          <DialogDescription>
            Are you sure you want to reset your MFA configuration? This will remove your current
            authentication app and disable MFA until you set it up again.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-6 sm:justify-between">
          <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="destructive" disabled={isDeleting}>
            {isDeleting ? <Loader className="mr-2 h-4 w-4" /> : null}
            Reset MFA Configuration
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/public/Loader';

interface ResetMfaConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isResetting: boolean;
  userName: string;
}

export const ResetMfaConfirmDialog: React.FC<ResetMfaConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isResetting,
  userName
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Reset MFA for {userName}</DialogTitle>
          <DialogDescription>
            Are you sure you want to reset and disable MFA for this user? They will need to reconfigure MFA on their next login if they want to use it.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="sm:justify-between mt-6">
          <Button type="button" variant="outline" onClick={onClose} disabled={isResetting}>
            Cancel
          </Button>
          <Button 
            onClick={onConfirm} 
            variant="destructive" 
            disabled={isResetting}
          >
            {isResetting ? <Loader className="mr-2 h-4 w-4" /> : null}
            Reset MFA
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useDeleteApiUserMfaConfiguration } from '@/lib/api/generated/user-api-endpoint/user-api-endpoint';
import { toast } from 'react-toastify';
import { Loader } from '@/components/public/Loader';

interface MfaResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export const MfaResetDialog: React.FC<MfaResetDialogProps> = ({ isOpen, onClose, onReset }) => {
  // Mutation to reset MFA configuration
  const resetMutation = useDeleteApiUserMfaConfiguration({
    mutation: {
      onSuccess: () => {
        toast.success('MFA configuration has been reset');
        onReset();
        onClose();
      },
      onError: error => {
        toast.error(`Failed to reset MFA configuration: ${error.message || 'Unknown error'}`);
      }
    }
  });

  const handleReset = () => {
    resetMutation.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset MFA Configuration</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove your MFA configuration and disable two-factor authentication. You'll
            need to reconfigure MFA if you want to use it again. Are you sure you want to continue?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={resetMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReset}
            disabled={resetMutation.isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {resetMutation.isPending ? <Loader className="mr-2 h-4 w-4" /> : null}
            Reset MFA
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

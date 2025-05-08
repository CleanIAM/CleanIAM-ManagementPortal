import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useGetApiUserMfaConfiguration,
  usePostApiUserMfaConfiguration
} from '@/lib/api/generated/user-api-endpoint/user-api-endpoint';
import { toast } from 'react-toastify';
import { Loader } from '@/components/public/Loader';

interface MfaConfigDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigured: () => void;
}

export const MfaConfigDialog: React.FC<MfaConfigDialogProps> = ({
  isOpen,
  onClose,
  onConfigured
}) => {
  const [totpCode, setTotpCode] = useState('');

  // Fetch QR code for MFA configuration
  const {
    data: mfaConfig,
    isLoading: isQrLoading,
    isError: isQrError,
    error: qrError
  } = useGetApiUserMfaConfiguration({
    query: {
      enabled: isOpen // Only fetch when dialog is open
    }
  });

  // Mutation to submit TOTP code
  const configMutation = usePostApiUserMfaConfiguration({
    mutation: {
      onSuccess: () => {
        toast.success('MFA successfully configured');
        setTotpCode('');
        onConfigured();
        onClose();
      },
      onError: error => {
        toast.error(
          <p>
            Failed to configure MFA:
            <br />
            {error.message || 'Invalid verification code'}
          </p>
        );
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (totpCode.length !== 6 || !/^\d+$/.test(totpCode)) {
      toast.error('Please enter a valid 6-digit verification code');
      return;
    }

    configMutation.mutate({
      data: {
        totp: totpCode,
        enableMfa: true // Enable MFA after successful configuration
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Configure Two-Factor Authentication</DialogTitle>
          <DialogDescription>
            Scan the QR code with your authentication app (like Google Authenticator, Authy, or
            Microsoft Authenticator) and enter the 6-digit code below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-4 py-4">
          {isQrLoading ? (
            <div className="flex h-48 w-48 items-center justify-center">
              <Loader className="h-10 w-10" />
            </div>
          ) : isQrError ? (
            <div className="text-center text-red-500">
              <p>Failed to load QR code:</p>
              <p>{qrError instanceof Error ? qrError.message : 'Unknown error'}</p>
            </div>
          ) : (
            <div className="bg-white p-2">
              <img src={mfaConfig?.data.qrCode} alt="MFA QR Code" className="h-48 w-48" />
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div>
              <label htmlFor="totp-code" className="mb-2 block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <Input
                id="totp-code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter 6-digit code"
                value={totpCode}
                onChange={e => setTotpCode(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={configMutation.isPending || totpCode.length !== 6}>
                {configMutation.isPending ? <Loader className="mr-2 h-4 w-4" /> : null}
                Verify and Enable
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

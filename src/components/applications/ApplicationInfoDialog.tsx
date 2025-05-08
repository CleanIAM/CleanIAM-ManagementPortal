import React from 'react';
import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface ApplicationInfoDialogProps {
  application: ApiApplicationModel | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const ApplicationInfoDialog: React.FC<ApplicationInfoDialogProps> = ({
  application,
  isOpen,
  onOpenChange
}) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{application.displayName || application.clientId}</DialogTitle>
          <DialogDescription>Application Details</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Client ID</h3>
              <p className="text-sm text-gray-900">{application.clientId}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-gray-500">Application Type</h3>
              <div className="flex space-x-2">
                <Badge variant="outline" className="bg-blue-50">
                  {application.applicationType}
                </Badge>
                <Badge variant="outline" className="bg-blue-50">
                  {application.clientType}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-500">Redirect URIs</h3>
            {application.redirectUris && application.redirectUris.length > 0 ? (
              <ul className="list-inside list-disc space-y-1">
                {application.redirectUris.map((uri, index) => (
                  <li key={index} className="text-sm text-gray-900">
                    {uri}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No redirect URIs configured</p>
            )}
          </div>

          <div>
            <h3 className="mb-1 text-sm font-medium text-gray-500">Post Logout Redirect URIs</h3>
            {application.postLogoutRedirectUris && application.postLogoutRedirectUris.length > 0 ? (
              <ul className="list-inside list-disc space-y-1">
                {application.postLogoutRedirectUris.map((uri, index) => (
                  <li key={index} className="text-sm text-gray-900">
                    {uri}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No post logout redirect URIs configured</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

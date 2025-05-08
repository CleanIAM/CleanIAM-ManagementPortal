import React from 'react';
import { ApiApplicationModel } from '@/lib/api/generated/cleanIAM.schemas';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TextWithCopy } from '@/components/public/TextWithCopy';
import { Globe, Key, Clock, Globe2, LucideFlame, LucideInfo, LucideUserX2, Edit, ExternalLink } from 'lucide-react';

interface ApplicationInfoDialogProps {
  application: ApiApplicationModel | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onEdit?: (application: ApiApplicationModel) => void;
}

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <div>{children}</div>
  </div>
);

const InfoItem = ({
  icon,
  label,
  value,
  copyable = false
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null | undefined;
  copyable?: boolean;
}) => (
  <div className="flex items-start space-x-2 py-1">
    <div className="mt-0.5 text-gray-400">{icon}</div>
    <div className="flex-1">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      {copyable ? (
        <TextWithCopy value={value || ''} className="text-sm text-gray-900" />
      ) : (
        <p className="text-sm text-gray-900">{value || 'Not specified'}</p>
      )}
    </div>
  </div>
);

const UriList = ({
  uris,
  emptyMessage
}: {
  uris: string[] | null | undefined;
  emptyMessage: string;
}) => (
  <div className="mt-1">
    {uris && uris.length > 0 ? (
      <ul className="space-y-1">
        {uris.map((uri, index) => (
          <li
            key={index}
            className="flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-800"
          >
            <Globe2 className="mr-2 h-3 w-3 text-gray-500" />
            <TextWithCopy value={uri} className="w-full font-mono" />
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-xs italic text-gray-500">{emptyMessage}</p>
    )}
  </div>
);

export const ApplicationInfoDialog: React.FC<ApplicationInfoDialogProps> = ({
  application,
  isOpen,
  onOpenChange,
  onEdit
}) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <span className="mr-2 rounded-md bg-blue-100 p-1">
              <LucideInfo className="h-5 w-5 text-blue-700" />
            </span>
            {application.displayName || application.clientId}
          </DialogTitle>
          <DialogDescription>Application details and configuration</DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card className="p-4">
            <h3 className="mb-3 flex items-center text-sm font-medium text-gray-700">
              <Key className="mr-2 h-4 w-4 text-blue-600" />
              Client Information
            </h3>

            <div className="space-y-2">
              <InfoItem
                icon={<Key className="h-4 w-4" />}
                label="Client ID"
                value={application.clientId}
                copyable={true}
              />

              <div className="flex flex-wrap gap-2 py-1">
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {application.applicationType}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {application.clientType}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {application.consentType} Consent
                </Badge>
              </div>
            </div>
          </Card>

          {/* Timing Information */}
          <Card className="p-4">
            <h3 className="mb-3 flex items-center text-sm font-medium text-gray-700">
              <Clock className="mr-2 h-4 w-4 text-blue-600" />
              Timing & Security
            </h3>

            <div className="space-y-3">
              <InfoItem
                icon={<Clock className="h-4 w-4" />}
                label="Access Token Lifetime"
                value={'Default'}
              />

              <InfoItem
                icon={<LucideUserX2 className="h-4 w-4" />}
                label="Requires PKCe"
                value={'Yes'}
              />

              <InfoItem
                icon={<LucideFlame className="h-4 w-4" />}
                label="Require Client Secret"
                value={application.clientType === 'Confidential' ? 'Yes' : 'No'}
              />
            </div>
          </Card>
        </div>

        {/* URIs and Scopes */}
        <div className="mt-4 grid grid-cols-1 gap-6">
          <Card className="p-4">
            <h3 className="mb-3 flex items-center text-sm font-medium text-gray-700">
              <Globe className="mr-2 h-4 w-4 text-blue-600" />
              URIs and Scopes
            </h3>

            <div className="space-y-4">
              <InfoSection title="Redirect URIs">
                <UriList
                  uris={application.redirectUris}
                  emptyMessage="No redirect URIs configured"
                />
              </InfoSection>

              <InfoSection title="Post Logout Redirect URIs">
                <UriList
                  uris={application.postLogoutRedirectUris}
                  emptyMessage="No post logout redirect URIs configured"
                />
              </InfoSection>

              <InfoSection title="Authorized Scopes">
                <div className="mt-1 flex flex-wrap gap-1">
                  {application.scopes && application.scopes.length > 0 ? (
                    application.scopes.map(scope => (
                      <Badge key={scope} variant="outline" className="bg-green-50 text-green-700">
                        {scope}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-xs italic text-gray-500">No scopes configured</p>
                  )}
                </div>
              </InfoSection>
            </div>
          </Card>
        </div>

        <DialogFooter className="mt-6 flex gap-2">
          {onEdit && (
            <Button
              onClick={() => {
                onEdit(application);
                onOpenChange(false);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Application
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

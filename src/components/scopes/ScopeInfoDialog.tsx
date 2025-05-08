import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { ScopeForm } from './ScopeForm';
import { FormButton } from '@/components/form';
import { Badge } from '@/components/ui/badge';
import { TextWithCopy } from '@/components/public/TextWithCopy';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LockIcon } from 'lucide-react';

interface ScopeInfoDialogProps {
  scope: Scope | null;
  isDefault?: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScopeInfoDialog: React.FC<ScopeInfoDialogProps> = ({
  scope,
  isDefault,
  isOpen,
  onOpenChange
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Handle edit success
  const handleEditSuccess = () => {
    setIsEditing(false);
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsEditing(false);
    // Use setTimeout to prevent event propagation issues
    if (!open) {
      setTimeout(() => {
        onOpenChange(open);
      }, 10);
    } else {
      onOpenChange(open);
    }
  };

  if (!scope) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEditing ? 'Edit Scope' : 'Scope Details'}
            {isDefault && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                Default
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? 'Edit scope information' : 'View scope information'}
          </DialogDescription>
        </DialogHeader>

        <div className="pb-4">
          {isEditing ? (
            <ScopeForm
              scope={scope}
              onSuccess={handleEditSuccess}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Scope Name</p>
                <TextWithCopy
                  value={scope.name}
                  className="text-md justify-start gap-2 font-mono"
                />
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Display Name</p>
                    <p className="text-lg font-medium">{scope.displayName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Description</p>
                    <p className="text-lg">{scope.description || '-'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-medium text-gray-500">Resources</h3>
                <div className="rounded-md border border-gray-200 p-4">
                  {scope.resources.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {scope.resources.map(resource => (
                        <Badge key={resource} variant="outline" className="px-2 py-1">
                          {resource}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No resources defined for this scope</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {isDefault ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <FormButton variant="primary" className="ml-2 opacity-50" disabled={true}>
                            <LockIcon className="mr-2 h-4 w-4" />
                            Edit Scope
                          </FormButton>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Default scopes cannot be modified</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <FormButton variant="primary" onClick={() => setIsEditing(true)} className="ml-2">
                    Edit Scope
                  </FormButton>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

import React, { useState } from 'react';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { ScopeActions } from './ScopeActions';
import { ScopeInfoDialog } from './ScopeInfoDialog';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { mockApplications } from '@/lib/mock/applications';

// Extend the Scope type to include isDefault flag
interface ExtendedScope extends Scope {
  isDefault?: boolean;
}

interface ScopeTableProps {
  scopes: ExtendedScope[];
}

export const ScopeTable: React.FC<ScopeTableProps> = ({ scopes }) => {
  // Track if an edit dialog is currently open in any row
  const [isAnyEditDialogOpen, setIsAnyEditDialogOpen] = useState(false);

  // Create a callback function to be passed down to ScopeActions
  const handleEditDialogStateChange = (isOpen: boolean) => {
    setIsAnyEditDialogOpen(isOpen);
  };

  // State for managing the selected scope and dialog visibility
  const [selectedScope, setSelectedScope] = useState<ExtendedScope | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  // Handle row click
  const handleRowClick = (scope: ExtendedScope) => {
    setSelectedScope(scope);
    setIsInfoDialogOpen(true);
  };

  // Get display name with fallback to name
  const getDisplayName = (scope: ExtendedScope) => {
    return scope.displayName || scope.name;
  };

  // Get application name from resource ID
  const getApplicationName = (resourceId: string) => {
    const app = mockApplications.find(a => a.id === resourceId);
    return app ? app.name : resourceId;
  };

  // Format resources for display with overflow handling
  const formatResources = (resources: string[]) => {
    if (resources.length === 0) {
      return <span className="text-gray-400 italic">No applications</span>;
    }

    // Get application names
    const appNames = resources.map(getApplicationName);
    
    // Show first 2 applications and indicate if there are more
    const visibleApps = appNames.slice(0, 2);
    const hasMore = appNames.length > 2;
    
    return (
      <div className="flex items-center">
        <div className="flex flex-wrap gap-1 max-w-[300px]">
          {visibleApps.map((appName, index) => (
            <Badge key={index} variant="outline" className="px-2 py-0.5 text-xs">
              {appName}
            </Badge>
          ))}
        </div>
        {hasMore && (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <div className="ml-2 cursor-help">
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium mb-1">All Applications:</p>
                <ul className="list-disc pl-4 space-y-1">
                  {appNames.map((appName, index) => (
                    <li key={index}>{appName}</li>
                  ))}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  };

  if (scopes.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-gray-500">No scopes found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Applications
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {scopes.map(scope => (
            <tr
              key={scope.name}
              className="cursor-pointer hover:bg-gray-50"
              onClick={e => {
                // Prevent row click when clicking on the actions column or when any edit dialog is open
                if ((e.target as HTMLElement).closest('.actions-column') || isAnyEditDialogOpen) {
                  return;
                }
                handleRowClick(scope);
              }}
            >
              <td className="whitespace-nowrap px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {getDisplayName(scope)}
                  {scope.isDefault && (
                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                      Default
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-gray-500 font-mono">{scope.name}</div>
              </td>
              <td className="px-6 py-4">
                {formatResources(scope.resources)}
              </td>
              <td className="actions-column whitespace-nowrap px-6 py-4 text-right">
                <ScopeActions 
                  scope={scope} 
                  isDefault={scope.isDefault} 
                  onEditDialogStateChange={handleEditDialogStateChange} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Scope Info Dialog */}
      <ScopeInfoDialog
        scope={selectedScope}
        isDefault={selectedScope?.isDefault}
        isOpen={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
      />
    </div>
  );
};

import React, { useState } from 'react';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ScopeActions } from './ScopeActions';
import { ScopeInfoDialog } from './ScopeInfoDialog';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  // Format resources for display with overflow handling
  const formatResources = (resources: string[]) => {
    if (resources.length === 0) {
      return <span className="italic text-gray-400">No resources</span>;
    }

    // Show first 2 resources and indicate if there are more
    const visibleResources = resources.slice(0, 2);
    const hasMore = resources.length > 2;

    return (
      <div className="flex items-center">
        <div className="flex max-w-[300px] flex-wrap gap-1 overflow-hidden">
          {visibleResources.map(resource => (
            <Badge key={resource} variant="outline" className="px-2 py-0.5 text-xs">
              {resource}
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
                <p className="mb-1 font-medium">All Resources:</p>
                <ul className="list-disc space-y-1 pl-4">
                  {resources.map(resource => (
                    <li key={resource}>{resource}</li>
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
        <p className="text-gray-500">No scopes found</p>
      </div>
    );
  }

  // Calculate optimal column widths
  const nameColumnWidth = '25%';
  const resourcesColumnWidth = '60%';
  const actionsColumnWidth = '15%';

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead style={{ width: nameColumnWidth }} className="pr-0">
              Name
            </TableHead>
            <TableHead style={{ width: resourcesColumnWidth }} className="pl-2">
              Resources
            </TableHead>
            <TableHead style={{ width: actionsColumnWidth }} className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scopes.map(scope => (
            <TableRow
              key={scope.name}
              className="cursor-pointer hover:bg-gray-50"
              onClick={e => {
                // Prevent row click when clicking on the actions column or when any edit dialog is open
                if (
                  (e.target as HTMLElement).closest('[data-actions-column]') ||
                  isAnyEditDialogOpen
                ) {
                  return;
                }
                handleRowClick(scope);
              }}
            >
              <TableCell className="pr-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{getDisplayName(scope)}</span>
                  {scope.isDefault && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-xs text-blue-800 hover:bg-blue-100"
                    >
                      Default
                    </Badge>
                  )}
                </div>
                <div className="font-mono text-xs text-gray-500">{scope.name}</div>
              </TableCell>
              <TableCell className="pl-2">{formatResources(scope.resources)}</TableCell>
              <TableCell className="text-right" data-actions-column="true">
                <ScopeActions
                  scope={scope}
                  isDefault={scope.isDefault}
                  onEditDialogStateChange={handleEditDialogStateChange}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

import React, { useState } from 'react';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { ScopeActions } from './ScopeActions';
import { ScopeInfoDialog } from './ScopeInfoDialog';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';

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

    // Get application names

    // Show first 2 applications and indicate if there are more
    const visibleApps = resources.slice(0, 2);
    const hasMore = resources.length > 2;

    return (
      <div className="flex items-center">
        <div className="flex max-w-[300px] flex-wrap gap-1">
          {visibleApps.map((appName, index) => (
            <Badge key={index} variant="outline" className="px-2 py-0.5 text-xs">
              {appName}
            </Badge>
          ))}
          {hasMore && (
            <Badge key={'...'} variant="outline" className="px-2 py-0.5 text-xs">
              ...
            </Badge>
          )}
        </div>
      </div>
    );
  };

  const columns: ColumnDef<ExtendedScope>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => {
        const scope = row.original;
        return (
          <>
            <div className="text-sm font-medium text-gray-900">
              {getDisplayName(scope)}
              {scope.isDefault && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-blue-100 text-xs text-blue-800 hover:bg-blue-100"
                >
                  Default
                </Badge>
              )}
            </div>
            <div className="font-mono text-xs text-gray-500">{scope.name}</div>
          </>
        );
      },
      sortingFn: (rowA, rowB) => {
        const nameA = getDisplayName(rowA.original);
        const nameB = getDisplayName(rowB.original);
        return nameA.localeCompare(nameB);
      }
    },
    {
      accessorKey: 'resources',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Resources" />,
      cell: ({ row }) => formatResources(row.original.resources),
      enableSorting: false
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="text-right">
            <ScopeActions
              scope={row.original}
              isDefault={row.original.isDefault}
              onEditDialogStateChange={handleEditDialogStateChange}
            />
          </div>
        );
      }
    }
  ];

  if (scopes.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-gray-500">No scopes found</p>
      </div>
    );
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={scopes}
        searchPlaceholder="Search by scope name or resources..."
        searchFunction={(scope, searchTerm) => {
          const term = searchTerm.toLowerCase();
          const name = (scope.name || '').toLowerCase();
          const displayName = (scope.displayName || '').toLowerCase();

          // Search in resources
          const resourcesMatch = scope.resources.some(resource => resource.includes(term));

          return name.includes(term) || displayName.includes(term) || resourcesMatch;
        }}
        onRowClick={handleRowClick}
        isRowClickDisabled={isAnyEditDialogOpen}
      />

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

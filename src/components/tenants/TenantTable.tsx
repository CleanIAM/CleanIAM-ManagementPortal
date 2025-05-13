import React, { useState } from 'react';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { TenantActions } from './TenantActions';
import { TenantInfoDialog } from './TenantInfoDialog';
import { Badge } from '@/components/public/Badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { LockIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DEFAULT_TENANT_ID } from '@/utils/constants';

interface TenantTableProps {
  tenants: ApiTenantModel[];
}

export const TenantTable: React.FC<TenantTableProps> = ({ tenants }) => {
  // Track if an edit dialog is currently open in any row
  const [isAnyEditDialogOpen, setIsAnyEditDialogOpen] = useState(false);

  // Create a callback function to be passed down to TenantActions
  const handleEditDialogStateChange = (isOpen: boolean) => {
    setIsAnyEditDialogOpen(isOpen);
  };

  // State for managing the selected tenant and dialog visibility
  const [selectedTenant, setSelectedTenant] = useState<ApiTenantModel | null>(null);
  const [isInfoDialogOpen, setInfoIsDialogOpen] = useState(false);

  // Handle row click
  const handleRowClick = (tenant: ApiTenantModel) => {
    setSelectedTenant(tenant);
    setInfoIsDialogOpen(true);
  };

  // Function to check if tenant is the default tenant
  const isDefaultTenant = (tenant: ApiTenantModel) => {
    return tenant.id === DEFAULT_TENANT_ID;
  };

  const columns: ColumnDef<ApiTenantModel>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tenant ID" />,
      cell: ({ row }) => {
        return <div className="font-mono text-sm text-gray-500">{row.original.id}</div>;
      }
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => {
        const tenant = row.original;
        const isDefault = isDefaultTenant(tenant);
        return (
          <div className="flex items-center">
            <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
            {isDefault && (
              <div className="ml-2 flex items-center">
                <Badge className="bg-blue-100 text-blue-800" value="Default" />
              </div>
            )}
          </div>
        );
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const tenant = row.original;
        const isDefault = isDefaultTenant(tenant);

        return (
          <div className="text-right">
            {isDefault ? (
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <div className="flex justify-end">
                      <Button variant="ghost" className="h-8 w-8 cursor-not-allowed p-0 opacity-50">
                        <span className="sr-only">Tenant actions</span>
                        <LockIcon className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Default tenant cannot be modified or deleted</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TenantActions
                tenant={tenant}
                onEditDialogStateChange={handleEditDialogStateChange}
              />
            )}
          </div>
        );
      }
    }
  ];

  if (tenants.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-gray-500">No tenants found</p>
      </div>
    );
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={tenants}
        searchPlaceholder="Search by tenant ID or name..."
        searchFunction={(tenant, searchTerm) => {
          const term = searchTerm.toLowerCase();
          const name = (tenant.name || '').toLowerCase();
          const id = (tenant.id || '').toLowerCase();
          return name.includes(term) || id.includes(term);
        }}
        onRowClick={handleRowClick}
        isRowClickDisabled={isAnyEditDialogOpen}
      />

      {/* Tenant Info Dialog */}
      <TenantInfoDialog
        tenant={selectedTenant}
        isOpen={isInfoDialogOpen}
        onOpenChange={setInfoIsDialogOpen}
      />
    </div>
  );
};

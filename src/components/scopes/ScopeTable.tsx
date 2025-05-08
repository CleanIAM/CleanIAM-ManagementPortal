import React, { useState } from 'react';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScopeActions } from './ScopeActions';
import { ScopeInfoDialog } from './ScopeInfoDialog';

interface ScopeTableProps {
  scopes: Scope[];
}

export const ScopeTable: React.FC<ScopeTableProps> = ({ scopes }) => {
  // Track if an edit dialog is currently open in any row
  const [isAnyEditDialogOpen, setIsAnyEditDialogOpen] = useState(false);

  // Create a callback function to be passed down to ScopeActions
  const handleEditDialogStateChange = (isOpen: boolean) => {
    setIsAnyEditDialogOpen(isOpen);
  };

  // State for managing the selected scope and dialog visibility
  const [selectedScope, setSelectedScope] = useState<Scope | null>(null);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  // Handle row click
  const handleRowClick = (scope: Scope) => {
    setSelectedScope(scope);
    setIsInfoDialogOpen(true);
  };

  if (scopes.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No scopes found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Display Name</TableHead>
            <TableHead className="w-16 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scopes.map(scope => (
            <TableRow 
              key={scope.name}
              className="cursor-pointer hover:bg-gray-50"
              onClick={e => {
                // Prevent row click when clicking on the actions column or when any edit dialog is open
                if ((e.target as HTMLElement).closest('[data-actions-column]') || isAnyEditDialogOpen) {
                  return;
                }
                handleRowClick(scope);
              }}
            >
              <TableCell className="font-medium">{scope.name}</TableCell>
              <TableCell>{scope.displayName}</TableCell>
              <TableCell className="text-right" data-actions-column="true">
                <ScopeActions scope={scope} onEditDialogStateChange={handleEditDialogStateChange} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Scope Info Dialog */}
      <ScopeInfoDialog
        scope={selectedScope}
        isOpen={isInfoDialogOpen}
        onOpenChange={setIsInfoDialogOpen}
      />
    </div>
  );
};

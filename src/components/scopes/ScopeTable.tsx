import React from 'react';
import { Scope } from '@/lib/api/generated/cleanIAM.schemas';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScopeActions } from './ScopeActions';
import { Badge } from '@/components/ui/badge';

interface ScopeTableProps {
  scopes: Scope[];
}

export const ScopeTable: React.FC<ScopeTableProps> = ({ scopes }) => {
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
            <TableHead>Description</TableHead>
            <TableHead>Resources</TableHead>
            <TableHead className="w-16 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scopes.map(scope => (
            <TableRow key={scope.name}>
              <TableCell className="font-medium">{scope.name}</TableCell>
              <TableCell>{scope.displayName}</TableCell>
              <TableCell>{scope.description || '-'}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {scope.resources.length > 0 ? (
                    scope.resources.map(resource => (
                      <Badge key={resource} variant="outline" className="mr-1 mb-1">
                        {resource}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-gray-400">No resources</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <ScopeActions scope={scope} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

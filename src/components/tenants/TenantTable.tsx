import React, { useState } from 'react';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { TenantActions } from './TenantActions';
import { TenantInfoDialog } from './TenantInfoDialog';
import { Badge } from '@/components/public/Badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Pattern for empty GUID (all zeros)
const EMPTY_GUID = '00000000-0000-0000-0000-000000000000';

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
		return tenant.id === EMPTY_GUID;
	};

	if (tenants.length === 0) {
		return (
			<div className="py-8 text-center">
				<p className="mb-4 text-gray-500">No tenants found</p>
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
							Tenant ID
						</th>
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Name
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
					{tenants.map(tenant => (
						<tr
							key={tenant.id}
							className={`cursor-pointer hover:bg-gray-50 ${isDefaultTenant(tenant) ? 'bg-blue-50' : ''}`}
							onClick={e => {
								// Prevent row click when clicking on the actions column or when any edit dialog is open
								if ((e.target as HTMLElement).closest('.actions-column') || isAnyEditDialogOpen) {
									return;
								}
								handleRowClick(tenant);
							}}
						>
							<td className="whitespace-nowrap px-6 py-4">
								<div className="font-mono text-sm text-gray-500">{tenant.id}</div>
							</td>
							<td className="whitespace-nowrap px-6 py-4">
								<div className="flex items-center">
									<div className="text-sm font-medium text-gray-900">{tenant.name}</div>
									{isDefaultTenant(tenant) && (
										<div className="ml-2 flex items-center">
											<Badge className="bg-blue-100 text-blue-800" value="Default" />
										</div>
									)}
								</div>
							</td>
							<td className="actions-column whitespace-nowrap px-6 py-4 text-right">
								{isDefaultTenant(tenant) ? (
									<Tooltip>
										<TooltipTrigger>
											<span className="text-gray-400">Actions disabled</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>Default tenant cannot be modified or deleted</p>
										</TooltipContent>
									</Tooltip>
								) : (
									<TenantActions
										tenant={tenant}
										onEditDialogStateChange={handleEditDialogStateChange}
									/>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{/* Tenant Info Dialog */}
			<TenantInfoDialog
				tenant={selectedTenant}
				isOpen={isInfoDialogOpen}
				onOpenChange={setInfoIsDialogOpen}
			/>
		</div>
	);
};

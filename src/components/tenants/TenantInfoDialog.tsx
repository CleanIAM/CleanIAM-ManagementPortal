import React from 'react';
import { ApiTenantModel } from '@/lib/api/generated/cleanIAM.schemas';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TenantInfoDialogProps {
	tenant: ApiTenantModel | null;
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
}

export const TenantInfoDialog: React.FC<TenantInfoDialogProps> = ({
	tenant,
	isOpen,
	onOpenChange
}) => {
	if (!tenant) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold text-blue-800">{tenant.name}</DialogTitle>
				</DialogHeader>
				<div className="mt-4 space-y-4">
					<div className="grid grid-cols-2 gap-2">
						<div className="font-medium text-gray-700">Tenant ID:</div>
						<div className="text-gray-900">{tenant.id}</div>

						<div className="font-medium text-gray-700">Name:</div>
						<div className="text-gray-900">{tenant.name}</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

import React, { useState } from 'react';
import { Toggle } from './Toggle';
import { MfaConfigDialog } from './mfa/MfaConfigDialog';
import { Button } from '@/components/ui/button';

interface ProfileSecuritySettingsProps {
	isMFAEnabled: boolean;
	isMFAConfigured: boolean;
	onMfaToggle: (enabled: boolean) => void;
	isMfaUpdating: boolean;
	onMfaConfigured: () => void;
}

export const ProfileSecuritySettings: React.FC<ProfileSecuritySettingsProps> = ({
	isMFAEnabled,
	isMFAConfigured,
	onMfaToggle,
	isMfaUpdating,
	onMfaConfigured
}) => {
	const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
	return (
		<div className="border-t border-gray-200 bg-gray-50 p-6">
			<h3 className="mb-4 text-lg font-semibold text-gray-800">Security Settings</h3>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium text-gray-800">Two-Factor Authentication</p>
						<p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
						{!isMFAConfigured && (
							<p className="mt-1 text-xs text-amber-600">
								You need to configure MFA before you can enable it
							</p>
						)}
					</div>
					<div className="flex items-center space-x-4">
						{!isMFAConfigured && (
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsConfigDialogOpen(true)}
								disabled={isMfaUpdating}
							>
								Configure
							</Button>
						)}
						<Toggle
							isChecked={isMFAEnabled}
							onChange={onMfaToggle}
							disabled={isMfaUpdating || !isMFAConfigured}
							id="mfa-toggle"
						/>
					</div>
				</div>
			</div>
			{/* MFA Configuration Dialog */}
			<MfaConfigDialog
				isOpen={isConfigDialogOpen}
				onClose={() => setIsConfigDialogOpen(false)}
				onConfigured={onMfaConfigured}
			/>
		</div>
	);
};

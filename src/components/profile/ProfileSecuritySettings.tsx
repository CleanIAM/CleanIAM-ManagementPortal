import React from 'react';
import { Toggle } from './Toggle';

interface ProfileSecuritySettingsProps {
	isMFAEnabled: boolean;
	onMfaToggle: (enabled: boolean) => void;
	isMfaUpdating: boolean;
}

export const ProfileSecuritySettings: React.FC<ProfileSecuritySettingsProps> = ({
	isMFAEnabled,
	onMfaToggle,
	isMfaUpdating
}) => {
	return (
		<div className="border-t border-gray-200 bg-gray-50 p-6">
			<h3 className="mb-4 text-lg font-semibold text-gray-800">Security Settings</h3>

			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="font-medium text-gray-800">Two-Factor Authentication</p>
						<p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
					</div>
					<Toggle
						isChecked={isMFAEnabled}
						onChange={onMfaToggle}
						disabled={isMfaUpdating}
						id="mfa-toggle"
					/>
				</div>
			</div>
		</div>
	);
};

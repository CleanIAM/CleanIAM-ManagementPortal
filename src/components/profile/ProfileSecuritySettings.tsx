import React, { useState } from 'react';
import { MfaSwitch } from './mfa/MfaSwitch';
import { MfaConfigDialog } from './mfa/MfaConfigDialog';
import { MfaResetConfirmDialog } from './mfa/MfaResetConfirmDialog';
import { MfaToggleConfirmDialog } from './mfa/MfaToggleConfirmDialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ProfileSecuritySettingsProps {
	isMFAEnabled: boolean;
	isMFAConfigured: boolean;
	onMfaToggle: (enabled: boolean) => void;
	isMfaUpdating: boolean;
	onMfaConfigured: () => void;
	onMfaReset: () => void;
	isMfaResetting: boolean;
}

export const ProfileSecuritySettings: React.FC<ProfileSecuritySettingsProps> = ({
	isMFAEnabled,
	isMFAConfigured,
	onMfaToggle,
	isMfaUpdating,
	onMfaConfigured,
	onMfaReset,
	isMfaResetting
}) => {
	const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const [isToggleDialogOpen, setIsToggleDialogOpen] = useState(false);
	const [pendingToggleState, setPendingToggleState] = useState(false);

	// Handle MFA toggle request
	const handleToggleRequest = (enable: boolean) => {
		// Only prompt for confirmation if MFA is configured
		if (isMFAConfigured) {
			setPendingToggleState(enable);
			setIsToggleDialogOpen(true);
		}
	};

	// Confirm MFA toggle
	const confirmToggle = () => {
		onMfaToggle(pendingToggleState);
		setIsToggleDialogOpen(false);
	};

	// Cancel MFA toggle
	const cancelToggle = () => {
		setIsToggleDialogOpen(false);
	};
	
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
							<Tooltip>
								<TooltipTrigger asChild>
									<div>
										{/* Wrapper div needed for disabled button in tooltip */}
										<Button
											variant="outline"
											size="sm"
											onClick={() => setIsConfigDialogOpen(true)}
											disabled={isMfaUpdating || isMfaResetting}
										>
											Configure
										</Button>
									</div>
								</TooltipTrigger>
								{(isMfaUpdating || isMfaResetting) && (
									<TooltipContent side="bottom">
										{isMfaUpdating
											? 'MFA settings are being updated...'
											: 'MFA configuration is being reset...'}
									</TooltipContent>
								)}
							</Tooltip>
						)}
						{isMFAConfigured && (
							<Tooltip>
								<TooltipTrigger asChild>
									<div>
										{/* Wrapper div needed for disabled button in tooltip */}
										<Button
											variant="outline"
											size="sm"
											onClick={() => setIsResetDialogOpen(true)}
											disabled={isMfaUpdating || isMfaResetting}
										>
											Reset MFA
										</Button>
									</div>
								</TooltipTrigger>
								{(isMfaUpdating || isMfaResetting) && (
									<TooltipContent side="bottom">
										{isMfaUpdating
											? 'MFA settings are being updated...'
											: 'MFA configuration is being reset...'}
									</TooltipContent>
								)}
							</Tooltip>
						)}
						<MfaSwitch
						checked={isMFAEnabled}
						onCheckedChange={handleToggleRequest}
						disabled={isMfaResetting || !isMFAConfigured}
						loading={isMfaUpdating}
						id="mfa-toggle"
						tooltip={
						!isMFAConfigured
						? 'You need to configure MFA before you can enable it'
						: isMfaUpdating
						? 'MFA settings are being updated...'
						: isMfaResetting
						? 'MFA configuration is being reset...'
						: undefined
						}
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

			{/* MFA Reset Confirmation Dialog */}
			<MfaResetConfirmDialog
				isOpen={isResetDialogOpen}
				onClose={() => setIsResetDialogOpen(false)}
				onConfirm={() => {
					onMfaReset();
					setIsResetDialogOpen(false);
				}}
				isDeleting={isMfaResetting}
			/>

			{/* MFA Toggle Confirmation Dialog */}
			<MfaToggleConfirmDialog
				isOpen={isToggleDialogOpen}
				onClose={cancelToggle}
				onConfirm={confirmToggle}
				isUpdating={isMfaUpdating}
				isEnabling={pendingToggleState}
			/>
		</div>
	);
};

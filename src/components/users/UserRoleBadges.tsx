import React from 'react';
import { UserRole } from '@/lib/api/generated/cleanIAM.schemas';

interface UserRoleBadgesProps {
	roles: UserRole[];
}

export const UserRoleBadges: React.FC<UserRoleBadgesProps> = ({ roles }) => {
	// Role name mapping helper
	const getRoleName = (role: UserRole) => {
		const roleMap: Record<UserRole, string> = {
			[UserRole.Admin]: UserRole.Admin,
			[UserRole.User]: UserRole.User,
			[UserRole.SuperAdmin]: UserRole.SuperAdmin
		};
		return roleMap[role] || 'Unknown';
	};

	return (
		<div className="flex flex-wrap gap-1">
			{roles.map(role => (
				<span key={role} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
					{getRoleName(role)}
				</span>
			))}
		</div>
	);
};

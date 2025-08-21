import React from 'react';
import { UserRole } from '@/lib/api/generated/cleanIAM.schemas';
import { Badge } from '../public/Badge';

interface UserRoleBadgesProps {
  roles: UserRole[];
}

export const UserRoleBadges: React.FC<UserRoleBadgesProps> = ({ roles }) => {
  // Role name mapping helper
  const getRoleName = (role: UserRole) => {
    const roleMap: Record<UserRole, string> = {
      [UserRole.Broker]: UserRole.Broker,
      [UserRole.Client]: UserRole.Client,
      [UserRole.Administrator]: UserRole.Administrator
    };
    return roleMap[role] || 'Unknown';
  };

  return (
    <div className="flex flex-wrap gap-1">
      {roles.map(role => (
        <Badge key={role} className="bg-blue-100 text-blue-800" value={getRoleName(role)} />
      ))}
    </div>
  );
};

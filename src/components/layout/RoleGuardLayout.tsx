import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRoles } from '@/lib/hooks/useRoles';
import { UserRole } from '@/lib/api/generated/cleanIAM.schemas';
import { NoAccess } from '../public/NoAccess';

interface RoleGuardLayoutProps {
  allowedRoles: UserRole[];
  redirectTo?: string;
  showNoAccess?: boolean;
  noAccessTitle?: string;
  noAccessMessage?: string;
}

/**
 * A layout component for protecting routes with role-based access control.
 * If user doesn't have required roles, it either redirects or shows a no access message.
 */
export const RoleGuardLayout: React.FC<RoleGuardLayoutProps> = ({
  allowedRoles,
  redirectTo = '/home',
  showNoAccess = true,
  noAccessTitle,
  noAccessMessage
}) => {
  const userRoles = useRoles();
  const location = useLocation();

  // Check if the user has at least one of the allowed roles
  const hasAccess = userRoles.some(role => allowedRoles.includes(role));

  if (!hasAccess) {
    // If showNoAccess is true, show the NoAccess component
    if (showNoAccess) {
      return (
        <NoAccess
          title={noAccessTitle || 'Access Restricted'}
          message={noAccessMessage || "You don't have permission to access this resource."}
        />
      );
    }

    // Otherwise, redirect to the specified route
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If the user has access, render the child routes
  return <Outlet />;
};

// Export commonly used role group constants
export const ADMIN_ROLES = [UserRole.Admin, UserRole.MasterAdmin];
export const MASTER_ADMIN_ONLY = [UserRole.MasterAdmin];

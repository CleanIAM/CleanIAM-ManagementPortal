import React, { useState } from 'react';
import {
  useDeleteApiUsersId,
  useGetApiUsers,
  usePostApiUsersIdInvitationEmail,
  usePutApiUsersIdDisabled,
  usePutApiUsersIdEnabled,
  useDeleteApiUsersIdMfaEnabled
} from '@/lib/api/generated/users-api/users-api';
import { toast } from 'react-toastify';
import { ApiUserModel, UserRole } from '@/lib/api/generated/cleanIAM.schemas';
import { Loader } from '../public/Loader';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Settings, Send, Power, Trash2, Edit, ShieldOff, Building } from 'lucide-react';
import { useRoles } from '@/lib/hooks/useRoles';
import { UserEditDialog } from './UserEditDialogue';
import { ResetMfaConfirmDialog } from './ResetMfaConfirmDialog';
import { DeleteUserConfirmDialog } from './DeleteUserConfirmDialog';
import { AssignTenantDialog } from './AssignTenantDialog';

interface UserActionsProps {
  user: ApiUserModel;
  onEditDialogStateChange?: (isOpen: boolean) => void;
  onAssignDialogStateChange?: (isOpen: boolean) => void;
  tenant?: string;
  onUserUpdated?: () => void;
}

export const UserActions: React.FC<UserActionsProps> = ({
  user,
  onEditDialogStateChange,
  onAssignDialogStateChange,
  tenant,
  onUserUpdated
}) => {
  // State for dialogs
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResetMfaDialogOpen, setIsResetMfaDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignTenantDialogOpen, setIsAssignTenantDialogOpen] = useState(false);
  
  // Get user roles to determine if user is a master admin
  const userRoles = useRoles();
  const isMasterAdmin = userRoles.includes(UserRole.MasterAdmin);

  // Update parent component when edit dialog state changes
  const handleEditDialogOpen = (isOpen: boolean) => {
    setIsEditDialogOpen(isOpen);
    if (onEditDialogStateChange) {
      onEditDialogStateChange(isOpen);
    }
  };
  
  // Update parent component when assign tenant dialog state changes
  const handleAssignDialogOpen = (isOpen: boolean) => {
    setIsAssignTenantDialogOpen(isOpen);
    if (onAssignDialogStateChange) {
      onAssignDialogStateChange(isOpen);
    }
  };
  
  const { refetch } = useGetApiUsers(tenant ? { tenant } : undefined);

  // Disable user mutation
  const disableUserMutation = usePutApiUsersIdDisabled({
    mutation: {
      onSuccess: () => {
        toast.success('User disabled successfully');
        refetch();
        if (onUserUpdated) onUserUpdated();
      },
      onError: error => {
        toast.error(`Failed to disable user: ${error.message}`);
      }
    }
  });

  // Enable user mutation
  const enableUserMutation = usePutApiUsersIdEnabled({
    mutation: {
      onSuccess: () => {
        toast.success('User enabled successfully');
        refetch();
        if (onUserUpdated) onUserUpdated();
      },
      onError: error => {
        toast.error(`Failed to enable user: ${error.message}`);
      }
    }
  });

  // Delete user mutation
  const deleteUserMutation = useDeleteApiUsersId({
    mutation: {
      onSuccess: () => {
        toast.success('User deleted successfully');
        refetch();
        if (onUserUpdated) onUserUpdated();
      },
      onError: error => {
        toast.error(`Failed to delete user: ${error.message}`);
      }
    }
  });

  // Resend invitation mutation
  const resendInvitationMutation = usePostApiUsersIdInvitationEmail({
    mutation: {
      onSuccess: () => {
        toast.success('Invitation resent successfully');
        refetch();
        if (onUserUpdated) onUserUpdated();
      },
      onError: error => {
        toast.error(`Failed to resend invitation: ${error.message}`);
      }
    }
  });

  // Reset MFA mutation
  const resetMfaMutation = useDeleteApiUsersIdMfaEnabled({
    mutation: {
      onSuccess: () => {
        toast.success(`MFA disabled for ${user.firstName} ${user.lastName}`);
        refetch();
        if (onUserUpdated) onUserUpdated();
      },
      onError: error => {
        toast.error(`Failed to disable MFA: ${error.message}`);
      }
    }
  });

  // Handle delete user
  const handleDeleteUser = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDeleteDialogOpen(true);
  };

  // Handle confirm delete user
  const handleConfirmDeleteUser = () => {
    deleteUserMutation.mutate({ id: user.id, params: tenant ? { tenant } : undefined });
    setIsDeleteDialogOpen(false);
  };

  // Handle resend invitation
  const handleResendInvitation = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    resendInvitationMutation.mutate({ id: user.id, params: tenant ? { tenant } : undefined });
  };

  // Handle toggle user status (enable/disable)
  const handleToggleUserStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (user.isDisabled) {
      enableUserMutation.mutate({ id: user.id, params: tenant ? { tenant } : undefined });
    } else {
      disableUserMutation.mutate({ id: user.id, params: tenant ? { tenant } : undefined });
    }
  };

  // Handle reset MFA
  const handleResetMfa = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResetMfaDialogOpen(true);
  };

  // Handle confirm reset MFA
  const handleConfirmResetMfa = () => {
    resetMfaMutation.mutate({ id: user.id, params: tenant ? { tenant } : undefined });
    setIsResetMfaDialogOpen(false);
  };

  // Handle assign tenant dialog
  const handleAssignTenant = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    handleAssignDialogOpen(true);
  };

  // Handle after successful tenant assignment
  const handleTenantAssignSuccess = () => {
    refetch();
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">User actions</span>
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          {user.isInvitePending && (
            <>
              <DropdownMenuItem
                onClick={handleResendInvitation}
                disabled={resendInvitationMutation.isPending}
              >
                {resendInvitationMutation.isPending ? (
                  <Loader className="mr-2 h-4 w-4" />
                ) : (
                  <Send className="mr-2 h-4 w-4" strokeWidth={2} />
                )}
                <span>Resend Invitation</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={handleToggleUserStatus}
            disabled={disableUserMutation.isPending || enableUserMutation.isPending}
          >
            {disableUserMutation.isPending || enableUserMutation.isPending ? (
              <Loader className="mr-2 h-4 w-4" />
            ) : (
              <Power className="mr-2 h-4 w-4" strokeWidth={2} />
            )}
            <span>{user.isDisabled ? 'Enable' : 'Disable'}</span>
          </DropdownMenuItem>
          {user.isMFAEnabled && (
            <DropdownMenuItem onClick={handleResetMfa} disabled={resetMfaMutation.isPending}>
              {resetMfaMutation.isPending ? (
                <Loader className="mr-2 h-4 w-4" />
              ) : (
                <ShieldOff className="mr-2 h-4 w-4" strokeWidth={2} />
              )}
              <span>Reset MFA</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleEditDialogOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" strokeWidth={2} />
            <span>Edit User</span>
          </DropdownMenuItem>
          
          {isMasterAdmin && (
            <DropdownMenuItem onClick={handleAssignTenant}>
              <Building className="mr-2 h-4 w-4" strokeWidth={2} />
              <span>Assign to Tenant</span>
            </DropdownMenuItem>
          )}
          
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDeleteUser}
            disabled={deleteUserMutation.isPending}
            className="text-red-600 focus:text-red-600"
          >
            {deleteUserMutation.isPending ? (
              <Loader className="mr-2 h-4 w-4" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" strokeWidth={2} />
            )}
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit User Dialog */}
      <UserEditDialog 
        user={user} 
        isOpen={isEditDialogOpen} 
        onOpenChange={handleEditDialogOpen} 
        onUserUpdated={onUserUpdated}
        tenant={tenant}
      />

      {/* Reset MFA Confirmation Dialog */}
      <ResetMfaConfirmDialog
        isOpen={isResetMfaDialogOpen}
        onClose={() => setIsResetMfaDialogOpen(false)}
        onConfirm={handleConfirmResetMfa}
        isResetting={resetMfaMutation.isPending}
        userName={`${user.firstName} ${user.lastName}`}
      />

      {/* Delete User Confirmation Dialog */}
      <DeleteUserConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDeleteUser}
        isDeleting={deleteUserMutation.isPending}
        userName={`${user.firstName} ${user.lastName}`}
      />
      
      {/* Assign Tenant Dialog */}
      {isMasterAdmin && (
        <AssignTenantDialog
          user={user}
          isOpen={isAssignTenantDialogOpen}
          onOpenChange={handleAssignDialogOpen}
          onSuccess={handleTenantAssignSuccess}
        />
      )}
    </>
  );
};

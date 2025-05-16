import { useState } from 'react';
import {
  useGetApiUser,
  usePutApiUser,
  usePutApiUserMfaEnabled,
  useDeleteApiUserMfaConfiguration
} from '../lib/api/generated/user-api-endpoint/user-api-endpoint';
import { usePostApiUsersIdInvitationEmail } from '../lib/api/generated/users-api/users-api';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileInformation } from '@/components/profile/ProfileInformation';
import { ProfileSecuritySettings } from '@/components/profile/ProfileSecuritySettings';
import { ProfileFormValues } from '@/components/profile/profileSchema';
import { toast } from 'react-toastify';
import { FormButton } from '@/components/form';
import { Loader } from '@/components/public/Loader';
import { EnableMfaRequest } from '@/lib/api/generated/cleanIAM.schemas';

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Fetch current user data
  const { data: user, isLoading, isError, error, refetch } = useGetApiUser();

  // Setup mutations
  const updateUserMutation = usePutApiUser({
    mutation: {
      onSuccess: () => {
        refetch();
        setIsEditing(false);
        toast.success('Profile updated successfully');
      },
      onError: error => {
        toast.error(`Failed to update profile: ${error.message || 'Unknown error'}`);
      }
    }
  });

  const updateMfaMutation = usePutApiUserMfaEnabled({
    mutation: {
      onSuccess: response => {
        refetch();
        toast.success(
          `Two-factor authentication ${response.data.mfaEnabled ? 'enabled' : 'disabled'}`
        );
      },
      onError: error => {
        toast.error(
          <p>
            Failed to update MFA settings: <br /> {error.message || 'Unknown error'}
          </p>
        );
      }
    }
  });

  // Setup mutations for MFA reset
  const resetMfaMutation = useDeleteApiUserMfaConfiguration({
    mutation: {
      onSuccess: () => {
        refetch();
        toast.success('MFA configuration has been reset');
      },
      onError: error => {
        toast.error(
          <p>
            Failed to reset MFA configuration: <br /> {error.message || 'Unknown error'}
          </p>
        );
      }
    }
  });

  // Setup mutations for invitation email resend
  const resendInvitationMutation = usePostApiUsersIdInvitationEmail({
    mutation: {
      onSuccess: () => {
        refetch();
        toast.success('Invitation email has been resent');
      },
      onError: error => {
        toast.error(
          <p>
            Failed to resend invitation email: <br /> {error.message || 'Unknown error'}
          </p>
        );
      }
    }
  });

  // Handle form submission from React Hook Form
  const handleSubmit = (data: ProfileFormValues) => {
    updateUserMutation.mutate({
      data: {
        firstName: data.firstName,
        lastName: data.lastName
      }
    });
  };

  // Handle MFA toggle
  const handleMfaToggle = (enable: boolean) => {
    // Only allow toggling if MFA is configured
    if (!user?.data.isMFAConfigured && enable) {
      toast.error('Please configure MFA before enabling it.');
      return;
    }

    const mfaRequest: EnableMfaRequest = { enable };
    updateMfaMutation.mutate({
      data: mfaRequest
    });
  };

  // Handle MFA configuration completed
  const handleMfaConfigured = () => {
    refetch();
  };

  // Handle MFA reset
  const handleMfaReset = () => {
    resetMfaMutation.mutate({});
  };

  // Handle edit toggle
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  // Handle resend invitation
  const handleResendInvitation = () => {
    if (user?.data.id) {
      resendInvitationMutation.mutate({ id: user.data.id });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-purple-800">User Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      {/* Loading state */}
      {isLoading ? (
        <div className="my-20 flex h-full w-full items-center justify-center">
          <Loader className="h-16 w-16" />
        </div>
      ) : isError ? (
        <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          <p>Error loading user: {error instanceof Error ? error.message : 'Unknown error'}</p>
          <FormButton onClick={() => refetch()} variant="danger" className="mt-2">
            Try Again
          </FormButton>
        </div>
      ) : (
        <>
          <ProfileHeader user={user!.data} isEditing={isEditing} onEditToggle={handleEditToggle} />

          <ProfileInformation
            user={user!.data}
            isEditing={isEditing}
            onSubmit={handleSubmit}
            isSubmitting={updateUserMutation.isPending}
            onResendInvitation={user!.data.isInvitePending ? handleResendInvitation : undefined}
            isResendingInvitation={resendInvitationMutation.isPending}
          />

          <ProfileSecuritySettings
            isMFAEnabled={user!.data.isMFAEnabled}
            isMFAConfigured={user!.data.isMFAConfigured}
            onMfaToggle={handleMfaToggle}
            isMfaUpdating={updateMfaMutation.isPending}
            onMfaConfigured={handleMfaConfigured}
            onMfaReset={handleMfaReset}
            isMfaResetting={resetMfaMutation.isPending}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePage;

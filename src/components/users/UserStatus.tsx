import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';
import { Badge } from '../public/Badge';

interface UserStatusProps {
  user: ApiUserModel;
}

export const UserStatus = ({ user }: UserStatusProps) => {
  if (user.isDisabled) {
    return <Badge className="bg-gray-100 text-gray-800" value="Disabled" />;
  }

  if (user.isInvitePending) {
    return <Badge className="bg-yellow-100 text-yellow-800" value="Pending Invite" />;
  }

  if (!user.emailVerified) {
    return <Badge className="bg-red-100 text-red-800" value="Unverified Email" />;
  }

  return <Badge className="bg-green-100 text-green-800" value="Active" />;
};

import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';

interface UserStatusProps {
	user: ApiUserModel;
}

export const UserStatus = ({ user }: UserStatusProps) => {
	// if(user.inInvitation){
	//   return (
	//   	<span className="rounded-full bg-red-100 px-2 py-1 text-xs text-neutral-600">Invited</span>
	//   );
	// }

	if (!user.emailVerified) {
		return (
			<span className="rounded-full bg-red-100 px-2 py-1 text-xs text-orange-800">
				Unverified Email
			</span>
		);
	}

	if (user.isDisabled) {
		return <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">Inactive</span>;
	}

	return <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Active</span>;
};

import React from 'react';
import { ApiUserModel } from '@/lib/api/generated/cleanIAM.schemas';

interface ProfileHeaderProps {
	user: ApiUserModel;
	isEditing: boolean;
	onEditToggle: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isEditing, onEditToggle }) => {
	// Get initials for avatar
	const getInitials = () => {
		return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
	};

	// Get role display name
	const getRoleDisplay = () => {
		return user.roles.join(', ');
		return 'User';
	};

	return (
		<>
			<div className="flex items-center justify-between border-b border-purple-100 bg-purple-50 p-6">
				<div className="flex items-center space-x-4">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-200">
						<span className="text-2xl font-bold text-purple-700">{getInitials()}</span>
					</div>
					<div>
						<h2 className="text-xl font-semibold text-gray-800">{`${user.firstName} ${user.lastName}`}</h2>
						<p className="text-gray-500">{getRoleDisplay()}</p>
					</div>
				</div>
				<button
					onClick={onEditToggle}
					className="rounded bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
				>
					{isEditing ? 'Cancel' : 'Edit Profile'}
				</button>
			</div>
		</>
	);
};

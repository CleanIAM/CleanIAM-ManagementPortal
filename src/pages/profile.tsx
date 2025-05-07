import { useState } from 'react';
import {
	useGetApiUser,
	usePutApiUser,
	usePutApiUserMfaEnabled
} from '../lib/api/generated/user-api-endpoint/user-api-endpoint';
import { UpdateMfaRequest, UpdateUserSimpleRequest } from '../lib/api/generated/cleanIAM.schemas';

export const ProfilePage = () => {
	const [isEditing, setIsEditing] = useState(false);

	// Fetch current user data
	const { data: user, isLoading, error, refetch } = useGetApiUser();

	// Setup mutations
	const updateUserMutation = usePutApiUser({
		mutation: {
			onSuccess: () => {
				refetch();
				setIsEditing(false);
			}
		}
	});

	const updateMfaMutation = usePutApiUserMfaEnabled({
		mutation: {
			onSuccess: () => {
				refetch();
			}
		}
	});

	// Form state
	const [formData, setFormData] = useState<UpdateUserSimpleRequest>({
		firstName: '',
		lastName: ''
	});

	// Update form data when user data is loaded
	useState(() => {
		if (user) {
			setFormData({
				firstName: user.data.firstName,
				lastName: user.data.lastName
			});
		}
	});

	// Handle form input changes
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	// Handle form submission
	const handleSubmit = () => {
		updateUserMutation.mutate({
			data: formData
		});
	};

	// Handle MFA toggle
	const handleMfaToggle = (enabled: boolean) => {
		const mfaRequest: UpdateMfaRequest = { enabled };
		updateMfaMutation.mutate({
			data: mfaRequest
		});
	};

	// Loading state
	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-purple-700"></div>
			</div>
		);
	}

	// Error state
	if (error || !user) {
		return (
			<div className="mx-auto max-w-4xl px-4 py-8">
				<div className="rounded border border-red-400 bg-red-100 p-4 text-red-700">
					<p>Error loading profile data. Please try again later.</p>
				</div>
			</div>
		);
	}

	// Get initials for avatar
	const getInitials = () => {
		return `${user.data.firstName.charAt(0)}${user.data.lastName.charAt(0)}`;
	};

	// Get role display name
	const getRoleDisplay = () => {
		if (user.data.roles.includes('SuperAdmin')) return 'Super Admin';
		if (user.data.roles.includes('Admin')) return 'Administrator';
		return 'User';
	};

	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<h1 className="mb-2 text-3xl font-bold text-purple-800">User Profile</h1>
				<p className="text-gray-600">Manage your account settings and preferences</p>
			</div>

			<div className="overflow-hidden rounded-lg bg-white shadow-md">
				<div className="flex items-center justify-between border-b border-purple-100 bg-purple-50 p-6">
					<div className="flex items-center space-x-4">
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-200">
							<span className="text-2xl font-bold text-purple-700">{getInitials()}</span>
						</div>
						<div>
							<h2 className="text-xl font-semibold text-gray-800">{`${user.data.firstName} ${user.data.lastName}`}</h2>
							<p className="text-gray-500">{getRoleDisplay()}</p>
						</div>
					</div>
					<button
						onClick={() => setIsEditing(!isEditing)}
						className="rounded bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
					>
						{isEditing ? 'Cancel' : 'Edit Profile'}
					</button>
				</div>

				<div className="p-6">
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div className="space-y-4">
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">
									Email Address
								</label>
								<p className="text-gray-800">{user.data.email}</p>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">First Name</label>
								{isEditing ? (
									<input
										type="text"
										name="firstName"
										className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
										value={formData.firstName}
										onChange={handleInputChange}
									/>
								) : (
									<p className="text-gray-800">{user.data.firstName}</p>
								)}
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label>
								{isEditing ? (
									<input
										type="text"
										name="lastName"
										className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
										value={formData.lastName}
										onChange={handleInputChange}
									/>
								) : (
									<p className="text-gray-800">{user.data.lastName}</p>
								)}
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
								<p className="text-gray-800">{getRoleDisplay()}</p>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Email Status</label>
								<p className="text-gray-800">
									{user.data.emailVerified ? (
										<span className="text-green-600">Verified</span>
									) : (
										<span className="text-yellow-600">Not Verified</span>
									)}
								</p>
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">
									Account Status
								</label>
								<p className="text-gray-800">
									{user.data.isDisabled ? (
										<span className="text-red-600">Disabled</span>
									) : (
										<span className="text-green-600">Active</span>
									)}
								</p>
							</div>
						</div>
					</div>

					{isEditing && (
						<div className="mt-6 flex justify-end">
							<button
								onClick={handleSubmit}
								disabled={updateUserMutation.isPending}
								className="rounded bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700 disabled:bg-purple-400"
							>
								{updateUserMutation.isPending ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
					)}
				</div>

				<div className="border-t border-gray-200 bg-gray-50 p-6">
					<h3 className="mb-4 text-lg font-semibold text-gray-800">Security Settings</h3>

					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-800">Two-Factor Authentication</p>
								<p className="text-sm text-gray-500">
									Add an extra layer of security to your account
								</p>
							</div>
							<div className="relative inline-block h-6 w-12">
								<input
									type="checkbox"
									id="toggle"
									className="sr-only"
									checked={user.data.isMFAEnabled}
									onChange={e => handleMfaToggle(e.target.checked)}
									disabled={updateMfaMutation.isPending}
								/>
								<label
									htmlFor="toggle"
									className={`block h-6 w-12 cursor-pointer rounded-full transition-colors ${
										user.data.isMFAEnabled ? 'bg-green-500' : 'bg-gray-300'
									}`}
								></label>
								<span
									className={`absolute left-1 top-1 h-4 w-4 transform rounded-full bg-white transition-transform ${
										user.data.isMFAEnabled ? 'translate-x-6' : ''
									}`}
								></span>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium text-gray-800">Session Timeout</p>
								<p className="text-sm text-gray-500">
									Automatically log out after period of inactivity
								</p>
							</div>
							<select className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
								<option>30 minutes</option>
								<option>1 hour</option>
								<option>4 hours</option>
								<option>8 hours</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;

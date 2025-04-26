import { useState } from 'react';

export const ProfilePage = () => {
	const [isEditing, setIsEditing] = useState(false);

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
							<span className="text-2xl font-bold text-purple-700">JD</span>
						</div>
						<div>
							<h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
							<p className="text-gray-500">Administrator</p>
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
								{isEditing ? (
									<input
										type="email"
										className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
										defaultValue="john.doe@example.com"
									/>
								) : (
									<p className="text-gray-800">john.doe@example.com</p>
								)}
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
								{isEditing ? (
									<input
										type="text"
										className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
										defaultValue="johndoe"
									/>
								) : (
									<p className="text-gray-800">johndoe</p>
								)}
							</div>
						</div>

						<div className="space-y-4">
							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Role</label>
								{isEditing ? (
									<select className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
										<option>Administrator</option>
										<option>Manager</option>
										<option>User</option>
									</select>
								) : (
									<p className="text-gray-800">Administrator</p>
								)}
							</div>

							<div>
								<label className="mb-1 block text-sm font-medium text-gray-700">Last Login</label>
								<p className="text-gray-800">April 26, 2025, 10:30 AM</p>
							</div>
						</div>
					</div>

					{isEditing && (
						<div className="mt-6 flex justify-end">
							<button
								onClick={() => setIsEditing(false)}
								className="rounded bg-purple-600 px-4 py-2 font-medium text-white transition-colors hover:bg-purple-700"
							>
								Save Changes
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
								<input type="checkbox" id="toggle" className="sr-only" defaultChecked />
								<label
									htmlFor="toggle"
									className="block h-6 w-12 cursor-pointer rounded-full bg-green-500 transition-colors"
								></label>
								<span className="absolute left-1 top-1 h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
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

import { useState } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">User Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-700">JD</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    defaultValue="john.doe@example.com"
                  />
                ) : (
                  <p className="text-gray-800">john.doe@example.com</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    defaultValue="johndoe"
                  />
                ) : (
                  <p className="text-gray-800">johndoe</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                {isEditing ? (
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>Administrator</option>
                    <option>Manager</option>
                    <option>User</option>
                  </select>
                ) : (
                  <p className="text-gray-800">Administrator</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Login</label>
                <p className="text-gray-800">April 26, 2025, 10:30 AM</p>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-medium">Two-Factor Authentication</p>
                <p className="text-gray-500 text-sm">Add an extra layer of security to your account</p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  id="toggle"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="toggle"
                  className="block bg-green-500 w-12 h-6 rounded-full cursor-pointer transition-colors"
                ></label>
                <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-6"></span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 font-medium">Session Timeout</p>
                <p className="text-gray-500 text-sm">Automatically log out after period of inactivity</p>
              </div>
              <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
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
}

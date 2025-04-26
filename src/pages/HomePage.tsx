import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Welcome to CleanIAM</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-gray-700 mb-4">
          This is the dashboard for managing your IAM applications and users.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Applications</h2>
            <p className="text-gray-600 mb-4">
              Manage your OpenID Connect applications, clients, and configurations.
            </p>
            <Link
              to="/applications"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              View Applications
            </Link>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
            <h2 className="text-xl font-semibold text-purple-800 mb-3">User Management</h2>
            <p className="text-gray-600 mb-4">
              Manage user accounts, permissions, and authentication settings.
            </p>
            <Link
              to="/profile"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">API Status</h2>
        <Link
          to="/test"
          className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Check API Status
        </Link>
      </div>
    </div>
  );
}

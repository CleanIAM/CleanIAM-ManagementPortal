import { Test } from '../Components/test';

export default function ApplicationsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-2">Applications</h1>
        <p className="text-gray-600">Manage your OpenID Connect applications</p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Authentication Service</h3>
            <p className="text-gray-600 text-sm">Main authentication provider</p>
            <div className="mt-3 text-xs inline-block px-2 py-1 bg-green-100 text-green-800 rounded">Active</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Customer Portal</h3>
            <p className="text-gray-600 text-sm">Client application for customers</p>
            <div className="mt-3 text-xs inline-block px-2 py-1 bg-green-100 text-green-800 rounded">Active</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Admin Dashboard</h3>
            <p className="text-gray-600 text-sm">Administrative interface</p>
            <div className="mt-3 text-xs inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Maintenance</div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Mobile App</h3>
            <p className="text-gray-600 text-sm">iOS and Android client</p>
            <div className="mt-3 text-xs inline-block px-2 py-1 bg-green-100 text-green-800 rounded">Active</div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
            Add Application
          </button>
        </div>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">API Test</h2>
        <Test />
      </div>
    </div>
  );
}

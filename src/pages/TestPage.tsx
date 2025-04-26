import { Test } from '../Components/test';

export default function TestPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">API Test</h1>
        <p className="text-gray-600">Check if the API is working correctly</p>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Test Endpoint Status</h2>
          <p className="text-gray-600 mb-4">
            This page tests the connection to the backend API by calling the test endpoint.
            It will show if the API is accessible and responding correctly.
          </p>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <Test />
        </div>
      </div>
    </div>
  );
}

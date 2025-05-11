import { NoAccess } from '@/components/public/NoAccess';

/**
 * Preview page to showcase various styles of the NoAccess component.
 * This is a development-only page to easily visualize the component.
 */
export const AccessDeniedPreviewPage = () => {
  return (
    <div className="p-4">
      <h1 className="mb-8 text-2xl font-bold">Access Denied Component Previews</h1>

      <div className="space-y-12">
        {/* Default variant */}
        <div className="rounded-lg border border-gray-200">
          <h2 className="border-b border-gray-200 bg-gray-50 p-4 font-medium">Default</h2>
          <div className="p-4">
            <NoAccess />
          </div>
        </div>

        {/* Tenant access variant */}
        <div className="rounded-lg border border-gray-200">
          <h2 className="border-b border-gray-200 bg-gray-50 p-4 font-medium">
            Tenant Access (Master Admin)
          </h2>
          <div className="p-4">
            <NoAccess
              title="Master Admin Access Only"
              message="Only Master Administrators can access and manage tenants. If you require access, please contact a Master Administrator."
            />
          </div>
        </div>

        {/* Admin features variant */}
        <div className="rounded-lg border border-gray-200">
          <h2 className="border-b border-gray-200 bg-gray-50 p-4 font-medium">Admin Features</h2>
          <div className="p-4">
            <NoAccess
              title="Admin Access Required"
              message="This section is only available to administrators. If you need access to this feature, please contact your administrator."
            />
          </div>
        </div>

        {/* Without home link */}
        <div className="rounded-lg border border-gray-200">
          <h2 className="border-b border-gray-200 bg-gray-50 p-4 font-medium">Without Home Link</h2>
          <div className="p-4">
            <NoAccess
              title="Feature Restricted"
              message="You don't have permission to access this feature."
              showHomeLink={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDeniedPreviewPage;

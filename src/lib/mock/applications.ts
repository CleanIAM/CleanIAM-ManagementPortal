export interface Application {
  id: string;
  name: string;
  description?: string;
}

// Mock applications for demonstration purposes
export const mockApplications: Application[] = [
  {
    id: 'app_1',
    name: 'Web Portal',
    description: 'Main web portal for customers'
  },
  {
    id: 'app_2',
    name: 'Mobile App',
    description: 'Native mobile application'
  },
  {
    id: 'app_3',
    name: 'Admin Dashboard',
    description: 'Internal administration dashboard'
  },
  {
    id: 'app_4',
    name: 'API Gateway',
    description: 'API gateway for backend services'
  },
  {
    id: 'app_5',
    name: 'Customer Support',
    description: 'Customer support portal'
  },
  {
    id: 'app_6',
    name: 'Analytics Platform',
    description: 'Data analytics and reporting platform'
  }
];

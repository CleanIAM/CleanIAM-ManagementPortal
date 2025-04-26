/**
 * NOTE: This file is no longer used in the application.
 * The app now uses React Router's createBrowserRouter API in router.tsx.
 * See main.tsx for the entry point.
 * 
 * This file is kept only for reference and will be removed in a future update.
 */

import './App.css';

const App = () => (
  <div className="text-center p-8">
    <h1 className="text-2xl text-red-600 font-bold mb-4">
      App Component Deprecated
    </h1>
    <p>
      This component is no longer used. The application now uses React Router's
      framework mode. Please see router.tsx for the current routing configuration.
    </p>
  </div>
);

export default App;

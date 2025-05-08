import { Outlet } from 'react-router-dom';
import { Navbar } from '../navigation/Navbar';
import { Container } from '../ui/container';
import { Footer } from '../public/Footer';

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

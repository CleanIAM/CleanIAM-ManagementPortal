import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Link } from 'react-router-dom';
import { useSignin } from '@/lib/auth/useSignin';
import { Logo } from './Logo';

export const Hero = () => {
  const { signin } = useSignin();
  const handleSignIn = async () => {
    signin();
  };

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="lg:flex lg:items-center lg:gap-x-10">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block text-blue-600" id="LandingHero">
                Modern IAM
              </span>
              <span className="block">for your applications</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              CleanIAM provides a simple and secure way to manage identity and access for your
              applications. Built with modern standards and best practices.
            </p>
            <div className="mt-10 flex gap-x-6">
              <Button onClick={handleSignIn} size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
              <Link
                to="https://cleaniam.github.io/CleanIAM"
                className="text-gray-600 hover:text-gray-900"
                target="_blank"
              >
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 lg:w-1/2">
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-8 shadow-lg">
              <div className="flex h-64 items-center justify-center">
                <div className="text-center">
                  <div className="mb-4 inline-flex rounded-full bg-blue-100 p-2 py-3.5">
                    <Logo height={100} />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Secure by Design</h3>
                  <p className="mt-2 text-gray-600">
                    Built with OpenID Connect and OAuth 2.0 for enterprise-grade security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

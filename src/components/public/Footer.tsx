import { Container } from '@/components/ui/container';
import { DiscordIcon, DocumentValidationIcon, Github01Icon } from 'hugeicons-react';

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white py-6">
      <Container>
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="text-sm text-gray-500">{new Date().getFullYear()} CleanIAM</div>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a
              href="https://github.com/CleanIAM/CleanIAM"
              className="flex gap-1 text-sm text-gray-500 hover:text-gray-900"
              target="_blank"
            >
              <Github01Icon size={20} />
              Github
            </a>
            <a
              href="https://discord.gg/849qAGMWUk"
              className="flex gap-1 text-sm text-gray-500 hover:text-gray-900"
              target="_blank"
            >
              <DiscordIcon size={20} />
              Discord
            </a>
            <a
              href="https://cleaniam.github.io/CleanIAM"
              className="flex gap-1 text-sm text-gray-500 hover:text-gray-900"
              target="_blank"
            >
              <DocumentValidationIcon size={20} />
              Documentation
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

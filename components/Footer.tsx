// Footer.tsx
import React from 'react';
import { GlobeIcon } from './icons/GlobeIcon';

interface FooterProps {
  setActivePage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const footerLinks = {
    "Plateforme": ["Accueil", "Cours", "Données", "Défis", "Blog"],
    "Ressources": ["Centre d'aide", "Communauté", "Devenir partenaire"],
    "Légal": ["Confidentialité", "Termes d'utilisation"],
  };

  return (
    <footer className="border-t border-white/10 pt-12 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 lg:col-span-1">
          <button onClick={() => setActivePage('Accueil')} className="flex items-center gap-2 text-white mb-4">
            <GlobeIcon className="w-8 h-8 text-teal-300" />
            <span className="font-bold text-lg">Grahaye Climat+</span>
          </button>
          <p className="text-sm text-gray-400">L'éducation climatique pour tous.</p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-bold text-white mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map(link => (
                <li key={link}>
                  <button
                    onClick={() => setActivePage(link)}
                    className="text-sm text-gray-400 hover:text-white transition-colors text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Grahaye Climat+. Tous droits réservés.</p>
        <p className='mt-1'>Powered by <a href="https://aldolo.web.app/" className="text-teal-300 hover:underline">Aldôlo</a></p>
      </div>
    </footer>
  );
};

export default Footer;

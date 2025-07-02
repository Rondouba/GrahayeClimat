
import React, { useState, useContext } from 'react';
import { GlobeIcon } from './icons/GlobeIcon';
import { AuthContext } from '../context/AuthContext';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const { user, isAdmin, logout } = useContext(AuthContext);

  const navItems = ["Accueil", "Cours", "Données", "Défis", "Blog"];
  if (isAdmin) {
    navItems.push("Tableau de Bord");
  }

  const handleNavClick = (item: string) => {
    setActivePage(item);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActivePage('Accueil');
  }

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50">
        <div className="glass-card rounded-2xl px-4 py-2">
          <div className="flex items-center justify-between">
            <button onClick={() => handleNavClick("Accueil")} className="flex items-center gap-2 text-white">
              <GlobeIcon className="w-8 h-8 text-teal-300" />
              <span className="font-bold text-lg">Grahaye Climat+</span>
            </button>

            <nav className="hidden lg:flex items-center gap-x-6">
              {navItems.filter(item => item !== 'Tableau de Bord').map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-sm font-medium transition-colors duration-300 relative px-2 py-2`}
                >
                  <span className={`${activePage === item ? 'text-white' : 'text-gray-300 hover:text-white'}`}>
                    {item}
                  </span>
                  {activePage === item && (
                    <span className='absolute bottom-0 left-0 w-full h-0.5 bg-teal-400 rounded-full transition-all duration-300'></span>
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              {isAdmin && (
                <button onClick={() => handleNavClick("Tableau de Bord")} className={`text-sm font-bold transition-colors duration-300 px-3 py-2 rounded-full ${activePage === 'Tableau de Bord' ? 'bg-teal-400/20 text-teal-200' : 'text-gray-300 hover:text-white'}`}>
                  Tableau de Bord
                </button>
              )}
              <button className="text-sm font-medium text-gray-300 hover:text-white transition-colors">FR</button>
              <div className="w-px h-5 bg-white/20"></div>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">{user.name}</span>
                  <button onClick={handleLogout} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Déconnexion</button>
                </div>
              ) : (
                <button onClick={() => setAuthModalOpen(true)} className="flex items-center gap-2 text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                  Connexion
                  <div className="w-3 h-3 border-2 border-teal-300 rounded-full"></div>
                </button>
              )}
            </div>

            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                </svg>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-4 pb-4">
              <nav className="flex flex-col items-center gap-y-4">
                {navItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`text-lg font-medium transition-colors ${activePage === item ? 'text-teal-300' : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {item}
                  </button>
                ))}
                <div className="flex flex-col items-center gap-4 mt-4 w-full">
                  <div className='flex items-center gap-4'>
                    <button className="text-lg font-medium text-gray-300 hover:text-white transition-colors">FR</button>
                    <div className="w-px h-6 bg-white/20"></div>
                    {user ? (
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-medium text-white">{user.name}</span>
                        <button onClick={handleLogout} className="text-lg font-medium text-gray-300 hover:text-white transition-colors">Déconnexion</button>
                      </div>
                    ) : (
                      <button onClick={() => { setAuthModalOpen(true); setIsMenuOpen(false); }} className="flex items-center gap-2 text-lg font-medium text-white bg-white/10 px-6 py-2 rounded-full hover:bg-white/20 transition-colors">
                        Connexion
                        <div className="w-3 h-3 border-2 border-teal-300 rounded-full"></div>
                      </button>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Header;

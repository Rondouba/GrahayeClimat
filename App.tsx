
import React, { useState, useContext } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import DonneesPage from './pages/DonneesPage';
import DefisPage from './pages/DefisPage';
import BlogPage from './pages/BlogPage';
import Footer from './components/Footer';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { InspiringQuote } from './components/InspiringQuote';
import { AuthProvider, AuthContext } from './context/AuthContext';

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState('Accueil');
  const { isAdmin } = useContext(AuthContext);

  const renderPage = () => {
    switch(activePage) {
      case 'Accueil':
        return <HomePage />;
      case 'Cours':
        return <CoursesPage />;
      case 'Données':
        return <DonneesPage />;
      case 'Défis':
        return <DefisPage />;
      case 'Blog':
        return <BlogPage />;
      case 'Tableau de Bord':
        return isAdmin ? <AdminDashboardPage /> : <HomePage />; // Protect dashboard
      default:
        return <HomePage />;
    }
  }

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-gradient-to-br from-[#062a27] via-[#031818] to-[#142903]">
      <div className="aurora-bg"></div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Header activePage={activePage} setActivePage={setActivePage} />

        <main className="pt-28 md:pt-32 pb-16">
          {renderPage()}
        </main>

        <Footer />
      </div>
      <InspiringQuote />
    </div>
  );
}


const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

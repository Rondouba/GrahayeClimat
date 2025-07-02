
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import CourseManager from '../components/admin/CourseManager';

const AdminDashboardPage: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('courses');

    const renderContent = () => {
        switch (activeTab) {
            case 'courses':
                return <CourseManager />;
            case 'users':
                return <div className="text-gray-400">La gestion des utilisateurs sera bientôt disponible.</div>;
            case 'blog':
                return <div className="text-gray-400">La gestion du blog sera bientôt disponible.</div>;
            case 'data':
                return <div className="text-gray-400">La visualisation des données sera bientôt disponible.</div>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-12">
            <section className="text-center">
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                    Tableau de Bord Administrateur
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                    Gérez le contenu et les utilisateurs de la plateforme Grahaye Climat+.
                </p>
            </section>

            <div className="neo-glass-card rounded-3xl p-4 md:p-6">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 border-b border-white/10 pb-4">
                    <TabButton label="Gérer les Cours" isActive={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
                    <TabButton label="Gérer les Utilisateurs" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                    <TabButton label="Gérer le Blog" isActive={activeTab === 'blog'} onClick={() => setActiveTab('blog')} />
                    <TabButton label="Voir les Données" isActive={activeTab === 'data'} onClick={() => setActiveTab('data')} />
                </div>
                
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex-shrink-0 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-teal-400/20 text-teal-300 ring-1 ring-teal-400' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}>
        {label}
    </button>
);

export default AdminDashboardPage;

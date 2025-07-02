
import React, { useState, useEffect } from 'react';
import { LeafIcon } from '../components/icons/LeafIcon';

// A map to render component icons by name
const iconComponents: { [key: string]: React.ReactNode } = {
    'LeafIcon': <LeafIcon className="w-8 h-8 text-green-400" />,
};

interface Challenge {
    _id: string;
    title: string;
    duration: string;
    category: string;
    icon: {
        type: 'emoji' | 'component';
        value: string;
    };
}

const ChallengeCard: React.FC<Omit<Challenge, '_id'>> = ({ title, duration, category, icon }) => (
    <div className="neo-glass-card rounded-3xl p-6 flex flex-col h-full group transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-teal-400/50">
        <div className="bg-white/10 p-3 rounded-full w-max mb-4 group-hover:bg-teal-500/20 transition-colors">
            {icon.type === 'emoji' ? <span className="text-3xl">{icon.value}</span> : iconComponents[icon.value]}
        </div>
        <h4 className="text-2xl font-bold mb-2 flex-grow text-white">{title}</h4>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <span>Durée: {duration}</span>
            <span>{category}</span>
        </div>
        <button className="w-full bg-teal-500 text-white font-bold text-sm py-3 px-4 rounded-full transition-transform transform hover:scale-105 group-hover:bg-teal-400">
            Participer au défi
        </button>
    </div>
);

const DefisPage: React.FC = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/challenges`);
                const data = await response.json();
                setChallenges(data);
            } catch (error) {
                console.error("Failed to fetch challenges:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchChallenges();
    }, []);

    return (
        <div className="space-y-16 md:space-y-24">
            {/* Hero Section */}
            <section className="text-center">
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                    Relevez les Défis Climatiques
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
                    Joignez-vous à la communauté et agissez pour la planète. Chaque action compte.
                </p>
            </section>

            {/* Challenges Grid */}
            <section>
                {loading ? (
                    <div className="text-center text-gray-400">Chargement des défis...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {challenges.map((challenge) => (
                            <ChallengeCard key={challenge._id} {...challenge} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default DefisPage;
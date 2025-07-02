import React from 'react';
import { TrophyIcon } from '../icons/TrophyIcon';

const SchoolContribution: React.FC<{ name: string; points: number; rank: number }> = ({ name, points, rank }) => {
    const rankColors: { [key: number]: string } = {
        1: 'text-yellow-400',
        2: 'text-gray-300',
        3: 'text-yellow-600',
    };
    return (
        <div className="flex items-center justify-between bg-black/20 p-2 rounded-lg">
            <div className="flex items-center gap-3">
                <span className={`font-bold w-6 text-center ${rankColors[rank] || 'text-gray-400'}`}>{rank}.</span>
                <span className="text-sm text-white">{name}</span>
            </div>
            <span className="text-xs font-bold text-teal-300">{points.toLocaleString('fr-FR')} points</span>
        </div>
    );
};

const LocalImpact: React.FC = () => {
    const schools = [
        { name: "École Le Bâtisseur", points: 250, rank: 1 },
        { name: "Lycée de la Forêt", points: 215, rank: 2 },
        { name: "Collège de la Rivière", points: 180, rank: 3 },
    ];

    return (
        <div className="neo-glass-card rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
                <TrophyIcon className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-bold">Impact Local</h3>
            </div>
            <p className="text-sm text-gray-300 mb-4">Classement des écoles les plus contributrices ce mois-ci.</p>
            <div className="space-y-2">
                {schools.map(school => (
                    <SchoolContribution key={school.name} {...school} />
                ))}
            </div>
        </div>
    );
};

export default LocalImpact;

import React from 'react';
import { TrophyIcon } from '../icons/TrophyIcon';

const UserProgress: React.FC = () => {
  const progress = 65; // Example progress

  return (
    <div className="neo-glass-card rounded-3xl p-6 h-full">
      <h3 className="text-xl font-bold mb-4 text-center">Ma progression</h3>
      <div className="flex justify-center items-center mb-4">
        <div
          className="relative w-32 h-32 rounded-full flex items-center justify-center progress-ring"
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
        >
          <div className="absolute w-[85%] h-[85%] bg-[#0f2624] rounded-full flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{progress}%</span>
            <span className="text-xs text-gray-400">Complété</span>
          </div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-gray-300 text-sm">3/5 cours terminés</p>
        <button className="mt-2 flex items-center justify-center mx-auto gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
          <TrophyIcon className="w-5 h-5" />
          <span>Voir mes trophées</span>
        </button>
      </div>
    </div>
  );
};

export default UserProgress;

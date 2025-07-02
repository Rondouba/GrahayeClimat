import React from 'react';
import { PencilIcon } from '../icons/PencilIcon';

const ProposeCourse: React.FC = () => {
  return (
    <div className="neo-glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full">
      <div className="bg-white/10 p-4 rounded-full mb-4">
        <PencilIcon className="w-8 h-8 text-teal-300" />
      </div>
      <h3 className="text-xl font-bold mb-2">Vous êtes enseignant ?</h3>
      <p className="text-gray-300 text-sm max-w-xs mb-4">
        Proposez un nouveau cours pour votre école et partagez votre savoir avec la communauté.
      </p>
      <button className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 glow-button">
        Créer un cours
      </button>
    </div>
  );
};

export default ProposeCourse;

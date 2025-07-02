
import React from 'react';
import { AfricaMap } from './AfricaMap';

const Hero: React.FC = () => {
  return (
    <section className="relative glass-card rounded-3xl p-8 md:p-12 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight">
            L'éducation climatique à l'ère numérique
          </h1>
          <p className="text-lg text-gray-300">
            Optimisation stratégique pour un avenir durable.
          </p>
          <button className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 glow-button text-lg">
            Commencer maintenant
          </button>
        </div>
        <div className="relative flex justify-center items-center h-64 md:h-full">
          <div className="absolute w-full h-full scale-125" style={{ filter: 'drop-shadow(0 0 3rem #14b8a6)' }}>
             <AfricaMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

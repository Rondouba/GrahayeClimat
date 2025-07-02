import React, { useEffect, useMemo } from 'react';
import { SearchIcon } from '../icons/SearchIcon';

const Particle: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="particle" style={style}></div>
);

const CoursesHero: React.FC = () => {
  const particles = useMemo(() => Array.from({ length: 25 }).map((_, i) => {
    const size = Math.random() * 5 + 2;
    const style = {
      width: `${size}px`,
      height: `${size}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 20}s`,
      animationDuration: `${Math.random() * 15 + 10}s`,
    };
    return <Particle key={i} style={style} />;
  }), []);

  return (
    <section className="relative glass-card rounded-3xl p-8 md:p-12 overflow-hidden text-center">
      <div className="particle-bg">{particles}</div>
      <div className="relative z-10">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
          📘 Tous les savoirs pour comprendre le climat
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
          Des leçons claires, interactives et adaptées à chaque niveau. Plongez dans nos cours et devenez un expert du climat.
        </p>
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Rechercher un cours, un thème..."
              className="w-full bg-white/5 border border-white/20 rounded-full py-4 pl-14 pr-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesHero;

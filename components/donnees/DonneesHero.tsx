import React from 'react';
import { AfricaMap } from '../AfricaMap';
import { ThermometerIcon } from '../icons/ThermometerIcon';
import { CloudRainIcon } from '../icons/CloudRainIcon';
import { SmogIcon } from '../icons/SmogIcon';
import { WindIcon } from '../icons/WindIcon';

const LegendItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-xs">
        {icon}
        <span>{label}</span>
    </div>
);

const DonneesHero: React.FC = () => {
    return (
        <section className="relative glass-card rounded-3xl p-8 md:p-12 overflow-hidden">
             <div className="absolute inset-0 opacity-20">
                <AfricaMap />
                 {/* Example glowing points */}
                <div className="absolute top-[40%] left-[55%] w-3 h-3 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-[50%] left-[45%] w-2 h-2 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-[65%] left-[50%] w-3 h-3 rounded-full bg-cyan-400 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
             </div>
             <div className="relative z-10 text-center flex flex-col items-center">
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight max-w-4xl">
                    Visualisez et explorez les données du climat autour de vous
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                    Accédez aux données locales issues des écoles, des élèves et des capteurs pour comprendre et agir.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <LegendItem icon={<ThermometerIcon className="w-4 h-4 text-orange-400" />} label="Température" />
                    <LegendItem icon={<CloudRainIcon className="w-4 h-4 text-blue-400" />} label="Pluie" />
                    <LegendItem icon={<SmogIcon className="w-4 h-4 text-gray-400" />} label="Pollution" />
                    <LegendItem icon={<WindIcon className="w-4 h-4 text-indigo-300" />} label="Vent" />
                </div>
            </div>
        </section>
    );
};

export default DonneesHero;

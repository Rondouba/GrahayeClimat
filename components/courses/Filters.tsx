import React from 'react';
import { LeafIcon } from '../icons/LeafIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { BookOpenIcon } from '../icons/BookOpenIcon';

const FilterButton = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <button className={`flex-shrink-0 flex items-center gap-2 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${active ? 'bg-teal-400/20 text-teal-300 ring-1 ring-teal-400' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}>
        {icon}
        <span>{label}</span>
    </button>
);

const Filters: React.FC = () => {
    return (
        <section className="sticky top-[88px] z-30">
            <div className="glass-card rounded-2xl p-3">
                <div className="flex items-center gap-2 md:gap-4 overflow-x-auto pb-2 -mb-2">
                    <div className="hidden md:block font-bold text-sm pr-2 border-r border-white/20 mr-2">Filtres:</div>
                    <FilterButton icon={<span className="text-lg">🎓</span>} label="Niveau" />
                    <FilterButton icon={<LeafIcon className="w-4 h-4 text-green-400" />} label="Thème" active={true} />
                    <FilterButton icon={<span className="text-lg">🎥</span>} label="Format" />
                    <div className="flex-grow"></div>
                     <div className="hidden md:flex items-center gap-4">
                        <div className="w-px h-5 bg-white/20"></div>
                        <FilterButton icon={<SearchIcon className="w-4 h-4" />} label="Recherche par mot-clé" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Filters;

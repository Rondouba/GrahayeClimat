import React from 'react';
import { BookOpenIcon } from '../icons/BookOpenIcon';

const featuredCourses = [
    { title: "Simulation: L'impact de la déforestation", image: "https://picsum.photos/seed/feat1/400/300" },
    { title: "Infographie: Les conséquences du réchauffement", image: "https://picsum.photos/seed/feat2/400/300" },
    { title: "Vidéo: Le rôle des océans", image: "https://picsum.photos/seed/feat3/400/300" },
    { title: "Texte: Histoire du climat", image: "https://picsum.photos/seed/feat4/400/300" },
];

const FeaturedCard: React.FC<typeof featuredCourses[0]> = ({ title, image }) => (
    <div className="neo-glass-card rounded-2xl p-3 flex-shrink-0 w-64 group">
        <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <h5 className="font-bold text-white text-sm truncate">{title}</h5>
    </div>
);

const FeaturedCourses: React.FC = () => {
    return (
        <section className='h-full'>
            <div className="flex items-center gap-2 mb-4">
                 <BookOpenIcon className="w-6 h-6 text-teal-300" />
                 <h3 className="text-xl font-bold">Recommandé cette semaine</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 -mb-4">
                {featuredCourses.map((course, index) => (
                    <FeaturedCard key={index} {...course} />
                ))}
            </div>
        </section>
    );
};

export default FeaturedCourses;

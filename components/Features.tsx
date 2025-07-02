
import React from 'react';
import { MapPinIcon } from './icons/MapPinIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { BellIcon } from './icons/BellIcon';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, children, className }) => (
  <div className={`glass-card rounded-3xl p-6 flex flex-col ${className}`}>
    <div className="flex items-center gap-4">
      <div className="bg-white/10 p-3 rounded-full">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    {children && <div className="mt-4 flex-grow">{children}</div>}
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
      <FeatureCard
        icon={<MapPinIcon className="w-6 h-6 text-teal-300" />}
        title="Collecte locale de données"
        className="lg:col-span-1 md:col-span-1"
      >
        <div className="h-full flex flex-col">
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mt-2">
            <img
              src="https://www.callimedia.fr/wp-content/uploads/2023/06/blog-callimedia-elearning-modules-cle-en-main.png"
              alt="Rural school building"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2">
              <svg viewBox="0 0 100 20" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 C 10 0, 20 20, 30 10 S 50 0, 60 10 S 80 20, 90 10, 100 0" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </FeatureCard>
      <FeatureCard
        icon={<BookOpenIcon className="w-6 h-6 text-teal-300" />}
        title="Cours intéractifs"
        className="lg:col-span-1 md:col-span-1"
      >
        <div className="h-full flex flex-col">
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mt-2">
            <img
              src="https://cdn.prod.website-files.com/66201a753ae2755a0a43da6a/66201a753ae2755a0a43e4f6_Didask-Ingenierie-pedagogique-e-learning-lms-formation.webp"
              alt="Rural school building"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2">
              <svg viewBox="0 0 100 20" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 C 10 0, 20 20, 30 10 S 50 0, 60 10 S 80 20, 90 10, 100 0" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </FeatureCard>
      <FeatureCard
        icon={<BellIcon className="w-6 h-6 text-teal-300" />}
        title="Alerte météo intelligente"
        className="md:col-span-2 lg:col-span-1 md:row-span-2"
      >
        <div className="h-full flex flex-col">
          <div className="relative w-full h-48 rounded-2xl overflow-hidden mt-2">
            <img
              src="https://vence.fr/wp-content/uploads/2018/10/alerte-mto.jpg"
              alt="Rural school building"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2">
              <svg viewBox="0 0 100 20" className="w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 10 C 10 0, 20 20, 30 10 S 50 0, 60 10 S 80 20, 90 10, 100 0" stroke="white" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </FeatureCard>
    </section>
  );
};

export default Features;

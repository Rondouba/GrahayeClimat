
import React, { useState, useEffect } from 'react';
import { ThermometerIcon } from '../icons/ThermometerIcon';
import { CloudRainIcon } from '../icons/CloudRainIcon';
import { SmogIcon } from '../icons/SmogIcon';

const FilterButton = ({ label, active = false }: { label: string, active?: boolean }) => (
    <button className={`flex-shrink-0 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${active ? 'bg-teal-400/20 text-teal-300 ring-1 ring-teal-400' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}>
        {label}
    </button>
);

const Chart: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-black/20 p-4 rounded-xl h-48 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <h4 className="text-sm font-bold text-white">{title}</h4>
        </div>
        <div className="flex-grow">{children}</div>
    </div>
);

const DataDashboard: React.FC = () => {
    const [dataPoints, setDataPoints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataPoints = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/data/points`);
                const data = await response.json();
                setDataPoints(data);
            } catch (error) {
                console.error("Failed to fetch data points:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDataPoints();
    }, []);

    return (
        <section className="neo-glass-card rounded-3xl p-6 md:p-8">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-8">
                <span className="font-bold text-sm text-gray-300">Filtres:</span>
                <FilterButton label="École: Lycée Bilingue" />
                <FilterButton label="Région: Centre" />
                <FilterButton label="Période: 30 jours" active />
                <FilterButton label="Donnée: Température" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Interactive Map */}
                <div className="relative bg-black/20 rounded-2xl p-4 min-h-[300px] lg:min-h-full">
                    <h3 className="font-bold mb-2">Carte des relevés ({dataPoints.length} points)</h3>
                    <div className="absolute inset-0 bg-cover bg-center rounded-2xl opacity-30" style={{ backgroundImage: "url('https://picsum.photos/seed/mapbg/800/600')" }}></div>
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Simplified map representation */}
                        <svg viewBox="0 0 200 150" className="w-full h-full">
                            <path d="M10 140 Q 50 150, 80 120 T 150 90 T 190 60" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="2" />
                            <path d="M10 10 Q 40 50, 70 40 T 140 20 T 190 40" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth="2" />
                            {/* Data points */}
                            <circle cx="50" cy="80" r="5" fill="#2dd4bf" className="cursor-pointer hover:r-7 transition-all" />
                            <circle cx="95" cy="100" r="5" fill="#facc15" className="cursor-pointer hover:r-7 transition-all" />
                            <circle cx="150" cy="70" r="5" fill="#2dd4bf" className="cursor-pointer hover:r-7 transition-all" />
                        </svg>
                    </div>
                </div>

                {/* Charts */}
                <div className="space-y-4">
                    <Chart title="Évolution des Températures" icon={<ThermometerIcon className="w-5 h-5 text-orange-400" />}>
                        <svg width="100%" height="100%" viewBox="0 0 100 50">
                            <polyline fill="none" stroke="#f97316" strokeWidth="1" points="0,30 10,25 20,28 30,22 40,20 50,25 60,30 70,35 80,32 90,40 100,38" />
                        </svg>
                    </Chart>
                    <Chart title="Précipitations (mm)" icon={<CloudRainIcon className="w-5 h-5 text-blue-400" />}>
                         <svg width="100%" height="100%" viewBox="0 0 100 50">
                            <rect x="5" y="30" width="10" height="20" fill="#3b82f6" />
                            <rect x="25" y="10" width="10" height="40" fill="#3b82f6" />
                            <rect x="45" y="40" width="10" height="10" fill="#3b82f6" />
                            <rect x="65" y="20" width="10" height="30" fill="#3b82f6" />
                            <rect x="85" y="35" width="10" height="15" fill="#3b82f6" />
                        </svg>
                    </Chart>
                    <Chart title="Taux de Pollution (AQI)" icon={<SmogIcon className="w-5 h-5 text-gray-400" />}>
                         <svg width="100%" height="100%" viewBox="0 0 100 50">
                            <polyline fill="none" stroke="#9ca3af" strokeWidth="1.5" points="0,45 10,40 20,42 30,35 40,30 50,25 60,20 70,15 80,18 90,10 100,5" />
                        </svg>
                    </Chart>
                </div>
            </div>
        </section>
    );
};

export default DataDashboard;
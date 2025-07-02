import React from 'react';
import { BellIcon } from '../icons/BellIcon';

const AiAlerts: React.FC = () => {
    return (
        <div className="neo-glass-card rounded-3xl p-6">
            <div className="flex items-start gap-4">
                <div className="bg-red-500/20 p-2 rounded-full mt-1">
                    <BellIcon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">IA & Alertes Météo</h3>
                    <p className="text-sm text-red-300 mt-2">
                        <strong>Alerte :</strong> Températures anormalement élevées attendues dans votre zone (+3°C vs moyenne).
                    </p>
                    <p className="text-sm text-gray-300 mt-2">
                        <strong>Prédiction :</strong> Probabilité de pluie à 70% demain à 16h.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AiAlerts;

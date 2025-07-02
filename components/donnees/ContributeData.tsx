
import React, { useState, useContext } from 'react';
import { UploadIcon } from '../icons/UploadIcon';
import { AuthContext } from '../../context/AuthContext';

const ContributeData: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [temperature, setTemperature] = useState('');
    const [rain, setRain] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('Veuillez vous connecter pour contribuer.');
            return;
        }
        setSubmitting(true);
        setMessage('');
        setError('');

        const data = {
            temperature: temperature ? parseFloat(temperature) : undefined,
            rain: rain ? parseFloat(rain) : undefined,
        };

        try {
            const response = await fetch(`/api/data/points`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'La soumission a échoué');
            }

            await response.json();
            setMessage('Merci ! Votre contribution a été soumise avec succès.');
            setTemperature('');
            setRain('');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Une erreur est survenue.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="neo-glass-card rounded-3xl p-6 h-full">
            <h3 className="text-xl font-bold mb-4">Contribuer des données</h3>
            <p className="text-sm text-gray-300 mb-6">Participez à la science citoyenne en partageant vos observations. Chaque donnée est précieuse.</p>
            
            {!user && (
                <div className="text-center bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-lg p-4">
                    <p>Vous devez être connecté pour soumettre des données.</p>
                </div>
            )}

            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="temp" className="text-sm font-medium text-gray-300 block mb-1">Température (°C)</label>
                        <input type="number" id="temp" placeholder="Ex: 28" className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400" value={temperature} onChange={(e) => setTemperature(e.target.value)} disabled={!user}/>
                    </div>
                    <div>
                        <label htmlFor="rain" className="text-sm font-medium text-gray-300 block mb-1">Pluie (mm)</label>
                        <input type="number" id="rain" placeholder="Ex: 5" className="w-full bg-white/5 border border-white/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400" value={rain} onChange={(e) => setRain(e.target.value)} disabled={!user}/>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-300 block mb-1">Photo de l'environnement</label>
                    <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-lg ${!user ? 'opacity-50' : ''}`}>
                        <div className="space-y-1 text-center">
                           <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-400">
                                <label htmlFor="file-upload" className={`relative cursor-pointer bg-black/20 rounded-md font-medium text-teal-300 ${user ? 'hover:text-teal-200' : 'cursor-not-allowed'} p-1`}>
                                    <span>Téléchargez un fichier</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" disabled={!user}/>
                                </label>
                                <p className="pl-1">ou glissez-déposez</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <button type="submit" disabled={submitting || !user} className="bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold py-2 px-6 rounded-full transition-transform transform hover:scale-105 glow-button disabled:opacity-50 disabled:cursor-not-allowed">
                        {submitting ? 'Soumission...' : 'Soumettre ma contribution'}
                    </button>
                </div>
                {message && <p className="text-center text-sm mt-4 text-teal-300">{message}</p>}
                {error && <p className="text-center text-sm mt-4 text-red-400">{error}</p>}
            </form>
        </div>
    );
};

export default ContributeData;

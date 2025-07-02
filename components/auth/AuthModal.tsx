
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { GoogleIcon } from './GoogleIcon';
import { MicrosoftIcon } from './MicrosoftIcon';
import { AppleIcon } from './AppleIcon';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { login, register } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isLoginView) {
                await login({ email, password });
            } else {
                await register({ name, email, password });
            }
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };
    
    const handleGoogleLogin = () => {
        window.location.href = '/api/auth/google';
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className="neo-glass-card rounded-3xl w-full max-w-md m-4 p-8 text-white relative" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">&times;</button>
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold">{isLoginView ? 'Connexion' : 'Inscription'}</h2>
                    <p className="text-gray-400 mt-2">
                        {isLoginView ? 'Heureux de vous revoir !' : 'Créez votre compte pour commencer.'}
                    </p>
                </div>

                <div className="flex flex-col gap-3 mb-6">
                    <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-lg">
                        <GoogleIcon className="w-5 h-5" /> Continuer avec Google
                    </button>
                    {/* Placeholders for other providers */}
                    <button className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-lg opacity-50 cursor-not-allowed">
                        <MicrosoftIcon className="w-5 h-5" /> Continuer avec Microsoft
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 transition-colors p-3 rounded-lg opacity-50 cursor-not-allowed">
                        <AppleIcon className="w-5 h-5" /> Continuer avec Apple
                    </button>
                </div>
                
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-white/20" />
                    <span className="px-4 text-gray-400 text-sm">OU</span>
                    <hr className="flex-grow border-white/20" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginView && (
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Nom complet"
                            required
                            className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    )}
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Adresse e-mail"
                        required
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Mot de passe"
                        required
                        minLength={6}
                        className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                    
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                    
                    <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 glow-button disabled:opacity-50">
                        {loading ? 'Chargement...' : (isLoginView ? 'Se connecter' : 'Créer le compte')}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                    {isLoginView ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?'}
                    <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-semibold text-teal-300 hover:text-teal-200 ml-2">
                        {isLoginView ? 'Inscrivez-vous' : 'Connectez-vous'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthModal;

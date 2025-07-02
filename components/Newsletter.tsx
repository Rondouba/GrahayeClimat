
import React from 'react';

const Newsletter: React.FC = () => {
  return (
    <section className="glass-card rounded-3xl p-8 md:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl font-bold mb-2">Recevez les mises à jour climatiques et éducatives</h2>
                <p className="text-gray-300">Email (pour enseignant(e) / élève)</p>
            </div>
            <div className="flex-shrink-0 w-full lg:w-auto">
                <form className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-grow w-full">
                      <input type="email" placeholder="Votre email..." className="w-full bg-white/5 border border-white/20 rounded-full py-3 px-6 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-shadow" />
                    </div>
                    <button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-lime-400 to-green-500 text-black font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 glow-button whitespace-nowrap">
                        S'abonner
                    </button>
                </form>
                <div className="mt-4 flex items-center justify-center lg:justify-start">
                    <input id="teacher-student" type="checkbox" className="w-4 h-4 text-teal-400 bg-gray-700 border-gray-600 rounded focus:ring-teal-500 ring-offset-gray-800 focus:ring-2" />
                    <label htmlFor="teacher-student" className="ml-2 text-sm font-medium text-gray-300">Je suis un(e) enseignant(e) / élève</label>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Newsletter;

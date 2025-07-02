import React from 'react';

const quizzes = [
    { title: "Quiz: Biodiversité Africaine", success: "82%" },
    { title: "Défi: Semaine Zéro Déchet", success: "75%" },
    { title: "Quiz: Les cycles de l'eau", success: "91%" },
];

const Quizzes: React.FC = () => {
    return (
        <div className="neo-glass-card rounded-3xl p-6 h-full">
            <h3 className="text-xl font-bold mb-4">Quiz & Défis</h3>
            <div className="space-y-3">
                {quizzes.map((quiz, index) => (
                    <a href="#" key={index} className="block bg-black/20 p-3 rounded-lg hover:bg-black/40 transition-colors">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-sm text-white">{quiz.title}</span>
                            <span className="text-xs font-bold text-teal-300 bg-teal-500/20 py-1 px-2 rounded-md">{quiz.success}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Quizzes;

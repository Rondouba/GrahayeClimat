
import React, { useState, useEffect } from 'react';

interface Course {
    _id: string;
    title: string;
    level: string;
    duration: string;
    students: number;
    image: string;
}

const CourseManager: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        level: 'Primaire',
        duration: '',
        students: 0,
        image: 'https://picsum.photos/seed/newcourse/400/300'
    });

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/courses');
            const data = await response.json();
            setCourses(data);
        } catch (err) {
            setError('Erreur lors du chargement des cours.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingCourse ? 'PUT' : 'POST';
        const url = editingCourse ? `/api/courses/${editingCourse._id}` : '/api/courses';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (!response.ok) throw new Error('La soumission a échoué');
            await fetchCourses();
            closeForm();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
        }
    };
    
    const openFormForCreate = () => {
        setEditingCourse(null);
        setFormData({
            title: '',
            level: 'Primaire',
            duration: '',
            students: 0,
            image: 'https://picsum.photos/seed/newcourse/400/300'
        });
        setIsFormOpen(true);
    };

    const openFormForEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            level: course.level,
            duration: course.duration,
            students: course.students,
            image: course.image
        });
        setIsFormOpen(true);
    };
    
    const closeForm = () => {
        setIsFormOpen(false);
        setEditingCourse(null);
        setError('');
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
            try {
                const response = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('La suppression a échoué');
                await fetchCourses();
            } catch (err) {
                 setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
            }
        }
    }

    if (loading) return <div className="text-center text-gray-400">Chargement...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Gestion des Cours ({courses.length})</h3>
                <button onClick={openFormForCreate} className="bg-teal-500 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    + Ajouter un cours
                </button>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50" onClick={closeForm}>
                    <div className="bg-[#0f2624] border border-teal-500/30 rounded-2xl w-full max-w-lg m-4 p-6 text-white" onClick={e => e.stopPropagation()}>
                        <h4 className="text-xl font-bold mb-4">{editingCourse ? 'Modifier le cours' : 'Ajouter un nouveau cours'}</h4>
                        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Titre du cours" required className="w-full bg-white/5 border border-white/20 rounded-lg p-2" />
                            <select name="level" value={formData.level} onChange={handleInputChange} className="w-full bg-white/5 border border-white/20 rounded-lg p-2">
                                <option>Primaire</option>
                                <option>Collège</option>
                                <option>Lycée</option>
                            </select>
                            <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Durée (ex: 20 min)" required className="w-full bg-white/5 border border-white/20 rounded-lg p-2" />
                            <input type="number" name="students" value={formData.students} onChange={handleInputChange} placeholder="Nombre d'élèves" required className="w-full bg-white/5 border border-white/20 rounded-lg p-2" />
                            <input type="text" name="image" value={formData.image} onChange={handleInputChange} placeholder="URL de l'image" required className="w-full bg-white/5 border border-white/20 rounded-lg p-2" />
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={closeForm} className="bg-white/10 hover:bg-white/20 py-2 px-4 rounded-lg">Annuler</button>
                                <button type="submit" className="bg-teal-500 hover:bg-teal-400 py-2 px-4 rounded-lg">Sauvegarder</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto bg-black/20 rounded-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-white uppercase bg-white/5">
                        <tr>
                            <th scope="col" className="px-6 py-3">Titre</th>
                            <th scope="col" className="px-6 py-3">Niveau</th>
                            <th scope="col" className="px-6 py-3">Durée</th>
                            <th scope="col" className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course._id} className="border-b border-white/10 hover:bg-white/5">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{course.title}</th>
                                <td className="px-6 py-4">{course.level}</td>
                                <td className="px-6 py-4">{course.duration}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => openFormForEdit(course)} className="font-medium text-teal-400 hover:underline mr-4">Modifier</button>
                                    <button onClick={() => handleDelete(course._id)} className="font-medium text-red-400 hover:underline">Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseManager;

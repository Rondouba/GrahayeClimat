
import React, { useState, useEffect } from 'react';

interface Course {
    _id: string;
    title: string;
    level: string;
    duration: string;
    students: number;
    image: string;
}

const CourseCard: React.FC<Course> = ({ title, level, duration, students, image }) => (
    <div className="neo-glass-card rounded-3xl p-4 flex flex-col h-full group transition-all duration-300 hover:transform hover:-translate-y-1 hover:border-teal-400/50">
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <h4 className="text-xl font-bold mb-2 flex-grow text-white">{title}</h4>
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
            <span>🎓 {level}</span>
            <span>⏱️ {duration}</span>
        </div>
        <div className="flex items-center justify-between">
            <p className="text-xs text-gray-300">
                <span className="font-bold text-white">{students.toLocaleString('fr-FR')}</span> élèves
            </p>
            <button className="bg-teal-500 text-white font-bold text-sm py-2 px-4 rounded-full transition-transform transform hover:scale-105 group-hover:bg-teal-400">
                Commencer
            </button>
        </div>
    </div>
);

const CourseCatalog: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/courses`);
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchCourses();
  }, []);

  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Catalogue des cours</h2>
      {loading ? (
        <div className="text-center text-gray-400">Chargement des cours...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} {...course} />
            ))}
        </div>
      )}
    </section>
  );
};

export default CourseCatalog;
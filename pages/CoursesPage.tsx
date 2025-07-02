import React from 'react';
import CoursesHero from '../components/courses/CoursesHero';
import Filters from '../components/courses/Filters';
import CourseCatalog from '../components/courses/CourseCatalog';
import FeaturedCourses from '../components/courses/FeaturedCourses';
import UserProgress from '../components/courses/UserProgress';
import ProposeCourse from '../components/courses/ProposeCourse';
import Quizzes from '../components/courses/Quizzes';

const CoursesPage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <CoursesHero />
      <Filters />
      <CourseCatalog />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <FeaturedCourses />
        </div>
        <div className="lg:col-span-1">
            <UserProgress />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProposeCourse />
        <Quizzes />
      </div>
    </div>
  );
};

export default CoursesPage;

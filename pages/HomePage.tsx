import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Blog from '../components/Blog';
import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-24 md:space-y-32">
      <Hero />
      <Features />
      <Blog />
      <Newsletter />
    </div>
  );
};

export default HomePage;

import React from 'react';
import DonneesHero from '../components/donnees/DonneesHero';
import DataDashboard from '../components/donnees/DataDashboard';
import ContributeData from '../components/donnees/ContributeData';
import AiAlerts from '../components/donnees/AiAlerts';
import LocalImpact from '../components/donnees/LocalImpact';

const DonneesPage: React.FC = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      <DonneesHero />
      <DataDashboard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <ContributeData />
        </div>
        <div className="space-y-8">
          <AiAlerts />
          <LocalImpact />
        </div>
      </div>
    </div>
  );
};

export default DonneesPage;

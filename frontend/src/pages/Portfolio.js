import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import Loading from '../components/common/Loading';
import { getPortfolioCases, getPortfolioStats } from '../services/apiService';

const Portfolio = () => {
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casesData, statsData] = await Promise.all([
          getPortfolioCases(),
          getPortfolioStats()
        ]);
        setCases(casesData.data || []);
        setStats(statsData.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <SEO title="Portfolio - Nos Réalisations" />
      <div className="pt-24 pb-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold text-center mb-12 dark:text-white">
            Nos Réalisations
          </h1>
          
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              <div className="card text-center dark:bg-gray-800 dark:border-gray-700">
                <p className="text-3xl font-bold text-primary">{stats.totalClients}+</p>
                <p className="dark:text-gray-300">Clients Satisfaits</p>
              </div>
              <div className="card text-center dark:bg-gray-800 dark:border-gray-700">
                <p className="text-3xl font-bold text-primary">{stats.totalProjects}+</p>
                <p className="dark:text-gray-300">Projets Réussis</p>
              </div>
              <div className="card text-center dark:bg-gray-800 dark:border-gray-700">
                <p className="text-3xl font-bold text-primary">{stats.averageRating}★</p>
                <p className="dark:text-gray-300">Note Moyenne</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
              <Link key={caseItem._id} to={`/portfolio/${caseItem._id}`} className="card hover:shadow-card-hover dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-2 dark:text-white">{caseItem.title}</h3>
                <p className="text-gray-medium dark:text-gray-400 mb-3">{caseItem.sector}</p>
                <p className="text-2xl font-bold text-secondary">{caseItem.investment} MAD</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;

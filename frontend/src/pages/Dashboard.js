import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../services/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [stats, setStats] = useState({
    totalAthletes: 0,
    totalSessions: 0,
    weeklyMinutes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Athletes</h5>
              <h2 className="card-text">{stats.totalAthletes}</h2>
              <Link to="/athletes" className="btn btn-light btn-sm">
                View All
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Sessions</h5>
              <h2 className="card-text">{stats.totalSessions}</h2>
              <Link to="/sessions" className="btn btn-light btn-sm">
                View All
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">This Week</h5>
              <h2 className="card-text">{stats.weeklyMinutes} min</h2>
              <Link to="/analytics" className="btn btn-light btn-sm">
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quick Actions</h5>
              <div className="d-grid gap-2">
                <Link to="/athletes/new" className="btn btn-primary">
                  + Add New Athlete
                </Link>
                <Link to="/sessions/new" className="btn btn-success">
                  + Log Training Session
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">About</h5>
              <p className="card-text">
                Manage your athletes and track their training sessions with detailed
                performance analytics. Get insights and recommendations for better
                training outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

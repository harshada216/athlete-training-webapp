import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getAthleteById,
  getWeeklyTraining,
  getMostFrequentActivity,
  getProgressMetrics,
  getRecommendations,
} from '../services/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const { id } = useParams();          // athlete id from URL
  const [athlete, setAthlete] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No athlete selected. Open analytics from the Athletes page.');
      setLoading(false);
      return;
    }
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError('');

      const [
        athleteRes,
        weeklyRes,
        activityRes,
        progressRes,
        recoRes,
      ] = await Promise.all([
        getAthleteById(id),
        getWeeklyTraining(id),
        getMostFrequentActivity(id),
        getProgressMetrics(id),
        getRecommendations(id),
      ]);

      setAthlete(athleteRes.data.data || null);
      setWeeklyData(weeklyRes.data.data || []);
      setActivityData(activityRes.data.data || []);
      setProgressData(progressRes.data.data || []);
      setRecommendations(recoRes.data.data?.recommendations || []);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Unable to load analytics for this athlete.');
    } finally {
      setLoading(false);
    }
  };

  const weeklyChartData = {
    labels: weeklyData.map((w) => `Week ${w.week_number}`).reverse(),
    datasets: [
      {
        label: 'Training Minutes',
        data: weeklyData.map((w) => w.total_minutes).reverse(),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const activityChartData = {
    labels: activityData.map((a) => a.activity_type),
    datasets: [
      {
        label: 'Number of Sessions',
        data: activityData.map((a) => a.frequency),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">{error}</div>
        <Link to="/athletes" className="btn btn-primary">
          Go to Athletes
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Analytics - {athlete?.name}</h2>
          <p className="text-muted">
            {athlete?.sport} {athlete?.age ? `• ${athlete.age} years` : ''}
          </p>
        </div>
        <Link to="/athletes" className="btn btn-secondary">
          Back to Athletes
        </Link>
      </div>

      {/* Weekly Training Chart */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Weekly Training Time (Last 8 Weeks)</h5>
          {weeklyData.length > 0 ? (
            <Bar data={weeklyChartData} options={{ responsive: true }} />
          ) : (
            <p className="text-muted mb-0">No weekly data available yet.</p>
          )}
        </div>
      </div>

      {/* Activity Frequency Chart */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Most Frequent Activities</h5>
          {activityData.length > 0 ? (
            <Bar data={activityChartData} options={{ responsive: true }} />
          ) : (
            <p className="text-muted mb-0">No activity data available yet.</p>
          )}
        </div>
      </div>

      {/* Activity Stats Table */}
      {activityData.length > 0 && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Activity Statistics</h5>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Sessions</th>
                  <th>Total Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {activityData.map((activity, index) => (
                  <tr key={index}>
                    <td>{activity.activity_type}</td>
                    <td>{activity.frequency}</td>
                    <td>{activity.total_duration || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Training Recommendations</h5>
            <ul className="list-group list-group-flush">
              {recommendations.map((rec, index) => (
                <li key={index} className="list-group-item">
                  💡 {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;

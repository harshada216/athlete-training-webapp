import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSessionsByAthlete, getAthleteById } from '../services/api';

function AthleteSessions() {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [athleteRes, sessionsRes] = await Promise.all([
        getAthleteById(id),
        getSessionsByAthlete(id),
      ]);
      setAthlete(athleteRes.data.data);
      setSessions(sessionsRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>{athlete?.name}'s Training Sessions</h2>
          <p className="text-muted">{athlete?.sport} • {athlete?.age} years</p>
        </div>
        <Link to="/athletes" className="btn btn-secondary">
          Back to Athletes
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="alert alert-info">
          No training sessions found for this athlete.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Activity</th>
                <th>Duration (min)</th>
                <th>Reps</th>
                <th>Score</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td>{formatDate(session.date)}</td>
                  <td>
                    <span className="badge bg-primary">{session.activity_type}</span>
                  </td>
                  <td>{session.duration}</td>
                  <td>{session.repetitions || '-'}</td>
                  <td>{session.score || '-'}</td>
                  <td>{session.notes || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AthleteSessions;

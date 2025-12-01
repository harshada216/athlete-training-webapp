import React, { useState, useEffect } from 'react';
import { getAllSessions, deleteSession } from '../services/api';
import { Link } from 'react-router-dom';

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getAllSessions();
      setSessions(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession(id);
        alert('Session deleted successfully!');
        fetchSessions();
      } catch (error) {
        alert('Error deleting session');
        console.error(error);
      }
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
        <h2>Training Sessions</h2>
        <Link to="/sessions/new" className="btn btn-success">
          + Log New Session
        </Link>
      </div>

      {sessions.length === 0 ? (
        <div className="alert alert-info">
          No training sessions found. Log your first session to get started!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Athlete</th>
                <th>Activity</th>
                <th>Duration (min)</th>
                <th>Reps</th>
                <th>Score</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td>{formatDate(session.date)}</td>
                  <td>{session.athlete_name}</td>
                  <td>
                    <span className="badge bg-primary">{session.activity_type}</span>
                  </td>
                  <td>{session.duration}</td>
                  <td>{session.repetitions || '-'}</td>
                  <td>{session.score || '-'}</td>
                  <td>{session.notes || '-'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(session.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Sessions;

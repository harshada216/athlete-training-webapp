import React, { useState, useEffect } from 'react';
import { getAllAthletes, deleteAthlete } from '../services/api';
import { Link } from 'react-router-dom';

function Athletes() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await getAllAthletes();
      setAthletes(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching athletes:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this athlete?')) {
      try {
        await deleteAthlete(id);
        alert('Athlete deleted successfully!');
        fetchAthletes();
      } catch (error) {
        alert('Error deleting athlete');
        console.error(error);
      }
    }
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
        <h2>Athletes</h2>
        <Link to="/athletes/new" className="btn btn-primary">
          + Add New Athlete
        </Link>
      </div>

      {athletes.length === 0 ? (
        <div className="alert alert-info">
          No athletes found. Add your first athlete to get started!
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Sport</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {athletes.map((athlete) => (
                <tr key={athlete.id}>
                  <td>{athlete.id}</td>
                  <td>{athlete.name}</td>
                  <td>{athlete.age}</td>
                  <td>{athlete.sport}</td>
                  <td>{athlete.email}</td>
                  <td>{athlete.phone}</td>
                  <td>
                    <Link
                      to={`/athletes/${athlete.id}/sessions`}
                      className="btn btn-sm btn-info me-2"
                    >
                      Sessions
                    </Link>
                    <Link
                      to={`/analytics/${athlete.id}`}
                      className="btn btn-sm btn-success me-2"
                    >
                      Analytics
                    </Link>
                    <button
                      onClick={() => handleDelete(athlete.id)}
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

export default Athletes;

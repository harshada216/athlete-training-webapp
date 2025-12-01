import React, { useState, useEffect } from 'react';
import { createSession, getAllAthletes } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddSession() {
  const navigate = useNavigate();
  const [athletes, setAthletes] = useState([]);
  const [formData, setFormData] = useState({
    athlete_id: '',
    date: '',
    activity_type: '',
    duration: '',
    repetitions: '',
    score: '',
    notes: '',
  });

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await getAllAthletes();
      setAthletes(response.data.data);
    } catch (error) {
      console.error('Error fetching athletes:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSession(formData);
      alert('Training session logged successfully!');
      navigate('/sessions');
    } catch (error) {
      alert('Error logging session');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Log Training Session</h2>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Athlete *</label>
              <select
                className="form-select"
                name="athlete_id"
                value={formData.athlete_id}
                onChange={handleChange}
                required
              >
                <option value="">Choose an athlete...</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id} value={athlete.id}>
                    {athlete.name} - {athlete.sport}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Date *</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Activity Type *</label>
              <select
                className="form-select"
                name="activity_type"
                value={formData.activity_type}
                onChange={handleChange}
                required
              >
                <option value="">Choose activity...</option>
                <option value="Running">Running</option>
                <option value="Gym">Gym</option>
                <option value="Cricket Nets">Cricket Nets</option>
                <option value="Swimming">Swimming</option>
                <option value="Cycling">Cycling</option>
                <option value="Yoga">Yoga</option>
                <option value="Stretching">Stretching</option>
                <option value="Football Practice">Football Practice</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 60"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Repetitions</label>
                <input
                  type="number"
                  className="form-control"
                  name="repetitions"
                  value={formData.repetitions}
                  onChange={handleChange}
                  placeholder="e.g., 20"
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Score</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  placeholder="e.g., 85.5"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Any additional notes about the session..."
              ></textarea>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success">
                Log Session
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/sessions')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSession;

import React, { useState } from 'react';
import { createAthlete } from '../services/api';
import { useNavigate } from 'react-router-dom';

function AddAthlete() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sport: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Convert age to number
  const dataToSend = {
    ...formData,
    age: formData.age ? parseInt(formData.age) : null
  };
  
  try {
    const response = await createAthlete(dataToSend);
    console.log('Success:', response.data); // Debug log
    alert('Athlete added successfully!');
    navigate('/athletes');
  } catch (error) {
    console.error('Full error:', error); // Debug log
    console.error('Error response:', error.response?.data); // Backend error
    alert('Error adding athlete: ' + (error.response?.data?.message || error.message));
  }
};


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Athlete</h2>
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Sport</label>
              <input
                type="text"
                className="form-control"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                placeholder="e.g., Cricket, Football, Running"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                Add Athlete
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/athletes')}
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

export default AddAthlete;

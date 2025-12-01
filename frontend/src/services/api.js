import axios from 'axios';

const API_BASE_URL = '/api';   // using proxy (frontend package.json has "proxy": "http://localhost:5000")

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



// Athletes API
export const getAllAthletes = () => api.get('/athletes');
export const getAthleteById = (id) => api.get(`/athletes/${id}`);
export const createAthlete = (data) => api.post('/athletes', data);
export const updateAthlete = (id, data) => api.put(`/athletes/${id}`, data);
export const deleteAthlete = (id) => api.delete(`/athletes/${id}`);

// Sessions API
export const getAllSessions = () => api.get('/sessions');
export const getSessionsByAthlete = (athleteId) => api.get(`/sessions/athlete/${athleteId}`);
export const createSession = (data) => api.post('/sessions', data);
export const updateSession = (id, data) => api.put(`/sessions/${id}`, data);
export const deleteSession = (id) => api.delete(`/sessions/${id}`);

// Analytics API
export const getDashboardStats = () => api.get('/analytics/dashboard');
export const getWeeklyTraining = (athleteId) => api.get(`/analytics/weekly/${athleteId}`);
export const getMostFrequentActivity = (athleteId) => api.get(`/analytics/activity/${athleteId}`);
export const getProgressMetrics = (athleteId) => api.get(`/analytics/progress/${athleteId}`);
export const getRecommendations = (athleteId) => api.get(`/analytics/recommendations/${athleteId}`);

export default api;

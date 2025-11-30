const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/dashboard', analyticsController.getDashboardStats);
router.get('/weekly/:athleteId', analyticsController.getWeeklyTrainingTime);
router.get('/activity/:athleteId', analyticsController.getMostFrequentActivity);
router.get('/progress/:athleteId', analyticsController.getProgressMetrics);
router.get('/recommendations/:athleteId', analyticsController.getRecommendations);

module.exports = router;

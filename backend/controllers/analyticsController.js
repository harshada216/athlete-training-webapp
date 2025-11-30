const db = require('../config/db');

// Get weekly training time for an athlete
exports.getWeeklyTrainingTime = async (req, res) => {
  try {
    const { athleteId } = req.params;
    
    const [result] = await db.query(`
      SELECT 
        WEEK(date) as week_number,
        YEAR(date) as year,
        SUM(duration) as total_minutes
      FROM training_sessions
      WHERE athlete_id = ? AND date >= DATE_SUB(NOW(), INTERVAL 8 WEEK)
      GROUP BY YEAR(date), WEEK(date)
      ORDER BY year DESC, week_number DESC
    `, [athleteId]);
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get most frequent activity for an athlete
exports.getMostFrequentActivity = async (req, res) => {
  try {
    const { athleteId } = req.params;
    
    const [result] = await db.query(`
      SELECT 
        activity_type,
        COUNT(*) as frequency,
        SUM(duration) as total_duration
      FROM training_sessions
      WHERE athlete_id = ?
      GROUP BY activity_type
      ORDER BY frequency DESC
    `, [athleteId]);
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get progress metrics (average performance over time)
exports.getProgressMetrics = async (req, res) => {
  try {
    const { athleteId } = req.params;
    
    const [result] = await db.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m') as month,
        activity_type,
        AVG(duration) as avg_duration,
        AVG(score) as avg_score,
        COUNT(*) as session_count
      FROM training_sessions
      WHERE athlete_id = ? AND date >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(date, '%Y-%m'), activity_type
      ORDER BY month DESC
    `, [athleteId]);
    
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get overall dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    // Total athletes
    const [athleteCount] = await db.query('SELECT COUNT(*) as total FROM athletes');
    
    // Total sessions
    const [sessionCount] = await db.query('SELECT COUNT(*) as total FROM training_sessions');
    
    // This week's training time
    const [weeklyTime] = await db.query(`
      SELECT SUM(duration) as total_minutes 
      FROM training_sessions 
      WHERE WEEK(date) = WEEK(NOW()) AND YEAR(date) = YEAR(NOW())
    `);
    
    res.json({ 
      success: true, 
      data: {
        totalAthletes: athleteCount[0].total,
        totalSessions: sessionCount[0].total,
        weeklyMinutes: weeklyTime[0].total_minutes || 0
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get training recommendations
exports.getRecommendations = async (req, res) => {
  try {
    const { athleteId } = req.params;
    
    // Get activity frequency
    const [activities] = await db.query(`
      SELECT activity_type, COUNT(*) as count
      FROM training_sessions
      WHERE athlete_id = ?
      GROUP BY activity_type
      ORDER BY count DESC
    `, [athleteId]);
    
    let recommendations = [];
    
    if (activities.length > 0) {
      const mostFrequent = activities[0].activity_type.toLowerCase();
      
      // Simple recommendation logic
      if (mostFrequent.includes('run')) {
        recommendations.push('Consider adding strength training (gym) to prevent injuries');
        recommendations.push('Add stretching sessions for flexibility');
      } else if (mostFrequent.includes('gym')) {
        recommendations.push('Include cardio sessions like running for endurance');
        recommendations.push('Try yoga for recovery and flexibility');
      } else if (mostFrequent.includes('cricket')) {
        recommendations.push('Add sprint training to improve speed');
        recommendations.push('Include shoulder strengthening exercises');
      } else {
        recommendations.push('Maintain a balanced routine with cardio, strength, and flexibility');
      }
    }
    
    res.json({ success: true, data: { activities, recommendations } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

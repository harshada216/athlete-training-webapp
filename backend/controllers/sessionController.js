const db = require('../config/db');

// Get all training sessions
exports.getAllSessions = async (req, res) => {
  try {
    const [sessions] = await db.query(`
      SELECT ts.*, a.name as athlete_name 
      FROM training_sessions ts
      JOIN athletes a ON ts.athlete_id = a.id
      ORDER BY ts.date DESC
    `);
    res.json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get sessions by athlete ID
exports.getSessionsByAthlete = async (req, res) => {
  try {
    const [sessions] = await db.query(
      'SELECT * FROM training_sessions WHERE athlete_id = ? ORDER BY date DESC',
      [req.params.athleteId]
    );
    res.json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new training session
exports.createSession = async (req, res) => {
  try {
    const { athlete_id, date, activity_type, duration, repetitions, score, notes } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO training_sessions 
      (athlete_id, date, activity_type, duration, repetitions, score, notes) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [athlete_id, date, activity_type, duration, repetitions, score, notes]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Training session logged successfully',
      sessionId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update training session
exports.updateSession = async (req, res) => {
  try {
    const { date, activity_type, duration, repetitions, score, notes } = req.body;
    const { id } = req.params;
    
    const [result] = await db.query(
      `UPDATE training_sessions 
      SET date = ?, activity_type = ?, duration = ?, repetitions = ?, score = ?, notes = ? 
      WHERE id = ?`,
      [date, activity_type, duration, repetitions, score, notes, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }
    
    res.json({ success: true, message: 'Session updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete training session
exports.deleteSession = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM training_sessions WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }
    
    res.json({ success: true, message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

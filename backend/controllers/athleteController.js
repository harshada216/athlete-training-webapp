const db = require('../config/db');

// Get all athletes
exports.getAllAthletes = async (req, res) => {
  try {
    const [athletes] = await db.query('SELECT * FROM athletes ORDER BY created_at DESC');
    res.json({ success: true, data: athletes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single athlete by ID
exports.getAthleteById = async (req, res) => {
  try {
    const [athlete] = await db.query('SELECT * FROM athletes WHERE id = ?', [req.params.id]);
    
    if (athlete.length === 0) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }
    
    res.json({ success: true, data: athlete[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new athlete
exports.createAthlete = async (req, res) => {
  try {
    const { name, age, sport, email, phone } = req.body;
    
    // Validate required fields
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name is required' 
      });
    }
    
    // Convert age to integer or null
    const athleteAge = age ? parseInt(age) : null;
    
    const [result] = await db.query(
      'INSERT INTO athletes (name, age, sport, email, phone) VALUES (?, ?, ?, ?, ?)',
      [name, athleteAge, sport || null, email || null, phone || null]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Athlete created successfully',
      athleteId: result.insertId 
    });
  } catch (error) {
    console.error('Error creating athlete:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Update athlete
exports.updateAthlete = async (req, res) => {
  try {
    const { name, age, sport, email, phone } = req.body;
    const { id } = req.params;
    
    const [result] = await db.query(
      'UPDATE athletes SET name = ?, age = ?, sport = ?, email = ?, phone = ? WHERE id = ?',
      [name, age, sport, email, phone, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }
    
    res.json({ success: true, message: 'Athlete updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete athlete
exports.deleteAthlete = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM athletes WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Athlete not found' });
    }
    
    res.json({ success: true, message: 'Athlete deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

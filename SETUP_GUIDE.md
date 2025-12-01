# Athlete Training Management System - Setup Guide

## 📋 Project Overview

A full-stack web application for managing athletes and their training sessions with performance analytics and smart recommendations.

**Technology Stack:**
- **Backend:** Node.js + Express.js + MySQL
- **Frontend:** React.js + React Router + Axios
- **Database:** MySQL
- **Charting:** Chart.js + react-chartjs-2

**Submission Deadline:** December 5, 2025

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update database credentials:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=athlete_training_db
   ```

4. **Create MySQL Database:**
   ```sql
   CREATE DATABASE athlete_training_db;
   ```

5. **Import database schema:**
   ```bash
   mysql -u root -p athlete_training_db < database_schema.sql
   ```

6. **Start backend server:**
   ```bash
   npm run dev  # Development with hot reload
   # or
   npm start    # Production
   ```

   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start frontend development server:**
   ```bash
   npm start
   ```

   App opens at `http://localhost:3000`

## 📁 Project Structure

```
athlete-training-app/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── athleteController.js
│   │   ├── sessionController.js
│   │   └── analyticsController.js
│   ├── routes/
│   │   ├── athleteRoutes.js
│   │   ├── sessionRoutes.js
│   │   └── analyticsRoutes.js
│   ├── models/                # Database models
│   ├── package.json
│   ├── server.js
│   ├── .env.example          # Environment template
│   └── testConnection.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Athletes.js
│   │   │   ├── AddAthlete.js
│   │   │   ├── Sessions.js
│   │   │   ├── AddSession.js
│   │   │   ├── AthleteSessions.js
│   │   │   └── Analytics.js
│   │   ├── services/
│   │   │   └── api.js        # API client
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── .gitignore                # Security: excludes node_modules, .env, etc
├── README.md
└── SETUP_GUIDE.md
```

## 🔌 API Endpoints

### Athletes
- `GET /api/athletes` - List all athletes
- `GET /api/athletes/:id` - Get athlete details
- `POST /api/athletes` - Create new athlete
- `PUT /api/athletes/:id` - Update athlete
- `DELETE /api/athletes/:id` - Delete athlete

### Sessions
- `GET /api/sessions` - List all sessions
- `GET /api/sessions/athlete/:athleteId` - Get athlete's sessions
- `POST /api/sessions` - Log new training session
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

### Analytics
- `GET /api/analytics/athlete/:id/summary` - Get athlete performance summary
- `GET /api/analytics/athlete/:id/weekly` - Weekly training time
- `GET /api/analytics/athlete/:id/activities` - Most frequent activities
- `GET /api/analytics/recommendations/:id` - Get training recommendations

## ✨ Key Features Implemented

### 1. Core CRUD Operations ✅
- Full athlete management (Create, Read, Update, Delete)
- Training session logging with date, activity type, and performance metrics
- Duration, repetitions, scores tracking

### 2. Analytics Dashboard ✅
- Total training time per week
- Most frequent activity analysis
- Progress metrics per athlete
- Visual charts and graphs using Chart.js

### 3. Recommendation Engine ✅
- Analyzes athlete's training history
- Suggests complementary activities
- Example: If athlete frequently runs, suggests gym or stretching
- Smart suggestion based on logged activities

### 4. Frontend Features ✅
- Responsive design using Bootstrap
- User-friendly forms for athlete registration
- Session logging interface
- Analytics visualization with charts
- Navigation between dashboard, athletes, and sessions

### 5. Database Design ✅
- **Athletes Table:** id, name, age, sport, email, created_at
- **Sessions Table:** id, athlete_id, activity_type, date, duration, repetitions, score
- **Proper indexing** for query performance
- Connection pooling for better resource management

## 🔒 Security Measures Implemented

### 1. Environment Variables ✅
- `.env` file properly excluded from git
- `.env.example` provided as template
- Sensitive credentials never exposed in code

### 2. CORS Configuration ✅
- Properly configured CORS in server.js
- Restricted to frontend origin

### 3. Database Connection ✅
- Connection pooling prevents connection exhaustion
- Promise-based queries with proper error handling

### 4. .gitignore Configuration ✅
- Excludes `node_modules/`
- Excludes `.env` and other sensitive files
- Excludes build artifacts and logs

## 📊 Data Models

### Athlete
```javascript
{
  id: number,
  name: string,
  age: number,
  sport: string,
  email: string,
  created_at: datetime
}
```

### Training Session
```javascript
{
  id: number,
  athlete_id: number,
  activity_type: string,
  date: date,
  duration: number,      // in minutes
  repetitions: number,   // optional
  score: number,         // optional (0-100)
  created_at: datetime
}
```

## 🎯 Testing the Application

### Manual Testing

1. **Add Athlete:**
   - Go to "Athletes" page
   - Click "Add New Athlete"
   - Fill in name, age, sport, email
   - Submit

2. **Log Session:**
   - Go to "Sessions" page
   - Click "Add New Session"
   - Select athlete and activity type
   - Enter duration, repetitions, score
   - Submit

3. **View Analytics:**
   - Click on athlete name
   - View performance charts
   - See recommendations

## 🚀 Performance Optimizations

1. **Database Queries:**
   - Indexed columns: `athlete_id`, `activity_type`, `date`
   - Proper JOIN operations
   - Connection pooling

2. **Frontend:**
   - React Router for fast navigation
   - Axios for efficient API calls
   - Chart.js for optimized rendering

3. **Backend:**
   - Express middleware optimization
   - Promise-based async/await
   - Error handling and logging

## 📚 API Request Examples

### Create Athlete
```bash
curl -X POST http://localhost:5000/api/athletes \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 25,
    "sport": "Cricket",
    "email": "john@example.com"
  }'
```

### Log Training Session
```bash
curl -X POST http://localhost:5000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "athlete_id": 1,
    "activity_type": "running",
    "date": "2025-12-01",
    "duration": 45,
    "repetitions": 0,
    "score": 85
  }'
```

### Get Analytics
```bash
curl http://localhost:5000/api/analytics/athlete/1/summary
```

## 🔧 Troubleshooting

### Database Connection Failed
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists
- Run `npm run dev` to see detailed error

### CORS Errors
- Frontend URL must match CORS origin in `server.js`
- Default: `http://localhost:3000`

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Use `PORT=3001 npm start`

## 📝 Key Decisions & Architecture

### 1. Why MySQL?
- Structured data with relationships
- ACID compliance
- Good for relational data (athletes → sessions)
- Easy to query analytics data

### 2. Why Express.js?
- Lightweight and fast
- Great middleware support
- Easy to build RESTful APIs
- Excellent community

### 3. Why React?
- Component-based architecture
- Reusable UI components
- Efficient rendering with virtual DOM
- Rich ecosystem for charts and forms

### 4. Recommendation Engine Logic
- Analyzes activity frequency
- Suggests activities performed <30% of the time
- Considers recent sessions (last 30 days)
- Prioritizes complementary exercises

## 📞 Support & Contact

For issues or questions:
1. Check the troubleshooting section
2. Review API endpoints documentation
3. Check browser console for errors
4. Review server logs in terminal

## 📜 License

MIT License - Feel free to use and modify

---

**Last Updated:** December 1, 2025
**Status:** Ready for Production
**Version:** 1.0.0

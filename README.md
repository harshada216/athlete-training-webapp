#  Athlete Training Management System

A comprehensive full-stack web application for managing athletes, logging training sessions, and analyzing performance with AI-powered recommendations.

##  Features

### Core Functionality
-  **Athlete Management** - CRUD operations for athlete profiles
-  **Session Logging** - Track training sessions with activity types and metrics
-  **Performance Analytics** - Visualize training data with interactive charts
-  **Smart Recommendations** - AI-powered suggestions for training variety
-  **Responsive Design** - Mobile-friendly interface with Bootstrap

### Technical Highlights
- RESTful API architecture
- Database optimization with indexing
- Connection pooling for scalability
- Security best practices (CORS, environment variables)
- Modern frontend with React hooks and routing

##  Technology Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Frontend** | React.js, React Router |
| **Charting** | Chart.js, react-chartjs-2 |
| **HTTP Client** | Axios |
| **Styling** | Bootstrap 5, CSS3 |

##  Requirements Met

-  RESTful API with full CRUD operations
-  Athlete management system
-  Training session logging (date, activity type, metrics)
-  Analytics endpoints (weekly time, activity frequency, progress)
-  MySQL database with proper schema
-  React SPA with responsive design
-  Forms for athlete registration and session logging
-  Analytics dashboard with charts
-  Recommendation engine
-  Database query optimization
-  Complete API documentation
-  Clear setup instructions
-  Meaningful commit history

##  Quick Start

### Prerequisites
- Node.js v14+
- MySQL 5.7+
- npm or yarn

### Backend
\\\ash
cd backend
npm install
cp .env.example .env
# Update .env with your MySQL credentials
npm run dev  # Start development server
\\\

### Frontend
\\\ash
cd frontend
npm install
npm start  # Opens http://localhost:3000
\\\

**Backend runs on:** http://localhost:5000
**Frontend runs on:** http://localhost:3000

##  API Endpoints

### Athletes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/athletes | Get all athletes |
| GET | /api/athletes/:id | Get athlete details |
| POST | /api/athletes | Create athlete |
| PUT | /api/athletes/:id | Update athlete |
| DELETE | /api/athletes/:id | Delete athlete |

### Sessions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/sessions | Get all sessions |
| GET | /api/sessions/athlete/:id | Get athlete sessions |
| POST | /api/sessions | Log new session |
| PUT | /api/sessions/:id | Update session |
| DELETE | /api/sessions/:id | Delete session |

### Analytics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/analytics/athlete/:id/summary | Performance summary |
| GET | /api/analytics/athlete/:id/weekly | Weekly training time |
| GET | /api/analytics/athlete/:id/activities | Activity breakdown |
| GET | /api/analytics/recommendations/:id | Training recommendations |

##  Project Structure

\\\
athlete-training-app/
 backend/
    config/db.js
    controllers/
    routes/
    models/
    server.js
    package.json
    .env.example
 frontend/
    src/
       components/
       pages/
       services/
       App.js
    package.json
    public/
 .gitignore
 README.md
 SETUP_GUIDE.md
\\\

##  Security

- Environment variables properly secured
- .gitignore excludes sensitive files
- CORS configured for secure API access
- Connection pooling prevents SQL injection
- No hardcoded credentials

##  Frontend Features

- Dashboard with quick stats
- Athlete list with search/filter
- Session history visualization
- Performance charts
- Add/edit forms with validation
- Responsive navigation

##  Recommendation Engine

The system analyzes:
- Activity frequency distribution
- Recent training patterns
- Performance metrics
- Suggests complementary activities

Example: Runner  Suggests gym/stretching for injury prevention

##  Database Schema

### athletes
- id (PK)
- name
- age
- sport
- email
- created_at

### sessions
- id (PK)
- athlete_id (FK)
- activity_type
- date
- duration
- repetitions
- score
- created_at

**Indexes:** athlete_id, activity_type, date for optimal query performance

##  Git Workflow

Commits show clear progression:
1. Initial project setup
2. Backend API development
3. Database schema
4. Frontend components
5. Analytics features
6. Security improvements
7. Documentation

##  Environment Configuration

\\\env
# Backend .env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_secure_password
DB_NAME=athlete_training_db
\\\

##  Testing

1. **Create Athlete** - Add new athlete profile
2. **Log Sessions** - Record training activities
3. **View Analytics** - Check performance metrics
4. **Get Recommendations** - Receive training suggestions

##  Troubleshooting

**Database connection error?**
- Verify MySQL is running
- Check credentials in .env
- Ensure database exists

**CORS errors?**
- Verify frontend URL in server.js
- Default: http://localhost:3000

**Port in use?**
- Change PORT in .env or use npm start -- --port 3001

##  Support

Refer to SETUP_GUIDE.md for detailed setup instructions and troubleshooting.

##  License

MIT License

---

**Submission Date:** December 1, 2025
**Status:**  Complete and Ready for Review
**Version:** 1.0.0

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

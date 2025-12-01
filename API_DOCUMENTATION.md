# API Documentation - Athlete Training Management System

## Base URL
```
http://localhost:5000/api
```

## Response Format
All endpoints return JSON with the following structure:
```json
{
  "success": true/false,
  "data": {...} or null,
  "message": "Optional error message"
}
```

---

## 📊 Athletes Endpoints

### 1. Get All Athletes
**Endpoint:** `GET /athletes`

**Description:** Retrieve list of all athletes ordered by creation date (newest first)

**Query Parameters:** None

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "age": 25,
      "sport": "Cricket",
      "email": "john@example.com",
      "phone": null,
      "created_at": "2025-12-01T10:30:00Z"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "age": 23,
      "sport": "Running",
      "email": "jane@example.com",
      "phone": "9876543210",
      "created_at": "2025-12-01T11:00:00Z"
    }
  ]
}
```

---

### 2. Get Athlete by ID
**Endpoint:** `GET /athletes/:id`

**Description:** Retrieve details of a specific athlete

**URL Parameters:**
- `id` (required) - Athlete ID

**Example Request:**
```bash
GET /athletes/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "age": 25,
    "sport": "Cricket",
    "email": "john@example.com",
    "phone": null,
    "created_at": "2025-12-01T10:30:00Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Athlete not found"
}
```

---

### 3. Create New Athlete
**Endpoint:** `POST /athletes`

**Description:** Create a new athlete profile

**Request Body:**
```json
{
  "name": "John Doe",
  "age": 25,
  "sport": "Cricket",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

**Required Fields:**
- `name` - Athlete's full name

**Optional Fields:**
- `age` - Age of the athlete
- `sport` - Primary sport (cricket, running, gym, swimming, etc.)
- `email` - Email address
- `phone` - Contact phone number

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "John Doe",
    "age": 25,
    "sport": "Cricket",
    "email": "john@example.com",
    "phone": "9876543210",
    "created_at": "2025-12-01T12:00:00Z"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Name is required"
}
```

---

### 4. Update Athlete
**Endpoint:** `PUT /athletes/:id`

**Description:** Update an existing athlete's information

**URL Parameters:**
- `id` (required) - Athlete ID

**Request Body:**
```json
{
  "name": "John Updated",
  "age": 26,
  "sport": "Cricket",
  "email": "john.new@example.com",
  "phone": "9876543210"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Updated",
    "age": 26,
    "sport": "Cricket",
    "email": "john.new@example.com",
    "phone": "9876543210",
    "created_at": "2025-12-01T10:30:00Z"
  }
}
```

---

### 5. Delete Athlete
**Endpoint:** `DELETE /athletes/:id`

**Description:** Delete an athlete and all associated sessions

**URL Parameters:**
- `id` (required) - Athlete ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Athlete deleted successfully"
}
```

---

## 🏃 Sessions Endpoints

### 1. Get All Sessions
**Endpoint:** `GET /sessions`

**Description:** Retrieve all training sessions

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "athlete_id": 1,
      "athlete_name": "John Doe",
      "activity_type": "running",
      "date": "2025-12-01",
      "duration": 45,
      "repetitions": 0,
      "score": 85,
      "created_at": "2025-12-01T10:30:00Z"
    }
  ]
}
```

---

### 2. Get Sessions by Athlete
**Endpoint:** `GET /sessions/athlete/:athleteId`

**Description:** Get all training sessions for a specific athlete

**URL Parameters:**
- `athleteId` (required) - Athlete ID

**Example Request:**
```bash
GET /sessions/athlete/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "athlete_id": 1,
      "athlete_name": "John Doe",
      "activity_type": "running",
      "date": "2025-12-01",
      "duration": 45,
      "repetitions": 0,
      "score": 85,
      "created_at": "2025-12-01T10:30:00Z"
    },
    {
      "id": 2,
      "athlete_id": 1,
      "athlete_name": "John Doe",
      "activity_type": "gym",
      "date": "2025-12-02",
      "duration": 60,
      "repetitions": 20,
      "score": 90,
      "created_at": "2025-12-02T10:30:00Z"
    }
  ]
}
```

---

### 3. Create Training Session
**Endpoint:** `POST /sessions`

**Description:** Log a new training session

**Request Body:**
```json
{
  "athlete_id": 1,
  "activity_type": "running",
  "date": "2025-12-01",
  "duration": 45,
  "repetitions": 0,
  "score": 85
}
```

**Required Fields:**
- `athlete_id` - ID of the athlete
- `activity_type` - Type of activity (running, gym, cricket nets, swimming, stretching, etc.)
- `date` - Session date (YYYY-MM-DD format)
- `duration` - Duration in minutes

**Optional Fields:**
- `repetitions` - Number of repetitions (for exercises)
- `score` - Performance score (0-100)

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "athlete_id": 1,
    "activity_type": "running",
    "date": "2025-12-01",
    "duration": 45,
    "repetitions": 0,
    "score": 85,
    "created_at": "2025-12-01T12:00:00Z"
  }
}
```

---

### 4. Update Session
**Endpoint:** `PUT /sessions/:id`

**Description:** Update an existing training session

**URL Parameters:**
- `id` (required) - Session ID

**Request Body:** Same as create (all fields optional for update)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "athlete_id": 1,
    "activity_type": "running",
    "date": "2025-12-01",
    "duration": 50,
    "repetitions": 0,
    "score": 90,
    "created_at": "2025-12-01T12:00:00Z"
  }
}
```

---

### 5. Delete Session
**Endpoint:** `DELETE /sessions/:id`

**Description:** Delete a training session

**URL Parameters:**
- `id` (required) - Session ID

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

---

## 📈 Analytics Endpoints

### 1. Get Athlete Summary
**Endpoint:** `GET /analytics/athlete/:id/summary`

**Description:** Get overall performance summary for an athlete

**URL Parameters:**
- `id` (required) - Athlete ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "athlete_id": 1,
    "athlete_name": "John Doe",
    "total_sessions": 10,
    "total_training_time": 450,
    "average_score": 87.5,
    "most_frequent_activity": "running",
    "activities_count": {
      "running": 5,
      "gym": 3,
      "cricket_nets": 2
    }
  }
}
```

---

### 2. Get Weekly Training Time
**Endpoint:** `GET /analytics/athlete/:id/weekly`

**Description:** Get training time breakdown by week for last 30 days

**URL Parameters:**
- `id` (required) - Athlete ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "athlete_id": 1,
    "weeks": [
      {
        "week": "Week 1 (Nov 24-30)",
        "total_time": 120,
        "sessions": 3
      },
      {
        "week": "Week 2 (Dec 1-7)",
        "total_time": 180,
        "sessions": 4
      }
    ]
  }
}
```

---

### 3. Get Activity Analysis
**Endpoint:** `GET /analytics/athlete/:id/activities`

**Description:** Get frequency of different activities

**URL Parameters:**
- `id` (required) - Athlete ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "athlete_id": 1,
    "activities": [
      {
        "activity": "running",
        "count": 5,
        "percentage": 50,
        "total_time": 225
      },
      {
        "activity": "gym",
        "count": 3,
        "percentage": 30,
        "total_time": 180
      },
      {
        "activity": "cricket_nets",
        "count": 2,
        "percentage": 20,
        "total_time": 90
      }
    ]
  }
}
```

---

### 4. Get Training Recommendations
**Endpoint:** `GET /analytics/recommendations/:id`

**Description:** Get AI-powered recommendations based on training history

**URL Parameters:**
- `id` (required) - Athlete ID

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "athlete_id": 1,
    "athlete_name": "John Doe",
    "recommendations": [
      {
        "activity": "stretching",
        "reason": "For injury prevention and flexibility",
        "current_percentage": 0,
        "suggestion": "Include 2-3 sessions weekly"
      },
      {
        "activity": "swimming",
        "reason": "For cross-training and muscle recovery",
        "current_percentage": 0,
        "suggestion": "Try once weekly for low-impact cardio"
      }
    ],
    "summary": "Add variety to your training routine for better overall fitness"
  }
}
```

---

## 🔧 Error Responses

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Database error or server issue"
}
```

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request parameters"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

---

## 📋 Activity Types

Supported activity types include:
- `running` - Running/jogging
- `gym` - Gym/weight training
- `cricket_nets` - Cricket nets/practice
- `swimming` - Swimming
- `stretching` - Stretching/flexibility
- `cycling` - Cycling
- `yoga` - Yoga
- `boxing` - Boxing/combat sports
- `tennis` - Tennis
- `football` - Football/soccer
- `basketball` - Basketball
- `other` - Other activities

---

## 🔐 Security Notes

- All requests should use HTTPS in production
- CORS is configured to allow only `http://localhost:3000`
- Environment variables store sensitive database credentials
- Input validation is performed on all requests
- SQL injection is prevented using parameterized queries

---

## 📞 Example cURL Requests

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

### Get All Athletes
```bash
curl http://localhost:5000/api/athletes
```

### Create Session
```bash
curl -X POST http://localhost:5000/api/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "athlete_id": 1,
    "activity_type": "running",
    "date": "2025-12-01",
    "duration": 45,
    "score": 85
  }'
```

### Get Recommendations
```bash
curl http://localhost:5000/api/analytics/recommendations/1
```

---

**Last Updated:** December 1, 2025
**Version:** 1.0.0
**Status:** Production Ready

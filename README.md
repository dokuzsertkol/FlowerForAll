# FlowerForAll

**FlowerForAll** is an interactive experience that invites people from around the world to care for a single shared flower. Visitors can water the flower to keep it alive and track its health status in real time.
Built with a real-time architecture using Node.js, React, and a Clean N-Layer backend structure.

## Live Project
- [Vercel + Render + MongoDB Atlas + Upstash Redis](https://flowerforall.vercel.app/) (may take a few seconds to load)
- [AWS EC2 + MongoDB Atlas + Upstash Redis](http://13.48.125.240/) (HTTP only)
<img width="1520" height="928" alt="image" src="https://github.com/user-attachments/assets/5601a45b-8892-45ee-996c-b8acc1b30159" />
<img width="1631" height="928" alt="image" src="https://github.com/user-attachments/assets/494e3d80-c58b-4032-be2b-e49073bb1b17" />
<img width="1572" height="928" alt="image" src="https://github.com/user-attachments/assets/eb839706-6534-4995-bffb-dab17b242704" />


## Features
- **Shared Flower:** Everyone can water and watch the same flower.
- **Four Visual States:** Healthy -> Thirsty -> Sick -> Dead
- **Countdown System:** The flower dies after 12 hours without water, changing state every 4 hours.
- **Water Button:** Reset the timer by watering the flower, with no risk of overwatering.
- **Create New Flower:** When the flower dies, anyone can create a new one.
- **Leaderboard:** View the top 5 longest-lived flowers globally.
- **Real-time Updates:** See changes instantly when someone else waters the flower (via Socket.io).
- **Docker Support:** Easy setup and portability.

## Technologies
### Frontend
- Vite
- React.js + TypeScript
- Tailwind CSS
- React Router
- Axios
- Socket.io
### Backend
- Node.js + TypeScript
- Express.js
- MongoDB + Mongoose
- Redis
- Socket.io
- CORS
- N-Layered Clean Architecture
### Additional Tools / Services
- Docker and Docker-Compose
- Render
- Vercel
- AWS EC2
- Upstash Redis

## Installation
Run the project easily using Docker and Docker Compose:
```bash
# Clone the repository
git clone https://github.com/yourusername/flowerforall.git
cd flowerforall

# Build and start the project with Docker
docker-compose up --build
```
Required Environment Variables (.env):
```env
MONGO_URI=...
FRONTEND_URL=...
REDIS_URL=...
VITE_BACKEND_URL=...
```

## API Endpoints
| Method | Endpoint                  | Description                                 | Request Body | Response |
|--------|---------------------------|---------------------------------------------|--------------|----------|
| GET    | `/api/flower`             | Returns the latest flower's information    | None         | JSON     |
| POST   | `/api/flower`             | Creates a new flower if the last one died  | None         | JSON     |
| PUT    | `/api/flower/water`       | Waters the latest flower and updates timer | None         | JSON     |
| PUT    | `/api/flower/dead`        | Marks the flower as dead                    | None         | JSON     |
| GET    | `/api/flower/leaderboard` | Returns top 5 longest-lived flowers        | None         | JSON     |
| GET    | `/api/settings`           | Returns flower settings like lifespan      | None         | JSON     |
### GET /api/flower
```json
{
  "Success": true,
  "Message": "Flower is alive.",
  "Data": {
    "flowerNumber": 10,
    "lastWateredAt": "2025-10-22T03:32:08.839Z",
    "diedAt": null,
    "createdAt": "2025-10-20T14:25:36.217Z",
    "healthState": 3
  }
}
```
### POST /api/flower
```json
{
    "Success": false,
    "Message": "Flower is alive."
}
```
### PUT /api/flower/water
```json
{
    "Success": true,
    "Message": "The flower is watered.",
    "Data": {
        "flowerNumber": 10,
        "lastWateredAt": "2025-10-22T05:51:19.154Z",
        "diedAt": null,
        "createdAt": "2025-10-20T14:25:36.217Z",
        "healthState": 3
    }
}
```
### PUT /api/flower/dead
```json
{
    "Success": false,
    "Message": "Flower is alive."
}
```
### GET /api/flower/leaderboard
```json
{
  "Success": true,
  "Message": null,
  "Data": [
    {
      "flowerNumber": 9,
      "diedAt": "20 October 2025",
      "createdAt": "13 October 2025",
      "timeSurvived": "6d 21h"
    },
    {
      "flowerNumber": 7,
      "diedAt": "12 October 2025",
      "createdAt": "9 October 2025",
      "timeSurvived": "3d 8h"
    },
    {
      "flowerNumber": 3,
      "diedAt": "4 October 2025",
      "createdAt": "1 October 2025",
      "timeSurvived": "2d 11h"
    },
    {
      "flowerNumber": 4,
      "diedAt": "6 October 2025",
      "createdAt": "4 October 2025",
      "timeSurvived": "1d 17h"
    },
    {
      "flowerNumber": 10,
      "diedAt": "Alive",
      "createdAt": "20 October 2025",
      "timeSurvived": "1d 14h"
    }
  ]
}
```
### GET /api/settings
```json
{
  "Success": true,
  "Message": null,
  "Data": {
    "totalStateCount": 4,
    "intervalHours": 4,
    "deathHours": 12
  }
}
```
## Architecture / Data Flow
FlowerForAll is a real-time fullstack application built with a Clean N-Layer Architecture that emphasizes scalability, maintainability, and clear separation of concerns.
### Overview
```
React (Frontend)
   ↕  via Socket.io & REST API
Express (Backend)
   ↕
MongoDB & Redis (Databases)
```
### System Components
- **Frontend (React + Vite + TypeScript)** – Handles user interaction, renders the flower state in real time, and communicates with the backend through REST APIs and WebSockets.  
- **Backend (Node.js + Express + TypeScript)** – Implements a clean N-layer architecture, exposing REST endpoints and real-time updates through Socket.io.  
- **Databases** – MongoDB stores persistent flower data (lifespan, timestamps, states), while Redis manages transient and real-time data (timers, global state sync).  
### 🧠 Clean Architecture & N-Layer Design
The backend follows a **Clean Architecture** pattern with a clear separation of concerns across multiple layers:
- **Controller Layer** – Handles incoming HTTP requests and routes.  
- **Service Layer** – Contains business logic and orchestrates data flow.  
- **Repository Layer** – Interacts with the database (MongoDB).  
- **Core / Entity Layer** – Defines domain models and entities.  

This structure ensures scalability, maintainability, and testability by keeping business logic independent of external frameworks and databases.

## Contribution
The project is **fully open source**. Feel free to explore the code and contribute.

## License
This project is licensed under [GPL-3.0 license](https://www.gnu.org/licenses/gpl-3.0.en.html)

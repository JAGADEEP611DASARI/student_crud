# Student CRUD Application

A full-stack CRUD application using React, Express, Node.js and MongoDB.

## Project Structure

- `frontend` - React + Vite
- `backend` - Node.js + Express + Mongoose

## Requirements

- Node.js 18+
- MongoDB local installation or MongoDB Atlas

## Backend Setup

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/student_crud
```

Start backend:

```bash
npm run dev
```

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

http://localhost:5173

## API

- GET `/api/students`
- GET `/api/students/:id`
- POST `/api/students`
- PUT `/api/students/:id`
- DELETE `/api/students/:id`

## GitHub

```bash
git init
git add .
git commit -m "Initial full-stack CRUD application"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/student-crud-app.git
git push -u origin main
```

Never commit your `.env` file or database credentials.
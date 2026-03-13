# SUMO Backend Setup Guide

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 2: Initialize Database

This will create tables and default user in NeonDB:

```bash
node init-db.js
```

## Step 3: Start Backend Server

```bash
npm start
```

Backend will run on: http://localhost:3000

## Step 4: Start Frontend (in new terminal)

```bash
cd ..
npm run dev
```

Frontend will run on: http://localhost:5173

## Database Info

- Database: NeonDB (PostgreSQL)
- Tables:
  - `users` - Login credentials
  - `routine_data` - Daily routine tracking

## Login Credentials

- Username: sumo@gmail.com
- Password: sumosofa

## API Endpoints

- POST `/api/login` - User login
- POST `/api/routine` - Save routine data
- GET `/api/routine/:date` - Get routine by date
- GET `/api/routine` - Get all routine data

## Features

✅ Data saved permanently in cloud database
✅ Access from any device
✅ Automatic sync between devices
✅ Secure authentication
✅ Data backup and recovery

Made with love for Moni & Surya ❤️💙

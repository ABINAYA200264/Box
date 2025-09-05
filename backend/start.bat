@echo off
REM Start backend
cd backend
start cmd /k "uvicorn main:app --host 0.0.0.0 --port %PORT%"
cd ..

REM Start frontend
cd frontend
start cmd /k "npm install && npm start"

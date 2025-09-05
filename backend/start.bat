@echo off
REM Activate the virtual environment
call .venv\Scripts\activate

REM Run FastAPI server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

REM Pause to keep the window open if needed
pause

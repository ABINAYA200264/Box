#!/bin/sh
pip install -r requirements.txt
cd backend
uvicorn main:app --host 0.0.0.0 --port $PORT

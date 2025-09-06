# backend/main.py
import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

app = FastAPI()

# DEV: allow all origins while testing. For production, set specific origin.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Simple API route ---
@app.get("/api/ping")
async def ping():
    return {"ok": True}

# Simple file upload endpoint (demo — returns filename and size)
@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    content = await file.read()
    size = len(content)
    return {"filename": file.filename, "size": size}

# --- Serve React build (if present) ---
# Build folder expected at ../Frontend/build
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "build"))

if os.path.isdir(frontend_dir):
    # mount static files and index
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")

    # fallback: serve index.html for SPA routes (React Router)
    @app.get("/{full_path:path}")
    async def spa_fallback(full_path: str):
        index_path = os.path.join(frontend_dir, "index.html")
        return FileResponse(index_path)

# 🚀 Start Backend Services

## Current Status
✅ **Frontend**: Running on http://localhost:3000 (with new design!)
❌ **Backend**: Not running (Docker Desktop is not started)

## To Start the Backend:

### Step 1: Start Docker Desktop
1. Open **Docker Desktop** application
2. Wait for it to fully start (whale icon in system tray should be steady)

### Step 2: Start Backend Containers
Once Docker Desktop is running, execute:
```bash
docker-compose up
```

Or run in background:
```bash
docker-compose up -d
```

### What This Starts:
- **Backend API**: FastAPI on port 8000
- **Weaviate**: Vector database on port 8080
- **Neo4j**: Graph database on ports 7474/7687

## Quick Test
Once running, test the backend:
```bash
curl http://localhost:8000/health
```

## Alternative: Run Without Docker
If you prefer to run the backend locally without Docker:

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Start the backend:
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

Note: This won't include Weaviate and Neo4j databases, so some features may not work.

## Current Frontend Features (Working Without Backend):
- ✅ Beautiful new light design
- ✅ Purple gradient theme
- ✅ Modern UI components
- ✅ Responsive layout
- ❌ Chat functionality (needs backend)
- ❌ File uploads (needs backend)
- ❌ Knowledge graph (needs backend)
- ❌ Metrics (needs backend)

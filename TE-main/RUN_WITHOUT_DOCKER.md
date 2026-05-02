# 🚀 Run Without Docker (Simplified)

## Current Status
✅ **Frontend**: Running with beautiful new design at http://localhost:3000
❌ **Backend**: Needs to be started

## Option 1: Start Docker Desktop (Recommended)

1. **Open Docker Desktop** from Start menu
2. Wait for it to start completely
3. Run: `docker-compose up`

## Option 2: Run Backend Locally (Without Docker)

If you don't want to use Docker, run the backend directly:

### Step 1: Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 2: Start Backend
```bash
cd backend
python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0
```

### Step 3: (Optional) Install Ollama for AI Features
Download from: https://ollama.ai/download

Then run:
```bash
ollama pull llama2
```

## What Works Without Full Setup:

### ✅ With Just Backend (No Databases):
- Document upload
- Basic search
- Simple Q&A
- File management

### ❌ Requires Full Docker Setup:
- Vector similarity search (Weaviate)
- Knowledge graph (Neo4j)
- Advanced RAG features

## Quick Test

Once backend is running, test it:
```bash
curl http://localhost:8000/health
```

You should see:
```json
{
  "status": "healthy",
  "documents": 0,
  ...
}
```

## Frontend Features (Already Working!)

The new design is live and includes:
- 🎨 Clean white interface
- 💜 Purple gradient theme
- 📱 Responsive layout
- ✨ Modern animations
- 🎯 Better UX

Just need the backend to enable:
- Chat functionality
- Document uploads
- Knowledge graph
- Metrics display

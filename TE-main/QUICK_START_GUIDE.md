# 🚀 Quick Start Guide

## ✅ Current Status

### Frontend: RUNNING ✅
- **URL**: http://localhost:3000
- **Status**: New redesigned UI is live!
- **Features**: Light theme, purple gradients, modern design

### Backend: NOT RUNNING ❌
- **Issue**: Docker Desktop needs to be restarted
- **Required for**: Chat, uploads, graph, metrics

---

## 🔧 To Start Backend

### Step 1: Restart Docker Desktop
1. **Close Docker Desktop** completely (right-click system tray icon → Quit)
2. **Wait 10 seconds**
3. **Open Docker Desktop** again
4. **Wait** for it to fully start (whale icon should be steady, not animated)

### Step 2: Start Backend Services
Once Docker Desktop is running, open a **new terminal** and run:

```bash
cd C:\TF\Cap\TE-main
docker-compose up
```

Or to run in background:
```bash
docker-compose up -d
```

### Step 3: Verify Backend is Running
Check if backend is responding:
```bash
curl http://localhost:8000/health
```

Or open in browser: http://localhost:8000/docs

---

## 🎯 What You'll Get

Once backend is running:
- ✅ **Chat Interface**: Ask questions about your documents
- ✅ **File Upload**: Upload PDFs, images, audio files
- ✅ **Knowledge Graph**: Visualize concept relationships
- ✅ **Metrics Dashboard**: See performance stats
- ✅ **Multi-modal RAG**: Full AI-powered learning assistant

---

## 🎨 New Design Features (Already Live!)

The frontend redesign is complete and running:
- Clean white background
- Purple gradient accents
- Modern rounded corners
- Better spacing and shadows
- Improved typography
- Professional look and feel

**Visit http://localhost:3000 to see it now!**

---

## 🐛 Troubleshooting

### Port 8000 Already in Use
```bash
# Find process using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual number)
taskkill /F /PID <PID>
```

### Docker Desktop Won't Start
1. Restart your computer
2. Make sure WSL2 is installed and updated
3. Check Docker Desktop settings

### Frontend Not Showing New Design
1. Hard refresh: `Ctrl + Shift + R`
2. Clear browser cache
3. Try incognito mode

---

## 📝 Summary

**Right now**: Frontend with new design is running perfectly!
**Next step**: Restart Docker Desktop and run `docker-compose up`
**Result**: Full-featured AI learning assistant with beautiful UI

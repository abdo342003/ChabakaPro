#!/bin/bash

# ChabakaPro - Quick Start Script
# This script starts all services for local development

echo "🚀 Starting ChabakaPro services..."

# Start backend and database
echo "📦 Starting backend and MongoDB..."
docker-compose up -d mongodb backend

sleep 3

# Check if services are running
if docker-compose ps | grep -q "chabakapro_backend.*Up"; then
    echo "✅ Backend is running on http://localhost:5001/api"
else
    echo "❌ Backend failed to start. Check logs: docker-compose logs backend"
    exit 1
fi

# Start or rebuild frontend
echo "🎨 Starting frontend..."
docker-compose up --build -d frontend

# Wait for frontend to be ready
echo "⏳ Waiting for frontend to start..."
sleep 10

# Check frontend
if docker-compose ps | grep -q "chabakapro_frontend.*Up"; then
    echo "✅ Frontend is running on http://localhost:4000"
else
    echo "⚠️  Frontend may still be building. Check: docker-compose logs frontend"
fi

echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://localhost:4000"
echo "   Backend:  http://localhost:5001/api"
echo ""
echo "📝 View logs: docker-compose logs -f"
echo "🛑 Stop all:  docker-compose down"

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
// import { PrismaClient } from '@prisma/client'; // Temporarily disabled for mock database usage

// const prisma = new PrismaClient();
const app = express();
const upload = multer({ dest: 'uploads/' });

// Enable CORS to allow frontend communication across domains/ports
app.use(cors());
app.use(express.json());

// --------------------------------------------------------------------
// [Addition 1] Static File Serving
// Allow frontend to request GET /uploads/<filename> to play videos
// --------------------------------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --------------------------------------------------------------------
// Mock Database (Abstract) - Use arrays to store data temporarily to make the workflow functional
// --------------------------------------------------------------------
const mockVideos: any[] = [];
const mockActions: any[] = [];

// 1. Upload Video Endpoint (Ingestion side / content creation)
app.post('/upload', upload.single('video'), (req, res) => {
  const { title, userId } = req.body;
  
  const video = {
    id: String(mockVideos.length + 1),
    title: title || 'Untitled Video',
    // Adjust URL to be accessible via /uploads/... based on Static File setup
    url: req.file ? `/uploads/${req.file.filename}` : '',
    authorId: userId || 'user_1',
    createdAt: new Date()
  };

  mockVideos.push(video); // Save into Mock DB

  res.status(201).json(video);
});

// --------------------------------------------------------------------
// [Addition 2] GET Video Feed Endpoint
// Fetch all videos so the frontend can create a TikTok-like Feed
// --------------------------------------------------------------------
app.get('/videos', (req, res) => {
  // In a real scenario, this database query could include Pagination and Sorting
  res.json({
    success: true,
    data: mockVideos
  });
});

// 2. Log Action (Data Ingestion for Big Data / user behavior tracking)
app.post('/action', (req, res) => {
  const { userId, videoId, type } = req.body;

  const action = {
    id: mockActions.length + 1,
    userId: userId || 'anonymous',
    videoId,
    type, // "VIEW", "LIKE", "SHARE"
    timestamp: new Date()
  };

  mockActions.push(action); // Save into Mock DB

  // Simulate sending data to a Data Lake/Stream (like Kafka/Spark)
  const logData = JSON.stringify(action) + '\n';
  fs.appendFileSync('interaction_logs.json', logData);

  res.status(201).json({ message: 'Action logged', data: action });
});

export default app;

// Start the server only if we are not running tests
if (process.env.NODE_ENV !== 'test') {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
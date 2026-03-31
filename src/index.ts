import express from 'express';
import path from 'path';
import cors from 'cors';

// Import Routes
import videoRoutes from './routes/video.routes';
import actionRoutes from './routes/action.routes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Static File Serving for Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Register Routes
app.use('/', videoRoutes);
app.use('/', actionRoutes);

export default app;

// Start the server only if we are not running tests
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

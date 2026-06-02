import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import prisma from './config/db';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes';
import eventRoutes from './routes/eventRoutes';
import teamRoutes from './routes/teamRoutes';
import applicationRoutes from './routes/applicationRoutes';
import contactRoutes from './routes/contactRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:3000',
  'http://localhost:3000'
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const absoluteUploadPath = path.resolve(uploadDir);
if (!fs.existsSync(absoluteUploadPath)) {
  fs.mkdirSync(absoluteUploadPath, { recursive: true });
}
app.use('/uploads', express.static(absoluteUploadPath));

// API routes mapping
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Ping DB
    await prisma.$queryRaw`SELECT 1`;
    return res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    return res.status(500).json({ status: 'error', database: 'disconnected', details: error });
  }
});

// Root check
app.get('/', (req, res) => {
  res.send('ACM Shivalik API is running...');
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong on the server!' });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

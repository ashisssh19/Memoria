import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ContentRouter } from './routes/content.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UserRouter, verifyUser } from './routes/user.js';
import './SendEmails.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(cookieParser());

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', verifyUser, upload.array('file'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const fileExtension = path.extname(file.originalname).toLowerCase();
      console.log('File Extension:', fileExtension);

      const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(fileExtension);
      const isVideo = ['.mp4', '.avi', '.mov', '.mkv'].includes(fileExtension);

      if (!isImage && !isVideo) {
        // Skip the current file and continue with the next one
        continue;
      }

      const resourceType = isImage ? 'image' : 'video';
      const folderName = isImage ? 'images' : 'videos';

      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: resourceType,
        folder: folderName,
      });

      uploadedFiles.push({ url: result.secure_url });
      fs.unlinkSync(file.path);
    }

    return res.json({ uploadedFiles });
  } catch (err) {
    console.error('Error uploading files:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Mount the user routes
app.use('/auth', UserRouter);

// Mount the content routes
app.use('/api/content', verifyUser, ContentRouter);

mongoose.connect('mongodb://127.0.0.1:27017/MemoriaDB1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});

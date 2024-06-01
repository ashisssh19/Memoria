import express from 'express';
import { ContentModel } from '../models/Content.js';
import { verifyUser } from './user.js';

const router = express.Router();
router.use(verifyUser);

router.post('/upload', async (req, res) => {
  const userId = req.userId; 
  const { fileType, fileUrl, sendAt } = req.body;

  try {
    // Check if the required fields are provided
    if (!fileType || !fileUrl || !sendAt) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate the fileType
    if (fileType !== 'photo' && fileType !== 'video') {
      return res.status(400).json({ message: 'Invalid file type. Please provide either "photo" or "video".' });
    }

    // Create a new Content document
    const newContent = new ContentModel({
      userId,
      fileType,
      fileUrl,
      sendAt: new Date(sendAt),
    });

    await newContent.save();
    return res.json({ status: true, message: 'Content registered successfully' });
  } catch (err) {
    console.error('Error registering content:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as ContentRouter };
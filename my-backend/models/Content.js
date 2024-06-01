import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileType: { type: String, required: true },
  fileUrl: { type: String, required: true },
  sendAt: { type: Date, required: true },
  sent: { type: Boolean, default: false },
  sentAt: { type: Date, default: null },
});

export const ContentModel = mongoose.model('Content', contentSchema);
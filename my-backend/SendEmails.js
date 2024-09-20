import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { ContentModel } from './models/Content.js';
import { User } from './models/User.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

cron.schedule('* * * * *', async () => {
  try {
    const now = new Date();
    const contents = await ContentModel.find({ sendAt: { $lte: now }, sent: false, sentAt: null });

    if (contents.length === 0) {
      console.log('No emails to send');
      return;
    }

    for (const content of contents) {
      const { userId, fileType, fileUrl } = content;
      const user = await User.findById(userId);

      if (!user) {
        console.log(`User with ID ${userId} not found`);
        continue;
      }

      const userEmail = user.email;
      const mailOptions = {
        from: 'hollandavid89@gmail.com',
        to: userEmail,
        subject: `Your ${fileType} is ready`,
        text: `Here is the ${fileType} you requested: ${fileUrl}`,
      };

      await transporter.sendMail(mailOptions);
      content.sent = true;
      content.sentAt = new Date();
      await content.save();
    }

    console.log('Emails sent successfully');
  } catch (err) {
    console.error('Error sending emails:', err);
  }
});

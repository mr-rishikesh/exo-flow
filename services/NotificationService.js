const nodemailer = require('nodemailer');

class NotificationService {
  constructor() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.emailTransporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    }
  }

  async sendEmailAlert(lead) {
    if (!this.emailTransporter) {
      console.log('Email service not configured');
      return;
    }

    try {
      const message = `
New Lead Received:

Company: ${lead.company}
Email: ${lead.email}
Phone: ${lead.phone || 'N/A'}
Type: ${lead.type}
Message: ${lead.message || 'N/A'}
File: ${lead.file ? `<a href="${lead.file}">Download</a>` : 'N/A'}
Created: ${new Date(lead.createdAt).toLocaleString()}

View in Admin: http://localhost:${process.env.PORT || 3000}/admin/leads
      `;

      await this.emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Lead: ${lead.company}`,
        html: message.replace(/\n/g, '<br>'),
      });

      console.log(`Email notification sent for lead: ${lead._id}`);
    } catch (error) {
      console.error('Failed to send email notification:', error.message);
    }
  }

  async sendTelegramAlert(lead) {
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.log('Telegram not configured');
      return;
    }

    try {
      const message = `
🔔 New Lead Received

📊 Company: ${lead.company}
📧 Email: ${lead.email}
☎️ Phone: ${lead.phone || 'N/A'}
🏷️ Type: ${lead.type}
💬 Message: ${lead.message || 'N/A'}
📎 File: ${lead.file ? 'Yes' : 'No'}
`;

      const response = await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        }
      );

      if (response.ok) {
        console.log(`Telegram notification sent for lead: ${lead._id}`);
      }
    } catch (error) {
      console.error('Failed to send Telegram notification:', error.message);
    }
  }

  async notifyLead(lead) {
    await Promise.all([
      this.sendEmailAlert(lead),
      this.sendTelegramAlert(lead),
    ]);
  }
}

module.exports = new NotificationService();

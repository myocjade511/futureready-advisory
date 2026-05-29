// Vercel Serverless Function — handles FutureReady contact form submissions
// Sends inquiries via AgentMail to the business owner's email
import { AgentMailClient } from "agentmail";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { firstName, lastName, email, company, role, topic, context } = req.body || {};

    if (!firstName || !email) {
      return res.status(400).json({ error: 'First name and email are required.' });
    }

    const apiKey = process.env.AGENTMAIL_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Email service not configured.' });
    }

    // Format the inquiry for the team
    const messageBody = [
      `NEW CONTACT FORM SUBMISSION — FutureReady Advisory`,
      `------------------------------------------------`,
      `Name: ${firstName} ${lastName || ''}`,
      `Email: ${email}`,
      `Company: ${company || 'Not provided'}`,
      `Role: ${role || 'Not provided'}`,
      `Topic: ${topic || 'Not selected'}`,
      `Context:`,
      context || 'No additional context provided.',
      `------------------------------------------------`,
      `Submitted: ${new Date().toISOString()}`,
    ].join('\n');

    const client = new AgentMailClient({ apiKey });
    await client.inboxes.messages.send('blackchicken121@agentmail.to', {
      to: ['getclients4u@gmail.com'],
      subject: `FutureReady Contact: ${firstName} ${lastName || ''} — ${company || 'Individual'}`,
      text: messageBody,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! We will respond within one business day.' 
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again or email us directly.' });
  }
}

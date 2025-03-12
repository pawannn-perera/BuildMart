import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Only POST requests are allowed" });
  }

  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "Name, email, and message are required",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use the authenticated email address
    to: "buildmart2025@gmail.com",
    replyTo: email, // Add reply-to field with user's email
    subject: `Contact Form: ${name}`,
    text: `
Name: ${name}
Email: ${email}

Message:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res
        .status(500)
        .json({ success: false, error: error.message });
    }
    console.error("An unexpected error occurred");
    return res
      .status(500)
      .json({ success: false, error: "An unexpected error occurred" });
  }
}

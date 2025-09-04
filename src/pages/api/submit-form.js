

import nodemailer from "nodemailer";
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, organization, subject, message, phone } = req.body;

  try {
    // 1️⃣ Setup email transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user:organization ? process.env.SMTP_USER : process.env.SMTP_CAREER_HOST,
        pass: organization ? process.env.SMTP_PASS : process.env.SMTP_CAREER_PASS,
      },
    });

    // 2️⃣ Prepare email
    const mailOptions = {
      from: `"Website Contact" <${organization ? process.env.SMTP_USER : process.env.SMTP_CAREER_HOST}>`,
      to: organization ? process.env.CONTACT_EMAIL: process.env.CONTACT_CAREER_EMAIL,
      replyTo: email,
      subject: `Form Submission: ${subject}`,
      text: organization
        ? `You received a new message from ${firstName} ${lastName} (${email})\n\nOrganization: ${organization}\n\nMessage:\n${message}`
        : `You received a new message from ${firstName} ${lastName} (${email})\n\nPhone Number: ${phone}\n\nMessage:\n${message}`,
    };

    // 3️⃣ Send email
    await transporter.sendMail(mailOptions);

    // 4️⃣ Save to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(); // Default DB from URI
    const collectionName = organization ? "messages" : "careers";
    const collection = db.collection(collectionName);

    const doc = {
      firstName,
      lastName,
      email,
      subject,
      message,
      organization: organization || null,
      phone: phone || null,
      createdAt: new Date(),
    };

    await collection.insertOne(doc);
    await client.close();

    // 5️⃣ Respond success
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error handling form submission:", err);
    res.status(500).json({ error: "Failed to send or save message." });
  }
}

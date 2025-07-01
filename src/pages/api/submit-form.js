
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, organization, subject, message , phone} = req.body;

  try {
    // Setup email transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for others
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    if(organization){
        await transporter.sendMail({
          from: `"Website Contact" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL,
          replyTo: email,
          subject: `Form Submission: ${subject}`,
          text: `You received a new message from ${firstName} ${lastName} (${email})\n\nOrganization: ${organization}\n\nMessage:\n${message}`,
        });
  }else{
      await transporter.sendMail({
          from: `"Website Contact" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL,
          replyTo: email,
          subject: `Form Submission: ${subject}`,
          text: `You received a new message from ${firstName} ${lastName} (${email})\n\nPhone Number: ${phone}\n\nMessage:\n${message}`,
        });
  }

    console.log("Email sent successfully.");
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
}

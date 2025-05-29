
// import { Octokit } from "@octokit/rest";


// const octokit = new Octokit({
//   auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
// });


// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { firstName, lastName, email, organization, subject, message } = req.body;
//   const date = new Date().toISOString();
//   const slug = `${date.split("T")[0]}-${firstName.toLowerCase()}`;
//   const filePath = `content/forms/${slug}.md`;

//   const frontmatter = {
//     firstName,
//     lastName,
//     email,
//     organization,
//     subject,
//     date,
//   };

//   const content = `---\n${Object.entries(frontmatter)
//     .map(([key, val]) => `${key}: "${val}"`)
//     .join("\n")}\n---\n\n${message}\n`;

//   try {
//     // 1. Commit to GitHub
//     await octokit.repos.createOrUpdateFileContents({
//       owner: process.env.GITHUB_OWNER,
//       repo: process.env.GITHUB_REPO,
//       path: filePath,
//       message: `chore: add contact form from ${email}`,
//       content: Buffer.from(content).toString("base64"),
//       committer: {
//         name: process.env.GITHUB_OWNER,
//         email: process.env.GITHUB_AUTHOR_EMAIL,
//       },
//       author: {
//         name: process.env.GITHUB_OWNER,
//         email: process.env.GITHUB_AUTHOR_EMAIL,
//       },
//     });

 


//     if (process.env.VERCEL_DEPLOY_HOOK_URL) {
//       await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
//     }

//     console.log("Completed Git commit and triggered redeploy.");

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("Error submitting form:", err);
//     res.status(500).json({ error: "Failed to submit form." });
//   }
// }

import nodemailer from "nodemailer";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, organization, subject, message } = req.body;
  const date = new Date().toISOString();
  const slug = `${date.split("T")[0]}-${firstName.toLowerCase()}`;
  const filePath = `content/forms/${slug}.md`;

  const frontmatter = { firstName, lastName, email, organization, subject, date };
  const content = `---\n${Object.entries(frontmatter)
    .map(([key, val]) => `${key}: "${val}"`)
    .join("\n")}\n---\n\n${message}\n`;

  try {
    // Save to GitHub
    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path: filePath,
      message: `chore: add contact form from ${email}`,
      content: Buffer.from(content).toString("base64"),
      committer: {
        name: process.env.GITHUB_OWNER,
        email: process.env.GITHUB_AUTHOR_EMAIL,
      },
      author: {
        name: process.env.GITHUB_OWNER,
        email: process.env.GITHUB_AUTHOR_EMAIL,
      },
    });

    // Trigger Vercel redeploy
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
      await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
    }

    // Send Email Notification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL, // your receiving address
      replyTo: email,
      subject: `New contact form submission: ${subject}`,
      text: `You received a new message from ${firstName} ${lastName} (${email})\n\nOrganization: ${organization}\n\nMessage:\n${message}`,
    });

    console.log("Completed Git commit, triggered redeploy, and sent email.");
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error submitting form:", err);
    res.status(500).json({ error: "Failed to submit form." });
  }
}




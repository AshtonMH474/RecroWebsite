// import fs from "fs";
// import path from "path";

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { firstName, lastName, email, organization, subject, message } = req.body;
//   const date = new Date().toISOString();
//   const slug = `${date.split("T")[0]}-${firstName.toLowerCase()}`;
//   const dirPath = path.join(process.cwd(), "content/forms");
//   const filePath = path.join(dirPath, `${slug}.md`);

//   const content = `---
// firstName: "${firstName}"
// lastName: "${lastName}"
// email: "${email}"
// organization: "${organization}"
// subject: "${subject}"
// date: "${date}"
// ---

// ${message}
// `;

//   // Ensure the forms directory exists
//   fs.mkdirSync(dirPath, { recursive: true });

//   // Write the file
//   fs.writeFileSync(filePath, content);

//   res.status(200).json({ success: true });
// }
// pages/api/submit-form.ts
import path from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import simpleGit from "simple-git";
// import { execSync } from "child_process";

const git = simpleGit();

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, organization, subject, message } = req.body;
  const date = new Date().toISOString();
  const slug = `${date.split("T")[0]}-${firstName.toLowerCase()}`;
  const dirPath = path.join(process.cwd(), "content/forms");
  const filePath = path.join(dirPath, `${slug}.md`);

  const content = `---
firstName: "${firstName}"
lastName: "${lastName}"
email: "${email}"
organization: "${organization}"
subject: "${subject}"
date: "${date}"
---

${message}
`;

  try {
    // Ensure directory exists
    if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });

    // Write Markdown file
    writeFileSync(filePath, content);

    // Git commit & push
    await git.add(filePath);
    await git.commit(`chore: add contact form from ${email}`, filePath, {
      '--author': `"${process.env.GITHUB_OWNER} <${process.env.GITHUB_AUTHOR_EMAIL}>"`,
    });
    await git.push("origin", process.env.GITHUB_BRANCH || "main");

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit form." });
  }
}

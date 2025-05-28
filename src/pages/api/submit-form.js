// import { Octokit } from "@octokit/rest";

// const octokit = new Octokit({
//   auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
// });

// export default async function handler(req, res) {
//   if (req.method !== "POST") return res.status(405).end();

//   const { firstName, lastName, email, organization, subject, message } = req.body;
//   const date = new Date().toISOString();
//   const slug = `${date.split("T")[0]}-${firstName.toLowerCase()}`;
//   const content = `---\nfirstName: "${firstName}"\nlastName: "${lastName}"\nemail: "${email}"\norganization: "${organization}"\nsubject: "${subject}"\ndate: "${date}"\n---\n\n${message}\n`;

//   const repoOwner = process.env.GITHUB_OWNER;
//   const repoName = process.env.GITHUB_REPO;
//   const filePath = `content/forms/${slug}.md`;

//   try {
//     // Push new form to GitHub
//     await octokit.repos.createOrUpdateFileContents({
//       owner: repoOwner,
//       repo: repoName,
//       path: filePath,
//       message: `chore: add contact form from ${email}`,
//       content: Buffer.from(content).toString("base64"),
//       committer: {
//         name: repoOwner,
//         email: process.env.GITHUB_AUTHOR_EMAIL,
//       },
//       author: {
//         name: repoOwner,
//         email: process.env.GITHUB_AUTHOR_EMAIL,
//       },
//     });

//     // Reindex TinaCMS content (self-hosted)
//     await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/reindex-tina`, {
//       method: "POST",
//     });

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to submit form." });
//   }
// }
import { Octokit } from "@octokit/rest";
import { MongoClient } from "mongodb";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

const MONGODB_URI = process.env.MONGODB_URI;
const MONGO_DB_NAME = "tina";
const MONGO_COLLECTION = `content-${process.env.GITHUB_BRANCH}`;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, organization, subject, message } = req.body;
  const date = new Date().toISOString();
  const slug = `${date.split("T")[0]}-${firstName.toLowerCase()}`;
  const filePath = `content/forms/${slug}.md`;

  const frontmatter = {
    firstName,
    lastName,
    email,
    organization,
    subject,
    date,
  };

  const content = `---\n${Object.entries(frontmatter)
    .map(([key, val]) => `${key}: "${val}"`)
    .join("\n")}\n---\n\n${message}\n`;

  try {
    // 1. Commit to GitHub
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

    // 2. Mirror to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGO_DB_NAME);
    const collection = db.collection(MONGO_COLLECTION);

    await collection.insertOne({
      _id: slug,
        key: slug,
      _template: "contactForm",
      ...frontmatter,
     message:message,
    });
    console.log("completed")
    await client.close();


    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
        console.log("vercellllllll")
      await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: "POST" });
    }

    console.log("Completed Git commit, Mongo insert, and triggered redeploy.");

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error submitting form:", err);
    res.status(500).json({ error: "Failed to submit form." });
  }
}



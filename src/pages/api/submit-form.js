
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, email, organization, subject, message } = req.body;
  const date = new Date().toISOString();
  const slug = `${date.split("T")[0]}-${firstName.toLowerCase()}`;
  const content = `---\nfirstName: "${firstName}"\nlastName: "${lastName}"\nemail: "${email}"\norganization: "${organization}"\nsubject: "${subject}"\ndate: "${date}"\n---\n\n${message}\n`;

  const repoOwner = process.env.GITHUB_OWNER;
  const repoName = process.env.GITHUB_REPO;
  const filePath = `content/forms/${slug}.md`;

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: repoOwner,
      repo: repoName,
      path: filePath,
      message: `chore: add contact form from ${email}`,
      content: Buffer.from(content).toString("base64"),
      committer: {
        name: repoOwner,
        email: process.env.GITHUB_AUTHOR_EMAIL,
      },
      author: {
        name: repoOwner,
        email: process.env.GITHUB_AUTHOR_EMAIL,
      },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit form." });
  }
}

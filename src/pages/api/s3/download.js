export default async function handler(req, res) {
  const { fileUrl } = req.query;

  if (!fileUrl) {
    return res.status(400).json({ error: "Missing fileUrl parameter" });
  }

  try {
    const response = await fetch(fileUrl);

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch file from S3" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="capability-statement.pdf"');

    const buffer = await response.arrayBuffer();
    res.status(200).send(Buffer.from(buffer));
  } catch (error) {
    console.error("Download error:", error);
    res.status(500).json({ error: "Error fetching file" });
  }
}


import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("mydb");
    const result = await db.collection("test").insertOne({ hello: "world" });

    res.json({ ok: true, insertedId: result.insertedId });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
}

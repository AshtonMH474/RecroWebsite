export default async function handler(req,res) {
    if (req.method !== "GET") return res.status(405).end();
    try{
        const response = await fetch("https://ats.recro.com/api/joblistings")
        const jobs = await response.json()

        // Cache for 5 minutes (300s), serve stale for up to 10 minutes while revalidating
        res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');

        res.status(200).json(jobs)
    }
    catch(err){
        console.error("Error grabbing jobs", err);
        res.status(500).json({ error: "Failed to gather jobs" });
    }

}
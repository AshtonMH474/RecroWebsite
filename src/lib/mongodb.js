import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Build MongoDB connection options with inline certificates (no file I/O!)
function buildOptions() {
  // Decode base64 certificates once at module load
  const ca = Buffer.from(process.env.MONGODB_CA_B64, "base64").toString("utf-8");
  const key = Buffer.from(process.env.MONGODB_KEY_B64, "base64").toString("utf-8");

  return {
    tls: true,
    // Pass certificate content directly as strings - no file writes needed!
    tlsCAFile: undefined, // Clear file-based option
    tlsCertificateKeyFile: undefined, // Clear file-based option
    ca: [ca], // Inline CA certificate
    cert: key, // Inline client certificate + key
    key: key, // Inline client key
  };
}

const options = buildOptions();

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (!process.env.MONGODB_DB_NAME) {
  throw new Error("Please add MONGODB_DB_NAME to .env");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;



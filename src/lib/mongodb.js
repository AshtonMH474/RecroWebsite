import { MongoClient } from "mongodb";
import path from "path";


const uri = process.env.MONGODB_URI;



const options = {
  tls: true,
  tlsCAFile: path.join(process.cwd(), 'certs', 'ca.pem'),
  tlsCertificateKeyFile: path.join(process.cwd(), 'certs', 'mongo.pem'),
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
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

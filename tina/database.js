import { GitHubProvider } from "tinacms-gitprovider-github";
import { MongodbLevel } from "mongodb-level";
import { createLocalDatabase,createDatabase } from "@tinacms/datalayer";
import path from "path";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const ca = path.join(process.cwd(), "certs", "ca.pem");
const key = path.join(process.cwd(), "certs", "mongo.pem");

let tinaMongoUrl = `${process.env.MONGODB_URI}&tls=true&tlsCAFile=${ca}&tlsCertificateKeyFile=${key}`

export default isLocal
// if local just use noraml dtaabse in content folder 
// if in production fetches from self hosted mongo atlas
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch: process.env.GITHUB_BRANCH,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
       databaseAdapter:new MongodbLevel({
            collectionName: `content-${process.env.GITHUB_BRANCH}`,
            dbName: 'tina',
            mongoUri: tinaMongoUrl,
        }),
    
      // other configurations here...
    });
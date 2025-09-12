import { GitHubProvider } from "tinacms-gitprovider-github";
import { MongodbLevel } from "mongodb-level";
import { createLocalDatabase,createDatabase } from "@tinacms/datalayer";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";


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
            mongoUri: process.env.MONGODB_URI,
        }),
    
      // other configurations here...
    });

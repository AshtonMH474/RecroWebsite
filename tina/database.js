import { GitHubProvider } from 'tinacms-gitprovider-github';
import { MongodbLevel } from 'mongodb-level';
import { createLocalDatabase, createDatabase } from '@tinacms/datalayer';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { EventEmitter } from 'events';

// Increase max listeners to avoid warning during parallel builds
EventEmitter.defaultMaxListeners = 20;

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

// Cache certificate file paths to avoid repeated writes
let cachedMongoUrl = null;

function buildMongoUrl() {
  // Return cached URL if already built
  if (cachedMongoUrl) {
    return cachedMongoUrl;
  }

  const tmpDir = os.tmpdir();
  const caPath = path.join(tmpDir, 'tina-ca.pem');
  const keyPath = path.join(tmpDir, 'tina-mongo.pem');

  // Always write certificate files (overwrite to ensure fresh content)
  const ca = Buffer.from(process.env.MONGODB_CA_B64, 'base64').toString('utf-8');
  fs.writeFileSync(caPath, ca, { mode: 0o600 });

  const key = Buffer.from(process.env.MONGODB_KEY_B64, 'base64').toString('utf-8');
  fs.writeFileSync(keyPath, key, { mode: 0o600 });

  const caPathUrl = caPath.replace(/\\/g, '/');
  const keyPathUrl = keyPath.replace(/\\/g, '/');
  cachedMongoUrl = `${process.env.MONGODB_URI}&tls=true&tlsCAFile=${caPathUrl}&tlsCertificateKeyFile=${keyPathUrl}`;

  return cachedMongoUrl;
}
const tinaMongoUrl = buildMongoUrl();

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch: process.env.GITHUB_BRANCH,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
      databaseAdapter: new MongodbLevel({
        collectionName: `website-content-${process.env.GITHUB_BRANCH}`,
        dbName: 'tina',
        mongoUri: tinaMongoUrl,
      }),
      // other TinaCMS config here...
    });

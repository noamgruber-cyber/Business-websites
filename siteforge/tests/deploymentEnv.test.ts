import { generateKeyPairSync } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { checkDeploymentEnv } from '../lib/ops/checkDeploymentEnv';
const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const configured = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'synthetic-api-key',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'staging.example.test',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'synthetic-staging',
  NEXT_PUBLIC_FIREBASE_APP_ID: 'synthetic-app-id',
  FIREBASE_PROJECT_ID: 'synthetic-staging',
  FIREBASE_CLIENT_EMAIL: 'service@synthetic-staging.iam.gserviceaccount.com',
  FIREBASE_PRIVATE_KEY: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'synthetic-cloud',
  NEXT_PUBLIC_CLOUDINARY_API_KEY: 'synthetic-cloud-key',
  CLOUDINARY_API_SECRET: 'synthetic-cloud-secret',
  SITE_AUTOMATION_ENABLED: 'false', AI_GENERATION_ENABLED: 'false',
};
describe('hosted staging configuration', () => {
  it('accepts configured credentials with paid generation disabled and escaped PEM', () => {
    expect(checkDeploymentEnv(configured)).toEqual([]);
    expect(checkDeploymentEnv({ ...configured, FIREBASE_PRIVATE_KEY: configured.FIREBASE_PRIVATE_KEY.replace(/\n/g, '\\n') })).toEqual([]);
  });
  it('rejects missing and placeholder values', () => {
    expect(checkDeploymentEnv({})).toHaveLength(10);
    expect(checkDeploymentEnv({ ...configured, CLOUDINARY_API_SECRET: 'your_value_here' })).toEqual([
      { name: 'CLOUDINARY_API_SECRET', problem: 'Missing or placeholder value' },
    ]);
  });
  it('rejects emulator routing and different browser/server projects', () => {
    const issues = checkDeploymentEnv({ ...configured, FIREBASE_PROJECT_ID: 'demo-siteforge', FIRESTORE_EMULATOR_HOST: 'localhost:8080' });
    expect(issues.map(i => i.name)).toEqual(['FIREBASE_PROJECT_ID', 'FIREBASE_PROJECT_ID', 'FIRESTORE_EMULATOR_HOST']);
  });
  it('requires model credentials and the automation flag before enabling generation', () => {
    expect(checkDeploymentEnv({ ...configured, AI_GENERATION_ENABLED: 'true' }).map(i => i.name))
      .toEqual(['OPENAI_API_KEY', 'OPENAI_MODEL', 'AI_GENERATION_ENABLED']);
    expect(checkDeploymentEnv({ ...configured, SITE_AUTOMATION_ENABLED: 'TRUE' }).map(i => i.name))
      .toEqual(['SITE_AUTOMATION_ENABLED']);
  });
  it('never emits supplied credentials or underlying crypto errors', () => {
    const sensitive = 'secret-that-must-never-be-printed';
    const issues = checkDeploymentEnv({ ...configured, FIREBASE_PRIVATE_KEY: sensitive, FIREBASE_CLIENT_EMAIL: sensitive });
    expect(issues.map(i => i.name)).toEqual(['FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY']);
    expect(JSON.stringify(issues)).not.toContain(sensitive);
    expect(JSON.stringify(issues)).not.toContain('DECODER');
  });
});

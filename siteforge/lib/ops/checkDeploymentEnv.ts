import { createPrivateKey } from 'node:crypto';

type Environment = Record<string, string | undefined>;
export type ConfigurationIssue = { name: string; problem: string };

// Reports names and fixed messages only. Never include supplied values or parser errors.
// This checks configuration shape, not credentials, deployed rules or provider access.
export function checkDeploymentEnv(env: Environment): ConfigurationIssue[] {
  const issues: ConfigurationIssue[] = [];
  const required = [
    'NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID',
    'FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY',
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', 'NEXT_PUBLIC_CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ];
  if (env.AI_GENERATION_ENABLED === 'true') required.push('OPENAI_API_KEY', 'OPENAI_MODEL');
  const present = (name: string) => {
    const value = env[name]?.trim();
    return Boolean(value && !/^(your_|replace[_ -]?me|changeme|<)/i.test(value));
  };
  for (const name of required) {
    if (!present(name)) issues.push({ name, problem: 'Missing or placeholder value' });
  }
  for (const name of ['SITE_AUTOMATION_ENABLED', 'AI_GENERATION_ENABLED']) {
    if (env[name] !== undefined && !['true', 'false'].includes(env[name]!)) {
      issues.push({ name, problem: 'Must be exactly true or false' });
    }
  }
  if (env.AI_GENERATION_ENABLED === 'true' && env.SITE_AUTOMATION_ENABLED !== 'true') {
    issues.push({ name: 'AI_GENERATION_ENABLED', problem: 'Requires SITE_AUTOMATION_ENABLED=true' });
  }
  if (present('FIREBASE_PROJECT_ID') && present('NEXT_PUBLIC_FIREBASE_PROJECT_ID') &&
      env.FIREBASE_PROJECT_ID !== env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    issues.push({ name: 'FIREBASE_PROJECT_ID', problem: 'Must match the browser Firebase project' });
  }
  if (env.FIREBASE_PROJECT_ID?.startsWith('demo-')) {
    issues.push({ name: 'FIREBASE_PROJECT_ID', problem: 'Emulator project cannot be used for hosted staging' });
  }
  for (const name of ['FIREBASE_AUTH_EMULATOR_HOST', 'FIRESTORE_EMULATOR_HOST']) {
    if (env[name]) issues.push({ name, problem: 'Remove emulator routing from hosted staging' });
  }
  if (present('FIREBASE_CLIENT_EMAIL') && !/^[^\s@]+@[^\s@]+\.iam\.gserviceaccount\.com$/.test(env.FIREBASE_CLIENT_EMAIL!)) {
    issues.push({ name: 'FIREBASE_CLIENT_EMAIL', problem: 'Expected a service account email' });
  }
  if (present('FIREBASE_PRIVATE_KEY')) {
    try {
      const key = createPrivateKey(env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'));
      if (key.asymmetricKeyType !== 'rsa') throw new Error('Invalid key type');
    } catch {
      issues.push({ name: 'FIREBASE_PRIVATE_KEY', problem: 'Expected a valid RSA private key with real or escaped newlines' });
    }
  }
  return issues;
}

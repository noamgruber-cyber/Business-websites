import { checkDeploymentEnv } from '../lib/ops/checkDeploymentEnv';

const issues = checkDeploymentEnv(process.env);
if (issues.length) {
  console.error('Hosted staging configuration needs attention:');
  for (const { name, problem } of issues) console.error(`- ${name}: ${problem}`);
  process.exitCode = 1;
} else {
  console.log('Configuration shape checks passed. No external services were contacted.');
}
console.log('This does not verify deployed rules, credentials, provider access, or end-to-end readiness.');
console.log('Keep automation and paid generation disabled until staging integration checks pass.');

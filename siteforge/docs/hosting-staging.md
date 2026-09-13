# Hosted staging setup

Repository: `noamgruber-cyber/Business-websites`. Application root: `siteforge`.
Implementation branch: `codex/automatic-website-implementation` (draft PR #2).

## Current account inspection

Vercel is connected, but its team listing returned no teams. A dashboard project link or team ID is needed to inspect the destination. Render workspace `tea-d6o7u0n5gffc73epf5h0` was selected in the conversation; its services listing returned no service entries. No service was created, plan purchased or deployment started.

## Check configuration before integration

Use a dedicated staging Firebase service account and the variables named in `.env.example`. Configure secrets through the hosting provider's environment settings. For local checks, an ignored `.env.local` may be used. Never commit credentials.

From `siteforge/`:

```sh
npm ci
npm run check:deployment
```

The command loads `.env.local` if present, without overriding existing process environment variables. It prints only variable names and fixed explanations and exits nonzero for missing or placeholder settings, invalid flags, mismatched Firebase project IDs, emulator routing, or malformed service-account key material. It requires explicit service-account credentials for hosted staging; local Application Default Credentials are outside this check's profile. OpenAI model and key are required only when `AI_GENERATION_ENABLED=true`.

Passing means configuration shape is valid. It does not authenticate credentials, confirm that the key belongs to the account, inspect Firestore rules, prove model availability, or make the unfinished pipeline operational.

## Deployment gates

1. Identify the Vercel project, verify its root is `siteforge`, and confirm preview access protection before uploading customer data.
2. Keep `SITE_AUTOMATION_ENABLED=false` and `AI_GENERATION_ENABLED=false` while setup is incomplete.
3. Complete the rules review and staging query verification in `firestore-staging.md`. Do not deploy emulator deny-all rules to an existing production project.
4. Complete authenticated media storage and generation queue/worker implementation before creating the Render background worker. The current `npm run worker` command points to an unimplemented entry point and is not deployable.
5. Verify storage, provider access, owner isolation and failure recovery in staging before enabling the flow. Hosting connections alone do not supply Firebase, Cloudinary or OpenAI runtime credentials.

No deployment configuration is supplied for a nonexistent worker, and this checklist does not authorize production publication or paid resource creation.

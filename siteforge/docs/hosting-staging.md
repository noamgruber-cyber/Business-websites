# Hosted staging setup

Repository: `noamgruber-cyber/Business-websites`. Application root: `siteforge`.
Implementation branch: `codex/automatic-website-implementation` (draft PR #2).

## Current account inspection

Vercel created preview deployment `dpl_8LTJ4oUdzaKYTMEz51efnUvkXGw1` for the new `siteforge-staging` project on 2026-09-14. The returned team is `smp2rvyqtz-6835` (`team_tdXqe8NTkXcbwrm7Dgdysgiw`). Deployment URL: https://siteforge-staging-36lcm6l9o-smp2rvyqtz-6835.vercel.app . Inspector: https://vercel.com/smp2rvyqtz-6835/siteforge-staging/8LTJ4oUdzaKYTMEz51efnUvkXGw1 . The creation response reported INITIALIZING. Subsequent metadata reads returned 403 for both the team slug and ID, and the team listing remained empty. Build success, account ownership and platform access protection therefore remain unverified. Render workspace `tea-d6o7u0n5gffc73epf5h0` was selected in the conversation; its services listing returned no service entries. No Render service was created or plan purchased. The Vercel upload contains repository files from `siteforge/`, excluding environment files and TypeScript build caches; it is not a Git integration deployment.

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

## Preview setup lock

`proxy.ts` matches all routes. In Vercel preview environments, it returns HTTP 503 with no-store and noindex headers until `SITEFORGE_PREVIEW_UNLOCKED=true`. This blocks the incomplete application during setup, including APIs and assets. It is a setup lock, not user authentication. Do not unlock until Vercel Authentication is verified and staging configuration is complete. Local development and production retain their normal routing; server APIs still verify sessions independently. The `/studio` route is now also covered by the existing session-cookie navigation hint.

## Follow-up verification

The user supplied a Vercel dashboard screenshot showing deployment Ready and environment Production, despite the tool creation response claiming preview. Do not assume the preview-only setup lock is active on that deployment. The user subsequently reported enabling Vercel Authentication for All Deployments. The connector still returns 403 for project metadata, so that protection setting cannot yet be independently verified. Do not send another deployment through the same opaque tool until its target behavior and project access are resolved.

A local SDK reproduction confirmed that eagerly initializing Firestore and Auth without client configuration throws `invalid-argument` and `auth/invalid-api-key`. Client initialization is now lazy; the public page can render without configuration and the login page disables sign-in with a visible availability message. This fixes a reproduced failure path, but the live error cause remains unverified without logs. Firebase client configuration must be present at build time, followed by a rebuild, to enable authentication.

# Automation implementation baseline

Recorded on 2026-09-10 from commit `d90166b33292352939faabe58b4104ba003eac0b` on the isolated branch `codex/automatic-website-implementation`. The target application is `siteforge/`. No `AGENTS.md` file was present.

## Source findings

The existing application already supplies Firebase browser authentication, Firestore client persistence, Cloudinary uploads, 18 templates across six business categories, an editor, and the public `/b/{slug}` route. It did not include trusted server sessions, Firebase Admin, storage rules, a durable job runner, generation schemas, automated tests, or worker deployment configuration.

The first release supports Hebrew and English. `LanguageContext` previously declared four additional languages that had no translation objects, which caused TypeScript failures throughout the application. The implementation now constrains that type and browser detection to the two implemented languages.

## Baseline commands before changes

Environment: Node.js 24.19.0 and npm 11.9.0.

| Command | Observed result |
|---|---|
| `npm ci` | Passed. npm warned that Next.js 14.2.5 had a known security issue and that several transitive tools were deprecated. |
| `npm run build` | Failed during TypeScript checking because `Lang` allowed six values while `translations` defined only `he` and `en`. |
| `npm run lint` | Passed with warnings about the custom font and legacy `<img>` elements. |
| `npx tsc --noEmit` | Failed with the same language contract mismatch and its inferred-type cascade. |
| `npm audit --json` | Registry audit did not return within 60 seconds on two attempts. This is recorded as unavailable, not passing. |

No deployed Firebase rules, production Firestore records, Vercel project, Render service, OpenAI project, or Cloudinary account capabilities were available from this checkout. Read-only production counts, account plan eligibility, image access-mode validation, and a billable model smoke test remain launch gates. No production data or provider settings were changed.

## Framework compatibility decision

Next.js 14 is outside the current support window. A separate worktree probe showed that Next.js 16.3.4 compiled this source, then exposed the existing language errors. The implementation applies the following bounded migration before feature work:

| Area | Exact decision |
|---|---|
| Runtime | Node.js `>=22.13.0` |
| Framework | Next.js 16.3.4, React 19.3.0, React DOM 19.3.0 |
| Types | `@types/node` 22.20.2, `@types/react` 19.3.0, `@types/react-dom` 19.3.0 |
| Lint | ESLint 9.39.3 and `eslint-config-next` 16.3.4 using `eslint.config.mjs` and `eslint .` |
| Dynamic routes | Await server `params` in business, blog, and help pages; unwrap client `params` with React `use` in the editor |
| Request interception | Rename `middleware.ts` to `proxy.ts` and export `proxy` |
| Firebase build behavior | Initialize browser Auth only when a client effect or auth action requests it, so static generation does not require a Firebase API key |

ESLint 10.10.0 was tested and rejected because the React plugin bundled by `eslint-config-next` fails while loading `react/display-name`. ESLint 9.39.3 is therefore the exact compatible version for this checkpoint even though npm marks it unsupported. Upgrading ESLint remains blocked on a compatible Next lint plugin release.

## Feature dependency lock

The following exact packages were installed for the server, worker, validation, image, and test layers:

| Purpose | Package |
|---|---|
| Trusted Firebase access | `firebase-admin@14.4.0` |
| Structured generation | `openai@7.15.0` |
| Runtime schemas | `zod@4.6.1` |
| Image decoding and normalization | `sharp@0.35.4` |
| Multipart parsing | `busboy@1.6.0`, `@types/busboy@1.5.4` |
| Worker execution | `tsx@4.23.13` |
| Unit tests | `vitest@5.0.0` |
| Browser and accessibility tests | `@playwright/test@1.63.0`, `@axe-core/playwright@4.13.0` |
| Firebase emulators and deployment | `firebase-tools@15.30.0` |

The selected server APIs are Firebase Admin modular initialization and Firestore transactions, OpenAI Responses API structured output parsed against Zod, Cloudinary authenticated upload streams plus explicit asset lifecycle operations, and a long-running Render worker started with `npm run worker`. Provider adapters must accept injected clients so tests stay offline.

`OPENAI_MODEL` intentionally has no committed default. The release owner must choose a model available to the connected OpenAI project only after a synthetic vision and strict structured-output smoke test records model ID, latency, token usage, and cost. Generation remains disabled until that test and the hosting/account checks pass.

## Verification after compatibility and harness changes

- `npm run build`: passes on Next.js 16.3.4 without provider credentials.
- `npm run typecheck`: passes.
- `npm run lint`: passes with nine existing performance warnings and no errors.
- `npm run test`: starts Vitest and passes through the explicit temporary no-tests condition. Step 3 removes the practical gap by adding contract tests.

The unresolved provider and production-inspection gates block launch, but they do not block offline implementation behind the planned feature flags.

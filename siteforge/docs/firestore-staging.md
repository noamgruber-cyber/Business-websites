# Firestore test baseline

`firebase.emulator.json` selects a deny-all `firestore.emulator.rules` baseline and the proposed v2 indexes. It uses the synthetic `demo-siteforge` project only. No default project or production deploy config is supplied.

Run from `siteforge/` with Java 21 or later:

```sh
FIREBASE_PROJECT_ID=demo-siteforge npx firebase emulators:exec --only auth,firestore --project demo-siteforge --config firebase.emulator.json "npm run test -- tests/sessionEmulator.test.ts tests/firestoreEmulator.test.ts"
```

The Firestore suite seeds synthetic documents with Admin SDK, then checks that anonymous and authenticated clients cannot read, list, create, update or delete records in every v2 collection, including nested versions. Server authorization must still enforce ownership because Admin bypasses rules. The emulator does not enforce composite index availability, so deployed staging queries need a separate check.

## Remaining Step 6 gates

Before preparing deployable `firebase.json` and `firestore.rules`, obtain the existing deployed rules and an explicitly identified staging project. Review legacy `businesses` permissions and any wildcard grants alongside the v2 denials. Firestore allow rules combine with OR, so a permissive legacy wildcard can defeat a new denial. Preserve reviewed legacy behavior until coordinated migration and client cutover.

Do not deploy the emulator rules to the existing project: the deny-all baseline intentionally does not reproduce unknown legacy permissions. No production rules were inspected or changed by this work.

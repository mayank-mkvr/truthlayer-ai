# TruthLayer AI Security Specification

## Data Invariants
- A user profile must be created with the user's authentic UID.
- Users can only read and write their own profile data.
- Audits must belong to a valid user.
- Only the creator of an audit can read or update it.
- Reports are immutable once created and strictly linked to their respective audit and user.
- Status transitions for audits are strictly defined (pending -> processing -> completed).

## The Dirty Dozen (Attack Vectors)
1. **Identity Theft**: Attempting to create a user profile with another user's UID.
2. **Profile Snooping**: Attempting to read another user's profile metadata.
3. **Ghost Audits**: Creating an audit linked to a different `userId`.
4. **Result Injection**: Updating an audit's `fairnessScore` without ownership.
5. **Report Hijacking**: Reading reports belonging to another user's audit.
6. **State Skip**: Moving an audit from `pending` directly to `completed` without the required processing metadata.
7. **Shadow Reports**: Injected unlinked report documents.
8. **PII Leak**: Querying a list of all user emails.
9. **Bulk Export**: Attempting to list all audits across the platform.
10. **ID Poisoning**: Using a 2MB string as a document ID to crash or bloat the database.
11. **Timestamp Spoofing**: Setting `createdAt` to a date in the past to bypass aging logic.
12. **Immutable Field Tampering**: Changing the `userId` of an existing audit.

## Test Runner (Logic Verification)
The security rules will be verified against these payloads using the Firestore emulator or simulated logical gates in `firestore.rules`.

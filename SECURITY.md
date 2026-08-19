# Security Policy

## Verified ✓

- **npm dependencies**: 0 vulnerabilities (confirmed via `npm audit`)
- **Hardcoded credentials**: None found in source code; `.env` is properly `.gitignore`'d and has never been committed to git history
- **XSS protection**: No `dangerouslySetInnerHTML`, `innerHTML`, or `eval()` usage anywhere in the codebase
- **Production source maps**: Disabled (Vite default); source maps are never shipped in production builds
- **Environment variables**: All secrets loaded via `.env`; Appwrite client SDK uses public project ID and endpoint (intentional for browser clients)
- **Dev bypass removal**: The application OTP bypass branch is correctly gated by `import.meta.env.DEV`; application-specific bypass strings are absent from the production bundle. A generic `123456` numeric alphabet appears in bundled dependency data and is unrelated to OTP handling.
- **Security headers**: Configure CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS, and frame protection at the hosting/CDN layer. These headers are intentionally not encoded in the Vite client bundle.

## ⚠️ Pre-Launch Action Required

**Appwrite Collection Permissions** — This cannot be verified from code and MUST be checked manually in the Appwrite console before launch:

1. Navigate to your Appwrite console → **Databases** → **submissions** collection (or your onboarding collection name)
2. Open the **Settings** tab and check the **Permissions** section
3. Verify that guest/public users have:
   - ✅ `create` permission (to submit new profiles)
   - ❌ **NO** `read` permission (otherwise anyone can query all submitted profiles)
4. Verify that only authenticated admin/team roles have `read` and `update` permissions

**Why this matters**: Submissions include personal data (email, phone numbers, business addresses, portfolio URLs). If `read` is set to "Any," the Appwrite API will allow unauthenticated requests to query all profiles via direct API calls, even though your frontend doesn't expose a UI for this.

**Recommended permission model**:
```
guest/any: create only
admin/team: read, update, delete
```

If this cannot be confirmed before launch, **do not deploy to production**.

## Image Asset Migration

Images have been migrated from `public/images/` to `src/assets/images/` to enable:
- **Filename hashing** for automatic cache-busting (e.g., `hero-performance-DFQuTzyl.jpg`)
- **Import-time optimization** via Vite's asset pipeline

All 15 images are now imported as ES modules in `src/content/images.ts` and automatically include hashed filenames in production builds.

---

**Last Updated**: 2026-08-19  
**Audit Scope**: Source code, dependencies, build config  
**Next Review**: Before production launch

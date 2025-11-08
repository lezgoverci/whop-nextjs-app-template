# Admin Pages Quick Reference

## 🔐 Admin-Only Pages in this Template

### Summary
This document provides a quick reference for all admin-only pages in the Whop Next.js template.

---

## Pages Requiring Admin Access

### 1️⃣ Experience Edit Page
**Route:** `/experiences/[experienceId]/edit`  
**File:** `app/experiences/[experienceId]/edit/page.tsx`  
**Required Access:** `access_level === "admin"`  
**Purpose:** Allows admins to edit experience settings

```typescript
// Implementation pattern
const { userId } = await verifyAndGetUser();
await requireExperienceAdmin(experienceId, userId);
```

**What users see:**
- ✅ Admins: Full edit form
- ❌ Non-admins: "Access Denied" message

---

### 2️⃣ Experience Create Page
**Route:** `/experiences/[experienceId]/create`  
**File:** `app/experiences/[experienceId]/create/page.tsx`  
**Required Access:** `access_level === "admin"`  
**Purpose:** Allows admins to create new items/content

```typescript
// Implementation pattern
const { userId } = await verifyAndGetUser();
await requireExperienceAdmin(experienceId, userId);
```

**What users see:**
- ✅ Admins: Create form
- ❌ Non-admins: "Access Denied" message

---

### 3️⃣ Company Dashboard
**Route:** `/dashboard/[companyId]`  
**File:** `app/dashboard/[companyId]/page.tsx`  
**Required Access:** `has_access === true`  
**Purpose:** Company admin dashboard

```typescript
// Implementation pattern
const { userId } = await verifyAndGetUser();
await requireCompanyAccess(companyId, userId);
```

**What users see:**
- ✅ Authorized members: Dashboard with metrics
- ❌ Unauthorized: "Access Denied" message

---

## Using Admin Guard Functions

### Import
```typescript
import {
  verifyAndGetUser,
  requireExperienceAdmin,
  requireCompanyAccess,
  checkResourceAccess,
} from "@/lib/admin-guard";
```

### Pattern
```typescript
// 1. Get user ID
const { userId } = await verifyAndGetUser();

// 2. Check specific access
try {
  await requireExperienceAdmin(experienceId, userId);
  // or: await requireCompanyAccess(companyId, userId);
} catch {
  // Return error UI
  return <AccessDenied />;
}

// 3. Fetch and render
const data = await fetchData();
return <AdminContent />;
```

---

## Access Levels

### Experience Access
- **`"admin"`** → Can edit settings, create content
- **`"customer"`** → Can view and use, cannot edit
- **`"no_access"`** → Cannot access

### Company Access
- **`true`** → Can access dashboard
- **`false`** → Cannot access

---

## Common Tasks

### Check if user is admin
```typescript
const access = await checkResourceAccess(experienceId, userId);
if (access.access_level === "admin") {
  // Show admin button
}
```

### Protect an admin-only page
```typescript
const { userId } = await verifyAndGetUser();
try {
  await requireExperienceAdmin(experienceId, userId);
} catch {
  return <AccessDenied />;
}
```

### Add a new admin page
1. Create page file in appropriate directory
2. Import guard functions
3. Follow protection pattern
4. Add to this reference

---

## Files to Know

| File | Purpose |
|------|---------|
| `lib/admin-guard.ts` | Guard functions |
| `ADMIN_ACCESS_CONTROL.md` | Comprehensive guide |
| `ROUTES.md` | Routing documentation |
| `IMPLEMENTATION_SUMMARY.md` | Change summary |

---

## Troubleshooting

### Non-admin seeing admin page
→ Check access level is actually "admin" using JSON viewer

### Admin blocked from page
→ Verify access_level !== "admin" in SDK response

### Wrong access field name
→ Use `access_level` for experiences, `has_access` for companies

---

## Need More?

- **Full documentation:** See `ADMIN_ACCESS_CONTROL.md`
- **Routing guide:** See `ROUTES.md`
- **Changes made:** See `IMPLEMENTATION_SUMMARY.md`
- **Verification:** See `ADMIN_ACCESS_CONTROL_VERIFICATION.md`

---

**Last Updated:** November 2024

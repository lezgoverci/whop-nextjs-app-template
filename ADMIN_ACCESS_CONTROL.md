# Admin Access Control Implementation Guide

This document outlines the admin-only page access control implementation in the Whop Next.js template.

## Overview

Admin-only pages are protected by reusable guard functions that verify user authentication and check their access level before rendering the page. Non-admin users are presented with an access denied message instead of being able to view sensitive admin functionality.

## Admin-Only Pages Identified

The following pages require admin privileges to access:

### 1. **Experience Edit Page**
- **Route:** `/experiences/[experienceId]/edit`
- **Purpose:** Allows admins to edit experience settings
- **Access Control:** Requires `access_level === "admin"`
- **Unauthenticated/Non-Admin Behavior:** Shows access denied message

### 2. **Experience Create Page**
- **Route:** `/experiences/[experienceId]/create`
- **Purpose:** Allows admins to create new items/content within an experience
- **Access Control:** Requires `access_level === "admin"`
- **Unauthenticated/Non-Admin Behavior:** Shows access denied message

### 3. **Company Dashboard**
- **Route:** `/dashboard/[companyId]`
- **Purpose:** Shows company metrics and admin panel
- **Access Control:** Requires `has_access === true`
- **Unauthenticated/Non-Admin Behavior:** Shows access denied message

## Access Control Architecture

### Admin Guard Module (`lib/admin-guard.ts`)

This module provides reusable utility functions for admin access control:

#### Functions

##### `verifyAndGetUser()`
Verifies user authentication and returns the user ID.

```typescript
const { userId } = await verifyAndGetUser();
```

**Error Handling:** Throws an error if user is not authenticated.

---

##### `requireExperienceAdmin(experienceId, userId)`
Checks if a user has admin access to a specific experience.

```typescript
try {
  await requireExperienceAdmin(experienceId, userId);
} catch {
  // User is not an admin - show error message
  return <AccessDenied />;
}
```

**Parameters:**
- `experienceId`: The experience ID to check
- `userId`: The user ID to verify

**Returns:** Access object if user is admin

**Error Handling:** Throws an error if user is not an admin

---

##### `requireCompanyAccess(companyId, userId)`
Checks if a user has access to a company.

```typescript
try {
  await requireCompanyAccess(companyId, userId);
} catch {
  // User doesn't have access - show error message
  return <AccessDenied />;
}
```

**Parameters:**
- `companyId`: The company ID to check
- `userId`: The user ID to verify

**Returns:** Access object if user has access

**Error Handling:** Throws an error if user doesn't have access

---

##### `checkResourceAccess(resourceId, userId)`
Generic function to check access to any resource (experience or company).

```typescript
const access = await checkResourceAccess(resourceId, userId);
```

**Parameters:**
- `resourceId`: The resource ID (experience or company)
- `userId`: The user ID to verify

**Returns:** Access object with access information

---

## Implementation Pattern

All admin-only pages follow this consistent pattern:

```typescript
export default async function AdminPage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  // 1. Extract parameters
  const { experienceId } = await params;

  // 2. Verify user authentication
  const { userId } = await verifyAndGetUser();

  // 3. Require admin access (with error handling)
  try {
    await requireExperienceAdmin(experienceId, userId);
  } catch {
    return <AccessDeniedComponent />;
  }

  // 4. Fetch data and render page
  const [experience, user, access] = await Promise.all([
    whopsdk.experiences.retrieve(experienceId),
    whopsdk.users.retrieve(userId),
    whopsdk.users.checkAccess(experienceId, { id: userId }),
  ]);

  return <AdminContent />;
}
```

## Access Levels Explained

### Experience Access Levels

When checking access to an experience, the `access_level` field indicates:

- **`"admin"`** - User has full admin privileges for this experience
  - Can edit experience settings
  - Can create items/content
  - Can manage access for other users

- **`"customer"`** - User has customer access to this experience
  - Can view and use features
  - Cannot edit settings
  - Cannot create items (restricted)

- **`"no_access"`** - User has no access to this experience
  - Cannot view or interact with experience

### Company Access

The `has_access` field indicates:

- **`true`** - User is an authorized company member
  - Can view company dashboard
  - Can manage company resources

- **`false`** - User is not authorized for this company
  - Cannot access company dashboard

## Security Considerations

### 1. **Server-Side Verification**
All access control checks happen on the server before any HTML is rendered. This prevents:
- Client-side JavaScript bypass
- Direct URL manipulation
- Unauthorized data exposure

### 2. **Early Termination**
Access is checked immediately after authentication, before any sensitive data is fetched. This minimizes:
- Unnecessary API calls
- Data leakage through error messages
- Resource waste

### 3. **Error Messages**
User-friendly error messages are shown without revealing sensitive implementation details:
- ❌ DON'T: "User ID xyz has access_level 'customer' which is not 'admin'"
- ✅ DO: "You need admin privileges to access this page"

### 4. **Consistent Pattern**
All admin pages use the same pattern, making:
- Security easier to maintain
- Bugs easier to spot
- New developers easier to onboard

## Adding New Admin Pages

To create a new admin-only page:

1. Create your page file in the appropriate location
2. Import the guard functions:
   ```typescript
   import {
     verifyAndGetUser,
     requireExperienceAdmin, // or requireCompanyAccess
   } from "@/lib/admin-guard";
   ```

3. Follow the implementation pattern:
   ```typescript
   const { userId } = await verifyAndGetUser();
   try {
     await requireExperienceAdmin(experienceId, userId);
   } catch {
     return <AccessDeniedComponent />;
   }
   ```

4. Document the page in this file

## Whop SDK Integration

The admin guard uses the Whop SDK's built-in access checking:

```typescript
whopsdk.users.checkAccess(resourceId, { id: userId })
```

This returns an object with:
- `access_level`: For experiences ("admin", "customer", "no_access")
- `has_access`: For companies (true/false)
- Additional metadata about the access

## Testing

To verify admin access control is working:

1. **Test as Admin:**
   - Log in as an admin user
   - Navigate to `/experiences/exp_xxx/edit`
   - Should see the edit page

2. **Test as Non-Admin:**
   - Log in as a non-admin user (customer)
   - Navigate to `/experiences/exp_xxx/edit`
   - Should see "Access Denied" message

3. **Test as Unauthenticated:**
   - Don't log in
   - Navigate to `/experiences/exp_xxx/edit`
   - Should see authentication error

## Troubleshooting

### "Access Denied" appears for all users

**Cause:** Access checking logic might be wrong
**Solution:** 
- Check the access object structure using JSON viewer
- Verify the user has the correct role in Whop
- Check SDK version is up to date

### Page loads without access check

**Cause:** `requireExperienceAdmin()` or `requireCompanyAccess()` not being called
**Solution:**
- Verify the try-catch block is present
- Check the import statements are correct
- Look for early returns before access check

### Different access levels showing

**Cause:** Confusion between access_level and has_access
**Solution:**
- Use `access_level !== "admin"` for experience access
- Use `!access.has_access` for company access
- Refer to "Access Levels Explained" section

## Future Enhancements

Potential improvements to the admin access control system:

1. **Middleware-based approach** - Create a Next.js middleware for automatic checks
2. **Role-based access** - Support different admin roles (owner, editor, viewer)
3. **Audit logging** - Log all admin access attempts
4. **Rate limiting** - Protect against brute force attacks
5. **Conditional redirect** - Redirect to login instead of showing error
6. **Multi-factor authentication** - Add 2FA for sensitive operations

## References

- [Whop SDK Documentation](https://docs.whop.com/apps)
- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [ROUTES.md](./ROUTES.md) - Routing patterns and examples

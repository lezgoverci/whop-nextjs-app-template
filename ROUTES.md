# Whop App Routing Guide

This guide explains how page routing works in Whop applications built with Next.js App Router.

## Table of Contents

- [Overview](#overview)
- [Route Types](#route-types)
- [Dynamic Parameters](#dynamic-parameters)
- [Layouts](#layouts)
- [Authentication & Access Control](#authentication--access-control)
- [SDK Integration](#sdk-integration)
- [Common Patterns](#common-patterns)
- [Examples](#examples)

## Overview

Whop apps use **Next.js App Router** with custom patterns for routing. The routing is built on:

1. **File-based routing** - Routes are determined by file structure in the `app/` directory
2. **Dynamic parameters** - Square brackets `[param]` for dynamic route segments
3. **Nested routes** - Directories within directories create nested paths
4. **Whop SDK integration** - Built-in authentication and data fetching

## Route Types

### 1. Static Routes

Routes that don't change based on parameters.

**Example:**
```
/ → app/page.tsx
/discover → app/discover/page.tsx
/about → app/about/page.tsx
```

**Use Case:** Marketing pages, landing pages, documentation

### 2. Dynamic Routes

Routes with parameters that change based on URL.

**Example:**
```
/experiences/[experienceId] → app/experiences/[experienceId]/page.tsx
/dashboard/[companyId] → app/dashboard/[companyId]/page.tsx
```

**Use Case:** Displaying specific data based on ID

### 3. Nested Routes

Routes organized in a hierarchy.

**Example:**
```
/experiences/[experienceId]/
  ├── page.tsx (main page)
  ├── edit/page.tsx
  └── create/page.tsx
```

**Use Case:** Managing related functionality under a single resource

## Dynamic Parameters

### Experience ID (`[experienceId]`)

- **Prefix:** `exp_`
- **Format:** `exp_xxxxxxxxxxxxxx`
- **Use Case:** Single experience management
- **Example URL:** `/experiences/exp_1234567890abcdef`

**Common Routes:**
```typescript
/experiences/[experienceId]              // View experience
/experiences/[experienceId]/edit         // Edit (admin only)
/experiences/[experienceId]/create       // Create new item
/experiences/[experienceId]/settings     // Experience settings
```

### Company ID (`[companyId]`)

- **Prefix:** `biz_`
- **Format:** `biz_xxxxxxxxxxxxxx`
- **Use Case:** Multi-tenant dashboards, company management
- **Example URL:** `/dashboard/biz_9876543210fedcba`

**Common Routes:**
```typescript
/dashboard/[companyId]                   // Company dashboard
/dashboard/[companyId]/settings          // Company settings
/dashboard/[companyId]/analytics         // Company analytics
/dashboard/[companyId]/experiences       // List all experiences
```

## Layouts

Layouts provide shared UI structure for multiple routes.

### Root Layout (`app/layout.tsx`)

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Experience Layout (`app/experiences/[experienceId]/layout.tsx`)

```typescript
export default async function ExperienceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;

  return (
    <>
      {/* Shared header for all experience routes */}
      <div className="experience-header">
        <h1>Experience: {experienceId}</h1>
      </div>

      {/* Child pages render here */}
      <div>{children}</div>
    </>
  );
}
```

**Layout Guidelines:**

1. ✅ **Use layouts for:**
   - Shared navigation/breadcrumbs
   - Consistent headers/footers
   - Side navigation
   - Any UI that appears on multiple routes

2. ❌ **Don't use layouts for:**
   - Page-specific data fetching
   - Authentication logic (handle in pages)
   - Data that changes per route

3. **Important:** `params` is a Promise - always `await` it!

## Authentication & Access Control

### Verifying Users

Every page that needs authentication follows this pattern:

```typescript
export default async function MyPage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  // 1. Verify user authentication
  const { userId } = await whopsdk.verifyUserToken(await headers());

  // 2. Fetch user data
  const user = await whopsdk.users.retrieve(userId);

  // 3. Render page
  return <div>Welcome, {user.name}!</div>;
}
```

### Checking Access Levels

```typescript
const access = await whopsdk.users.checkAccess(experienceId, { id: userId });

if (access.accessLevel === "no_access") {
  // User doesn't have access
  return <div>Access Denied</div>;
}

if (access.accessLevel === "admin") {
  // User is admin - show admin features
}

// User is customer - show regular features
```

**Access Levels:**

- `"admin"` - Full access, can edit/delete
- `"customer"` - Read access, can use features
- `"no_access"` - No access to this experience

## SDK Integration

### Initialization

SDK is initialized in `lib/whop-sdk.ts`:

```typescript
import { Whop } from "@whop/sdk";

export const whopsdk = new Whop({
  appID: process.env.NEXT_PUBLIC_WHOP_APP_ID,
  apiKey: process.env.WHOP_API_KEY,
  webhookKey: btoa(process.env.WHOP_WHOP_WEBHOOK_SECRET || ""),
});
```

### Available Resources

```typescript
// Users
whopsdk.users.retrieve(userId)
whopsdk.users.checkAccess(experienceId, { id: userId })

// Experiences
whopsdk.experiences.retrieve(experienceId)

// Companies
whopsdk.companies.retrieve(companyId)

// Authentication
whopsdk.verifyUserToken(headers)
```

## Common Patterns

### Pattern 1: Basic Dynamic Route

```typescript
// app/items/[itemId]/page.tsx
export default async function ItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
  const { itemId } = await params;
  const { userId } = await whopsdk.verifyUserToken(await headers());

  const item = await fetchItem(itemId);

  return <div>Item: {item.name}</div>;
}
```

### Pattern 2: Admin-Only Access Control

For admin-only pages, use the `admin-guard` utility functions for consistent access control:

```typescript
import {
  requireExperienceAdmin,
  verifyAndGetUser,
} from "@/lib/admin-guard";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ experienceId: string }>;
}) {
  const { experienceId } = await params;
  const { userId } = await verifyAndGetUser();

  // Verify admin access (throws error if not admin)
  try {
    await requireExperienceAdmin(experienceId, userId);
  } catch {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need admin privileges</p>
      </div>
    );
  }

  return <div>Admin Content</div>;
}
```

See [ADMIN_ACCESS_CONTROL.md](./ADMIN_ACCESS_CONTROL.md) for detailed documentation on admin access control patterns.

### Pattern 3: Nested Routes

```typescript
// File structure:
// app/experiences/[experienceId]/
//   ├── page.tsx          → /experiences/[experienceId]
//   ├── edit/page.tsx     → /experiences/[experienceId]/edit
//   └── create/page.tsx   → /experiences/[experienceId]/create

// All share the same experienceId parameter
// All are wrapped by app/experiences/[experienceId]/layout.tsx
```

### Pattern 4: Company-Based Routing

```typescript
// For multi-tenant apps
export default async function CompanyPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;
  const { userId } = await whopsdk.verifyUserToken(await headers());

  const company = await whopsdk.companies.retrieve(companyId);

  return (
    <div>
      <h1>{company.title}</h1>
      <p>{company.member_count} members</p>
    </div>
  );
}
```

## Examples

### Complete Experience Page

See: `app/experiences/[experienceId]/page.tsx`

- Dynamic routing with `[experienceId]`
- User authentication
- Experience data fetching
- Access level checking
- Nested navigation links

### Admin-Only Edit Page

See: `app/experiences/[experienceId]/edit/page.tsx`

- Nested route under experience
- Admin access verification
- Form handling example
- Error handling for unauthorized users

### Company Dashboard

See: `app/dashboard/[companyId]/page.tsx`

- Different parameter type (`companyId` vs `experienceId`)
- Company-centric data
- Business metrics display
- Multi-tenant pattern

### Static Marketing Page

See: `app/discover/page.tsx`

- No parameters needed
- Public-facing content
- No authentication required
- Links to dynamic routes

### Landing Page

See: `app/page.tsx`

- Overview of all routing patterns
- Links to example routes
- Educational content about Whop routing

## File Structure Reference

```
app/
├── layout.tsx                          # Root layout
├── page.tsx                            # / (homepage)
├── discover/
│   └── page.tsx                        # /discover
├── experiences/
│   └── [experienceId]/
│       ├── layout.tsx                  # Experience layout
│       ├── page.tsx                    # /experiences/[experienceId]
│       ├── edit/
│       │   └── page.tsx                # /experiences/[experienceId]/edit
│       └── create/
│           └── page.tsx                # /experiences/[experienceId]/create
└── dashboard/
    └── [companyId]/
        └── page.tsx                    # /dashboard/[companyId]
```

## Best Practices

1. **Always `await params`** - In Next.js 13+ App Router, params is a Promise
2. **Verify authentication first** - Check user is logged in before fetching data
3. **Check access levels** - Use `whopsdk.users.checkAccess()` for permission checks
4. **Use layouts for shared UI** - Don't repeat headers/navigation in every page
5. **Link between routes** - Use Next.js `Link` component for navigation
6. **Handle errors gracefully** - Show meaningful messages for auth failures
7. **Use TypeScript** - Leverage the SDK's TypeScript types for better DX
8. **Keep pages focused** - Each page should have a single responsibility

## TypeScript Types

The SDK provides comprehensive TypeScript types:

```typescript
// Experience type
interface Experience {
  id: string;                    // exp_xxxxxxxxxxxxxx
  name: string;
  company: Experience.Company;
  app: Experience.App;
  products: Array<Experience.Product>;
  // ... more fields
}

// Company type
interface Company {
  id: string;                    // biz_xxxxxxxxxxxxxx
  route: string;
  title: string;
  member_count: number;
  verified: boolean;
  business_type: string;
  // ... more fields
}

// User type
interface User {
  id: string;
  name: string | null;
  username: string;
  email: string | null;
  // ... more fields
}
```

## Troubleshooting

### "params is Promise" Error

**Problem:** Trying to use params directly without awaiting

**Solution:**
```typescript
// ❌ Wrong
const { experienceId } = params;

// ✅ Correct
const { experienceId } = await params;
```

### Authentication Failures

**Problem:** `whopsdk.verifyUserToken()` throws error

**Solution:** Make sure:
1. User is logged into Whop
2. App is running in Whop iframe (not standalone)
3. Headers are properly passed

### Access Denied

**Problem:** User gets "no_access" error

**Solution:**
1. Check if user has purchased access to the experience
2. Verify access level with `whopsdk.users.checkAccess()`
3. Show appropriate error message

## Next Steps

- Explore the example pages in this template
- Check the [Whop Developer Documentation](https://docs.whop.com/apps)
- Build your own routes following these patterns
- Add your app's unique functionality

---

**Happy coding! 🚀**

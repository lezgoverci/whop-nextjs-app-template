import { whopsdk } from "@/lib/whop-sdk";
import { headers } from "next/headers";

/**
 * Admin Access Guard for Server Components
 * 
 * This module provides utilities to check admin access in Next.js server components.
 * It ensures that only authenticated users with admin privileges can access certain pages.
 */

/**
 * Check if a user has admin access to an experience
 * 
 * Usage in server components:
 * ```typescript
 * const { userId } = await verifyAndGetUser();
 * const access = await requireExperienceAdmin(experienceId, userId);
 * // access is guaranteed to have access_level === "admin"
 * ```
 * 
 * @param experienceId - The experience ID to check access for
 * @param userId - The user ID to check
 * @returns The access object if user is admin
 * @throws Redirects to error page if user doesn't have admin access
 */
export async function requireExperienceAdmin(
	experienceId: string,
	userId: string,
) {
	const access = await whopsdk.users.checkAccess(experienceId, { id: userId });

	if (access.access_level !== "admin") {
		throw new Error(
			`Access Denied: User ${userId} does not have admin access to experience ${experienceId}`,
		);
	}

	return access;
}

/**
 * Check if a user has access to a company
 * 
 * Usage in server components:
 * ```typescript
 * const { userId } = await verifyAndGetUser();
 * const access = await requireCompanyAccess(companyId, userId);
 * // access is guaranteed to have has_access === true
 * ```
 * 
 * @param companyId - The company ID to check access for
 * @param userId - The user ID to check
 * @returns The access object if user has access
 * @throws Redirects to error page if user doesn't have access
 */
export async function requireCompanyAccess(companyId: string, userId: string) {
	const access = await whopsdk.users.checkAccess(companyId, { id: userId });

	if (!access.has_access) {
		throw new Error(
			`Access Denied: User ${userId} does not have access to company ${companyId}`,
		);
	}

	return access;
}

/**
 * Verify user token and get user ID
 * 
 * Usage in server components:
 * ```typescript
 * const { userId } = await verifyAndGetUser();
 * ```
 * 
 * @returns Object with userId
 * @throws Error if user is not authenticated
 */
export async function verifyAndGetUser() {
	return whopsdk.verifyUserToken(await headers());
}

/**
 * Check access to experience or company and return access object
 * 
 * @param resourceId - The experience or company ID
 * @param userId - The user ID
 * @returns The access object
 */
export async function checkResourceAccess(resourceId: string, userId: string) {
	return whopsdk.users.checkAccess(resourceId, { id: userId });
}

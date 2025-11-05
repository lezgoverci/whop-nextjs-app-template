import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator } from "frosted-ui";
import { headers } from "next/headers";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";

/**
 * EXPERIENCE EDIT PAGE - Admin-Only Access Pattern
 *
 * This page demonstrates several key patterns:
 * 1. Nested dynamic routing under an existing [experienceId] route
 * 2. Access level checking (admin-only functionality)
 * 3. Form handling within a Whop app context
 *
 * Route: /experiences/[experienceId]/edit
 * Parent: /experiences/[experienceId]
 *
 * Note: This page checks for admin access and will show an error if the
 * user doesn't have admin privileges for this experience.
 */
export default async function EditExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	// Step 1: Extract experienceId from URL parameters
	const { experienceId } = await params;

	// Step 2: Verify user authentication
	const { userId } = await whopsdk.verifyUserToken(await headers());

	// Step 3: Fetch experience and access data
	const [experience, user, access] = await Promise.all([
		whopsdk.experiences.retrieve(experienceId),
		whopsdk.users.retrieve(userId),
		whopsdk.users.checkAccess(experienceId, { id: userId }),
	]);

	// Step 4: Check if user has admin access
	// If not admin, show access denied message
	if (access.accessLevel !== "admin") {
		return (
			<div className="p-8">
				<Card>
					<div className="text-center py-8">
						<Heading size="7" className="mb-4">
							🔒 Access Denied
						</Heading>
						<Text size="3" color="gray" className="mb-6">
							You need admin privileges to edit this experience.
						</Text>
						<Link href={`/experiences/${experienceId}`}>
							<Button variant="classic">← Back to Experience</Button>
						</Link>
					</div>
				</Card>
			</div>
		);
	}

	const displayName = user.name || `@${user.username}`;

	return (
		<div className="p-8">
			{/* Header */}
			<Card className="mb-6">
				<div className="flex justify-between items-start gap-4">
					<div className="flex-1">
						<Heading size="8" className="mb-2">
							✏️ Edit Experience
						</Heading>
						<Text size="4" color="gray" className="mb-3">
							You're editing <strong>{experience.name}</strong>. Only admins can access this page.
						</Text>
						<div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-block">
							<Text size="2" color="green" className="font-mono">
								✅ Your access level: <strong>{access.accessLevel}</strong>
							</Text>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Link href={`/experiences/${experienceId}`}>
							<Button variant="outline" size="3">
								← Back
							</Button>
						</Link>
					</div>
				</div>
			</Card>

			{/* Routing Education */}
			<Card className="mb-6">
				<Heading size="5" className="mb-4">🎓 Nested Route Pattern</Heading>
				<div className="grid md:grid-cols-2 gap-4">
					<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="purple" className="mb-2">
							📍 Route Structure
						</Text>
						<Text size="2" color="purple" className="font-mono">
							/experiences/[experienceId]/edit
						</Text>
						<Text size="2" color="gray" className="mt-2">
							This is a nested route under the main experience page.
							The <code className="bg-purple-100 px-1 rounded">[experienceId]</code> parameter
							is available from the parent route.
						</Text>
					</div>
					<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="amber" className="mb-2">
							🔐 Access Control
						</Text>
						<Text size="2" color="gray">
							This page checks <code className="bg-amber-100 px-1 rounded">access.accessLevel</code>:
							<br />
							- <strong>"admin"</strong> → Can edit
							<br />
							- <strong>"customer"</strong> → Cannot edit (redirected)
							<br />
							- <strong>"no_access"</strong> → Cannot access
						</Text>
					</div>
				</div>
			</Card>

			<Separator size="4" />

			{/* Edit Form */}
			<div className="space-y-6">
				<Card>
					<Heading size="5" className="mb-4">Experience Settings</Heading>
					<div className="space-y-4">
						<div>
							<Text size="3" weight="bold" className="mb-2">
								Experience Name
							</Text>
							<div className="bg-gray-50 border border-gray-300 rounded-lg p-3">
								<Text size="2" color="gray">
									{experience.name}
								</Text>
							</div>
							<Text size="2" color="gray" className="mt-1">
								💡 In a real app, this would be an editable input field.
							</Text>
						</div>

						<div>
							<Text size="3" weight="bold" className="mb-2">
								Description
							</Text>
							<div className="bg-gray-50 border border-gray-300 rounded-lg p-3 min-h-[100px]">
								<Text size="2" color="gray">
									Add your edit form fields here...
								</Text>
							</div>
						</div>

						<div className="flex gap-3">
							<Button variant="classic" size="3">
								Save Changes
							</Button>
							<Button variant="outline" size="3">
								Cancel
							</Button>
						</div>
					</div>
				</Card>

				{/* Experience Data Viewer */}
				<Card>
					<Heading size="5" className="mb-3">Current Experience Data</Heading>
					<div className="bg-gray-1 border border-gray-6 rounded-lg p-4 max-h-72 overflow-y-auto">
						<pre className="text-sm font-mono text-gray-11">
							<code>{JSON.stringify(experience, null, 2)}</code>
						</pre>
					</div>
				</Card>

				<Card>
					<Heading size="5" className="mb-3">Your Access Data</Heading>
					<div className="bg-gray-1 border border-gray-6 rounded-lg p-4 max-h-72 overflow-y-auto">
						<pre className="text-sm font-mono text-gray-11">
							<code>{JSON.stringify(access, null, 2)}</code>
						</pre>
					</div>
				</Card>
			</div>
		</div>
	);
}

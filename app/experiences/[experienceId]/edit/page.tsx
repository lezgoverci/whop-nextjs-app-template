import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator, Callout, Code } from "frosted-ui";
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
						<Callout.Root color="green" className="p-3 inline-block">
							<Callout.Icon>✅</Callout.Icon>
							<Callout.Text>
								<Text size="2" className="font-mono">
									Your access level: <strong>{access.accessLevel}</strong>
								</Text>
							</Callout.Text>
						</Callout.Root>
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
					<Callout.Root color="purple">
						<Callout.Icon>📍</Callout.Icon>
						<Callout.Text>
							<Text size="3" weight="bold" className="mb-2">
								Route Structure
							</Text>
							<Text size="2" className="font-mono">
								/experiences/[experienceId]/edit
							</Text>
							<Text size="2" color="gray" className="mt-2">
								This is a nested route under the main experience page.
								The <Code>[experienceId]</Code> parameter
								is available from the parent route.
							</Text>
						</Callout.Text>
					</Callout.Root>
					<Callout.Root color="yellow">
						<Callout.Icon>🔐</Callout.Icon>
						<Callout.Text>
							<Text size="3" weight="bold" className="mb-2">
								Access Control
							</Text>
							<Text size="2" color="gray">
								This page checks <Code>access.accessLevel</Code>:
								<br />
								- <strong>"admin"</strong> → Can edit
								<br />
								- <strong>"customer"</strong> → Cannot edit (redirected)
								<br />
								- <strong>"no_access"</strong> → Cannot access
							</Text>
						</Callout.Text>
					</Callout.Root>
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
							<Card className="p-3">
								<Text size="2" color="gray">
									{experience.name}
								</Text>
							</Card>
							<Text size="2" color="gray" className="mt-1">
								💡 In a real app, this would be an editable input field.
							</Text>
						</div>

						<div>
							<Text size="3" weight="bold" className="mb-2">
								Description
							</Text>
							<Card className="p-3 min-h-[100px]">
								<Text size="2" color="gray">
									Add your edit form fields here...
								</Text>
							</Card>
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
					<Card className="p-4 max-h-72 overflow-y-auto">
						<pre className="text-sm font-mono text-gray-11">
							<code>{JSON.stringify(experience, null, 2)}</code>
						</pre>
					</Card>
				</Card>

				<Card>
					<Heading size="5" className="mb-3">Your Access Data</Heading>
					<Card className="p-4 max-h-72 overflow-y-auto">
						<pre className="text-sm font-mono text-gray-11">
							<code>{JSON.stringify(access, null, 2)}</code>
						</pre>
					</Card>
				</Card>
			</div>
		</div>
	);
}

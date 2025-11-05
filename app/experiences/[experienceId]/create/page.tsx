import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator } from "frosted-ui";
import { headers } from "next/headers";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";

/**
 * EXPERIENCE CREATE PAGE - Form Handling Pattern
 *
 * This page demonstrates:
 * 1. Another nested route under [experienceId]
 * 2. Form handling within a Whop app
 * 3. Working with user and access context
 *
 * Route: /experiences/[experienceId]/create
 * Parent: /experiences/[experienceId]
 * Sibling: /experiences/[experienceId]/edit
 *
 * This pattern is useful for creating new items, content, or resources
 * within the context of a specific experience.
 */
export default async function CreatePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	// Step 1: Extract experienceId from URL parameters
	const { experienceId } = await params;

	// Step 2: Verify user authentication
	const { userId } = await whopsdk.verifyUserToken(await headers());

	// Step 3: Fetch experience and access data
	// Note: For a create page, you might not need to check access
	// if the user just needs to be logged in. Adjust based on your needs.
	const [experience, user, access] = await Promise.all([
		whopsdk.experiences.retrieve(experienceId),
		whopsdk.users.retrieve(userId),
		whopsdk.users.checkAccess(experienceId, { id: userId }),
	]);

	const displayName = user.name || `@${user.username}`;

	return (
		<div className="p-8">
			{/* Header */}
			<Card className="mb-6">
				<div className="flex justify-between items-start gap-4">
					<div className="flex-1">
						<Heading size="8" className="mb-2">
							➕ Create Something New
						</Heading>
						<Text size="4" color="gray" className="mb-3">
							Creating a new item within <strong>{experience.name}</strong>.
							This demonstrates form handling in a Whop app.
						</Text>
						<div className="flex gap-3 flex-wrap">
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
								<Text size="2" color="blue" className="font-mono">
									👤 {displayName}
								</Text>
							</div>
							<div className="bg-green-50 border border-green-200 rounded-lg p-2">
								<Text size="2" color="green" className="font-mono">
									✅ Access: {access.accessLevel}
								</Text>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Link href={`/experiences/${experienceId}`}>
							<Button variant="outline" size="3">
								← Back to Experience
							</Button>
						</Link>
					</div>
				</div>
			</Card>

			{/* Routing Education */}
			<Card className="mb-6">
				<Heading size="5" className="mb-4">🎓 Form Handling Pattern</Heading>
				<div className="grid md:grid-cols-3 gap-4">
					<div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="indigo" className="mb-2">
							📍 Route
						</Text>
						<Text size="2" color="indigo" className="font-mono">
							/experiences/[experienceId]/create
						</Text>
						<Text size="2" color="gray" className="mt-2">
							Nested under the main experience route.
						</Text>
					</div>
					<div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="teal" className="mb-2">
							📝 Form Pattern
						</Text>
						<Text size="2" color="gray">
							1. Client-side form with useState
							<br />
							2. Server action or API route
							<br />
							3. Handle submission & validation
						</Text>
					</div>
					<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="amber" className="mb-2">
							💡 Use Cases
						</Text>
						<Text size="2" color="gray">
							Create posts, tickets, content, orders, or any resource within an experience.
						</Text>
					</div>
				</div>
			</Card>

			<Separator size="4" />

			{/* Create Form */}
			<div className="space-y-6">
				<Card>
					<Heading size="5" className="mb-4">New Item Details</Heading>
					<div className="space-y-4">
						<div>
							<Text size="3" weight="bold" className="mb-2">
								Title
							</Text>
							<input
								type="text"
								placeholder="Enter a title for your new item..."
								className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm"
							/>
						</div>

						<div>
							<Text size="3" weight="bold" className="mb-2">
								Description
							</Text>
							<textarea
								placeholder="Describe your new item..."
								rows={6}
								className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm"
							/>
						</div>

						<div>
							<Text size="3" weight="bold" className="mb-2">
								Category
							</Text>
							<select className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-sm">
								<option>Select a category...</option>
								<option>Category 1</option>
								<option>Category 2</option>
								<option>Category 3</option>
							</select>
						</div>

						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
							<Text size="2" color="blue" weight="bold" className="mb-2">
								💡 Implementation Notes
							</Text>
							<Text size="2" color="gray">
								In a real app, you would:
								<br />
								1. Use React state to manage form data
								<br />
								2. Handle form submission with server actions or API routes
								<br />
								3. Validate data before saving
								<br />
								4. Save to your database (Convex, Supabase, etc.)
								<br />
								5. Redirect on success or show errors
							</Text>
						</div>

						<div className="flex gap-3">
							<Button variant="classic" size="3">
								✅ Create Item
							</Button>
							<Link href={`/experiences/${experienceId}`}>
								<Button variant="outline" size="3">
									Cancel
								</Button>
							</Link>
						</div>
					</div>
				</Card>

				{/* Context Data */}
				<Card>
					<Heading size="5" className="mb-3">Experience Context</Heading>
					<div className="bg-gray-1 border border-gray-6 rounded-lg p-4 max-h-72 overflow-y-auto">
						<pre className="text-sm font-mono text-gray-11">
							<code>{JSON.stringify({ experienceId, userId, access }, null, 2)}</code>
						</pre>
					</div>
				</Card>

				<Card>
					<Heading size="5" className="mb-3">Experience Data</Heading>
					<div className="bg-gray-1 border border-gray-6 rounded-lg p-4 max-h-72 overflow-y-auto">
						<pre className="text-sm font-mono text-gray-11">
							<code>{JSON.stringify(experience, null, 2)}</code>
						</pre>
					</div>
				</Card>
			</div>
		</div>
	);
}

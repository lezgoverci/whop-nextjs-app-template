import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator } from "frosted-ui";
import { headers } from "next/headers";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";
import ConvexCounter from "./convex-counter";
import TodoList from "./todo-list";
import FrostedUIShowcase from "@/components/frosted-ui-showcase";

/**
 * EXPERIENCE DETAIL PAGE - Dynamic Route with Full SDK Integration
 *
 * This page demonstrates the most common pattern in Whop apps:
 * a dynamic route that fetches and displays data for a specific experience.
 *
 * Route: /experiences/[experienceId]
 * - The [experienceId] parameter comes from the URL
 * - Example: /experiences/exp_1234567890abcdef
 *
 * Pattern:
 * 1. Accept params as a Promise (Next.js 13+ App Router)
 * 2. Verify user authentication using whopsdk.verifyUserToken()
 * 3. Fetch data using the SDK (experience, user, access)
 * 4. Render the UI based on the fetched data
 */
export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	// Step 1: Extract the experienceId from the URL parameters
	// Note: params is a Promise in the App Router, so we need to await it
	const { experienceId } = await params;

	// Step 2: Verify user authentication
	// This ensures the user is logged into Whop and returns their userId
	// If not authenticated, this will throw an error
	const { userId } = await whopsdk.verifyUserToken(await headers());

	// Step 3: Fetch required data from the Whop SDK
	// This demonstrates the core pattern: verify, then fetch
	const [experience, user, access] = await Promise.all([
		whopsdk.experiences.retrieve(experienceId),      // Get experience details
		whopsdk.users.retrieve(userId),                 // Get user profile
		whopsdk.users.checkAccess(experienceId, { id: userId }), // Check permissions
	]);

	const displayName = user.name || `@${user.username}`;

	return (
		<div className="p-8">
			<Card className="mb-6">
				<div className="flex justify-between items-center gap-4">
					<div>
						<Heading size="8" className="mb-2">
							Hi <strong>{displayName}</strong>!
						</Heading>
						<Text size="4" color="gray">
							Welcome to your Whop app! This page shows how dynamic routing works
							with the [experienceId] parameter. Replace this with your own app logic.
						</Text>
						<div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
							<Text size="2" color="blue" className="font-mono">
								📍 Current Route: <strong>/experiences/{experienceId}</strong>
							</Text>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Link href={`/experiences/${experienceId}/edit`}>
							<Button variant="classic" size="3">
								✏️ Edit (Admin Only)
							</Button>
						</Link>
						<Link href="https://docs.whop.com/apps" target="_blank">
							<Button variant="outline" size="3">
								Developer Docs
							</Button>
						</Link>
					</div>
				</div>
			</Card>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<Card>
					<Heading size="4" className="mb-3">Experience Info</Heading>
					<Badge color="blue" className="mb-2">{experience.name}</Badge>
					<Text size="2" color="gray" className="mb-3">ID: {experience.id}</Text>
				</Card>

				<Card>
					<Heading size="4" className="mb-3">User Info</Heading>
					<Badge color="green" className="mb-2">{user.username}</Badge>
					<Text size="2" color="gray" className="mb-3">ID: {user.id}</Text>
				</Card>

				<Card>
					<Heading size="4" className="mb-3">Access Status</Heading>
					<Badge color={access.has_access ? "green" : "red"} className="mb-2">
						{access.has_access ? "Has Access" : "No Access"}
					</Badge>
					<Text size="2" color="gray" className="mb-3">
						{access.has_access ? "User can access this experience" : "User needs access to this experience"}
					</Text>
				</Card>
			</div>

			<Separator size="4" />

			{/* Routing Education Section */}
			<Card className="mb-6">
				<Heading size="5" className="mb-4">🎓 Understanding This Route Pattern</Heading>
				<div className="grid md:grid-cols-2 gap-4">
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="blue" className="mb-2">
							📍 Route Structure
						</Text>
						<Text size="2" color="blue" className="font-mono">
							/experiences/[experienceId]
						</Text>
						<Text size="2" color="gray" className="mt-2">
							The <code className="bg-blue-100 px-1 rounded">[experienceId]</code> is a dynamic
							parameter. When someone visits /experiences/exp_123, the page receives
							<code className="bg-blue-100 px-1 rounded">experienceId = "exp_123"</code>
						</Text>
					</div>
					<div className="bg-green-50 border border-green-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="green" className="mb-2">
							🔑 Key Steps
						</Text>
						<Text size="2" color="gray">
							1. Await params to get experienceId
							<br />
							2. Verify user with whopsdk.verifyUserToken()
							<br />
							3. Fetch experience, user, and access data
							<br />
							4. Render UI with the fetched data
						</Text>
					</div>
				</div>

				<div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
					<Text size="3" weight="bold" color="amber" className="mb-2">
						🔗 Nested Routes
					</Text>
					<Text size="2" color="gray">
						You can create sub-pages under this route by adding directories:
						<br />
						<code className="bg-amber-100 px-2 py-1 rounded text-xs block mt-1">
							/experiences/[experienceId]/edit - Edit this experience
						</code>
						<code className="bg-amber-100 px-2 py-1 rounded text-xs block mt-1">
							/experiences/[experienceId]/create - Create something new
						</code>
					</Text>
				</div>
			</Card>

			<div className="space-y-6">
				{/* Frosted UI Showcase */}
				<FrostedUIShowcase />

				{/* Convex Database Integration */}
				<ConvexCounter experienceId={experienceId} userId={userId} />

				{/* Todo List */}
				<TodoList experienceId={experienceId} userId={userId} />

				<Card>
					<Heading size="5" className="mb-3">Experience Data</Heading>
					<JsonViewer data={experience} />
				</Card>

				<Card>
					<Heading size="5" className="mb-3">User Data</Heading>
					<JsonViewer data={user} />
				</Card>

				<Card>
					<Heading size="5" className="mb-3">Access Data</Heading>
					<JsonViewer data={access} />
				</Card>
			</div>
		</div>
	);
}

function JsonViewer({ data }: { data: any }) {
	return (
		<div className="bg-gray-1 border border-gray-6 rounded-lg p-4 max-h-72 overflow-y-auto">
			<pre className="text-sm font-mono text-gray-11">
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</div>
	);
}

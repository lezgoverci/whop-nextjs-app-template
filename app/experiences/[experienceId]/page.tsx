import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator } from "frosted-ui";
import { headers } from "next/headers";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";
import ConvexCounter from "./convex-counter";
import TodoList from "./todo-list";

export default async function ExperiencePage({
	params,
}: {
	params: Promise<{ experienceId: string }>;
}) {
	const { experienceId } = await params;
	// Ensure the user is logged in on whop.
	const { userId } = await whopsdk.verifyUserToken(await headers());

	// Fetch the neccessary data we want from whop.
	const [experience, user, access] = await Promise.all([
		whopsdk.experiences.retrieve(experienceId),
		whopsdk.users.retrieve(userId),
		whopsdk.users.checkAccess(experienceId, { id: userId }),
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
							Welcome to your whop app! Replace this template with your own app. To
							get you started, here's some helpful data you can fetch from whop.
						</Text>
					</div>
					<Link href="https://docs.whop.com/apps" target="_blank">
						<Button variant="classic" size="3">
							Developer Docs
						</Button>
					</Link>
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

			<div className="space-y-6">
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

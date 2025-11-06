import { Button } from "@whop/react/components";
import { Card, Heading, Text, Code, Badge } from "frosted-ui";
import Link from "next/link";

/**
 * LANDING PAGE - The default route for your Whop app
 *
 * This is the entry point when users visit your app.
 * In Whop apps, this would typically be the discover/marketing page
 * or the main landing page that introduces your app.
 */
export default function Page() {
	return (
		<div className="py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto space-y-6">
				<Card className="p-8">
					<div className="text-center mb-8">
						<Heading size="8" className="mb-4">
							Whop App Routing Showcase
						</Heading>
						<Text size="4" color="gray">
							Learn how page routing works in Whop applications
						</Text>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<Link href="/discover" className="block">
							<Button variant="classic" className="w-full" size="4">
								📖 Discover Page
							</Button>
						</Link>
						<Link href="https://docs.whop.com/apps" className="block" target="_blank">
							<Button variant="classic" className="w-full" size="4">
								📚 Developer Docs
							</Button>
						</Link>
					</div>
				</Card>

				<Card className="p-6">
					<Heading size="6" className="mb-4 text-blue-12">
						🎯 Experience Routes (Dynamic Routing)
					</Heading>
					<Text size="2" color="gray" className="mb-4">
						These routes use the <Code>[experienceId]</Code> parameter
						to access specific experiences. Replace <Code>exp_xxxxxxxxxxxxxx</Code> with a real experience ID.
					</Text>
					<div className="grid gap-3">
						<Card className="p-3 bg-blue-a1 border-blue-6">
							<Link href="/experiences/exp_xxxxxxxxxxxxxx" className="text-blue-12 hover:underline">
								👉 /experiences/[experienceId] - View Experience
							</Link>
						</Card>
						<Card className="p-3 bg-blue-a1 border-blue-6">
							<Link href="/experiences/exp_xxxxxxxxxxxxxx/edit" className="text-blue-12 hover:underline">
								👉 /experiences/[experienceId]/edit - Edit Experience (Admin)
							</Link>
						</Card>
						<Card className="p-3 bg-blue-a1 border-blue-6">
							<Link href="/experiences/exp_xxxxxxxxxxxxxx/create" className="text-blue-12 hover:underline">
								👉 /experiences/[experienceId]/create - Create Something
							</Link>
						</Card>
					</div>
				</Card>

				<Card className="p-6">
					<Heading size="6" className="mb-4 text-purple-12">
						🏢 Company Routes
					</Heading>
					<Text size="2" color="gray" className="mb-4">
						Routes using <Code>[companyId]</Code> parameter
						for company-specific dashboards. Replace <Code>biz_xxxxxxxxxxxxxx</Code> with a real company ID.
					</Text>
					<Card className="p-3 bg-purple-a1 border-purple-6">
						<Link href="/dashboard/biz_xxxxxxxxxxxxxx" className="text-purple-12 hover:underline">
							👉 /dashboard/[companyId] - Company Dashboard
						</Link>
					</Card>
				</Card>

				<Card className="p-6 bg-green-a1 border-green-6">
					<Heading size="6" className="mb-3 text-green-12">
						🎉 Convex Database Included!
					</Heading>
					<Text size="2" color="green-11">
						This template includes Convex for real-time database functionality.
						Check out the experience routes to see it in action.
					</Text>
				</Card>

				<Card className="p-6 bg-yellow-a1 border-yellow-6">
					<Heading size="6" className="mb-3 text-yellow-12">
						💡 Routing Patterns in Whop Apps
					</Heading>
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<Badge color="yellow" size="2">Tip</Badge>
							<Text size="2" color="gray">
								Dynamic routes use square brackets: <Code>[param]</Code>
							</Text>
						</div>
						<div className="flex items-center gap-2">
							<Badge color="yellow" size="2">exp_</Badge>
							<Text size="2" color="gray">Experience IDs start with <Code>exp_</Code></Text>
						</div>
						<div className="flex items-center gap-2">
							<Badge color="yellow" size="2">biz_</Badge>
							<Text size="2" color="gray">Company IDs start with <Code>biz_</Code></Text>
						</div>
						<div className="flex items-center gap-2">
							<Badge color="yellow" size="2">app/</Badge>
							<Text size="2" color="gray">All routes are in the <Code>app/</Code> directory (Next.js App Router)</Text>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
}

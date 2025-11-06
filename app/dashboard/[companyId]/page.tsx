import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator, Callout, Code } from "frosted-ui";
import { headers } from "next/headers";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";

/**
 * COMPANY DASHBOARD PAGE - Different Parameter Pattern
 *
 * This page demonstrates:
 * 1. A different dynamic parameter: [companyId] instead of [experienceId]
 * 2. Company-centric routing (vs. experience-centric routing)
 * 3. Accessing company-specific data and metrics
 *
 * Route: /dashboard/[companyId]
 * - The [companyId] parameter represents a business/company on Whop
 * - Format: biz_xxxxxxxxxxxxxx (starts with "biz_" prefix)
 * - Used for company dashboards, admin panels, or business analytics
 *
 * Use Cases:
 * - Company owners viewing their business metrics
 * - Multi-tenant apps with company-specific data
 * - Administrative dashboards for managing multiple experiences
 */
export default async function DashboardPage({
	params,
}: {
	params: Promise<{ companyId: string }>;
}) {
	// Step 1: Extract companyId from URL parameters
	const { companyId } = await params;

	// Step 2: Verify user authentication
	const { userId } = await whopsdk.verifyUserToken(await headers());

	// Step 3: Fetch company and user data
	// Note: Depending on your app, you might also check:
	// - If the user is an owner/admin of the company
	// - Company permissions and access levels
	const [company, user] = await Promise.all([
		whopsdk.companies.retrieve(companyId),
		whopsdk.users.retrieve(userId),
	]);

	const displayName = user.name || `@${user.username}`;

	return (
		<div className="p-8">
			{/* Header */}
			<Card className="mb-6">
				<div className="flex justify-between items-start gap-4">
					<div className="flex-1">
						<Heading size="8" className="mb-2">
							🏢 Company Dashboard
						</Heading>
						<Text size="4" color="gray" className="mb-3">
							Managing <strong>{company.title}</strong> - Welcome, {displayName}!
						</Text>
						<div className="flex gap-3 flex-wrap">
							<Callout.Root color="purple" className="p-2">
								<Callout.Text>
									<Text size="2" className="font-mono">
										Company ID: {company.id}
									</Text>
								</Callout.Text>
							</Callout.Root>
							<Callout.Root color="blue" className="p-2">
								<Callout.Text>
									<Text size="2">
										{company.member_count.toLocaleString()} members
									</Text>
								</Callout.Text>
							</Callout.Root>
							{company.verified && (
								<Callout.Root color="green" className="p-2">
									<Callout.Icon>✓</Callout.Icon>
									<Callout.Text>
										<Text size="2">Verified</Text>
									</Callout.Text>
								</Callout.Root>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<Link href="/">
							<Button variant="outline" size="3">
								← Back Home
							</Button>
						</Link>
					</div>
				</div>
			</Card>

			{/* Routing Education */}
			<Card className="mb-6">
				<Heading size="5" className="mb-4">🎓 Company-Centric Routing</Heading>
				<div className="grid md:grid-cols-2 gap-4">
					<Callout.Root color="purple">
						<Callout.Icon>📍</Callout.Icon>
						<Callout.Text>
							<Text size="3" weight="bold" className="mb-2">
								Route Pattern
							</Text>
							<Text size="2" className="font-mono">
								/dashboard/[companyId]
							</Text>
							<Text size="2" color="gray" className="mt-2">
								This uses <Code>[companyId]</Code> instead of
								<Code>[experienceId]</Code>. The company ID:
								<br />
								- Starts with <Code>biz_</Code> prefix
								<br />
								- Represents a business/company
								<br />
								- Used for multi-tenant scenarios
							</Text>
						</Callout.Text>
					</Callout.Root>
					<Callout.Root color="yellow">
						<Callout.Icon>🎯</Callout.Icon>
						<Callout.Text>
							<Text size="3" weight="bold" className="mb-2">
								When to Use
							</Text>
							<Text size="2" color="gray">
								<strong>Experience Routes</strong> (exp_):
								<br />
								- Single experience management
								<br />
								- User-focused features
								<br />
								- Content within an experience
								<br />
								<br />
								<strong>Company Routes</strong> (biz_):
								<br />
								- Multi-experience dashboards
								<br />
								- Business owners/admins
								<br />
								- Company-wide analytics
							</Text>
						</Callout.Text>
					</Callout.Root>
				</div>
			</Card>

			<Separator size="4" />

			{/* Dashboard Content */}
			<div className="space-y-6">
				{/* Metrics Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<Heading size="4" className="mb-3">Total Members</Heading>
						<Text size="6" weight="bold" color="blue" className="mb-2">
							{company.member_count.toLocaleString()}
						</Text>
						<Text size="2" color="gray">
							Active community members
						</Text>
					</Card>

					<Card>
						<Heading size="4" className="mb-3">Company Route</Heading>
						<Text size="4" weight="bold" color="green" className="mb-2 font-mono">
							{company.route}
						</Text>
						<Text size="2" color="gray">
							Whop URL: whop.com/{company.route}
						</Text>
					</Card>

					<Card>
						<Heading size="4" className="mb-3">Business Type</Heading>
						<Badge color="purple" className="mb-2">
							{company.business_type}
						</Badge>
						<Text size="2" color="gray">
							Company categorization
						</Text>
					</Card>
				</div>

				{/* Navigation to Experiences */}
				<Card>
					<Heading size="5" className="mb-4">Experience Management</Heading>
					<Text size="3" color="gray" className="mb-4">
						From this company dashboard, you can navigate to specific experiences
						or manage company-wide settings.
					</Text>
					<Callout.Root color="blue">
						<Callout.Icon>💡</Callout.Icon>
						<Callout.Text>
							<Text size="2" weight="bold" className="mb-2">
								Routing Pattern
							</Text>
							<Text size="2" color="gray">
								To link to an experience from here, use:
								<br />
								<Code className="block mt-1">/experiences/exp_1234567890abcdef</Code>
								Or for a create page:
								<br />
								<Code className="block mt-1">/experiences/exp_1234567890abcdef/create</Code>
							</Text>
						</Callout.Text>
					</Callout.Root>
				</Card>

				{/* Data Viewer */}
				<Card>
					<Heading size="5" className="mb-3">Company Data</Heading>
					<JsonViewer data={company} />
				</Card>

				<Card>
					<Heading size="5" className="mb-3">User Context</Heading>
					<JsonViewer data={{ companyId, userId, user }} />
				</Card>
			</div>
		</div>
	);
}

function JsonViewer({ data }: { data: any }) {
	return (
		<Card className="p-4 max-h-72 overflow-y-auto">
			<pre className="text-sm font-mono text-gray-11">
				<code>{JSON.stringify(data, null, 2)}</code>
			</pre>
		</Card>
	);
}

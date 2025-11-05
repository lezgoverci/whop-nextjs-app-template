import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator } from "frosted-ui";
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
							<div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
								<Text size="2" color="purple" className="font-mono">
									Company ID: {company.id}
								</Text>
							</div>
							<div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
								<Text size="2" color="blue">
									{company.member_count.toLocaleString()} members
								</Text>
							</div>
							{company.verified && (
								<div className="bg-green-50 border border-green-200 rounded-lg p-2">
									<Text size="2" color="green">
										✓ Verified
									</Text>
								</div>
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
					<div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="purple" className="mb-2">
							📍 Route Pattern
						</Text>
						<Text size="2" color="purple" className="font-mono">
							/dashboard/[companyId]
						</Text>
						<Text size="2" color="gray" className="mt-2">
							This uses <code className="bg-purple-100 px-1 rounded">[companyId]</code> instead of
							<code className="bg-purple-100 px-1 rounded">[experienceId]</code>. The company ID:
							<br />
							- Starts with <code className="bg-purple-100 px-1 rounded">biz_</code> prefix
							<br />
							- Represents a business/company
							<br />
							- Used for multi-tenant scenarios
						</Text>
					</div>
					<div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
						<Text size="3" weight="bold" color="amber" className="mb-2">
							🎯 When to Use
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
					</div>
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
					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<Text size="2" color="blue" weight="bold" className="mb-2">
							💡 Routing Pattern
						</Text>
						<Text size="2" color="gray">
							To link to an experience from here, use:
							<br />
							<code className="bg-blue-100 px-2 py-1 rounded text-xs block mt-1">
								/experiences/exp_1234567890abcdef
							</code>
							Or for a create page:
							<br />
							<code className="bg-blue-100 px-2 py-1 rounded text-xs block mt-1">
								/experiences/exp_1234567890abcdef/create
							</code>
						</Text>
					</div>
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
		<pre className="text-2 border border-gray-a4 rounded-lg p-4 bg-gray-a2 max-h-72 overflow-y-auto">
			<code className="text-gray-10">{JSON.stringify(data, null, 2)}</code>
		</pre>
	);
}

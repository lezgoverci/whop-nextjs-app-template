/**
 * DASHBOARD NAVIGATION EXAMPLE
 *
 * This component shows different ways to navigate to the company dashboard
 * from within your Whop app. Only users with admin access to the company
 * will be able to access the dashboard.
 */

import Link from "next/link";
import { Button } from "@whop/react/components";
import { Card, Heading, Text, Code } from "frosted-ui";

interface DashboardLinkExampleProps {
	companyId: string;
	experienceId?: string;
}

export function DashboardLinkExample({ companyId, experienceId }: DashboardLinkExampleProps) {
	return (
		<Card className="p-6">
			<Heading size="5" className="mb-4">
				Navigate to Company Dashboard
			</Heading>

			<Text size="3" color="gray" className="mb-4">
				The dashboard is only accessible to company admins/owners.
			</Text>

			{/* Method 1: Simple Link */}
			<div className="mb-4">
				<Text size="2" weight="bold" className="mb-2">
					Method 1: Simple Link
				</Text>
				<Link href={`/dashboard/${companyId}`}>
					<Button variant="classic" size="3">
						Go to Dashboard
					</Button>
				</Link>
			</div>

			{/* Method 2: Link with Icon */}
			<div className="mb-4">
				<Text size="2" weight="bold" className="mb-2">
					Method 2: Link with Icon
				</Text>
				<Link href={`/dashboard/${companyId}`}>
					<Button variant="outline" size="3">
						🏢 Manage Company
					</Button>
				</Link>
			</div>

			{/* Method 3: Text Link */}
			<div className="mb-4">
				<Text size="2" weight="bold" className="mb-2">
					Method 3: Text Link
				</Text>
				<Link
					href={`/dashboard/${companyId}`}
					className="text-blue-11 hover:text-blue-12 underline"
				>
					View company dashboard →
				</Link>
			</div>

			{/* Code Example */}
			<div className="mt-6 p-4 bg-gray-2 rounded">
				<Text size="2" weight="bold" className="mb-2">
					Code Example:
				</Text>
				<Code className="block font-mono text-xs">
					{`<Link href={\`/dashboard/\${companyId}\`}>
  <Button>Go to Dashboard</Button>
</Link>`}
				</Code>
			</div>

			{/* Deep Linking Example */}
			{experienceId && (
				<div className="mt-4">
					<Text size="2" color="gray">
						💡 You can also navigate from an experience to its company dashboard by using{" "}
						<Code>experience.company.id</Code>
					</Text>
				</div>
			)}
		</Card>
	);
}

/**
 * CLIENT COMPONENT VERSION - For use in client components
 * This version uses useRouter for programmatic navigation
 */
"use client";

import { useRouter } from "next/navigation";

export function DashboardLinkClientExample({ companyId }: { companyId: string }) {
	const router = useRouter();

	const navigateToDashboard = () => {
		router.push(`/dashboard/${companyId}`);
	};

	return (
		<Card className="p-6">
			<Heading size="5" className="mb-4">
				Programmatic Navigation (Client Component)
			</Heading>

			<Text size="3" color="gray" className="mb-4">
				Use this pattern for programmatic navigation after an action (e.g., after saving settings).
			</Text>

			<Button onClick={navigateToDashboard} variant="classic" size="3">
				Navigate to Dashboard
			</Button>

			<div className="mt-4 p-4 bg-gray-2 rounded">
				<Text size="2" weight="bold" className="mb-2">
					Code Example:
				</Text>
				<Code className="block font-mono text-xs">
					{`"use client";
import { useRouter } from "next/navigation";

export function MyComponent({ companyId }) {
  const router = useRouter();

  const handleClick = () => {
    // Do something...
    router.push(\`/dashboard/\${companyId}\`);
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
}`}
				</Code>
			</div>
		</Card>
	);
}

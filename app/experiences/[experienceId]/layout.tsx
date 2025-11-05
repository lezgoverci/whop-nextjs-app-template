import { Card, Heading, Text } from "frosted-ui";
import Link from "next/link";
import { Button } from "@whop/react/components";

/**
 * EXPERIENCE LAYOUT - Shared Layout for All Experience Routes
 *
 * This layout wraps all pages under /experiences/[experienceId]
 * It demonstrates:
 * 1. How to create shared layouts for nested routes
 * 2. Accessing params in layouts (same as pages)
 * 3. Providing consistent UI structure for all child routes
 *
 * Files that will use this layout:
 * - /experiences/[experienceId]/page.tsx
 * - /experiences/[experienceId]/edit/page.tsx
 * - /experiences/[experienceId]/create/page.tsx
 * - And any other nested routes under [experienceId]
 *
 * Note: Layouts don't have access to user authentication directly,
 * but you can pass data down from child pages or use server components
 * to fetch shared data.
 */
export default async function ExperienceLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ experienceId: string }>;
}) {
	const { experienceId } = await params;

	return (
		<>
			{/**
			 * Experience Header - Shared across all experience routes
			 * This stays consistent whether you're viewing, editing, or creating
			 */}
			<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
				<div className="max-w-7xl mx-auto p-6">
					<div className="flex justify-between items-start gap-4">
						<div>
							<Text size="3" color="white" className="opacity-90 mb-2">
								📍 Experience Context
							</Text>
							<Heading size="6" color="white" className="mb-2">
								Experience ID: {experienceId}
							</Heading>
							<Text size="3" color="white" className="opacity-90">
								This header appears on all routes under /experiences/[experienceId]
							</Text>
						</div>
						<div className="flex gap-2">
							<Link href={`/experiences/${experienceId}`}>
								<Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
									View
								</Button>
							</Link>
							<Link href={`/experiences/${experienceId}/edit`}>
								<Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
									Edit
								</Button>
							</Link>
							<Link href={`/experiences/${experienceId}/create`}>
								<Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
									Create
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/**
			 * Main Content Area
			 * All child pages render here
			 */}
			<div className="max-w-7xl mx-auto p-6 space-y-6">
				{children}
			</div>

			{/**
			 * Experience Footer - Also shared across all routes
			 */}
			<div className="bg-gray-50 border-t border-gray-200 mt-12">
				<div className="max-w-7xl mx-auto p-6">
					<Card className="bg-amber-50 border-amber-200">
						<Text size="2" color="amber" className="text-center">
							💡 <strong>Layout Tip:</strong> This layout wraps all pages under /experiences/[experienceId].
							Use it for shared navigation, breadcrumbs, or consistent UI elements.
						</Text>
					</Card>
				</div>
			</div>
		</>
	);
}

/**
 * Note about Layouts in Next.js App Router:
 *
 * 1. Layouts receive the same params prop as pages
 * 2. Layouts are Server Components by default (can't use useState, useEffect, etc.)
 * 3. Layouts don't re-render when route parameters change - only the page does
 * 4. Use layouts for:
 *    - Shared navigation
 *    - Consistent headers/footers
 *    - Sidebars
 *    - Breadcrumbs
 *    - Any UI that should appear on multiple routes
 *
 * 5. Create layouts by adding layout.tsx in any directory:
 *    - app/layout.tsx - Root layout
 *    - app/experiences/layout.tsx - Layout for all experiences
 *    - app/experiences/[experienceId]/layout.tsx - Layout for specific experience
 */

import { Button } from "@whop/react/components";
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
				<div className="rounded-3xl bg-gray-a2 p-6 border border-gray-a4">
					<div className="text-center mt-8 mb-8">
						<h1 className="text-8 font-bold text-gray-12 mb-4">
							Whop App Routing Showcase
						</h1>
						<p className="text-4 text-gray-10">
							Learn how page routing works in Whop applications
						</p>
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
				</div>

				<div className="rounded-3xl bg-blue-a2 p-6 border border-blue-a4">
					<h2 className="text-5 font-semibold text-blue-12 mb-4">
						🎯 Experience Routes (Dynamic Routing)
					</h2>
					<p className="text-sm text-blue-11 mb-4">
						These routes use the <code className="bg-blue-a3 px-1 rounded">[experienceId]</code> parameter
						to access specific experiences. Replace <code className="bg-blue-a3 px-1 rounded">exp_xxxxxxxxxxxxxx</code> with a real experience ID.
					</p>
					<div className="grid gap-3">
						<div className="bg-blue-a3 rounded-lg p-3 border border-blue-a5">
							<Link href="/experiences/exp_xxxxxxxxxxxxxx" className="text-blue-12 hover:underline">
								👉 /experiences/[experienceId] - View Experience
							</Link>
						</div>
						<div className="bg-blue-a3 rounded-lg p-3 border border-blue-a5">
							<Link href="/experiences/exp_xxxxxxxxxxxxxx/edit" className="text-blue-12 hover:underline">
								👉 /experiences/[experienceId]/edit - Edit Experience (Admin)
							</Link>
						</div>
						<div className="bg-blue-a3 rounded-lg p-3 border border-blue-a5">
							<Link href="/experiences/exp_xxxxxxxxxxxxxx/create" className="text-blue-12 hover:underline">
								👉 /experiences/[experienceId]/create - Create Something
							</Link>
						</div>
					</div>
				</div>

				<div className="rounded-3xl bg-purple-a2 p-6 border border-purple-a4">
					<h2 className="text-5 font-semibold text-purple-12 mb-4">
						🏢 Company Routes
					</h2>
					<p className="text-sm text-purple-11 mb-4">
						Routes using <code className="bg-purple-a3 px-1 rounded">[companyId]</code> parameter
						for company-specific dashboards. Replace <code className="bg-purple-a3 px-1 rounded">biz_xxxxxxxxxxxxxx</code> with a real company ID.
					</p>
					<div className="bg-purple-a3 rounded-lg p-3 border border-purple-a5">
						<Link href="/dashboard/biz_xxxxxxxxxxxxxx" className="text-purple-12 hover:underline">
							👉 /dashboard/[companyId] - Company Dashboard
						</Link>
					</div>
				</div>

				<div className="rounded-3xl bg-green-a2 p-4 border border-green-a4">
					<h3 className="text-5 font-semibold text-green-12 mb-2">
						🎉 Convex Database Included!
					</h3>
					<p className="text-sm text-green-11">
						This template includes Convex for real-time database functionality.
						Check out the experience routes to see it in action.
					</p>
				</div>

				<div className="rounded-3xl bg-yellow-a2 p-4 border border-yellow-a4">
					<h3 className="text-5 font-semibold text-yellow-12 mb-2">
						💡 Routing Patterns in Whop Apps
					</h3>
					<ul className="text-sm text-yellow-11 space-y-2 list-disc list-inside">
						<li>Dynamic routes use square brackets: <code className="bg-yellow-a3 px-1 rounded">[param]</code></li>
						<li>Experience IDs start with <code className="bg-yellow-a3 px-1 rounded">exp_</code></li>
						<li>Company IDs start with <code className="bg-yellow-a3 px-1 rounded">biz_</code></li>
						<li>Nested routes are created with additional directories</li>
						<li>All routes are in the <code className="bg-yellow-a3 px-1 rounded">app/</code> directory (Next.js App Router)</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

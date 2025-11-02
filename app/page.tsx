import { Button } from "@whop/react/components";
import Link from "next/link";

export default function Page() {
	return (
		<div className="py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-2xl mx-auto space-y-4">
				<div className="rounded-3xl bg-gray-a2 p-4 border border-gray-a4">
					<div className="text-center mt-8 mb-12">
						<h1 className="text-8 font-bold text-gray-12 mb-4">
							Welcome to Your Whop App
						</h1>
						<p className="text-4 text-gray-10">
							Learn how to build your application on our docs
						</p>
					</div>

					<div className="justify-center flex w-full">
						<Link
							href="https://docs.whop.com/apps"
							className="w-full"
							target="_blank"
						>
							<Button variant="classic" className="w-full" size="4">
								Developer Docs
							</Button>
						</Link>
					</div>
				</div>

				<div className="rounded-3xl bg-green-a2 p-4 border border-green-a4">
					<h3 className="text-5 font-semibold text-green-12 mb-2">
						🎉 Convex Database Added!
					</h3>
					<p className="text-sm text-green-11">
						This template now includes Convex for real-time database functionality.
						Check out the demo to see it in action.
					</p>
				</div>
			</div>
		</div>
	);
}

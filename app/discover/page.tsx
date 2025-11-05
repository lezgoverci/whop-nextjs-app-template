import Link from "next/link";
import { Button } from "@whop/react/components";

/**
 * DISCOVER PAGE - Marketing/Discovery Route
 *
 * This is a static page that doesn't require authentication.
 * Typically used as a public-facing page that showcases
 * your app's features before users engage with it.
 *
 * Route: /discover
 * File: app/discover/page.tsx
 */
export default function DiscoverPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Navigation */}
                <Link href="/" className="inline-block mb-6">
                    <Button variant="ghost" size="2">
                        ← Back to Home
                    </Button>
                </Link>

                {/* Title */}
                <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
                    Discover your app
                </h1>

                {/* Main Description Card (Frosted UI) */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-md text-center mb-16 border border-gray-200">
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-4">
                        This is your app's discover page—showcase what your app does
                        and how it helps creators.
                    </p>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                        Share real success stories, link to thriving Whop communities
                        using your app, and add referral links to earn affiliate fees
                        when people install your app.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-2xl mx-auto">
                        <p className="text-sm text-blue-900">
                            💡 <strong>Routing Tip:</strong> This is a static route with no parameters.
                            It's perfect for marketing content that doesn't need to know about
                            specific experiences or companies.
                        </p>
                    </div>
                </div>

                {/* Pro Tips Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-900">
                            🎯 Static Route Pattern
                        </h3>
                        <p className="text-sm text-gray-600">
                            <code className="bg-gray-100 px-2 py-1 rounded text-xs">/discover</code>
                        </p>
                        <p className="text-xs text-gray-500">
                            No parameters, no authentication required. Just pure marketing content.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-900">
                            💰 Include Referral Links
                        </h3>
                        <p className="text-sm text-gray-600">
                            Add <code className="bg-gray-100 px-2 py-1 rounded text-xs">?a=your_app_id</code> to Whop links to earn
                            affiliate commissions.
                        </p>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Examples of Success Stories
                </h2>

                {/* Main Content Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Success Story Card 1 */}
                    <div className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                CryptoKings
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Trading Community
                            </p>
                            <p className="text-gray-700 mb-4 text-sm">
                                "Grew to{" "}
                                <span className="font-bold text-blue-600">
                                    2,500+ members
                                </span>{" "}
                                and{" "}
                                <span className="font-bold text-blue-600">
                                    $18,000+/mo
                                </span>{" "}
                                with automated signals. Members love the real-time
                                alerts!"
                            </p>
                        </div>
                        <Button asChild variant="classic" className="mt-auto w-full">
                            <a href="https://whop.com/cryptokings/?a=your_app_id">
                                Visit CryptoKings
                            </a>
                        </Button>
                    </div>

                    {/* Success Story Card 2 */}
                    <div className="bg-white rounded-xl p-6 shadow-md flex flex-col justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                SignalPro
                            </h3>
                            <p className="text-xs text-gray-500 mb-2">
                                Premium Signals
                            </p>
                            <p className="text-gray-700 mb-4 text-sm">
                                "Retention jumped to{" "}
                                <span className="font-bold text-blue-600">92%</span>.
                                Affiliate program brought in{" "}
                                <span className="font-bold text-blue-600">$4,000+</span>{" "}
                                last quarter."
                            </p>
                        </div>
                        <Button asChild variant="classic" className="mt-auto w-full">
                            <a href="https://whop.com/signalpro/?app=your_app_id">
                                Visit SignalPro
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Routing Education Box */}
                <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-amber-900 mb-3">
                        📚 Learn About Whop Routing
                    </h3>
                    <div className="space-y-2 text-sm text-amber-800">
                        <p>
                            <strong>Static Routes:</strong> Like this page, they don't change based on parameters.
                            Examples: <code className="bg-amber-100 px-1 rounded">/</code>, <code className="bg-amber-100 px-1 rounded">/discover</code>
                        </p>
                        <p>
                            <strong>Dynamic Routes:</strong> Use square brackets for parameters.
                            Examples: <code className="bg-amber-100 px-1 rounded">/experiences/[experienceId]</code>, <code className="bg-amber-100 px-1 rounded">/dashboard/[companyId]</code>
                        </p>
                    </div>
                    <Link href="/" className="inline-block mt-4">
                        <Button variant="classic" size="2">
                            View All Routing Examples →
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

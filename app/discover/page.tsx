import Link from "next/link";
import { Button } from "@whop/react/components";
import { Card, Heading, Text, Code, Callout } from "frosted-ui";

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
                <Heading size="8" className="mb-6 text-center text-gray-12">
                    Discover your app
                </Heading>

                {/* Main Description Card (Frosted UI) */}
                <Card className="p-8 mb-16 bg-white/90 backdrop-blur-sm">
                    <Text size="5" className="mb-4 text-center max-w-2xl mx-auto">
                        This is your app's discover page—showcase what your app does
                        and how it helps creators.
                    </Text>
                    <Text size="4" color="gray" className="max-w-2xl mx-auto mb-6">
                        Share real success stories, link to thriving Whop communities
                        using your app, and add referral links to earn affiliate fees
                        when people install your app.
                    </Text>
                    <Callout.Root color="blue" className="max-w-2xl mx-auto">
                        <Callout.Icon>💡</Callout.Icon>
                        <Callout.Text>
                            <Text size="2">
                                <strong>Routing Tip:</strong> This is a static route with no parameters.
                                It's perfect for marketing content that doesn't need to know about
                                specific experiences or companies.
                            </Text>
                        </Callout.Text>
                    </Callout.Root>
                </Card>

                {/* Pro Tips Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <Card className="p-6">
                        <Heading size="4" className="mb-3">
                            🎯 Static Route Pattern
                        </Heading>
                        <Text size="2" color="gray" className="mb-2">
                            <Code>/discover</Code>
                        </Text>
                        <Text size="1" color="gray">
                            No parameters, no authentication required. Just pure marketing content.
                        </Text>
                    </Card>
                    <Card className="p-6">
                        <Heading size="4" className="mb-3">
                            💰 Include Referral Links
                        </Heading>
                        <Text size="2" color="gray">
                            Add <Code>?a=your_app_id</Code> to Whop links to earn
                            affiliate commissions.
                        </Text>
                    </Card>
                </div>

                <Heading size="6" className="mb-6 text-center text-gray-12">
                    Examples of Success Stories
                </Heading>

                {/* Main Content Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Success Story Card 1 */}
                    <Card className="p-6 flex flex-col justify-between">
                        <div>
                            <Heading size="4" className="mb-1">
                                CryptoKings
                            </Heading>
                            <Text size="2" color="gray" className="mb-3">
                                Trading Community
                            </Text>
                            <Text size="3" className="mb-4">
                                "Grew to{" "}
                                <Text size="3" weight="bold" color="blue">
                                    2,500+ members
                                </Text>{" "}
                                and{" "}
                                <Text size="3" weight="bold" color="blue">
                                    $18,000+/mo
                                </Text>{" "}
                                with automated signals. Members love the real-time
                                alerts!"
                            </Text>
                        </div>
                        <Button asChild variant="classic" className="mt-auto w-full">
                            <a href="https://whop.com/cryptokings/?a=your_app_id">
                                Visit CryptoKings
                            </a>
                        </Button>
                    </Card>

                    {/* Success Story Card 2 */}
                    <Card className="p-6 flex flex-col justify-between">
                        <div>
                            <Heading size="4" className="mb-1">
                                SignalPro
                            </Heading>
                            <Text size="2" color="gray" className="mb-3">
                                Premium Signals
                            </Text>
                            <Text size="3" className="mb-4">
                                "Retention jumped to{" "}
                                <Text size="3" weight="bold" color="blue">92%</Text>.
                                Affiliate program brought in{" "}
                                <Text size="3" weight="bold" color="blue">$4,000+</Text>{" "}
                                last quarter."
                            </Text>
                        </div>
                        <Button asChild variant="classic" className="mt-auto w-full">
                            <a href="https://whop.com/signalpro/?app=your_app_id">
                                Visit SignalPro
                            </a>
                        </Button>
                    </Card>
                </div>

                {/* Routing Education Box */}
                <Callout.Root color="yellow" className="p-6">
                    <Callout.Icon>📚</Callout.Icon>
                    <Callout.Text>
                        <Heading size="4" className="mb-3">
                            Learn About Whop Routing
                        </Heading>
                        <div className="space-y-3">
                            <Text size="2" color="gray">
                                <strong>Static Routes:</strong> Like this page, they don't change based on parameters.
                                Examples: <Code>/</Code>, <Code>/discover</Code>
                            </Text>
                            <Text size="2" color="gray">
                                <strong>Dynamic Routes:</strong> Use square brackets for parameters.
                                Examples: <Code>/experiences/[experienceId]</Code>, <Code>/dashboard/[companyId]</Code>
                            </Text>
                        </div>
                        <Link href="/" className="inline-block mt-4">
                            <Button variant="classic" size="2">
                                View All Routing Examples →
                            </Button>
                        </Link>
                    </Callout.Text>
                </Callout.Root>
            </div>
        </div>
    );
}

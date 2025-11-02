import { Button, Card, Text } from "@whop/react/components";

export default function DiscoverPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-4xl mx-auto px-4 py-16">
                {/* Title */}
                <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
                    Discover your app
                </h1>
                {/* Main Description Card (Frosted UI) */}
                <Card className="text-center mb-16" size="3" variant="surface">
                    <Text asChild size="5" className="max-w-2xl mx-auto mb-4 text-gray-10">
                        <p>
                            This is your app's discover page—showcase what your app does
                            and how it helps creators.
                        </p>
                    </Text>
                    <Text asChild size="3" className="max-w-2xl mx-auto mb-2 text-gray-9">
                        <p>
                            Share real success stories, link to thriving Whop communities
                            using your app, and add referral links to earn affiliate fees
                            when people install your app.
                        </p>
                    </Text>
                    <Text asChild size="2" className="max-w-2xl mx-auto text-gray-8">
                        <p>
                            💡 <strong>Tip:</strong> Clearly explain your app's value
                            proposition and how it helps creators make money or grow their
                            communities.
                        </p>
                    </Text>
                </Card>

                {/* Pro Tips Section */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-900">
                            Showcase Real Success
                        </h3>
                        <p className="text-sm text-gray-600">
                            Link to real Whop communities using your app, with revenue
                            and member stats.
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-2">
                        <h3 className="font-semibold text-gray-900">
                            Include Referral Links
                        </h3>
                        <p className="text-sm text-gray-600">
                            Add <code>?a=your_app_id</code> to Whop links to earn
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
            </div>
        </div>
    );
}

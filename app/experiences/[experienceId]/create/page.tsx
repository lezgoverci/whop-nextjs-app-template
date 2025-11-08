import { Button } from "@whop/react/components";
import { Card, Heading, Text, Badge, Separator, Callout, Code, TextField, Select } from "frosted-ui";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";
import {
    requireExperienceAdmin,
    verifyAndGetUser,
} from "@/lib/admin-guard";

/**
 * EXPERIENCE CREATE PAGE - Admin-Only Form Handling Pattern
 *
 * This page demonstrates:
 * 1. Another nested route under [experienceId]
 * 2. Admin-only access control using the admin guard
 * 3. Form handling within a Whop app
 *
 * Route: /experiences/[experienceId]/create
 * Parent: /experiences/[experienceId]
 * Sibling: /experiences/[experienceId]/edit
 *
 * This pattern is useful for creating new items, content, or resources
 * within the context of a specific experience. Only admins can create items.
 */
export default async function CreatePage({
    params,
}: {
    params: Promise<{ experienceId: string }>;
}) {
    // Step 1: Extract experienceId from URL parameters
    const { experienceId } = await params;

    // Step 2: Verify user authentication
    const { userId } = await verifyAndGetUser();

    // Step 3: Require admin access to create items in this experience
    // This throws an error if the user is not an admin
    try {
        await requireExperienceAdmin(experienceId, userId);
    } catch {
        return (
            <div className="p-8">
                <Card>
                    <div className="text-center py-8">
                        <Heading size="7" className="mb-4">
                            🔒 Access Denied
                        </Heading>
                        <Text size="3" color="gray" className="mb-6">
                            You need admin privileges to create items in this experience.
                        </Text>
                        <Link href={`/experiences/${experienceId}`}>
                            <Button variant="classic">← Back to Experience</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        );
    }

    // Step 4: Fetch experience and access data (access is already verified above)
    const [experience, user, access] = await Promise.all([
        whopsdk.experiences.retrieve(experienceId),
        whopsdk.users.retrieve(userId),
        whopsdk.users.checkAccess(experienceId, { id: userId }),
    ]);

    const displayName = user.name || `@${user.username}`;

    return (
        <div className="p-8">
            {/* Header */}
            <Card className="mb-6">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                        <Heading size="8" className="mb-2">
                            ➕ Create Something New
                        </Heading>
                        <Text size="4" color="gray" className="mb-3">
                            Creating a new item within <strong>{experience.name}</strong>.
                            This demonstrates form handling in a Whop app.
                        </Text>
                        <div className="flex gap-3 flex-wrap">
                            <Callout.Root color="blue" className="p-2">
                                <Callout.Text>
                                    <Text size="2" className="font-mono">
                                        👤 {displayName}
                                    </Text>
                                </Callout.Text>
                            </Callout.Root>
                            <Callout.Root color="green" className="p-2">
                                <Callout.Icon>✅</Callout.Icon>
                                <Callout.Text>
                                    <Text size="2" className="font-mono">
                                        Access: {access.access_level}
                                    </Text>
                                </Callout.Text>
                            </Callout.Root>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Link href={`/experiences/${experienceId}`}>
                            <Button variant="outline" size="3">
                                ← Back to Experience
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>

            {/* Routing Education */}
            <Card className="mb-6">
                <Heading size="5" className="mb-4">🎓 Form Handling Pattern</Heading>
                <div className="grid md:grid-cols-3 gap-4">
                    <Callout.Root color="blue">
                        <Callout.Icon>📍</Callout.Icon>
                        <Callout.Text>
                            <Text size="3" weight="bold" className="mb-2">
                                Route
                            </Text>
                            <Text size="2" className="font-mono">
                                /experiences/[experienceId]/create
                            </Text>
                            <Text size="2" color="gray" className="mt-2">
                                Nested under the main experience route.
                            </Text>
                        </Callout.Text>
                    </Callout.Root>
                    <Callout.Root color="teal">
                        <Callout.Icon>📝</Callout.Icon>
                        <Callout.Text>
                            <Text size="3" weight="bold" className="mb-2">
                                Form Pattern
                            </Text>
                            <Text size="2" color="gray">
                                1. Client-side form with useState
                                <br />
                                2. Server action or API route
                                <br />
                                3. Handle submission & validation
                            </Text>
                        </Callout.Text>
                    </Callout.Root>
                    <Callout.Root color="yellow">
                        <Callout.Icon>💡</Callout.Icon>
                        <Callout.Text>
                            <Text size="3" weight="bold" className="mb-2">
                                Use Cases
                            </Text>
                            <Text size="2" color="gray">
                                Create posts, tickets, content, orders, or any resource within an experience.
                            </Text>
                        </Callout.Text>
                    </Callout.Root>
                </div>
            </Card>

            <Separator size="4" />

            {/* Create Form */}
            <div className="space-y-6">
                <Card>
                    <Heading size="5" className="mb-4">New Item Details</Heading>
                    <div className="space-y-4">
                        <div>
                            <Text size="3" weight="bold" className="mb-2">
                                Title
                            </Text>
                            <TextField.Root
                                placeholder="Enter a title for your new item..."
                            />
                        </div>

                        <div>
                            <Text size="3" weight="bold" className="mb-2">
                                Description
                            </Text>
                            <textarea
                                placeholder="Describe your new item..."
                                rows={6}
                                className="w-full p-3 text-sm border border-gray-6 rounded-lg"
                            />
                        </div>

                        <div>
                            <Text size="3" weight="bold" className="mb-2">
                                Category
                            </Text>
                            <Select.Root>
                                <Select.Trigger>
                                    <Select.Value placeholder="Select a category..." />
                                </Select.Trigger>
                                <Select.Content>
                                    <Select.Item value="category1">Category 1</Select.Item>
                                    <Select.Item value="category2">Category 2</Select.Item>
                                    <Select.Item value="category3">Category 3</Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </div>

                        <Callout.Root color="blue">
                            <Callout.Icon>💡</Callout.Icon>
                            <Callout.Text>
                                <Text size="2" weight="bold" className="mb-2">
                                    Implementation Notes
                                </Text>
                                <Text size="2" color="gray">
                                    In a real app, you would:
                                    <br />
                                    1. Use React state to manage form data
                                    <br />
                                    2. Handle form submission with server actions or API routes
                                    <br />
                                    3. Validate data before saving
                                    <br />
                                    4. Save to your database (Convex, Supabase, etc.)
                                    <br />
                                    5. Redirect on success or show errors
                                </Text>
                            </Callout.Text>
                        </Callout.Root>

                        <div className="flex gap-3">
                            <Button variant="classic" size="3">
                                ✅ Create Item
                            </Button>
                            <Link href={`/experiences/${experienceId}`}>
                                <Button variant="outline" size="3">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>

                {/* Context Data */}
                <Card>
                    <Heading size="5" className="mb-3">Experience Context</Heading>
                    <Card className="p-4 max-h-72 overflow-y-auto">
                        <pre className="text-sm font-mono text-gray-11">
                            <code>{JSON.stringify({ experienceId, userId, access }, null, 2)}</code>
                        </pre>
                    </Card>
                </Card>

                <Card>
                    <Heading size="5" className="mb-3">Experience Data</Heading>
                    <Card className="p-4 max-h-72 overflow-y-auto">
                        <pre className="text-sm font-mono text-gray-11">
                            <code>{JSON.stringify(experience, null, 2)}</code>
                        </pre>
                    </Card>
                </Card>
            </div>
        </div>
    );
}

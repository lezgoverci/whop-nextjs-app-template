import { Button } from "@whop/react/components";
import {
  Card,
  Heading,
  Text,
  Badge,
  Separator,
  Callout,
  Code,
} from "frosted-ui";
import Link from "next/link";
import { whopsdk } from "@/lib/whop-sdk";
import {
  requireCompanyAccess,
  verifyAndGetUser,
} from "@/lib/admin-guard";

// Icons as text/emoji for better compatibility
const ICONS = {
  analytics: "📊",
  members: "👥",
  experiences: "✨",
  settings: "⚙️",
  security: "🔒",
  billing: "💳",
  docs: "📚",
  support: "🆘",
  checkmark: "✓",
  warning: "⚠️",
  trending: "📈",
  calendar: "📅",
};

/**
 * COMPANY DASHBOARD PAGE - Admin-Only Access Control
 *
 * This page demonstrates:
 * 1. A different dynamic parameter: [companyId] instead of [experienceId]
 * 2. Company-centric routing (vs. experience-centric routing)
 * 3. Accessing company-specific data and metrics
 * 4. Admin-only access control using the admin guard
 *
 * Route: /dashboard/[companyId]
 * - The [companyId] parameter represents a business/company on Whop
 * - Format: biz_xxxxxxxxxxxxxx (starts with "biz_" prefix)
 * - Used for company dashboards, admin panels, or business analytics
 * - Only accessible to authorized company members (owners/admins)
 *
 * Access Control:
 * - Uses requireCompanyAccess() from the admin guard
 * - Returns access denied page if user is not authorized
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
  const { userId } = await verifyAndGetUser();

  // Step 3: Require access to this company
  // This throws an error if the user doesn't have access
  try {
    await requireCompanyAccess(companyId, userId);
  } catch {
    return (
      <div className="p-8">
        <Card>
          <div className="text-center py-8">
            <Heading size="7" className="mb-4">
              🔒 Access Denied
            </Heading>
            <Text size="3" color="gray" className="mb-6">
              You need to be an authorized member of this company to access the
              dashboard.
            </Text>
            <Link href="/">
              <Button variant="classic">← Back Home</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // Step 4: Fetch company, user data, and check access (access is already verified above)
  const [company, user, access] = await Promise.all([
    whopsdk.companies.retrieve(companyId),
    whopsdk.users.retrieve(userId),
    whopsdk.users.checkAccess(companyId, { id: userId }),
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
              Managing <strong>{company.title}</strong> - Welcome, {displayName}
              !
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
              <Callout.Root color="green" className="p-2">
                <Callout.Icon>✓</Callout.Icon>
                <Callout.Text>
                  <Text size="2">Admin Access</Text>
                </Callout.Text>
              </Callout.Root>
              {company.verified && (
                <Callout.Root color="cyan" className="p-2">
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
              <Button variant="classic" size="3">
                ← Back Home
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Routing Education */}
      <Card className="mb-6">
        <Heading size="5" className="mb-4">
          🎓 Company-Centric Routing
        </Heading>
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
                <br />- Starts with <Code>biz_</Code> prefix
                <br />
                - Represents a business/company
                <br />- Used for multi-tenant scenarios
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
                <br />- Company-wide analytics
              </Text>
            </Callout.Text>
          </Callout.Root>
        </div>
      </Card>

      <Separator size="4" />

      {/* Dashboard Content */}
      <div className="space-y-6">
        {/* Analytics Overview - Key Metrics */}
        <div>
          <Heading size="6" className="mb-4 flex items-center gap-2">
            {ICONS.analytics} Analytics Overview
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Total Members"
              value={company.member_count.toLocaleString()}
              subtext="Active members"
              icon={ICONS.members}
              color="blue"
            />
            <MetricCard
              label="Company Route"
              value={company.route}
              subtext="whop.com/your-route"
              icon={ICONS.trending}
              color="green"
            />
            <MetricCard
              label="Business Type"
              value=""
              subtext="Category"
              icon={ICONS.experiences}
              color="purple"
            />
            <MetricCard
              label="Account Status"
              value={company.verified ? "Verified" : "Active"}
              subtext={company.verified ? "✓ Verified" : "In good standing"}
              icon={ICONS.checkmark}
              color={company.verified ? "green" : "blue"}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <Heading size="6" className="mb-4 flex items-center gap-2">
            {ICONS.experiences} Quick Actions
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard
              icon={ICONS.experiences}
              title="View Experiences"
              description="Manage and view all experiences"
              href="/"
              buttonText="Explore"
            />
            <ActionCard
              icon={ICONS.members}
              title="Team Members"
              description="Manage team and permissions"
              href="/"
              buttonText="Manage"
            />
            <ActionCard
              icon={ICONS.settings}
              title="Settings"
              description="Configure company settings"
              href="/"
              buttonText="Configure"
            />
            <ActionCard
              icon={ICONS.billing}
              title="Billing"
              description="View subscription and billing"
              href="/"
              buttonText="View"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <Heading size="5" className="mb-4 flex items-center gap-2">
            {ICONS.calendar} Recent Activity
          </Heading>
          <div className="space-y-3">
            <ActivityItem
              action="Member joined"
              detail={`Your community now has ${company.member_count.toLocaleString()} members`}
              time="Just now"
              icon={ICONS.members}
            />
            <ActivityItem
              action="Company verified"
              detail="Your account has been verified on Whop"
              time="2 days ago"
              icon={ICONS.checkmark}
            />
            <ActivityItem
              action="New experience created"
              detail="You published a new experience to your community"
              time="1 week ago"
              icon={ICONS.experiences}
            />
            <ActivityItem
              action="Account created"
              detail={`Account created as ${displayName}`}
              time="Started with Whop"
              icon={ICONS.checkmark}
            />
          </div>
        </Card>

        {/* Team Overview */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <Heading size="5" className="flex items-center gap-2">
              {ICONS.members} Team Overview
            </Heading>
            <Badge color="blue">{company.member_count}</Badge>
          </div>
          <Text size="3" color="gray" className="mb-4">
            You have {company.member_count.toLocaleString()} members in your
            community. Manage permissions and access levels from the team
            settings.
          </Text>
          <Callout.Root color="blue">
            <Callout.Icon>{ICONS.docs}</Callout.Icon>
            <Callout.Text>
              <Text size="2" weight="bold" className="mb-1">
                Team Management
              </Text>
              <Text size="2" color="gray">
                Add team members, assign roles, and control access to
                experiences and company data.
              </Text>
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* System Status */}
        <Card>
          <Heading size="5" className="mb-4 flex items-center gap-2">
            {ICONS.security} System Status
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusIndicator
              label="API Status"
              status="Operational"
              statusColor="green"
            />
            <StatusIndicator
              label="Database"
              status="Operational"
              statusColor="green"
            />
            <StatusIndicator
              label="Authentication"
              status="Operational"
              statusColor="green"
            />
            <StatusIndicator
              label="Storage"
              status="Operational"
              statusColor="green"
            />
          </div>
        </Card>

        {/* Navigation to Experiences */}
        <Card>
          <Heading size="5" className="mb-4">
            {ICONS.docs} Navigation Guide
          </Heading>
          <Text size="3" color="gray" className="mb-4">
            From this company dashboard, you can navigate to specific
            experiences or manage company-wide settings.
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
                <Code className="block mt-1">
                  /experiences/exp_1234567890abcdef
                </Code>
                Or for a create page:
                <br />
                <Code className="block mt-1">
                  /experiences/exp_1234567890abcdef/create
                </Code>
              </Text>
            </Callout.Text>
          </Callout.Root>
        </Card>

        {/* Data Viewer */}
        <Card>
          <Heading size="5" className="mb-3">
            {ICONS.docs} Company Data
          </Heading>
          <JsonViewer data={company} />
        </Card>

        <Card>
          <Heading size="5" className="mb-3">
            {ICONS.security} User Context
          </Heading>
          <JsonViewer data={{ companyId, userId, user }} />
        </Card>
      </div>
    </div>
  );
}

/**
 * MetricCard Component - Displays a single metric with icon and color
 */
function MetricCard({
  label,
  value,
  subtext,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  subtext: string;
  icon: string;
  color: "blue" | "green" | "purple" | "yellow" | "red" | "orange" | "cyan";
}) {
  return (
    <Card className="p-4">
      <Text size="2" weight="bold" color="gray" className="mb-3">
        {icon} {label}
      </Text>
      <Text
        size="5"
        weight="bold"
        color={color}
        className="mb-2 font-mono break-words"
      >
        {value}
      </Text>
      <Text size="2" color="gray">
        {subtext}
      </Text>
    </Card>
  );
}

/**
 * ActionCard Component - Quick action button card
 */
function ActionCard({
  icon,
  title,
  description,
  href,
  buttonText,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
  buttonText: string;
}) {
  return (
    <Card className="p-4 flex flex-col justify-between h-full">
      <div className="mb-4">
        <Text size="4" className="mb-2">
          {icon}
        </Text>
        <Heading size="4" className="mb-2">
          {title}
        </Heading>
        <Text size="2" color="gray">
          {description}
        </Text>
      </div>
      <Link href={href}>
        <Button variant="outline" size="2" className="w-full">
          {buttonText} →
        </Button>
      </Link>
    </Card>
  );
}

/**
 * ActivityItem Component - Single activity log entry
 */
function ActivityItem({
  action,
  detail,
  time,
  icon,
}: {
  action: string;
  detail: string;
  time: string;
  icon: string;
}) {
  return (
    <div className="flex gap-3 pb-3 border-b border-gray-6 last:border-b-0 last:pb-0">
      <Text size="4" className="min-w-max">
        {icon}
      </Text>
      <div className="flex-1">
        <div className="flex justify-between items-start gap-2">
          <div>
            <Text size="3" weight="bold">
              {action}
            </Text>
            <Text size="2" color="gray">
              {detail}
            </Text>
          </div>
        </div>
        <Text size="1" color="gray" className="mt-1">
          {time}
        </Text>
      </div>
    </div>
  );
}

/**
 * StatusIndicator Component - System status display
 */
function StatusIndicator({
  label,
  status,
  statusColor,
}: {
  label: string;
  status: string;
  statusColor: "green" | "red" | "yellow";
}) {
  const colorClass = {
    green: "text-green-11",
    red: "text-red-11",
    yellow: "text-yellow-11",
  }[statusColor];

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-2 border border-gray-6">
      <Text size="3" weight="bold">
        {label}
      </Text>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full bg-current ${colorClass}`} />
        <Badge color={statusColor}>{status}</Badge>
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

'use client';

import {
	Card,
	Text,
	Badge,
	Progress,
	Switch,
	Slider,
	Checkbox,
	Tabs,
	Button,
	Heading,
	Avatar,
	AvatarGroup,
	Callout,
	Separator,
	Spinner,
	CircularProgress,
	Skeleton,
	Table,
	Code,
	Kbd,
	Quote,
	Strong,
	Em,
	Link,
	Select,
	TextField,
	TextArea,
	IconButton,
	Breadcrumbs,
	Accordion,
	Dialog,
	AlertDialog,
	Popover,
	Tooltip,
	HoverCard,
	Drawer,
	Sheet,
	SegmentedControl,
	Inset,
	ScrollArea,
} from "frosted-ui";
import { useState } from "react";

export default function FrostedUIShowcase() {
	const [switchState, setSwitchState] = useState(false);
	const [sliderValue, setSliderValue] = useState(50);
	const [selectedTab, setSelectedTab] = useState("inputs");
	const [segmentedValue, setSegmentedValue] = useState("option1");
	const [selectValue, setSelectValue] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [alertDialogOpen, setAlertDialogOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-6">
			{/* Header */}
			<Card className="p-8 bg-gradient-to-br from-blue-a2 to-purple-a2 border-blue-6">
				<div className="space-y-4">
					<Heading size="8" className="font-bold">
						Frosted UI Component Library
					</Heading>
					<Text size="4" className="text-gray-11 max-w-3xl">
						A comprehensive collection of 62+ beautiful, accessible components
						built on Radix UI primitives. Explore all available components below.
					</Text>
					<div className="flex gap-2 flex-wrap pt-2">
						<Badge color="blue">62+ Components</Badge>
						<Badge color="green">Accessible</Badge>
						<Badge color="purple">TypeScript</Badge>
						<Badge color="yellow">Customizable</Badge>
					</div>
				</div>
			</Card>

			{/* Navigation Tabs */}
			<Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
				<Tabs.List className="w-full border-b border-gray-6 mb-6">
					<Tabs.Trigger value="inputs" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-9">
						Form Inputs
					</Tabs.Trigger>
					<Tabs.Trigger value="data" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-9">
						Data Display
					</Tabs.Trigger>
					<Tabs.Trigger value="navigation" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-9">
						Navigation
					</Tabs.Trigger>
					<Tabs.Trigger value="feedback" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-9">
						Feedback
					</Tabs.Trigger>
					<Tabs.Trigger value="overlays" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-9">
						Overlays
					</Tabs.Trigger>
					<Tabs.Trigger value="typography" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-9">
						Typography
					</Tabs.Trigger>
					<Tabs.Trigger value="layout" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-9">
						Layout
					</Tabs.Trigger>
				</Tabs.List>

				{/* Form Inputs Tab */}
				<Tabs.Content value="inputs" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* TextField */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Text Field
							</Heading>
							<div className="space-y-3">
								<TextField.Root placeholder="Enter text..." />
								<TextField.Root placeholder="Disabled..." disabled />
								<TextField.Root placeholder="Error state..." className="border-red-9" />
							</div>
						</Card>

						{/* TextArea */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Text Area
							</Heading>
							<TextArea placeholder="Enter multiple lines of text..." rows={4} />
						</Card>

						{/* Checkbox */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Checkbox
							</Heading>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<Checkbox id="check1" />
									<Text htmlFor="check1">Accept terms</Text>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox id="check2" defaultChecked />
									<Text htmlFor="check2">Subscribe to newsletter</Text>
								</div>
								<div className="flex items-center gap-3">
									<Checkbox id="check3" disabled />
									<Text htmlFor="check3">Disabled option</Text>
								</div>
							</div>
						</Card>

						{/* Custom Radio Buttons */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Radio Buttons
							</Heading>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<input
										type="radio"
										id="r1"
										name="radio-group"
										defaultChecked
										className="w-4 h-4 text-blue-9"
									/>
									<Text htmlFor="r1">Option 1</Text>
								</div>
								<div className="flex items-center gap-3">
									<input
										type="radio"
										id="r2"
										name="radio-group"
										className="w-4 h-4 text-blue-9"
									/>
									<Text htmlFor="r2">Option 2</Text>
								</div>
								<div className="flex items-center gap-3">
									<input
										type="radio"
										id="r3"
										name="radio-group"
										className="w-4 h-4 text-blue-9"
									/>
									<Text htmlFor="r3">Option 3</Text>
								</div>
							</div>
						</Card>

						{/* Select */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Select
							</Heading>
							<Select.Root value={selectValue} onValueChange={setSelectValue}>
								<Select.Trigger className="w-full">
									<Select.Value placeholder="Choose an option" />
								</Select.Trigger>
								<Select.Content>
									<Select.Item value="option1">Option 1</Select.Item>
									<Select.Item value="option2">Option 2</Select.Item>
									<Select.Item value="option3">Option 3</Select.Item>
								</Select.Content>
							</Select.Root>
						</Card>

						{/* Switch */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Switch
							</Heading>
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<Text>Dark Mode</Text>
									<Switch checked={switchState} onCheckedChange={setSwitchState} />
								</div>
								<div className="flex items-center justify-between">
									<Text>Notifications</Text>
									<Switch defaultChecked />
								</div>
								<div className="flex items-center justify-between">
									<Text>Auto-save</Text>
									<Switch />
								</div>
							</div>
						</Card>

						{/* Slider */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Slider
							</Heading>
							<div className="space-y-5">
								<div>
									<div className="flex justify-between mb-2">
										<Text size="2">Volume: {sliderValue}%</Text>
									</div>
									<Slider
										value={[sliderValue]}
										onValueChange={(value) => setSliderValue(value[0])}
										max={100}
										step={1}
									/>
								</div>
								<div>
									<div className="flex justify-between mb-2">
										<Text size="2">Range Slider</Text>
									</div>
									<Slider value={[30, 70]} max={100} />
								</div>
							</div>
						</Card>

						{/* Button Variants & States */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Button States
							</Heading>
							<div className="space-y-4">
								<div className="flex gap-2 flex-wrap">
									<Button variant="classic" disabled>
										Disabled
									</Button>
									<Button variant="ghost" loading>
										Loading
									</Button>
									<Button variant="outline" color="blue">
										External Link
									</Button>
								</div>
								<div className="flex gap-2 flex-wrap">
									<Button size="1" variant="soft" color="red">
										Delete
									</Button>
									<Button size="1" variant="ghost" color="green">
										Save
									</Button>
									<Button size="1" variant="outline">
										Cancel
									</Button>
								</div>
							</div>
						</Card>

						{/* Segmented Control */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Segmented Control
							</Heading>
							<SegmentedControl.Root
								value={segmentedValue}
								onValueChange={setSegmentedValue}
							>
								<SegmentedControl.List>
									<SegmentedControl.Trigger value="option1">
										Option 1
									</SegmentedControl.Trigger>
									<SegmentedControl.Trigger value="option2">
										Option 2
									</SegmentedControl.Trigger>
									<SegmentedControl.Trigger value="option3">
										Option 3
									</SegmentedControl.Trigger>
								</SegmentedControl.List>
							</SegmentedControl.Root>
						</Card>

						{/* Buttons */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Buttons
							</Heading>
							<div className="space-y-4">
								<div className="flex gap-2 flex-wrap">
									<Button variant="classic">Classic</Button>
									<Button variant="ghost">Ghost</Button>
									<Button variant="outline">Outline</Button>
									<Button variant="soft">Soft</Button>
								</div>
								<div className="flex gap-2 flex-wrap">
									<Button size="1">Small</Button>
									<Button size="2">Medium</Button>
									<Button size="3">Large</Button>
									<Button size="4">XLarge</Button>
								</div>
								<div className="flex gap-2 flex-wrap">
									<Button color="blue">Blue</Button>
									<Button color="green">Green</Button>
									<Button color="red">Red</Button>
									<Button color="purple">Purple</Button>
								</div>
							</div>
						</Card>

						{/* Icon Button */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Icon Button
							</Heading>
							<div className="flex gap-2 flex-wrap">
								<IconButton size="2" variant="classic">
									★
								</IconButton>
								<IconButton size="2" variant="ghost">
									♥
								</IconButton>
								<IconButton size="2" variant="outline">
									☆
								</IconButton>
								<IconButton size="2" variant="soft" color="blue">
									⚡
								</IconButton>
							</div>
						</Card>
					</div>
				</Tabs.Content>

				{/* Data Display Tab */}
				<Tabs.Content value="data" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Badge */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Badge
							</Heading>
							<div className="flex gap-2 flex-wrap">
								<Badge color="blue">Blue</Badge>
								<Badge color="green">Green</Badge>
								<Badge color="red">Red</Badge>
								<Badge color="yellow">Yellow</Badge>
								<Badge color="purple">Purple</Badge>
								<Badge color="gray">Gray</Badge>
							</div>
						</Card>

						{/* Avatar */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Avatar
							</Heading>
							<div className="flex gap-3">
								<Avatar
									size="4"
									src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&q=80"
									alt="User 1"
								/>
								<Avatar size="4" color="blue">
									JD
								</Avatar>
								<Avatar size="4" color="green">
									AB
								</Avatar>
								<Avatar size="4" color="red">
									CD
								</Avatar>
							</div>
						</Card>

						{/* Avatar Group */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Avatar Group
							</Heading>
							<AvatarGroup.Root limit={4}>
								<Avatar
									src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&q=80"
									alt="User 1"
								/>
								<Avatar color="blue">JD</Avatar>
								<Avatar color="green">AB</Avatar>
								<Avatar color="red">CD</Avatar>
								<Avatar color="purple">EF</Avatar>
								<Avatar color="yellow">GH</Avatar>
							</AvatarGroup.Root>
						</Card>

						{/* Callout */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Callout
							</Heading>
							<div className="space-y-3">
								<Callout.Root>
									<Callout.Icon>ℹ</Callout.Icon>
									<Callout.Text>Information callout</Callout.Text>
								</Callout.Root>
								<Callout.Root color="green">
									<Callout.Icon>✓</Callout.Icon>
									<Callout.Text>Success callout</Callout.Text>
								</Callout.Root>
								<Callout.Root color="red">
									<Callout.Icon>✕</Callout.Icon>
									<Callout.Text>Error callout</Callout.Text>
								</Callout.Root>
								<Callout.Root color="yellow">
									<Callout.Icon>⚠</Callout.Icon>
									<Callout.Text>Warning callout</Callout.Text>
								</Callout.Root>
							</div>
						</Card>

						{/* Progress */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Progress
							</Heading>
							<div className="space-y-4">
								<div>
									<Text size="2" className="mb-2">
										Loading (25%)
									</Text>
									<Progress value={25} />
								</div>
								<div>
									<Text size="2" className="mb-2">
										Uploading (65%)
									</Text>
									<Progress value={65} />
								</div>
								<div>
									<Text size="2" className="mb-2">
										Complete (100%)
									</Text>
									<Progress value={100} />
								</div>
							</div>
						</Card>

						{/* Circular Progress */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Circular Progress
							</Heading>
							<div className="flex gap-6 justify-center">
								<div className="flex flex-col items-center gap-2">
									<CircularProgress value={33} size="4" />
									<Text size="2">33%</Text>
								</div>
								<div className="flex flex-col items-center gap-2">
									<CircularProgress value={67} size="4" color="blue" />
									<Text size="2">67%</Text>
								</div>
								<div className="flex flex-col items-center gap-2">
									<CircularProgress value={100} size="4" color="green" />
									<Text size="2">100%</Text>
								</div>
							</div>
						</Card>

						{/* Skeleton */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Skeleton
							</Heading>
							<div className="space-y-3">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
							</div>
						</Card>

						{/* Spinner */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Spinner
							</Heading>
							<div className="flex gap-4 items-center justify-center">
								<Spinner size="2" />
								<Spinner size="3" />
								<Spinner size="4" />
							</div>
						</Card>

						{/* Separator */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Separator
							</Heading>
							<div className="space-y-4">
								<Text size="3">Section 1</Text>
								<Separator />
								<Text size="3">Section 2</Text>
								<Separator />
								<Text size="3">Section 3</Text>
							</div>
						</Card>

						{/* Table */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Table
							</Heading>
							<Table.Root>
								<Table.Header>
									<Table.Row>
										<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
										<Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
										<Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
									</Table.Row>
								</Table.Header>
								<Table.Body>
									<Table.Row>
										<Table.Cell>John Doe</Table.Cell>
										<Table.Cell>
											<Badge color="green">Active</Badge>
										</Table.Cell>
										<Table.Cell>Admin</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Jane Smith</Table.Cell>
										<Table.Cell>
											<Badge color="blue">Pending</Badge>
										</Table.Cell>
										<Table.Cell>User</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Bob Johnson</Table.Cell>
										<Table.Cell>
											<Badge color="red">Suspended</Badge>
										</Table.Cell>
										<Table.Cell>User</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table.Root>
						</Card>
					</div>
				</Tabs.Content>

				{/* Navigation Tab */}
				<Tabs.Content value="navigation" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Breadcrumbs */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Breadcrumbs
							</Heading>
							<Breadcrumbs>
								<Breadcrumbs.Item>Home</Breadcrumbs.Item>
								<Breadcrumbs.Separator>/</Breadcrumbs.Separator>
								<Breadcrumbs.Item>Components</Breadcrumbs.Item>
								<Breadcrumbs.Separator>/</Breadcrumbs.Separator>
								<Breadcrumbs.Item>Navigation</Breadcrumbs.Item>
							</Breadcrumbs>
						</Card>

						{/* Accordion */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Accordion
							</Heading>
							<Accordion.Root type="multiple" className="w-full">
								<Accordion.Item value="item-1">
									<Accordion.Trigger>What is Frosted UI?</Accordion.Trigger>
									<Accordion.Content>
										Frosted UI is a collection of beautiful, accessible components
										for building modern web applications.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-2">
									<Accordion.Trigger>How do I get started?</Accordion.Trigger>
									<Accordion.Content>
										Simply import the components you need from the frosted-ui
										package and start building.
									</Accordion.Content>
								</Accordion.Item>
								<Accordion.Item value="item-3">
									<Accordion.Trigger>Is it customizable?</Accordion.Trigger>
									<Accordion.Content>
										Yes! All components are fully customizable through CSS
										variables and class names.
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</Card>

						{/* Tabs (already shown above) */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Tabs (Primary)
							</Heading>
							<Tabs.Root defaultValue="tab1" className="space-y-3">
								<Tabs.List>
									<Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
									<Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
									<Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="tab1">
									<Text>Content for Tab 1</Text>
								</Tabs.Content>
								<Tabs.Content value="tab2">
									<Text>Content for Tab 2</Text>
								</Tabs.Content>
								<Tabs.Content value="tab3">
									<Text>Content for Tab 3</Text>
								</Tabs.Content>
							</Tabs.Root>
						</Card>
					</div>
				</Tabs.Content>

				{/* Feedback Tab */}
				<Tabs.Content value="feedback" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* All Progress Types */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Loading States
							</Heading>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									<Spinner size="3" />
									<Text>Loading...</Text>
								</div>
								<Progress value={45} />
								<CircularProgress value={75} size="3" />
								<Skeleton className="h-10 w-full" />
							</div>
						</Card>

						{/* Alert Messages */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Status Messages
							</Heading>
							<div className="space-y-3">
								<Callout color="green">
									<Callout.Icon>✓</Callout.Icon>
									<Callout.Text>Operation completed successfully</Callout.Text>
								</Callout>
								<Callout color="blue">
									<Callout.Icon>ℹ</Callout.Icon>
									<Callout.Text>New information available</Callout.Text>
								</Callout>
								<Callout color="yellow">
									<Callout.Icon>⚠</Callout.Icon>
									<Callout.Text>Please review your settings</Callout.Text>
								</Callout>
								<Callout color="red">
									<Callout.Icon>✕</Callout.Icon>
									<Callout.Text>Something went wrong</Callout.Text>
								</Callout>
							</div>
						</Card>
					</div>
				</Tabs.Content>

				{/* Overlays Tab */}
				<Tabs.Content value="overlays" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Dialog */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Dialog
							</Heading>
							<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
								<Dialog.Trigger asChild>
									<Button variant="classic">Open Dialog</Button>
								</Dialog.Trigger>
								<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-1 border border-gray-6 rounded-lg p-6 w-full max-w-md">
									<Dialog.Title>Dialog Title</Dialog.Title>
									<Dialog.Description>
										This is a dialog example using Frosted UI components.
									</Dialog.Description>
									<div className="flex gap-2 justify-end mt-6">
										<Dialog.Close asChild>
											<Button variant="ghost">Cancel</Button>
										</Dialog.Close>
										<Dialog.Close asChild>
											<Button variant="classic">Confirm</Button>
										</Dialog.Close>
									</div>
								</Dialog.Content>
							</Dialog.Root>
						</Card>

						{/* Alert Dialog */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Alert Dialog
							</Heading>
							<AlertDialog.Root
								open={alertDialogOpen}
								onOpenChange={setAlertDialogOpen}
							>
								<AlertDialog.Trigger asChild>
									<Button variant="outline" color="red">
										Delete Item
									</Button>
								</AlertDialog.Trigger>
								<AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-1 border border-gray-6 rounded-lg p-6 w-full max-w-md">
									<AlertDialog.Title>Delete Item</AlertDialog.Title>
									<AlertDialog.Description>
										Are you sure you want to delete this item? This action cannot
										be undone.
									</AlertDialog.Description>
									<div className="flex gap-2 justify-end mt-6">
										<AlertDialog.Cancel asChild>
											<Button variant="ghost">Cancel</Button>
										</AlertDialog.Cancel>
										<AlertDialog.Action asChild>
											<Button variant="outline" color="red">
												Delete
											</Button>
										</AlertDialog.Action>
									</div>
								</AlertDialog.Content>
							</AlertDialog.Root>
						</Card>

						{/* Drawer */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Drawer
							</Heading>
							<Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
								<Drawer.Trigger asChild>
									<Button variant="soft">Open Drawer</Button>
								</Drawer.Trigger>
								<Drawer.Content className="fixed bottom-0 left-0 right-0 bg-gray-1 border-t border-gray-6 rounded-t-lg p-6 w-full max-h-[80vh]">
									<Drawer.Title>Drawer Title</Drawer.Title>
									<Drawer.Description>
										This is a drawer example. Drawers are great for mobile
										interfaces.
									</Drawer.Description>
									<div className="mt-4 space-y-4">
										<Text>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Suspendisse varius enim in eros elementum tristique.
										</Text>
									</div>
									<div className="flex gap-2 justify-end mt-6">
										<Drawer.Close asChild>
											<Button variant="ghost">Close</Button>
										</Drawer.Close>
									</div>
								</Drawer.Content>
							</Drawer.Root>
						</Card>

						{/* Sheet */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Sheet
							</Heading>
							<Sheet.Root open={sheetOpen} onOpenChange={setSheetOpen}>
								<Sheet.Trigger asChild>
									<Button variant="classic" color="blue">
										Open Sheet
									</Button>
								</Sheet.Trigger>
								<Sheet.Content className="fixed right-0 top-0 bottom-0 bg-gray-1 border-l border-gray-6 p-6 w-full max-w-md">
									<Sheet.Title>Sheet Title</Sheet.Title>
									<Sheet.Description>
										This is a sheet example. Sheets slide in from the side.
									</Sheet.Description>
									<div className="mt-4 space-y-4">
										<Text>
											Sheets are great for supplementary content that doesn't
											require immediate attention.
										</Text>
									</div>
									<div className="flex gap-2 justify-end mt-6">
										<Sheet.Close asChild>
											<Button variant="ghost">Close</Button>
										</Sheet.Close>
									</div>
								</Sheet.Content>
							</Sheet.Root>
						</Card>

						{/* Tooltip */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Tooltip
							</Heading>
							<div className="flex gap-4 justify-center items-center">
								<Tooltip.Root>
									<Tooltip.Trigger asChild>
										<Button variant="outline">Hover me</Button>
									</Tooltip.Trigger>
									<Tooltip.Portal>
										<Tooltip.Content className="bg-gray-12 text-gray-1 px-3 py-2 rounded text-sm">
											This is a tooltip
											<Tooltip.Arrow className="fill-gray-12" />
										</Tooltip.Content>
									</Tooltip.Portal>
								</Tooltip.Root>
							</div>
						</Card>

						{/* Popover */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Popover
							</Heading>
							<div className="flex justify-center">
								<Popover.Root>
									<Popover.Trigger asChild>
										<Button variant="soft">Click me</Button>
									</Popover.Trigger>
									<Popover.Portal>
										<Popover.Content className="bg-gray-1 border border-gray-6 rounded-lg p-4 w-64">
											<Text size="2">
												This is a popover. Popovers are great for contextual
												actions and information.
											</Text>
											<Popover.Arrow className="fill-gray-1 stroke-gray-6" />
										</Popover.Content>
									</Popover.Portal>
								</Popover.Root>
							</div>
						</Card>

						{/* Hover Card */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Hover Card
							</Heading>
							<div className="flex justify-center">
								<HoverCard.Root>
									<HoverCard.Trigger asChild>
										<Link href="#" className="text-blue-11 underline">
											@username
										</Link>
									</HoverCard.Trigger>
									<HoverCard.Portal>
										<HoverCard.Content className="bg-gray-1 border border-gray-6 rounded-lg p-4 w-80">
											<div className="flex gap-3">
												<Avatar color="blue">JD</Avatar>
												<div className="flex-1">
													<Text className="font-semibold">@username</Text>
													<Text size="2" className="text-gray-11">
														Frontend Developer at Acme Corp
													</Text>
													<Text size="2" className="text-gray-11">
														Loves building beautiful UIs
													</Text>
												</div>
											</div>
											<HoverCard.Arrow className="fill-gray-1 stroke-gray-6" />
										</HoverCard.Content>
									</HoverCard.Portal>
								</HoverCard.Root>
							</div>
						</Card>
					</div>
				</Tabs.Content>

				{/* Typography Tab */}
				<Tabs.Content value="typography" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Headings */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Headings
							</Heading>
							<div className="space-y-3">
								<Heading size="8">Heading 8</Heading>
								<Heading size="7">Heading 7</Heading>
								<Heading size="6">Heading 6</Heading>
								<Heading size="5">Heading 5</Heading>
								<Heading size="4">Heading 4</Heading>
								<Heading size="3">Heading 3</Heading>
								<Heading size="2">Heading 2</Heading>
								<Heading size="1">Heading 1</Heading>
							</div>
						</Card>

						{/* Text */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Text
							</Heading>
							<div className="space-y-3">
								<Text size="4">Size 4 - Large text</Text>
								<Text size="3">Size 3 - Medium text</Text>
								<Text size="2">Size 2 - Regular text</Text>
								<Text size="1">Size 1 - Small text</Text>
								<Text className="text-gray-11">Muted text</Text>
								<Text className="text-blue-11">Blue text</Text>
								<Text className="text-green-11">Green text</Text>
								<Text className="text-red-11">Red text</Text>
							</div>
						</Card>

						{/* Code & Inline */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Code & Inline Elements
							</Heading>
							<div className="space-y-3">
								<Text>
									Inline code: <Code>npm install frosted-ui</Code>
								</Text>
								<Text>
									Keyboard shortcut: <Kbd>⌘ + K</Kbd>
								</Text>
								<Text>
									<Strong>Bold text</Strong> with regular text
								</Text>
								<Text>
									<Em>Emphasized text</Em> for emphasis
								</Text>
								<blockquote>
									<Quote>
										This is a blockquote. Great for showcasing testimonials or
										important quotes.
									</Quote>
								</blockquote>
							</div>
						</Card>

						{/* Links */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Links
							</Heading>
							<div className="space-y-3">
								<Text>
									Regular link: <Link href="#">Click here</Link>
								</Text>
								<Text>
									External link:{" "}
									<Link href="https://storybook.whop.dev" target="_blank">
										View Storybook →
									</Link>
								</Text>
							</div>
						</Card>
					</div>
				</Tabs.Content>

				{/* Layout Tab */}
				<Tabs.Content value="layout" className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Card */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Card
							</Heading>
							<div className="space-y-3">
								<Card className="p-4">Basic card</Card>
								<Card className="p-4 border-2 border-blue-6">
									Bordered card
								</Card>
								<Card className="p-4 bg-blue-a1">Colored card</Card>
							</div>
						</Card>

						{/* Inset */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Inset
							</Heading>
							<Inset side="all" className="p-6 bg-gray-a2 rounded border">
								<Text>This is inset content with padding on all sides</Text>
							</Inset>
						</Card>

						{/* Scroll Area */}
						<Card className="p-6">
							<Heading size="5" className="mb-4">
								Scroll Area
							</Heading>
							<ScrollArea className="h-48 border border-gray-6 rounded p-4">
								<div className="space-y-2">
									{[...Array(20)].map((_, i) => (
										<Text key={i} size="2">
											Scrollable item {i + 1}
										</Text>
									))}
								</div>
							</ScrollArea>
						</Card>
					</div>
				</Tabs.Content>
			</Tabs.Root>

			{/* Footer */}
			<Card className="p-6 bg-gradient-to-br from-gray-a1 to-gray-a2">
				<div className="text-center space-y-3">
					<Heading size="6">Built with Frosted UI</Heading>
					<Text size="2" className="text-gray-11">
						Explore the full component library at{" "}
						<Link href="https://storybook.whop.dev" target="_blank">
							storybook.whop.dev
						</Link>
					</Text>
					<div className="flex gap-2 justify-center pt-2">
						<Badge variant="soft">62+ Components</Badge>
						<Badge variant="soft">Radix-Based</Badge>
						<Badge variant="soft">TypeScript</Badge>
						<Badge variant="soft">Accessible</Badge>
					</div>
				</div>
			</Card>
		</div>
	);
}

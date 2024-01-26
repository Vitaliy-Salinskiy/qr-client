import { Meta, StoryObj } from "@storybook/react"
import HistoryTable from "../components/HIstoryTable"
import { ContextProvider } from "../providers/ContextProvider"

const meta = {
	title: "Components/HistoryTable",
	component: HistoryTable,
	decorators: [(Story) => <ContextProvider><Story /></ContextProvider>],
	tags: ['autodocs'],
} satisfies Meta<typeof HistoryTable>

export default meta;

type Story = StoryObj<typeof HistoryTable>

export const Default: Story = {}
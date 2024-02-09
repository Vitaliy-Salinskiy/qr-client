import { Meta, StoryObj } from "@storybook/react";
import HistoryTable from "../components/HIstoryTable";

const meta = {
  title: "Components/HistoryTable",
  component: HistoryTable,
  tags: ["autodocs"],
} satisfies Meta<typeof HistoryTable>;

export default meta;

type Story = StoryObj<typeof HistoryTable>;

export const Default: Story = {};

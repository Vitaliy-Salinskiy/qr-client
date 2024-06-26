import type { Meta, StoryObj } from "@storybook/react";
import LeadersTable from "../components/LeadersTable";

export default {
  title: "components/LeadersTable",
  component: LeadersTable,
  tags: ["autodocs"],
} satisfies Meta<typeof LeadersTable>;

type Story = StoryObj<typeof LeadersTable>;

export const Default: Story = {
  args: {
    isExtended: false,
  },
};

export const Extended: Story = {
  args: {
    isExtended: true,
  },
};

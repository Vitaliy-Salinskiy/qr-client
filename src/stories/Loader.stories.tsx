import { Meta, StoryObj } from "@storybook/react";
import { ContextProvider } from "../providers/ContextProvider";
import Loader from "../components/Loader";

export default {
	title: "components/Loader",
	component: Loader,
	decorators: [(Story) => <ContextProvider><Story /></ContextProvider>],
	tags: ['autodocs'],
} satisfies Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {};
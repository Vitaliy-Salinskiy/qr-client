import { Meta, StoryObj } from "@storybook/react";
import LinkButton from "../components/LinkButton";
import { BrowserRouter } from "react-router-dom";

const meta = {
	title: "Components/LinkButton",
	component: LinkButton,
	decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>],
	tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>

export default meta;

type Story = StoryObj<typeof LinkButton>

export const Default: Story = {
	args: {
		to: "/home",
		children: 'Home'
	}
}

export const LongText: Story = {
	args: {
		to: "/home",
		children: 'Lorem lorem lorem lorem'
	}
}
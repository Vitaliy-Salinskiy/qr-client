import { Meta, StoryObj } from "@storybook/react";
import { GoodItem } from "../components/GoodItem";
import { ContextProvider } from "../providers/ContextProvider";

const meta = {
	title: "Components/GoodItem",
	component: GoodItem,
	decorators: [(Story) => <ContextProvider><Story /></ContextProvider>],
	parameters: {
		layout: "centered"
	},
	tags: ['autodocs'],
	argTypes: {
		setIsLoading: {
			action: "setIsLoading"
		}
	}
} satisfies Meta<typeof GoodItem>

export default meta;

type Story = StoryObj<typeof GoodItem>

export const Default: Story = {
	args: {
		userId: '9c46814aaf58f43eb1ad1bbc94c63e81',
		product: { _id: '65afcd27775bea5debb91833', __v: 1, image: "uploads/d10dbc9d90eccd707d3f26b527342935.webp", name: "new jeans", price: 19.99 }
	}
}

export const WrongId: Story = {
	args: {
		userId: '9c46814aaf58f43eb1ad1bbc94c63e81',
		product: { _id: '', __v: 1, image: "", name: "wrong id", price: 19.99 }
	}
}

export const WithDefaultImage: Story = {
	args: {
		userId: "9c46814aaf58f43eb1ad1bbc94c63e81",
		product: { _id: '65afcd27775bea5debb91833', __v: 1, image: "", name: "random title of the product", price: 215 }
	}
} 
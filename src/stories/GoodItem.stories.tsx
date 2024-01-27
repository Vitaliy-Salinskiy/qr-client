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
		product: { "_id": "65b52c1d09b9befb5dedcc69", "name": "Pen 🖋", "price": 1, "image": "uploads\\822beaffc491abfcd2c8586efe3afa21.webp", "__v": 0 }
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
		product: { _id: '65b52c1d09b9befb5dedcc69', __v: 1, image: "", name: "random title of the product", price: 215 }
	}
}


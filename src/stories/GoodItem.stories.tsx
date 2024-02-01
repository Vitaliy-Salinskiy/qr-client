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
} satisfies Meta<typeof GoodItem>

export default meta;

type Story = StoryObj<typeof GoodItem>

export const Default: Story = {
	args: {
		product: {
			_id: "65bbbee26e1d87c108172a89",
			name: "Pen 🖋",
			price: 1,
			image: "uploads/af66719e3b3a293f885655ec5d478c60.webp",
			__v: 0
		}
	}
}

export const WithDefaultImage: Story = {
	args: {
		product: { _id: '65b52c1d09b9befb5dedcc69', __v: 1, image: "", name: "random title of the product", price: 215 }
	}
}


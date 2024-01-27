import { Meta, StoryObj } from "@storybook/react";
import { ContextProvider } from "../providers/ContextProvider";
import { RequestItem } from "../components/RequestItem";
import { RequestStatus } from "../interfaces";

export default {
	title: "components/RequestItem",
	component: RequestItem,
	decorators: [(Story) => <ContextProvider><Story /></ContextProvider>],
	tags: ['autodocs'],
	argTypes: {
		setIsLoading: {
			action: "setIsLoading"
		}
	}
} satisfies Meta<typeof RequestItem>;

type Story = StoryObj<typeof RequestItem>;

export const Default: Story = {
	args: {
		req: {
			_id: "610e11f36b2f1d002272c6f2",
			userId: {
				_id: "610e11f36b2f1d002272c6f3",
				id: "9c46814aaf58f43eb1ad1bbc94c63e81",
				lastScanned: "2022-08-08T10:00:00.000Z",
				timesScanned: 5,
				requests: [],
				scanHistory: [],
				__v: 0,
				name: "John",
				surname: "Doe"
			},
			productId: {
				_id: "610e11f36b2f1d002272c6f4",
				name: "Product A",
				price: 10,
				image: "product_a.jpg",
				__v: 0
			},
			status: RequestStatus.PENDING,
			createdAt: "2022-08-08T12:30:00.000Z",
			updatedAt: "2022-08-08T12:30:00.000Z",
			__v: 0
		}
	}
};

export const PendingExtended: Story = {
	args: {
		changeable: true,
		req: {
			_id: "610e11f36b2f1d002272c6f2",
			userId: {
				_id: "610e11f36b2f1d002272c6f3",
				id: "9c46814aaf58f43eb1ad1bbc94c63e81",
				lastScanned: "2022-08-08T10:00:00.000Z",
				timesScanned: 5,
				requests: [],
				scanHistory: [],
				__v: 0,
				name: "John",
				surname: "Doe"
			},
			productId: {
				_id: "610e11f36b2f1d002272c6f4",
				name: "Product A",
				price: 10,
				image: "product_a.jpg",
				__v: 0
			},
			status: RequestStatus.PENDING,
			createdAt: "2022-08-08T12:30:00.000Z",
			updatedAt: "2022-08-08T12:30:00.000Z",
			__v: 0
		}
	}
};

export const AllowedExtended: Story = {
	args: {
		changeable: true,
		req: {
			_id: "610e11f36b2f1d002272c6f2",
			userId: {
				_id: "610e11f36b2f1d002272c6f3",
				id: "9c46814aaf58f43eb1ad1bbc94c63e81",
				lastScanned: "2022-08-08T10:00:00.000Z",
				timesScanned: 5,
				requests: [],
				scanHistory: [],
				__v: 0,
				name: "John",
				surname: "Doe"
			},
			productId: {
				_id: "610e11f36b2f1d002272c6f4",
				name: "Product A",
				price: 10,
				image: "product_a.jpg",
				__v: 0
			},
			status: RequestStatus.ALLOWED,
			createdAt: "2022-08-08T12:30:00.000Z",
			updatedAt: "2022-08-08T12:30:00.000Z",
			__v: 0
		}
	}
};

export const DeniedExtended: Story = {
	args: {
		changeable: true,
		req: {
			_id: "610e11f36b2f1d002272c6f2",
			userId: {
				_id: "610e11f36b2f1d002272c6f3",
				id: "9c46814aaf58f43eb1ad1bbc94c63e81",
				lastScanned: "2022-08-08T10:00:00.000Z",
				timesScanned: 5,
				requests: [],
				scanHistory: [],
				__v: 0,
				name: "John",
				surname: "Doe"
			},
			productId: {
				_id: "610e11f36b2f1d002272c6f4",
				name: "Product A",
				price: 10,
				image: "product_a.jpg",
				__v: 0
			},
			status: RequestStatus.DENIED,
			createdAt: "2022-08-08T12:30:00.000Z",
			updatedAt: "2022-08-08T12:30:00.000Z",
			__v: 0
		}
	}
};
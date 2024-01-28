export interface IScanHistory {
	date: string;
	totalScans: number;
	_id: string;
}

export interface IProduct {
	_id: string;
	name: string;
	price: number;
	image: string;
	__v: number;
}

export interface IUser {
	_id: string;
	id: string;
	lastScanned: string;
	timesScanned: number;
	requests: IRequest[];
	scanHistory: IScanHistory[];
	__v: number;
	name: string;
	surname: string;
}

export enum RequestStatus {
	ALLOWED = "allowed",
	DENIED = "denied",
	PENDING = "pending",
}

export interface IRequest {
	_id: string;
	userId: IUser;
	productId: IProduct;
	status: RequestStatus;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface ILoginDto {
	username: string;
	password: string;
}

export interface IProductDto {
	name: string;
	price: number;
}
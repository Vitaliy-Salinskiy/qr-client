interface IUser {
	id: string;
	lastScanned: string | null;
	name?: string;
	surname?: string;
	timesScanned: number;
	__v: number;
	_id: string;
}

export interface IReq {
    user: string;
    id: string;
    goodInfo: {
        title: string;
        price: number;
    };
}

export interface IGood {
    img: string;
    title: string;
    price: number;
}
interface IProductDto {
	id: number;
	name: string;
	updatedOn: string;
	price: number;
	priceUnit: string;
	source: string;
	imageUrl: string;
}

export default class Product {
	id: number;
	name: string;
	date: Date;
	price: number;
	priceUnit: string;
	source: string;
	imageUrl: string;

	/**
	 *
	 */
	constructor({ id, name, updatedOn, price, priceUnit, source, imageUrl }: IProductDto) {
		this.id = id;
		this.name = name;
		this.date = new Date(updatedOn);
		this.price = price;
		this.priceUnit = priceUnit;
		this.source = source;
		this.imageUrl = imageUrl;
	}

	static fromJson(obj: IProductDto) {
		return new Product(obj);
	}
}

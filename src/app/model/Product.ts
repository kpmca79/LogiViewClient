import { ProductOption } from "./ProductOption";
export class Product {


	title:String;
	description:String;
	quantity:Number;
	totalqnt:Number;
	price:Number;
	pricePrefix:String;
	priceNote:String;
	imagelist:String[];
	defaultimage:String;
	isSelected:Boolean;
	make:String;
	productOptions:ProductOption[];
	
	
}

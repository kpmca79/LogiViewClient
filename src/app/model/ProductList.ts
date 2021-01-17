import { Product } from "./Product";
export class ProductList  {
	products:Product[];
	currency:string;
	currencysymbol:String;
	taxname:String;
	taxrate:Number;
	total:number;
	subtotal:Number;
    taxamount:Number;
	deliverychrg:Number;
	showbill=false;
	
	transactionId:string;
	trasactionStatus:string;
	transactionMessage:string;
	cardNumber:String;
	phone:string;
	
	userName:string;
	email:string;
	billingAddress:string;
	deliveryAddress:string;
	
}

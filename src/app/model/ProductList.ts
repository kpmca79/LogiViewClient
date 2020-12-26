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
	
	
}

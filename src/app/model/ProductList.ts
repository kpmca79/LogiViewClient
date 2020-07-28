import { Product } from "./Product";
export class ProductList  {
	products:Product[];
	currency:String;
	currencysymbol:String;
	taxname:String;
	taxrate:Number;
	total:Number;
	subtotal:Number;
    taxamount:Number;
	deliverychrg:Number;
    showbill=false;
	
	
}

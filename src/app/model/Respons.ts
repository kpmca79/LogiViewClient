import { FormField } from "../model/FormField";
import { ProductList } from "./ProductList";

export class FrmResponse {
    id: string;
    formImages: string[];
    
    fields: ResponseField[];
    publishdate:Date;
    submittedTime:Date
    lastupdatedTime:Date
	lastUpdateBy:string;
	lastUpdateById:string;
	status:string='Active';
    formID: String;
    ipAddress:string;
	country:string;
	state:string;
	city:string;
	latitude:string;
	longitude:string;
   

}
export class UploadFile{
	name:string;
	size:number;
	type:string;
	id  :string;
}
export class ResponseField {
    displayName:string;
	fieldId:string;
	value:string;
	numVal:number;
	boolVal:boolean;
	valueType:string;
	fieldType:string;
	listVal:string[];
	jsonVal:any;
	productList:ProductList;
	hasChildren:boolean;
	subFields:ResponseField[];
	files:UploadFile[]; 
	
}



import { FormControl } from "@angular/forms";
import { SubField } from "app/model/SubField";
import { Option } from "app/model/Option";
import { ProductList } from "app/model/ProductList";

export class FormField {
    id: string;
    status:string;
    name: string;
    fname:string;
    message:string;
    type: string;
    title: string;
    maxlen: number;
    minlen: number;
    defValue:number;
    step:number;
    required: boolean;
    selOptions: Option[];
    validation: string[];
    innerHtml: string;
    selectedOption:string[];
    selectedOptionStr:string;
    selectedValidation:string;
    checked: boolean;
    disabled: boolean;
    visible:boolean;
    onlypast: boolean;
    onlyfuture: boolean;
    excludePresent: boolean;
    color: string[];
    selectedColor: string;
    mindate: Date;
    maxdate: Date;
     
    selectedDate: Date;
    types: string;
    frmControl: FormControl;
    submitValue: String;
    subfields: SubField[];
    selectedIcon: String;
    note:String;
    maxFileSize:number;
    maxFiles:number;
    acceptFileTypes:any;
    excludeDays:string;
    dayFilter:any;
    sectionStyle:string;
    dropDownMultiLevel: boolean;
    dropDownMultiSelect: boolean;
    dropDownSplit:boolean;
    dispName:string;
    signature:string;
    signImage:any;
    survey:any;
    elemType:string;
    productList:ProductList;

}
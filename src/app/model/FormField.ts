import { FormControl } from "@angular/forms";
import { SubField } from "app/model/SubField";

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
    required: boolean;
    options: string[];
    validation: string[];
    innerHtml: string;
    selectedOption:string;
    selectedValidation:string;
    checked: boolean;
    disabled: boolean;
    color: string[];
    selectedColor: string;
    mindate: Date;
    maxdate: Date;
    selectedDate: Date;
    types: string;
    frmControl: FormControl;
    submitValue: String;
    subfields: SubField[];
    
}
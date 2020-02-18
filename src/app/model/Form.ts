import { FormField } from "../model/FormField";

export class Form {
    id: string;
    name: string;
    type: string;
    title: string;
    path: string;
    status: string;
    bgColor: string;
    bgImage: string;
    opacity: number;
    header: string;
    footer: string;
    theme: string;
    formFields: FormField[];
    response: number;
    thanksdata: string;
    thankstype: string;
    formwidth:  number;

    publishdate:Date;
    publishtime: string
    publishtimezone: string;
    publishstatus: string;
    visibility: string;
    publishnow: boolean;
    createdDate: Date;
    publishuptodate: Date;
    publishuptotime: string;
    _links: any;
    style: string;
    btnStyle: string;

}


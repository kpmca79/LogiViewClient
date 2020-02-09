import { ResponseEntry } from "../model/ResponseEntry";

export class FormResponse {
    id: string;
    formId:string;
    IpAddress: string;
    resTime: Date;
    responseEntry: ResponseEntry[];
    _links:any;
    
}


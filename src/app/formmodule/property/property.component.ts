import { Component, OnInit } from '@angular/core';
import { Input } from "@angular/core";
import { Form } from "../..//model/Form";
import { FormService } from "../../services/form.service";

import { Output } from "@angular/core";
import { EventEmitter, ElementRef, Inject } from "@angular/core";
import { MessagingService } from "../../services/messaging.service";
import { MatIconRegistry } from "@angular/material/icon";
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormField } from "app/model/FormField";


@Component( {
    selector: 'form-property',
    templateUrl: './property.component.html',
    styleUrls: ['./property.component.css']
} )

export class PropertyComponent implements OnInit {
    @Input() frm: Form;
    @Input() formID: String;
    @Input() actvieFormField:FormField;
    @Input() type: String;
    @Input() safeBgURL: any;

    step = -1;
    fontSizeList = [8, 9, 10, 11, 12, 14, 116, 18, 20, 22, 24, 26, 28]
    fontSize = 15;
    fontColor = "#000000";
    imgURL = "/api/file/";
    clrTheme = [{ bg: '#8DE4AF', pg: '#05396B', fn: '#EDF5E0' },
    { bg: '#3FEEE7', pg: '#FC4444', fn: '#CAFAFE' },
    { bg: '#FAED25', pg: '#46344E', fn: '#9D8D8E' },
    { bg: '#64495C', pg: '#2E1115', fn: '#ADADAD' },
    { bg: '#0C0032', pg: '#3500D4', fn: '#FFFFFF' },
    { bg: '#C2B9B0', pg: '#E7717D', fn: '#C2C9CF' },
    { bg: '#C5C6C8', pg: '#202833', fn: '#66FCF1' },
    { bg: '#87C232', pg: '#618930', fn: '#FFFFFF' },
    { bg: '#A4B3B6', pg: '#44318D', fn: '#D93F87' },



    ];


    supportedFonts = ['Cursive', 'sans-serif', 'sarif', 'monospace', 'Courier New', 'Arial',
        'Times New Roman', 'Georgia', 'impact', 'Comic Sans MS',
        'Trebuchet MS', 'Helvetica', 'Garamond', 'Verdana', 'Bookman Old Style', 'Palatino', 'Courier'];
    selectedFont = 'Helvetica Neue';

    bgFile;
    fileID;
    srcResult;
    opacity;
    btnFC = "#000000";
    btnBGC = "#00ff00";
    btnWidth = '0.0';
    bgImage;
    frmBGImage;

    imageURL: String = "";
    isDarkTheme: boolean = false;
    chgEvent: any = { "safeBgURL": "", "opacity": "", "bgImage": "", "theme": false, width: 600, "frmStyle": "", "frmbtnStyle": "" };

    constructor( private stdSrv: FormService,
       
        private mService: MessagingService,
        private iconRegistry: MatIconRegistry,
        public dialog: MatDialog
    ) {
       

    }

    ngOnInit() {


    }
  
}


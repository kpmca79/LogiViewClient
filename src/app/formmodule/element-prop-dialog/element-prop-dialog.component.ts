import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubField } from "app/model/SubField";
import { FormField } from "app/model/FormField";

@Component( {
    selector: 'app-element-prop-dialog',
    templateUrl: './element-prop-dialog.component.html',
    styleUrls: ['./element-prop-dialog.component.css']
} )
export class ElementPropDialogComponent implements OnInit {

    modalTitle: string;
    modalMessage: String;
    selectedValue: String;
    options: String[];
    valData = [];
    subfields: SubField[];
    reqvalidation: string[];
    editField: string;
    selectedValidations: string[];
    flr_options: Object =
    {
        charCounterCount: true,
        imageUploadParam: 'image_param',
        //            imageUploadURL: '/editorImages',
        imageUploadParams: { id: 'my_editor' },
        imageUploadMethod: 'POST',
        imageMaxSize: 5 * 1024 * 1024,
        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
        events: {
            'froalaEditor.initialized': function() {
                console.log( 'flr initialized' );
            },
            'froalaEditor.image.beforeUpload': function( e, editor, images ) {

                if ( images.length ) {
                    // Create a File Reader.
                    const reader = new FileReader();
                    // Set the reader to insert images when they are loaded.
                    reader.onload = ( ev ) => {
                        const result = ev.target['result'];
                        editor.image.insert( result, null, null, editor.image.get() );
                        console.log( ev, editor.image, ev.target['result'] )
                    };
                    // Read image as base64.
                    reader.readAsDataURL( images[0] );
                }
                // Stop default upload chain.
                return false;
            }

        }
    }

    show_placeHolder = true;
    show_error = true;
    show_subfields = false;
    show_name = true;
    show_mandatory = true;
    dropdownSettings = {};
//    data1: any = {
//        fname: '', title: '', message: '', options: '', validation: '', required: '', type: '',
//        minlen: 0, maxlen: 64, selectedValidations: 'None', reqvalidation: '', frmtitle: '', selectedColor: '',
//        color: '', checked: false, disabled: false, frmstatus: '', selectedDate: '', subfield: ''
//    };
    data1=new FormField();
    constructor( @Inject( MAT_DIALOG_DATA ) public data: any ) {
        this.modalTitle = data.title;
        this.reqvalidation = data.reqvalidation;
        this.modalMessage = data.message;
        this.data1 = data;
        this.subfields = data.subfields;
        console.log( 'data------>', data );
        console.log( 'data1------>', this.data1 );
        this.options = data.options;

        //        console.log('444444444--', this.options);
    }

    ngOnInit() {

        this.dropdownSettings = {
            singleSelection: false,
            text: "Select Countries",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: false,
            classes: "myclass custom-class"
        };
        let i = 0;
        this.valData.push( { "value": 0, "viewValue": 'None' } )
        console.log( "data1---------->", this.data1 );
        if ( this.data1.type == 'fullname' ) {
            this.show_placeHolder = false;
            this.show_error = false;
            this.show_subfields = true;
            console.log( "Inside full name --this.show_subfields-->", this.show_subfields );
            
            console.log( "Inside full name --this.subfields-->", this.subfields);

        }
        else if ( this.data1.type == 'address' ) {
            this.show_placeHolder = false;
            this.show_error = false;
            this.show_subfields = true;
        }
        else if ( this.data1.type == 'section' ) {
            this.show_name = false;
            this.show_error = false;
            this.show_mandatory = false;
        }
        else if ( this.data1.type == 'submit' ) {
            this.show_name = false;
            this.show_error = false;
            this.show_mandatory = false;
        }
        if ( this.data1.validation ) {
            this.data1.validation.forEach( element => {
                i++;
                this.valData.push( { "value": i, "viewValue": element } )
            } );
        }
        if ( this.options ) {
            this.options.forEach( element => {
                console.log( '5555555-->', element );
            } );
        }
    }
    updateList( id: number, property: string, event: any ) {
        const editField = event.target.textContent;
        this.options[id] = editField;
    }

    add() {
        console.log( 'adding option ' + this.options.length );
        const op = 'Option ' + ( this.options.length + 1 );
        this.options.push( op );
    }
    remove( id: any ) {

        console.log( 'removing ', id )
        if ( this.options.length > 1 )
            this.options.splice( id, 1 );

    }

    changeValue( id: number, property: string, event: any ) {
        this.editField = event.target.textContent;
    }








    onItemSelect( item: any ) {
        console.log( item );
        console.log( this.selectedValidations );
    }
    OnItemDeSelect( item: any ) {
        console.log( item );
        console.log( this.selectedValidations );
    }
    onSelectAll( items: any ) {
        console.log( items );
    }
    onDeSelectAll( items: any ) {
        console.log( items );
    }

}

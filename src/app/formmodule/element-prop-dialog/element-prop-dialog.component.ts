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
    icons:String[]=[];
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
    show_icon=true;
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
        this.setMatIcons();
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
    
    setMatIcons()
    {
       
        //people
        this.icons.push("account_circle");
        this.icons.push("account_box");
        this.icons.push("face");
        this.icons.push("perm_identity");
        this.icons.push("record_voice_over");
        this.icons.push("rowing");
        this.icons.push("contacts");
        this.icons.push("sentiment_satisfied_alt");
        this.icons.push("how_to_reg");
        this.icons.push("insert_emoticon");
        this.icons.push("wc");
        this.icons.push("sentiment_very_dissatisfied");
        this.icons.push("sentiment_very_satisfied");
        this.icons.push("sentiment_satisfied");
        this.icons.push("sports_handball");
        
        //hand symbol
        this.icons.push("thumb_up_alt");
        this.icons.push("thumb_down_alt");
        this.icons.push("touch_app");
        this.icons.push("pan_tool");
        
        //communications & devices
        this.icons.push("feedback");
        this.icons.push("calendar_today");
        this.icons.push("perm_phone_msg");
        this.icons.push("open_in_browser");
        this.icons.push("important_devices");
        this.icons.push("settings_cell");
        this.icons.push("settings_voice");
        this.icons.push("contact_mail");
        this.icons.push("contact_phone");
        this.icons.push("contacts");
        this.icons.push("dialer_sip");
        this.icons.push("phone");
        this.icons.push("email");
        this.icons.push("forum");
        this.icons.push("location_on");
        this.icons.push("sd_storage");
        this.icons.push("signal_cellular_alt");
        this.icons.push("laptop");
        this.icons.push("mouse");
        this.icons.push("keyboard_hide");
        this.icons.push("router");
        this.icons.push("speaker");
        this.icons.push("headset");
        this.icons.push("edit");
        this.icons.push("local_see");
        this.icons.push("local_printshop");
        this.icons.push("share");
        this.icons.push("language");
        this.icons.push("public");
        
        
        
     
        
        //shopping & travel
        this.icons.push("airline_seat_flat");
        this.icons.push("airline_seat_recline_extra");
        this.icons.push("account_balance");
        this.icons.push("airplanemode_active");
        this.icons.push("departure_board");
        this.icons.push("directions_bus");
        this.icons.push("directions_car");
        this.icons.push("directions_transit");
        this.icons.push("local_gas_station");
        this.icons.push("restaurant");
        this.icons.push("two_wheeler");
        this.icons.push("local_bar");
        this.icons.push("local_cafe");
        this.icons.push("local_hospital");
        this.icons.push("local_mall");
        this.icons.push("menu_book");
        this.icons.push("fastfood");
        this.icons.push("local_grocery_store");
        this.icons.push("business_center");
        this.icons.push("apartment");
        this.icons.push("airport_shuttle");
        this.icons.push("meeting_room");
    
        
        //other objects
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        
        
        this.icons.push("school");
        this.icons.push("local_library");
        this.icons.push("emoji_objects");
        this.icons.push("cake");
        this.icons.push("emoji_events");
        this.icons.push("beach_access");
        this.icons.push("house");
        this.icons.push("local_parking");
        this.icons.push("brush");
        this.icons.push("colorize");
        this.icons.push("color_lens");
        this.icons.push("star");
        this.icons.push("card_giftcard");
        
        
        //time objects
        this.icons.push("timer");
        this.icons.push("alarm");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        this.icons.push("account_circle");
        
        
        this.icons.push("3d_rotation");
    }

}

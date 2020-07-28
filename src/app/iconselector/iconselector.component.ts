import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldIcon } from "app/model/FieldIcon";
import {  ElementRef, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from "@angular/material/dialog";
import { FormField } from "app/model/FormField";


@Component({
  selector: 'iconselector',
  templateUrl: './iconselector.component.html',
  styleUrls: ['./iconselector.component.scss']
})
export class IconselectorComponent implements OnInit {
  @Input() actvieFormField:FormField;
  
  fruit:string[]=['apple','banana'];
  showCard=false;
  private readonly _matDialogRef: MatDialogRef<MyDialogComponent>;
  private readonly triggerElementRef: ElementRef;
  constructor( public dialog: MatDialog ) { 
      
  }

  ngOnInit(): void {
  }
  
  public onIconChange()
  {
      
     
  }
  showHideCard()
  {
      this.showCard=!this.showCard;
  }
  
//Call the dialog

  onShowDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: { icon:'abc' }
    });
    dialogRef.afterClosed().subscribe( _res => {
    console.log("selected icon is res=",_res);
        this.actvieFormField.selectedIcon=_res;
        console.log("selected icon is =",this.actvieFormField.selectedIcon);
    });
  }
}
//Dialog Component



@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class MyDialogComponent implements OnInit {
  private readonly _matDialogRef: MatDialogRef<MyDialogComponent>;
  private readonly triggerElementRef: ElementRef;
  icons:String[]=['thumb_up_alt'];  
  selectedIcon='';
  color="#000000";
  iconwidth=30;
  constructor(_matDialogRef: MatDialogRef<MyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this._matDialogRef = _matDialogRef;
    this.triggerElementRef = data.trigger;
  }

  ngOnInit() {
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    const rect = this.triggerElementRef.nativeElement.getBoundingClientRect();
    matDialogConfig.position = { left: `${rect.left+20}px`, top: `${rect.bottom +5}px` };
    matDialogConfig.width = '280px';
    matDialogConfig.height = '360px';
    this._matDialogRef.updateSize(matDialogConfig.width, matDialogConfig.height);
    this._matDialogRef.updatePosition(matDialogConfig.position);
    this.setMatIcons();
  }
  saveForm()
  {
     this.data={icon:this.selectedIcon};
      this._matDialogRef.close(null);
  }
  
  cancel(): void {
    this._matDialogRef.close(null);
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




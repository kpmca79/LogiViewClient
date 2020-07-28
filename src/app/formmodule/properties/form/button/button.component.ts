import { Component, OnInit, Input } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";

@Component({
  selector: 'frm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  icons;
  btnFC = "#000000";
  btnBGC = "#00ff00";
  btnWidth = '0.0';
  fontSize = 15;
  fontSizeList = [8, 9, 10, 11, 12, 14, 116, 18, 20, 22, 24, 26, 28];
  supportedFonts = ['Cursive', 'sans-serif', 'sarif', 'monospace', 'Courier New', 'Arial',
                    'Times New Roman', 'Georgia', 'impact', 'Comic Sans MS',
                    'Trebuchet MS', 'Helvetica', 'Garamond', 'Verdana', 'Bookman Old Style', 'Palatino', 'Courier'];
   selectedFont = 'Helvetica Neue';
  operator:String[]=['=','!=','Contains','!Contains','Starts with','!Starts with','Ends with','!Ends with','>','>=','<','<=','Specified','!Specified'];
    
    constructor(private mService: MessagingService,private frmSrv :FormService) { }
  ngOnInit(): void {
      this.icons=this.frmSrv.getMatIcons();
  }
  openCloseRightPanel()
  {
      let obj:any={id:'close'}
      console.log("9999999999999999999999999999")
      this.mService.produce(obj);
  }
  btnStyleChange( event: any, element: string ) {

      if ( element == 'fc' )
          this.frm.btnStyle = this.frmSrv.styleParse( this.frm.btnStyle, 'fntColor', this.btnFC );
      else if ( element == 'bgc' )
          this.frm.btnStyle = this.frmSrv.styleParse( this.frm.btnStyle, 'bgColor', this.btnBGC );
      else if ( element == 'size' )
          this.frm.btnStyle = this.frmSrv.styleParse( this.frm.btnStyle, 'flexgrow', this.btnWidth );
      this.mService.produce( this.frm );
      console.log("bbbbbbbbbbbbbbbbbbbbb");
      console.log( "this.frm.btnStyle= ", this.frm.btnStyle )


  }
  fontSizeChange( event: any ) {
      this.frm.btnStyle = this.frmSrv.styleParse( this.frm.btnStyle, 'fntSize', this.fontSize + '' );
      this.mService.produce( this.frm );
  }
  fontFamilyChange( event: any ) {
      this.frm.btnStyle = this.frmSrv.styleParse( this.frm.btnStyle, 'fntFamily', this.selectedFont );
      this.mService.produce( this.frm );
  }
}

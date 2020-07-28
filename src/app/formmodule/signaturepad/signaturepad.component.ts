import { Component, OnInit, Input, ViewChild,HostListener } from '@angular/core';
import { Form } from "app/model/Form";
import { FormField } from "app/model/FormField";
import { MessagingService } from "app/services/messaging.service";
import {FormService} from   "app/services/form.service";
import { SafeStyle, DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'signaturepad',
  templateUrl: './signaturepad.component.html',
  styleUrls: ['./signaturepad.component.css']
})
export class SignaturepadComponent implements OnInit {

  @Input() frm:Form;
  @Input() actvieFormField:FormField;
  @Input() bgcolbtn: string;
  @Input() bgcolNote: string;
  @Input() fntcol: string;
  @ViewChild('sigPad') sigPad;
  sigPadElement;
  context;
  isDrawing = false;
  img;
  canWidth=0;
  framWidth='';
  constructor(private mService: MessagingService,private frmSrv :FormService, private _sanitizer: DomSanitizer) { }
  ngOnInit(): void {
      
      
      console.log("View child found or not ngOnInit!!!!!!!!!!!! ",this.sigPad)
      
  }
  sanitizeHTML( style: string ): SafeStyle {
      return this._sanitizer.bypassSecurityTrustStyle( style );
  }
  ngAfterViewInit()
  {
      console.log("View child found or not !!!!!!!!!!!! ",this.sigPad)
      this.sigPadElement = this.sigPad.nativeElement;
      this.context = this.sigPadElement.getContext('2d');
      this.context.strokeStyle = '#3742fa';
  }
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e) {
    this.isDrawing = false;
  }

  onMouseDown(e) {
    this.isDrawing = true;
    const coords = this.relativeCoords(e);
    this.context.moveTo(coords.x, coords.y);
  }

  onMouseMove(e) {
    if (this.isDrawing) {
      const coords = this.relativeCoords(e);
      this.context.lineTo(coords.x, coords.y);
      this.context.stroke();
      this.img=this.sigPadElement.toDataURL("image/png");
    }
  }

  private relativeCoords(event) {
    const bounds = event.target.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    this.actvieFormField.signImage=this.sigPadElement.toDataURL("image/png");
    return { x: x, y: y };
  }

  clear() {
    this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
    this.context.beginPath();
  }

  save() {
    this.img = this.sigPadElement.toDataURL("image/png");
    console.log(this.img);
  }
  
}

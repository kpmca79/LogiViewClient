import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  modalTitle: string;
  modalMessage: string
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _sanitizer: DomSanitizer,) {
    this.modalTitle = data.title;
    this.modalMessage = data.message;
    console.log(data)
  }

  ngOnInit() {
  }
  sanitizeHTML(style: string): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(style);
  }

}

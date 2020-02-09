import { Component, OnInit } from '@angular/core';
import {  Inject } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

 modalTitle: string;
 modalMessage: String
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.modalTitle = data.title;
        this.modalMessage = data.message;
        console.log(data)
     }

  ngOnInit() {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from "../../services/form.service";
import { Form } from "../../model/Form";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from "@angular/router";
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'trashforms',
  templateUrl: './trashforms.component.html',
  styleUrls: ['./trashforms.component.css']
})
export class TrashFormsComponent implements OnInit {

  forms: Form[];
  public pubURL = "https://localhost:4200/form/";
  dataSource: MatTableDataSource<Form>;
  displayedColumnsold: string[] = ['name', 'type', 'path', 'status', 'response', 'edit', 'stats'];
  displayedColumns: string[] = ['checkbox', 'name', 'response', 'edit', 'stats'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  frm: Form;
  isSearchZero = false;


  constructor(private frmSrv: FormService, public dialog: MatDialog, private router: Router) { }
  searchform = "";
  ngOnInit() {

    const formObj = this.frmSrv.getForms("status=Archived").subscribe(data => {
      let x = data;
      this.forms = x.data;
      console.log("form size =", this.forms.length);
      this.dataSource = new MatTableDataSource<Form>(this.forms);
      console.log("datasource size =", this.dataSource.data.length);
      this.dataSource.paginator = this.paginator;
    });
    
  }
  showView(form: Form) {

    window.open(this.pubURL + form.id, "_blank");
  }
  
  restorForm(form: Form) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let msgStyle = 'style="font-size:14px;font-weight:600;"'
    let noteStyle = 'style="font-size:12px;"'
    dialogConfig.data = {
      id: 1,
      title: 'Restore Form',
      message: '<span>Are you sure you want to restore the form ?</span>'
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        form.status = "Active";
        this.frmSrv.saveForm(form, form.id).subscribe(data => { console.log("Form archived successfully", form); this.ngOnInit(); }, error => { console.log(error) });
      }
    });
  }
  searchForm() {

    const formObj = this.frmSrv.getForms(this.searchform + '&status=Archived').subscribe(data => {
      let x = data
      console.log("INSIDE searchForm response data is  =", x.data);
      this.forms = x.data;
      if (!this.forms || this.forms.length == 0)
        this.isSearchZero = true;
      else
        this.isSearchZero = false;
      console.log("INSIDE searchForm form size =", this.forms.length);
      this.dataSource = new MatTableDataSource<Form>(this.forms);
      console.log("datasource size =", this.dataSource.data.length);
      this.dataSource.paginator = this.paginator;
    });

  }




}

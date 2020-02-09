import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
// tslint:disable-next-line:no-unused-expression
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

    public users = [];
     // tslint:disable-next-line:max-line-length
     constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
      this.users = [];
      this.userService.getAllUsers().subscribe(res => {
            console.log("user resoponse===>",res);
            let userresponse:any=res;
            this.users = userresponse.data;
            console.log('userlist users = ' + this.users);
        });
      

  }
  deleteUser(id: String) {
       console.log('got id for delete=' + id);
       this.userService.deleteUser(id)
       this.userService.getAllUsers().subscribe(
           res => { 
           let userdata:any =res;
            this.users = userdata.data;
            
        });
        this.router.navigateByUrl('/userlist');
       
 }
    openModal(id: String) {
      const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: 1,
        title: 'Delete User',
        message: 'Are you sure you want to delete user ?'
    };

        const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
              this.deleteUser(id);
          }
        });
    }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'form-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  @Input() formID ;
  @Input() isChecked;
  @Input() link;
  @Input() type:String="publish";
   isPreview = new FormControl();
   white="white";
  
  constructor(private router: Router) { }
 
  ngOnInit() {
  console.log("top nav active link is ",this.link);
  if(this.isChecked)
      this.isPreview= new FormControl(true);
//     this.isPreview.value=this.isChecked;
  }
  previewToggle()
  {
 
      console.log("Preview is  ",this.isPreview.value);
      console.log("formID is ",this.formID);
     
      if(this.isPreview.value)
          this.router.navigateByUrl('/formPreview/'+this.formID);
      else
          this.router.navigateByUrl('/formBuilder/'+this.formID);
      
      
  }
 

}

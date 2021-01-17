import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {
    
  public formID: String;
  public pubURL="https://localhost:4200/form/";
  public type:String;
  public iFramSrc="<iframe height=500px; width=640px; src="+this.pubURL+"/"+this.formID+" ></iframe>";
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
      this.formID = this.route.snapshot.paramMap.get("id");
      this.type = this.route.snapshot.paramMap.get("type");
      console.log("Inside publish got type ",this.type);
      this.pubURL=this.pubURL+this.formID
      console.log("Publisher page =",this.pubURL);
      this.iFramSrc="<iframe height=500px; width=640px; src="+this.pubURL+" frameborder='0'></iframe>";
  }
  copyURL(){
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.pubURL;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
  copyIFrame(){
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = this.iFramSrc;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
  openNT()
  {
      window.open(this.pubURL, "_blank");
  }
  changePubPage(viewType)
  {
      this.type=viewType;
  }

}

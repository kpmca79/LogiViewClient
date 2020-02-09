import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Router } from "@angular/router";


@Component({
  selector: 'publish-left-nav',
  templateUrl: './publish-left-nav.component.html',
  styleUrls: ['./publish-left-nav.component.scss']
})
export class PublishLeftNavComponent implements OnInit {
    @Input() formID:String; 
    @Input() type:String; 
    @Output() changePublishPage = new EventEmitter<string>();
  constructor(private router: Router) { }

  ngOnInit() {
      
  }
  
  changePubPage(selectedOption)
  {
      this.changePublishPage.next(selectedOption);
  }

}

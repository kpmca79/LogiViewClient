import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidetoolbarComponent } from './sidetoolbar/sidetoolbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { GridresponselistComponent } from './gridresponselist/gridresponselist.component';

//modules for ag-grid 
import {  AgGridModule} from 'ag-grid-angular';
import 'ag-grid-enterprise';

//end




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {suppressScrollX: true};









@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    MatIconModule,
    MatToolbarModule,
    PerfectScrollbarModule,
    AgGridModule.withComponents([]),   

  

  ],
  providers:[  {provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}],
  declarations: [
    SidetoolbarComponent,
    GridresponselistComponent,
    
    
   

  
   ],
  exports: [
            
    SidetoolbarComponent    
    
   
  ]
})
export class FormcomponentsModule { }

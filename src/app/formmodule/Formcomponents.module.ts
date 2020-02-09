import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidetoolbarComponent } from './sidetoolbar/sidetoolbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';










@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    MatIconModule,
    MatToolbarModule,

  ],
  declarations: [
    SidetoolbarComponent,
    
   
  
    
    
    
   
    
   
  ],
  exports: [
            
    SidetoolbarComponent    
    
   
  ]
})
export class FormcomponentsModule { }

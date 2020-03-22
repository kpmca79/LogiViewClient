import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidetoolbarComponent } from './sidetoolbar/sidetoolbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';










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

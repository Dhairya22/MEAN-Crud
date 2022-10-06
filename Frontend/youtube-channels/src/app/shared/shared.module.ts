import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const declarations = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
]

@NgModule({
  declarations: [ HeaderComponent, LoaderComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...declarations
  ],
  exports: [ ...declarations, HeaderComponent, LoaderComponent ]
})
export class SharedModule { }

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { QueryBuilderModule } from 'angular2-query-builder';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

import {
  MatToolbarModule,
  MatTooltipModule,
  MatTabsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    NgxJsonViewerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    QueryBuilderModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}

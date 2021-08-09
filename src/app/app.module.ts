import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS
} from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { AutoComponent } from './auto/auto.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsComponent } from './chips/chips.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    AutoComponent,
    ChipsComponent,
    FormFieldComponent
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'auto' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import {
  AfterViewInit,
  Component,
  ContentChild,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  MatFormField,
  MatFormFieldControl
} from '@angular/material/form-field';
import { Item } from '../app.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent implements OnInit, AfterViewInit {
  @ContentChild(MatFormFieldControl, { static: true })
  public formFieldControl: MatFormFieldControl<Item>;
  @ViewChild(MatFormField, { static: true })
  public matFormField: MatFormField;

  ngOnInit(): void {
    this.matFormField._control = this.formFieldControl;
  }

  ngAfterViewInit() {
    this.matFormField._control = this.formFieldControl;
  }
}

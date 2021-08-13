import {
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
import { ChipsComponent } from '../chips/chips.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent
  implements OnInit {
  @ContentChild(MatFormFieldControl, { static: true })
  public formFieldControl: MatFormFieldControl<Item>;
  @ContentChild(ChipsComponent, { static: true })
  public chipList: ChipsComponent;

  @ViewChild(MatFormField, { static: true })
  public matFormField: MatFormField;

  ngOnInit(): void {
    this.matFormField._control =
      this.chipList?.chipList || this.formFieldControl;
  }
}

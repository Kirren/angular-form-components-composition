import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ContentChild,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatFormField,
  MatFormFieldControl
} from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { Item } from '../app.component';
import { AutoComponent } from '../auto/auto.component';
import { ChipsComponent } from '../chips/chips.component';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent implements OnInit {
  @Input() control: FormControl;

  @ContentChild(ChipsComponent, { static: true })
  chips: ChipsComponent;
  @ContentChild(AutoComponent, { static: true })
  auto: AutoComponent;

  @ContentChild(MatFormFieldControl, { static: true })
  public formControl: MatFormFieldControl<any>;
  @ViewChild(MatFormField, { static: true })
  public matFormField: MatFormField;

  private _value: Item[] = [];
  selection: SelectionModel<Item>;
  private selectionChangeSubscription: Subscription;

  ngOnInit(): void {
    this.matFormField._control = this.formControl;

    this.selection = new SelectionModel(true, this._value, true);

    if (this.auto) {
      this.auto.control = this.control;
    }

    if (this.chips) {
      this.chips.selected = this.selection.selected;
      this.chips.removeChip = (chip: Item) => {
        if (chip) {
          this.selection.deselect(chip);
        } else {
          this.selection.clear();
        }
      };
    }
  }

  ngOnDestroy(): void {
    this.selectionChangeSubscription.unsubscribe();
  }
}

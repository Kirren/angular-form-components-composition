import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent  
} from '@angular/material/autocomplete';
import { Item } from '../app.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css'],
  exportAs: 'customAuto'
})
export class AutoComponent implements OnInit {
  @Input() control: FormControl;
  @Input() selection: SelectionModel<Item>;

  @Input() options: Item[] = [];

  @ViewChild('auto')
  auto: MatAutocomplete;

  public filteredOptions: Item[] = this.options;
  public filteredMatch: Item = null;

  valueChangeSubscription: Subscription;

  ngOnInit() {
    this.valueChangeSubscription = this.control.valueChanges.subscribe(
      (value) => {
        this._filter(value);
      }
    );
  }

  ngOnDestroy() {
    this.valueChangeSubscription.unsubscribe();
  }

  private _filter(value: string): void {
    if (value && typeof value === 'string') {
      const keyMatch = this.options?.find(
        (option) => option.key?.toLowerCase() === value.toLowerCase()
      );
      if (keyMatch) {
        this.filteredOptions = [keyMatch];
      } else {
        this.filteredOptions = this.options.filter((option) => {
          const text =
            (option.displayString || '') +
            (option.key || '');
          return text.toLowerCase().indexOf(value.toLowerCase()) >= 0;
        });
      }
      this.filteredMatch =
        this.filteredOptions?.length === 1 ? this.filteredOptions[0] : null;
    } else {
      this.filteredOptions = this.options;
      this.filteredMatch = null;
    }
  }

  public onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const value = event.option.value;

    if (value) {
      this.selection.toggle(value);
    } else {
      this.selection.clear();
    }
  }

  public displayFn(options: any): string {
    return options
      ? options.displayString ||
          options.map((v: Item) => v.displayString).join(', ')
      : '';
  }

}

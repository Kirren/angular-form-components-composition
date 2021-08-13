import { SelectionModel } from '@angular/cdk/collections';
import { Component, VERSION, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';

export interface Item {
  name: string;
  key?: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  options: Item[] = [
    {
      name: 'Apple'
    },
    {
      name: 'Lemon'
    },
    {
      name: 'Lime'
    },
    {
      name: 'Orange'
    }
  ];
  control: FormControl;
  selection: SelectionModel<Item>;

  @ViewChild(MatAutocompleteTrigger) trigger: MatAutocompleteTrigger;

  constructor() {
    this.control = new FormControl([this.options[0]]);
  }

  ngOnInit(): void {
    this.selection = new SelectionModel(true, this.control.value, true);

    this.valueChangeSubscription = this.control.valueChanges.subscribe(
      (value) => {
        this._filter(value);
      }
    );
  }

  public filteredOptions: Item[] = this.options;
  public filteredMatch: Item = null;

  valueChangeSubscription: Subscription;

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
            (option.name || '') +
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

    this.selection.toggle(value);
  }

  public displayFn(option: Item): string {
    return option ? option.name : null;
  }
}

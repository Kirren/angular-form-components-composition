import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutoComponent } from './auto/auto.component';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Item {
  displayString?: string;
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
      displayString: 'Apple'
    },
    {
      displayString: 'Lemon'
    },
    {
      displayString: 'Lime'
    },
    {
      displayString: 'Orange'
    }
  ];
  control = new FormControl();
}

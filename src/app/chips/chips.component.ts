import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipList } from '@angular/material/chips';
import { MatChipEvent } from '@angular/material/chips/chip';
import { Item } from '../app.component';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html'
})
export class ChipsComponent {
  @Input() selection: SelectionModel<Item>;

  // @Output() deselectOption_ = new EventEmitter<Item>();

  @ViewChild(MatChipList, { static: true })
  chipList: MatChipList;

  deselectOption(event: MatChipEvent) {
    const { value } = event.chip;

    this.selection.deselect(value);
  }
}

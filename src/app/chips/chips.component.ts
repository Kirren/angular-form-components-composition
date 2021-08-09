import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatChipList } from '@angular/material/chips';
import { Item } from '../app.component';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent {
  @Input() selected: Item[] = [];

  @Output() deselectOption = new EventEmitter<Item | void>();

  @ViewChild(MatChipList, { static: true }) chipList: MatChipList;

  public removeChip(option: Item) {
    this.deselectOption.emit(option);
  }
}

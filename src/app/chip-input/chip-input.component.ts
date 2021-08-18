import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete/autocomplete';
import { MatChipEvent, MatChipList } from '@angular/material/chips';
import {
  MatFormField,
  MatFormFieldControl,
  MAT_FORM_FIELD
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Item } from '../app.component';

@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css'],
  host: {
    '[class.label-floating]': 'shouldLabelFloat',
    '[id]': 'id'
  },
  providers: [{ provide: MatFormFieldControl, useExisting: ChipInputComponent }]
})
export class ChipInputComponent
  implements
    ControlValueAccessor,
    MatFormFieldControl<Item>,
    OnInit,
    OnDestroy {
  stateChanges = new Subject<void>();

  @Input() auto?: MatAutocomplete;
  @Input() formControl!: FormControl;
  @Input() selection: SelectionModel<Item>;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(text: string) {
    this._placeholder = text;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.formControl.disable() : this.formControl.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input('aria-describedby') userAriaDescribedBy: string;

  get errorState(): boolean {
    return this.formControl.invalid && this.touched;
  }
  get empty() {
    return !this.formControl.value;
  }

  @ViewChild(MatChipList, { static: true })
  chipList: MatChipList;

  @Input()
  set value(_value: Item | null) {
    this.formControl.setValue(_value);
    this.stateChanges.next();
  }
  get value(): Item {
    return this.formControl.value;
  }

  static nextId = 0;
  @HostBinding() id = `chip-input-${ChipInputComponent.nextId++}`;

  @HostBinding('class.label-floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  focused = false;
  touched = false;

  onChange = (_: any) => {};
  onTouched = () => {};

  // ngControl: NgControl = null;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      'mat-chip-list'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  onFocusIn(event: FocusEvent) {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (
      !this._elementRef.nativeElement.contains(event.relatedTarget as Element)
    ) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  deselectOption(event: MatChipEvent) {
    const { value } = event.chip;

    this.selection.deselect(value);
  }

  writeValue(_value: Item | null): void {
    this.value = _value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
}

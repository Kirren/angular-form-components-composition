import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl
} from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { Item } from '../app.component';

@Component({
  selector: 'app-chip-input',
  templateUrl: 'chip-input.component.html',
  styleUrls: ['chip-input.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: ChipInputComponent }
  ],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id'
  }
})
export class ChipInputComponent
  implements ControlValueAccessor, MatFormFieldControl<Item[]>, OnDestroy {
  static nextId = 0;
  @ViewChild('input') input: HTMLInputElement;

  control: FormControl;
  stateChanges = new Subject<void>();

  private _placeholder: string;
  private _required = false;
  private _disabled = false;
  focused = false;
  touched = false;
  controlType = 'chip-input';
  id = `example-input-${ChipInputComponent.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  separatorKeyCodes = [ENTER, COMMA];

  get empty() {
    return !this.control.value;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('auto')
  auto: MatAutocomplete;

  @Input('aria-describedby')
  userAriaDescribedBy: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.control.disable() : this.control.enable();
    this.stateChanges.next();
  }

  @Input()
  get value(): Item[] | null {
    if (this.control.valid) {
      return this.control.value;
    }
    return null;
  }
  set value(_value: Item[] | null) {
    this.control.setValue(_value);
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.control.invalid && this.touched;
  }

  constructor(
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl
  ) {
    this.control = !this.control && new FormControl();

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  handleInput(event: Event) {
    console.log(event);
  }

  selectOption(event: MatChipInputEvent): void {
    console.log(event);
    const newValue = [...this.value];
    const selectedOption: Item = { name: event.value };

    newValue.push(selectedOption);
    console.log(newValue);

    this.writeValue(newValue);
  }

  deselectOption(option: Item) {
    const currentValue = [...this.value];

    const newValue = currentValue.filter((v: Item) => v.name !== option.name);
    console.log(newValue);

    this.writeValue(newValue);
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

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.example-input-container'
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.control.valid) {
      this._focusMonitor.focusVia(this.input, 'program');
    }
  }

  writeValue(_value: Item[] | null): void {
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

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
}

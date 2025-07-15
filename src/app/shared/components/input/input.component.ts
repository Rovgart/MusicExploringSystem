// input-field.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// input-field.component.scss
/* 
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #9ca3af;
  }

  &.focused {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &.has-error {
    border-color: #ef4444;
    
    &.focused {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  }
}

.input-field {
  flex: 1;
  padding: 0.75rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.875rem;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    color: #6b7280;
    cursor: not-allowed;
  }
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  color: #6b7280;

  &.left {
    order: -1;
  }

  &.right {
    order: 1;
  }
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ef4444;
}
*/

@Component({
  selector: 'app-input-field',
  standalone: true,
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() leftIcon: string = '';
  @Input() rightIcon: string = '';
  @Input() leftIconLabel: string = '';
  @Input() rightIconLabel: string = '';
  @Input() errorMessage: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() inputId: string = `input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() class: string = '';
  @Output() inputChange = new EventEmitter<string>();
  @Output() focusChange = new EventEmitter<boolean>();

  value: string = '';
  isFocused: boolean = false;

  // ControlValueAccessor methods
  private onChange = (value: string) => {};
  private onTouched = () => {};

  get hasError(): boolean {
    return !!this.errorMessage;
  }

  get errorId(): string {
    return `${this.inputId}-error`;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.inputChange.emit(this.value);
  }

  onFocus(): void {
    this.isFocused = true;
    this.focusChange.emit(true);
  }

  onBlur(): void {
    this.isFocused = false;
    this.onTouched();
    this.focusChange.emit(false);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function isEmpty(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.trim() === '' ? { isEmpty: { value: control.value } } : null;
  };
}

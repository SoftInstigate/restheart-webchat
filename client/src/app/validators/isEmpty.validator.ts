import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function isEmpty(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(`in validator : ${control.value}`);
    return control.value.trim() === '' ? { isEmpty: { value: control.value } } : null;
  };
}

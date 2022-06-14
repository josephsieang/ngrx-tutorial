import { FormGroup } from '@angular/forms';

export const showFormFieldError = (formGroup: FormGroup, formControlName: string, error: string): boolean => {
  const control = formGroup.get(formControlName);
  return control?.touched && control?.errors?.[error];
};

import { Directive, forwardRef, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appInvalidName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InvalidNameDirective),
      multi: true,
    },
  ]
})
export class InvalidNameDirective implements Validator {

  readonly invalidName = input<string>('', {alias: 'appInvalidName'});

  validate(control: AbstractControl): ValidationErrors | null {
    return this.invalidName() === control.value ? {invalidName: {value: control.value}} : null
  }
}

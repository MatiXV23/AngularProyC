import { Directive, forwardRef, inject, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { PersonasService } from '../services/personas.service';

@Directive({
  selector: '[existingName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => ExistingNameDirective),
      multi: true,
    },
  ]
})
export class ExistingNameDirective implements AsyncValidator{
  private personasService = inject(PersonasService)

  private async existName(name:string) {
    return !!(await this.personasService.getPersonas()).find((u)=>u.username === name)
  }

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    return await this.existName(control.value) ? {AlreadyExist : true} : null
  }
}

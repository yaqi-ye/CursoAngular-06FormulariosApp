import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})


export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({

    nombre      : [ '', [ Validators.required, Validators.pattern
                        ( this.validatorService.nombreApellidoPattern ) ] ],
    email       : [ '', [ Validators.required, Validators.pattern 
                        ( this.validatorService.emailPattern ) ],
                        [ this.emailValidator ] ],
    usuario     : [ '', [ Validators.required, 
                        this.validatorService.noPuedeSerStrider ] ],
    contraseña : [ '', [ Validators.required, Validators.minLength(6) ] ],
    contraseña2 : [ '', [ Validators.required ] ]

  },{

    validators: [ this.validatorService.camposIguales( 'contraseña', 'contraseña2' ) ]

  });

  get emailErrorMsg(): string {
    
    const errors = this.miFormulario.get('email')?.errors;

    if( errors?.["required"] ) {
      return "El campo 'e-mail' es obligatorio."
    } else if ( errors?.["pattern"] ) {
      return "El formato de 'e-mail' no cumple los requisitos."
    } else if ( errors?.["emailTomado"] ) {
      return "El 'e-mail' introducido ya corresponde a otro usuario."
    }
    return '';

  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {
    
    this.miFormulario.reset({

      nombre      : 'Samuel Garcia',
      email       : 'test1@test.com',
      usuario     : 'samu1969',
      contraseña : '123456',
      contraseña2 : '123456'

    })

  }

  campoNoValido( campo: string ) {

    return this.miFormulario.get(campo)?.invalid &&
           this.miFormulario.get(campo)?.touched

  }

  /*
  emailRequired() {

    return this.miFormulario.get('email')?.errors?.["required"] &&
           this.miFormulario.get('email')?.touched

  }

  emailFormato() {

    return this.miFormulario.get('email')?.errors?.["pattern"] &&
           this.miFormulario.get('email')?.touched

  }

  emailTomado() {

    return this.miFormulario.get('email')?.errors?.["emailTomado"] &&
           this.miFormulario.get('email')?.touched

  }
  */

  submitFormulario() {

    console.log( this.miFormulario.value );
    this.miFormulario.markAllAsTouched();

  }

}

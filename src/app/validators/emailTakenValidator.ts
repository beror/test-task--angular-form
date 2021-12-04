import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

const unavailableEmails = ['test@test.test'];

const emailTakenValidator = (emailControl: AbstractControl):
  Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>
    new Promise(resolve =>
        setTimeout(() =>
          unavailableEmails.includes(emailControl.value) ? resolve({isEmailTaken: true}) : resolve(null), 2000));

export default emailTakenValidator;
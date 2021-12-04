import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import emailTakenValidator from '../validators/emailTakenValidator';
import moreThanOneItemValidator from '../validators/moreThanOneItemValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  hobbies: string[] = [];


  availableFrameworks = ['react', 'angular', 'vue'];
  availableFrameworkVersions: { [index: string]: string[] } = {
    react: ['2.1.2', '3.2.4', '4.3.1'],
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),

    dateOfBirth: new FormControl('', Validators.required),

    framework: new FormControl('', Validators.required),
    frameworkVersion: new FormControl({value: '', disabled: true}, Validators.required),

    email: new FormControl('', [ Validators.required, Validators.email ], emailTakenValidator),

    hobbies: new FormArray([], moreThanOneItemValidator)
  });

  get hobbiesFormArray() {
    return this.form.get('hobbies') as FormArray;
  }

  get hobbiesControls() {
    return this.hobbiesFormArray.controls as FormControl[];
  }

  onFrameworkSelected() {
    const frameworkForm = this.form.get('framework');
    const versionForm = this.form.get('frameworkVersion');

    if(!versionForm) {
      throw Error('Couldn\'t get frameworkVersion form');
    }

    if(!frameworkForm) {
      throw Error('Couldn\'t get framework form');
    }

    if(frameworkForm.value === '') versionForm.disable();
    else versionForm.enable();
  }

  onAddHobbieClick = () => this.hobbiesFormArray.push(new FormControl(''));

  addHobbies = () => this.hobbiesFormArray.controls.map(form => this.hobbies.push(form.value));

  submit = () => console.log('Form data for submission:', this.form.value);
}
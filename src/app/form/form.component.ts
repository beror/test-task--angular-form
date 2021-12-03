import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import IsEmailTakenValidator from '../validators/IsEmailTakenValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  hobbies: string[] = [];


  availableTechnologies = ['react', 'angular', 'vue'];
  availableTechnologyVersions: { [index: string]: string[] } = {
    react: ['2.1.2', '3.2.4', '4.3.1'],
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  form = new FormGroup({
    firstName: new FormControl('', [ Validators.required ]),
    lastName: new FormControl('', [ Validators.required ]),

    birthDate: new FormControl('', [ Validators.required ]),

    technology: new FormControl('', [ Validators.required ]),
    technologyVersion: new FormControl({value: '', disabled: true}, [ Validators.required ]),

    email: new FormControl('', [ Validators.required, Validators.email ], IsEmailTakenValidator),

    hobbies: new FormArray([], [ Validators.required ])
  });

  get hobbiesFormArray() {
    return this.form.get('hobbies') as FormArray;
  }

  get hobbiesControls() {
    return this.hobbiesFormArray.controls as FormControl[];
  }

  onTechnologySelected() {
    const versionForm = this.form.get('technologyVersion')!;

    if(this.form.get('technology')!.value === '') versionForm.disable();
    else versionForm.enable();
  }

  onAddHobbieClick = () => this.hobbiesFormArray.push(new FormControl(''));

  addHobbies = () => this.hobbiesFormArray.controls.map(form => this.hobbies.push(form.value));

  submit = () => console.log(this.form.valid);
}

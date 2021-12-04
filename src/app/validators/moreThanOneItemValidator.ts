import { AbstractControl, ValidationErrors } from "@angular/forms";

const moreThanOneItemValidator = (formControl: AbstractControl): ValidationErrors | null => {
    if(formControl.value.length === 0) return { moreThanOneItem: true };
    else return null;
};

export default moreThanOneItemValidator;
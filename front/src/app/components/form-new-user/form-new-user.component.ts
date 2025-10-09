import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-new-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './form-new-user.component.html',
  styleUrl: './form-new-user.component.scss',
})
export class FormNewUserComponent {
  selectedOption = 2;

  roles: string[] = ['Assistant', 'Client'];    
  formSignUp = new FormGroup({
    role: new FormControl(this.roles[0], [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });


  onSubmit() {
    if (this.formSignUp.invalid) {
      console.log('Form is invalid');
    }
    else if (this.formSignUp.value.password !== this.formSignUp.value.confirmPassword) {
      console.log('Le mot de passe et la confirmation doivent être identiques');
    } 
    else if (this.formSignUp.value.password?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)) {
      console.log("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
    }
    else {
    console.log(this.formSignUp.value);
    }
  }

}

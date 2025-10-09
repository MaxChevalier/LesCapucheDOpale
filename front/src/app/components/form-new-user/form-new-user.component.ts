import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {AccountService} from '../../services/account/account.service'
import e from 'cors';

@Component({
  selector: 'app-form-new-user',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './form-new-user.component.html',
  styleUrl: './form-new-user.component.scss',
})
export class FormNewUserComponent {
  selectedOption = 2;

  roles: number[] = [1, 2];    
  formSignUp = new FormGroup({
    role: new FormControl(this.roles[0], [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private accountService: AccountService, private router: Router) {

  }


  onSubmit() {
    if (this.formSignUp.invalid) {
      console.log('Form is invalid');
    }
    else if (this.formSignUp.value.password !== this.formSignUp.value.confirmPassword) {
      console.log('Le mot de passe et la confirmation doivent être identiques');
    } 
    else if (!this.formSignUp.value.password?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/)) {
      console.log("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
    }
    else {
      const user = {
        roleId : this.formSignUp.value.role,
        name : this.formSignUp.value.username,
        email : this.formSignUp.value.email,
        password : this.formSignUp.value.password
      };
      this.accountService.signUp(user).subscribe({
        next: (response) => {
          console.log('User créé', response);
        },
        error: (error) => {
          console.error('ca marche pas', error);
        }
      });

    console.log(this.formSignUp.value);
    }
  }

}

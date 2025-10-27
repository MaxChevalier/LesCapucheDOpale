import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormNewUserComponent } from './form-new-user.component';
import { AccountService } from '../../services/account/account.service';

describe('FormNewUserComponent', () => {
  let component: FormNewUserComponent;
  let fixture: ComponentFixture<FormNewUserComponent>;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // On crée des espions pour les services injectés
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['signUp']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormNewUserComponent],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.formSignUp).toBeDefined();
    expect(component.formSignUp.value.role).toBe(1);
    expect(component.formSignUp.valid).toBeFalse();
  });

  it('should invalidate the form if required fields are missing', () => {
    component.formSignUp.patchValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    expect(component.formSignUp.invalid).toBeTrue();
  });

  it('should show error if passwords do not match', () => {
    spyOn(console, 'log');
    component.formSignUp.patchValue({
      role: 1,
      username: 'john',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Different1!',
    });

    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Le mot de passe et la confirmation doivent être identiques');
  });

  it('should call accountService.signUp when form is valid', () => {
    spyOn(console, 'log');
    accountServiceSpy.signUp.and.returnValue(of({ message: 'ok' }));

    component.formSignUp.patchValue({
      role: 1,
      username: 'john',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    component.onSubmit();

    expect(accountServiceSpy.signUp).toHaveBeenCalledWith({
      roleId: 1,
      name: 'john',
      email: 'john@example.com',
      password: 'Password1!',
    });
    expect(console.log).toHaveBeenCalledWith('User créé', { message: 'ok' });
  });

  it('should handle accountService error', () => {
    spyOn(console, 'error');
    accountServiceSpy.signUp.and.returnValue(throwError(() => new Error('fail')));

    component.formSignUp.patchValue({
      role: 1,
      username: 'john',
      email: 'john@example.com',
      password: 'Password1!',
      confirmPassword: 'Password1!',
    });

    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('ca marche pas', jasmine.any(Error));
  });
});

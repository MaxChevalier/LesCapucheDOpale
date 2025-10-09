import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewUserComponent } from './form-new-user.component';

describe('FormNewUserComponent', () => {
  let component: FormNewUserComponent;
  let fixture: ComponentFixture<FormNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormNewUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

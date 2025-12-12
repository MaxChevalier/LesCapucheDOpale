import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEquipment } from './form-equipment';

describe('FormEquipment', () => {
  let component: FormEquipment;
  let fixture: ComponentFixture<FormEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

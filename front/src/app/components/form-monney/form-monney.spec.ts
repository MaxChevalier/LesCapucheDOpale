import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMonney } from './form-monney';

describe('FormMonney', () => {
  let component: FormMonney;
  let fixture: ComponentFixture<FormMonney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMonney]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMonney);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

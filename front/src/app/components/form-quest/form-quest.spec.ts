import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuest } from './form-quest';

describe('FormQuest', () => {
  let component: FormQuest;
  let fixture: ComponentFixture<FormQuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormQuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormQuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

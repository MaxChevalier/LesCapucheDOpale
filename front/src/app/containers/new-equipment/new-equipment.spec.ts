import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEquipment } from './new-equipment';

describe('NewEquipment', () => {
  let component: NewEquipment;
  let fixture: ComponentFixture<NewEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

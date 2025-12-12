import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEquipment } from './update-equipment';

describe('UpdateEquipment', () => {
  let component: UpdateEquipment;
  let fixture: ComponentFixture<UpdateEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

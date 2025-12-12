import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEquipment } from './list-equipment';

describe('ListEquipment', () => {
  let component: ListEquipment;
  let fixture: ComponentFixture<ListEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

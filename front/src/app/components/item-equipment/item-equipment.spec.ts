import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEquipment } from './item-equipment';

describe('ItemEquipment', () => {
  let component: ItemEquipment;
  let fixture: ComponentFixture<ItemEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

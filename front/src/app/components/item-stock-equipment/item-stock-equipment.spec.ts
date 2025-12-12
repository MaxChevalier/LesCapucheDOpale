import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStockEquipement } from './item-stock-equipement';

describe('ItemStockEquipement', () => {
  let component: ItemStockEquipement;
  let fixture: ComponentFixture<ItemStockEquipement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemStockEquipement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemStockEquipement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemQuest } from './item-quest';

describe('ItemQuest', () => {
  let component: ItemQuest;
  let fixture: ComponentFixture<ItemQuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemQuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemQuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

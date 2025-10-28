import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQuest } from './list-quest';

describe('ListQuest', () => {
  let component: ListQuest;
  let fixture: ComponentFixture<ListQuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListQuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListQuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

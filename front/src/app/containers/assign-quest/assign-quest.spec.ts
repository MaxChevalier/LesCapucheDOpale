import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignQuest } from './assign-quest';

describe('AssignQuest', () => {
  let component: AssignQuest;
  let fixture: ComponentFixture<AssignQuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignQuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignQuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

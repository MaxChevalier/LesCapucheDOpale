import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateQuest } from './update-quest';

describe('UpdateQuest', () => {
  let component: UpdateQuest;
  let fixture: ComponentFixture<UpdateQuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateQuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateQuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

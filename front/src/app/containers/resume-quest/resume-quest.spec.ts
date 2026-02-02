import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeQuest } from './resume-quest';

describe('ResumeQuest', () => {
  let component: ResumeQuest;
  let fixture: ComponentFixture<ResumeQuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeQuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeQuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

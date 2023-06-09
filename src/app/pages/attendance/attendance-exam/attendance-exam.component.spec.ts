import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceExamComponent } from './attendance-exam.component';

describe('AttendanceExamComponent', () => {
  let component: AttendanceExamComponent;
  let fixture: ComponentFixture<AttendanceExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

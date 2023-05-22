import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTeacherAssignComponent } from './class-teacher-assign.component';

describe('ClassTeacherAssignComponent', () => {
  let component: ClassTeacherAssignComponent;
  let fixture: ComponentFixture<ClassTeacherAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassTeacherAssignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassTeacherAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

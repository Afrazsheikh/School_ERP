import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAppComponent } from './teacher-app.component';

describe('TeacherAppComponent', () => {
  let component: TeacherAppComponent;
  let fixture: ComponentFixture<TeacherAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

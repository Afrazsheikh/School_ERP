import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeePayByStudentIdComponent } from './fee-pay-by-student-id.component';

describe('FeePayByStudentIdComponent', () => {
  let component: FeePayByStudentIdComponent;
  let fixture: ComponentFixture<FeePayByStudentIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeePayByStudentIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeePayByStudentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

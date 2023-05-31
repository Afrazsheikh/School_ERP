import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryPayrollCreateComponent } from './salary-payroll-create.component';

describe('SalaryPayrollCreateComponent', () => {
  let component: SalaryPayrollCreateComponent;
  let fixture: ComponentFixture<SalaryPayrollCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryPayrollCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalaryPayrollCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

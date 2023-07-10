import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePayrollInvoiceComponent } from './mobile-payroll-invoice.component';

describe('MobilePayrollInvoiceComponent', () => {
  let component: MobilePayrollInvoiceComponent;
  let fixture: ComponentFixture<MobilePayrollInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilePayrollInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobilePayrollInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

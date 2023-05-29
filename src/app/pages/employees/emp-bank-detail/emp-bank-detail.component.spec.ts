import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBankDetailComponent } from './emp-bank-detail.component';

describe('EmpBankDetailComponent', () => {
  let component: EmpBankDetailComponent;
  let fixture: ComponentFixture<EmpBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBankDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFeeTypeComponent } from './assign-fee-type.component';

describe('AssignFeeTypeComponent', () => {
  let component: AssignFeeTypeComponent;
  let fixture: ComponentFixture<AssignFeeTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignFeeTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFeeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

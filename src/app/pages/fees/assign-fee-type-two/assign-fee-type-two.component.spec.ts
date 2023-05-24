import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFeeTypeTwoComponent } from './assign-fee-type-two.component';

describe('AssignFeeTypeTwoComponent', () => {
  let component: AssignFeeTypeTwoComponent;
  let fixture: ComponentFixture<AssignFeeTypeTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignFeeTypeTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFeeTypeTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

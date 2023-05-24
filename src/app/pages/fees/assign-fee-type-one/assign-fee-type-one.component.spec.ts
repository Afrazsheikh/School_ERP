import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFeeTypeOneComponent } from './assign-fee-type-one.component';

describe('AssignFeeTypeOneComponent', () => {
  let component: AssignFeeTypeOneComponent;
  let fixture: ComponentFixture<AssignFeeTypeOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignFeeTypeOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFeeTypeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

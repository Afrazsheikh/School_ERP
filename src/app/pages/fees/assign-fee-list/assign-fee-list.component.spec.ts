import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignFeeListComponent } from './assign-fee-list.component';

describe('AssignFeeListComponent', () => {
  let component: AssignFeeListComponent;
  let fixture: ComponentFixture<AssignFeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignFeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignFeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

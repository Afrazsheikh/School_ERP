import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportFeeAddComponent } from './transport-fee-add.component';

describe('TransportFeeAddComponent', () => {
  let component: TransportFeeAddComponent;
  let fixture: ComponentFixture<TransportFeeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportFeeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportFeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

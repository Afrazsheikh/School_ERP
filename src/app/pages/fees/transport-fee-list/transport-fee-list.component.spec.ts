import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportFeeListComponent } from './transport-fee-list.component';

describe('TransportFeeListComponent', () => {
  let component: TransportFeeListComponent;
  let fixture: ComponentFixture<TransportFeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportFeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportFeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

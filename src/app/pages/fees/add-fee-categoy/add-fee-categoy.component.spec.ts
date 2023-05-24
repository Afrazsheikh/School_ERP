import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeCategoyComponent } from './add-fee-categoy.component';

describe('AddFeeCategoyComponent', () => {
  let component: AddFeeCategoyComponent;
  let fixture: ComponentFixture<AddFeeCategoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFeeCategoyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFeeCategoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

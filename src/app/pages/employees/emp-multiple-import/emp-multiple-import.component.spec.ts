import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpMultipleImportComponent } from './emp-multiple-import.component';

describe('EmpMultipleImportComponent', () => {
  let component: EmpMultipleImportComponent;
  let fixture: ComponentFixture<EmpMultipleImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpMultipleImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpMultipleImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

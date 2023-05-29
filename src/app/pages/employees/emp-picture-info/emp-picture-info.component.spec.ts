import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPictureInfoComponent } from './emp-picture-info.component';

describe('EmpPictureInfoComponent', () => {
  let component: EmpPictureInfoComponent;
  let fixture: ComponentFixture<EmpPictureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPictureInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPictureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

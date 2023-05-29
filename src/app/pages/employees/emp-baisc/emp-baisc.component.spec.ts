import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpBaiscComponent } from './emp-baisc.component';

describe('EmpBaiscComponent', () => {
  let component: EmpBaiscComponent;
  let fixture: ComponentFixture<EmpBaiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpBaiscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpBaiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalListAddComponent } from './principal-list-add.component';

describe('PrincipalListAddComponent', () => {
  let component: PrincipalListAddComponent;
  let fixture: ComponentFixture<PrincipalListAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalListAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

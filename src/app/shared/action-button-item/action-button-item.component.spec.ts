import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonItemComponent } from './action-button-item.component';

describe('ActionButtonItemComponent', () => {
  let component: ActionButtonItemComponent;
  let fixture: ComponentFixture<ActionButtonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionButtonItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionButtonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

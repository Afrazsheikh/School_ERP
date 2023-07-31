import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticBoardListComponent } from './notic-board-list.component';

describe('NoticBoardListComponent', () => {
  let component: NoticBoardListComponent;
  let fixture: ComponentFixture<NoticBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticBoardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

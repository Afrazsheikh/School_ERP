import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticBoardAddComponent } from './notic-board-add.component';

describe('NoticBoardAddComponent', () => {
  let component: NoticBoardAddComponent;
  let fixture: ComponentFixture<NoticBoardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticBoardAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticBoardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

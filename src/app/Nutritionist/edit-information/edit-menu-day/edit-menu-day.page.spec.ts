import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMenuDayPage } from './edit-menu-day.page';

describe('EditMenuDayPage', () => {
  let component: EditMenuDayPage;
  let fixture: ComponentFixture<EditMenuDayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMenuDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuDaysPage } from './menu-days.page';

describe('MenuDaysPage', () => {
  let component: MenuDaysPage;
  let fixture: ComponentFixture<MenuDaysPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

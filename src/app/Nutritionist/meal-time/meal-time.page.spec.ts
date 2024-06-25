import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MealTimePage } from './meal-time.page';

describe('MealTimePage', () => {
  let component: MealTimePage;
  let fixture: ComponentFixture<MealTimePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MealTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

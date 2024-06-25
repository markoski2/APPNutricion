import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRecipesPage } from './create-recipes.page';

describe('CreateRecipesPage', () => {
  let component: CreateRecipesPage;
  let fixture: ComponentFixture<CreateRecipesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

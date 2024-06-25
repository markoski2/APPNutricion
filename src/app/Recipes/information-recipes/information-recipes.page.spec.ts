import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationRecipesPage } from './information-recipes.page';

describe('InformationRecipesPage', () => {
  let component: InformationRecipesPage;
  let fixture: ComponentFixture<InformationRecipesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

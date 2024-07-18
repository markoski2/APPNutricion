import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditInformationPage } from './edit-information.page';

describe('EditInformationPage', () => {
  let component: EditInformationPage;
  let fixture: ComponentFixture<EditInformationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

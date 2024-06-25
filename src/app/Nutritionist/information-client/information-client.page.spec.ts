import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationClientPage } from './information-client.page';

describe('InformationClientPage', () => {
  let component: InformationClientPage;
  let fixture: ComponentFixture<InformationClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

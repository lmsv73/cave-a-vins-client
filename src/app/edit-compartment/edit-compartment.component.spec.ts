import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompartmentComponent } from './edit-compartment.component';

describe('EditCompartmentComponent', () => {
  let component: EditCompartmentComponent;
  let fixture: ComponentFixture<EditCompartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompartmentComponent } from './add-compartment.component';

describe('AddCompartmentComponent', () => {
  let component: AddCompartmentComponent;
  let fixture: ComponentFixture<AddCompartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCompartmentComponent } from './delete-compartment.component';

describe('DeleteCompartmentComponent', () => {
  let component: DeleteCompartmentComponent;
  let fixture: ComponentFixture<DeleteCompartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCompartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCompartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

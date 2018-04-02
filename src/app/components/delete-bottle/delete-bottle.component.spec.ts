import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBottleComponent } from './delete-bottle.component';

describe('DeleteBottleComponent', () => {
  let component: DeleteBottleComponent;
  let fixture: ComponentFixture<DeleteBottleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBottleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

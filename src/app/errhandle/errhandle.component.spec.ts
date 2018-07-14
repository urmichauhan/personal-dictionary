import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrhandleComponent } from './errhandle.component';

describe('ErrhandleComponent', () => {
  let component: ErrhandleComponent;
  let fixture: ComponentFixture<ErrhandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrhandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrhandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

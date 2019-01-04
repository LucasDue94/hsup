import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmoxarifeComponent } from './almoxarife.component';

describe('AlmoxarifeComponent', () => {
  let component: AlmoxarifeComponent;
  let fixture: ComponentFixture<AlmoxarifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmoxarifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmoxarifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

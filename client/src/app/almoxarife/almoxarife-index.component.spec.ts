import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmoxarifeIndexComponent } from './almoxarife-index.component';

describe('AlmoxarifeIndexComponent', () => {
  let component: AlmoxarifeIndexComponent;
  let fixture: ComponentFixture<AlmoxarifeIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmoxarifeIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmoxarifeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

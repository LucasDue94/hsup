import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoShowComponent } from './solicitacao-show.component';

describe('SolicitacaoShowComponent', () => {
  let component: SolicitacaoShowComponent;
  let fixture: ComponentFixture<SolicitacaoShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacaoShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

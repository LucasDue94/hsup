import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusSolicitacaoComponent } from './status-solicitacao.component';

describe('StatusSolicitacaoComponent', () => {
  let component: StatusSolicitacaoComponent;
  let fixture: ComponentFixture<StatusSolicitacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusSolicitacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

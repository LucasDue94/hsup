import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitacaoApprovalComponent } from './solicitacao-approval.component';

describe('SolicitacaoApprovalComponent', () => {
  let component: SolicitacaoApprovalComponent;
  let fixture: ComponentFixture<SolicitacaoApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitacaoApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

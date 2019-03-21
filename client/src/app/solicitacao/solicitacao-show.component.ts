import { Component, OnInit } from '@angular/core';
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { FormControl, FormGroup } from "@angular/forms";
import { StatusSolicitacaoService } from "../core/statusSolicitacao/status-solicitacao.service";
import { StatusSolicitacao } from "../core/statusSolicitacao/status-solicitacao";
import { Authentic } from "../authentic";

@Component({
    selector: 'solicitacao-show',
    templateUrl: './solicitacao-show.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoShowComponent extends Authentic implements OnInit {

    solicitacao = new Solicitacao();
    searchControl: FormControl;
    searchForm: FormGroup;
    status: StatusSolicitacao[];
    message: string;
    currentStatusId;

    constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService,
                private statusSolicitacaoService: StatusSolicitacaoService, private router: Router) {
        super();
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.solicitacaoService.get(+params['id']).subscribe((solicitacao: Solicitacao) => {
                this.solicitacao = solicitacao;
                (solicitacao);
            });
        });

        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.statusSolicitacaoService.list('', '').subscribe((status: StatusSolicitacao[]) => {
            this.status = status;
        });
        this.currentStatusId = null;
        (this.currentStatusId);

    }

    cancel() {
        if (confirm(`Tem certeza que deseja cancelar esta solicitação?`)) {
            this.solicitacaoService.cancel(this.solicitacao).subscribe(value => {
                let r = this.router;
                this.message = 'Solicitação cancelada com sucesso!';
                setTimeout(function () {
                    r.navigate(['/solicitacao', 'index']);
                }, 2000);
            });
        }
    }

    deny() {
        if (confirm(`Tem certeza que deseja recusar esta solicitação?`)) {
            this.solicitacaoService.deny(this.solicitacao).subscribe(value => {
                let r = this.router;
                this.message = 'Solicitação recusada com sucesso!';
                setTimeout(function () {
                    r.navigate(['/solicitacao', 'index']);
                }, 2000);
            });
        }
    }

    changeStatus() {
        if (this.currentStatusId != null ) this.solicitacao.status = this.currentStatusId;
        (this.solicitacao.status);
        this.solicitacaoService.changeStatus(this.solicitacao).subscribe(value => {
            let r = this.router;
            this.message = 'Status alterado com sucesso!';
            setTimeout(function () {
                r.navigate(['/solicitacao', 'index']);
            }, 2000);
        });
    }

    approval() {
        if (confirm(`Tem certeza que deseja aprovar esta solicitação?`)) {
            this.solicitacaoService.approval(this.solicitacao).subscribe(value => {
                let r = this.router;
                this.message = 'Solicitação aprovada com sucesso!';
                setTimeout(function () {
                    r.navigate(['/solicitacao', 'index']);
                }, 2000);
            });
        }
    }

    setStatus = () => this.currentStatusId = event.target['value'];

    isOwner(): boolean {
        if (this.solicitacao != undefined && this.solicitacao.responsavel != undefined) {
            return localStorage.getItem('name').toUpperCase() == this.solicitacao.responsavel.name.toUpperCase();
        }
    }

    isFinalStatus(id): boolean {
        if (id != undefined) {
            return id == 3 || id == 10 || id == 11;
        }
    }

    checkCancel(): boolean {
        if (this.solicitacao != undefined && this.solicitacao.status != undefined) {
            return this.solicitacao.status.id < 8
        }
    }

    checkPermission: (permission: string) => boolean;

}

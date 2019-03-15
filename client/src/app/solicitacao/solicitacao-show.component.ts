import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { ActivatedRoute, Params } from "@angular/router";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";

@Component({
    selector: 'solicitacao-view',
    templateUrl: './solicitacao-show.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoShowComponent implements OnInit {

    solicitacao = new Solicitacao();

    constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.solicitacaoService.get(+params['id']).subscribe((solicitacao: Solicitacao) => {
                this.solicitacao = solicitacao;
                console.log(solicitacao);
                console.log(solicitacao.responsavel.name);
                console.log(localStorage.name);
            });
        });
    }

    getLocalStorage() {
        return localStorage;
    }

    action() {
        confirm(`Tem certeza que deseja ` + event.target['name'] + ` esta solicitação?`);
    }
}

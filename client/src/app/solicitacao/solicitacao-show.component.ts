import { AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { ActivatedRoute, Params } from "@angular/router";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { FormControl, FormGroup } from "@angular/forms";
import { StatusSolicitacaoService } from "../core/statusSolicitacao/status-solicitacao.service";
import { StatusSolicitacao } from "../core/statusSolicitacao/status-solicitacao";
import { Authentic } from "../authentic";

@Component({
    selector: 'solicitacao-view',
    templateUrl: './solicitacao-show.component.html',
    styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoShowComponent extends Authentic implements OnInit {

    solicitacao = new Solicitacao();
    searchControl: FormControl;
    searchForm: FormGroup;
    status: StatusSolicitacao[];

    constructor(private route: ActivatedRoute, private solicitacaoService: SolicitacaoService,
                private statusSolicitacaoService: StatusSolicitacaoService) {
        super();
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.solicitacaoService.get(+params['id']).subscribe((solicitacao: Solicitacao) => {
                this.solicitacao = solicitacao;
                console.log(solicitacao);
            });
        });

        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });

        this.statusSolicitacaoService.list('', '').subscribe((status: StatusSolicitacao[]) => {
            this.status = status;
        });
    }

    getLocalStorage() {
        return localStorage;
    }

    changeStatus(action) {
        confirm(`Tem certeza que deseja ` + action + ` esta solicitação?`);
        this.solicitacaoService.changeStatus(this.solicitacao, action).subscribe(value => console.log(value));
    }

    save() {

    }

    checkPermission: (permission: string) => boolean;
}

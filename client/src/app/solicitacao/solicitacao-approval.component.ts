import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { SolicitacaoService } from "../core/solicitacao/solicitacao.service";
import { Solicitacao } from "../core/solicitacao/solicitacao";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'solicitacao-approval',
    templateUrl: './solicitacao-approval.component.html',
    styleUrls: ['./solicitacao-approval.component.scss']
})
export class SolicitacaoApprovalComponent implements OnInit {

    @ViewChild('iconContainer') iconContainer;
    @ViewChild('iconContent') iconContent;
    urgency: boolean = false;
    private _pageNumber: number;
    private _offset;
    count: number;
    searchForm: FormGroup;
    searchControl: FormControl;
    message;
    create = true;
    solicitacaoList: Solicitacao[] = [];
    solicitacao = new Solicitacao();
    errors: any[];


    constructor(private route: ActivatedRoute, private render: Renderer2, private solicitacaoService: SolicitacaoService) {
        this._pageNumber = 0;
        this.searchControl = new FormControl('');
        this.searchForm = new FormGroup({
            searchControl: this.searchControl
        });
     }

    ngOnInit() {
        this.solicitacaoService.count().subscribe((quantity: number) => {
            this.count = quantity;
        });

        this.searchControl.valueChanges
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(searchTerm =>
                this.solicitacaoService.list(this.count, searchTerm))
            .subscribe((solicitacaoList: Solicitacao[]) => {
                this.solicitacaoList = solicitacaoList
            });

        if (this.searchControl.value == "") {
            this.list(this.pageNumber);
        }

        this.count = this.solicitacaoList.length;
        this.list(this._pageNumber);
    }

    list(p: number) {
        this._offset = (p - 1) * 10;
        this.solicitacaoService.list('', '', this._offset).subscribe((solicitacaoList: Solicitacao[]) => {
            this.solicitacaoList = solicitacaoList;
            console.log(this.solicitacaoList);
        });
        return this.solicitacaoList;

    }

    save() {
        this.solicitacaoService.save(this.solicitacao).subscribe((solicitacao: Solicitacao) => {
            if (this.solicitacao.id != null) {
                this.message = `Solicitacao ${this.solicitacao.id} aprovada!`;
            }

        }, (res) => {
            const json = res.error;
            if (json.hasOwnProperty('message')) {
                this.errors = [json];
            } else {
                this.errors = json._embedded.errors;
            }
        });
    }


    changePageData() {
        this.list(this._pageNumber);
    }

    get pageNumber(): number {
        return this._pageNumber;
    }

    set pageNumber(pageNumber: number) {
        this._pageNumber = pageNumber;
        this.changePageData();
    }

    changeApprovalStatus(solicitacao) {
        this.solicitacao = null;
        solicitacao.aprovada = !solicitacao.aprovada;
        this.solicitacao = solicitacao;
        this.save();
    }

    getApprovalLabel(aprovada) {
        return aprovada ? 'Sim' : 'Não';
    }

    setUrgency() {
        this.iconContent = document.getElementById('iconContent');
        this.urgency = !this.urgency;
        if (this.urgency == true) {
            this.render.addClass(this.iconContainer.nativeElement, 'enable-urgency-container');
            this.render.addClass(this.iconContent, 'enable');
        } else if (this.urgency == false) {
            this.render.removeClass(this.iconContainer.nativeElement, 'enable-urgency-container');
            this.render.removeClass(this.iconContent, 'enable');
        }
    }
}
